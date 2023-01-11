// define 메소드를 이용한 모델 생성
// define 3가지의 인자 값을 가진다. 1. 모델이름(테이블이름이 아니다.) 2. 테이블의 필드와 속성을 정하는 객체, 3. 테이블의 속성

module.exports = (sequelize, DataTypes) =>{
    return sequelize.define(
        "User",
        {
            userid:{
                type:DataTypes.STRING(30),
                allowNull:false, //null || not null
                unique:true,
            },
            userpw:{
                type: DataTypes.STRING(64),
                allowNull:false
            },
            username:{
                type: DataTypes.STRING(30),
                allowNull:false
            },
            gender:{
                type: DataTypes.STRING(4),
                defaultValue:"여자"
            }
        },
        {
            freezeTableName:true,
            timestamps:false,
            charset : "utf8mb4",
            callate : "utf8mb4_genral_ci"
        }
    )
}