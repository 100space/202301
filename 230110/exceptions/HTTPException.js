class HttpException extends Error {
    constructor(message, status){
        super(message)
        this.status = 500
    }
}

module.exports = HttpException
// //인스턴스화 된 것이기 때문에 type은 object
// const e = new HttpException("요청 데이터가 없음!", 500)
// console.log(typeof e)
// console.log(e.message, e.status)

// console.log (e instanceof HttpException) // 맨처음 발견한 것을 반환한다.
