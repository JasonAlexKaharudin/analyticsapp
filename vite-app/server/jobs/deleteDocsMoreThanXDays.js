import ButtonClick from '../models/ButtonClick.js'
import PageViewDuration from '../models/PageViewDuration.js'
import BrowserInfo from '../models/BrowserInformation.js'

export async function deleteDocsMoreThanXDays () {
  const Xdays = Date.now() - 14 * 24 * 60 * 60 * 1000

  try {
    const result = []

    const buttonClicksResult = await ButtonClick.deleteMany({ 'clicks.timestamp': { $lte: Xdays } })
    const pageViewResult = await PageViewDuration.deleteMany({ timestamp: { $lte: Xdays } })
    const browserInfoResult = await BrowserInfo.deleteMany({ timestamp: { $lte: Xdays } })

    result.push(buttonClicksResult)
    result.push(pageViewResult)
    result.push(browserInfoResult)

    console.log(result)
  } catch (error) {
    console.log(error)
  }
}
