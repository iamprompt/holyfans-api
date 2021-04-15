import { Router } from 'express'
import * as UsersController from '@/controllers/users'
import { roleChecked, verifyUserToken } from '@/controllers/auth'
import { USER_TYPE } from '@/utils/constant'

const router: Router = Router()

router.use(verifyUserToken)

/**
 * GET /users
 * @description Get All users in the system (Require Admin Privillege)
 */
router.get('/', roleChecked(USER_TYPE.ADMIN), UsersController.getAllUsers)

/**
 * POST /users
 * @description Create a new user from the data provided. This will also generate the uId for a user
 */
router.post('/', UsersController.createUsers)

/**
 * GET /users/search?search_keyword=
 * @description Search users by keywords (Optional)
 */
router.get('/search', UsersController.searchUser)

export default router
