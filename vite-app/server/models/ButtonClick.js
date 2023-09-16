import mongoose from 'mongoose'

const buttonClickSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  clicks: [
    {
      buttonId: { type: String, required: true },
      pageURL: { type: String, required: true },
      timestamp: { type: Date, required: true },
    }
  ]
})

const ButtonClick = mongoose.model('ButtonClick', buttonClickSchema)

export default ButtonClick
