import { logToFirestore } from '@/utils'
import { ACTION_TYPE, FIREBASE_CONST } from '@/utils/constant'
import { db, _db } from '@/utils/firebase'
import { ITellerPost } from '@/utils/types'
import { usersRef } from './users'

export const tellerRef = db.collection(FIREBASE_CONST.TELLER_COLLECTION)
export const postsRef = db.collectionGroup('posts')

export const getAllPosts = async () => {
  const postsSnapshot = await postsRef.orderBy('dateCreated', 'desc').get()
  const data = await Promise.all(
    postsSnapshot.docs.map(async (t) => {
      const p = await t.ref.parent.parent.get()
      const tellerData = p.data()

      const d = t.data()
      return {
        id: t.id,
        ...d,
        author: {
          id: p.id,
          img: tellerData.img,
          nameEN: tellerData.nameEN,
        },
      }
    }),
  )
  return data
}

export const getPostById = async (tellerId: string, postId: string) => {
  const tellerDocRef = tellerRef.doc(tellerId)
  const tellerDoc = await tellerDocRef.get()
  const tellerData = tellerDoc.data()

  const tellerPostRef = tellerDocRef.collection('posts').doc(postId)
  const postSnapshot = await tellerPostRef.get()
  const postData = postSnapshot.data()
  console.log(postData)
  return {
    ...postData,
    author: {
      id: tellerDoc.id,
      img: tellerData.img,
      nameEN: tellerData.nameEN,
    },
  }
}

export const addPost = async (
  post: Partial<ITellerPost & { tellerId: string }>,
  actionById: string,
) => {
  const tellerDocRef = tellerRef.doc(post.tellerId)
  const tellerPostRef = tellerDocRef.collection('posts')

  delete post.tellerId

  try {
    const resPost = await tellerPostRef.add({
      ...post,
      dateCreated: _db.FieldValue.serverTimestamp(),
      dateModified: _db.FieldValue.serverTimestamp(),
    })

    logToFirestore(
      db.collection(FIREBASE_CONST.USERS_COLLECTION).doc(actionById),
      ACTION_TYPE.CREATE_POST,
    )

    return {
      id: resPost.id,
      ...(await resPost.get()).data(),
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const updatePost = async (
  data: Partial<ITellerPost & { tellerId: string; id: string }>,
) => {
  try {
    const tellerDocRef = tellerRef.doc(data.tellerId)
    const tellerPostRef = tellerDocRef.collection('posts').doc(data.id)

    delete data.tellerId
    delete data.id

    const dataUpdate = {
      ...data,
      dateModified: _db.FieldValue.serverTimestamp(),
    } as Partial<ITellerPost>

    const resUpdate = await tellerPostRef.update(dataUpdate)
    return resUpdate
  } catch (error) {
    return error
  }
}

export const deletePostById = async (
  tId: string,
  pId: string,
  actionById: string,
) => {
  const tellerDocRef = tellerRef.doc(tId)
  const tellerPostRef = tellerDocRef.collection('posts').doc(pId)
  try {
    const resDel = await tellerPostRef.delete()
    logToFirestore(usersRef.doc(actionById), `Delete Post ${pId}`)
    return resDel
  } catch (error) {
    return error.message
  }
}
