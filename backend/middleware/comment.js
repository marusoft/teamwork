import Validator from 'validatorjs';

/**
 * Comment Validation
 * @class CommmentValidation
 */
class CommmentValidation {
  /**
   * validateArticlesDetails.
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON representing success message
   * @param {*} next
   * @memberof CommmentValidation
   */
  static async validateCommentDetails(req, res, next) {
    const {
      comment
    } = req.body;

    const constraint = {
      comment: 'required|min:10|max:1000|string',
    };

    const validation = new Validator(req.body, constraint);
    if (validation.fails()) {
      return res.status(400).json({
        status: 400,
        error: validation.errors.errors,
      });
    }
    req.body.comment = comment.trim();
    return next();
  }
}

export default CommmentValidation;
