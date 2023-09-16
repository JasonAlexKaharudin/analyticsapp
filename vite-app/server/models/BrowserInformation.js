import mongoose from 'mongoose'

const browserInfoSchema = new mongoose.Schema({
  userID: { type: String },
  userAgent: { type: String },
  browserName: { type: String },
  browserVersion: { type: String },
  device: { type: String },
  operatingSystem: { type: String },
  timezone: { type: String },
  language: { type: String },
  timestamp: { type: Date, required: true },
})

const BrowserInfo = mongoose.model('BrowserInfo', browserInfoSchema)

export default BrowserInfo
