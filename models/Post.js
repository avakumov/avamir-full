const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        min: 6,
    },
    tags: [
        {
            title: {
                type: String,
                required: true,
                max: 30,
            },
            color: {
                type: String,
                max: 30,
            },
        },
    ],
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

module.exports = mongoose.model('Post', postSchema)
