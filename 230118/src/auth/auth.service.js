class Auth{
        constructor({authRepository, jwt}){
        this.authRepository=authRepository
        this.jwt = jwt
        this.crypto = jwt.crypto
    }

    // hash 단방향이기 때문에 기존에 해시값과 입력된 해시값을 비교해야한다. (평문으로 비교하는 것이 아니다..)
    //repository uesr가 존재하는지 확인하고 return token
    async token({userid, userpw}){
        try{
            if(!userid || !userpw) throw "회원정보를 찾을 수 없음"
            // const hash = this.crypto.createHmac("sha256", "web7722").update(userpw).digest("hex")
            // console.log(hash , "cont")
            const user = await this.authRepository.getUserByInfo({userid,userpw})
            //user가 존재하는지 안하는지 확인하고
            //존재하면 token 생성

            if(!user) throw "아이디와 패스워드가 일치하지 않습니다."
            const token = this.jwt.sign(user)
            return token
        }catch(e){
            throw new Error(e)           
        }
    }
}

module.exports = Auth