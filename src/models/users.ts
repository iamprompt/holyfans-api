import { ACTION_TYPE, FIREBASE_CONST } from '@/utils/constant'
import { db } from '@/utils/firebase'
import { IUser } from '@/utils/types'
import { firestore } from 'firebase-admin'

export const usersRef = db.collection(FIREBASE_CONST.USERS_COLLECTION)

/**
 * Get All User from Collection
 */
export const getAllUsers = async () => {
  const usersSnapshot = await usersRef.get()
  const data = await Promise.all(
    usersSnapshot.docs.map((u) => {
      return { id: u.id, ...u.data() } as Partial<IUser>
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
 * @param email Email of the account
 * @returns Data of the user with email provided
 */
export const getUsersByEmail = async (email: string) => {
  const usersSnapshot = await usersRef.where('email', '==', email).get()

  if (usersSnapshot.empty) return null

  const u = usersSnapshot.docs[0].data() as IUser
  console.log(u)

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
      const resUser = await usersRef.add({
        ...userData,
        dateCreated: firestore.Timestamp.now(),
        dateModified: firestore.Timestamp.now(),
        isActive: true,
      }) // Add data to collection

      await resUser.collection(FIREBASE_CONST.LOG_SUB_COLLECTION).add({
        action: ACTION_TYPE.CREATE_ACC,
        time: firestore.Timestamp.now(),
      })
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
  const searchRegExp = new RegExp(searchKey)
  const allUsers = await getAllUsers()

  const filteredUsers = await Promise.all(
    allUsers.filter((u) => {
      return (
        u.firstName.match(searchRegExp) ||
        u.lastName.match(searchRegExp) ||
        u.displayName.match(searchRegExp) ||
        u.email.match(searchRegExp)
      )
    }),
  )

  return filteredUsers
}

export const deleteUsersById = async (uId: string) => {
  try {
    const usersSnapshot = await usersRef.doc(uId).delete()
    return usersSnapshot
  } catch (error) {
    return error.message
  }
}
