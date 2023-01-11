class CommentController{
    constructor({commentService}){
    this.commentService = commentService
    }
    async getList (req, res, next){
        try{
            const comment = await this.commentService.list()
            res.json(comment)
        }catch(e){
            next()
        }
    }
}