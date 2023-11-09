 require('dotenv').config()
 module.exports={
  development: {

  },
  test: {
    use_env_variable:process.env.use_env_variable
  },
  production: {
    username: process.env.user_name,
    password: process.env.password,
    database: process.env.database,
    host: process.env.host,
    dialect: process.env.dialect,

  }
 }