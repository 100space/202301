// const mysql = require("mysql2")
// const config = require("../config")
// //공개되면 안되기 때문에 .env 파일을 이용하여 git에는 안올라가고 공유할 수 있다.
// const pool = mysql.createPool(config.db).promise()
// // pool.query("select * from Comment").then((data)=>console.log(data))
// module.exports = pool

const config = require("../config")
//function으로 나오지만 class 임
console.log(config)
const Sequelize = require("sequelize")
const env = config.env // development
const db = config.db[env]

const sequelize = new Sequelize(db.database, db.username, db.password, db)
//  models: {} 에 채워지는 것을 확인해야한다.

// const user = require("./user.model")
// user(sequelize, Sequelize)
const user = require("./user.model")(sequelize, Sequelize)
console.log(user)

console.log(sequelize)
//models: { User: User }, 생김..

console.log(sequelize.models.User === user) // true

module.exports = {
    Sequelize,
    sequelize
}