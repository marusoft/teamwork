import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import { uploader, cloudinaryConfig } from './backend/config/cloudinaryConfig';
import { multerUploads, dataUri } from './backend/middleware/multer';
import userRouter from './backend/routes/user';
import gifRouter from './backend/routes/gif';

const app = express();
const port = parseInt(process.env.PORT, 10) || 2020;

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use('*', cloudinaryConfig);
app.post('/api/v1/upload', multerUploads, (req, res) => {
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
      })
      .catch((err) => res.status(400).json({
        messge: 'unable to upload gif file',
        data: {
          err
        }
      }));
  }
});


app.use('/api/v1', userRouter);
app.use('/api/v1', gifRouter);

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to teamwork-app, a place where beautiful things can be achieved through collaboration',
}));


app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
