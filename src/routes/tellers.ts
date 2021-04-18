import { Router } from 'express'
import * as TellersController from '@/controllers/tellers'
import { roleChecked, verifyUserToken } from '@/controllers/auth'
import { USER_TYPE } from '@/utils/constant'

const router: Router = Router()

/**
 * GET /tellers?tId=...
 * @description Get teller's data by Teller unique ID
 * Body: None
 * Response: <application/json>
 * {
 *   "status": "success",
 *   "payload": {
 *     "id": "",
 *     "contact": {
 *       "line": "",
 *       "facebook": "",
 *       "phoneNum": "",
 *       "website": "",
 *       "twitter": "",
 *       "email": "",
 *       "instagram": ""
 *     },
 *     "address": {
 *       "_latitude": ,
 *       "_longitude":
 *     },
 *     "region": "",
 *     "nameTH": "",
 *     "bio": "",
 *     "category": [
 *       ""
 *     ],
 *     "img": "",
 *     "subPrice": ,
 *     "nameEN": "",
 *     "posts": [
 *       {
 *         "id": "",
 *         "content": "",
 *         "img": "",
 *         "dateCreated": {
 *           "_seconds": ,
 *           "_nanoseconds":
 *         }
 *       },
 *       ...
 *     ]
 *   }
 * }
 */
router.get('/', TellersController.getTellerById)

/**
 * POST /tellers
 * @description Add teller data
 * Authorization: JWT (Admin Required)
 * Body: <application/json>
 * {
 *   "nameTH": "",
 *   "nameEN": "",
 *   "bio": "",
 *   "img": "",
 *   "subPrice": ,
 *   "region": "",
 *   "contact": {
 *     "instagram": ""
 *   },
 *   "category": [
 *     ""
 *   ],
 *   "address": {
 *     "_latitude": ,
 *     "_longitude":
 *   },
 * }
 * Response: <application/json>
 * {
 *   "status": "success",
 *   "payload": {
 *     "id": "",
 *     "region": "",
 *     "contact": {
 *       "instagram": ""
 *     },
 *     "category": [
 *       ""
 *     ],
 *     "img": "",
 *     "nameTH": "",
 *     "nameEN": "",
 *     "dateCreated": {
 *       "_seconds": ,
 *       "_nanoseconds":
 *     },
 *     "address": {
 *       "_longitude": ,
 *       "_latitude":
 *     },
 *     "bio": "",
 *     "dateModified": {
 *       "_seconds": ,
 *       "_nanoseconds":
 *     },
 *     "subPrice":
 *   }
 * }
 */
router.post(
  '/',
  verifyUserToken,
  roleChecked(USER_TYPE.ADMIN),
  TellersController.createTeller,
)

/**
 * PUT /tellers
 * @description Update Teller Data
 * Authorization: JWT (Admin Required)
 * Body: <application/json>
 * {
 *   "id": ""
 *   "nameTH": "",
 *   "nameEN": "",
 *   "bio": "",
 *   "img": "",
 *   "subPrice": ,
 *   "region": "",
 *   "contact": {
 *     "instagram": ""
 *   },
 *   "category": [
 *     ""
 *   ],
 *   "address": {
 *     "_latitude": ,
 *     "_longitude":
 *   },
 * }
 * Response: <application/json>
 * {
 *   "status": "success",
 *   "payload": {
 *     "id": "",
 *     "region": "",
 *     "contact": {
 *       "instagram": ""
 *     },
 *     "category": [
 *       ""
 *     ],
 *     "img": "",
 *     "nameTH": "",
 *     "nameEN": "",
 *     "dateCreated": {
 *       "_seconds": ,
 *       "_nanoseconds":
 *     },
 *     "address": {
 *       "_longitude": ,
 *       "_latitude":
 *     },
 *     "bio": "",
 *     "dateModified": {
 *       "_seconds": ,
 *       "_nanoseconds":
 *     },
 *     "subPrice":
 *   }
 * }
 */
router.put(
  '/',
  verifyUserToken,
  roleChecked(USER_TYPE.ADMIN),
  TellersController.updateTeller,
)

/**
 * DELETE /tellers?tId=...
 * @description Delete the teller by teller ID (Require Admin Privillege)
 * Authorization: JWT (Admin Required)
 * Body: None
 * Response: <application/json>
 * {
 *   "status": "success",
 *   "payload": {
 *     "_writeTime": {
 *         "_seconds": ,
 *         "_nanoseconds":
 *     }
 *   }
 * }
 */
router.delete(
  '/',
  verifyUserToken,
  roleChecked(USER_TYPE.ADMIN),
  TellersController.deleteTellers,
)

/**
 * GET /tellers/all
 * @description Get All users in the system
 * Body: None
 * Response: <application/json>
 * {
 *   "status": "success",
 *   "payload": [
 *     {
 *       "id": "",
 *       "region": "",
 *       "contact": {
 *         "instagram": ""
 *       },
 *       "category": [
 *         ""
 *       ],
 *       "img": "",
 *       "nameTH": "",
 *       "nameEN": "",
 *       "dateCreated": {
 *         "_seconds": ,
 *         "_nanoseconds":
 *       },
 *       "address": {
 *         "_longitude": ,
 *         "_latitude":
 *       },
 *       "bio": "",
 *       "dateModified": {
 *         "_seconds": ,
 *         "_nanoseconds":
 *       },
 *       "subPrice":
 *     }
 *     ...
 *   ]
 * }
 */
router.get('/all', TellersController.getAllTellers)

/**
 * GET /tellers/search?search_keyword=...&categories=...&area=...&price_range=...
 * @description Search users by keywords and other criterias
 * Body: None
 * Response: <application/json>
 * {
 *   "status": "success",
 *   "payload": [
 *     {
 *       "id": "",
 *       "region": "",
 *       "contact": {
 *         "instagram": ""
 *       },
 *       "category": [
 *         ""
 *       ],
 *       "img": "",
 *       "nameTH": "",
 *       "nameEN": "",
 *       "dateCreated": {
 *         "_seconds": ,
 *         "_nanoseconds":
 *       },
 *       "address": {
 *         "_longitude": ,
 *         "_latitude":
 *       },
 *       "bio": "",
 *       "dateModified": {
 *         "_seconds": ,
 *         "_nanoseconds":
 *       },
 *       "subPrice":
 *     }
 *     ...
 *   ]
 * }
 */
router.get('/search', TellersController.searchTellers)

export default router
