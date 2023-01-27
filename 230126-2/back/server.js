const app = require("./app")
const webSocket = require("./socket") // ws방식
const SocketIO = require("./socketIO") //socket.io 방식

const http = app.listen(3000, () => {
    console.log("server start")
})

// webSocket(http) // ws방식을 위한 호출
SocketIO(http, app) //socket.io 방식을 위한 호출
