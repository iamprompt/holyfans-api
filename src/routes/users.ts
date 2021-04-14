import { Router } from 'express'

import * as Users from '../controllers/users'

const router: Router = Router()

router.get('/', Users.getAllUsers)

export default router
