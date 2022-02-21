const { ServerError } = require('./utils/error.js')
const timeConverter = require('./utils/timeConverter.js')
const express = require('express')
const cors = require('cors')
const { PORT } = require('../config.js')
const app = express()
const path = require('path')
const fs = require('fs')
const checkToken = require('./middlewares/checkToken.js')

const modelMiddleware = require('./middlewares/model.js')
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(process.cwd(), 'src', 'files')))

const userRouter = require('./routes/user.js')
const authRouter = require('./routes/auth.js')
const messageRouter = require('./routes/message.js')

app.use(modelMiddleware)
app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use(checkToken)
app.use('/messages', messageRouter)

app.use((error, req, res, next) => {
    if([400, 401, 404, 413, 415].includes(error.status)) {
        console.log(error);
        return res.status(error.status).send(error)
    }

    fs.appendFileSync( 
        path.join(process.cwd(), 'log.txt'),
        `${timeConverter(new Date())}  ${req.method}  ${req.url}  ${error.message}\n`
    )
    console.log(error);
    return res.status(500).send(new ServerError(""))
})

app.listen(PORT, () => console.log('Backend-server is running on http://localhost:' + PORT))