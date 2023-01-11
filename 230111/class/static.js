class Person{
    //접근 제어자 public, private  // 연산할때는 필요하지만 사용자에게는 보여주고 싶지 않을 때 ..
    //자바스크립트에서는 private로 만들기 위해서 #을 붙인다.
    #key = 180
    constructor(_name, _age){
        this.name=_name
        this.age = _age
    }
    getName(){
        //instance가 생성될때 prototype으로 생성이 된다.
        // return this.name
        // const a = this.#key + this.name
        // return a 
        return "hello"
    }
    //static 키워드를 넣으면 정적 메서드가 된다.
    // static getAge(){
    //     console.log(this)
    // }
    // static setDate(now){
    //     console.log(this)
    //     return '시분초' ||'날짜'
    // }
}

const person = new Person("baek", 29)

//console.dir(person) // 정적 메서드를 찾을 수 없음..
//console.dir(Person)// 정적메서드를 찾을 수 있음..
//정적 메서드를 쓰기 위해서는..


// Person.setDate(Date.now())
// now() : 정적메서드...

// 정적 메서드는  인스턴스를 생성해서 사용하는 것이 아니다. 

class Baek extends Person{
    constructor(_age){
        super("baek", _age)
    }
    static name(){
        // console.log(this.getName()) //this->Baek -> [[prototype]] ->getName
        // console.log(super.getName()) //super -> prototype -> getName
        // return 이 생략되어있다.
    }
}
const baek = new Baek(29)
// console.log(Baek.name())


