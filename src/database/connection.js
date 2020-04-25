const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB, process.env.DB_USERNAME, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});


const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
