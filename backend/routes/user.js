import express from 'express';
import Users from '../controllers/user';
import UserInputValidation from '../middleware/user';
import UserAuth from '../middleware/auth';

const {
  createUsers, loginUsers, fetchLoggedInUser, fetchAllUser, fetchAUser
} = Users;
const { ValidateCreateUserInput, ValidateUserLoginInInput } = UserInputValidation;
const { isAdmin, verifyUserToken } = UserAuth;


const userRouter = express.Router();


userRouter.post('/auth/create-user', ValidateCreateUserInput, createUsers);
userRouter.post('/auth/signin', ValidateUserLoginInInput, loginUsers);
userRouter.get('/auth/signin-user', verifyUserToken, fetchLoggedInUser);
userRouter.get('/auth/users', verifyUserToken, isAdmin, fetchAllUser);
userRouter.get('/auth/user/:id', verifyUserToken, fetchAUser);


export default userRouter;
