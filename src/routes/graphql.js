import Router from 'koa-router'
import graphql from 'koa-graphql'

const router = new Router()

router.all('/graphql', graphql({
  // schema: MyGraphQLSchema,
  graphiql: true
}))

export default router.routes()
