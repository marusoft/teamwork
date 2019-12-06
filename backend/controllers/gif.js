import pool from '../database/dbConnection';
import {
  createGif, deleteOwnGif, createCommentForGifs, getSingleGif, getSingleGifComments
} from '../database/queries/sql';
import { uploader } from '../config/cloudinaryConfig';
import { dataUri } from '../middleware/multer';


/**
 * @class Gifs
 */
class Gifs {
  /**
   * Employees can create and share gifs with other colleagues..
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON representing success message
   * @memberof Gifs
   */
  static async createAGif(req, res) {
    const { id } = req.user;

    const file = dataUri(req).content;
    const image = await uploader.upload(file);

    const values = [
      id,
      req.body.title,
      image.secure_url];

    try {
      const { rows } = await pool.query(createGif, values);

      const {
        gifid, gifownerid, createdon, title, imageurl
      } = rows[0];
      return res.status(201).json({
        status: 'success',
        data: {
          gifid,
          message: 'GIF image successfully posted',
          gifownerid,
          createdon,
          title,
          imageurl
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
   * Employees can delete their gifs post.
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON representing success message
   * @memberof Gifs
   */
  static async deleteSelfGif(req, res) {
    const { findSpecificGif } = req.body;
    try {
      const { rowCount } = await pool.query(deleteOwnGif, [findSpecificGif.gifid]);
      if (rowCount !== 0) {
        return res.status(200).json({
          status: 'success',
          message: 'gif post successfully deleted',
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
   * Employees can comment on other colleagues' gif post.
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON representing success message
   * @memberof Gifs
   */
  static async createGifComment(req, res) {
    const { id } = req.user;
    const { findSpecificGif } = req.body;
    try {
      const values = [req.body.comment, findSpecificGif.gifid, id];
      const { rows } = await pool.query(createCommentForGifs, values);
      const gifTitle = findSpecificGif.title;
      const {
        createdon, comment, imageurl
      } = rows[0];
      return res.status(201).json({
        status: 'success',
        data: {
          message: 'Comment successfully created.',
          createdon,
          gifTitle,
          imageurl,
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
  static async viewSpecificGif(req, res) {
    const { gifId } = req.params;
    const value = Number(gifId);
    try {
      const { rows, rowCount } = await pool.query(getSingleGif, [value]);
      if (rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Cannot find the specify article.',
        });
      }
      const {
        id, createdon, title, imageurl
      } = rows[0];
      const foundComment = await pool.query(getSingleGifComments, [value]);
      const comments = foundComment.rows.map((comment) => comment);
      return res.status(200).json({
        status: 'success',
        data: {
          id,
          createdon,
          title,
          imageurl,
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

export default Gifs;
