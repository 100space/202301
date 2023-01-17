const crypto = require("crypto")

//base 64진수 이기 때문에 16진수로 되어 있으면 변환하기 쉬워진다.
const str = 'Hello world'

const buf = Buffer.from(str)
console.log(buf) //<Buffer 48 65 6c 6c 6f 20 77 6f 72 6c 64>
console.log(buf.toString("hex")) //16진수string : 48656c6c6f20776f726c64
console.log(buf.toString("base64")) //64진수string : SGVsbG8gd29ybGQ=
// 1byte = 8bit

// base64 : 6bit씩 나눠서 사용한다

// 32bit / 6bit 나머지가 생긴다.

const header = {
    alg:"HS256",
    typ:"JWT",
}

const headerString = JSON.stringify(header)
console.log(headerString)

const buf2 = Buffer.from(headerString).toString("base64")
// console.log(buf2) // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9

//base64를 객체로 만들 줄 알아야한다.

const json = Buffer.from("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", "base64").toString("utf-8")
// console.log(json) // {"alg":"HS256","typ":"JWT"}



//암호화 -> 단방향 -> SHA 32 byte -> 64 Nible -> 64글자
//1byte -> 8bit -> 2Nible
const salt = process.env.SALT || "web7722"
const hash = crypto.createHmac("sha256", salt).update(buf2).digest("hex") //정적메서드...
console.log(hash)
console.log(hash.length)

//평문이 있으면 hash  

const hashBuf = Buffer.from("hash").toString("base64")
console.log(hashBuf)