import { firestore } from 'firebase-admin'
import { db, _db } from '@/utils/firebase'
import { ACTION_TYPE, FIREBASE_CONST } from './constant'

export const logToFirestore = async (
  ref: firestore.DocumentReference,
  action: ACTION_TYPE | string,
) => {
  try {
    await ref.collection(FIREBASE_CONST.LOG_SUB_COLLECTION).add({
      action: action,
      time: _db.Timestamp.now(),
    })
    return true
  } catch (error) {
    return error
  }
}

/**
 * Delete document with subcollection
 * @param {firestore.DocumentReference} ref Document Reference that need to be deleted
 * @returns
 */
export const deleteDocWithSubCollection = async (
  ref: firestore.DocumentReference,
) => {
  try {
    const allCollections = await ref.listCollections()

    allCollections.forEach(async (col) => {
      const allDocuments = await col.listDocuments()
      allDocuments.forEach(async (doc) => {
        doc.delete()
      })
    })

    return await ref.delete()
  } catch (error) {
    return error
  }
}
