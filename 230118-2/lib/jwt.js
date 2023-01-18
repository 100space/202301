const crypto = require("crypto")
//MVC - Service 에서 처리해야할 코드들이다...

class JWT{
    constructor({crypto}){
        this.crypto=crypto
    }
    sign(data, options={}){
        const header = this.encode({typ:"JMT", alg:"HS256"})
        const payload = this.encode({...data, ...options})
        const signature = this.createSignature([header, payload])

        return [header,payload,signature].join(".")
    }
    verify(token, salt){
        const [header, payload, signature] = token.split('.')
        const newSignature = this.createSignature([header, payload], salt)
        if(newSignature !== signature) {
            throw new Error("토큰이 다릅니다.")
        }
        return this.decode(payload)
    }
    encode(obj){
        return Buffer.from(JSON.stringify(obj)).toString("base64url") //base64
    }
    decode(base64url){
        return JSON.parse(Buffer.from(base64url, "base64url").toString("utf-8"))
    }
    createSignature (base64url, salt="web7722"){
        const data = base64url.join(".")
        return this.crypto.createHmac("sha256", salt).update(data).digest("base64url")
    }
}
const jwt = new JWT({crypto})

const token = jwt.sign({userid:"web7722", username:"baek"})

console.log(token) 
//eyJ0eXAiOiJKTVQiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOiJ3ZWI3NzIyIiwidXNlcm5hbWUiOiJiYWVrIn0.jhQDnAM4rrsPKDmvFi2BqiOKrGT7SClWebDuVnjTdgY
const payload = jwt.verify("eyJ0eXAiOiJKTVQiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOiJ3ZWI3NzIyIiwidXNlcm5hbWUiOiJiYWVrIn0.jhQDnAM4rrsPKDmvFi2BqiOKrGT7SClWebDuVnjTdgY","web7722")
console.log(payload)