import supertest from 'supertest'
import mongoose from 'mongoose'
import { createServer } from '../../utils/server'
import ButtonClick from '../../models/ButtonClick.js'
import TestFactory from '../../helpers/test/factory/testFactory'

// Server Set Up
const app = createServer()
const request = supertest(app)

// User Info Click Data Set Up
const factory = new TestFactory('ButtonClick')
const buttonClickPayload = factory.generatePayload()
const expectedCounts = factory.generateExpectedCounts()

describe('ButtonClick Analytics', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL_TEST)
  })

  afterAll(async () => {
    await ButtonClick.deleteMany({})
    await mongoose.disconnect()
    await mongoose.connection.close()
  })

  describe('/button-click', () => {
    const updatedClicks = buttonClickPayload.clicks.map(click => ({
      ...click,
      _id: expect.any(String)
    }))

    it('creates a new buttonClick record', async () => {
      const response = await request
        .post('/api/analytics/button-click')
        .send(buttonClickPayload)

      expect(response.status).toBe(201)
      expect(response.body).toEqual({
        userID: buttonClickPayload.userID,
        clicks: updatedClicks,
        _id: expect.any(String),
        __v: 0
      })
    })
  })

  describe('Querying with non-empty collection', () => {
    describe('/button-clicks', () => {
      it('returns 200 and an object with 2 values', async () => {
        const response = await request.get('/api/analytics/button-clicks')

        expect(response.status).toBe(200)
        expect(response.body).toEqual({
          totalObjects: 2,
          data: [
            {
              _id: expect.any(String),
              userID: buttonClickPayload.userID,
              clicks: {
                _id: expect.any(String),
                buttonId: '/finance',
                pageURL: '/',
                timestamp: expect.any(String)
              },
              __v: 0
            },
            {
              _id: expect.any(String),
              userID: buttonClickPayload.userID,
              clicks: {
                buttonId: '/analytics',
                pageURL: '/',
                timestamp: expect.any(String),
                _id: expect.any(String)
              },
              __v: 0
            }
          ]
        })
      })
    })

    describe('/button-clicks-stats', () => {
      it('returns 200 and an object with total clicks grouped by button', async () => {
        const response = await request.get('/api/analytics/button-clicks-stats')

        expect(response.status).toBe(200)
        expect(response.body).toEqual([
          {
            buttonId: '/analytics',
            totalClicks: 1
          },
          {
            buttonId: '/finance',
            totalClicks: 1
          }
        ])
      })
    })

    describe('/button-clicks-activity', () => {
      it('returns 200 and an object with updated activity counts', async () => {
        const response = await request.get('/api/analytics/button-clicks-activity')

        expect(response.status).toBe(200)
        expect(response.body).toEqual([
          {
            totalObjects: 2,
            activity: expectedCounts
          }
        ])
      })
    })
  })
})
