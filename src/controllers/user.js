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

module.exports = {
    GET
}