import express from 'express';
import Gifs from '../controllers/gif';
import GifInputValidation from '../middleware/gif';
import validateCommentInput from '../middleware/comment';
import UserAuth from '../middleware/auth';

const { createAGif, deleteSelfGif, createGifComment } = Gifs;
const { validateGifsDetails, validateSpecifyGif } = GifInputValidation;
const { validateCommentDetails } = validateCommentInput;
const { verifyUserToken, isOwner } = UserAuth;

const gifRouter = express.Router();

gifRouter.post('/gifs', verifyUserToken, validateGifsDetails, createAGif);
gifRouter.delete('/gifs/:gifId', verifyUserToken, isOwner, validateSpecifyGif, deleteSelfGif);
gifRouter.post('/gifs/:gifId/comment', verifyUserToken, validateCommentDetails, validateSpecifyGif, createGifComment);


export default gifRouter;
