const config = require("../config")["db"]
const Sequelize = require("sequelize")

const sequelize = new Sequelize(config.database, config.username, config.password, config) //마지막 인자는 설정한것 외에 필요한걸 가져다 쓰기 위해


//1. step models[.js, .js, .js]
//model
//require(value)(sequelize, Sequelize)
require("./user.model")(sequelize, Sequelize)
require("./board.model")(sequelize, Sequelize)
// console.log(sequelize.models)

const {models} = sequelize
models.user.associate() // 호출
models.Board.associate() // 호출

for(const key in models){
    if (typeof models[key].associate !== "function") continue
    models[key].associate(models)
}

//실행하면서 테이블 생성
;(async()=>{
    await sequelize.sync({force: true})
    const{
        models:{User,Board}
    } = sequelize
    //c
    await User.create({ userid:"web7722", userpw:"1234", username :"baek"})
    await User.create({ userid:"admin", userpw:"1234", username :"관리자"})

    await Board.create({ subject:"게시글 1", content:"내요어ㅓ옹", userid: "web7722"})
    await Board.create({ subject:"게시글 2", content:"내요어ㅓ옹", userid: "web7722"})
    await Board.create({ subject:"게시글 3", content:"내요어ㅓ옹", userid: "web7722"})
    await Board.create({ subject:"게시글 4", content:"내요어ㅓ옹", userid: "web7722"})
    await Board.create({ subject:"게시글 5", content:"내요어ㅓ옹", userid: "admin"})
    await Board.create({ subject:"게시글 6", content:"내요어ㅓ옹", userid: "admin"})

    const board = await Board.findAll({
        raw: true, // dataValue 만 보여줌... 
        nest: true, // user객체로 모아서 준다..
        include:[{ model: User }],
    }) 
    console.log(board)
})()

module.exports = {
    Sequelize,
    sequelize,
}