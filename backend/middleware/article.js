/* eslint-disable prefer-const */


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
   * @memberof Articles
   */
  static validateArticlesDetails(req, res, next) {
    let {
      title,
      article,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        error: 'please specify the title of the article.',
      });
    }
    if (title) {
      title = title.toLowerCase().trim();
      if (/[^a-zA-Z ]/.test(title)) {
        return res.status(406).json({
          message: 'Only Alphabets input characters are acceptable for title.',
        });
      }
    }

    if (!article) {
      return res.status(400).json({
        error: 'Please share or create an article.',
      });
    }
    if (typeof article !== 'string') {
      if (/[^a-zA-Z ]/.test(article)) {
        return res.status(406).json({
          message: 'Only Alphabets input are acceptable',
        });
      }
      article = article.toLowerCase().trim();
    }
    return next();
  }
}

export default ArticlesValidation;
