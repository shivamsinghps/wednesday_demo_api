const _data = require('../data/init_user_data.js');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', _data),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {}),
};
