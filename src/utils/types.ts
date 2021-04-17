import admin from 'firebase-admin'

export type IUser = {
  id: string
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

export type ITeller = {
  id: string
  subPrice: number
  nameEN: string
  category: string[]
  contact: {
    email: string
    line: string
    facebook: string
    twitter: string
    phoneNum: string
    website: string
    instagram: string
  }
  region: string
  address: {
    _latitude: number
    _longitude: number
  }
  img: string
  nameTH: string
  bio: string
}

export type ILoginInfo = {
  email: string
  password: string
}

export type ITellerSearchRequest = {
  search_keyword?: string
  categories?: string
  area?: string
  price_range?: string
}
