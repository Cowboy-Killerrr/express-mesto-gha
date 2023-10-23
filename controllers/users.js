const bcrypt = require('bcryptjs');
const User = require('../models/user');
const {
  CREATED, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR,
} = require('../utils/errorCodes');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' }));
};

const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
      }

      return res.send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'Неверный ID' });
      }

      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

const createUser = (req, res) => {
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
        .then((user) => res.status(CREATED).send(user))
        .catch((error) => {
          if (error.name === 'ValidationError') {
            return res.status(BAD_REQUEST).send({ message: 'Некорректные данные' });
          }

          return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
        });
    });
};

const updateUser = (req, res) => {
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
        return res.status(BAD_REQUEST).send({ message: 'Введены некорректные данные' });
      }

      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

const updateUserAvatar = (req, res) => {
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
        return res.status(BAD_REQUEST).send({ message: 'Введены некорректные данные' });
      }

      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
};
