const { Sequelize } = require('sequelize')
const { config } = require('../config/config')
const setupModels = require('../db/models/');

// const USER = encodeURIComponent(config.dbUser)
// const PASSWORD = encodeURIComponent(config.dbPassword)
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`
const options ={
  dialect: config.dbEngine,
  logging: config.production? false : true,
}

if (config.production) {
  options.dialectModule = require('pg')
}

const sequelize = new Sequelize(config.dbUrl,options)

setupModels(sequelize);


module.exports = sequelize;
