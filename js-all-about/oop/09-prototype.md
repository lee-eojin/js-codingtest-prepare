# Prototype

## 정의

Prototype은 자바스크립트에서 객체 간 상속을 구현하는 메커니즘이다. 모든 함수(constructor)는 생성 시 `prototype`이라는 숨겨진 객체를 자동으로 가지게 되며, 해당 constructor로 생성된 모든 인스턴스는 이 prototype에 있는 프로퍼티와 메서드를 사용할 수 있다. 유전자처럼 부모가 가진 것을 자식이 물려받아 쓸 수 있는 구조다.

---

## prototype 기본 사용

constructor를 만들면 `prototype`이라는 공간이 자동으로 생성된다.

```javascript
function Student() {
  this.name = 'Kim';
  this.age = 15;
}

console.log(Student.prototype);  // {} (빈 객체)
```

prototype에 프로퍼티나 메서드를 추가하면 모든 인스턴스에서 사용할 수 있다.

```javascript
function Student() {
  this.name = 'Kim';
  this.age = 15;
}

Student.prototype.gender = '남';

var student1 = new Student();
var student2 = new Student();

console.log(student1.gender);  // '남'
console.log(student2.gender);  // '남'
```

`student1`과 `student2`는 직접 `gender` 프로퍼티를 가지고 있지 않지만, 부모의 prototype에서 가져와 사용할 수 있다.

---

## 동작 원리 (프로토타입 체인)

자바스크립트는 객체에서 프로퍼티를 찾을 때 다음 순서로 탐색한다.

1. 객체 자신이 해당 프로퍼티를 가지고 있는가?
2. 없으면 부모의 prototype에 있는가?
3. 없으면 부모의 부모 prototype에 있는가?
4. 최상위까지 반복

```javascript
function Student() {
  this.name = 'Kim';
}

Student.prototype.gender = '남';

var student1 = new Student();

console.log(student1.name);    // 'Kim' (자신이 가진 프로퍼티)
console.log(student1.gender);  // '남' (prototype에서 찾음)
```

`student1.gender`를 호출하면 먼저 `student1` 객체 자체에서 `gender`를 찾는다. 없으면 `Student.prototype`에서 찾아서 반환한다. 이러한 연결 구조를 프로토타입 체인(prototype chain)이라고 한다.

---

## 내장 함수의 비밀

배열에서 사용하는 `sort`, `push`, `map`, `forEach` 같은 메서드들도 prototype 덕분에 사용 가능하다.

```javascript
var arr = [1, 2, 3];

// 위 코드는 사실 이것과 같다
var arr = new Array(1, 2, 3);
```

배열은 `Array`라는 constructor로부터 생성된 인스턴스다. `Array.prototype`에 내장 메서드들이 정의되어 있기 때문에 모든 배열에서 사용할 수 있다.

```javascript
console.log(Array.prototype);
// [sort, push, pop, map, filter, forEach, ...]
```

객체도 마찬가지다.

```javascript
var obj = { name: 'Kim' };

// 위 코드는 사실 이것과 같다
var obj = new Object();
obj.name = 'Kim';
```

`Object.prototype`에 `toString`, `hasOwnProperty` 같은 메서드들이 정의되어 있어서 모든 객체에서 사용할 수 있다.

---

## constructor vs prototype 차이

constructor에 정의한 것과 prototype에 정의한 것은 다르게 동작한다.

```javascript
function Student(name) {
  // constructor에 정의: 인스턴스마다 복사됨
  this.name = name;
  this.sayHi = function() {
    console.log('안녕 ' + this.name);
  };
}

// prototype에 정의: 공유됨 (복사 안 됨)
Student.prototype.school = '우테코대학교';
Student.prototype.introduce = function() {
  console.log(this.name + '입니다');
};
```

```javascript
var s1 = new Student('Kim');
var s2 = new Student('Park');

// constructor 것: 각자 가짐
console.log(s1.sayHi === s2.sayHi);  // false (별개의 함수)

// prototype 것: 공유
console.log(s1.introduce === s2.introduce);  // true (같은 함수)
```

constructor에 정의하면 인스턴스마다 복사본이 생기고, prototype에 정의하면 하나만 존재하고 공유한다.

---

## 언제 어디에 넣을까

constructor와 prototype을 구분해서 사용하면 효율적이다.

```javascript
function Car(name) {
  // 인스턴스마다 다른 값: constructor
  this.name = name;
  this.position = 0;
}

// 모든 인스턴스가 공유하는 메서드: prototype
Car.prototype.move = function() {
  this.position++;
};

Car.prototype.getStatus = function() {
  return this.name + ' : ' + '-'.repeat(this.position);
};
```

인스턴스마다 달라야 하는 데이터는 constructor에, 변경 없이 공유해도 되는 메서드는 prototype에 넣으면 메모리를 절약할 수 있다.

---

## 우테코 활용 예시

### prototype으로 메서드 정의

```javascript
function Lotto(numbers) {
  this.numbers = [...numbers];
}

Lotto.prototype.getNumbers = function() {
  return [...this.numbers];
};

Lotto.prototype.getMatchCount = function(winningNumbers) {
  return this.numbers.filter(function(num) {
    return winningNumbers.includes(num);
  }).length;
};

Lotto.prototype.hasNumber = function(number) {
  return this.numbers.includes(number);
};

var lotto1 = new Lotto([1, 2, 3, 4, 5, 6]);
var lotto2 = new Lotto([7, 8, 9, 10, 11, 12]);

console.log(lotto1.getMatchCount([1, 2, 3, 7, 8, 9]));  // 3
console.log(lotto1.hasNumber(3));  // true
```

### ES6 class와의 관계

ES6 class 문법에서 메서드를 정의하면 자동으로 prototype에 추가된다.

```javascript
class Car {
  constructor(name) {
    this.name = name;      // 인스턴스 프로퍼티
    this.position = 0;
  }

  move() {                 // prototype에 추가됨
    this.position++;
  }

  getStatus() {            // prototype에 추가됨
    return `${this.name} : ${'-'.repeat(this.position)}`;
  }
}

console.log(Car.prototype.move);       // [Function: move]
console.log(Car.prototype.getStatus);  // [Function: getStatus]
```

class 문법을 사용하면 prototype을 직접 다루지 않아도 되지만, 내부적으로는 prototype 기반으로 동작한다. prototype을 이해하면 class가 어떻게 작동하는지 파악할 수 있다.
