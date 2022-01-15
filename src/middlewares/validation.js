const joi = require('joi')

const userValidation = joi.object({
    username: joi.string().min(3).max(30).alphanum().required(),
    password: joi.string().min(4).max(16).pattern(new RegExp(/(?=.*[a-zA-Z]+)(?=.*[0-9]+)/)).required()
})

const regValidation = (req, res, next) => {
    const { value, error } = userValidation.validate(req.body)

    if(error) return next(error)
    return next()
}

module.exports = {
    regValidation
}