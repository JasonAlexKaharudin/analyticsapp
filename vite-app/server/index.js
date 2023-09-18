import { createServer } from './utils/server.js'
import { connectDB } from './utils/connectDB.js'

const app = createServer()
const PORT = process.env.PORT || 9000
const MONGO_URL = process.env.NODE_ENV === 'development' ? process.env.MONGO_URL_DEV : process.env.MONGO_URL_PROD

connectDB(app, MONGO_URL, PORT)
