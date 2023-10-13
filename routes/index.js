const indexRouter = require('express').Router();

const { getIndex } = require('../controllers/index');

indexRouter.get('/', getIndex);

module.exports = indexRouter;
