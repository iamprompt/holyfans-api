import { Request, Response } from 'express'
import { RES_STATUS } from '@/utils/constant'

export const getAllUsers = (req: Request, res: Response) => {
  res.json({ status: RES_STATUS.SUCCESS })
  return
}
