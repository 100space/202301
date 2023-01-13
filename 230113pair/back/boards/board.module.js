const {
    sequelize:{
        models:{Board, Comment, Likes, Hash, Hashtag, User}
    },
    sequelize
} = require("../models")

const BoardReposity = require("./board.repository")
const BoardService = require("./board.service")
const BoardController = require("./board.controller")

const repository = new BoardReposity({Board, Comment, Likes, Hash, Hashtag, sequelize})
const service =  new BoardService({boardRepository:repository})
const controller = new BoardController({boardService:service})


module.exports = {
    repository,
    service,
    controller
}