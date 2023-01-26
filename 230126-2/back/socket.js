const WebSocket = require("ws")

module.exports = (http) => {
    let sockets = []
    const server = new WebSocket.Server({
        server: http,
    })

    server.on("connection", (socket, request) => {
        const {
            connection: { remoteAddress: ip },
        } = request
        console.log(`틀라이언트 접속 ${ip}`)

        if (socket.readyState === socket.OPEN) {
            sockets.push(socket)
            console.log(sockets.length)
            socket.send(`${ip}님 환영합니다.`)
        }

        socket.on("message", (msg) => {
            console.log(`${ip}에서 받은 메세지 ${msg}`)
            for (const client of sockets) {
                if (client === socket) continue
                client.send(`${msg}`)
            }
        })

        socket.on("close", () => {
            sockets = sockets.filter((v) => v !== socket)
            console.log(`${ip}님이 접속을 끊음.`)
        })
    })
}
