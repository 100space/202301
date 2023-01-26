const express = require("express")
const nunjucks = require("nunjucks")
const app = express()

app.set("view engine", "html")
nunjucks.configure("views", { express: app })

app.get("/", (req, res, next) => {
    res.render("index.html")
})
app.get("/io", (req, res, next) => {
    res.render("io.html")
})
app.listen(3005, () => {
    console.log("F server open")
})
