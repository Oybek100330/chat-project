const router = require('express').Router()
const multer = require('multer')
const controller = require('../controllers/message.js')
const messageFile = multer()

router.get('/', controller.GET)
router.get('/download/messageFiles/:filepath', controller.DOWNLOAD)
router.get('/:messageId', controller.GET)
router.post('/', messageFile.single('messageFile'), controller.POST)
router.put('/', controller.PUT)
router.delete('/', controller.DELETE)

module.exports = router