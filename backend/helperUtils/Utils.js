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
   * @param {string} payload
   * @returns token
   */
  static generateToken(payload) {
    const token = jwt.sign(payload, secretKey);
    return token;
  }

  /**
   * @method verifyToken
   * @param {string} token
   * @returns payload
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
   * @returns {sring} hash password
   */
  static hashPassword(password) {
    return bcrypt.hashSync(password, salt);
  }

  /**
   * @method verifyPassword
   * @param {string} password
   * @param hash
   * @returns
   */
  static verifyPassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }
}
