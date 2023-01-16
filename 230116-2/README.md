# Primary Key

기본적으로 PK는 테이블당 1개만 부여 가능하다고 알고 있다.

```sql
CREATE TABLE person(
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (first_name, last_name)
);

```

위에 코드처럼 sql을 작성하게 되면 가능할까?

```sql
INSERT INTO person(first_name, last_name) VALUES(1, 1)
```

first_name에 1이 들어가고 last_name에 1이 있는 상태에서 first_name, last_name둘다 PK가 있기 때문에 1,2를 넣으면 에러가 발생할 것 같지만 각각의 칼럼의 PK값을 갖는 것이 아닌 2개가 합쳐서 1개의 PK값이라고 생각하면 된다.

&&의 느낌과 같다.

# 데이터 타입 ENUM

ENUM은 데이터 타입으로 테이블에 column을 정의할 때 속성값으로 쓸 수 있다. ENUM은 column에서 받을 수 있는 데이터의 값을 정의해 두고 해당 값만 입력 가능하게 만들 수 있다.
ex)

```sql
provider:{
    type:Sequelize.ENUM('local', 'kakao','google')
}
-- 값으로 local, kakao, google 만 받을 수 있고, 이를 이용하면, 소셜을 이용한 로그인인지 local 로그인인지 확인할 수 있는 데이터가 담긴다.
```

## 테이블 구성

-   User
    -   userid PK
    -   userpw
    -   username
    -   provider
    -   snsid
-   Board
    -   id PK
    -   subject
    -   content
    -   createdAt
    -   hit
-   Comment
    -   id PK
    -   boardid FK
    -   userid FK
-   Liked
    -   userid FK
    -   boardid FK
-   Hashtag
    -   boardid FK
    -   tag FK
-   Hash
    -   tag PK

로 만들 예정이다.

### N:M관계

# model 만들기

## fs.readdirSync()

NodeJS에서 폴더의 내용을 확인하는 메서드이다.
폴더 내의 모든 파일의 이름을 배열로 만들어 보여준다.

# 테이블 관계 맺기

PK와 FK를 이용하여 테이블간 관계를 맺어준다.
부모테이블에는 hasMany(),
자식테이블에는 belongsTo()를 작성한다.

인자값으로 2가지를 받는데 1. 어디를 바라보는지 적어줘야한다. 2.속성에 대해 적어준다.

EX) user-board관계에서는 hasMany(models.Board,{foreign Key:"userid"})가 되고 belongsTo(models.User,{foreignKey:"})

### user - board

유저는 부모, 보드는 자식테이블로 1:N관계이다.
보드테이블은 자식테이블이기 때문에 유저테이블의 PK값을 FK로 받아야한다.  
보드테이블에는 userid라는 값을 넣지 않았다. 왜냐하면 보드테이블과 유저테이블의 관계형을 맺게되면 Sequelize가 알아서 넣어준다.
PK값과 FK값은 타입이 같아야한다.
**VARCHAR의 경우 charset까지 같아야한다.**

### board - comment

한개의 게시글에는 여러 댓글이 달릴 수 있기 때문에,1:N관계이다.
보드가 부모, 댓글이 자식테이블이 된다.

### user - comment

한 유저는 여러 댓글을 달 수 있기 때문에, 1:N관계이다.
유저가 부모, 댓글이 자식테이블이 된다.

## N:M관계

N:M의 경우는 1:N 관계가 2개가 합쳐진 상황이라고 볼 수 있는데,
Liked의 경우 테이블 내 column이 2개 있다.
userid, boardid 인데, 2개의 column은 각각 User와 Board 테이블의 내용을 참조하고 있다.
그래서 FK로 선언이 되고, User와 Liked는 1:N
Board와 Liked도 1:N관계가 된다.

Board, Hashtag, Hash 의 관계도 비슷한 형태로 되어있다.

### Liked

현재 Liked 테이블을 만들지 않은 상태이다.
좋아요 테이블은 N:M관계로써 user테이블과 board테이블 사이에서 양쪽의 PK값을 받는다.(userid, boardid)
1:N관계가 2개있으므로 N:M관계가 된다.
N:M관계는 belongsToMany라는 메서드를 사용하여 관계를 맺고, 테이블을 생성해준다.
새로 생성하는 테이블은 through 속성을 이용하여 테이블명을 지정할 수 있다.

그리고 sequelize는 기본적으로 FK를 만들 때 테이블명 + PK값으로 필드명이 정해진다. 이러면 원하는 값을 나중에 쉽게 사용하기 힘들기 때문에 필드명을 foreignKey 속성을 이용하여 필드 명을 지정해준다.

Liked의 테이블을 확인해보면 2개의 필드가 모두 Primary Key로 설정되어 있는데 이 내용이 제일 처음에 설명했던 내용과 같은 내용이다.

### Hashtag

해시태그를 위한 테이블을 만드려한다.
해시태그도 게시판과 N:M 관계이다.
위와 같은 방법으로 진행 할 수 있다.

```js
// User.model
static associate(models){
    this.hasMany(models.Board,{
        foreignKey:"userid"
    })
    this.hasMany(models.Comment,{
        foreignKey:"userid"
    })
    this.belongsToMany(models.Board,{
        through:"Liked",
        foreignKey:"userid"
    })
}
// Board.model
static associate(models) {
    this.belongsTo(models.User,{
        foreignKey:"userid"
    })
    this.hasMany(models.Comment,{
        foreignKey:"boardid"
    })
    this.belongsToMany(models.User,{
        through:"Liked",
        foreignKey:"boardid"
    })
    this.belongsToMany(models.Hash,{
        through:"Hashtag",
        foreignKey:"boardid"
    })
}

//Comment..model
static associate(models) {
    this.belongsTo(models.Board,{
        foreignKey:"boardid"
    })
    this.belongsTo(models.User,{
        foreignKey:"userid",
    })
}

```

# Sequelize 메서드

테이블의 중복값을 찾고 중복값이 없으면 insert하는 방법은 자주 쓰이는 것이기 때문에 sequelize에 메서드가 존재한다.

```js
//인자값에 where절을 넣는다.
findOrCreate()
```

<!-- crud 스키마, crud 테이블,  -->
