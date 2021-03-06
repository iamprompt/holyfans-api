export enum RES_STATUS {
  SUCCESS = 'success',
  ERROR = 'error',
}

export enum FIREBASE_CONST {
  USERS_COLLECTION = 'holyfans_users',
  TELLER_COLLECTION = 'holyfans_teller',
  LOG_SUB_COLLECTION = 'log',
  POST_SUB_COLLECTION = 'posts',
}

export enum USER_TYPE {
  USER = 'user',
  CREATOR = 'creator',
  ADMIN = 'admin',
}

export enum ACTION_TYPE {
  CREATE_ACC = 'Create account',
  LOGIN = 'Login',
  LOGOUT = 'Logout',
  CREATE_POST = 'Create Post',
}

export const BCRYPT_SALT = 8
export const JWT_SECRET = process.env.JWT_KEY
