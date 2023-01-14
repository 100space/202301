// CREATE TABLE `user` (
//     userid VARCHAR(30) PRIMARY KEY,
//     userpw VARCHAR(64) NOT NULL,
//     username VARCHAR(20)NOT NULL
// )

module.exports = (sequelize, Sequelize) =>{
    class User extends Sequelize.Model { 
        static initialize(){
            return this.init({
                userid:{
                    type:Sequelize.STRING(30),
                    primaryKey:true, 
                }, 
                userpw:{
                    type: Sequelize.STRING(64),
                    allowNull: false,
                },
                username:{
                    type: Sequelize.STRING(20),
                    allowNull:false
                },
            },{
                sequelize,
            })
        }
        //fk설정하기
        static associate(models){
            
            //1:다 관계에서 부모인 user는 많이 줄 것이다라는 뜻으로 생각하면 된다.
            //hasMany의 ()안에는 sql에서 REFERENCES User(userid) 부분과 같다
            this.hasMany(models.Board, {
                foreignKey:"userid"
            })
        }
    }
    User.initialize()
    return User
}