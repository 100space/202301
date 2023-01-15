class BoardRepository{
        constructor({Board, Comment, Likes, Hash, Hashtag, sequelize}){
        this.Board=Board,
        this.Comment=Comment,
        this.Likes=Likes,
        this.Hash=Hash,
        this.Hashtag = Hashtag,
        this.sequelize = sequelize
    }
    async findAll(){
        try{
            const query = `SELECT 
            A.boardid,
            A.userid, 
            B.username, 
            A.subject, 
            A.createdAt, 
            A.hit, 
            (SELECT COUNT(boardid) FROM Comments WHERE boardid = A.boardid) AS commentCount, 
            (SELECT COUNT(boardid) FROM Likes WHERE boardid = A.boardid) AS likeCount 
            FROM Boards AS A 
            JOIN Users AS B 
            ON A.userid = B.userid 
            ORDER BY A.boardid DESC;`
            const [findAll] = await this.sequelize.query(query);
            return findAll
        }catch(e){
            throw new Error(e)
        }
    }

    async findOne (id) {
        try{
            const boardQuery = `SELECT * FROM Board WHERE boardid=${id}`
            const commentQuery = `SELECT * FROM Comment WHERE boardid=${id}`
            const likeQuery = `SELECT boardid FROM Likes WHERE boardid=${id}`
            
            const [board] = await this.sequelize.query(boardQuery)
            const [comment] = await this.sequelize.query(commentQuery)
            const [like] = await this.sequelize.query(likeQuery)

            return {board: board, comment:comment , like:like }
        }catch(e){
            throw new Error(e)            
        }
    }
    async create(write) {
        try{
            const create = await this.Board.create(write)
            return create
        }catch(e){
            throw new Error(e)
        }
    }

    async putBoard({subject, content, id}){
        try{
            const put = await this.Board.update(
                {
                    subject:subject,
                    content:content
                },
                {
                    where:{ boardid:id}
                })
                return put
        }catch(e){
            throw new Error(e)
        }
    }
    async deleteBoard(id){
        try{
            const deleteBoard = await this.Board.destroy(
                {
                    where:{boardid:id}
                }
            )
            return deleteBoard
        }catch(e){
            throw new Error(e)
        }
    }

    async postComment(write) {
        try{
            console.log(write,"lksjdfslk")
            const create = await this.Comment.create(write)
            console.log(create,"create")
            return create
        }catch(e){
            throw new Error(e)
        }
    }

    async putComment({content, id}){
        try{
            const put = await this.Comment.update(
                {
                    content:content
                },
                {
                    where:{ commentid:id}
                })
                return put
        }catch(e){
            throw new Error(e)
        }
    }
    async deleteComment(id){
        try{
            const deleteComment = await this.Comment.destroy(
                {
                    where:{commentid:id}
                }
            )
            return deleteComment
        }catch(e){
            throw new Error(e)
        }
    }

    async postLike(add) {
        try{
            const create = await this.Likes.create(add)
            return create
        }catch(e){
            throw new Error(e)
        }
    }
    async deleteLike(id){
        try{
            const deleteLike = await this.Likes.destroy(
                {
                    where:{commentid:id}
                }
            )
            return deleteLike
        }catch(e){
            throw new Error(e)
        }
    }
    async postHash(tagname){
        try{
            const [findHash] = await this.Hash.findAll(
                {
                    where:{tagname:tagname}
                }
            )
            if (findHash === undefined) {
                await this.Hash.create({tagname:tagname})
            }else{
                return findHash
            }
        }catch(e){
            throw new Error(e)
        }
    }

    async hashtag () {
        try{
            const hashtag = `SELECT boardid FROM Board UNION ALL SELECT tagid FROM hash
            `
            const [hashTag] = await this.sequelize.query(hashtag)
            
            console.log(hashTag)
        }catch(e){
            throw new Error(e)            
        }
    }


    // async HashTag(tagname, boardid){
    //     try{
    //         const query = `SELECT
    //         A.boardid,
    //         E.tagid
            
    //         COUNT(C.boardid) AS commentCount,
    //         COUNT(D.boardid) AS likeCount
    //         FROM Board AS A
    //         LEFT JOIN Hash AS E
    //         ON A.boardid = E.tagid
    //         LEFT JOIN Likes AS D
    //         ON A.boardid = D.boardid
    //         GROUP BY A.boardid
    //         ORDER BY A.boardid DESC;
    //         `
    //         const [findAll] = await this.sequelize.query(query);
    //         return findAll

    //         const boardQuery = `SELECT boardid FROM Board `

    //     }catch(e){
    //         throw new Error(e)
    //     }
    // }
}
module.exports = BoardRepository