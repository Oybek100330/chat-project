const router = require('express').Router()
const multer = require('multer')
const controller = require('../controllers/auth.js')
const { regValidation } = require('../middlewares/validation.js')

const imageUpload = multer()

router.post('/login', controller.LOGIN)
router.post('/register', imageUpload.single('avatar'), regValidation, controller.REGISTER)

module.exports = router