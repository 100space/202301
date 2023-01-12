//class로 구현

module.exports = (sequelize, Sequelize) =>{
    class User extends Sequelize.Model{
        static initialize(){
            return this.init(
                {
                    userid : {
                        type:Sequelize.STRING(30),
                        primaryKey : true // 없으면 자동으로 id를 생성한다.
                    },
                    userpw:{
                        type:Sequelize.STRING(64),
                        allowNull:false,

                    },
                    username : {
                        type:Sequelize.STRING(64),
                        allowNull:false,
                    },
                },
                {
                    sequelize,
                }
            )
        }
        static associate(models){
            this.hasMany(models.Board,{
                foreignKey:"userid",
            })
        }
    }

    User.initialize()
    return User
}