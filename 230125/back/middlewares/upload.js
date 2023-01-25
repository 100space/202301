const multer = require("multer")
const path = require("path")

//multer

//파일업로드를 위해서 사용함.
//client -> server
//클라이언트에서 보낸 이미지파일의 텍스트를 받으면
//서버에서 그 텍스트를 파일로 저장한다.

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, done) => {
            done(null, "uploads/")
        },
        filename: (req, file, done) => {
            //파일이 저장될 때 겹치지 않게 하기위해 우리가 임의적으로 파일이름을 정해서 겹치지 않게 저장하고
            //사용자가 준 내용의 파일이름은 따로 저장을 해둔다.
            //실제 파일이름_timestamp의 방식을 이용한다.
            const ext = path.extname(file.originalname)
            const basename = path.basename(file.originalname, ext)
            const filename = `${basename}_${Date.now()}${ext}`
            done(null, filename)
        },
    }), // client에서 받은 내용을 어디에 저장할 것인가
    limits: { fileSize: 5 * 1024 * 1024 }, //파일사이즈 5MB
})

module.exports = upload

//1 byte = 8 bit
// 1 kb = 1024 byte
// 1 mb = 1024 kb
