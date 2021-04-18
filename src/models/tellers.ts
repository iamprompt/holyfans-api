import { deleteDocWithSubCollection, logToFirestore } from '@/utils'
import { ACTION_TYPE, FIREBASE_CONST } from '@/utils/constant'
import { db, _db } from '@/utils/firebase'
import { ITeller, ITellerSearchRequest } from '@/utils/types'
import { usersRef } from './users'

export const tellerRef = db.collection(FIREBASE_CONST.TELLER_COLLECTION)

/**
 * Get All Teller from Collection
 * @returns {Promise<ITeller[]>}
 */
export const getAllTellers = async (): Promise<ITeller[]> => {
  const tellerSnapshot = await tellerRef.get()
  const data = await Promise.all(
    tellerSnapshot.docs.map((t) => {
      const d = t.data()
      delete d.password
      return { id: t.id, ...d }
    }),
  )
  return data as Partial<ITeller[]>
}

/**
 * Get teller by tId
 * @param tId {string} Id of the teller
 * @returns
 */
export const getTellersById = async (tId: string) => {
  const tellerDocRef = tellerRef.doc(tId)
  const tellerSnapshot = await tellerDocRef.get()

  if (!tellerSnapshot.exists) throw new Error(`Not found the teller ${tId}`)
  const u = tellerSnapshot.data() as ITeller

  const tellerPostRef = tellerDocRef
    .collection(FIREBASE_CONST.POST_SUB_COLLECTION)
    .orderBy('dateCreated', 'desc')
  const tellerPostSnapshot = await tellerPostRef.get()
  const posts = await Promise.all(
    tellerPostSnapshot.docs.map((tP) => {
      return {
        id: tP.id,
        ...tP.data(),
      }
    }),
  )

  return {
    id: tellerSnapshot.id,
    ...u,
    posts,
  }
}

/**
 * Search Tellers from the keyword
 * @param searchKey {string} The search string from the user (Optional)
 * @returns
 */
export const searchTellers = async (searchKey: ITellerSearchRequest) => {
  const searchRegExp = new RegExp(searchKey.search_keyword, 'i')
  const areaRegExp = new RegExp(searchKey.area, 'i')
  const allTellers = await getAllTellers()

  let filteredTellers: ITeller[] = allTellers

  if (searchKey.search_keyword) {
    filteredTellers = await Promise.all(
      filteredTellers.filter((u) => {
        return u.nameTH?.match(searchRegExp) || u.nameEN?.match(searchRegExp)
      }),
    )
  }

  if (searchKey.categories) {
    filteredTellers = await Promise.all(
      filteredTellers.filter((u) => {
        return u.category?.includes(searchKey.categories)
      }),
    )
  }

  if (searchKey.area) {
    filteredTellers = await Promise.all(
      filteredTellers.filter((u) => {
        return u.region?.match(areaRegExp)
      }),
    )
  }

  if (searchKey.price_range) {
    filteredTellers = await Promise.all(
      filteredTellers.filter((u) => {
        switch (searchKey.price_range) {
          case '1':
            return u.subPrice >= 0 && u.subPrice <= 100

          case '2':
            return u.subPrice > 100 && u.subPrice <= 300

          case '3':
            return u.subPrice > 300 && u.subPrice <= 500

          case '4':
            return u.subPrice > 500 && u.subPrice <= 1000

          default:
            return true
        }
      }),
    )
  }

  return filteredTellers
}

/**
 * Add teller to collection
 * @param tellerData {Partial<ITeller>} Data of Teller that want to add
 * @param actionById {string} Id of action taker
 * @returns
 */
export const addTellers = async (
  tellerData: Partial<ITeller>,
  actionById: string,
) => {
  try {
    const resTeller = await tellerRef.add({
      ...tellerData,
      dateCreated: _db.FieldValue.serverTimestamp(),
      dateModified: _db.FieldValue.serverTimestamp(),
    })

    logToFirestore(
      db.collection(FIREBASE_CONST.USERS_COLLECTION).doc(actionById),
      ACTION_TYPE.CREATE_ACC,
    )

    return {
      id: resTeller.id,
      ...(await resTeller.get()).data(),
    }
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * Update Teller Information
 * @param tId {string} Teller id the need to update their profile
 * @param data {Partial<ITeller>} New value
 * @returns
 */
export const updateTeller = async (tId: string, data: Partial<ITeller>) => {
  try {
    const dataUpdate = {
      ...data,
      dateModified: _db.FieldValue.serverTimestamp(),
    } as Partial<ITeller>
    const tellerDocRef = tellerRef.doc(tId)
    const resUpdate = await tellerDocRef.update(dataUpdate)
    return resUpdate
  } catch (error) {
    return error
  }
}

/**
 * Delete the teller by id
 * @param tId {string} Id of teller that would like to delete
 * @param actionById {string} Id of user who take an action for logging purpose
 * @returns
 */
export const deleteTellersById = async (tId: string, actionById: string) => {
  try {
    const resDel = await deleteDocWithSubCollection(tellerRef.doc(tId))
    logToFirestore(usersRef.doc(actionById), `Delete Teller ${tId}`)
    return resDel
  } catch (error) {
    return error.message
  }
}
