const Sequelize = require('sequelize')


const sequelize

if (process.env.NODE_ENV === 'test') {
	sequelize = new Sequelize(process.env.DB_TEST, process.env.DB_USERNAME_TEST, process.env.DB_PASS_TEST, {
		host: process.env.DB_HOST_TEST,
		dialect: 'mysql',
	})
} else {
	sequelize = new Sequelize(process.env.DB, process.env.DB_USERNAME, process.env.DB_PASS, {
		host: process.env.DB_HOST,
		dialect: 'mysql',
	})
}

const db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
