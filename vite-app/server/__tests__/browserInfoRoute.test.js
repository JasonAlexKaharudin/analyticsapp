import supertest from 'supertest'
import { v4 as uuidv4 } from 'uuid'
import mongoose from 'mongoose'
import { createServer } from '../utils/server'
import BrowserInfo from '../models/BrowserInformation.js'
import { ProcessDataHelper } from '../helpers/processDataHelper'

// Server Set Up
const app = createServer()
const request = supertest(app)

// Browser Information Data Set Up
const browserUUID = uuidv4()
const dataManipulater = new ProcessDataHelper('visits')

const browserInfoPayload = {
  userID: browserUUID,
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36',
  browserName: 'Netscape',
  browserVersion: '5.0 (Windows)',
  device: 'Desktop',
  operatingSystem: 'Win32',
  timezone: 'America/New_York',
  language: 'en-US',
  timestamp: new Date().toISOString()
}

const emptyCountsPerDayArray = dataManipulater.formatForClient([{}])
const targetDate = dataManipulater.formatDate(new Date(browserInfoPayload.timestamp))
const updatedCountsArray = emptyCountsPerDayArray.map(item => {
  if (item.date === targetDate) {
    return { ...item, visits: 1 }
  }
  return item
})

describe('BrowserInfo Analytics', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL_TEST)
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
  })

  describe('/browser-info', () => {
    it('creates a new browserInfo record', async () => {
      const response = await request
        .post('/api/analytics/browser-info')
        .send(browserInfoPayload)

      expect(response.status).toBe(201)
      expect(response.body).toEqual({
        userID: browserUUID,
        userAgent: browserInfoPayload.userAgent,
        browserName: browserInfoPayload.browserName,
        browserVersion: browserInfoPayload.browserVersion,
        device: browserInfoPayload.device,
        operatingSystem: browserInfoPayload.operatingSystem,
        timezone: browserInfoPayload.timezone,
        language: browserInfoPayload.language,
        timestamp: browserInfoPayload.timestamp,
        _id: expect.any(String),
        __v: 0
      })
    })
  })

  describe('/browser-statistics with non-empty collection', () => {
    it('returns 200 and object wth 1 session from New York using Netscape Browser', async () => {
      const response = await request.get('/api/analytics/browser-statistics')

      expect(response.status).toBe(200)
      expect(response.body).toEqual({
        numberOfSessions: 1,
        usersPerLocation: {
          'America/New_York': 1
        },
        usersPerBrowserName: {
          Netscape: 1
        },
        usersPerDevice: {
          Desktop: 1
        },
        sessionCountsPerDay: updatedCountsArray
      })
    })
  })

  describe('/browser-statistics with empty collection', () => {
    beforeEach(async () => {
      await BrowserInfo.deleteMany({})
    })

    it('returns 200 and object will all values = 0', async () => {
      const response = await request.get('/api/analytics/browser-statistics')

      expect(response.status).toBe(200)
      expect(response.body).toEqual({
        numberOfSessions: 0,
        usersPerLocation: {},
        usersPerBrowserName: {},
        usersPerDevice: {},
        sessionCountsPerDay: emptyCountsPerDayArray
      })
    })
  })
})
