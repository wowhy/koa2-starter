import Router from 'koa-router'
import graphql from 'koa-graphql'

import schema from '../graphql'

const router = new Router()

router.all(
  '/graphql',
  graphql({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
    formatError: (ex) => {
      if (ex.originalError) {
        ex = ex.originalError
      } else {
        ex = new Error(ex.message)
        ex.type = 'GraphqlException'
        ex.code = 500
      }

      throw ex
    }
  })
)

export default router.routes()
