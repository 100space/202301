module.exports = (sequelize, Sequelize) =>{
    class Board extends Sequelize.Model{
        static createTable(){
            return this.init(
                {
                    boardid:{
                        type:Sequelize.INTEGER,
                        primaryKey:true,
                        autoIncrement:true, 
                    },
                    userid:{
                        type:Sequelize.STRING(20),
                        allowNull:false
                    },
                    content:{
                        type:Sequelize.TEXT(),
                        allowNull:false
                    },
                    subject:{
                        type:Sequelize.STRING(60),
                        allowNull:false
                    },
                    hit:{
                        type:Sequelize.INTEGER,
                        defaultValue:0
                    },
                    // register:{
                    //     type:Sequelize.DATE,
                    //     allowNull:false,
                    //     defaultValue : Sequelize.fn("now"),
                    // }
                },{
                    sequelize,
                }
            )
        }
    }
    Board.createTable()
    return Board
}
