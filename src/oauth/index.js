import KoaOAuthServer from '../../fx/oauth/KoaOAuthServer'
import model from '../../fx/oauth/model'

import Router from 'koa-router'
import Sequelize from 'sequelize'
import util from 'util'

export default function(app, config) {
  let oauth = (app.oauth = new KoaOAuthServer({
    model: model(config),
    grants: config.grants,
    debug: process.env.NODE_ENV === 'development',
    requireClientAuthentication: {
      password: false,
      refresh_token: false
    },
    allowExtendedTokenAttributes: true,
    allowBearerTokensInQueryString: true,
    accessTokenLifetime: config.accessTokenLifetime,
    refreshTokenLifetime: config.refreshTokenLifetime
  }))

  let router = new Router()

  router.post('/oauth/token', oauth.token())

  app.use(router.routes())
}