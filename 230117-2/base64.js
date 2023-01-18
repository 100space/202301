const crypto = require("crypto")
const str = "Hello World"

const buf = Buffer.from(str)

// console.log(buf)//<Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64>
// console.log(buf.toString('hex'))//16진수  48656c6c6f20576f726c64
// console.log(buf.toString("base64")) // 64진수 SGVsbG8gV29ybGQ=

//원래 1byte는 8bit로써 32bit같은 경우 4byte로 쓸 수 있는데.. base64로 변환을 하게되면
// base 64는 6bit로 나누어서 사용해서 나머지가 2또는 4가 나온다. 그래서 뒤에 =이 나오게 된다. 만약 나머지가 없게 되면 안나오기도 한다.
// 이 '='은 실제로 데이터로 쓰는 것이 아닌 나머지 빈자리를 채우는 용도로 하기 때문에 무시하고 쓰면 된다...의미가 없다

const header = {
    "alg": "HS256",
    "typ": "JWT"
}

// encode

const headerString = JSON.stringify(header)
// console.log(headerString) //{"alg":"HS256","typ":"JWT"}
const buf2 = Buffer.from(headerString).toString("base64")
// console.log(buf2) //  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 
//JWT 공식 사이트 // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 위에 직접 구현한 것과 값이 같다



// decode

const json = Buffer.from("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",'base64').toString("utf-8") //from() 인자값1에 데이터를 넣고, 인자값 2에 사용한 해당값이 어떤 인코딩 값인지 적어준다. 
// console.log(json) // {"alg":"HS256","typ":"JWT"} 다시 원래 상태로 돌려준다


//암호화 -> 단방향 -> SHA 32byte
// 1byte == 8bit == 2Nible


console.log(crypto.createHmac)