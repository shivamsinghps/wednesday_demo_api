module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('bokings', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    booking_status: {
      type: Sequelize.STRING(11),
      allowNull: false,
      isIn: [
        ['completed', 'canceled'],
      ],
    },
    initial_loc: {
      type: Sequelize.GEOMETRY('POINT'),
      allowNull: false,
    },
    final_loc: {
      type: Sequelize.GEOMETRY('POINT'),
      allowNull: false,
    },
    booking_amt: {
      type: Sequelize.INTEGER(5),
      allowNull: true,
      defaultValue: 0,
    },
    user_id: {
      type: Sequelize.INTEGER(11),
      alllowNull: false,
    },
    car_id: {
      type: Sequelize.INTEGER(11),
      alllowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('bokings'),
};
