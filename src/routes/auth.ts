import { Router } from 'express'
import * as AuthController from '@/controllers/auth'

const router: Router = Router()

router.post('/login', AuthController.getUserLogin)

export default router
