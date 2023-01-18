// const sum = (a, b) => a+b
// const obj = {
//     userid : "web7722",
//     userpw : "1234",
// }
// describe('JWT class 테스트',()=>{
//     it('메서드 명을 적으시오', ()=>{
//         console.log("heeeeelllllloooooollloooo")
//     })
//     it('encode', ()=>{
//         console.log("heeeeelllllloooooollloooo")
//     })
//     it('2+2=4이다.', ()=>{
//         const result = sum(2,2)
//         expect(result).toBe(4)
//     })
//     it('객체 테스트', ()=>{
//         //볃교
//         //ㄸ벼미
//         expect(obj).toEqual({
//             userid:"web7722",
//         })
//     })
// })
// ====================================================


const JWT = require("./jwt")
const crypto = require("crypto")
describe("lib/JWT.js",()=>{
    let jwt
    it("constructor", () =>{
        expect(typeof JWT).toBe("function")//class
        jwt = new JWT({crypto}) //{}
        expect (typeof jwt.crypto).toBe("object")
    })
    it('encode', () =>{
        expect (typeof jwt.encode).toBe("function")
        const value = {foo:"bar"}
        const base64 = jwt.encode(value)
        expect(base64).toBe("eyJmb28iOiJiYXIifQ")
    })
})