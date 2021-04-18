import { RES_STATUS, USER_TYPE } from '@/utils/constant'
import { ITeller, ITellerSearchRequest } from '@/utils/types'
import { Request, Response } from 'express'
import * as Tellers from '@/models/tellers'

export const getAllUsers = async (req: Request, res: Response) => {
  console.log('here')

  return res.status(200).json({
    status: RES_STATUS.SUCCESS,
    payload: await Tellers.getAllTellers(),
  })
}

export const getTellerById = async (req: Request, res: Response) => {
  const {
    query: { tId },
  } = req

  console.log(tId)

  try {
    const tellerData = await Tellers.getTellersById(tId as string)
    return res
      .status(200)
      .json({ status: RES_STATUS.SUCCESS, payload: tellerData })
  } catch (error) {
    return res
      .status(404)
      .json({ status: RES_STATUS.ERROR, payload: error.message })
  }
}

export const searchTellers = async (req: Request, res: Response) => {
  const {
    query: { search_keyword, categories, area, price_range },
  } = req
  const searchRequest = {
    search_keyword,
    categories,
    area,
    price_range,
  } as ITellerSearchRequest

  console.log(searchRequest)

  return res.status(200).json({
    status: RES_STATUS.SUCCESS,
    payload: await Tellers.searchTellers(searchRequest),
  })
}

export const createTeller = async (req: Request, res: Response) => {
  const t = req.body as Partial<ITeller>
  console.log(t)

  try {
    const response = (await Tellers.addTellers(t, req.userId)) as ITeller
    return res
      .status(200)
      .json({ status: RES_STATUS.SUCCESS, payload: { ...response } })
  } catch (error) {
    return res
      .status(400)
      .json({ status: RES_STATUS.ERROR, payload: error.message })
  }
}

export const updateTeller = async (req: Request, res: Response) => {
  const u = req.body as Partial<ITeller>

  if (!u.id)
    return res
      .status(400)
      .json({ status: RES_STATUS.ERROR, payload: 'Please provide user id' })

  const previousT = await Tellers.getTellersById(u.id)
  if (!previousT) {
    return res.status(400).json({
      status: RES_STATUS.ERROR,
      payload: 'The teller is not exist',
    })
  }

  return res.status(200).json({
    status: RES_STATUS.SUCCESS,
    payload: await Tellers.updateTeller(u.id, u),
  })
}

export const deleteTellers = async (req: Request, res: Response) => {
  const {
    query: { tId },
  } = req

  return res.status(200).json({
    status: RES_STATUS.SUCCESS,
    payload: await Tellers.deleteTellersById(tId as string, req.userId),
  })
}
