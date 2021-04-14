import admin from 'firebase-admin'

export type users = {
  _id: string
  role: 'admin' | 'creator' | 'user'
  firstName: string
  lastName: string
  displayName: string
  altFirstName?: string
  altLastName?: string
  altDisplayName?: string
  email: string
  password: string
  dateCreated: admin.firestore.Timestamp
  dateModified: admin.firestore.Timestamp
}
