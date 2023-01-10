const {
    sequelize:{
        models:{User}
    },
} = require("../models")

const userRepository = require("./user.repository")


const repository = new userRepository({User})
// repository.addUser({userid: "123", userpw:"123123", username:"12313"})

repository.getUserByUserId({userid:"123"}).then((data)=>{
    console.log(data)
})
