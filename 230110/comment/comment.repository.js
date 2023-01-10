// module.exports = (mysql) =>{
//     return {
//         findAll :async() => {
//             const result = await mysql.query("select * from Comment")
//             return result
//         }
//     }
// }

/** 클래스로 만들기 */


class CommentRepository{
    constructor({mysql}){
        this.mysql = mysql
    }
    async findAll(){
        try{
            const [list] = await this.mysql.query("select * from comment")
            return list
        }catch(e){
            throw new Error(e)
        }
    }
    view(){

    }
    update(){

    }
    create(){}

}
module.exports = CommentRepository