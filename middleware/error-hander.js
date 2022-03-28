const errorHandler = (err, req, res, next) => {
  const { message } = err;
  const { statusCode = 500 } = err;

  res.status(statusCode).send({ message: statusCode === 500 ? 'Ошибка сервера' : message });
  next();
};

module.exports = errorHandler;
