/* eslint-disable consistent-return */
import Helper from '../helperUtils/Utils';

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

    if (payload.jobRole !== 'admin') {
      return res.status(403).json({
        status: 401,
        error: 'Only admin can access this route',
      });
    }
    next();
  }

  /**
    * verify isEmployee
    * @method isEmployee
    * @static
    * @param {object} req - The request object
    * @param {object} res - The response object
    * @return {object} JSON representing success message
    * @param {object} next
    * @memberof UserAuthentication
    */
  static isEmployee(req, res, next) {
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

    if (payload.jobRole !== 'employee') {
      return res.status(403).json({
        status: 401,
        error: 'Only employee can access this route',
      });
    }
    next();
  }
}

export default UserAuthentication;
