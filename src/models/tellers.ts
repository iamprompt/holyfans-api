import { FIREBASE_CONST } from '@/utils/constant'
import { db } from '@/utils/firebase'
import { ITeller, ITellerSearchRequest } from '@/utils/types'

export const tellerRef = db.collection(FIREBASE_CONST.TELLER_COLLECTION)

export const getAllTellers = async () => {
  const tellerSnapshot = await tellerRef.get()
  const data = await Promise.all(
    tellerSnapshot.docs.map((t) => {
      const d = t.data()
      delete d.password
      return { id: t.id, ...d }
    }),
  )
  return data as Partial<ITeller[]>
}

export const searchTellers = async (searchKey: ITellerSearchRequest) => {
  const searchRegExp = new RegExp(searchKey.search_keyword, 'i')
  const areaRegExp = new RegExp(searchKey.area, 'i')
  const allTellers = await getAllTellers()

  let filteredTellers: ITeller[] = allTellers

  if (searchKey.search_keyword) {
    filteredTellers = await Promise.all(
      filteredTellers.filter((u) => {
        return u.nameTH.match(searchRegExp) || u.nameEN.match(searchRegExp)
      }),
    )
  }

  if (searchKey.categories) {
    filteredTellers = await Promise.all(
      filteredTellers.filter((u) => {
        return u.category.includes(searchKey.categories)
      }),
    )
  }

  if (searchKey.area) {
    filteredTellers = await Promise.all(
      filteredTellers.filter((u) => {
        return u.region.match(areaRegExp)
      }),
    )
  }

  if (searchKey.price_range) {
    filteredTellers = await Promise.all(
      filteredTellers.filter((u) => {
        switch (searchKey.price_range) {
          case '1':
            return u.subPrice >= 0 && u.subPrice <= 100

          case '2':
            return u.subPrice > 100 && u.subPrice <= 300

          case '3':
            return u.subPrice > 300 && u.subPrice <= 500

          case '4':
            return u.subPrice > 500 && u.subPrice <= 1000

          default:
            return true
        }
      }),
    )
  }

  return filteredTellers
}
