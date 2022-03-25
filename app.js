require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middleware/logger');
const errorHandler = require('./middleware/error-hander');
const auth = require('./middleware/auth');
const NotFoundErr = require('./error/NotFoundErr');
const route = require('./routes/route');

const { PORT = 3001, BASE_URL, NODE_ENV } = process.env;
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(NODE_ENV === 'production' ? BASE_URL : 'mongodb://localhost:27017/moviesdb', () => {
  console.log('Connect to mydb');
});

app.use(requestLogger);

app.use(route);

app.use(auth);

app.use(require('./routes/users'));
app.use(require('./routes/movies'));

app.use(errorLogger);

app.use(errors());

app.use((req, res, next) => {
  next(new NotFoundErr('Страница по указанному маршруту не найдена'));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
