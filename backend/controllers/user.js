/* eslint-disable no-shadow */
import Helper from '../helperUtils/Utils';
import pool from '../database/dbConnection';
import {
  createUser, findIfUserExist, findUser, findAllUser
} from '../database/queries/sql';

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
    console.log(req.body);
    const {
      username,
      firstname,
      lastname,
      email,
      password,
      gender,
      jobrole,
      department,
      address,
    } = req.body;
    console.log(req.body);
    const hashedPassword = Helper.hashPassword(password);
    const values = [
      username,
      firstname,
      lastname,
      email,
      hashedPassword,
      gender,
      jobrole,
      department,
      address,
    ];
    try {
      const { rows } = await pool.query(createUser, values);
      const { id } = rows[0];
      const token = Helper.generateToken({
        id,
        username,
        firstname,
        lastname,
        email,
      });
      return res.status(201).json({
        status: 'success',
        data: {
          username,
          message: 'Account successfully created',
          token,
          id,
        },
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
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
        const validPassword = Helper.verifyPassword(
          rows[0].password,
          req.body.password
        );
        if (validPassword) {
          const {
            id, username, firstname, lastname, jobrole
          } = rows[0];
          const token = Helper.generateToken({
            id,
            username,
            firstname,
            lastname,
            email,
            jobrole,
          });
          return res.status(200).json({
            status: 'success',
            data: {
              username,
              message: 'Welcome back your login was successful',
              token,
              id,
            },
          });
        }
        return res.status(401).json({
          status: 'unauthorized',
          error: 'Either email or password incorrect',
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }

  /**
   * fetch a Login user
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON representing success message
   * @memberof Users
   */
  static async fetchLoggedInUser(req, res) {
    try {
      const value = [req.user.id];
      const { rows } = await pool.query(findUser, value);
      const {
        id, username, firstname, lastname, jobrole
      } = rows[0];
      return res.status(200).json({
        status: 'success',
        data: {
          id,
          username,
          firstname,
          lastname,
          jobrole,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }

  /**
   * fetch a user
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON representing success message
   * @memberof Users
   */
  static async fetchAUser(req, res) {
    try {
      const value = [req.params.id];
      const { rows } = await pool.query(findUser, value);
      const {
        id, username, email, firstname, lastname, jobrole
      } = rows[0];
      return res.status(200).json({
        status: 'success',
        data: {
          id,
          username,
          email,
          firstname,
          lastname,
          jobrole,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }

  /**
   * fetch all user
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON representing success message
   * @memberof Users
   */
  static async fetchAllUser(req, res) {
    try {
      const { rows } = await pool.query(findAllUser);
      return res.status(200).json({
        status: 'success',
        data: {
          rows,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }
}

export default Users;
