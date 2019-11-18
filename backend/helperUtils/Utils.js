import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


dotenv.config();
const secretKey = process.env.SECRET_KEY;
const salt = +process.env.SALT;

/**
 * @class Helper
 * @exports Helper
 */
export default class Helper {
  /**
   * @method generateToken
   * @static
   * @param { object } payload - The request object
   * @param { object } res - The response object
   * @returns { object } JSON token
   * @memberof Helper
   */
  static generateToken(payload) {
    const token = jwt.sign(payload, secretKey);
    return token;
  }

  /**
   * @method verifyToken
   * @static
   * @param {object} token - The request object
   * @param {object} res - The response object
   * @return {object} JSON payload
   * @memberof Helper
   */
  static verifyToken(token) {
    try {
      const payload = jwt.verify(token, secretKey);
      return payload;
    } catch (error) {
      return false;
    }
  }

  /**
   * @method hashPassword
   * @param {string} password
   * @returns {string} hash password
   */
  static hashPassword(password) {
    return bcrypt.hashSync(password, salt);
  }


  /**
   * verifyPassword
   * @static
   * @param {object} hashPassword - The request object
   * @param {object} password - The response object
   * @return {object} JSON payload
   * @memberof Helper
   */
  static verifyPassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }
}
