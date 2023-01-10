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
    constructor({ commentRepository}){
        this.commentRepository = commentRepository
    }

    async list (){
        try{
            const list = await this.commentRepository.findAll()
            if(list.length === 0 ) throw new Error("내용이 없음")
            return list
        }catch(e) {

        }
    }
}
module.exports = CommentService