import { RES_STATUS } from '@/utils/constant'
import { Request, Response } from 'express'
import * as Posts from '@/models/posts'
import { ITellerPost } from '@/utils/types'

export const getAllPosts = async (req: Request, res: Response) => {
  return res.status(200).json({
    status: RES_STATUS.SUCCESS,
    payload: await Posts.getAllPosts(),
  })
}

export const getPostById = async (req: Request, res: Response) => {
  const { tId, pId } = req.query

  return res.status(200).json({
    status: RES_STATUS.SUCCESS,
    payload: await Posts.getPostById(tId as string, pId as string),
  })
}

export const createPost = async (req: Request, res: Response) => {
  const t = req.body as Partial<ITellerPost & { tellerId: string }>
  try {
    const response = await Posts.addPost(t, req.userId)
    return res
      .status(200)
      .json({ status: RES_STATUS.SUCCESS, payload: { ...response } })
  } catch (error) {
    return res
      .status(400)
      .json({ status: RES_STATUS.ERROR, payload: error.message })
  }
}

export const updatePost = async (req: Request, res: Response) => {
  const u = req.body as Partial<ITellerPost & { tellerId: string; id: string }>

  if (!u.id || !u.tellerId)
    return res.status(400).json({
      status: RES_STATUS.ERROR,
      payload: 'Please provide teller id and post id',
    })

  const previousT = await Posts.getPostById(u.tellerId, u.id)
  if (!previousT) {
    return res.status(400).json({
      status: RES_STATUS.ERROR,
      payload: 'The post is not exist',
    })
  }

  return res.status(200).json({
    status: RES_STATUS.SUCCESS,
    payload: await Posts.updatePost(u),
  })
}

export const deletePost = async (req: Request, res: Response) => {
  const {
    query: { tId, pId },
  } = req

  return res.status(200).json({
    status: RES_STATUS.SUCCESS,
    payload: await Posts.deletePostById(
      tId as string,
      pId as string,
      req.userId,
    ),
  })
}
