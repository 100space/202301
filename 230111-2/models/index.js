const Sequelize = require("sequelize") // class
const config = require ("../config")
const db = config.db[config.env]

const sequelize = new Sequelize(db.database, db.username, db.password, db)

require("./user.model")(sequelize, Sequelize)
require("./comment.model")(sequelize, Sequelize)

module.exports = {
    sequelize,
    Sequelize,
}