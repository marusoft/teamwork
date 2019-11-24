import pool from '../database/dbConnection';
import { viewAllArticlesOrGifs } from '../database/queries/sql';


/**
 * @class Feed
 */
class Feed {
  /**
   * Employees can view all articles or gifs, showing the most
   * recently posted articles or gifs first.
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON representing success message
   * @memberof Feed
   */
  static async getAllArticlesOrGifs(req, res) {
    const { id } = req.user;

    const value = [id];
    try {
      const foundFeed = await pool.query(viewAllArticlesOrGifs, value);
      // console.log('foundFeed', foundFeed);
      const data = foundFeed.rows.map((feed) => (
        {
          id: feed.id,
          createdOn: feed.createdon,
          title: feed.title,
          [`${feed.type === 'article' ? 'article' : 'url'}`]: feed.feedcontent,
          authorId: feed.authorid
        }
      ));
      return res.status(200).json({
        status: 'success',
        data: {
          data
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
export default Feed;
