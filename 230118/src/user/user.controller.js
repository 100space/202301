class UserController{
    constructor({userService}) {
        this.userService = userService
    }

    async postSignup(req, res, next ){
        try{
            const { userid, userpw, username } = req.body
            const user = await this.userService.signup({userid, userpw, username})
            res.status(201).json(user)
        }catch(e){
            next(e)
        }
    }
    async getMe(req, res, next){
        try{
            if(!req.headers.authorization) throw new Error("Authorzation 없음!")
            const [type, token] = req.headers.authorization.split(' ')
            if(type.toLowerCase() !== "bearer") throw new Error("Authorization type Error")
            
            const user = await this. userService.me(token)
            res.json(user)
        }catch(e){
            next(e)
        }
    }
}
module.exports = UserController