const express = require("express")
const router = express.Router()
const {controller} = require("./comment.module")

// controller.getList 로 못 쓴다.. 실행을 라우터에서 하면서 기존의 컨트롤러의 this 가 바뀌기 때문에... 함수로 감싸서 클로저로 사용한다.
//클로저 고차함수
// this가 왜 바뀌는가??
router.get('/', (req, res, next)=> controller.getList(req,res,next))
// router.get('/', controller.getList())

// function () {
//     //함수
//     return function (){
//         this.
//     }
// }


//addEventListener ( "", ()=>{}) 와 방식이 비슷하다....

module.exports = router
