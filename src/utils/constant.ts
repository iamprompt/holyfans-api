export enum RES_STATUS {
  SUCCESS = 'success',
  ERROR = 'error',
}

export enum FIREBASE_CONST {
  USERS_COLLECTION = 'holyfans_users',
  LOG_SUB_COLLECTION = 'log',
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
}

export const BCRYPT_SALT = 8
export const JWT_SECRET = process.env.JWT_KEY
