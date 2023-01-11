const Sequelize = require("sequelize") // :class
const config = require("../config") 
const db = config.db[config.env] //config.db.development

//database, username, password
// mysql TCP통신을 하고 있다 .. 중요한 식별자는 port, host 가 있다..
const sequelize = new Sequelize(db.database, db.username, db.password, db)

//user.models.js

module.exports = {
    sequelize,
    Sequelize,
}