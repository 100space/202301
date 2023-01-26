const SocketIO = require("socket.io")

module.exports = (server, app) => {
    const io = SocketIO(server)

    io.on("connection", (socket) => {
        //socket.io는 여러 이벤트를 직접 만들고 사용할 수있다.
        console.dir(socket)
        socket.on("data", (data) => {
            const json = {
                userid: "web7722",
                data,
            }
            socket.broadcast.emit("reply", JSON.stringify(json))
        })
        socket.on("hello", (data) => {
            console.log(data)
        })
    })
}
