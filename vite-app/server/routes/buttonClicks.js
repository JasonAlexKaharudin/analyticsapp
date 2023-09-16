import express from 'express'
import createValidationMiddleware from '../middleware/validationMiddleWare.js'
import validateStartDate from '../middleware/validateStartDate.js'
import ButtonClick from '../models/ButtonClick.js'
import { postProcessClickActivity } from '../middleware/postProcessClickActivity.js'


const router = express.Router()
const defaultDays = 7

const buttonClickValidationMiddleware = createValidationMiddleware('ButtonClick')

router.post('/button-click', buttonClickValidationMiddleware, async (req, res) => {
  try {
    const clickData = req.body
    const createdButtonClickObject = await ButtonClick.create(clickData)

    console.log('successfull create buttonClick')
    res.status(201).json(createdButtonClickObject)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.get('/button-clicks', validateStartDate, async (req, res) => {
  try {
    const startDate = new Date(req.query.startDate || Date.now() - defaultDays * 24 * 60 * 60 * 1000)

    const buttonClicks = await ButtonClick.aggregate([
      {
        $unwind: '$clicks'
      },
      {
        $match: {
          'clicks.timestamp': { $gte: startDate }
        }
      }
    ])

    const responsePayload = {
      totalObjects: buttonClicks.length,
      data: buttonClicks
    }

    res.status(200).json(responsePayload)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.get('/button-clicks-stats', validateStartDate, async (req, res) => {
  try {
    const startDate = new Date(req.query.startDate || Date.now() - defaultDays * 24 * 60 * 60 * 1000)

    const statistics = await ButtonClick.aggregate([
      {
        $unwind: '$clicks'
      },
      {
        $match: {
          'clicks.timestamp': { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$clicks.buttonId',
          totalClicks: { $sum: 1 }
        }
      },
      {
        $project: {
          buttonId: '$_id',
          _id: 0,
          totalClicks: 1
        }
      },
      {
        $sort: {
          buttonId: 1
        }
      }
    ])

    res.status(200).json(statistics)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.get('/button-clicks-activity', validateStartDate, async (req, res) => {
  try {
    const startDate = new Date(req.query.startDate || Date.now() - defaultDays * 24 * 60 * 60 * 1000)

    const data = await ButtonClick.aggregate([
      {
        $unwind: '$clicks'
      },
      {
        $match: {
          'clicks.timestamp': { $gte: startDate }
        }
      }
    ])

    const clickCountsPerDay = postProcessClickActivity(data)

    const responsePayload = {
      totalObjects: data.length,
      activity: clickCountsPerDay
    }

    res.status(200).json([responsePayload])
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error.' })
  }
})

export default router
