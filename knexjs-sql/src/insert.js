const database = require('../database');

const dados = [
  {
    name: 'Red Dead',
    price: 69.99,
  },
  {
    name: 'Medal of Honor',
    price: 100,
  },
];

database
  .insert(dados)
  .into('games')
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
