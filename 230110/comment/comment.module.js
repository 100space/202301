const mysql = require("../models")
const repository = require ( "./comment.repository")(mysql) // 가져와서 실행

repository.findAll().then((data)=>console.log(data))
