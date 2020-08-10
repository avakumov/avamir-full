const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../models/User')

const SUCCESS_CREATED_USER_MESSAGE = 'User created successfully with name '
const SUCCESS_LOGIN_MESSAGE = 'Success login, hello '

const {
    registerValidation,
    loginValidation,
} = require('../middleware/validation')

router.post('/register', async (req, res) => {
    try {
        const { error } = registerValidation(req.body)
        if (error)
            return res.status(422).json({ error: error.details[0].message })

        const isEmailExist = await User.findOne({ email: req.body.email })

        if (isEmailExist)
            return res.status(400).json({ error: 'Email already exists' })

        // hash the password
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(req.body.password, salt)

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password,
        })

        const savedUser = await user.save()
        res.json({
            error: null,
            message: `Вы успешно зарегистрировались с именем ${savedUser.name}`,
            data: { userId: savedUser._id },
        })
    } catch (err) {
        res.status(500)
    }
})

// login route
router.post('/login', async (req, res) => {
    try {
        // validate the user
        const { error } = loginValidation(req.body)

        // throw validation errors
        if (error)
            return res.status(422).json({ error: error.details[0].message })

        const user = await User.findOne({ email: req.body.email })

        // throw error when email is wrong
        if (!user)
            return res.status(400).json({ error: 'Email or password is wrong' })

        // check for password correctness
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if (!validPassword)
            return res.status(400).json({ error: 'Email or password is wrong' })

        // create token
        const token = jwt.sign(
            // payload data
            {
                name: user.name,
                id: user._id,
            },
            process.env.TOKEN_SECRET
        )

        res.header('auth-token', token).json({
            name: user.name,
            message: SUCCESS_LOGIN_MESSAGE + user.name,
            token,
        })
        console.log('login user: ', user.name)
    } catch (err) {
        res.status(500)
        console.log(err)
    }
})

module.exports = router
