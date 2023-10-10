const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Server on fire');
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}/`);
});
