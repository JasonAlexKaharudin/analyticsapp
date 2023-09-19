import supertest from 'supertest'
import mongoose from 'mongoose'
import { createServer } from '../../utils/server'
import BrowserInfo from '../../models/BrowserInformation.js'
import TestFactory from '../../helpers/test/factory/testFactory'

// Server Set Up
const app = createServer()
const request = supertest(app)

// Browser Information Data Set Up
const factory = new TestFactory('BrowserInfo')
const browserInfoPayload = factory.generatePayload()
const expectedCounts = factory.generateExpectedCounts()

describe('BrowserInfo Analytics', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL_TEST)
  })

  afterAll(async () => {
    await BrowserInfo.deleteMany({})
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
        userID: browserInfoPayload.userID,
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
        sessionCountsPerDay: expectedCounts
      })
    })
  })
})
