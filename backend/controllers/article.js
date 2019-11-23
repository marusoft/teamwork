import pool from '../database/dbConnection';
import {
  createArticle, modifyArticle, deleteOwnArticle, createCommentForArticle,
  getSingleArticle, getSingleArticleComments
} from '../database/queries/sql';


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

  /**
   * Employees can edit their articles.
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON representing success message
   * @memberof Articles
   */
  static async editAnArticle(req, res) {
    const { title, article, findSingleArticle } = req.body;
    try {
      const values = [title, article, findSingleArticle.articleid, req.user.id];
      const { rows } = await pool.query(modifyArticle, values);
      return res.status(200).json({
        status: 'success',
        data: {
          message: 'Article successfully updated',
          rows
        }
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: error.message,
      });
    }
  }

  /**
   * Employees can delete their articles.
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON representing success message
   * @memberof Articles
   */
  static async deleteSelfArticle(req, res) {
    const { findSingleArticle } = req.body;
    try {
      const { rowCount } = await pool.query(deleteOwnArticle, [findSingleArticle.articleid]);
      if (rowCount !== 0) {
        return res.status(200).json({
          status: 200,
          message: 'Article successfully deleted',
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: error.message,
      });
    }
  }

  /**
   * Employees can comment on other colleagues' article post.
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON representing success message
   * @memberof Articles
   */
  static async createArticleComment(req, res) {
    const { id } = req.user;
    const { findSingleArticle } = req.body;
    try {
      const values = [req.body.comment, findSingleArticle.articleid, id];
      const { rows } = await pool.query(createCommentForArticle, values);
      const articleTitle = findSingleArticle.title;
      const {
        createdon, comment, article
      } = rows[0];
      return res.status(201).json({
        status: 'success',
        data: {
          message: 'Comment successfully created',
          createdon,
          articleTitle,
          article,
          comment
        }
      });
    } catch (error) {
      return res.status(500).json({
        status: error,
        error: error.message
      });
    }
  }

  /**
   * Employees can view a specific article.
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON representing success message
   * @memberof Articles
   */
  static async viewSpecificArticle(req, res) {
    const { articleId } = req.params;
    const value = Number(articleId);
    try {
      const { rows, rowCount } = await pool.query(getSingleArticle, [value]);
      if (rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Cannot find the specify article.',
        });
      }
      const {
        id, createdon, title, article
      } = rows[0];
      const foundComment = await pool.query(getSingleArticleComments, [value]);
      const comments = foundComment.rows.map((comment) => comment);
      return res.status(201).json({
        status: 'success',
        data: {
          id,
          createdon,
          title,
          article,
          comments

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
