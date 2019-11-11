import Helper from '../helperUtils/Utils';
import pool from '../database/dbConnection';
import { createUser } from '../database/queries/sql';

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
      firstName, lastName, email, password, gender, jobRole, department, address,
    } = req.body;
    const hashedPassword = Helper.hashPassword(password);
    const values = [firstName, lastName, email, hashedPassword, gender, jobRole,
      department, address];
    try {
      const { rows } = await pool.query(createUser, values);
      const token = Helper.generateToken({
        id: rows.id,
        firstName: rows.lastName,
        email: rows.email
      });
      const { id } = rows[0];
      return res.status(201).json({
        status: 'success',
        data: {
          message: 'User account successfully created',
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
}

export default Users;
