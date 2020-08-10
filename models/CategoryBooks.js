const mongoose = require('mongoose')

const categoryBooks = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 3,
        max: 255,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('CategoryBooks', categoryBooks)
