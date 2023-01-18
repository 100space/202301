# 내장 모듈 Crypto

Node.js의 내장 모듈이기 때문에 require 해서 사용해야한다.

```js
const crypto = require("crypto")

const salt = process.env.SALT || "web7722"
const hash = crypto.createHmac(`sha256`, salt).update(평문).digest("hex") // createHmac은 `정적메서드`다.
```

JWT에서 Signature을 만드는 목적이 headerd와 payload가 위조, 변조 되었는지 확인하기 위해서인데, salt값이 없으면 sha256을 이용하여 다 똑같은 암호 값을 가지게 된다..
그래서 salt 값을 넣어서 암호화를 진행한다. 복호화를 했을 때 똑같은 값을 얻기 위해서는 반드시 salt를 이용하여 암호화를 해야한다. 그리고 이 salt 값을 이용해서 복호화를 할 수 있기 때문에 절대로 공유되거나 노출 되지 않도록 조심해야한다.
update에는 인자값으로 암호화를 할 평문의 내용을 적는다.
digest는 결과를 어떤 인코딩으로 나타낼 것인지를 쓰면 된다.

-   hex를 이용해서 16진수로 인코딩을 하면 평문의 글자가 몇글자든 64글자로 나온다.

## JWT - Signature

평문 -> hash -> base64 로 인코딩을 한 것이다. 그래서 base64를 아무리 디코딩을 하더라도 salt가 없는 없다면 hash값 밖에 못 얻기 때문에 보안에 좋다

## JWT - 토큰 만들기

내장 모듈 crypto를 이용한 토큰 만들기

```js
const crypto = require("crypto")

const header = {
    alg: "HS256",
    typ: "JWT",
}
const payload = {
    sub: "1234567890",
    userid: "admin",
    username: "admin",
    iat: 1516239022,
}

function encode(obj) {
    return Buffer.from(JSON.stringify(obj)).toString("base64url")
}

const header64 = encode(header)
const payload64 = encode(payload)
console.log(header64, payload64)

const 평문 = header64 + "." + payload64
console.log(평문)

const signature = crypto
    .createHmac("sha256", "web7722")
    .update(평문)
    .digest("base64url")
console.log(signature)
```

> 만약 이 토큰을 탈취해서 접근을 시도하면 접근이 가능한가?

-   접근이 가능하다. 그래서 여러가지 방법을 이용해서 최대한 보안에 신경을 쓴다.
    예를들면 엑세스 토큰과 리프레시 토큰을 이용한 방법이다
    이 방법은 유효시간을 짧은 엑세스 토큰과 비교적 긴 리프레시 토큰을 설정하여 엑세스 토큰의 시간동안 작업을 하다가 시간이 만료되면 새로 발급을 받아야하는데 그 새로 발급을 받을 수 있는 시간은 리프레시 토큰의 기간동안 가능하다.

    리프레시 토큰의 기간도 만료가 되면 재로그인을 요청하여 위의 과정을 반복하는 방법이 있다.
    토큰의 만료시간을 짧게두어 탈취가 되더라도 그 시간에만 사용가능하게 하는 방법이다.

# JWT - 검증방법

token을 뜯어보면 .(점)을 기준으로 header, payload, signature로 이루어져 있다.
여기서 header와 payload를 가져와서 다시 hash를 진행한다.
그리고 나온 값을 새로운 hash라고 했을 때, 기존의 hash와 비교를 해서 같으면 이 토큰은 사용가능한 토큰이 된다.

```js
verify(token, salt){
        const [header, payload, signature] = token.split('.')
        const newSignature = this.createSignature([header, payload], salt)
        if(newSignature !== signature) {
            throw new Error("토큰이 다릅니다.")
        }
        return this.decode(payload)
    }

const payload = jwt.verify(token, salt)

```
