import { Router } from 'express'
import * as UsersController from '@/controllers/users'
import { roleChecked, verifyUserToken } from '@/controllers/auth'
import { USER_TYPE } from '@/utils/constant'

const router: Router = Router()

router.use(verifyUserToken)

/**
 * GET /users
 * @description Get All users in the system (Require Admin Privillege)
 * Body: None
 * Response: <application/json>
 *
 */
router.get('/all', roleChecked(USER_TYPE.ADMIN), UsersController.getAllUsers)

router.get('/', UsersController.getUserById)

/**
 * POST /users
 * @description Create a new user from the data provided. This will also generate the uId for a user
 * Body: <application/json>
 * {
 *   "firstName": "Supakarn",
 *   "lastName": "Laorattanakul",
 *   "displayName": "Prompt",
 *   "email": "iamprompt@gmail.com",
 *   "password": "12345678"
 * }
 *
 * Response: <application/json>
 * {
 *   "status": "success",
 *   "payload": {
 *     "id": "TRqMnlm2GKTzjuEwNcah",
 *     "lastName": "Laorattanakul",
 *     "role": "admin",
 *     "firstName": "Supakarn",
 *     "email": "iampromp@gmail.com",
 *     "password": "$2a$08$QlOm8J/tHu.3PpEUN0pcKurjFxcedFV1FAnyQaH9Hg2yCGs4mW.Ni",
 *     "displayName": "Prompt",
 *     "dateModified": {
 *       "_seconds": 1618484378,
 *       "_nanoseconds": 375000000
 *     },
 *     "dateCreated": {
 *       "_seconds": 1618484378,
 *       "_nanoseconds": 375000000
 *     }
 *   }
 * }
 */
router.post('/', UsersController.createUsers)
router.put('/', UsersController.updateUser)

/**
 * DELETE /users
 * @description Delete the user
 * Body: <application/json>
 * {
 *   "uid": "TRqMnlm2GKTzjuEwNcah"
 * }
 */
router.delete('/', UsersController.deleteUser)

/**
 * GET /users/search?search_keyword=
 * @description Search users by keywords (Optional)
 * Body: None
 */
router.get('/search', UsersController.searchUser)

export default router
