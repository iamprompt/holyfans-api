import { Router } from 'express'
import * as UsersController from '@/controllers/users'
import { roleChecked, verifyUserToken } from '@/controllers/auth'
import { USER_TYPE } from '@/utils/constant'

const router: Router = Router()

router.use(verifyUserToken)

router.get('/', roleChecked(USER_TYPE.ADMIN), UsersController.getAllUsers)
router.get('/get', UsersController.getUser)
router.get('/:uId', UsersController.getUserById)

router.post('/', UsersController.createUsers)

export default router
