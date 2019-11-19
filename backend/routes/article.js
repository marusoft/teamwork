import express from 'express';
import Articles from '../controllers/article';
import ArticleInputValidation from '../middleware/article';
import UserAuth from '../middleware/auth';

const { createArticles } = Articles;
const { validateArticlesDetails } = ArticleInputValidation;
const { verifyUserToken } = UserAuth;

const articleRouter = express.Router();

articleRouter.post('/articles', verifyUserToken, validateArticlesDetails, createArticles);


export default articleRouter;
