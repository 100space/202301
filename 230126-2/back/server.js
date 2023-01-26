const app = require("./app")
const webSocket = require("./socket")

const http = app.listen(3000, () => {
    console.log("Back Server start")
})

webSocket(http)
