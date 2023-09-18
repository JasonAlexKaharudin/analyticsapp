import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

import buttonClicksRoutes from '../routes/buttonClicks.js'
import pageViewRoutes from '../routes/pageView.js'
import browserInfoRoutes from '../routes/browserInfo.js'
import userEngagementRoutes from '../routes/userEngagement.js'

export function createServer () {
  // CONFIGS
  dotenv.config()
  const app = express()
  app.use(helmet())
  app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
  app.use(morgan('common'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cors())

  /* ROUTES */
  const API_PREFIX = '/api/analytics'

  app.use(`${API_PREFIX}`, buttonClicksRoutes)
  app.use(`${API_PREFIX}`, pageViewRoutes)
  app.use(`${API_PREFIX}`, browserInfoRoutes)
  app.use(`${API_PREFIX}`, userEngagementRoutes)

  return app
}
