import * as Auth from '@/models/auth'
import { usersRef } from '@/models/users'
import { logToFirestore } from '@/utils'
import { ACTION_TYPE, JWT_SECRET, RES_STATUS } from '@/utils/constant'
import { ILoginInfo } from '@/utils/types'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

/**
 * Login (Log to Firestore)
 * @returns
 */
export const getUserLogin = async (req: Request, res: Response) => {
  const loginInfo = req.body as ILoginInfo

  try {
    const user = await Auth.getUsersByCredential(
      loginInfo.email,
      loginInfo.password,
    )

    logToFirestore(usersRef.doc(user.id), ACTION_TYPE.LOGIN)

    const token = await Auth.generateUserToken(user)

    delete user.password
    return res
      .status(200)
      .json({ status: RES_STATUS.SUCCESS, payload: { token, user } })
  } catch (error) {
    return res
      .status(400)
      .json({ status: RES_STATUS.ERROR, payload: error.message })
  }
}

/**
 * Logout (Require token -> Log to Firestore)
 * @returns
 */
export const logout = async (req: Request, res: Response) => {
  logToFirestore(usersRef.doc(req.userId), ACTION_TYPE.LOGOUT)
  return res.json({ status: RES_STATUS.SUCCESS })
}

/**
 * Verify user token from authorization header
 * @returns
 */
export const verifyUserToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization
  if (!token)
    return res
      .status(403)
      .json({ status: RES_STATUS.ERROR, payload: 'No Authorized' })

  try {
    const tokenUser = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET) as {
      id: string
      role: string
      iat: string
    }
    req.userId = tokenUser.id
    req.userRole = tokenUser.role

    next()
  } catch (error) {
    return res
      .status(403)
      .json({ status: RES_STATUS.ERROR, payload: error.message })
  }
}

/**
 * Verify User role whether accessible to the services
 * @param allowedRole {string[]} Role that allowed in the services
 * @returns
 */
export const roleChecked = (...allowedRole: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.userRole && allowedRole.includes(req.userRole)) {
      return next()
    } else {
      return res.status(403).json({ message: 'Forbidden' })
    }
  }
}
