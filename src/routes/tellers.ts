// Holy Tellers
// https://holyfans-api.herokuapp.com/
// ==================================================================
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

// Get Teller information by ID

// Test Case 1
// Method: GET
// URL: /tellers?tId=Gw1jaXbRo98vXuA1XmZj

// Test Case 2
// Method: GET
// URL: /tellers?tId=tdoaer3GLzpa1DhzJq41
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

// POST Create Tellers

// Test Case 1
// method: POST
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlJLcU41engySkRtUE95WWFicmpXIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjE4NzY5NjM4fQ.qTVCdEgvrMegv4tIL8g0gyTDlguxMbV3qt2954gq2qE
// URL: /tellers
// body: raw JSON
// {
//   "contact": {
// 	"instagram": "prinnie333",
// 	"website": "https://prinnie333.com/",
// 	"youtube": "Prinnie333 Isaria",
// 	"facebook": "https://www.facebook.com/Prinnie1221/"
// 	},
//   "nameTH": "?????????????????????",
//   "category": [
// 	"Tarot"
// 	],
//   "address": {
//     "_latitude": 13.7287778701836,
// 	"_longitude": 100.5260142160489
// 	},
//   "nameEN": "Prinnie",
//   "subPrice": 359,
//   "bio": "??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? ??????????????????????????????????????????????????????????????????????????????????????????????????? ??????????????????????????????????????????????????????????????????????????????????????????????????? ????????????????????? ??? ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? ??????????????????????????????????????? ????????????????????? ????????????????????? ?????????????????? ??? ????????????????????????????????????????????? ?????????????????????????????????????????????????????????????????????????????? ??????????????????????????????????????????????????????????????????????????????",
//   "region": "Bangkok",
//   "img": "https://firebasestorage.googleapis.com/v0/b/mu-nakama.appspot.com/o/teller%2Fprofile%2Fprinnie.jpg?alt=media"
// }

// Test Case 2
// method: POST
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlJLcU41engySkRtUE95WWFicmpXIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjE4NzY5NjM4fQ.qTVCdEgvrMegv4tIL8g0gyTDlguxMbV3qt2954gq2qE
// URL: /tellers
// body: raw JSON
// {
//   "contact": {
//     "instagram": "sinsaeming_ig",
// 	   "email": "arjanjackyming@gmail.com",
//     "facebook": "https://www.facebook.com/Arjan.Jacky.Ming/"
//   },
//   "nameTH": "???????????????????????????",
//   "category": [
//     "Feng Shui"
//   ],
//   "address": {
//     "_latitude": 13.770411242938138,
//     "_longitude":  100.56982296995835
//   },
//   "nameEN": "arjanjackyming",
//   "subPrice": 219,
//   "bio": "??????????????????????????? ??????????????????????????? ?????????????????? ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? ??????????????????????????????????????? ????????????????????????????????????????????? ??????????????????????????????????????????????????? ???????????????????????????????????????????????????????????????????????????????????????????????? ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? ??????????????????????????????????????? ??????????????????????????????????????????????????? ?????????????????????????????????????????????????????????????????????????????? ????????????????????????????????? ????????????????????? ????????????????????????????????????????????????????????? ??? ????????????????????????????????????",
//   "region": "Bangkok",
//   "img": "https://firebasestorage.googleapis.com/v0/b/mu-nakama.appspot.com/o/teller%2Fprofile%2Fming.jpg?alt=media"
// }
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

// PUT Update Tellers

// Test Case 1
// method: PUT
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlJLcU41engySkRtUE95WWFicmpXIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjE4NzY5NjM4fQ.qTVCdEgvrMegv4tIL8g0gyTDlguxMbV3qt2954gq2qE
// URL: /tellers
// body: raw JSON
// {
//   "id": "GMRvJlbc6eTRLXO9SMuD",
//   "contact": {
//     "instagram": "@aa"
//   },
//   "nameTH": "????????????????????????????????????",
//   "category": [
//     "Tarot"
//   ],
//   "address": {
//     "_latitude": 13,
//     "_longitude": 100
//   },
//   "nameEN": "Tub",
//   "subPrice": 113,
//   "bio": "?????????????????????????????????",
//   "region": "Bangkok",
//   "img": "https://images.unsplash.com/photo-1618625874408-63028f30b73a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
// }

// Test Case 2
// method: PUT
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlJLcU41engySkRtUE95WWFicmpXIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjE4NzY5NjM4fQ.qTVCdEgvrMegv4tIL8g0gyTDlguxMbV3qt2954gq2qE
// URL: /tellers
// body: raw JSON
// {
//   "id": "O3ADR0ZvJ2KachFDLI8c",
//   "contact": {
//     "instagram": "@KIIKKIMM"
//   },
//   "nameTH": "?????????????????????????????? ???????????????????????????????????????????????????????????????????????????",
//   "category": [
//     "Tarot", "Feng Shui"
//   ],
//   "address": {
//     "_latitude": 13,
//     "_longitude": 100
//   },
//   "nameEN": "KIMMY",
//   "subPrice": 999,
//   "bio": "??????????????????????????????????????????????????????????????????",
//   "region": "Bangkok"
// }
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

// *** Bearer Token of Admin need to provide in order to work ***
// DEL Delete Tellers

// Test Case 1
// Method: DELETE
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlJLcU41engySkRtUE95WWFicmpXIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjE4NzY5NjM4fQ.qTVCdEgvrMegv4tIL8g0gyTDlguxMbV3qt2954gq2qE
// URL: /tellers?tId=Gw1jaXbRo98vXuA1XmZj

// Test Case 2
// Method: DELETE
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlJLcU41engySkRtUE95WWFicmpXIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjE4NzY5NjM4fQ.qTVCdEgvrMegv4tIL8g0gyTDlguxMbV3qt2954gq2qE
// URL: /tellers?tId=VGvFnjvtMvpFgUREjpPI
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

// GET all of the tellers

// Test Case 1
// Method: GET
// URL: /tellers/all
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

// GET Search Tellers

// Test Case 1
// Method: GET
// URL: /tellers/search?search_keyword=&categories=Tarot&area=Central&price_range=4

// Test Case 2
// Method: GET
// URL: /tellers/search?search_keyword=&categories=Candle+prediction&area=Bangkok&price_range=2
router.get('/search', TellersController.searchTellers)

export default router
