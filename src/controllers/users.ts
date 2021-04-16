import * as Users from '@/models/users'
import { BCRYPT_SALT, RES_STATUS, USER_TYPE } from '@/utils/constant'
import { IUser } from '@/utils/types'
import { hash } from 'bcryptjs'
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

export const getUser = async (req: Request, res: Response) => {
  const reqData = req.body

  try {
    const userData = await Users.getUsersByEmail(reqData.email)
    return res
      .status(200)
      .json({ status: RES_STATUS.SUCCESS, payload: userData })
  } catch (error) {
    return res
      .status(404)
      .json({ status: RES_STATUS.ERROR, payload: error.message })
  }
}

export const createUsers = async (req: Request, res: Response) => {
  const u = req.body as Partial<IUser>
  console.log(u)

  const uRequestData = {
    role: u.role || USER_TYPE.USER,
    firstName: u.firstName,
    lastName: u.lastName,
    displayName: u.displayName,
    altFirstName: u.altFirstName,
    altLastName: u.altLastName,
    altDisplayName: u.altDisplayName,
    email: u.email,
    password: await hash(u.password, BCRYPT_SALT),
  } as Partial<IUser>

  if (
    req.userRole !== USER_TYPE.ADMIN &&
    uRequestData.role !== USER_TYPE.USER
  ) {
    return res.status(403).json({
      status: RES_STATUS.SUCCESS,
      payload: `You don't have permission to create a user with this role`,
    })
  }

  try {
    const response = await Users.addUser(uRequestData)
    return res
      .status(200)
      .json({ status: RES_STATUS.SUCCESS, payload: response })
  } catch (error) {
    return res
      .status(400)
      .json({ status: RES_STATUS.ERROR, payload: error.message })
  }
}

export const searchUser = async (req: Request, res: Response) => {
  const searchParams = req.query.search_keyword as string
  return res.status(200).json({
    status: RES_STATUS.SUCCESS,
    payload: await Users.searchUser(searchParams),
  })
}

export const deleteUser = async (req: Request, res: Response) => {
  const { uId } = req.body
  return res.status(200).json({
    status: RES_STATUS.SUCCESS,
    payload: await Users.deleteUsersById(uId),
  })
}
