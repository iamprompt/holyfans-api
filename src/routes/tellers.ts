import { Router } from 'express'
import * as TellersController from '@/controllers/tellers'
import { roleChecked, verifyUserToken } from '@/controllers/auth'
import { USER_TYPE } from '@/utils/constant'

const router: Router = Router()

router.get('/', TellersController.getTellerById)
router.post(
  '/',
  verifyUserToken,
  roleChecked(USER_TYPE.ADMIN),
  TellersController.createTeller,
)
router.put(
  '/',
  verifyUserToken,
  roleChecked(USER_TYPE.ADMIN),
  TellersController.updateTeller,
)

router.delete(
  '/',
  verifyUserToken,
  roleChecked(USER_TYPE.ADMIN),
  TellersController.deleteTellers,
)

router.get('/all', TellersController.getAllUsers)

router.get('/search', TellersController.searchTellers)

export default router
