module.exports = (sequelize, DataTypes) => {
    // (인자값 - 객체 속성명 :테이블 명이 아니다..models:{} 안에 들어가는 내용, 
        //  필드 속성명 : {} , 
        //  테이블의 정보 )
    return sequelize.define(
        "User",
        {
            //테이블의 내용을 객체로 표현했다...
            userid:{
                type : DataTypes.STRINT(30),
                allowNull:false,
                unique:true,
            },
            userpw:{
                type: DataTypes.STRINT(64),
                allowNull:false,
            },
            username:{
                type: DataTypes.STRINT(30),
                allowNull:false,
                
            },
            gender : {
                type: DataTypes.STRINT(2),
                defaultValue:"여자"
            },
        },
        {
            // freezeTableName:true,
            timestamps:false
        }
    )
}