const SocketIO = require("socket.io")

module.exports = (server, app) => {
    const io = SocketIO(server)

    io.on("connection", (socket) => {
        //data 이벤트 발생시
        socket.on("data", (data) => {
            const json = {
                userid: "baek111",
                data,
            }
            //본인을 제외한 나머지 호스트에게 스트링타입으로 데이터를 보냄
            socket.broadcast.emit("reply", JSON.stringify(json))
        })

        //hello 이벤트 발생시
        socket.on("hello", (data) => {
            console.log(data)
        })
    })
}
