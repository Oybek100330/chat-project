const express = require('express')
const { PORT } = require('../config.js')
const app = express()

const modelMiddleware = require('./middlewares/model.js')

const userRouter = require('./routes/user.js')

app.use(modelMiddleware)
app.use('/users', userRouter)

app.use((error, req, res, next) => {
    //...
})

app.listen(PORT, () => console.log('Backend-server is running on http://localhost:' + PORT))