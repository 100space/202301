
class BoardService{
        constructor({boardRepository}){
        this.boardRepository=boardRepository
    }
    async getList(){
        try{
            const list = await this.boardRepository.findAll()
            console.log(list,'123123')
            if(list.length === 0) throw "내용이 없습니다."
            return list
        }catch(e){
            throw new Error(e)
        }
    }
    async getView (id){
        try{
            console.log(id)
            const view = await this.boardRepository.findOne(id)
            return view
        }catch(e){
            throw new Error(e)
        }
    }
    async postWrite (write){
        try{
            const boardWrite = await this.boardRepository.create(write)
            return boardWrite
        }catch(e){
            throw new Error(e)
        }
    }
    async putBoard (id, subject, content){
        try{
            const putBoard = await this.boardRepository.putBoard({id, subject, content})
            return putBoard
        }catch(e){
            throw new Error(e)
        }
    }
    async deleteBoard(id){
        try{
            const deleteBoard = await this.boardRepository.deleteBoard(id)
            if(deleteBoard < 1) throw "삭제될 데이터 없음."
            return deleteBoard
        }catch(e){
            throw new Error(e)
        }
    }

    async postComment (boardid, content, userid ){
        try{
            const postComment = await this.boardRepository.postComment({boardid, content, userid})
            return postComment
        }catch(e){
            throw new Error(e)
        }
    }
    async putComment(id, content){
        try{
            const putComment = await this.boardRepository.putComment({id, content})
            return putComment
        }catch(e){
            throw new Error(e)
        }
    }
    async deleteComment(id){
        try{
            const deleteComment = await this.boardRepository.deleteComment(id)
            if(deleteComment < 1) throw "삭제될 데이터 없음."
            return deleteComment
        }catch(e){
            throw new Error(e)
        }
    }

    async postLike (boardid, userid ){
        try{
            const postLike = await this.boardRepository.postLike({boardid, userid})
            return postLike
        }catch(e){
            throw new Error(e)
        }
    }
    async deleteLike(id){
        try{
            const deleteLike = await this.boardRepository.deleteLike(id)
            if(deleteLike < 1) throw "삭제될 데이터 없음."
            return deleteLike
        }catch(e){
            throw new Error(e)
        }
    }
    async postHash(tagname){
        try{
            const postHash = await this.boardRepository.postHash(tagname)
            return postHash  
        }catch(e){
            throw new Error(e)
        }
    }
}

module.exports = BoardService