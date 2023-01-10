// module.exports = (repository) => {
//     return {
//         list:async()=>{
//             const list = await repository.findAll()
//             return list
//         }
//     }
// }

//===============================================================


class CommentService {
    constructor({ commentRepository,config}){
        this.commentRepository = commentRepository
        this.config = config
        this.HttpException = config.exception.HttpException
    }

    async list (){
        try{
            const list = await this.commentRepository.findAll()
            if(list.length === 0 ) throw new this.HttpException("내용이 없음")
            console.log(list,"servie")
            return list
        }catch(e) {
            throw new this.HttpException
        }
    }
}
module.exports = CommentService