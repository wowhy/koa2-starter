import Router from 'koa-router'
import graphql from 'koa-graphql'

import schema from '../graphql'

const router = new Router()

router.all(
  '/graphql',
  graphql({
    schema,
    graphiql: true
  })
)

export default router.routes()
