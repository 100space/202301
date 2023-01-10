class userRepository {
    constructor({User}){
        this.User = User
    }

    async addUser(payload) {
        try{
            const user = await this.User.create(payload) //SQL insert문
            return null
        }catch(e){
            throw new Error(e)
        }
    }

    async getUserByUserId({userid}){
        //select * from user  // findOne
        //where userid="web7722"
        const user = await this.User.findOne({
            where:{
                userid:userid,
            }
        })
        console.dir(user)
        return user.dataValues;
    }
}

module.exports = userRepository


