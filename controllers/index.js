const getIndex = (req, res) => {
  res.status(200).send({ message: 'Приложение работает!' });
};

module.exports = { getIndex };
