import { uploader } from '../config/cloudinaryConfig';
import { dataUri } from '../middleware/multer';


/**
 * @class uploadController
 */
class uploadController {
  /**
   * Upload image to cloudinary
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON representing success message
   * @memberof uploadController
   */
  static uploadImg(req, res) {
    try {
      if (req.file) {
        const file = dataUri(req).content;
        return uploader
          .upload(file)
          .then((result) => {
            const image = result.url;
            return res.status(200).json({
              messge: 'gif file has been uploded successfully to cloudinary',
              data: {
                image
              }
            });
          });
      }
    } catch (err) {
      res.status(400).json({
        success: false,
        message: 'Something went wrong while processing your request',
        data: {
          err,
        },
      });
    }
  }
}
export default uploadController;
