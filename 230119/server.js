const express = require("express")
const app = express()
const nunjucks = require("nunjucks")
const cookieParser = require("cookie-parser")
const axios = require("axios")

const request = axios.create({
    baseURL: "http://127.0.0.1:3000",
    withCredentials: true,
})

app.set("view engine", "html")
nunjucks.configure("views", {
    express: app,
})

app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static("public"))

app.use((req, res, next) => {
    try {
        const { token } = req.cookies
        const [header, payload, signature] = token.split(".")
        const pl = JSON.parse(Buffer.from(payload, "base64url").toString("utf-8"))
        req.user = pl
    } catch (e) {
    } finally {
        // try. catch 상관없이 무조건 실행
        next()
    }
})

app.get("/", (req, res) => {
    console.log(req.cookies)
    if (req.user === undefined) return res.render("index.html")
    console.log(req.user) // 미들웨어의 pl
    const { userid, username } = req.user
    // console.log(req.user.refresh_token,123123123)
    res.render("index.html", {
        userid,
        username,
    })
})

app.get("/signup", (req, res) => {
    res.render("user/signup.html")
})
app.post("/signup", async (req, res) => {
    const response = await request.post("/users", {
        ...req.body,
    })
    console.log(response)
    const { userid, username, userpw } = response.data
    res.redirect(`/welcome?userid=${userid}&username=${username}&userpw=${userpw}`)
})

app.get("/welcome", (req, res) => {
    const { userid, userpw, username } = req.query
    res.render("user/welcome.html", {
        userid,
        userpw,
        username,
    })
})

const HOST = `https://kauth.kakao.com`
const REST_API_KEY = `6f3af7393558bd75aa668cd31cc22396` //  어플리캐이션의 식별자
const REDIRECT_URI = `http://127.0.0.1:3000/oauth/kakao`

app.get("/oauth/kakao", (req, res) => {
    //kauth.kakao.com
    //  /oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code
    const redirectURL = `${HOST}/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
    res.redirect(redirectURL)
})

app.get("/signin", (req, res) => {
    res.render("user/signin.html")
})
app.listen(3005, () => {
    console.log("front server open")
})
