import Router from 'koa-router'
import graphql from 'koa-graphql'

import HttpError from '../../fx/HttpError'
import schema from '../graphql'

const router = new Router()

router.all(
  '/graphql',
  graphql({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
    formatError: ex => {
      if (ex.originalError) {
        ex = ex.originalError
      } else {
        ex = new HttpError(400, 'GraphqlException', ex.message)
      }

      throw ex
    }
  })
)

export default router.routes()
