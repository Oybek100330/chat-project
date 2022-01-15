const express = require('express')
const multer = require('multer')
const { PORT } = require('../config.js')
const app = express()
const imageUpload = multer()

const modelMiddleware = require('./middlewares/model.js')
app.use(imageUpload.single('avatar'))
app.use(express.json())

const userRouter = require('./routes/user.js')
const authRouter = require('./routes/auth.js')

app.use(modelMiddleware)
app.use('/users', userRouter)
app.use('/auth', authRouter)

app.use((error, req, res, next) => {
    //...
    // console.log(error);
    res.send({message: error.message})
})

app.listen(PORT, () => console.log('Backend-server is running on http://localhost:' + PORT))