// class를 이용한 모델 생성

module.exports = (sequelize, Sequelize) =>{
    class Comment extends Sequelize.Model{
        static initialize(){
            return this.init(
                {
                    userid:{
                        type:Sequelize.STRING(30),
                        allowNUll: false
                    },
                    content:{
                        type:Sequelize.TEXT(),
                        allowNUll:false,
                    },
                },
                {
                    sequelize: sequelize,
                    freezeTableName: true,
                }
            )
        }
    }
    return Comment.initialize()
}