import { Router } from 'express'
import * as AuthController from '@/controllers/auth'
import * as UserController from '@/controllers/users'

const router: Router = Router()

/**
 * POST /auth/login
 * @description Login from data provided by user and return the token with user information
 * Body: <application/json>
 *
 * Response: <application/json>
 *
 */

// Login to the system to get token

// Test Case 1 (Save the token from the response for USER privilege)
// method: POST
// URL: /auth/login
// body: raw JSON
// {
//   "email": "testadmin@gmail.com",
//   "password": "12345678"
// }

// Test Case 2 (Save the token from the response for ADMIN privilege)
// method: POST
// URL: /auth/login
// body: raw JSON
// {
//   "email": "testuser@gmail.com",
//   "password": "12345678"
// }
router.post('/login', AuthController.getUserLogin)

/**
 * POST /auth/logout
 * @description Log user logout action
 * Authorization: JWT
 * Body: None
 * Response: <application/json>
 * {
 *   "status": "success"
 * }
 */

// Add log that the user has logout (The logout action is to remove token from the frontend localstorage)

// Test Case 1
// method: POST
// Authorization: Bearer ...JWT from USER login...
// URL: /auth/logout

// Test Case 2
// method: POST
// Authorization: Bearer ...JWT from ADMIN login...
// URL: /auth/logout
router.post('/logout', AuthController.verifyUserToken, AuthController.logout)

/**
 * POST /auth/register
 * @description Register the users to the system
 * Body: <application/json>
 * {
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

// User register to the system (from register page)

// Test Case 1
// method: POST
// URL: /auth/register
// body: raw JSON
// {
//   "firstName": "Supaprompt",
//   "lastName": "Laorattanaprompt",
//   "email": "supaprompt.l@gmail.com",
//   "password": "12345678"
// }

// Test Case 2
// method: POST
// URL: /auth/register
// body: raw JSON
// {
//   "firstName": "Thanatime",
//   "lastName": "Sapmontham",
//   "email": "thanatime.s@gmail.com",
//   "password": "12345678"
// }
router.post('/register', UserController.createUsers)

export default router
