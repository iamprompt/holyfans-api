import { Router } from 'express'
import * as PostsController from '@/controllers/posts'
import { roleChecked, verifyUserToken } from '@/controllers/auth'
import { USER_TYPE } from '@/utils/constant'

const router: Router = Router()

router.use(verifyUserToken)
router.use(roleChecked(USER_TYPE.ADMIN))

router.get('/all', PostsController.getAllPosts)

router.get('/', PostsController.getPostById)
router.post('/', PostsController.createPost)
router.put('/', PostsController.updatePost)
router.delete('/', PostsController.deletePost)

export default router
