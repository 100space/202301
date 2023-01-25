const express = require("express")
const app = express()

app.use(express.json())
app.use((error, req, res, next) => {
    res.status(500).send(error.message)
})

module.exports = app
