const { HTTP_STATUS_CREATED } = require('http2').constants;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NotFoundError } = require('../errors/not-found-error');
const { ValidationError } = require('../errors/validation-error');
const { UnauthorisedError } = require('../errors/unauthorized-error');
const { ConflictError } = require('../errors/conflict-error');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }

      return res.send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new ValidationError('Неверный ID');
      }
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then(({
          _id, name, about, avatar, email,
        }) => res.status(HTTP_STATUS_CREATED).send({
          _id, name, about, avatar, email,
        }))
        .catch((error) => {
          if (error.name === 'ValidationError') {
            throw new ValidationError('Некорректные данные');
          }

          if (error.code === 11000) {
            throw new ConflictError('Пользователь с таким email уже существует');
          }
        })
        .catch(next);
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        throw new ValidationError('Введены некорректные данные');
      }
    })
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        throw new ValidationError('Введены некорректные данные');
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });

      res.send({ token });
    })
    .catch((error) => {
      throw new UnauthorisedError(error.message);
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
};
