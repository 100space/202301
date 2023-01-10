class userService {
    constructor({userRepository}){
        this.userRepository = userRepository
    }
    async signup({userid, userpw, username}){
        try{
            const user = await this.userRepository.addUser({userid, userpw, username})
            return user
        }catch(e){
            throw new Error(e)
        }
    }
}
module.exports = userService