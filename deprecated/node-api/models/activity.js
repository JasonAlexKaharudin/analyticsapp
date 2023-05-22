const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
    cursor_x: {
        type: Number,
        default: null
    }, 
    cursor_y: {
        type: Number,
        default: null
    }, 
    mouse_click: {
        type: Number,
        default: null
    },
    key_click: {
        type: Number,
        default:null
    },
    break_ended: {
        type: Date,
        required: true,
        default: Date.now
    },
    break_duration: {
        type: Number,
        default: null
    }
})


module.exports = mongoose.model('Activity', activitySchema)