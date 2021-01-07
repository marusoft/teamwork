import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import { cloudinaryConfig } from './config/cloudinaryConfig';
import userRouter from './routes/user';
import gifRouter from './routes/gif';
import articleRouter from './routes/article';
import feedRouter from './routes/feed';
import swaggerDocument from '../Swagger';

const app = express();
const port = parseInt(process.env.PORT, 10) || 2020;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use('*', cloudinaryConfig);

app.use('/api/v1', userRouter);
app.use('/api/v1', gifRouter);
app.use('/api/v1', articleRouter);
app.use('/api/v1', feedRouter);


app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to teamwork-app, a place where beautiful things can be achieved through collaboration and teamwork',
}));


app.listen(port, () => console.log(`Server running on port ${port} 🔥`));

export default app;
