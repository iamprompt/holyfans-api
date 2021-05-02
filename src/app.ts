import * as dotenv from 'dotenv'
dotenv.config()

import express, { Application, Request, Response } from 'express'
import cors from 'cors'

import { RES_STATUS } from '@/utils/constant'

const PORT = process.env.PORT || 3030

import Users from './routes/users'
import Auth from './routes/auth'
import Tellers from './routes/tellers'
import Posts from './routes/posts'

const app: Application = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  console.log(`${JSON.stringify(req.body)}`)
  console.log(`${JSON.stringify(req.query)}`)
  next()
})

app.use('/users', Users)
app.use('/auth', Auth)
app.use('/tellers', Tellers)
app.use('/posts', Posts)

app.get('/', (req: Request, res: Response) => {
  return res.json({ status: RES_STATUS.SUCCESS })
})

app.listen(PORT, () => console.log(`Listening at PORT ${PORT}`))
