import { ProcessDataHelper } from '../helpers/processDataHelper.js'

const processDataHelper = new ProcessDataHelper('activityCount')

export function processClickActivityService (clickData) {
  const clickCountData = {}

  for (const clickObject of clickData) {
    const formattedDate = processDataHelper.formatDate(clickObject.clicks.timestamp)

    clickCountData[formattedDate] = (clickCountData[formattedDate] || 0) + 1
  }
  const clickCountsPerDay = processDataHelper.formatForClient([clickCountData])

  return clickCountsPerDay
}
