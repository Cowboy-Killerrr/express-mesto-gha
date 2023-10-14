const Card = require('../models/card');
const {
  CREATED, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR,
} = require('../utils/errorCodes');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(CREATED).send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Введены некорректные данные' });
      }

      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
      }

      return res.status(200).send({ message: 'Карточка удалена' });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'Неверный ID' });
      }

      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Server Error' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: { likes: req.user._id },
    },
    {
      new: true,
    },
  )
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
      }

      return res.status(200).send({ message: 'Лайк поставлен' });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'Неверный ID' });
      }

      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Server Error' });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    },
  )
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
      }

      return res.status(200).send({ message: 'Дизлайк поставлен' });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'Неверный ID' });
      }

      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Server Error' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
