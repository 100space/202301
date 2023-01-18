## 인코딩이란?

인코딩은 어떤 정보나 데이터를 다른 형태,형식으로 변환하는 과정을 말한다. 인코딩을 하면데이터를 표준화하거나 데이터의 처리속도를 향상시킬 수 있고 저장공간을 절약할 수 있는 장점이 있다. 우리가 눈으로 확인할 수 있는 동영상이나 사진들도 인코딩해서 데이터를 주고 받는다. 인코딩의 반대말은 디코딩이다.

## 디코딩이란?

디코딩은 인코딩과 반대되는 개념으로 전달받은 숫자 또는 문자로 된 데이터들을 사용자가 문자나, 실제 동영상으로 볼 수 있게 해석하는 역할을 말한다.

인코딩이 암호화라고 한나면 디코딩은 복호화, 역코드화 라고 할 수 있다.

# Base64

Base64는 쉽게 말하면 64진법이라는 의미를 가지고 있다.
base64 인코딩이라는 말로 많이 쓰인다.

## base64로 인코딩하는 과정

1. 원본문자열을 받는다
2. ASC II binary
3. 6비트로 나눈다.
4. base64 인코딩

## base64 인코딩해보기

```js
const str = "Hello World"
const buf = Buffer.from(str)

console.log(buf) //<Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64>

console.log(buf.toString("hex")) //16진수  48656c6c6f20576f726c64

console.log(buf.toString("base64")) // 64진수 SGVsbG8gV29ybGQ=
```

원래 1byte는 8bit로써 32bit같은 경우 4byte로 쓸 수 있는데.. base64로 변환을 하게되면 bas64는 6bit로 나누어서 사용한다. 6으로 나누게 되면 나머지가 발생하게 되는데, 이 과정에서 빈 자리를 채우는 용도로 '='기호를 사용하여 빈자리를 채워서 출력하여준다. 그러므로 '='기호는 의미를 가지고 있는 기호가 아니다.

# JWT

```js
const header = {
    alg: "HS256",
    typ: "JWT",
}
```

## encode 과정

```js
const headerString = JSON.stringify(header)
console.log(headerString) //{"alg":"HS256","typ":"JWT"}
const buf2 = Buffer.from(headerString).toString("base64")
console.log(buf2) //  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

JWT 공식사이트에 Encoded의 header부분과 일치한다.

## decode 과정

```js
const json = Buffer.from(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    "base64"
).toString("utf-8")
console.log(json) // {"alg":"HS256","typ":"JWT"}
```

from() 인자값1에 데이터를 넣고, 인자값 2에 사용한 해당값이 어떤 인코딩 값인지 적어준다.

# 내장 모듈 Crypto

Node.js의 내장 모듈이기 때문에 require 해서 사용해야한다.

```js
const crypto = require("crypto")

crypto.createHmac(`sha256`, salt) // createHmac은 `정적메서드`다.
```

JWT에서 Signature을 만드는 목적이 headerd와 payload가 위조, 변조 되었는지 확인하기 위해서인데, salt값이 없으면 sha256을 이용하여 다 똑같은 암호 값을 가지게 된다..
그래서 salt 값을 넣어서 암호화를 진행한다. 복호화를 했을 때 똑같은 값을 얻기 위해서는 반드시 salt를 이용하여 암호화를 해야한다.
