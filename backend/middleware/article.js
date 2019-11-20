import Validator from 'validatorjs';
import pool from '../database/dbConnection';
import { findAnArticle } from '../database/queries/sql';

/**
 * Articles Validation
 * @class ArticlesValidation
 */
class ArticlesValidation {
  /**
   * validateArticlesDetails.
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON representing success message
   * @param {*} next
   * @memberof ArticlesValidation
   */
  static async validateArticlesDetails(req, res, next) {
    const {
      title, article
    } = req.body;

    const constraint = {
      title: 'required|min:3|max:80|string',
      article: 'required|min:10|max:1000|string',
    };

    const validation = new Validator(req.body, constraint);
    if (validation.fails()) {
      return res.status(400).json({
        status: 400,
        error: validation.errors.errors,
      });
    }
    req.body.title = title.trim();
    req.body.article = article.trim();
    return next();
  }

  /**
   * validateASingleArticle.
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON representing success message
   * @param {*} next
   * @memberof ArticlesValidation
   */
  static async validateASingleArticle(req, res, next) {
    const { articleId } = req.params;
    const value = Number(articleId);
    try {
      const { rows, rowCount } = await pool.query(findAnArticle, [value]);
      if (rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Cannot find the specify article.',
        });
      }
      const findSingleArticle = rows[0];
      req.body.findSingleArticle = findSingleArticle;
      next();
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  }
}

export default ArticlesValidation;
