require('dotenv').config()
const PORT = process.env.PORT || 7000

const TOKEN_TIME = 3600 * 24

module.exports = {
    PORT,
    TOKEN_TIME
}