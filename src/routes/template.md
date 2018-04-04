```javascript
import Router from 'koa-router'
import HomeCtrl from '../controllers/HomeCtrl'

const router = new Router()
const ctrl = new HomeCtrl()

router.get('/', ctrl.index)
router.get('*', ctrl.error404)

export default router.routes()
```
