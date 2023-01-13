// 보드랑 모아둔것..

module.exports = (sequelize, Sequelize) =>{
    class Hashtag extends Sequelize.Model{
        static createTable(){
            return this.init(
                {
                    boardid:{
                        type:Sequelize.INTEGER,
                        allowNull:false
                        // autoIncrement:true, 
                    },
                    tagid:{
                        type:Sequelize.INTEGER,
                        allowNull:false
                    },
                },{
                    sequelize,
                    timestamps:false,
                }
            )
        }
    }
    Hashtag.createTable()
    return Hashtag
}
