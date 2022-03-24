require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middleware/logger');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/movies');
const errorHandler = require('./middleware/error-hander');
const auth = require('./middleware/auth');
const { loginUser, createUser } = require('./controllers/users');
const { validateUser, validateLogin } = require('./middleware/validation');
const NotFoundErr = require('./error/NotFoundErr');

const { PORT = 3001, BASE_URL, NODE_ENV } = process.env;
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(NODE_ENV === 'production' ? BASE_URL : 'localhost:27017/bitfilmsdb', () => {
  console.log('Connect to mydb');
});

app.use(requestLogger);

app.post('/signup', validateUser, createUser);
app.post('/signin', validateLogin, loginUser);

app.use(auth);

app.use('/users', userRouter);
app.use('/movies', cardRouter);

app.use(errorLogger);

app.use(errors());

app.use((req, res, next) => {
  next(new NotFoundErr('Страница по указанному маршруту не найдена'));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
