module.exports = (sequelize, Sequelize) =>{
    class Likes extends Sequelize.Model{
        static createTable(){
            return this.init(
                {
                    likeid:{
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
                },{
                    sequelize,
                    timestamps:false,
                }
            )
        }
    }
    Likes.createTable()
    return Likes
}
