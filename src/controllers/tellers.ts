import { RES_STATUS } from '@/utils/constant'
import { ITeller, ITellerSearchRequest } from '@/utils/types'
import { Request, Response } from 'express'
import * as Tellers from '@/models/tellers'

/**
 * Get All tellers
 * @returns
 */
export const getAllTellers = async (req: Request, res: Response) => {
  return res.status(200).json({
    status: RES_STATUS.SUCCESS,
    payload: await Tellers.getAllTellers(),
  })
}

/**
 * Get Teller by Id
 * @returns
 */
export const getTellerById = async (req: Request, res: Response) => {
  const {
    query: { tId },
  } = req

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

/**
 * Search Tellers
 * @returns
 */
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

  return res.status(200).json({
    status: RES_STATUS.SUCCESS,
    payload: await Tellers.searchTellers(searchRequest),
  })
}

/**
 * Create Teller (Require Admin Privillages)
 * @param req
 * @param res
 * @returns
 */
export const createTeller = async (req: Request, res: Response) => {
  const t = req.body as Partial<ITeller>
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

/**
 * Update Tellers (Require Admin Privillages)
 * @returns
 */
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

/**
 * Delete Tellers (Require Admin Privillages)
 * @returns
 */
export const deleteTellers = async (req: Request, res: Response) => {
  const {
    query: { tId },
  } = req

  return res.status(200).json({
    status: RES_STATUS.SUCCESS,
    payload: await Tellers.deleteTellersById(tId as string, req.userId),
  })
}
