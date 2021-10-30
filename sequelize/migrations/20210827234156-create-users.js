'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userTable = queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fullName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
    });

    return userTable;
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('users');
  },
};
