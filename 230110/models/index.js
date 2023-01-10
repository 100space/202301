
const mysql = require("mysql2")
const config = require("../config")

//공개되면 안되기 때문에 .env 파일을 이용하여 git에는 안올라가고 공유할 수 있다.
const pool = mysql.createPool(config.db).promise()

// pool.query("select * from Comment").then((data)=>console.log(data))

module.exports = pool