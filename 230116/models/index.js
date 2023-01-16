//1. Connection을 목적으로..
const fs = require("fs")
const path = require("path")
const Sequelize = require('sequelize')
const {db} = require('../config')
console.log(db)
const env = process.env.NODE_ENV || 'development'
const config = db[env]

const sequelize = new Sequelize(config.database, config.username, config.password, config)

//user.model
//board.model
//comment.model
// require("./user.model")(sequelize, Sequelize) 하나씩 불러오는 것이 불편하다..
//FS를 활용해서 
fs.readdirSync(__dirname)
.filter((v)=>v.indexOf("model")!== -1 )// true, fasle true를 반환하게 된다.
.forEach((filename)=>{
    require(path.join(__dirname,filename))(sequelize,Sequelize)
})

// console.log(sequelize.models) //{}
const {models} = sequelize
for(const key in models) {
    // console.log(models[key]) // class
    // console.log(typeof models[key].associate)
    if(typeof models[key].associate === undefined) continue
    models[key].associate(models)
}
;(async()=>{
    await sequelize.sync({force:true})

    const { User, Board, Comment, Hash } = models
    
    await User.create({userid:"web7722", userpw:"1234", username:"baek" })
    await User.create({userid:"admin", userpw:"1234", username:"관리자" })

    await Board.create({subject:"제목1", content:"내용1", userid:"web7722"})
    await Board.create({subject:"제목2", content:"내용2", userid:"web7722"})
    await Board.create({subject:"제목3", content:"내용3", userid:"web7722"})
    await Board.create({subject:"제목4", content:"내용4", userid:"web7722"})
    await Board.create({subject:"제목5", content:"내용5", userid:"admin"})
    await Board.create({subject:"제목6", content:"내용6", userid:"admin"})

    const body = {
        subject:"새로운 글 등록",
        content:"하이하이하이",
        hashtag:["#javascript","#helloworld","#nodejs"]
    }
    const cookies = {
        userid : "web7722"
    }
    const req = {body, cookies}
    console.log(req)
})()


//내보내기 필!수!
module.exports = {
    Sequelize,
    sequelize
}