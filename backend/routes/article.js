import express from 'express';
import Articles from '../controllers/article';
import ArticleInputValidation from '../middleware/article';
import validateCommentInput from '../middleware/comment';
import UserAuth from '../middleware/auth';

const {
  createArticles, editAnArticle, deleteSelfArticle, createArticleComment, viewSpecificArticle
} = Articles;
const { validateArticlesDetails, validateASingleArticle } = ArticleInputValidation;
const { validateCommentDetails } = validateCommentInput;
const { verifyUserToken, isArticleOwner } = UserAuth;

const articleRouter = express.Router();

articleRouter.post('/articles', verifyUserToken, validateArticlesDetails, createArticles);
articleRouter.patch('/articles/:articleId', verifyUserToken, isArticleOwner, validateArticlesDetails, validateASingleArticle, editAnArticle);
articleRouter.delete('/articles/:articleId', verifyUserToken, isArticleOwner, validateASingleArticle, deleteSelfArticle);
articleRouter.post('/articles/:articleId/comment', verifyUserToken, validateCommentDetails, validateASingleArticle, createArticleComment);
articleRouter.get('/articles/:articleId', verifyUserToken, viewSpecificArticle);


export default articleRouter;
