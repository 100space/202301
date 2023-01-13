class BoardController{
        constructor({boardService}){
        this.boardService=boardService
    }
    async getList(req, res, next){
        try{
            const response = await this.boardService.getList()
            res.json(response) //[{},{},...]
        }catch(e){
            next(e)            
        }
    }
    async getView (req, res, next){
        try{
            const response = await this.boardService.getView(req.params.id)
            res.json(response)
        }catch(e){
            next(e) 
        }
    }
    async postWrite (req,res,next){
        try{
            if(!req.body.userid) throw new Error("작성자 없음")
            if(!req.body.subject) throw new Error("제목 없음")
            if(!req.body.content) throw new Error("내용 없음")
            const response = await this.boardService.postWrite(req.body)
            res.json(response)
        }catch(e){
            next(e)
        }
    }
    
    async putBoard (req, res, next){
        try{
            const response = await this.boardService.putBoard(req.params.id, req.body.subject, req.body.content)
            if(!req.body.subject) throw new Error("제목없음") 
            if(!req.body.content) throw new Error("내용없음") 
            res.json(response)
        }catch(e){
            next(e)
    
        }
    }
    async deleteBoard (req, res, next){
        try{
            const response = await this.boardService.deleteBoard(req.params.id)
            res.json(response)
        }catch(e){
           next(e) 
        }
    } 
    
    async postComment (req,res,next){
        try{
            if(!req.body.userid) throw new Error("작성자 없음")
            if(!req.body.content) throw new Error("내용 없음")
            const response = await this.boardService.postComment(req.params.id, req.body.content, req.body.userid)
            res.json(response)
        }catch(e){
            next(e)
        }
    }
    
    async putComment (req, res, next){
        try{
            const response = await this.boardService.putComment(req.params.idx, req.body.content)
            if(!req.body.content) throw new Error("내용없음") 
            res.json(response)
        }catch(e){
            next(e)
    
        }
    }
    async deleteComment (req, res, next){
        try{
            const response = await this.boardService.deleteComment(req.params.idx)
            res.json(response)
        }catch(e){
           next(e) 
        }
    }

    async postLike (req,res,next){
        try{
            if(!req.body.userid) throw new Error("작성자 없음")
            const response = await this.boardService.postLike(req.params.id, req.body.userid)
            res.json(response)
        }catch(e){
            next(e)
        }
    }
    async deleteLike (req, res, next){
        try{
            const response = await this.boardService.deleteLike(req.params.idx)
            res.json(response)
        }catch(e){
           next(e) 
        }
    }
    async postHash (req, res, next){
        try{
            const response = await this.boardService.postHash(req.body.tagname)
            res.json(response)
        }catch(e){
            next(e)
        }
    }

}

module.exports = BoardController