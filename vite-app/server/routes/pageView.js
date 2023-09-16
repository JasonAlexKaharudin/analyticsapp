import express from 'express'
import createValidationMiddleware from '../middleware/validationMiddleWare.js'
import validateStartDate from '../middleware/validateStartDate.js'
import PageViewDuration from '../models/PageViewDuration.js'

const router = express.Router()
const defualtDays = 7

const pageViewValidationMiddleware = createValidationMiddleware('PageViewDuration')
router.post('/page-view', pageViewValidationMiddleware, async (req, res) => {
  try {
    const pageViewDurationData = req.body
    const createdPageViewObject = await PageViewDuration.create(pageViewDurationData)

    console.log('Successful created Page View')
    res.status(201).json(createdPageViewObject)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.get('/average-page-views', validateStartDate, async (req, res) => {
  try {
    const startDate = new Date(req.query.startDate || Date.now() - defualtDays * 24 * 60 * 60 * 1000)

    const buttonClicks = await PageViewDuration.aggregate([
      {
        $match: {
          timestamp: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$pathURL',
          averageDuration: { $avg: '$duration' }
        }
      },
      {
        $project: {
          pageURL: '$_id',
          _id: 0,
          averageDuration: { $round: ['$averageDuration', 2] }
        }
      },
      {
        $sort: {
          averageDuration: 1
        }
      }
    ])

    const responsePayload = {
      totalObjects: buttonClicks.length,
      data: buttonClicks.reverse()
    }

    res.status(200).json(responsePayload)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default router
