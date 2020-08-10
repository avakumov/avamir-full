const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    bookPath: {
        type: String,
        required: true,
        max: 500,
    },
    coverPath: {
        type: String,
        required: true,
        max: 500,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CategoryBooks',
    },
    marks: {
        type: String,
        max: 5000,
    },
    review: {
        type: String,
        max: 10000,
    },
    readedPages: {
        type: Number,
        default: 0,
    },
    allPages: {
        type: Number,
        required: true,
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

module.exports = mongoose.model('Book', bookSchema)
