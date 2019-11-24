import express from 'express';
import Feed from '../controllers/feed';
import UserAuth from '../middleware/auth';

const { getAllArticlesOrGifs } = Feed;
const { verifyUserToken } = UserAuth;

const feedRouter = express.Router();

feedRouter.get('/feed', verifyUserToken, getAllArticlesOrGifs);

export default feedRouter;
