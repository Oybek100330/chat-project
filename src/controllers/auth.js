const { ClientError } = require('../utils/error.js')
const path = require('path')
const fs = require('fs')

const { sign } = require('../utils/jwt.js')
const sha256 = require('sha256')

const LOGIN = (req, res, next) => {
    try {
        const { username, password } = req.body
        if( !username || !password ) throw new ClientError(400, "username yoki parol kiritilmagan!")

        const users = req.select('users')
        const user = users.find(user => user.username == username && user.password == sha256(password))

        if(!user) throw new ClientError(404, "Xato username yoki password")
        delete user.password

        return res.status(200).json({
            user,
            message: "The user has succesfully logged in",
            token: sign({ userId: user.userId, agent: req.headers['user-agent'] })
        })

    } catch(error) {
        next(error)
    }
}

const REGISTER = (req, res, next) => {
    try {
        const users = req.select('users')
        const { username, password } = req.body

        const found = users.find(user => user.username == username)

        if(found) throw new ClientError(400, "Bunday foydalanuvchi nomi avval ishlatilgan!")
        if(!req.file) throw new ClientError(400, "Profil uchun rasm kiritilmadi!")

        const { size, mimetype, buffer, originalname } = req.file

        if(size > 10 * (2 ** 20)) throw new ClientError(400, "Rasm hajmi 10 MB dan kam bo'lishi kerak!")
        if(!['image/jpg', 'image/jpeg', 'image/png'].includes(mimetype)) throw new ClientError(400, "Rasm formatijpg, jpeg yoki png bo'lishi kerak!")

        const avatarName = Date.now() + originalname.replace(/\s/g, '')
        const pathName = path.join( process.cwd(), 'src', 'files', 'images', avatarName)
        fs.writeFileSync(pathName, buffer)

        const newUser = {
            userId: users.length ? users[users.length - 1].userId + 1 : 1,
            username,
            password: sha256(password),
            profileImg: '/images/' + avatarName
        }

        users.push(newUser)
        req.insert('users', users)
        delete newUser.password

        res.status(201).json({
            user: newUser,
            message: "The user has succesfully registered",
            token: sign({ userId: newUser.userId, agent: req.headers['user-agent'] })
        })

    } catch(error) {
        next(error)
    }
}

module.exports = {
    REGISTER,
    LOGIN
}