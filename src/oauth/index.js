import KoaOAuthServer from './KoaOAuthServer'
import Router from 'koa-router'
import util from 'util'

import model from './model'

export default function(app, config) {
  let oauth = (app.oauth = new KoaOAuthServer({
    model: model(config.database),
    grants: config.grants,
    debug: process.env.NODE_ENV === 'development',
    requireClientAuthentication: {
      password: false,
      refresh_token: false
    },
    allowExtendedTokenAttributes: true,
    accessTokenLifetime: config.accessTokenLifetime || 2 * 60 * 60,
    refreshTokenLifetime: config.refreshTokenLifetime || 30 * 24 * 60 * 60
  }))

  let router = new Router()

  router.post('/oauth/token', oauth.token())

  app.use(router.routes())
}
