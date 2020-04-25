const _data = require('../data/init_user_data.js');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('user', _data),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('user', null, {}),
};
