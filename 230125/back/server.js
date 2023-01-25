const express = require("express")
const cors = require("cors")
const nunjuncks = require("nunjucks")
const upload = require("./middlewares/upload")

const app = express()

app.set("view engine", "html")
nunjuncks.configure("views", {
    express: app,
})
app.use(cors())
app.use(express.json()) // req.body를 만들어줌
app.use(express.urlencoded({ extended: false })) // req.body를 만들어줌

app.use((req, res, next) => {
    //content-type
    //body ...
    req.body
    next()
})

app.get("/array", (req, res, next) => {
    res.render("array.html")
})
app.get("/single", (req, res, next) => {
    res.render("single.html")
})
app.get("/uploads", (req, res, next) => {
    res.render("uploads.html")
})
app.post(
    "/single",
    // (req, res, next) => {
    //     console.log("hello world!")
    //     req.body = " "
    //     next()
    // },
    upload.single("upload"),
    (req, res) => {
        console.log(req.file)
        console.log(req.body) // 경로와 , 파일 이름 넣어주어야함..
        res.send("upload")
    }
)
app.post("/array", upload.array("upload"), (req, res) => {
    console.log(req.files)
    console.log(req.body)
    res.send("upload")
})
app.post(
    "/uploads",
    upload.fields([
        { name: "upload1" },
        { name: "upload2" },
        { name: "upload3" },
        { name: "upload4" },
    ]),
    (req, res) => {
        console.log(req.files.upload1)
        console.log(req.files.upload2)
        console.log(req.files.upload3)
        console.log(req.files.upload4)
        console.log(req.body)
        res.send("upload")
    }
)

app.listen(3000, () => {
    console.log("server open")
})
