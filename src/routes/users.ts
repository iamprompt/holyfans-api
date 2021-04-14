import { Router } from 'express'
import * as UsersController from '@/controllers/users'

const router: Router = Router()

router.get('/', UsersController.getAllUsers)
router.get('/:uId', UsersController.getUserById)

export default router
