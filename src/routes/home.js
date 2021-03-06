import Router from 'koa-router'
import HomeCtrl from '../controllers/HomeCtrl'

// import authenticate from '../middlewares/authenticate'

const router = new Router()
const ctrl = new HomeCtrl()

// router.get('/', authenticate, ctrl.index)
router.get('/', ctrl.index)
router.get('*', ctrl.error404)

export default router.routes()
