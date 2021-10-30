'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkInsert(
      'users',
      [
        {
          fullName: 'Rodolfo Vinicius',
          email: 'leo@test.com',
        },
        {
          fullName: 'JEduardo',
          email: 'edu@test.com',
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('users', null, {});
  },
};
