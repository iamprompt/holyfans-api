import { FIREBASE_CONST } from '@/utils/constant'
import { db } from '@/utils/firebase'
import { IUser } from '@/utils/types'

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
      const resUser = await usersRef.add(userData) // Add data to collection
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
