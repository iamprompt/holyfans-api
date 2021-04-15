import * as Auth from '@/models/auth'
import { JWT_SECRET, RES_STATUS } from '@/utils/constant'
import { ILoginInfo } from '@/utils/types'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const getUserLogin = async (req: Request, res: Response) => {
  const loginInfo = req.body as ILoginInfo
  console.log(loginInfo)

  try {
    const response = await Auth.getUsersByCredential(
      loginInfo.email,
      loginInfo.password,
    )

    const token = await Auth.generateUserToken(response)
    return res
      .status(200)
      .json({ status: RES_STATUS.SUCCESS, payload: { token } })
  } catch (error) {
    return res
      .status(400)
      .json({ status: RES_STATUS.ERROR, payload: error.message })
  }
}

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
    req.userRole = tokenUser.role
    next()
  } catch (error) {
    return res
      .status(403)
      .json({ status: RES_STATUS.ERROR, payload: error.message })
  }
}

export const roleChecked = (...allowedRole: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.userRole && allowedRole.includes(req.userRole)) {
      return next()
    } else {
      return res.status(403).json({ message: 'Forbidden' })
    }
  }
}
