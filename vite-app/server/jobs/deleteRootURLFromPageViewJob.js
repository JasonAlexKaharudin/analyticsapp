import PageViewDuration from '../models/PageViewDuration.js'

export async function deleteRootURLFromPageViewJob () {
  try {
    const result = await PageViewDuration.deleteMany({ pathURL: { $eq: '/' } })
    console.log(result)

    return result
  } catch (error) {
    console.log(error)
  }
}
