import express from 'express';
import upload from '../controllers/imgUpload';
import { multerUploads } from '../middleware/multer';


const { uploadImg } = upload;

const imgRouter = express.Router();

imgRouter.post('/upload', multerUploads, uploadImg);

export default imgRouter;
