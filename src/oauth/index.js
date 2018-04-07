import KoaOAuthServer from './KoaOAuthServer'
import Router from 'koa-router'
import Sequelize from 'sequelize'
import util from 'util'

import model from './model'

const db = {}

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
    }
  })

  sequelize.import('./models/client')
  sequelize.import('./models/token')
  sequelize.import('./models/user')

  sequelize.sync()

  Object.keys(sequelize.models).forEach(k => {
    db[k] = sequelize.models[k]
  })
}

export default function(app, config) {
  initDatabase(config)

  let oauth = (app.oauth = new KoaOAuthServer({
    model: model(config, db),
    grants: config.grants,
    debug: process.env.NODE_ENV === 'development',
    requireClientAuthentication: {
      password: false,
      refresh_token: false
    },
    allowExtendedTokenAttributes: true,
    accessTokenLifetime: config.accessTokenLifetime,
    refreshTokenLifetime: config.refreshTokenLifetime
  }))

  let router = new Router()

  router.post('/oauth/token', oauth.token())

  app.use(router.routes())
}
