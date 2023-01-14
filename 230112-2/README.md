# MySQl

## 제약 조건

-   기본키 (Primary key)
    -   중복되지 않는 고유값
    -   Null 허용하지 않음
    -   테이블당 하나의 기본키만 지정 가능
-   고유키 (Unique)
    -   중복되지 않는 고유값
    -   Null 가능
-   외래키 (foreign key)

### 1:N 관계

1 - 부모테이블 [PK]
N - 자식테이블 [FK]
자식테이블에는 부모의 고유식별자(PK) 값을 받아야한다.

게시판과 댓글의 관계  
하나의 게시판(부모)에 여러개의 댓글(자식)을 만들 수 있다.
댓글 테이블에는 게시판 테이블의 PK를 FK로 받는다.

자식테이블에게 부모테이블의 고유 식별자 필드를 하나 추가한다.
unique, pk 어떤 것이든 상관없다. ... fk

# 테이블 만들기

## SQL 을 이용한 테이블만들기

```sql
CREATE TABLE `user` (
    userid VARCHAR(30) PRIMARY KEY,
    userpw VARCHAR(64) NOT NULL,
    username VARCHAR(20)
)


CREATE TABLE `Board` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    subject VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    userid VARCHAR(30) NOT NULL,
    register_data datetime default now()
    hit INT default 0
)
```

## sequelize-class를 이용한 테이블 만들기

</br>

> user.model.js || board.model.js

</br>

Model.init()와 sequelize.define()는 같은 역할이다.
Mode.init함수 안에는 2가지의 인자값이 필요하다.
2가지의 인자값은 객체형태를 이루고, 1번 인자값에는 생성할 column의 속성을 넣어주고,
2번 인자값에는 Sequelize 생성자에 제공되는 기본 정의 옵션을 넣어준다.

</br>
</br>
</br>
</br>

# 외래키(foreign key) 지정하기

## 제약사항 확인하기

```sql
-- database 안에 table을 확인할 때 쓸 수 있다.
SELECT * FROM [database명].[table명]

-- information_schema 테이블의 모든 정보가 담겨있다. WHERE절을 붙여서 부분선택 가능
SELECT * FROM information_schema.table_constraints
WHERE TABLE_SCHEMA = "samples";
```

## sql을 이용한 외래키(foreign key) 지정하기

```sql
-- 게시판
-- 부모테이블 : User, 자식테이블 : Board

ALTER TABLE `Board` -- 자식테이블
    ADD CONSTRAINT fk_board_userid -- fk 삭제할 때 이용한다. fk_board_userid는 변수명 같은 느낌(제약명)
    FOREIGN KEY(userid) -- 자식테이블에서 부모의 식별자를 담는 필드명(자식 테이블의 외래키)
    REFERENCES User(userid)
    -- ON DELETE
    -- ON UPDATE
```

## SQL을 이용한 외래키 삭제하기

```sql
ALTER TABLE [테이블명] DROP CONSTRAINT [제약명]

ALTER TABLE `Board` DROP CONSTRAINT fk_board_userid;
```

## 외래키 제약조건 ON DELETE

외래키 지정시에 ON DELETE를 같이 작성하여 준다.

-   ON DELETE CASCADE
-   ON DELETE NO ACTION
-   ON DELETE RESTRICT

```sql
ALTER TABLE `Board`
    ADD CONSTRAINT fk_board_userid
    FOREIGN KEY(userid)
    REFERENCES User(userid)
    ON DELETE CASCADE || SETNULL || RESTRICT
```

### 상황 1 : 제약사항은 테이블을 만들 때 구상해서 미리 설정해야한다.

```sql
-- userid 변경하기
UPDATE Board SET userid = "admin2" WHERE id=6;
```

user테이블의 row는 2개지만 board의 userid의 내용이 3가지여서 제약사항을 걸면 에러가 발생한다.. (제약사항 에러)

ERROR 1452 (23000): Cannot add or update a child row: a foreign key constraint fails (`sample`.`board`, CONSTRAINT `fk_board_userid` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`))

### 결론 :

제약사항은 테이블안에 레코드가 생성되기 전에 제약사항을 걸어줘야한다. 그래서 스키마를 잘 구상하는 것이 중요하다.
</br>
</br>
</br>
</br>

### 상황 2 : ON DELETE CASCADE

부모테이블(User)에서 user 1개를 지워보자..자식 테이블의 변화 보기
(유저 데이터 1개 지우기)

(보드 데이터 지워짐)

### 결론:

제약 조건중 'ON DELETE CASCADE'를 사용하게 되면 부모테이블의 내용을 지우면 자식 테이블 데이터에 영향을 준다.
</br>
</br>
</br>
</br>

### 상황 3 : ON DELETE RESTRICT

자식 테이블에 부모 테이블과 관련된 내용이 있을 때 부모 테이블의 내용을 지울 수 없게 한다.

아예 실행이 되지 않는다..
</br>
</br>
</br>
</br>

### 상황 4 : ON DELETE NOT NUll

**자식테이블에서 fk가 NOT NULL이면 안됨..**
부모의 데이터가 지워져도 자식의 데이터를 지우지 않아야하는 상황이있다..
(ex: 리뷰...)
부모 데이터(pk)를 지우면 자식테이블에 fk값에 NULL이 기입된 상태로 데이터가 남아 있다.
</br>
</br>
</br>
</br>

**주의**
NULL이 되면 NULL이 된 값의 데이터 조회할 때를 불러올 방법이 없다. 그래서 default를 줄 값이랑 fk를 줄 값을 줄 테이블을 잘 설계 해야한다..

</br>
</br>
</br>
</br>

## sequelize에서 외래키(foreign key) 지정하기

</br>

> user.model.js || board.model.js

-   user.model.js

```js
static associate(models){
    this.hasMany(models.Board, {
        foreignKey:"userid"
    })
}
```

-   board.model.js

```js
static associate(models){
            this.belongsTo(models.User, {
                foreignKey:"userid"
            })
        }
```

-   선언한 static 함수 실행하기

```js
const { models } = sequelize
// models.Board.associate(models)
// models.User.associate(models)
for (const key in models) {
    if (typeof models[key].associate !== "function") continue
    models[key].associate(models)
}
```

</br>

# JOIN : 테이블 두개의 내용을 합치기

userid 대신 username을 띄우고 싶은 상황이다..
만약 기존 설계되어 있는 테이블을 건드릴 수 없다면?

```sql
SELECT
    -- * 로 지정해서 보는 것 보다는 필요한 내용을 보는 것이 낫다.
    A.id,
    A.subject,
    A.register,
    A.hit,
    A.userid,
    B.username
FROM Board as A -- board를 잠깐 변수A로 만든다..(DB에서 바뀌는 것이 아니라 query문 안에서만..)
JOIN User as B
ON A.userid = B.userid -- 두개의 테이블 내용중 똑같은 것이 있어야한다.
```

LEFT OUTER
RIGHT OUTER 등등 있지만 나중에 알아볼 예정 기본 JOIN 먼저 하자...

## sequelize join문

```js
const board = await Board.findAll({ raw: true })
```

raw:true를 이용하면 원하는 json형태의 데이터만 출력할 수 있다.
