import * as dotenv from 'dotenv'
dotenv.config()

import express, { Application, Request, Response } from 'express'

import { RES_STATUS, USER_TYPE } from '@/utils/constant'

const PORT = process.env.PORT || 3030

import Users from './routes/users'
import Auth from './routes/auth'
import { roleChecked, verifyUserToken } from './controllers/auth'

const app: Application = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/users', Users)
app.use('/auth', Auth)

app.get('/', (req: Request, res: Response) => {
  return res.json({ status: RES_STATUS.SUCCESS })
})

app.listen(PORT, () => console.log(`Listening at PORT ${PORT}`))
