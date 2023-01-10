require("dotenv").config() // 순서 중요... process.env.PORT가 생성됨...
const express = require("express")
const app = express()
const config = require("./config")
const HttpException = config.exception.HttpException
const router = require("./routes")
const {sequelize} = require("./models")

app.use(express.json())
app.use(router)
app.use((error, req, res, next)=>{
    if ( error instanceof HttpException){
        res.json({
            isError: true,
            message : error.message,
            status : error.status
        })
    }else if(error instanceof Error){
        //원형 데이터를 찾는다. 위에서부터 ....
        // typeof 는 맨 끝에 있는 상태를 찾는다.\
        res.json({
            isError: true,
            message : error.message,
        })
    }
    // 응답코드
    
})

app.listen (config.port, async() =>{
    //3001 포트를 이용하게 됨..
    await sequelize.sync({force : true}) 
    console.log(`back server open `)
})