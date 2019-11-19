import pool from '../database/dbConnection';
import { createArticle } from '../database/queries/sql';


/**
 * @class Articles
 */
class Articles {
  /**
   * Employees can write and/or share articles with
   * colleagues on topics of interest to them.
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON representing success message
   * @memberof Articles
   */
  static async createArticles(req, res) {
    const { id } = req.user;

    const values = [
      id,
      req.body.title,
      req.body.article,
    ];
    try {
      const { rows } = await pool.query(createArticle, values);
      const {
        articleid, authorid, title, article, createdon
      } = rows[0];
      return res.status(201).json({
        status: 'success',
        data: {
          message: 'Article successfully posted',
          articleid,
          authorid,
          title,
          article,
          createdon
        }
      });
    } catch (error) {
      return res.status(500).json({
        status: error,
        error: error.message
      });
    }
  }
}
export default Articles;
