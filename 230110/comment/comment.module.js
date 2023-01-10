// const mysql = require("../models")
// const repository = require ( "./comment.repository")(mysql) // 가져와서 실행
// const service = require("./comment.service")(repository)
// const controller = require("./comment.controller")(service)

// repository.findAll().then((data)=>console.log(data))
// service.list().then((data)=>console.log(data))

//===============================================================
const config = require("../config")
const mysql = require("../models")
const CommentRepository = require('./comment.repository')
const CommentService = require("./comment.service")
const CommentController = require("./comment.controller")
console.log(CommentController)

const repository = new CommentRepository({mysql})
const service = new CommentService({commentRepository : repository, config})
const controller = new CommentController({commnetService: service})

// repository.findAll().then((data)=>{
//     console.log(data)
// })

// service.list().then((data)=>{
//     console.log(data)
// })

module.exports = {
    repository,
    service,
    controller,
}


//인스턴스 생성해서 모듈화 해주는 파일....