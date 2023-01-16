//기본적으로 내보내는 것은 함수 이다.
// sequelize.difine('User', {}, {})
module.exports = (sequelize, Sequelize) =>{
    //class 선언
    class User extends Sequelize.Model{
        static initialize(){
            //여기서 this는 Model을 바라봄...
            return this.init(
                {
                    userid:{
                        type:Sequelize.STRING(60),
                        primaryKey:true,
                    },
                    userpw:{
                        type:Sequelize.STRING(64),
                        allowNull:false

                    },
                    username:{
                        type:Sequelize.STRING(30),
                        allowNull:false
                    },
                    provider:{
                        //api로그인 유저인지, local인지만 확인하는 테이블
                        type:Sequelize.ENUM('local','kakao'), //많이 쓰임
                        allowNull :false,
                        defaultValue:"local",
                    },
                    snsId:{
                        type:Sequelize.STRING(30),
                        allowNull:true,
                    }
                }
                ,{
                sequelize
                }
            )
        }
        static associate(models){
            //관계형을 맺을 때 사용하는 정적메서드
            //this는 user인데 user가 model 상속받아서 model의 메서드도 쓸 수 있다.
            this.hasMany(models.Board, {
                foreignKey:"userid"
            })
            this.hasMany(models.Comment, {
                foreignKey:"userid"
            })
            //N:M관계를 맺을 때 사용...
            this.belongsToMany(models.Board, {
                //중간다리 역할의 테이블을 적어준다.
                through : "Liked",
                foreignKey:"userid"
            })
        }
    }
    //class 사용
    User.initialize()
    return User // 우린 User을 사용하는 코드가 없기 때문에 없어도 된다.
}