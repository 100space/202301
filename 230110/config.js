const HttpException = require('./exceptions/HTTPException')
require("dotenv").config()


const host = process.env.DB_HOST || "127.0.0.1"
const port = process.env.DB_PORT || "3306"
const user = process.env.DB_USER || "root"
const password = process.env.DB_PASSWORD || "1q2w3e4r!"
const database = process.env.DB_DATABASE || "comments"

console.log(host)

const config = {
    exception :{
        HttpException,
    },
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 3000, 
    db:{
        development:{
            username: user,
            password: password,
            database: database,
            port: port,
            host:host,
            dialect:"mysql"
        },
        test :{
            username: user,
            password: password,
            database: database,
            port: port,
            host:host,
            dialect:"mysql",
            logging : false,
        }
    },
}

module.exports = config