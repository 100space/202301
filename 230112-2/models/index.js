const config = require("../config")['db']
const Sequelize = require("sequelize")

const sequelize = new Sequelize(config.database, config.username, config.password, config)


require("./user.model")(sequelize, Sequelize)
require("./board.model")(sequelize, Sequelize)

//테이블 생성해서 바로 확인하기 위해서 즉시함수 만듬
;(async()=>{
    await sequelize.sync({force:true})
})()

module.exports = {
    Sequelize,
    sequelize
}