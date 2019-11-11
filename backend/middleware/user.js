import Validator from 'validatorjs';
import pool from '../database/dbConnection';
import { findEmail, findIfUserExist } from '../database/queries/sql';

/**
 * UsersValidation
 */
class UsersValidation {
  /**
   * @returns {object} ValidateUserSignUpInput
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async ValidateCreateUserInput(req, res, next) {
    const {
      firstName, lastName, password, gender, jobRole, department, address,
    } = req.body;

    let { email } = req.body;

    const constraint = {
      firstName: 'required|min:3|max:20|alpha',
      lastName: 'required|min:3|max:20|alpha',
      email: 'required|email|min:12|max:30',
      password: 'required|min:8|max:14',
      gender: 'required',
      jobRole: 'required|min:4|max:10',
      department: 'required|min:8|max:20',
      address: 'required',
    };

    const validation = new Validator(req.body, constraint);
    if (validation.fails()) {
      return res.status(400).json({
        status: 400,
        error: validation.errors.errors,
      });
    }
    email = email.toLowerCase().trim();
    try {
      const value = [email];
      const { rows } = await pool.query(findEmail, value);
      if (rows[0]) {
        return res.status(409).json({
          status: 409,
          error: 'Conflict, Email already registered, proceed to sigin...',
        });
      }
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }

    req.body.email = email;
    req.body.firstName = firstName.toLowerCase().trim();
    req.body.lastName = lastName.toLowerCase().trim();
    req.body.password = password.trim();
    req.body.gender = gender.trim();
    req.body.jobRole = jobRole.trim();
    req.body.department = department.trim();
    req.body.address = address.trim();
    return next();
  }

  /**
   * @returns {object} ValidateUserSignInInput
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async ValidateUserLoginInInput(req, res, next) {
    let { email, password } = req.body;
    const constraint = {
      email: 'required|email',
      password: 'required',
    };

    const validation = new Validator(req.body, constraint);
    if (validation.fails()) {
      return res.status(400).json({
        status: 400,
        error: validation.errors.errors,
      });
    }
    email = email.toLowerCase().trim();
    try {
      const value = [email];
      const { rows } = await pool.query(findIfUserExist, value);
      if (!rows[0]) {
        return res.status(401).json({
          status: 401,
          error: 'User does not exist, Please register an account or signup',
        });
      }
      password = password.trim();
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
    req.body.email = email;
    req.body.password = password;
    return next();
  }
}
export default UsersValidation;
