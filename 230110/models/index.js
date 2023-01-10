require("dotenv").config()

const mysql = require("mysql2")
const host = process.env.DB_HOST || "127.0.0.1"
const port = process.env.DB_PORT || "3306"
const user = process.env.DB_USER || "root"
const password = process.env.DB_PASSWORD || "1q2w3e4r!"
const database = process.env.DB_DATABASE || "comments"


const pool = mysql.createPool({
    //공개되면 안되기 때문에 .env 파일을 이용하여 git에는 안올라가고 공유할 수 있다.
    host,
    port,
    user,
    password,
    database
})
.promise()

// pool.query("select * from Comment").then((data)=>console.log(data))

module.exports = pool