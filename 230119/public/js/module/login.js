// 확장자 생략 불가능!!!
import request from "/js/lib/request.js" // 요청 응답이다..
console.log(axios)
console.log(request)

//submit ;이벤트
//input의 userid, userpw value
//value -> request 브라우저 -> 백요청
//axios 응답,
//token
//javscript로 cookie 저장

const frm = document.querySelector("#loginfrm")

frm.addEventListener("submit", async (e) => {
    try {
        e.preventDefault()
        const { userid, userpw } = e.target
        console.log(userid.value, userpw.value)

        const response = await request.post("/auth", {
            userid: userid.value,
            userpw: userpw.value,
        })
        console.log(response)
        console.log(response.data)
        if (response.status === 200) {
            //cookie설정
            //로컬스토리지 or 세션스토리지 or 쿠키
            //localStorage.set("123","123") or sessionStrorage??
            document.cookie = `token=${response.data.token};`
            location.href = "/" // 정상적인 상태에서 메인으로 옮겨줌  이 이후엔 req.header에 쿠키가 있음
        }
    } catch (e) {
        alert("아이디와 패스워드가 다름")
    }
})
