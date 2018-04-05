import Koa from 'koa'

import session from 'koa-session'
import bodyParser from 'koa-bodyparser'
import compress from 'koa-compress'
import staticCache from 'koa-static-cache'
import redis from 'koa-redis'
import router from './routes'
import { init } from './models'

export default class KoaServer {
  constructor(context) {
    this.config = context.config
  }
  start() {
    const config = this.config
    const app = new Koa()
    const port = config.port

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

    app.use(async (ctx, next) => {
      ctx.config = config
      await next()
    })
    app.use(router.routes()).use(router.allowedMethods())

    init(config.database)

    app.listen(port, () => {
      console.log(`Listening Port ${port}...`)
    })
  }
  stop() {
    console.log('Stoping')
  }
}
