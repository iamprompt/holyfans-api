/** Express router providing user related routes
 * @module app
 * @requires express
 */

import * as dotenv from 'dotenv'
dotenv.config()

import express, { Application, Request, Response } from 'express'

import { RES_STATUS } from './utils/constant'

const PORT = process.env.PORT || 3030

import Users from './routes/users'

const app: Application = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/users', Users)

app.get('/', (req: Request, res: Response) => {
  res.json({ status: RES_STATUS.SUCCESS })
  return
})

app.listen(PORT, () => console.log(`Listening at PORT ${PORT}`))
