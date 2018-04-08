import Sequelize from 'sequelize'

import logger from '../logger'

const db = {
  initialize: false
}

function initDatabase(config) {
  config.accessTokenLifetime = config.accessTokenLifetime || 2 * 60 * 60
  config.refreshTokenLifetime = config.refreshTokenLifetime || 30 * 24 * 60 * 60

  let sequelize = new Sequelize(config.database.dbname, config.database.user, config.database.password, {
    host: config.database.host,
    port: config.database.port,
    dialect: 'postgres',
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: (message) => logger.info(message, process.pid)
  })

  sequelize.import('./models/client')
  sequelize.import('./models/token')
  sequelize.import('./models/user')

  sequelize.sync()

  Object.keys(sequelize.models).forEach(k => {
    db[k] = sequelize.models[k]
  })

  db.initialize = true
}

export default function(config) {
  if (db.initialize) {
    return db
  }

  initDatabase(config)
  return db
}
