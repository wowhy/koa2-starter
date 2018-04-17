import Router from 'koa-router'
import graphql from 'koa-graphql'
import { printSchema } from 'graphql'

import HttpError from '../../fx/HttpError'

import schema from '../graphql/schema'
import rootValue from '../graphql/root'

const router = new Router()

router.all(
  '/graphql',
  graphql({
    schema,
    rootValue,
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

router.all('/graphql/schema', ctx => {
  ctx.body = printSchema(schema)
})

export default router.routes()
