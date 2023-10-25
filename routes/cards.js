const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().required(),
    owner: Joi.object().required(),
    likes: Joi.array(),
    createAt: Joi.date(),
  }),
}), getCards);

cardsRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().required(),
    owner: Joi.object().required(),
    likes: Joi.array(),
    createAt: Joi.date(),
  }),
}), createCard);

cardsRouter.delete('/:id', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().required(),
    owner: Joi.object().required(),
    likes: Joi.array(),
    createAt: Joi.date(),
  }),
}), deleteCard);

cardsRouter.put('/:id/likes', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().required(),
    owner: Joi.object().required(),
    likes: Joi.array(),
    createAt: Joi.date(),
  }),
}), likeCard);

cardsRouter.delete('/:id/likes', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().required(),
    owner: Joi.object().required(),
    likes: Joi.array(),
    createAt: Joi.date(),
  }),
}), dislikeCard);

module.exports = cardsRouter;
