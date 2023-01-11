const Sequelize = require("sequelize") // :class
// console.log(Sequelize)
const config = require("../config") 
const db = config.db[config.env] //config.db.development

//database, username, password
// mysql TCP통신을 하고 있다 .. 중요한 식별자는 port, host 가 있다..
const sequelize = new Sequelize(db.database, db.username, db.password, db)

//user.models.js
require('./user.model.js')(sequelize, Sequelize)
require("./comment.model.js")(sequelize, Sequelize)

//sequelize.model.User = {}

//comment.
//정적 메서드


module.exports = {
    sequelize,
    Sequelize,
}