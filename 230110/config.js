const HttpException = require('./exceptions/HTTPException')

const host = process.env.DB_HOST || "127.0.0.1"
const port = process.env.DB_PORT || "3306"
const user = process.env.DB_USER || "root"
const password = process.env.DB_PASSWORD || "1q2w3e4r!"
const database = process.env.DB_DATABASE || "comments"


const config = {
    exception :{
        HttpException,
    },
    port: process.env.PORT || 3000, 
    db:{
        host,
        port,
        user,
        password,
        database
    }
}

module.exports = config