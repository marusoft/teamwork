import express from 'express';
import Articles from '../controllers/article';
import ArticleInputValidation from '../middleware/article';
import UserAuth from '../middleware/auth';

const { createArticles, editAnArticle, deleteSelfArticle } = Articles;
const { validateArticlesDetails, validateASingleArticle } = ArticleInputValidation;
const { verifyUserToken, isArticleOwner } = UserAuth;

const articleRouter = express.Router();

articleRouter.post('/articles', verifyUserToken, validateArticlesDetails, createArticles);
articleRouter.patch('/articles/:articleId', verifyUserToken, isArticleOwner, validateArticlesDetails, validateASingleArticle, editAnArticle);
articleRouter.delete('/articles/:articleId', verifyUserToken, isArticleOwner, validateASingleArticle, deleteSelfArticle);

export default articleRouter;
