import { RES_STATUS } from '@/utils/constant'
import { ITellerSearchRequest } from '@/utils/types'
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
    body: { tId },
  } = req

  console.log(tId)

  try {
    const tellerData = await Tellers.getTellersById(tId)
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
  const { query } = req
  const searchRequest = {
    search_keyword: query.search_keyword,
    categories: query.categories,
    area: query.area,
    price_range: query.price_range,
  } as ITellerSearchRequest

  console.log(searchRequest)

  // const searchParams = req.query.search_keyword as string
  // console.log(searchParams)

  return res.status(200).json({
    status: RES_STATUS.SUCCESS,
    payload: await Tellers.searchTellers(searchRequest),
  })
}
