export function postProcessClickActivity (clickData, transformDataHelper) {
  const clickCountData = {}

  for (const clickObject of clickData) {
    const formattedDate = transformDataHelper.formatDate(clickObject.clicks.timestamp)

    clickCountData[formattedDate] = (clickCountData[formattedDate] || 0) + 1
  }
  const clickCountsPerDay = transformDataHelper.formatForClient([clickCountData], 'activityCount')

  return clickCountsPerDay
}
