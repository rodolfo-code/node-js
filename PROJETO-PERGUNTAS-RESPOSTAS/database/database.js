const sequelize = require('sequelize');

const connection = new sequelize('guia_perguntas', 'root', 'rodolfomysql', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = connection;
