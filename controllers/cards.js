const { HTTP_STATUS_CREATED, HTTP_STATUS_OK } = require('http2').constants;

const Card = require('../models/card');

const { NotFoundError } = require('../errors/not-found-error');
const { ValidationError } = require('../errors/validation-error');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(HTTP_STATUS_CREATED).send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        throw new ValidationError('Введены некорректные данные');
      }
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }

      return res.status(HTTP_STATUS_OK).send({ message: 'Карточка удалена' });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new ValidationError('Неверный ID');
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
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
        throw new NotFoundError('Карточка не найдена');
      }

      return res.status(HTTP_STATUS_OK).send({ message: 'Лайк поставлен' });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new ValidationError('Неверный ID');
      }
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
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
        throw new NotFoundError('Карточка не найдена');
      }

      return res.status(HTTP_STATUS_OK).send({ message: 'Дизлайк поставлен' });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new ValidationError('Неверный ID');
      }
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
