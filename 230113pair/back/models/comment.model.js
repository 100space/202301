module.exports = (sequelize, Sequelize) =>{
    class Comment extends Sequelize.Model{
        static createTable(){
            return this.init(
                {
                    commentid:{
                        type:Sequelize.INTEGER,
                        primaryKey:true,
                        autoIncrement:true, 
                    },
                    boardid:{
                        type:Sequelize.INTEGER,
                        allowNull:false
                    },
                    userid:{
                        type:Sequelize.STRING(20),
                        allowNull:false
                    },
                    content:{
                        type:Sequelize.TEXT(),
                        allowNull:false
                    }
                },{
                    sequelize,
                }
            )
        }
    }
    Comment.createTable()
    return Comment
}
