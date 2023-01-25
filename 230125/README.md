# 파일 업로드

input태그 type속성중에 file이라는 것이 있다.
외장모듈 multer을 이용하면 input 태그를 이용하여 웹사이트에 첨부파일이나, 이미지파일 같은 것을 업로드 할 수 있는 기능이다.
Multer을 사용할 때 반드시 form 태그의 속성 중 enctype가 "multipart/form-data"로 되어 있어야 한다.

# 사용 방법

```sh
npm install multer
```

```html
<form method="post" action="/" enctype="multipart/form-data">
    <ul>
        <li>
            <input type="file" name="upload" />
        </li>
        <li>
            <button type="submit">전송</button>
        </li>
    </ul>
</form>
```

# multer 초기 세팅

Multer는 미들웨어로 이용한다. 파일을 따로 만들어서 multer에 대한 모듈을 만들어서 사용한다.
multer 미들웨어를 만들 때, 저장되는 위치와 파일의 크기를 정해줄 수 있고, 그 위치 안에서 어떤 디렉토리 안에 저장이되며, 어떤 방식으로 저장이 될지를 지정해 줄 수 있다.
사용자가 보내준 파일 이름 그대로 DB에 저장하게 되면 화면을 보이는 과정에서 파일을 불러오기 쉽지 않기 때문에 규칙성 있게 만들어준다.

```js
const multer = require("multer")
const path = require("path")

const upload = multer({
    storage: multer.diskStorage({
        //파일이 저장되는 위치
        destination: (req, file, done) => {
            done(null, "uploads/")
        },
        //파일 이름
        filename: (req, file, done) => {
            const ext = path.extname(file.originalname)
            const basename = path.basename(file.originalname, ext)
            const filename = `${basename}_${Date.now()}${ext}`
            done(null, filename)
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, //파일사이즈 5MB
})
module.exports = upload
```

# 파일 선택

3가지 상황이 있고 각 상황에 따른 미들웨어에 메소드가 있다.

-   파일 한개 (.single())
-   파일 여러개 (.array())
-   한 파일씩 여러 항목 (.fields())

## 상황 1. 파일 한개만 선택하는 경우

```html
<form method="post" action="/single" enctype="multipart/form-data">
    <ul>
        <li>
            <input type="file" name="upload" />
        </li>
        <li>
            <button type="submit">전송</button>
        </li>
    </ul>
</form>
```

```js
// single 메소드
app.post("/single", upload.single("upload"), (req, res) => {
    console.log(req.file)
    console.log(req.body)
    res.send("upload")
})
```

## 상황 2. 파일 여러개를 선택하는 경우 (multiple 속성을 이용한다.)

```html
<form method="post" action="/array" enctype="multipart/form-data">
    <ul>
        <li>
            <input type="file" name="upload" multiple />
        </li>
        <li>
            <button type="submit">전송</button>
        </li>
    </ul>
</form>
```

```js
//array메소드
app.post("/array", upload.array("upload"), (req, res) => {
    console.log(req.files)
    console.log(req.body)
    res.send("upload")
})
```

## 상황 3. 여러 파일을 배열로 저장하는 경우

```html
<form method="post" action="/" enctype="multipart/form-data">
    <ul>
        <li>
            <input type="file" name="upload1" />
            <input type="file" name="upload2" />
            <input type="file" name="upload3" />
            <input type="file" name="upload4" />
        </li>
        <li>
            <button type="submit">전송</button>
        </li>
    </ul>
</form>
```

```js
//fields 메소드
app.post("/uploads", upload.fields([{ name: "upload1" }, { name: "upload2" }, { name: "upload3" }, { name: "upload4" }]), (req, res) => {
    console.log(req.files.upload1)
    console.log(req.files.upload2)
    console.log(req.files.upload3)
    console.log(req.files.upload4)
    console.log(req.body)
    res.send("upload")
})
```

# HTTP통신을 이용한 파일 업로드

위에 상황은 기본적인 파일 처리방식이라고 보면(백엔드에서 처리하는 라우터) 실제 사용할 때는 프론트엔드 서버측의 요청을 이용하여 파일을 주고 받을 수 있다.
HTTP통신을 이용하기 위해서 Request message을 이용해서 통신하는데, request message에서 header 부분에 Content-type을 지정해주어야한다.
그리고 AXIOS를 이용하여 비동기통신을 한다.

## 기본 HTML

```html
<!-- body 안에 영역만 작성함. -->
<form id="frm">
    <div id="img">
        <img id="image" src="#" alt="" />
        <input type="file" name="upload" class="img_input" id="img_input" />
    </div>
    <input type="text" name="subject" />
    <button type="submit">전송</button>
</form>
```

## JavaScript

```js
const frm = document.querySelector("#frm")

frm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const body = new FormData(e.target) // 바디영역을 만들어주는 JS내장기능
    body.append("name", "baek") //추가로 넣고 싶은 내용..
    const response = await axios.post("http://127.0.0.1:3000/single", body, {
        headers: {
            ["Content-type"]: "multipart/form-data", // 필수...
        },
    })

    location.href = "/"
})
```

# 업로드할 파일 미리보기, 썸네일

form 태그에서 input태그 안에 내용의 변화가 있을 시에 발동하는 이벤트를 이용하여 썸네일을 만들 수 있다.
내용 변화를 감지하고 그 내용의 img태그에 src에 넣어서 그 이미지가 보일 수 있게 하는 방법이다.

```js
const imgInput = document.querySelector("#img_input")
const imageFile = document.querySelector("#image")
const img = document.querySelector("#img")
const frm = document.querySelector("#frm")

imgInput.addEventListener("change", () => {
    const preview = new FileReader()
    preview.readAsDataURL(imgInput.files[0])
    preview.onload = () => {
        imageFile.src = preview.result
        imageFile.style = "height :100%; width :100%"
    }
})
```

## FileReader() 메서드

썸네일을 만드는 방법에서 핵심 메서드는 FileReader()이다. 이 메서드는 비동기적으로 데이터를 읽기 위해 사용하는 메서드이다.
FileReader 메서드 안에 readAsDataURL()가 있는데, 이 메서드가 바이너리 파일을 읽어서 base64로 데이터를 반환한다.
readAsDataURL()이 없으면 result값이 반환되지 않는다.. 그러므로 readAsDataURL()을 이용하여 result 값을 넣어주고 그 result 값을 src에 대입하여 화면에 그려주는 방식을 이용한다.

## 바이너리 파일이란?

쉽게 말하면 2진수로 저장된 파일을 말한다.
