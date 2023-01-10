require("dotenv").config() // 순서 중요... process.env.PORT가 생성됨...
const express = require("express")
const app = express()
const router = require("./routes")
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(router)
// app.use((error, req, res, next)=>{
//     // 응답코드
// })

app.listen (PORT, () =>{
    //3001 포트를 이용하게 됨..
    console.log(`back server open ${PORT}`)
})