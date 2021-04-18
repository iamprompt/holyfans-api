// Holy Teller s
// https://holyfans-api.herokuapp.com/
// ==================================================================
// To perform users operation, user need log in as 'admin'
// and use 'Bearer token' when perform operation
// ==================================================================

// GET Get All Users 

// /users/all

// ==================================================================

// GET Get User by ID 

// /users?uId=i6MlbWXozwl5KzvC2jA0
// /users?uId=2S0xDIsDLXgwP09e44io

// ==================================================================

// GET Search Users 

// /users/search?search_keyword=vea
// /users/search?search_keyword=prom

// ==================================================================

// POST Create User 

// method: POST
// URL: /users
// body: raw JSON
// {
//   "role": "user",
//   "firstName": "Wudhichart",
//   "lastName": "Sawangphol",
//   "email": "wudhichart.saw@gmail.com",
//   "password": "9999999999"
// } 

// method: POST
// URL: /users
// body: raw JSON
// {
//   "role": "user",
//   "firstName": "Jidapa",
//   "lastName": "Kraisangka",
//   "email": "jidapa.kra@gmail.com",
//   "password": "88888888888"
// }

// ==================================================================

// PUT Update User 

// method: PUT
// URL: /users
// body: raw JSON
// {
//   "id": "HtlvQXu9nBhHH5kyNKeV",
//   "role": "admin",
//   "firstName": "Supakarn",
//   "lastName": "Laorattanakul",
//   "displayName": "Promptu",
// }

// method: PUT
// URL: /users
// body: raw JSON
// {
//   "id": "2S0xDIsDLXgwP09e44io",
//   "firstName": "Veerakit",
//   "lastName": "Prasertpol",
//   "displayName": "pete",
// }

// ==================================================================

// DEL Delete User 
// /users?uId=2S0xDIsDLXgwP09e44io
// /users?uId=OBVQiKu8TN7pQ8aqjzoj

// ==================================================================

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
