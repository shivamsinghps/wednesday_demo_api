const Sequelize = require('sequelize');


// const sequelize = new Sequelize(process.env.DB, process.env.DB_USERNAME, process.env.DB_PASS, {
//   host: process.env.DB_HOST,
//   dialect: 'mysql',
// });
const sequelize = new Sequelize('wed', 'root', 'shivam1997*', {
  host: '127.0.0.1',
  dialect: 'mysql',
});


const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
