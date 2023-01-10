class CommentController {
    constructor({commnetService}){
        this.commnetService = commnetService
    }
    
    async getList(req, res, next){
        try{
            const comments = await this.commnetService.list()
            res.json(comments)
        }catch(e){
            next(e)
        }
    }
}

module.exports = CommentController