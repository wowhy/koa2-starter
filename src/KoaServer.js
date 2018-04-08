import Koa from 'koa'

import session from 'koa-session'
import bodyParser from 'koa-bodyparser'
import compress from 'koa-compress'
import staticCache from 'koa-static-cache'
import redis from 'koa-redis'

import oauthServer from './oauth'
import logger from '../fx/logger'

export default class KoaServer {
  constructor(context) {
    this.config = context.config
  }
  async start() {
    const config = this.config
    const app = new Koa()
    const port = config.port

    await require('./models').init(config.database)
    await require('../fx/oauth/db').init(config.oauth)

    app.config = config

    app.keys = config.secrets

    app.use(bodyParser())
    app.use(compress())
    app.use(
      session(
        {
          ...config.session,
          store: redis({
            host: config.redis.host,
            port: config.redis.port,
            auth_pass: config.redis.password || ''
          })
        },
        app
      )
    )
    app.use(staticCache('./static', config.static))

    await oauthServer(app, config.oauth)

    app.use(async (ctx, next) => {
      ctx.config = config
      await next()
    })

    const router = require('./routes').default

    app.use(router.routes()).use(router.allowedMethods())

    app.listen(port, () => {
      logger.info(`Listening Port ${port}...`)
    })
  }
  stop() {
    logger.info('Stoping')
  }
}
