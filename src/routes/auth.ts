import { Router } from 'express'
import * as AuthController from '@/controllers/auth'
import * as UserController from '@/controllers/users'

const router: Router = Router()

router.post('/login', AuthController.getUserLogin)
router.post('/register', UserController.createUsers)

export default router
