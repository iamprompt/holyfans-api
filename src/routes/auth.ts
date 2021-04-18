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
