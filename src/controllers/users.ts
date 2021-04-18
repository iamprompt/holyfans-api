import * as Users from '@/models/users'
import { BCRYPT_SALT, RES_STATUS, USER_TYPE } from '@/utils/constant'
import { IUser } from '@/utils/types'
import { hash } from 'bcryptjs'
import { Request, Response } from 'express'
import * as Auth from '@/models/auth'

export const getAllUsers = async (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ status: RES_STATUS.SUCCESS, payload: await Users.getAllUsers() })
}

export const getUserById = async (req: Request, res: Response) => {
  const {
    query: { uId },
  } = req

  console.log(uId as string)

  try {
    const userData = await Users.getUsersById(uId as string)
    delete userData.password
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
    const response = (await Users.addUser(uRequestData)) as IUser
    const token = await Auth.generateUserToken(response)
    return res
      .status(200)
      .json({ status: RES_STATUS.SUCCESS, payload: { token, ...response } })
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
    payload: await Users.searchUser(searchParams as string),
  })
}

export const deleteUser = async (req: Request, res: Response) => {
  const {
    query: { uId },
  } = req
  if ((uId as string) === req.userId) {
    return res
      .status(400)
      .json({ status: RES_STATUS.ERROR, payload: 'You cannot delete yourself' })
  }
  return res.status(200).json({
    status: RES_STATUS.SUCCESS,
    payload: await Users.deleteUsersById(uId as string, req.userId),
  })
}

export const updateUser = async (req: Request, res: Response) => {
  const u = req.body as Partial<IUser>

  console.log(u)
  if (!u.id)
    return res
      .status(400)
      .json({ status: RES_STATUS.ERROR, payload: 'Please provide user id' })

  if (
    u.role &&
    u.role === USER_TYPE.ADMIN &&
    req.userRole !== USER_TYPE.ADMIN
  ) {
    return res.status(400).json({
      status: RES_STATUS.ERROR,
      payload: 'You do not have permission to set the admin',
    })
  }

  const previousU = await Users.getUsersById(u.id)
  if (!previousU) {
    return res.status(400).json({
      status: RES_STATUS.ERROR,
      payload: 'The account is not exist',
    })
  }

  if (previousU.email !== u.email) {
    const isEmailUsed = await Users.getUsersByEmail(u.email)
    if (isEmailUsed) {
      return res.status(400).json({
        status: RES_STATUS.ERROR,
        payload: 'The email has been used',
      })
    }
  }

  const uRequestData = {
    role: u.role,
    firstName: u.firstName,
    lastName: u.lastName,
    displayName: u.displayName,
    altFirstName: u.altFirstName,
    altLastName: u.altLastName,
    altDisplayName: u.altDisplayName,
    email: u.email,
  } as Partial<IUser>

  return res.status(200).json({
    status: RES_STATUS.SUCCESS,
    payload: await Users.updateUser(u.id, uRequestData),
  })
}
