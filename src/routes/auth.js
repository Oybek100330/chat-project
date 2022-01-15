const router = require('express').Router()
const controller = require('../controllers/auth.js')
const { regValidation } = require('../middlewares/validation.js')

router.post('/login', controller.LOGIN)
router.post('/register', regValidation, controller.REGISTER)

module.exports = router