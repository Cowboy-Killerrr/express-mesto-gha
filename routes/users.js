const usersRouter = require('express').Router();
const { getUsers, getUser, createUser } = require('../controllers/users');

usersRouter.get('/', getUsers);

usersRouter.get('/', getUser);

usersRouter.post('/', createUser);

module.exports = usersRouter;
