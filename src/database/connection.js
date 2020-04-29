const Sequelize = require('sequelize')


// const sequelize = new Sequelize(process.env.DB, process.env.DB_USERNAME, process.env.DB_PASS, {
//   host: process.env.DB_HOST,
//   dialect: 'mysql',
// });
const DBname = process.env.NODE_ENV === 'test' ? 'wedtest' : 'wed'
const sequelize = new Sequelize(DBname, 'root', 'shivam1997*', {
	host: '127.0.0.1',
	dialect: 'mysql',
})


const db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
