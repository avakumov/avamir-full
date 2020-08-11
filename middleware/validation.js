const Joi = require('@hapi/joi')

const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(4).max(255).required().messages({
            'string.empty': 'Имя пользователя не может быть пустым',
            'string.min':
                'Имя пользователя должно состоять минимум из 4 символов',
        }),

        email: Joi.string().min(6).max(255).required().email().messages({
            'string.empty': 'Email обязателен для заполнения',
            'string.min': 'Email должнен состоять минимум из 6 символов',
        }),

        password: Joi.string().min(6).max(1024).required().messages({
            'string.empty': 'Пароль не может быть пустым',
            'string.min': 'Пароль должен состоять минимум из 6 символов',
        }),
        passwordRepeat: Joi.ref('password'),
    }).with('password', 'passwordRepeat')
    return schema.validate(data)
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).max(255).required().email().messages({
            'string.empty': 'Email обязателен для заполнения',
            'string.min': 'Email должнен состоять минимум из 6 символов',
        }),
        password: Joi.string().min(6).max(1024).required().messages({
            'string.empty': 'Пароль не может быть пустым',
            'string.min': 'Пароль должен состоять минимум из 6 символов',
        }),
    })

    return schema.validate(data)
}

const taskValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(6).max(255).required(),
    })

    return schema.validate(data)
}

const bookValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(2).max(255).required(),
        bookPath: Joi.string().max(500).required(),
        coverPath: Joi.string().max(500).required(),
        category: Joi.string().max(50).required(),
        marks: Joi.string().max(5000),
        review: Joi.string().max(10000),
        allPages: Joi.number().required(),
    })

    return schema.validate(data)
}

const postValidation = (data) => {
    const schema = Joi.object({
        _id: Joi.string(),
        content: Joi.string().min(6).required(),
        user: Joi.string(),
        dateCreated: Joi.date(),
        tags: Joi.array().items(
            Joi.object({
                _id: Joi.string(),
                title: Joi.string().max(30).required(),
                color: Joi.string().max(30),
            })
        ),
    })

    return schema.validate(data)
}

const categoryBooksValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(255).required(),
    })

    return schema.validate(data)
}

module.exports = {
    registerValidation,
    loginValidation,
    taskValidation,
    bookValidation,
    categoryBooksValidation,
    postValidation,
}
