const db = require('../database/connection');

const {
  sequelize,
} = db;
const {
  Sequelize,
} = db;

module.exports = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: false,
    isEmail: true,
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
});
