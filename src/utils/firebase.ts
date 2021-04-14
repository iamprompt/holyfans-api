import * as dotenv from 'dotenv'
dotenv.config()

import admin from 'firebase-admin'

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
})

const db = admin.firestore()
const _db = admin.firestore

export { db, _db }
