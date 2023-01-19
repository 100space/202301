function solution(n) {
    let arr = []
    for(let i = 1; i <= n ; i++){
        if(i % 2 ===0) arr.push(i)
    }
    let sum = 0
    for(let j = 0; j<arr.length;j++) {
        sum += arr[j]
    }
    return sum
}
solution(9)