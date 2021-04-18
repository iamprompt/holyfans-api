import { deleteDocWithSubCollection, logToFirestore } from '@/utils'
import { ACTION_TYPE, FIREBASE_CONST } from '@/utils/constant'
import { db, _db } from '@/utils/firebase'
import { IUser } from '@/utils/types'

export const usersRef = db.collection(FIREBASE_CONST.USERS_COLLECTION)

/**
 * Get All User from Collection
 * @returns
 */
export const getAllUsers = async () => {
  const usersSnapshot = await usersRef.get()
  const data = await Promise.all(
    usersSnapshot.docs.map((u) => {
      const d = u.data()
      delete d.password
      return { id: u.id, ...d } as Partial<IUser>
    }),
  )
  return data as Partial<IUser>[]
}

/**
 * Get user by uId
 * @param uId {string} A unique identifier of a user's document
 * @returns
 */
export const getUsersById = async (uId: string) => {
  const usersSnapshot = await usersRef.doc(uId).get()

  if (!usersSnapshot.exists) throw new Error(`Not found the users ${uId}`)

  const u = usersSnapshot.data() as IUser
  return {
    id: usersSnapshot.id,
    ...u,
  }
}

/**
 * Get User by Email
 * @param email {string} Email of the account
 * @returns Data of user with id
 */
export const getUsersByEmail = async (email: string) => {
  const usersSnapshot = await usersRef.where('email', '==', email).get() // account with the provided email snapshot
  if (usersSnapshot.empty) return null // Return null, if there are no account with the provided email

  const u = usersSnapshot.docs[0].data() as IUser // Data of a user

  return {
    id: usersSnapshot.docs[0].id,
    ...u,
  }
}

/**
 * Add user to collection
 * @param userData {Partial<users>} Data of user that would like to add
 * @returns
 */
export const addUser = async (userData: Partial<IUser>) => {
  try {
    // Find if the user already have account
    if (!(await getUsersByEmail(userData.email))) {
      // Add data to collection
      const resUser = await usersRef.add({
        ...userData,
        dateCreated: _db.FieldValue.serverTimestamp(),
        dateModified: _db.FieldValue.serverTimestamp(),
        isActive: true,
      })

      logToFirestore(resUser, ACTION_TYPE.CREATE_ACC)

      return {
        id: resUser.id,
        ...(await resUser.get()).data(),
      }
    }
    throw new Error('The email is already registered')
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * Search Users from the keyword
 * @param searchKey {string} The search string from the user (Optional)
 * @returns The result from searching
 */
export const searchUser = async (searchKey: string) => {
  const searchRegExp = new RegExp(searchKey, 'i')
  const allUsers = await getAllUsers()

  const filteredUsers = await Promise.all(
    allUsers.filter((u) => {
      return (
        u.firstName?.match(searchRegExp) ||
        u.lastName?.match(searchRegExp) ||
        u.displayName?.match(searchRegExp) ||
        u.email?.match(searchRegExp)
      )
    }),
  )

  return filteredUsers
}

/**
 * Delete the user by id
 * @param uId {string} Id of user that would like to delete
 * @param actionById {string} Id of user who take an action for logging purpose
 * @returns
 */
export const deleteUsersById = async (uId: string, actionById: string) => {
  try {
    const resDel = await deleteDocWithSubCollection(usersRef.doc(uId))
    logToFirestore(usersRef.doc(actionById), `Delete Account ${uId}`)
    return resDel
  } catch (error) {
    return error.message
  }
}

/**
 *
 * @param uId {string} User id the need to update their profile
 * @param data {Partial<IUser>} New value
 * @returns
 */
export const updateUser = async (uId: string, data: Partial<IUser>) => {
  try {
    const dataUpdate = {
      ...data,
      dateModified: _db.FieldValue.serverTimestamp(),
    } as Partial<IUser>
    const userDocRef = db.collection(FIREBASE_CONST.USERS_COLLECTION).doc(uId)
    const resUpdate = await userDocRef.update(dataUpdate)
    return resUpdate
  } catch (error) {
    return error
  }
}
