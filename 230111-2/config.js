require("dotenv").config() //config 함수와 parse함수

const config = {
    env:process.env.NODE_ENV || "development",
    port:process.env.PORT || 3000,
    db:{
        development:{
            username:process.env.DB_USER || "",
            password:process.env.DB_PASSWORD || "",
            database:process.env.DB_DATABASE || "",
            host:process.env.DB_HOST || "",
            port:process.env.DB_PORT || "",
            dialect:"mysql"
        }
    }
}

module.exports = config