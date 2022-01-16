const { verify } = require('../utils/jwt.js')
const { ClientError } = require('../utils/error.js')
module.exports = (req, res, next) => {
    try {
        const { token } = req.headers
        if(!token) throw new ClientError(401, "Foydalanuvchi ro'yxatdan o'tmagan!")
        
        const { userId, agent } = verify(token)
        if(req.headers['user-agent'] != agent) throw new ClientError(401, "Foydalanuvchi ro'yxatdan o'tmagan!")
        req.userId = userId

        return next()
    } catch(error) {
        return next(error)
    }

}