class HttpException extends Error {
    constructor(message, status){
        super(message)
        this.status = status
    }
}

const e = new HttpException("요청 데이터가 없음!", 500)
console.log(e)
console.log(e.message, e.status)