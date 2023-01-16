const fs = require("fs")
const path = require("path")
const {Sequelize} = require("sequelize")
const{db} = require("../config")
const env = process.env.NODE_ENV || "development"
const config = db[env]

const sequelize = new Sequelize(config.database, config.username, config.password, config)  

//model파일을 require해준다.
fs.readdirSync(__dirname)
.filter((v)=>v.indexOf('model') !== -1)
.forEach((filename)=>{
    require(path.join(__dirname,filename))(sequelize, Sequelize)
})

//호출 한다.
const {models} = sequelize
for(const key in models){
    if(typeof models[key].associations === undefined) continue
    models[key].associate(models)
}

;(async ()=>{
    await sequelize.sync({force: true})
    const { User, Board, Comment, Hash } = models
    
    //TEST를 위한 데이터
    await User.create({userid:"web7722", userpw:"1234", username:"baek" })
    await User.create({userid:"admin", userpw:"1234", username:"관리자" })

    await Board.create({subject:"제목1", content:"내용1", userid:"web7722"})
    await Board.create({subject:"제목2", content:"내용2", userid:"web7722"})
    await Board.create({subject:"제목3", content:"내용3", userid:"web7722"})
    await Board.create({subject:"제목4", content:"내용4", userid:"web7722"})
    await Board.create({subject:"제목5", content:"내용5", userid:"admin"})
    await Board.create({subject:"제목6", content:"내용6", userid:"admin"})

    await Comment.create({content : "댓글1", boardid:1, userid:"web7722"}) 
    await Comment.create({content : "댓글2", boardid:1, userid:"web7722"}) 
    await Comment.create({content : "댓글3", boardid:1, userid:"admin"}) 
    await Comment.create({content : "댓글4", boardid:1, userid:"admin"}) 

    //글쓰기
    const body = {
        subject:"새로운 글 등록",
        content:"하이하이하이",
        hashtag:["#javascript", "#helloworld", "#nodejs"]
    }
    const cookie = {
        userid:"web7722"
    }
    const req = {body, cookie}
    
    //board 테이블과, hash테이블에 넣을 영역을 분리한다.
    const {hashtag, ...rest} = req.body
    //1.board테이블 Insert
    const board = await Board.create(rest)
    //2.hash테이블 Insert .. hash는 중복값이 들어가면 안된다.
    

})()


module.exports = {
    Sequelize,
    sequelize
}