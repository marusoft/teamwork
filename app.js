import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import userRouter from './backend/routes/user';

const app = express();
const port = parseInt(process.env.PORT, 10) || 2020;

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));


app.use('/api/v1', userRouter);

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to teamwork-app, a place where beautiful things can be achieved through collaboration',
}));


app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
