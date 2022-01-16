const { ClientError } = require('../utils/error.js')
const path = require('path')
const fs = require('fs')
const timeConverter = require('../utils/timeConverter.js')

const GET = (req, res, next) => {
    try {
        let messages = req.select('messages')
        messages = messages.map(message => {
            message.data = timeConverter(message.data)
            return message
        })
        const { messageId } = req.params
        const { userId } = req.query

        if(messageId) {
            const message = messages.find(message => message.messageId == messageId)
            return res.json(message)
        }

        messages = messages.filter(message => userId ? (message.from == userId || message.to == userId) : true)

        return res.json(messages)
    } catch(error){
        next(error)
    }
}

const POST = (req, res, next) => {
    try {
        const { messageText } = req.body
        const messages = req.select('messages')
        
        let newMessage = {
            messageId: messages.length ? messages[messages.length - 1].messageId + 1 : 1,
            from: req.userId,
            to: 3,
            messageText: messageText,
            messageFile: null,
            data: new Date(),
            isDeleted: false
        }
        
        if(req.file) {
            const { size, mimetype, buffer, originalname } = req.file
            const fileName = Date.now() + originalname.replace(/\s/g, '')
            const filepath = path.join( process.cwd(), 'src', 'files', 'messageFiles', fileName)
            fs.writeFileSync(filepath, buffer),
            newMessage.messageFile = {
                filetype: mimetype,
                filename: originalname,
                filepath: '/messageFiles/' + fileName,
                filesize: (size / (2 ** 20)).toFixed(2)
            }
        }

        messages.push(newMessage)
        req.insert('messages', messages)

        res.status(201).json({
            newmessage: newMessage,
            message: "The new message has succesfully added",
        })

    } catch(error){
        next(error)
    }
}

const PUT = (req, res, next) => {
    try {
        
    } catch(error){
        next(error)
    }
}

const DELETE = (req, res, next) => {
    try {

    } catch(error){
        next(error)
    }
}

const DOWNLOAD = (req, res, next) => {
    try {
        const { filepath } = req.params
        res.download( path.join( process.cwd(), 'src', 'files', 'messageFiles', filepath))
    } catch(error){
        next(error)
    }
}

module.exports = {
    GET,
    POST,
    PUT,
    DELETE,
    DOWNLOAD
}