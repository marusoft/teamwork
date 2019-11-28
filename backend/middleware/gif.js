/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-const */
import pool from '../database/dbConnection';
import { findAGif } from '../database/queries/sql';
/**
 * Gifs Validation
 * @class GifsValidation
 */
class GifsValidation {
  /**
   * validateGifsDetails.
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON representing success message
   * @param {*} next
   * @memberof Gifs
   */
  static validateGifsDetails(req, res, next) {
    let {
      title,
      imageUrl,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        message: 'please specify the title of the gif.',
      });
    }
    if (title) {
      title = title.trim();
      if (/[^a-zA-Z ]/.test(title)) {
        return res.status(406).json({
          message: 'Only Alphabets input characters are acceptable for title.',
        });
      }
    }

    if (!imageUrl) {
      return res.status(400).json({
        message: 'Please select an gif image to upload.',
      });
    }
    if (imageUrl) {
      let imgExtention;
      imgExtention = imageUrl.split('.').pop();
      imgExtention = imgExtention.replace(/'/g, '').trim();
      imgExtention = imgExtention.toLowerCase();
      const validImageExtentions = ['jpg', 'jpeg', 'png', 'gif'];
      if (!validImageExtentions.includes(imgExtention)) {
        return res.status(400).json({
          message: 'This image is not a valid image.'
        });
      }
    }

    req.body.title = title.toLowerCase().trim();
    req.body.imageUrl = imageUrl;
    return next();
  }

  /**
   * validateASpecificGif.
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON representing success message
   * @param {*} next
   * @memberof Gifs
   */
  static async validateSpecifyGif(req, res, next) {
    const { gifId } = req.params;
    const value = Number(gifId);
    try {
      const { rows, rowCount } = await pool.query(findAGif, [value]);
      if (rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Cannot find the specify gif.',
        });
      }
      const findSpecificGif = rows[0];
      req.body.findSpecificGif = findSpecificGif;
      next();
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  }
}


export default GifsValidation;
