const db = require('../database/connection');

const {
  sequelize,
} = db;
const {
  Sequelize,
} = db;

module.exports = sequelize.define('car', {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  car_reg_no: {
    type: Sequelize.STRING(13),
    allowNull: false,
    is: /^([A-Z|a-z]{2}\s{1}\d{2}\s{1}[A-Z|a-z]{1,2}\s{1}\d{1,4})?([A-Z|a-z]{3}\s{1}\d{1,4})?$/,
    unique: true,
  },
  car_con_no: {
    type: Sequelize.BIGINT(11),
    allowNull: false,
  },
  driver_name: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  car_location: {
    type: Sequelize.GEOMETRY('POINT'),
    allowNull: false,
  },
  car_model: {
    type: Sequelize.STRING(15),
    allowNull: false,
  },
  car_status: {
    type: Sequelize.STRING(15),
    isIn: [
      ['open', 'inTransit'],
    ],
    allowNull: false,
  },
});
// IF wanna use regex for email
// /^([A-Z|a-z]{2}\s{1}\d{2}\s{1}[A-Z|a-z]{1,2}\s{1}\d{1,4})?([A-Z|a-z]{3}\s{1}\d{1,4})?$/
