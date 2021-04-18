// Holy Tellers
// https://holyfans-api.herokuapp.com/
// ==================================================================
// To perform some users operation, user need log in as 'admin'
// and use 'Bearer token' when perform operation
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

// *** Bearer Token of Admin need to provide in order to work ***
// GET User by ID

// Test Case 1
// Method: GET
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlJLcU41engySkRtUE95WWFicmpXIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjE4NzY5NjM4fQ.qTVCdEgvrMegv4tIL8g0gyTDlguxMbV3qt2954gq2qE
// URL: /users?uId=nmLkvnGl6HSvSNiqQmXc

// Test Case 2
// Method: GET
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlJLcU41engySkRtUE95WWFicmpXIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjE4NzY5NjM4fQ.qTVCdEgvrMegv4tIL8g0gyTDlguxMbV3qt2954gq2qE
// URL: /users?uId=RKqN5zx2JDmPOyYabrjW
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

// POST Create User

// Test Case 1
// method: POST
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlJLcU41engySkRtUE95WWFicmpXIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjE4NzY5NjM4fQ.qTVCdEgvrMegv4tIL8g0gyTDlguxMbV3qt2954gq2qE
// URL: /users
// body: raw JSON
// {
//   "role": "admin",
//   "firstName": "Wudhichart",
//   "lastName": "Sawangphol",
//   "email": "wudhichart.saw@gmail.com",
//   "password": "9999999999"
// }

// Test Case 2
// method: POST
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlJLcU41engySkRtUE95WWFicmpXIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjE4NzY5NjM4fQ.qTVCdEgvrMegv4tIL8g0gyTDlguxMbV3qt2954gq2qE
// URL: /users
// body: raw JSON
// {
//   "role": "user",
//   "firstName": "Jidapa",
//   "lastName": "Kraisangka",
//   "email": "jidapa.kra@gmail.com",
//   "password": "88888888888"
// }
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

// PUT Update User

// Test Case 1
// method: PUT
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlJLcU41engySkRtUE95WWFicmpXIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjE4NzY5NjM4fQ.qTVCdEgvrMegv4tIL8g0gyTDlguxMbV3qt2954gq2qE
// URL: /users
// body: raw JSON
// {
//   "id": "RKqN5zx2JDmPOyYabrjW",
//   "role": "admin",
//   "firstName": "TestAdmin",
//   "lastName": "SuperHolyfans"
// }

// Test Case 2
// method: PUT
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlJLcU41engySkRtUE95WWFicmpXIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjE4NzY5NjM4fQ.qTVCdEgvrMegv4tIL8g0gyTDlguxMbV3qt2954gq2qE
// URL: /users
// body: raw JSON
// {
//   "id": "nmLkvnGl6HSvSNiqQmXc",
//   "role": "user",
//   "firstName": "UnitTester",
//   "lastName": "MegaHolyfans"
// }
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

// *** Bearer Token of Admin need to provide in order to work ***
// DEL Delete User

// Test Case 1
// Method: DELETE
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlJLcU41engySkRtUE95WWFicmpXIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjE4NzY5NjM4fQ.qTVCdEgvrMegv4tIL8g0gyTDlguxMbV3qt2954gq2qE
// URL: /users?uId=RKqN5zx2JDmPOyYabrjW

// Test Case 2
// Method: DELETE
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlJLcU41engySkRtUE95WWFicmpXIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjE4NzY5NjM4fQ.qTVCdEgvrMegv4tIL8g0gyTDlguxMbV3qt2954gq2qE
// URL: /users?uId=nmLkvnGl6HSvSNiqQmXc
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

// *** Bearer Token of Admin need to provide in order to work ***
// GET All Users

// Test case 1
// Method: GET
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlJLcU41engySkRtUE95WWFicmpXIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjE4NzY5NjM4fQ.qTVCdEgvrMegv4tIL8g0gyTDlguxMbV3qt2954gq2qE
// URL: /users/all
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

// *** Bearer Token of Admin need to provide in order to work ***
// GET Search Users

// Test Case 1
// Method: GET
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlJLcU41engySkRtUE95WWFicmpXIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjE4NzY5NjM4fQ.qTVCdEgvrMegv4tIL8g0gyTDlguxMbV3qt2954gq2qE
// URL: /users/search?search_keyword=sup

// Test Case 2
// Method: GET
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlJLcU41engySkRtUE95WWFicmpXIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjE4NzY5NjM4fQ.qTVCdEgvrMegv4tIL8g0gyTDlguxMbV3qt2954gq2qE
// URL: /users/search?search_keyword=test
router.get('/search', roleChecked(USER_TYPE.ADMIN), UsersController.searchUser)

export default router
