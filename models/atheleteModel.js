const mongoose = require('mongoose')

const atheleteSchema = new mongoose.Schema({
    ranking: {
        type: Number,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    dob: {
        type: Date,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    score: {
        type: String,
        required: true,
        trim: true
    },
    events: {
        type: String,
        default: '100m'
    }
})

const MensRanking = new mongoose.model('MenRanking', atheleteSchema)

module.exports = MensRanking
