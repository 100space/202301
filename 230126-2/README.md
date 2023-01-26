# WebSocket

HTTP 프로토콜의 가장 큰 특징이였던 비연결성 때문에 양방향 통신이 되지 않았다.
하지만 WebSocket은 ws 프로토콜을 기반으로 클라이언트와 서버를 양방향으로 통신이 가능하게 한다.

이를 이용하면 채팅, 주식차트, 예약프로그램 등등 실시간에 관련된 기능을 구현할 수 있다.

WS 프로토콜이기 때문에 request, response에 규칙성이 있다.

# message 기본 형태

### request message 기본 형태

```
GET / HTTP1.1
Upgrade:websocket
Connection : Upgrade
Sec-Websocket-key:lskdjflksfj ..
```

Sec-Websocket-key이 고유식별자의 역할

### response message 기본 형태

```
HTTP/1.1 101 Switching Protocols
Upgrade:websocket
Connetcion : Upgrade
Sec-WebSocket-Accept : asdflkjsdflk...
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

<br>

# 브로드캐스트란?

브로드캐스팅(broadcasting)의 사전적 의미은 송신 호스트가 전송한 데이터가 네트워크에 연결된 모든 호스트에 전송되는 방식을 말한다.
현재 코드를 서로 다른 종류의 브라우저를 이용하여 접속한 후 하나의 브라우저에서 자신의 브라우저를 제외한 나머지 브라우저에 데이터를 보내는 방식이다.

-   ex) 크롬, 사파리, 파이어폭스를 이용하여 같은 서버에 접속을 한다.
    이후 크롬에서 input을 통해 데이터를 보내면 크롬을 제외한 사파리와 파이어폭스에 해당 데이터가 전송된다.
