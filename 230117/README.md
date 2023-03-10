cookie 또는 session을 이용하여 식별, 로그인 기능을 구현했었다.

Cookie와 Session에 대하여 다시 정리해보려한다. 그전에 HTTP 통신에 대한 기본적인 특징을 말하자면

-   HTTP 통신은 한 번의 요청에 한 번의 응답이 오고, 요청과 응답이 주고 받은 후 연결을 끊는 특징이 있다.(비연결성 - Connectionless)

    -   비연결성의 장점은 하나의 서버에 여러개의 클라이언트가 있다보니 연결을 해놓고 있으면 처리를 해야할 것이 많아지기 때문에 필요할 때만 연결을 하여 작업할 수 있게 한다.
    -   비연결성의 단점은 연결을 끊기 때문에 클라이언트의 정보가 없어서 매번 연결을 시도할 때마다 인증을 해야하는 번거로움이 있다.

-   비연결성으로 인해 서버는 클라이언트의 상태정보를 가지고 있지 않는다. 그래서 100번의 요청이 와도 서버측에서 는 100번의 요청이 왔었는지 알 수 없고, 처음 연결 때 데이터를 주고 받았어도 다음 연결 때는 이전 데이터를 유지하지 않는다. (무상태 - Stateless)

이러한 HTTP의 특징을 보완하기 위하여 Cookie, Session가 생겼다.

# Cookie

상태를 기억하기 위하여 브라우저에서 쿠키라는 기능이 생겼다.
쿠키는 브라우저(Client)측에 저장이 되며, 서버가 클라이언트를 식별할 수 있는 기능을 한다.
브라우저마다 가지고 있는 저장소에 쿠키가 저장되므로 브라우저마다 쿠키가 공유되지 않는다.

## Cookie 동작 방식

-   서버는 클라이언트의 요청에 응답을 할 때 응답 메세지 header에 Set-Cookie속성을 사용하여 클라이언트 측에 저장하고 싶은 정보를 담아서 응답을 해준다.
-   이후 클라이언트 측에서 요청을 보낼 때 header에 쿠키를 같이 보낸다.
-   이를 이용하여 서버는 클라이언트를 식별 할 수 있게 된다.

## Cookie 단점

-   정보를 브라우저에 저장하기 때문에 보안에 취약하다.
-   쿠키는 저장할 수 있는 용량이 매우 작다.
-   필요한 정보를 쿠키에 저장시켜놓으면 요청을 할 때마다 쿠키를 넣어줄 때 쿠키에 있는 모든 정보를 같이 넣어서 보내야하기 때문에 request message에 담아서 보내야하므로 내용이 길어진다.

# Session

세션은 서버측에 정보를 저장하는 방식이라 쿠키보다는 보안에 안전하다.
세션도 쿠키를 이용한다.
동시에 이용자가 몰리게 되면 서버에 저장되어 있는 정보를 사용하다 보니 서버에 부하가 심해진다.

## Session 동작방식

-   클라이언트가 서버에 접속시에 세션ID값을 발급받는다.
-   클라이언트는 이 세션ID를 쿠키에 담아 저장한다.
-   클라이언트가 서버에 요청시에 쿠키에 세션ID를 같이 담아서 요청한다.
-   서버는 세션ID로 세션에 저장되어 있는 클라이언트 정보를 가져와서 클라이언트에게 응답한다.

## Session의 단점

-   서버에 저장하기 때문에 사용자가 많아지면 해당 유저의 정보를 찾아서 데이터를 가져오는데 많은 시간이 걸리고, 서버측 부하가 심해진다.

# Cookie VS Session

-   가장 큰 차이점은 사용자의 정보가 저장되는 위치이다.
    cookie는 브라우저(클라이언트)측에 저장이 되고, session은 서버측에 저장이 된다.
-   보안 측면에선 쿠키보다 세션이 우수하고, 처리 속도는 세션보다 쿠키가 더 우수하다.
-   쿠키의 유효기간은 브라우저를 종료해도 남아 있을 수 있다. 세션의 유효기간은 지정 가능하지만 브라우저가 종료되면 삭제된다.

# JWT

JSON Web Token의 약자로 유저를 인증하고 식별하기 위한 토큰 기반의 인증 방법이다.
이 방법의 핵심은 보호할 데이터를 토큰으로 바꾸어 원본데이터를 주고 받는 방법이 아닌 암호화된 토큰을 주고 받는 기술이다.
토큰 전송과정에서 토큰이 탈취를 당하더라도 데이터에 대한 정보가 암호화 되어있어서 본래의 내용을 쉽게 알 수 없기 때문에 보안성이 우수하다.

