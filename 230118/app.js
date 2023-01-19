//미들웨어를 위한 파일
const express = require("express")
const app = express()
const router = require("./routes")
const cookieParser = require("cookie-parser")
const cors = require("cors")

app.use(
    cors({
        origin: true,
        credentials:true,
    })
)

app.use(cookieParser())
app.use(express.json())
app.use(router)
//router..  
app.use((error,req, res, next) =>{
    res.status(500).send(error.message)
})

module.exports = app
