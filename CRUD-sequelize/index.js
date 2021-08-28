const express = require('express');
const controller = require('./controllers');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/products', controller.productsController);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
