import { IUser } from '@/utils/types'
import { compare } from 'bcryptjs'
import { usersRef } from './users'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '@/utils/constant'

/**
 * Get user from login information
 * @param email {string} User's email
 * @param password {string} User's password
 * @returns {Promise<IUser>}
 */
export const getUsersByCredential = async (
  email: string,
  password: string,
): Promise<IUser> => {
  const usersSnapshot = await usersRef.where('email', '==', email).get()
  if (usersSnapshot.empty) throw new Error('Invalid login credentials')

  const u = usersSnapshot.docs[0].data() as IUser

  const isPasswordMatch = await compare(password, u.password)
  if (!isPasswordMatch) throw new Error('Invalid login credentials')

  return {
    id: usersSnapshot.docs[0].id,
    ...u,
  } as IUser
}

/**
 * Generate JWT for user
 * @param user {IUser} User
 * @returns {string} Token
 */
export const generateUserToken = (user: IUser): string => {
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET)
  return token
}
