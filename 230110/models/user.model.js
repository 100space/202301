//테이블의 스키마를 객체로 만든다.
//Class 로 모델을 만드는 방법과  // 정적메서드
//Function으로 만드는 방법이 있다.  // 

module.exports = (sequelize, DataTypes) =>{
    //1. 객체 속성이름 model -> object
    //2. Table field정보
    return sequelize.define(
        'User',
        {
            userid:{
                type: DataTypes.STRING(30),
                allowNull : false,
                unique : true,
            },
            userpw:{
                type: DataTypes.STRING(64),
                allowNull : false,
            },
            username:{
                type: DataTypes.STRING(30), 
                allowNull : false,
            },
            gender:{
                type: DataTypes.STRING(2),
                defaultValue : "여자",
            },
        },
        {
            freezeTableName : true,
            // timestamps:false,
        }
    )
}