class CommentService{
    constructor({commentRepository}){
    this.commentRepository=commentRepository
    }
    async list(){
        try{
            const list = await this.commentRepository.findAll()
            if(list.length === 0) throw new Error("내용이없음")
            return list
        }catch(e){
            throw new Error(e)
        }
        
    }
}

module.exports = CommentService