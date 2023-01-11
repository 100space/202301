// 모델생성하는 방법 : define 함수로 만들기

module.exports = (sequelize, DataTypes) => {
    // (인자값 - 객체 속성명 :테이블 명이 아니다..models:{} 안에 들어가는 내용, 
        //  필드 속성명 : {} , 
        //  테이블의 정보 )
    return sequelize.define(
        "User", // 모델이름
        {
            //테이블의 내용을 객체로 표현했다...
            userid:{
                type : DataTypes.STRING(30),
                allowNull:false,
                unique:true,
            },
            userpw:{
                type: DataTypes.STRING(64),
                allowNull:false,
            },
            username:{
                type: DataTypes.STRING(30),
                allowNull:false,
                
            },
            gender : {
                type: DataTypes.STRING(2),
                defaultValue:"여자"
            },
        },
        {
            freezeTableName:true, // 모델이름과 테이블명이랑 똑같이 해준다.
            // tableName : "asdf",  // 테이블 이름
            timestamps:false,
            charset:"utf8mb4",  //이모지가 있고 없고  ... mb4 여부
            callate:"utf8mb4_general_ci", 
        }
    )
}