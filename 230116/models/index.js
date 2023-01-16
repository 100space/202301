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

    await Comment.create({content : "댓글1", boardid:1, userid:"web7722"}) 
    await Comment.create({content : "댓글2", boardid:1, userid:"web7722"}) 
    await Comment.create({content : "댓글3", boardid:1, userid:"admin"}) 
    await Comment.create({content : "댓글4", boardid:1, userid:"admin"}) 

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
    
    const {hashtag, ...rest} = req.body
    
    //1. Board테이블에 insert
    const board = await Board.create(rest)
    
    //찾고 없으면 insert
    // const insert1 = await Hash.findOrCreate({where : {tag:"#javascript"}})
    // const insert2 = await Hash.findOrCreate({where : {tag:"#javascript"}})
    
    // forEach는 하나씩 넣어주기 때문에 10초짜리가 3개있으면 30초가 걸림
    // hashtag.forEach(async(v)=>{
    //     await Hash.findOrCreate({where:{tag:v}})
    // })

    // 다 성공했는가?만 알면된다.// Promise.all
    //Promise.all([Primise, Primise, Primise]) //순서 필요없고 결과만 면 된다.. 그래서 await 을 쓰는 거보단 promise all을 쓰는 것이 좋다.
    // 다 백그라운드에 실행시키고 그 값이 다 들어올때까지 기다림 .. forEach는 하나씩 넣는거지만 map을 이용하면 동시에 넣고 결과가 다 나오길 기다리기 때문에 조금 다르다.
    const hashtags = hashtag.map((tag)=>Hash.findOrCreate({ where:{tag:tag}}))
    const tags = await Promise.all(hashtags) // hashtag가 다 resolve 할 때까지 기다린다.
    
    // console.log(tags) // [[{}],[{}],[{}]]  ->[{},{},{}] 로 바꿔서 써야한다...
    //[{},{}]
    //[[{}],[{}],[{}]] -> [{}], {}
    // [{},{},{}]
    // console.log(board.__proto__) // __proto__ 상속받은 메서드를 볼 수 있다.
    await board.addHashes(tags.map((v)=> v[0]))

    //view
    const id = 7
    const view = await Board.findOne({
        // raw:true,
        // nest:true,
        where:{id:id},
        include :{
            model:User,
            attributes:["username"]
        },
    })
    console.log(view.__proto__)
    const comments = await view.getComments({raw:true})
    const hashs = (await view.getHashes({raw:true})).map((v)=>v.tag)
    console.log(comments)
    console.log(hashs)
})()


//내보내기 필!수!
module.exports = {
    Sequelize,
    sequelize
}