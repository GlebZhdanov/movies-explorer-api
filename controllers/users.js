const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundErr = require('../error/NotFoundErr');
const BadRequestErr = require('../error/BadRequestErr');
const ConflictError = require('../error/ConflictError');
const UnAuthorizeErr = require('../error/UnAuthtorizeErr');

const MONGO_DUPLICATE_ERROR_CODE = 11000;
const SOLT_ROUND = 10;

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUser = async (req, res, next) => {
  console.log(req.user._id);
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.status(200).send(user);
    } else {
      throw new NotFoundErr('Пользователь с указанным id не найден');
    }
  } catch (err) {
    next(err);
  }
};

module.exports.patchUsers = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { email, name },
      { new: true, runValidators: true },
    );
    if (user) {
      res.status(200).send(user);
    } else {
      throw new NotFoundErr('Пользователь с указанным id не найден');
    }
  } catch (err) {
    if (err.name === 'VaidationError') {
      next(new BadRequestErr(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
    } else if (err.codeName === 'DuplicateKey') {
      next(new ConflictError('Данные email уже зарегистрирован'));
    } else {
      next(err);
    }
  }
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  if (!email || !password) {
    throw new BadRequestErr('Не верный email или пароль');
  }

  bcrypt.hash(password, SOLT_ROUND)
    .then((user) => User.create({
      name,
      email,
      password: user,
    }))
    .then(() => res.status(201).send({
      data: {
        name, email,
      },
    }))
    .catch((err) => {
      if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
        next(new ConflictError('Пользователь уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestErr(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .orFail(new UnAuthorizeErr('Не верный email или пароль'))
    .then((admin) => {
      if (!admin) {
        throw new UnAuthorizeErr('Не верный email или пароль');
      }
      return bcrypt.compare(password, admin.password)
        .then((matches) => {
          if (!matches) {
            throw new UnAuthorizeErr('Не верный email или пароль');
          }
          const token = jwt.sign(
            { _id: admin._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'secret',
            { expiresIn: '7d' },
          );
          res.send({ message: `Bearer ${token}` });
        });
    })
    .catch((err) => next(err));
};
