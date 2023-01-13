const express = require("express")
const router = express.Router()

const boardRouter = require("../boards/board.route")
// const userRouter = require("")

router.use("/boards", boardRouter)
// router.use("/users", userRouter)

module.exports = router