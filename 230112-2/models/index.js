const config = require("../config")['db']
const Sequelize = require("sequelize")

const sequelize = new Sequelize(config.database, config.username, config.password, config)


require("./user.model")(sequelize, Sequelize)
require("./board.model")(sequelize, Sequelize)

const {models} = sequelize
// models.Board.associate(models)
// models.User.associate(models)
for(const key in models) {
    if(typeof models[key].associate !=="function") continue
    models[key].associate(models)
}


//테이블 생성해서 바로 확인하기 위해서 즉시함수 만듬
;(async()=>{
    await sequelize.sync({force:true})

    const {
        models:{ User, Board},
    } = sequelize
    
    //실행할 때 마다 데이터 생성됨.
    await User.create({userid : "web7722", userpw:"123", username:"baek"})
    await User.create({userid : "admin", userpw:"123", username:"관리자"})

    await Board.create({ subject:"제목1", content:"내용1", userid:"web7722"})
    await Board.create({ subject:"제목2", content:"내용2", userid:"web7722"})
    await Board.create({ subject:"제목3", content:"내용3", userid:"web7722"})
    await Board.create({ subject:"제목4", content:"내용4", userid:"admin"})
    await Board.create({ subject:"제목5", content:"내용5", userid:"admin"})
    await Board.create({ subject:"제목6", content:"내용6", userid:"admin"})

    //join
    const board = await Board.findAll({
        raw:true,
        nest:true, // 결과에 유저를 따로 뽑아줌..
        include:[{model:User}]
    })
    console.log(board)
})()

module.exports = {
    Sequelize,
    sequelize
}