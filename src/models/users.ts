import { FIREBASE_CONST } from '@/utils/constant'
import { db } from '@/utils/firebase'
import { users } from '@/utils/types'

const usersRef = db.collection(FIREBASE_CONST.USERS_COLLECTION)

/**
 * Get All User from Collection
 */
export const getAllUsers = async () => {
  const usersSnapshot = await usersRef.get()
  const data = await Promise.all(
    usersSnapshot.docs.map((u) => {
      return { id: u.id, ...u.data() } as Partial<users>
    }),
  )
  return data as Partial<users>[]
}

/**
 * Get user by uId
 * @param uId {string} A unique identifier of a user's document
 * @returns
 */
export const getUsersById = async (uId: string) => {
  const usersSnapshot = await usersRef.doc(uId).get()

  if (!usersSnapshot.exists) throw new Error(`Not found the users ${uId}`)

  const u = usersSnapshot.data() as users
  return {
    id: usersSnapshot.id,
    ...u,
  }
}

/**
 * Add user to collection
 * @param userData {Partial<users>} Data of user that would like to add
 * @returns
 */
export const addUser = async (userData: Partial<users>) => {
  const resUser = await usersRef.add(userData)
  return {
    id: resUser.id,
    ...(await resUser.get()).data(),
  }
}
