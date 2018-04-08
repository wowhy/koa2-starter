import logger from './logger'

export default async function(ctx, next) {
  let start = new Date()
  let err = false
  try {
    await next()

    if (ctx.status >= 400 && !ctx.body.error) {
      if (ctx.path === '/graphql') ctx.body = JSON.parse(ctx.body)
      ctx.body = err = {
        error: {
          code: ctx.status,
          message:
            ctx.body.message ||
            (ctx.body.errors && ctx.body.errors.length > 0 ? ctx.body.errors[0].message : 'Failed!')
        }
      }
    }
  } catch (ex) {
    if (ctx.status < 400) {
      ctx.status = ex.status || 500
    }
    err = {
      error: {
        code: ex.code,
        message: ex.message
      }
    }
  }

  let time = new Date() - start
  logger.info(
    `POST ${ctx.req.url} status=${ctx.status} time=${time}ms error=${JSON.stringify(err)}`,
    `pid=${process.pid}`
  )
}
