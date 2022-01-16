const router = require('express').Router()
const multer = require('multer')
const controller = require('../controllers/message.js')
const checkToken = require('../middlewares/checkToken.js')
const messageFile = multer()

router.get('/', controller.GET)
router.get('/:messageId', controller.GET)
router.post('/', checkToken, messageFile.single('messageFile'), controller.POST)
router.put('/', checkToken, controller.PUT)
router.delete('/', checkToken, controller.DELETE)

module.exports = router