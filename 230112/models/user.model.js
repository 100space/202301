//class로 구현

module.exports = (sequelize, Sequelize) =>{
    class User extends Sequelize.Model{
        static initialize(){
            return this.init(
                {
                    userid : {
                        type:Sequelize.STRING(30),
                        primarykey : true
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
    }

    User.initialize()
    return User
}