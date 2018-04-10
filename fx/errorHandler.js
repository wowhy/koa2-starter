import util from 'util'

import logger from './logger'

export default async function(ctx, next) {
  let start = new Date()
  let err = false
  try {
    await next()

    if (ctx.status >= 400 && ctx.path === '/graphql') {
      err = util.isString(ctx.body) ? JSON.parse(ctx.body) : ctx.body
      let innerErr = err.errors[0]
      try {
        err = JSON.parse(innerErr.message)
      } catch (ex) {
        err = {
          error: {
            code: ctx.status,
            type: 'GraphqlException',
            message: innerErr.message
          }
        }
      }

      ctx.body = err
    }
  } catch (ex) {
    logger.error(ex)
    if (ctx.status < 400) {
      ctx.status = ex.code || 500
    }
    ctx.body = err = {
      error: {
        code: ex.code,
        type: ex.type || ex.toString(),
        message: ex.message
      }
    }
  }

  let time = new Date() - start
  logger.info(
    `POST ${ctx.req.url} status=${ctx.status} time=${time}ms error=${JSON.stringify(err)} logged=${
      ctx.state.oauth && ctx.state.oauth.token && ctx.state.oauth.token.user
        ? ctx.state.oauth.token.user.id + ':' + ctx.state.oauth.token.user.username
        : false
    }`
  )
}
