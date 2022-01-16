const path = require('path')
const fs = require('fs')
const { ClientError } = require('../utils/error.js')

const GET = (req, res, next) => {
    try {
        const users = req.select('users')
        const { userId } = req.params

        if(userId) {
            const user = users.find(user => user.userId == userId)
            return res.json(user)
        }
        res.json(users)
    } catch(error) {
        next(error)
    }
}

const PUT = (req, res, next) => {
    try {
        console.log(req.body);
        console.log(req.file);
        const { username } = req.body
        const users = req.select('users')
        const userId = req.userId
        let user = users.find(user => user.userId == userId)
        
        if(!user) throw new ClientError(400, "Bunday foydalanuvchi mavjud emas")
        if(!req.file) throw new ClientError(400, "Profil uchun rasm kiritilmadi!")

        fs.unlinkSync(path.join( process.cwd(), 'src', 'files', user.profileImg))
        const { size, mimetype, buffer, originalname } = req.file

        if(size > 10 * (2 ** 20)) throw new ClientError(400, "Rasm hajmi 10 MB dan kam bo'lishi kerak!")
        if(!['image/jpg', 'image/jpeg', 'image/png'].includes(mimetype)) throw new ClientError(400, "Rasm formatijpg, jpeg yoki png bo'lishi kerak!")

        const avatarName = Date.now() + originalname.replace(/\s/g, '')
        const pathName = path.join( process.cwd(), 'src', 'files', 'images', avatarName)
        fs.writeFileSync(pathName, buffer)

        user.username = username
        user.profileImg = '/images/' + avatarName

        req.insert('users', users)

        res.status(201).json({
            user: user,
            message: "The user datas succesfully updated",
        })
    } catch(error) {
        next(error)
    }
}

module.exports = {
    GET,
    PUT
}