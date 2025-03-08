const { config } = require('../config/config')

// const USER = encodeURIComponent(config.dbUser)
// const PASSWORD = encodeURIComponent(config.dbPassword)
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

module.exports={
  development:{
    url: config.dbUrl,
    dialect: config.dbEngine,
  },
  production:{
    url:config.dbUrl,
    dialect:config.dbEngine ,
    dialectOptions:{
      ssl:{
        rejectUnauthorized:false,
      }
    }
  }
}
