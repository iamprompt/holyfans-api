import { Router } from 'express'
import * as UsersController from '@/controllers/users'
import { roleChecked, verifyUserToken } from '@/controllers/auth'
import { USER_TYPE } from '@/utils/constant'

const router: Router = Router()

router.use(verifyUserToken)

/**
 * GET /user?uId=...
 * @description Get user's data by User unique ID
 * Authorization: JWT
 * Body: None
 * Response: <application/json>
 * {
 *   "status": "success",
 *   "payload": {
 *     "id": "",
 *     "role": "admin",
 *     "displayName": "",
 *     "isActive": ,
 *     "firstName": "",
 *     "lastName": ""
 *     "email": "",
 *     "dateModified": {
 *       "_seconds": ,
 *       "_nanoseconds":
 *     },
 *     "dateCreated": {
 *       "_seconds": ,
 *       "_nanoseconds":
 *     },
 *   }
 * }
 */
router.get('/', UsersController.getUserById)

/**
 * POST /users
 * @description Create a new user from the data provided. This will also generate the uId for a user
 * Authorization: JWT
 * Body: <application/json>
 * {
 *   "role": ""
 *   "firstName": "",
 *   "lastName": "",
 *   "displayName": "",
 *   "email": "",
 *   "password": ""
 * }
 *
 * Response: <application/json>
 * {
 *   "status": "success",
 *   "payload": {
 *     "id": "",
 *     "lastName": "",
 *     "role": "",
 *     "firstName": "",
 *     "email": "",
 *     "displayName": "",
 *     "dateModified": {
 *       "_seconds": ,
 *       "_nanoseconds":
 *     },
 *     "dateCreated": {
 *       "_seconds": ,
 *       "_nanoseconds":
 *     }
 *   }
 * }
 */
router.post('/', UsersController.createUsers)

/**
 * UPDATE /users?uId=...
 * @description Delete the user by user ID (Require Admin Privillege)
 * Authorization: JWT
 * Body: <application/json>
 * {
 *   "id": "",
 *   "role": "",
 *   "firstName": "",
 *   "lastName": "",
 *   "displayName": "",
 *   "email": ""
 * }
 * Response: <application/json>
 * {
 *   "status": "success",
 *   "payload": {
 *     "_writeTime": {
 *         "_seconds": ,
 *         "_nanoseconds":
 *     }
 *   }
 * }
 */
router.put('/', UsersController.updateUser)

/**
 * DELETE /users?uId=...
 * @description Delete the user by user ID (Require Admin Privillege)
 * Authorization: JWT (Admin Required)
 * Body: None
 * Response: <application/json>
 * {
 *   "status": "success",
 *   "payload": {
 *     "_writeTime": {
 *         "_seconds": ,
 *         "_nanoseconds":
 *     }
 *   }
 * }
 */
router.delete('/', roleChecked(USER_TYPE.ADMIN), UsersController.deleteUser)

/**
 * GET /users/all
 * @description Get All users in the system (Require Admin Privillege)
 * Authorization: JWT (Admin Required)
 * Body: None
 * Response: <application/json>
 * {
 *   "status": "success",
 *   "payload": [
 *     {
 *       "id": "",
 *       "firstName": "",
 *       "isActive": ,
 *       "role": "",
 *       "email": "",
 *       "dateModified": {
 *         "_seconds": ,
 *         "_nanoseconds":
 *       },
 *       "lastName": "",
 *       "dateCreated": {
 *         "_seconds": ,
 *         "_nanoseconds":
 *       }
 *     },
 *     ...
 *   ]
 * }
 */
router.get('/all', roleChecked(USER_TYPE.ADMIN), UsersController.getAllUsers)

/**
 * GET /users/search?search_keyword=...
 * @description Search users by keywords (Optional)
 * Authorization: JWT (Admin Required)
 * Body: None
 * Response: <application/json>
 * {
 *   "status": "success",
 *   "payload": [
 *     {
 *       "id": "",
 *       "dateModified": {
 *         "_seconds": ,
 *         "_nanoseconds":
 *       },
 *       "lastName": "",
 *       "email": "",
 *       "isActive": ,
 *       "firstName": "",
 *       "role": "",
 *       "dateCreated": {
 *         "_seconds": ,
 *         "_nanoseconds":
 *       }
 *     },
 *     ...
 *   ]
 * }
 */
router.get('/search', roleChecked(USER_TYPE.ADMIN), UsersController.searchUser)

export default router
