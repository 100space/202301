const express = require("express")
const app = express()
const config = require("./config")
const PORT = config.port
const router = require("./routes")
const {sequelize} = require("./models")


app.use(express.json())
app.use(router)
app.use((error, req, res, next)=>{
    res.json({
        isError:true,
        message:error.message
    })
})


app.listen(PORT, async()=>{
    await sequelize.sync({force : true})
    console.log("back server open")
})