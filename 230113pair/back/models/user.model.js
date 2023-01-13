module.exports = (sequelize, Sequelize) =>{
    class User extends Sequelize.Model{
        static createTable(){
            return this.init(
                {
                    userid:{
                        type:Sequelize.STRING(20),
                        primaryKey : true,
                    },
                    userpw:{
                        type:Sequelize.STRING(64), //글자수
                        allowNull:false
                    },
                    username:{
                        type:Sequelize.STRING(20),
                        allowNull:false
                    }
                },{
                    sequelize,
                    timestamps:false,
                }
            )
        }
    }
    User.createTable()
    return User
}
