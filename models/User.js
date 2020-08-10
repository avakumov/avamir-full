const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task',
        },
    ],
    name: {
        type: String,
        required: true,
        min: 4,
        max: 255,
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('User', userSchema)
