import { Router } from 'express'
import * as TellersController from '@/controllers/tellers'
import { roleChecked, verifyUserToken } from '@/controllers/auth'
import { USER_TYPE } from '@/utils/constant'

const router: Router = Router()

router.get('/', TellersController.getAllUsers)

router.get('/search', TellersController.searchTellers)

export default router
