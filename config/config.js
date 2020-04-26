require('dotenv')
  .config();

module.exports = {
  development: {
    username: 'root',
    password: 'shivam1997*',
    database: 'wed',
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: false,
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: false,
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: false,
  },
};
// development: {
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASS,
//   database: process.env.DB,
//   host: process.env.DB_HOST,
//   dialect: 'mysql',
//   operatorsAliases: false,
// }
