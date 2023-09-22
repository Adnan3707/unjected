 require('dotenv').config()
 module.exports={
  development: {

  },
  test: {

  },
  production: {
    username: process.env.user_name,
    password: process.env.password,
    database: process.env.database,
    host: process.env.host,
    dialect: process.env.dialect,

  }
 }