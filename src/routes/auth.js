const router = require('express').Router()
const controller = require('../controllers/auth.js')

router.post('/login', controller.LOGIN)
router.post('/register', controller.REGISTER)

module.exports = router