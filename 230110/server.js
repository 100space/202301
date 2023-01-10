require("dotenv").config() // 순서 중요... process.env.PORT가 생성됨...
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000


app.listen (PORT, () =>{
    //3001 포트를 이용하게 됨..
    console.log(`back server open ${PORT}`)
})