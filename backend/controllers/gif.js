import pool from '../database/dbConnection';
import { createGif } from '../database/queries/sql';

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

    const values = [
      id,
      req.body.title,
      req.body.imageUrl];
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
}


export default Gifs;
