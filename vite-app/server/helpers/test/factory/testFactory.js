import { v4 as uuidv4 } from 'uuid'
import { ProcessDataHelper } from '../../processDataHelper'

export default class TestFactory {
  constructor (type) {
    this.uuID = uuidv4()
    this.timestamp = new Date().toISOString()
    this.type = type
  }

  generatePayload () {
    let payload

    switch (this.type) {
      case 'BrowserInfo':
        payload = {
          userID: this.uuID,
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36',
          browserName: 'Netscape',
          browserVersion: '5.0 (Windows)',
          device: 'Desktop',
          operatingSystem: 'Win32',
          timezone: 'America/New_York',
          language: 'en-US',
          timestamp: this.timestamp
        }

        return payload
      case 'ButtonClick':
        payload = {
          userID: this.uuID,
          clicks: [
            {
              buttonId: '/finance',
              pageURL: '/',
              timestamp: this.timestamp
            },
            {
              buttonId: '/analytics',
              pageURL: '/',
              timestamp: this.timestamp
            }
          ]
        }

        return payload
      case 'PageView':
        payload = {
          userID: this.uuID,
          pathURL: '/analytics',
          duration: 8.10,
          timestamp: this.timestamp
        }
        return payload
      default:
        break
    }
  }

  generateExpectedCounts () {
    let metric
    let metricValue
    let helper

    switch (this.type) {
      case 'BrowserInfo':
        metric = 'visits'
        metricValue = 1
        helper = new ProcessDataHelper(metric)

        break
      case 'ButtonClick':
        metric = 'activityCount'
        metricValue = 2
        helper = new ProcessDataHelper(metric)

        break
      default:
        break
    }

    const emptyMetricPerDayArray = helper.formatForClient([{}])
    const targetDate = helper.formatDate(new Date(this.timestamp))
    const expectedMetricArray = emptyMetricPerDayArray.map(item => {
      if (item.date === targetDate) {
        return { ...item, [metric]: metricValue }
      }
      return item
    })

    return expectedMetricArray
  }
}
