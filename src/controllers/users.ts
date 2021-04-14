import * as Users from '@/models/users'
import { RES_STATUS } from '@/utils/constant'
import { Request, Response } from 'express'

export const getAllUsers = async (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ status: RES_STATUS.SUCCESS, payload: await Users.getAllUsers() })
}

export const getUserById = async (req: Request, res: Response) => {
  const uId = req.params.uId

  try {
    const userData = await Users.getUsersById(uId)
    return res
      .status(200)
      .json({ status: RES_STATUS.SUCCESS, payload: userData })
  } catch (error) {
    return res
      .status(404)
      .json({ status: RES_STATUS.ERROR, payload: error.message })
  }
}
