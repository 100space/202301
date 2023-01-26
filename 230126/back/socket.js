const WebSocket = require("ws")

module.exports = (http) => {
    let sockets = []
    const server = new WebSocket.Server({
        server: http, // 같은 3000 포트를 쓸 수 있다.  //Websocket 서버에 연결할 HTTP지정
        // port:8545,     //다른 포트 쓰고 싶으면 같은 식으로 지정해주면 된다. //Websocket 사용할 Port지정
    })
    //양방향 통신 .. 보통 이벤트 기반으로 이루어져있음..

    //connection 연결이 맺어졌을 때 발동하는 이벤트
    server.on("connection", (socket, request) => {
        if (request.url === "/") {
            let sockets = []
            const {
                connection: { remoteAddress: ip },
            } = request
            console.log(`클라이언트 접속 ${ip}`)

            // 현재 상태값이 open과 일치하냐 ( 1 : open이 되었을 때, 제대로 연결 되었을 때를 의미)
            if (socket.readyState === socket.OPEN) {
                sockets.push(socket)
                console.log(sockets.length)
                socket.send(`${ip}님 환영합니다 - back`)
            }
            socket.on("message", (msg) => {
                console.log(`${ip}에서 받은 메세지 ${msg}`)
                for (const client of sockets) {
                    //브로드캐스트를 위해서 나를 제외한 이라는 조건만 붙으면 됨
                    if (client === socket) continue
                    client.send(`${msg}`)
                }
                //db에 저장할려면 이부분에 db insert가 되어야함.
            })
            socket.on("close", () => {
                sockets = sockets.filter((v) => v !== socket)
                console.log(`${ip}님이 접속을 끊음`)
            })
        } else if (request.url === "/namespace/room1") {
            let sockets = []
            const {
                connection: { remoteAddress: ip },
            } = request
            console.log(`클라이언트 접속 ${ip}`)

            // 현재 상태값이 open과 일치하냐 ( 1 : open이 되었을 때, 제대로 연결 되었을 때를 의미)
            if (socket.readyState === socket.OPEN) {
                sockets.push(socket)
                console.log(sockets.length)
                socket.send(`${ip}님 환영합니다 - back`)
            }
            socket.on("message", (msg) => {
                console.log(`${ip}에서 받은 메세지 ${msg}`)
                for (const client of sockets) {
                    //브로드캐스트를 위해서 나를 제외한 이라는 조건만 붙으면 됨
                    if (client === socket) continue
                    client.send(`${msg}`)
                }
                //db에 저장할려면 이부분에 db insert가 되어야함.
            })
            socket.on("close", () => {
                sockets = sockets.filter((v) => v !== socket)
                console.log(`${ip}님이 접속을 끊음`)
            })
        }
        // const ip = request.connection.remoteAddress
        const {
            connection: { remoteAddress: ip },
        } = request
        console.log(`클라이언트 접속 ${ip}`)

        // 현재 상태값이 open과 일치하냐 ( 1 : open이 되었을 때, 제대로 연결 되었을 때를 의미)
        if (socket.readyState === socket.OPEN) {
            sockets.push(socket)
            console.log(sockets.length)
            socket.send(`${ip}님 환영합니다 - back`)
        }
        socket.on("message", (msg) => {
            console.log(`${ip}에서 받은 메세지 ${msg}`)
            for (const client of sockets) {
                //브로드캐스트를 위해서 나를 제외한 이라는 조건만 붙으면 됨
                if (client === socket) continue
                client.send(`${msg}`)
            }
            //db에 저장할려면 이부분에 db insert가 되어야함.
        })
        socket.on("close", () => {
            sockets = sockets.filter((v) => v !== socket)
            console.log(`${ip}님이 접속을 끊음`)
        })
    })
}
