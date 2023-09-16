import { ProcessDataHelper } from '../helpers/processDataHelper.js'

const processDataHelper = new ProcessDataHelper('visits')

export function postProcessBrowserInfo (browserInfoData) {
  const numberOfSessions = browserInfoData.length
  const usersPerLocation = {}
  const usersPerBrowserName = {}
  const usersPerDevice = {}
  const sessionCounts = {}

  for (const browserInfo of browserInfoData) {
    const { timezone, browserName, device, timestamp } = browserInfo
    const formattedDate = processDataHelper.formatDate(timestamp)

    usersPerLocation[timezone] = (usersPerLocation[timezone] || 0) + 1
    usersPerBrowserName[browserName] = (usersPerBrowserName[browserName] || 0) + 1
    usersPerDevice[device] = (usersPerDevice[device] || 0) + 1
    sessionCounts[formattedDate] = (sessionCounts[formattedDate] || 0) + 1
  }

  const sessionCountsPerDay = processDataHelper.formatForClient([sessionCounts], 'visits')

  return {
    numberOfSessions,
    usersPerLocation,
    usersPerBrowserName,
    usersPerDevice,
    sessionCountsPerDay
  }
}
