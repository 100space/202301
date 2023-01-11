# 기본 외장 모듈 설치

```sh
npm init -y

npm install express mysql sequelize cors dotenv
```

# 기본 서버 열기

```js
const express = require("express")
const app = express()

app.use(express.json())

app.use((error, req, res, next) => {
    res.send("ERROR")
})

app.listen(PORT, () => {
    console.log("back server open")
})
```

# dotenv를 이용하여 환경변수 정의 하기

config.js와 .env파일을 이용하여 정의한다.

.env는 mysql정보가 담겨 있으므로 .gitignore에 담아 공유되지 않도록 관리한다.
.env에는 띄어쓰기가 들어가지 않도록 잘 써야한다.
config.js는 module을 이용하여 내보내기까지 해야한다.

# 데이터베이스 테이블 설계 (sequelize를 이용한다.)

1. Model directory 생성

    - Index.js : 생성된 모델들을 데이터베이스에 연결하기위해 내보낸 모델들을 모아 놓고, 데이터베이스에 작업을 위해 라이브러리와 모델을 내보낸다.

2. user.model.js 생성 후 내보내기

    - define 메소드를 이용한 모델 생성
    - 3가지의 인자 값을 가진다. 1. 모델이름(테이블이름이 아니다.) 2. 테이블의 필드와 속성을 정하는 객체, 3. 테이블의 속성

3. server.js에서 서버를 킬 때 동기화 시키기

    - await sequelize.sync({force : true})

4. 다른 모델을 만들 때, 2번 부터 반복

5. comment.model.js 생성하기
    - class를 이용한 방식
    - 정적 메서드 이용
