const crypto = require("crypto")

class JWT{
    constructor({crypto}){
        this.crypto = crypto
    }
    
    sign(data, options ={}) {
        const header = this.encode({ typ:"JWT", alg:"HS256"}) //base64url
        const payload = this.encode({...data, ...options})//base64url  // 만료시간, 레벨(등급)
        const signature = this.createSignature([header, payload])

        return `${header}.${payload}.${signature}`
        // return [header, payload, signature].join(".")
    }
    //검증 ... token:string, salt:string
    verify(token, salt){
    // console : eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOiJ3ZWI3NzIyIiwidXNlcm5hbWUiOiJiYWVrIn0.3RSNinighhA1zV06vv2E41HX7NkMPSc67ksqdSMrasU
    // header, payload -> hash 진행
    // 기존 hash
    // 비교 새로운 hash == 기존 hash
        const[header, payload, signature] = token.split(".")
        const newSignature = this.createSignature([header, payload], salt)
        if (newSignature !== signature){
            throw new Error("기존 토큰과 같지 않습니다")
        }
        return this.decode(payload)
    }
    encode(obj){
        return Buffer.from(JSON.stringify(obj)).toString("base64url") // base64
    }
    decode(base64url){
        return JSON.parse(Buffer.from(base64url, 'base64url').toString('utf-8'))// :string -> json형태로 출력.
    }
    createSignature(base64urls, salt='web7722'){
        const data = base64urls.join(".") // header.payload
        return this.crypto.createHmac('sha256', salt).update(data).digest("base64url")
    }
}

const jwt = new JWT({crypto})
const token = jwt.sign({userid:"web7722", username:"baek"}) //JWT
console.log(token)

const payload = jwt.verify("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOiJ3ZWI3NzIyIiwidXNlcm5hbWUiOiJiYWVrIn0.3RSNinighhA1zV06vv2E41HX7NkMPSc67ksqdSMrasU", "web7722")
console.log(payload)
// console : eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOiJ3ZWI3NzIyIiwidXNlcm5hbWUiOiJiYWVrIn0.3RSNinighhA1zV06vv2E41HX7NkMPSc67ksqdSMrasU
// web : eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOiJ3ZWI3NzIyIiwidXNlcm5hbWUiOiJiYWVrIn0.3RSNinighhA1zV06vv2E41HX7NkMPSc67ksqdSMrasU