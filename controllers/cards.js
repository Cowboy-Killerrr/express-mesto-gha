const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Server Error' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link })
    .then((card) => res.status(201).send({ card }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(400).send({ message: error.message });
      }

      if (error.link === 'ValidationError') {
        return res.status(400).send({ message: error.message });
      }

      return res.status(500).send({ message: 'Server Error' });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then(() => res.send({ message: 'Карточка удалена' }))
    .catch(() => res.status(500).send({ message: 'Server Error' }));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
