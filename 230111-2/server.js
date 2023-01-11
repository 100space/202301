const express = require("express")
const config = require("./config")
const { sequelize } = require("./models")
const app = express()
const PORT = config.port

app.use(express.json())

app.use((error, req, res, next )=>{
    res.send("ERROR")
})


app.listen(PORT, async() => {
    await sequelize.sync({force : true})
    console.log("back server open")
})