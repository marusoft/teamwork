import express from 'express';
import Gifs from '../controllers/gif';
import GifInputValidation from '../middleware/gif';
import UserAuth from '../middleware/auth';

const { createAGif } = Gifs;
const { validateGifsDetails } = GifInputValidation;
const { verifyUserToken } = UserAuth;

const gifRouter = express.Router();

gifRouter.post('/gifs', verifyUserToken, validateGifsDetails, createAGif);


export default gifRouter;
