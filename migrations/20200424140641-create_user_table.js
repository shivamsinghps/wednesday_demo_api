module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('user', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
      is: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    user_name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    contact_no: {
      type: Sequelize.BIGINT(11),
      allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('user'),
};