토큰이라 해서 새로운 것이 아닌 쿠키에 저장하는 내용의 형태가 규격화 되어 있는 것을 말하는 것이다.
규격화 되어 있는 것이기 때문에 JWT도 일종의 프로토콜이다. 이 JWT과 클라우드를 기반으로 간편로그인이 생겨나기 시작했다.

## JWT의 구조

-   Header : 서명시 사용하는 알고리즘과, 토큰의 타입을 적어준다.
-   Payload : JWT의 data를 넣어준다.
    페이로드에 있는 속성을 클레임 셋이라고 부른다. 클레임 셋은 토큰의 정보, 생성일시나, 만료기간, 클라이언트-서버간 데이터들로 구성된다.
-   signature : .(점)을 구분자로 해서 헤더, 페이로드를 합친 문자열을 서명한 값이다.
    header + "." + payload, 비밀키
    보안 서명을 통해 메세지가 전송 과정에서 바뀌지 않았음을 확인한다.

### Header의 알고리즘

알고리즘에는 많은 종류의 알고리즘이 있는데, JWT에서 서명 및 확인하는데 사용하는 대표적인 것은 HS256과 RS256이다.

-   HS256 : HMAC with SHA-256의 약자이고 대칭 암호화의 한 유형으로 토큰 서명 및 확인을 하는데 개인키를 사용한다. 대칭 암호화이기 때문에 개인키가 전송하는 측과 전송 받는 측 두군데에 있다.
-   RS256 : RSA with SHA-256의 약자이며, 비대칭 암호화의 한 유형으로 토큰 서명 및 확인을 위해 개인키와 공개 키가 필요하다. 개인키는 토큰에 서명하는데 사용되고 공개 키는 서명을 확인하는데 사용된다. 공개키로 암호화가 되면 개인키로 해제할 수 있다. 공개키로 해제할 수 없다.

# 암호화

암호화는 단방향 암호화와, 양방향 암호화로 나뉜다.

## 단방향 암호화

단방향 암호화란 한쪽 방향으로만 암호화한다는 의미로써 암호화는 가능하지만 복호화는 할 수 없다.

비밀번호를 단방향 암호화 방식으로 저장하는 경우에 패스워드 DB가 해킹되어도 안전하다.
패스워드를 검증할 때에는 사용자에게 입력받은 비밀번호를 똑같은 방식으로 암호화 해서 그 결과물로 비교하여 맞다 아니다를 보여주면 된다.

단방향으로 앙호화를 하여 복호화를 못한다는 점은 패스워드를 잊어버렸을 때 찾을 수 없다는 의미이다.
그래서 찾아서 수정하는 방법이 아닌 새로운 비밀번호로 바꾸게 하는 방법으로 사용하고 있다.

## 양방향 암호화

양방향 암호화란 암호화된 데이터를 복호화하여 볼 수 있도록 구현 된 암호화 방식이다.
알고리즘은 키의 성질에 따라 구분이 되는데, 대칭키와 비대칭키로 구분할 수 있다.

### 대칭키

암호화 할 때 사용하는 키와 복호화를 할 때 사용하는 키가 같다.두 키가 동일(대칭)한 경우이기 때문에 대칭키이며, 이 키는 외부에 유출되지 않도록 관리해야 한다.
대칭키를 양쪽에 동시에 갖고 있으려면 한번은 한쪽에서 다른 쪽으로 키를 전송해야하는데 이 과정에서 유출될 수 있는 문제가 있다. 이를 보완하여 비대칭키가 생겼다.

### 비대칭

암호화, 복호화할 때 사용하는 키가 서로 다른(비대칭)경우이므로 비대칭키이며, 대체로 개인키와, 공개키 두 가지가 사용된다.
특정한 사람만 가지고 있는 것을 개인키, 누구나 가질 수 있는 것을 공개키라고 한다.
비공개키를 사용한 암호화방식에는 공개키로 암호화를 하는 경우와 개인키로 암호화를 하는 경우로 구분할 수 있다.
공개키로 암호화를 하는 경우 데이터 보안에 중점을 두어 개인키로 복호화를 해야하고, 개인키로 암호화를 하게 되면 안전한 전자서명을 통한 인증과정을 중점(정보를 송신한 사람의 신원을 확인하는 과정)에 둔 것이고, 공개키가 있어야 복호화를 할 수 있다. 하지만 공개키이므로 누구나 알 수 있도록 공개 되어있다.
