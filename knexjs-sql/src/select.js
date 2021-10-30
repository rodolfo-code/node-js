const database = require('../database');

database
  .select(['id', 'price'])
  .table('games')
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
