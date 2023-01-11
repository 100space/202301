const express = require('express')
const config = require("./config")
const {sequelize} = require("./models")
const app = express()
const PORT = config.port

app.use(express.json())

app.use((error, req, res, next)=>{
    res.send("ERROR")
})

app.listen(PORT, async() =>{
    await sequelize.sync({force: true})
    //TEST 코드작성
    // console.log(sequelize.models)// User,Comment
    const Comment = sequelize.models.Comment
    //c 
    // INSERT INTO Comment (userId, content) VALUES("web7722", "HELLOOOOOO~~~")
    const result = await Comment.create({userid:'web7722', content:"HELLOOOOOOOO~~~"})
    console.log(result,11111)

    //R
    //SELECT * FROM Comment
    const selectAll = await Comment.findAll()
    
    //SELECT * FROM Comment WHERE userid="web7722" LIMIT 1
    const selectOne = await Comment.findOne({ where: {userid:"web7722"}}) // 못찾으면 null

    console.log(selectAll,22222)
    console.log(selectOne,33333)
    const insert1 = await Comment.create({userid:'web7722', content:"HELL111111111~~~"})
    const insert2 = await Comment.create({userid:'web7722', content:"HELL222222222~~~"})
    const insert3 = await Comment.create({userid:'web7722', content:"HELL333333333~~~"})

    //U
    //UPDATE Comment SET userid="web8855", content="수정이다." where id=3
    //1.바꿀 내용, 2. where
    const update = await Comment.update({
        userid:"web8855", content:"수정이다."
    },{where : {id:3}}
    )
    console.log(update,4444444)

    //D
    //DELETE FROM Comment WHERE id=3
    const destroy = await Comment.destroy({where:{id:3}})
    console.log(destroy,555555)

    const [query] = await sequelize.query(`SELECT * FROM Comment`)

    console.log(query)

    console.log("back server open")
})