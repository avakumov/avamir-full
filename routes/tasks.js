const router = require('express').Router()

const { taskValidation } = require('../middleware/validation')
const Task = require('../models/Task')

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id }).populate('user')

        res.json({
            tasks,
        })
    } catch (err) {
        console.log(err)
    }
})

router.post('/add', async (req, res) => {
    try {
        //validation
        const { error } = taskValidation(req.body)
        if (error)
            return res.status(400).json({ error: error.details[0].message })

        const isTaskExist = await Task.findOne({
            title: req.body.title,
            user: req.user.id,
        })

        if (isTaskExist)
            return res.status(400).json({ error: 'Task already exists' })

        const task = new Task({
            title: req.body.title,
            user: req.user.id,
        })

        const savedTask = await task.save()
        res.json({ error: null, data: { task: savedTask } })
    } catch (err) {
        console.log(err)
    }
})

module.exports = router
