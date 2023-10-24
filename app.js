const express = require('express');
const mongoose = require('mongoose');

const { createUser, login } = require('./controllers/users');
const { NOT_FOUND } = require('./utils/errorCodes');

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb', {
    useNewUrlParser: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log(`Произошла ошибка: ${error}`));

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '65266fc4d989a5ce24cde5c6',
  };

  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.post('/signin', login);
app.post('/signup', createUser);

app.use('*', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Неверный путь' });
});

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}/`);
});
