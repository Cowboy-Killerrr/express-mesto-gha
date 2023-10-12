const usersRouter = require('express').Router();
const {
  getUsers, getUser, createUser, updateUser, updateUserAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);

usersRouter.get('/:id', getUser);

usersRouter.post('/', createUser);

usersRouter.patch('/:id', updateUser);

usersRouter.patch('/:id/avatar', updateUserAvatar);

module.exports = usersRouter;
