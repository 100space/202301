const app = require("./app")
const webSocket = require("./socket")
const SocketIO = require("./ws")

const http = app.listen(3000, () => {
    console.log("server start")
})

// webSocket(http)
SocketIO(http, app)
