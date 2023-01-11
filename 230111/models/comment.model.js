//모델 만들기 - class 방식

//주입을 받아서 쓰고 싶다.
module.exports = (sequelize, Sequelize) => {
    class Comment extends Sequelize.Model{
        static initialize(){
            return this.init(
                {
                    userid:{
                        type:Sequelize.STRING(30),
                        allowNull : false
                    //똑같은 사용자의 댓글이 많이 있을 수 있기 때문에 unique가 없어야한다.
                    },
                    content : {
                        type:Sequelize.TEXT(),
                        allowNull:false
                    }
                },
                {
                    sequelize: sequelize,
                    freezeTableName : true,
                }
            )
        }
    }
    return Comment.initialize() //defind
    //return
}

// const Sequelize = require("sequelize")

// class Comment extends Sequelize.Model{
//     static initialize(sequelize, DataTypes){
//         this.init(
//             {
//                 userid:{
//                     type:Sequelize.STRING(30),
//                     allowNull : false
//                     //똑같은 사용자의 댓글이 많이 있을 수 있기 때문에 unique가 없어야한다.
//                 },
//                 content : {
//                     type:Sequelize.TEXT(),
//                     allowNull:false
            
//                 }
//             },
//             {
//                 sequelize:sequelize,
//                 freezeTableName : true,
//             }
//         )
//         console.log(sequelize, DataTypes)
//     }
// }
// //1. field, 2. table + sequelize
// // Comment.init({
// //     userid:{
// //         type:Sequelize.STRING(30),
// //         allowNull : false
// //         //똑같은 사용자의 댓글이 많이 있을 수 있기 때문에 unique가 없어야한다.
// //     },
// //     content : {
// //         type:Sequelize.TEXT(),
// //         allowNull:false

// //     }
// //     },{
// //         sequelize:sequelize,
// //         freezeTableName : true,
// //     }
// //     )

// module.exports = Comment