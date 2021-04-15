import { Router } from 'express'
import * as UsersController from '@/controllers/users'
import { verifyUserToken } from '@/controllers/auth'

const router: Router = Router()

router.use(verifyUserToken)

router.get('/', UsersController.getAllUsers)
router.get('/get', UsersController.getUser)
router.get('/:uId', UsersController.getUserById)

router.post('/', UsersController.createUsers)

export default router
