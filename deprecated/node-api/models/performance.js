const mongoose = require('mongoose')

const performSchema = new mongoose.Schema({
    timing_obj: {
        type: String,
        required: true
    }, 
    start_time: {
        type: Number,
        required: true
    }, 
    end_time: {
        type: Number,
        required: true
    }, 
    total_load_time: {
        type: Number,
        required: true
    }
})


module.exports = mongoose.model('Performance', performSchema)