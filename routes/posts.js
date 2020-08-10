const router = require('express').Router()

const { postValidation } = require('../middleware/validation')
const Post = require('../models/Post')

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find({ user: req.user.id })

        res.json({
            posts,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'server error' })
    }
})

router.post('/add', async (req, res) => {
    try {
        //validation
        const { error } = postValidation(req.body)
        if (error)
            return res.status(422).json({ error: error.details[0].message })

        const post = new Post({
            content: req.body.content,
            tags: req.body.tags,
            user: req.user.id,
        })

        const savedPost = await post.save()
        res.json({ post: savedPost })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'server error' })
    }
})

router.patch('/post', async (req, res) => {
    try {
        const { error } = postValidation(req.body)
        if (error)
            return res.status(422).json({ error: error.details[0].message })

        let post = await Post.findOne({ _id: req.body._id })
        post.content = req.body.content
        post.tags = req.body.tags
        const savedPost = await post.save()

        res.json({ post: savedPost })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'server error' })
    }
})

router.post('/delete', async (req, res) => {
    try {
        const deletedPost = await Post.findOneAndDelete({
            _id: req.body.id,
            user: req.user.id,
        })
        res.json({ post: deletedPost })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'server error' })
    }
})

module.exports = router
