require("dotenv").config()
const mysql = require("mysql2")

const host = process.env.DB_HOST || "127.0.0.1"
const port = process.env.DB_PROT || 3306
const user = process.env.DB_PROT || "root"
const password = process.env.DB_PROT || "1q2w3e4r!"
const database = process.env.DB_DATABASE || "comments"

const pool = mysql.createPool({
    host,
    port,
    user,
    password,
    database,
}).promise()

// pool.query('select * from Comment').then((data)=>console.log(data))

module.exports = pool
