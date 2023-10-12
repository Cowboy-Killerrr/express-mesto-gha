const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((error) => {
      if (error.name === 'NotFound') {
        return res.status(404).send({ message: 'Карточки не найдены' });
      }

      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link })
    .then((card) => res.status(201).send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(400).send({ message: 'Введены некорректные данные' });
      }

      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then(() => res.send({ message: 'Карточка удалена' }))
    .catch(() => res.status(500).send({ message: 'Server Error' }));
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
    .then(() => res.send({ message: 'Лайк поставлен' }))
    .catch(() => res.status(500).send({ message: 'Server Error' }));
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
    .then(() => res.send({ message: 'Дизлайк поставлен' }))
    .catch(() => res.status(500).send({ message: 'Server Error' }));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
