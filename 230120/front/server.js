const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const nunjucks = require("nunjucks")

app.set("view engine", "html")
nunjucks.configure("views", {
    express:app,
})

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static("public"))

app.get("/", (req, res, next)=>{
    res.render("index.html")
})


app.listen(3005, async()=>{
    console.log("front server open")
})