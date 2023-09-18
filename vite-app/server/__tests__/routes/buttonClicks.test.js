import supertest from 'supertest'
import { v4 as uuidv4 } from 'uuid'
import mongoose from 'mongoose'
import { createServer } from '../../utils/server'
import ButtonClick from '../../models/ButtonClick.js'
import { ProcessDataHelper } from '../../helpers/processDataHelper'

// Server Set Up
const app = createServer()
const request = supertest(app)

// User Info Click Data Set Up
const clickUUID = uuidv4()
const dataManipulater = new ProcessDataHelper('activityCount')

const buttonClickPayload = {
  userID: clickUUID,
  clicks: [
    {
      buttonId: '/finance',
      pageURL: '/',
      timestamp: new Date().toISOString()
    },
    {
      buttonId: '/analytics',
      pageURL: '/',
      timestamp: new Date().toISOString()
    }
  ]
}

const emptyCountsPerDayArray = dataManipulater.formatForClient([{}])

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
        userID: clickUUID,
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
              userID: clickUUID,
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
              userID: clickUUID,
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
      const emptyCountsPerDayArray = dataManipulater.formatForClient([{}])
      const targetDate = dataManipulater.formatDate(new Date(buttonClickPayload.clicks[0].timestamp))
      const updatedCountsArray = emptyCountsPerDayArray.map(item => {
        if (item.date === targetDate) {
          return { ...item, activityCount: 2 }
        }
        return item
      })

      it('returns 200 and an object with updated activity counts', async () => {
        const response = await request.get('/api/analytics/button-clicks-activity')

        expect(response.status).toBe(200)
        expect(response.body).toEqual([
          {
            totalObjects: 2,
            activity: updatedCountsArray
          }
        ])
      })
    })
  })

  describe('Querying with empty collection', () => {
    beforeAll(async () => {
      await ButtonClick.deleteMany({})
    })

    describe('/button-clicks', () => {
      it('returns 200 and an object with an empty data array', async () => {
        const response = await request.get('/api/analytics/button-clicks')

        expect(response.status).toBe(200)
        expect(response.body).toEqual({
          totalObjects: 0,
          data: []
        })
      })
    })

    describe('/button-clicks-stats', () => {
      it('returns 200 and an object with total clicks grouped by button', async () => {
        const response = await request.get('/api/analytics/button-clicks-stats')

        expect(response.status).toBe(200)
        expect(response.body).toEqual([])
      })
    })

    describe('/button-clicks-activity', () => {
      it('returns 200 and an object with updated activity counts', async () => {
        const response = await request.get('/api/analytics/button-clicks-activity')

        expect(response.status).toBe(200)
        expect(response.body).toEqual([
          {
            totalObjects: 0,
            activity: emptyCountsPerDayArray
          }
        ])
      })
    })
  })
})
