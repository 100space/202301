const Sequelize = require("sequelize")
const config = require("../config")
const db = config.db[config.env]
console.log(config)

const sequelize = new Sequelize(db.database, db.username, db.password, db)

require("./board.model")(sequelize,Sequelize)
require("./comment.model")(sequelize,Sequelize)
require("./hash.model")(sequelize,Sequelize)
require("./hashtag.model")(sequelize,Sequelize)
require("./like.model")(sequelize,Sequelize)
require("./user.model")(sequelize,Sequelize)

module.exports = {
    sequelize,
    Sequelize
}