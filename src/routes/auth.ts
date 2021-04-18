// Holy Tellers
// https://holyfans-api.herokuapp.com/
// ==================================================================
// To use get function, user need log in as 'admin'
// and use 'Bearer token' when perform operation
// ==================================================================

// POST Login 

// method: POST
// URL: /auth/login
// body: raw JSON
// {
//   "email": "iamprompt11@gmail.com",
//   "password": "12345678"
// } 

// method: POST
// URL: /auth/login
// body: raw JSON
// {
//   "email": "vea@kit.com",
//   "password": "12345678"
// } 

// ==================================================================

// POST Logout

// To logout user only need to specify his/her Bearer token and pass through the logout operation

// method: POST
// URL: /auth/logout

// ==================================================================

// POST Register

// method: POST
// URL: /users
// body: raw JSON
// {
//   "role": "admin",
//   "firstName": "Supaprompt",
//   "lastName": "Laorattanaprompt",
//   "email": "promptudeva@gmail.com",
//   "password": "12345678"
// }

// method: POST
// URL: /users
// body: raw JSON
// {
//   "role": "user",
//   "firstName": "Jane",
//   "lastName": "Doe",
//   "email": "jane@doe.com",
//   "password": "12345678"
// }

// ==================================================================

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
router.post('/logout', AuthController.verifyUserToken, AuthController.logout)

/**
 * POST /auth/register
 * @description Register the users to the system
 * Body: <application/json>
 *
 * Response: <application/json>
 *
 */
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
// Test Case 1
// POST /auth/register

// Test Case 2
// POST /auth/register
router.post('/register', UserController.createUsers)

export default router
