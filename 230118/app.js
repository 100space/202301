//미들웨어를 위한 파일
const express = require("express")
const app = express()
const router = require("./routes")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const axios = require("axios")
const qs = require("qs")
const jwt = require("./lib/jwt")
const {
    sequelize: {
        models: { User },
    },
} = require("./models")

app.use(
    cors({
        origin: true,
        credentials: true,
    })
)

app.use(cookieParser())
app.use(express.json())
app.use(router)

const HOST = `https://kauth.kakao.com`
const REST_API_KEY = `6f3af7393558bd75aa668cd31cc22396`
const REDIRECT_URI = `http://127.0.0.1:3000/oauth/kakao`
const CLIENT_SECRET = `VXsHPy3ZQNeftLch0cd0fS78pefVJYIH`

app.get("/oauth/kakao", async (req, res, next) => {
    // step2. 토큰 받기
    const { code } = req.query
    // console.log(code)
    //서비스 로직 시작
    const host = `${HOST}/oauth/token`
    const header = {
        "Content-type": "application/x-www-form-urlencoded",
    }
    const body = qs.stringify({
        grant_type: "authorization_code",
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code,
        client_secret: CLIENT_SECRET,
    })

    const response = await axios.post(host, body, header)
    //서비스 로직 끝
    // console.log(response.data) // token
    //token을 가지고 회원정보 조회

    //step3. 회원 정보 가져오기
    try {
        const { access_token } = response.data
        const host = `https://kapi.kakao.com/v2/user/me`
        const user = await axios.post(host, null, {
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${access_token}`,
            },
        })
        console.log(user)

        const sns = {
            userid: user.data.id,
            userpw: user.data.id,
            username: user.data.properties.nickname,
            provider: "kakao",
            snsId: user.data["kakao_account"].email,
        }
        const [snsCreate] = await User.findOrCreate({
            where: { snsId: sns.snsId },
            defaults: sns,
        }) // 만들어짐.
        const { userid, userpw } = snsCreate.dataValues
        const bodys = { userid, userpw }
        const result = await axios.post("http://127.0.0.1:3000/auth", bodys, {
            headers: {
                "Content-type": "application/json",
            },
        })
        console.log(result)
        // console.log(result.data.token)
    } catch (e) {}
    res.redirect("http://127.0.0.1:3005/")
    //
})

//router..
app.use((error, req, res, next) => {
    res.status(500).send(error.message)
})

module.exports = app
