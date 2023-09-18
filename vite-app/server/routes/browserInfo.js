import express from 'express'
import BrowserInfo from '../models/BrowserInformation.js'
import validateStartDate from '../middleware/validateStartDate.js'
import createValidationMiddleware from '../middleware/validationMiddleWare.js'
import { postProcessBrowserInfoService } from '../services/processBrowserInfoService.js'

const router = express.Router()
const browserInfoValidationMiddleware = createValidationMiddleware('BrowserInfo')

router.post('/browser-info', browserInfoValidationMiddleware, async (req, res) => {
  try {
    const newBrowserData = req.body
    const createdBrowserInfo = await BrowserInfo.create(newBrowserData)

    res.status(201).json(createdBrowserInfo)
  } catch (error) {
    res.status(500).json({ 'Internal Server Error.': error })
  }
})

router.get('/browser-statistics', validateStartDate, async (req, res) => {
  const startDate = new Date(req.query.startDate || Date.now() - 7 * 24 * 60 * 60 * 1000)

  try {
    const browserInfoData = await BrowserInfo.find({ timestamp: { $gte: startDate } })
    const browserAnalytics = postProcessBrowserInfoService(browserInfoData)

    res.status(200).json(browserAnalytics)
  } catch (error) {
    console.log(error)
    res.status(500).json({ 'Internal Server Error.': error })
  }
})

export default router
