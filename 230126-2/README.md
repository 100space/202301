# WebSocket

HTTP 프로토콜의 가장 큰 특징이였던 비연결성 때문에 양방향 통신이 되지 않았다.
하지만 WebSocket은 ws 프로토콜을 기반으로 클라이언트와 서버를 양방향으로 통신이 가능하게 한다.

이를 이용하면 채팅, 주식차트, 예약프로그램 등등 실시간,데이터 송수신이 지속적인 기능을 구현할 수 있다.

WS라는 특수 프로토콜이기 때문에 request, response에 규칙성이 있다.

# message 기본 형태

### request message 기본 형태

```
GET / HTTP1.1
Upgrade:websocket
Connection : Upgrade
Sec-Websocket-key:!#@$%$^%#$%$^%& ..
```

Sec-Websocket-key가 고유식별자의 역할

### response message 기본 형태

```
HTTP/1.1 101 Switching Protocols
Upgrade:websocket
Connetcion : Upgrade
Sec-WebSocket-Accept : #$%^&$#@$%...
```

# NodeJS에서 WebSocket을 사용하는 방법

-   WS
-   socket.io

# 웹소켓 구현하기 (WS 방식)

## **Back Server**

설치해야할 npm

> cors, mysql2, sequelize, express, ws

기본적으로 파일 3개를 만듬

-   app.js : 기본 설정 및 라우터, 미들웨어를 적는 파일
-   server.js : 서버열고 닫을 때 쓰는 파일, webSocket 파일의 매개변수로 server를 받는다.
-   webSocket.js : 양방향 통신에 핵심적인 소켓을 만드는 인스턴스 생성이 구현 되어있고, 이 소켓의 이벤트를 실행시켜 원하는 데이터를 만들어주는 파일
      <!-- 이벤트 4가지 -->
    -   connection : 연결 될 때,
    -   message : 메세지를 받을 때 발생,
    -   error : 에러발생 시.
    -   close : 연결이 끊길 때 발생

<br>

## **Front Server**

설치 해야할 npm

> express, nunjucks

# 웹소켓 구현하기 (Socket.io 방식)

Socket.io도 라이브러리이므로 설치를 한다
그리고 스크립트 파일도 연결 해준다.

```js
// back
npm install socket.io

//front
<script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>
```

WS방식에서 front sever 측에서 웹소켓의 커넥션을 하기 위해

```js
const socket = new WebSocket("ws://127.0.0.1:3000")
```

를 했는데, socket.io 라이브러리를 이용하는 경우 ws라는 특수 프로토콜로 연결을 하는 것이 아닌 일반 http 프로토콜로 연결한다.

```js
const socket = io.connect("http://127.0.0.1:3000", {
    path: "/socket.io",
    transports: ["websocket"], //websocket 으로만 하겠다
})
```

transports 속성은 socket.io가 최초 요청과 응답을 이용한 폴링방식으로 서버와 연결하고, 이후에 websocket 방식이 가능하다면 weobsocket 방식으로 바뀌는데, 최초 연결부터 websocket 방식을 이용하기 위해서 이 속성을 추가해 주면 된다.

<br>

# 브로드캐스트란?

브로드캐스팅(broadcasting)의 사전적 의미은 송신 호스트가 전송한 데이터가 네트워크에 연결된 모든 호스트에 전송되는 방식을 말한다.
현재 코드를 서로 다른 종류의 브라우저를 이용하여 접속한 후 하나의 브라우저에서 자신의 브라우저를 제외한 나머지 브라우저에 데이터를 보내는 방식이다.

-   ex) 크롬, 사파리, 파이어폭스를 이용하여 같은 서버에 접속을 한다.
    이후 크롬에서 input을 통해 데이터를 보내면 크롬을 제외한 사파리와 파이어폭스에 해당 데이터가 전송된다.

### 폴링방식이란 ?

주기적인 시간마다 클라이언트 측에서 서버측으로 호출을 하여 정보를 얻는다, 요청을 한 것이기 때문에 정보가 있든 없든 응답을 받는다, 이후 연결이 끊긴다. 폴링 방식은 서버에서 데이터가 전달되는 간격을 알고 있어야 효율적인 요청과 응답이 있는데, 실시간 데이터를 받는 과정에서는 규칙적이지 않은 데이터의 전달 때문에 효율적이지 못하다.
(네이버스포츠의 5~10초 간격으로 업데이트하는 중계서비스의 경우는 효율적이다.)
그래서 폴링 방식을 조금 보완한 것이 **롱 폴링방식** 이다.

### 롱 폴링방식이란?

주기적으로 서버와 통신을 했다가 끊는 폴링방식에서 데이터가 없어도 응답을 받고 연결을 끊고 다시 맺는 과정이 효율적이지 못하기 때문에 서버와 클라이언트가 연결된 후에 요청을 보낸 다음 요청에 대한 응답이 생기는 경우 응답을 받고 연결을 끊는 방식이다. 만약 응답이 없으면 지정한 시간동안 서버와의 연결을 유지하는 방식인 것이다. 폴링 방식과 다르게 효율적으로 쓸 수는 있지만
요청과 응답에 대한 데이터가 잦다면 서버에 과부화가 생기고 폴링방식과 큰 차이가 없어진다.
