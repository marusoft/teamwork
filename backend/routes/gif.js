import express from 'express';
import Gifs from '../controllers/gif';
import GifInputValidation from '../middleware/gif';
import validateCommentInput from '../middleware/comment';
import UserAuth from '../middleware/auth';
import { multerUploads } from '../middleware/multer';

const {
  createAGif, deleteSelfGif, createGifComment, viewSpecificGif
} = Gifs;
const { validateGifsDetails, validateGifsSize, validateSpecifyGif } = GifInputValidation;
const { validateCommentDetails } = validateCommentInput;
const { verifyUserToken, isOwner } = UserAuth;

const gifRouter = express.Router();

gifRouter.post('/gifs', verifyUserToken, multerUploads, validateGifsDetails, validateGifsSize, createAGif);
gifRouter.delete('/gifs/:gifId', verifyUserToken, isOwner, validateSpecifyGif, deleteSelfGif);
gifRouter.post('/gifs/:gifId/comment', verifyUserToken, validateCommentDetails, validateSpecifyGif, createGifComment);
gifRouter.get('/gifs/:gifId', verifyUserToken, viewSpecificGif);


export default gifRouter;
