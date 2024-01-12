require('dotenv').config()
const express = require('express')
const atheleteRouter = require('./routers/atheleteRouter')
const signInRouter = require('./routers/signInRouter')
require('./db/conn')
const app = express()

const port = process.env.PORT || 3000


app.use(express.json())
app.use(atheleteRouter)
app.use(signInRouter)

app.listen(port, () => {
    console.log(`api running at port ${port}`)
})