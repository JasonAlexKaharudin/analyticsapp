import mongoose from 'mongoose'

const pageViewDurationSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  pathURL: { type: String, required: true },
  duration: { type: Number, required: true },
  timestamp: { type: Date, required: true }
})

const PageViewDuration = mongoose.model('PageViewDuration', pageViewDurationSchema)

export default PageViewDuration
