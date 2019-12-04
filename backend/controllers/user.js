/* eslint-disable no-shadow */
import Helper from '../helperUtils/Utils';
import pool from '../database/dbConnection';
import { createUser, findIfUserExist } from '../database/queries/sql';

/**
 * @class Users
 */
class Users {
  /**
   * Create User Account
   * Admin create an employee user account.
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON representing success message
   * @memberof Users
   */
  static async createUsers(req, res) {
    const {
      username, firstName, lastName, email, password, gender, jobRole, department, address,
    } = req.body;
    const hashedPassword = Helper.hashPassword(password);
    const values = [username, firstName, lastName, email, hashedPassword, gender, jobRole,
      department, address];
    try {
      const { rows } = await pool.query(createUser, values);
      const { id } = rows[0];
      const token = Helper.generateToken({
        id,
        username,
        firstName,
        lastName,
        email
      });
      return res.status(201).json({
        status: 'success',
        data: {
          username,
          message: 'Account successfully created',
          token,
          id
        }
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message
      });
    }
  }

  /**
   * Login a user
   * Admin/Employees can sign in
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON representing success message
   * @memberof Users
   */
  static async loginUsers(req, res) {
    const { email } = req.body;
    const value = [email];
    try {
      const { rows } = await pool.query(findIfUserExist, value);
      if (rows[0]) {
        const validPassword = Helper.verifyPassword(rows[0].password, req.body.password);
        if (validPassword) {
          const {
            id,
            username,
            firstName,
            lastName,
            jobrole
          } = rows[0];
          const token = Helper.generateToken({
            id,
            username,
            firstName,
            lastName,
            email,
            jobrole
          });
          return res.status(200).json({
            status: 'success',
            data: {
              username,
              message: 'Welcome back your login was successful',
              token,
              id
            }
          });
        }
        return res.status(401).json({
          status: 'unauthorized',
          error: 'Either email or password incorrect'
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  }
}

export default Users;
