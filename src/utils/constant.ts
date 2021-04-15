export enum RES_STATUS {
  SUCCESS = 'success',
  ERROR = 'error',
}

export enum FIREBASE_CONST {
  USERS_COLLECTION = 'holyfans_users',
}

export enum USER_TYPE {
  USER = 'user',
  CREATOR = 'creator',
  ADMIN = 'admin',
}

export const BCRYPT_SALT = 8
export const JWT_SECRET = process.env.JWT_KEY
