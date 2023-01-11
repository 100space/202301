const mysql = require("../models")

const CommentRepository = require("./comment.repository")
const CommentService = require("./comment.service")
const CommentController = require("./comment.controller")


const repository = new CommentRepository({mysql})
const service = new CommentService({commentRepository : repository})
const controller = new CommentController ({CommentController : service})

// repository.findAll().then((data)=>console.log(data))
// service.list().then((data)=>console.log(data))

module.exports={
    repository,
    service,
    controller
}