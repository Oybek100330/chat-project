const router = require('express').Router()
const controller = require('../controllers/user.js')
const multer = require('multer')
const imageUpload = multer()

router.get('/', controller.GET)
router.get('/:userId', controller.GET)
router.put('/', imageUpload.single('avatar'), controller.PUT)

module.exports = router