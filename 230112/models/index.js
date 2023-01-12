const config = require("../config")["db"]
const Sequelize = require("sequelize")

const sequelize = new Sequelize(config.database, config.username, config.password, config) //마지막 인자는 설정한것 외에 필요한걸 가져다 쓰기 위해


//실행
require("./user.model")(sequelize, Sequelize)
console.log(sequelize.models)

module.exports = {
    Sequelize,
    sequelize,
}