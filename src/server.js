const express = require('express')
const { PORT } = require('../config.js')
const app = express()

const modelMiddleware = require('./middlewares/model.js')
app.use(express.json())

const userRouter = require('./routes/user.js')
const authRouter = require('./routes/auth.js')

app.use(modelMiddleware)
app.use('/users', userRouter)
app.use('/auth', authRouter)

app.use((error, req, res, next) => {
    //...
    res.send({message: error.message})
})

app.listen(PORT, () => console.log('Backend-server is running on http://localhost:' + PORT))