const express = require('express');
const mongoose = require('mongoose');

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

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Неверный путь' });
});

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}/`);
});
