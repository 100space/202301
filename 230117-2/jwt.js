const crypto = require("crypto")

class JWT{
        constructor({crypto}){
        this.crypto=crypto
    }
    sign(data, options = {}){
        const header = this.encode({tpy:"JWT", alg:"HS256"})
        const payload = this.encode({ ...data, ...options})
        const signature = this.createSignature([header, payload])
        
        return [header,payload,signature].join(".")
    }
    encode(obj){
        return Buffer.from(JSON.stringify(obj)).toString("base64url")
    }

    createSignature (base64url, salt='web7722') {
        const data = base64url.join(".")
        return this.crypto.createHmac("sha256", salt).update(data).digest("base64url")
    }
}
const jwt = new JWT({crypto})
const token = jwt.sign({userid:'web7722', username : 'baek'})
console.log(token) 
// eyJ0cHkiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOiJ3ZWI3NzIyIiwidXNlcm5hbWUiOiJiYWVrIn0.6VLmikow5w71Zqzl1hY_UfwD2ew7RYWv8HF_pzgd4xU
// eyJ0cHkiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOiJ3ZWI3NzIyIiwidXNlcm5hbWUiOiJiYWVrIn0.6VLmikow5w71Zqzl1hY_UfwD2ew7RYWv8HF_pzgd4xU

