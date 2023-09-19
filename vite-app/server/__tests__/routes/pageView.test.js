import supertest from 'supertest'
import mongoose from 'mongoose'
import { createServer } from '../../utils/server'
import PageViewDuration from '../../models/PageViewDuration'
import TestFactory from '../../helpers/test/factory/testFactory'

// Server Set Up
const app = createServer()
const request = supertest(app)

// Data Set up
const factory = new TestFactory('PageView')
const pageViewPayload = factory.generatePayload()

describe('pageView Analytics', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL_TEST)
  })

  afterAll(async () => {
    await PageViewDuration.deleteMany({})
    await mongoose.disconnect()
    await mongoose.connection.close()
  })

  describe('/page-view', () => {
    it('creates a new pageView record', async () => {
      const response = await request
        .post('/api/analytics/page-view')
        .send(pageViewPayload)

      expect(response.status).toBe(201)
      expect(response.body).toEqual({
        userID: pageViewPayload.userID,
        pathURL: pageViewPayload.pathURL,
        duration: pageViewPayload.duration,
        timestamp: pageViewPayload.timestamp,
        _id: expect.any(String),
        __v: 0
      })
    })
  })

  describe('/average-page-views', () => {
    it('returns 200 and an object with average duration per path', async () => {
      const response = await request.get('/api/analytics/average-page-views')

      expect(response.status).toBe(200)
      expect(response.body).toEqual({
        totalObjects: 1,
        data: [
          {
            pageURL: pageViewPayload.pathURL,
            averageDuration: pageViewPayload.duration
          }
        ]
      })
    })
  })
})
