const sum = (a, b) => a + b
const obj = {
    userid: "web7722",
    userpw: "1234",
}
// 대분류의 느낌
describe("JWT", () => {
    // 중분류의 느낌
    it("decode", () => {
        console.log("hello~~")
    })
    it("encode", () => {})
    it("2+2 = 4이다", () => {
        const result = sum(2, 2)
        expect(result).toBe(4)
    })
    it("객체테스트", () => {
        expect(obj).toEqual({
            userid: "web7722",
            userpw: "1234",
        })
    })
})
