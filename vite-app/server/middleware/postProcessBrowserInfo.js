function formatDate (timestamp) {
  return `${timestamp.getDate()}/${timestamp.getMonth() + 1}`
}

// Potential Refactoring Opportunity
function generateLast7Dates () {
  const datesArray = []

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() - i)

    const formattedDate = formatDate(currentDate)
    datesArray.push({ date: formattedDate, visits: 0 })
  }

  return datesArray
}

function transformVisitsData (visitsData) {
  const transformedData = []

  const datesArray = generateLast7Dates()

  for (const dateObj of datesArray) {
    const date = dateObj.date
    const visits = visitsData[date] || 0
    transformedData.push({ date, visits })
  }

  return transformedData.reverse()
}

export function postProcessBrowserInfo (browserInfoData) {
  const numberOfSessions = browserInfoData.length
  const usersPerLocation = {}
  const usersPerBrowserName = {}
  const usersPerDevice = {}
  const sessionCounts = {}
  let sessionCountsPerDay = []

  for (const browserInfo of browserInfoData) {
    const { timezone, browserName, device, timestamp } = browserInfo
    const formattedDate = formatDate(timestamp)

    usersPerLocation[timezone] = (usersPerLocation[timezone] || 0) + 1
    usersPerBrowserName[browserName] = (usersPerBrowserName[browserName] || 0) + 1
    usersPerDevice[device] = (usersPerDevice[device] || 0) + 1

    sessionCounts[formattedDate] = (sessionCounts[formattedDate] || 0) + 1
  }
  sessionCountsPerDay = transformVisitsData(sessionCounts)

  return {
    numberOfSessions,
    usersPerLocation,
    usersPerBrowserName,
    usersPerDevice,
    sessionCountsPerDay
  }
}
