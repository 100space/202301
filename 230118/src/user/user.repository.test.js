const UserRepository = require("./user.repository")

describe("UserRepository", () =>{
    let User, repository
    beforeEach(()=>{
        // sequelize > models> User
        User = { 
            create : jest.fn().mockResolvedValue({}),//리턴값이 promise
        }  
        repository = new UserRepository({User})//UserReposotory: {User:{}}
        console.log(repository)
    })
    //class를 테스트
    it("UserRepository를 잘 가져오는가?", () =>{
        expect(typeof UserRepository).toBe("function")
    })


    //class 안에 메서드를 테스트
    describe("addUser", () =>{
        let payload = {
            userid : "web7722",
            userpw : "123123",
            username : "baek"

        }
        it('[try] addUser메서드 확인',async()=>{
            const user = await repository.addUser(payload)
            expect(User.create).toHaveBeenCalledWith(payload, {raw:true})
            expect(user).toEqual({})
        })
        it('[catch] create method가 reject가 발생되었을 때 ', async()=>{
            User.create = jest.fn().mockRejectedValue({})
            await expect( async() => await repository.addUser(payload)).rejects.toThrow()
        })
    })
})