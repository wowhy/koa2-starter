import Router from 'koa-router'

import home from './home'
import graphql from './graphql'

const router = new Router()

router.use(graphql)
router.use(home)

export default router
