/* eslint-disable prefer-destructuring */
import Helper from '../helperUtils/Utils';
import pool from '../database/dbConnection';
import { findAGif, findAnArticle } from '../database/queries/sql';

/**
 * @class UserAuthentication
 * @description Authenticates a given user
 * @exports UserAuthentication
 */
class UserAuthentication {
  /**
    * verifyAuthHeader
    * @method verifyAuthHeader
    * @static
    * @param {object} req - The request object
    * @param {object} res - The response object
    * @return {object} JSON representing success message
    * @param {object} next
    * @memberof UserAuthentication
    */
  static verifyAuthHeader(req) {
    if (!req.headers.authorization) {
      return { error: 'auth' };
    }
    const token = req.headers.authorization.split(' ')[1];
    const payload = Helper.verifyToken(token);

    if (!payload) {
      return { error: 'token' };
    }
    return payload;
  }

  /**
    * verifyUserToken
    * @method verifyUserToken
    * @static
    * @param {object} req - The request object
    * @param {object} res - The response object
    * @return {object} JSON representing success message
    * @param {object} next
    * @memberof UserAuthentication
    */
  static verifyUserToken(req, res, next) {
    const payload = UserAuthentication.verifyAuthHeader(req);
    let error;
    let status;

    if (payload && payload.error === 'auth') {
      status = 401;
      error = 'No authorization header was specified';
    } else if (payload && payload.error === 'token') {
      status = 401;
      error = 'The provided token cannot be authenticated.';
    }

    if (error) {
      return res.status(status).json({ status, error });
    }
    req.user = payload;
    next();
  }

  /**
    * verify isAdmin
    * @method isAdmin
    * @static
    * @param {object} req - The request object
    * @param {object} res - The response object
    * @return {object} JSON representing success message
    * @param {object} next
    * @memberof UserAuthentication
    */
  static isAdmin(req, res, next) {
    const payload = UserAuthentication.verifyAuthHeader(req);
    let error;
    let status;

    if (payload && payload.error === 'auth') {
      status = 401;
      error = 'No authorization header was specified';
      return res.status(status).json({
        status,
        error,
      });
    }

    if (payload && payload.error === 'token') {
      status = 401;
      error = 'Token provided cannot be authenticated.';
      return res.status(status).json({
        status,
        error,
      });
    }

    if (payload.jobrole !== 'admin') {
      return res.status(403).json({
        status: 403,
        error: 'Only admin can create employee account',
      });
    }
    next();
  }

  /**
    * verify isOwner
    * @method isOwner
    * @static
    * @param {object} req - The request object
    * @param {object} res - The response object
    * @return {object} JSON representing success message
    * @param {object} next
    * @memberof UserAuthentication
    */
  static async isOwner(req, res, next) {
    const userid = req.user.id;
    const gifId = req.params.gifId;
    const value = Number(gifId);

    try {
      const { rows, rowCount } = await pool.query(findAGif, [value]);
      if (rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Gif not found',
        });
      }
      if (userid !== rows[0].gifownerid) {
        return res.status(401).json({
          status: 401,
          error: 'You can not access or delete this gif',
        });
      }
      return next();
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }

  /**
    * verify isArticleOwner
    * @method isArticleOwner
    * @static
    * @param {object} req - The request object
    * @param {object} res - The response object
    * @return {object} JSON representing success message
    * @param {object} next
    * @memberof UserAuthentication
    */
  static async isArticleOwner(req, res, next) {
    const userid = req.user.id;
    const articleId = req.params.articleId;
    const value = Number(articleId);

    try {
      const { rows, rowCount } = await pool.query(findAnArticle, [value]);
      if (rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Gif not found',
        });
      }
      if (userid !== rows[0].authorid) {
        return res.status(401).json({
          status: 401,
          error: 'You can not access or delete this gif',
        });
      }
      return next();
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
}

export default UserAuthentication;
