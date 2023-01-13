const express = require("express")
const router = express.Router()
const {controller} = require("./board.module")

router.get("/", (req, res, next)=>controller.getList(req,res,next))
router.post("/", (req, res, next)=>controller.postWrite(req, res, next))
router.get("/:id", (req, res, next)=>controller.getView(req, res, next))
router.put("/:id", (req, res, next)=>controller.putBoard(req, res, next))
router.delete("/:id", (req, res, next)=>controller.deleteBoard(req, res, next))

//댓글
router.post("/:id/comments", (req, res, next)=>controller.postComment(req, res, next))
router.put("/:id/comments/:idx", (req, res, next)=>controller.putComment(req, res, next))
router.delete("/:id/comments/:idx", (req, res, next)=>controller.deleteComment(req, res, next))

//좋아요
router.post("/:id/likes", (req, res, next)=>controller.postLike(req, res, next))
router.delete("/:id/likes/:idx", (req, res, next)=>controller.deleteLike(req, res, next))

router.post("/:id/hash", (req, res, next) =>controller.postHash(req,res,next))
router.delete("/:id/hash/:id", (req, res, next) =>controller.deleteHash(req,res,next))

module.exports = router

