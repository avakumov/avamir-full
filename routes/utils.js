const router = require('express').Router()

const User = require('../models/User')
const Joi = require('@hapi/joi')
const {
    registerValidation,
    loginValidation,
} = require('../middleware/validation')

const validateEmail = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .message('Минимум 6 символов')
            .max(255)
            .required()
            .email()
            .message('Email не валидный'),
    })

    return schema.validate(data)
}

router.post('/isemailexist', async (req, res) => {
    try {
        const { error } = validateEmail(req.body)
        if (error)
            return res.status(422).json({ error: error.details[0].message })

        const existUser = await User.findOne({ email: req.body.email })

        if (existUser)
            return res.status(400).json({ error: 'Email already exists' })

        res.json({ message: 'email is not exists' })
    } catch (err) {
        console.log(err)
        res.status(500)
    }
})

router.post('/validate-register', async (req, res) => {
    try {
        const { error } = registerValidation(req.body)

        if (error)
            return res.status(422).json({ error: error.details[0].message })

        const isEmailExist = await User.findOne({ email: req.body.email })

        if (isEmailExist)
            return res.status(422).json({
                error: 'Пользователь с таким email уже зарегистрирован',
            })
        // if (req.body.password !== req.body.passwordRepeat) {
        //     return res.status(422).json({error: "Пароли не совпадают"})
        // }
        res.json({ message: 'Ok', error: '' })
    } catch (err) {
        console.log(err)
        res.status(500)
    }
})

router.post('/validate-login', async (req, res) => {
    try {
        const { error } = loginValidation(req.body)

        if (error)
            return res.status(422).json({ error: error.details[0].message })

        res.json({ message: 'Ok', error: '' })
    } catch (err) {
        console.log(err)
        res.status(500)
    }
})

module.exports = router
