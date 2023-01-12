module.exports = (sequelize, Sequelize) =>{
    class Board extends Sequelize.Model{
        static initialize(){
            return this.init({
                subject:{
                    type:Sequelize.STRING(100),
                    allowNull:false,
                },
                content:{
                    type:Sequelize.TEXT,
                    allowNull:false,
                },
                registerDate:{
                    type:Sequelize.DATE,
                    allowNull:false,
                    defaultValue:Sequelize.fn("now"),
                },
                hit:{
                    type: Sequelize.INTEGER,
                    defaultValue:0,
                },
                userid:{
                    type:Sequelize.STRING(100),
                    allowNull:true,
                }
                },{
                    sequelize,
                }
            )
        }
        static associate(models){ // 서로가 서로를 바라볼수 있게 잘 설정하자...
            this.belongsTo(models.User,{
                foreignKey:"userid",
            })
        }

    }
    Board.initialize()
    return Board
}