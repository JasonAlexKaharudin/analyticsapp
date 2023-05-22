const mongoose = require('mongoose')

const StaticsSchema = new mongoose.Schema({
    useragentString: {
        type: String,
        required: true
    }, 
    userLang: {
        type: String,
        required: true
    }, 
    cookie_enabled: {
        type: Boolean, 
        required: true    
    },
    width: {
        type: Number, 
        required: true
    },
    height: {
        type: Number, 
        required: true
    },
    innerHeight: {
        type: Number, 
        required: true    
    },
    innerWidth: {
        type: Number, 
        required: true    
    },
    outerHeight: {
        type: Number, 
        required: true    
    },
    outerWidth: {
        type: Number, 
        required: true    
    },
    connection_Type: {
        type: String, 
        required: true    
    }
})


module.exports = mongoose.model('Statics', StaticsSchema)