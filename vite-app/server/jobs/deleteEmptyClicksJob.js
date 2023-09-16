import ButtonClick from '../models/ButtonClick.js'

export async function deleteEmptyClicksJob () {
  try {
    const result = await ButtonClick.deleteMany({ clicks: { $size: 0 } })
    console.log(result)

    return result
  } catch (error) {
    console.log(error)
  }
}
