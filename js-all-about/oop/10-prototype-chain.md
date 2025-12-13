# Prototype Chain & 조작

## 정의

프로토타입 체인(Prototype Chain)은 자바스크립트에서 객체가 프로퍼티를 찾을 때 자신 → 부모 prototype → 부모의 부모 prototype 순으로 탐색하는 연결 구조다. 개발자는 이 구조를 직접 조작하여 객체 간 상속 관계를 설정할 수 있다.

---

## 부모 prototype 확인하기

자식 객체에서 부모 prototype을 확인하는 방법이 있다.

### __proto__ (비권장)

```javascript
const arr = [1, 2, 3];
console.log(arr.__proto__);  // Array.prototype
```

### Object.getPrototypeOf (권장)

```javascript
const arr = [1, 2, 3];
console.log(Object.getPrototypeOf(arr));  // Array.prototype
```

`__proto__`는 레거시 문법이므로 `Object.getPrototypeOf()`를 사용하는 것이 권장된다.

---

## 부모 constructor 확인하기

객체가 어떤 constructor로부터 생성되었는지 확인할 수 있다.

```javascript
const arr = [1, 2, 3];
console.log(arr.constructor);  // [Function: Array]

const obj = { name: 'Kim' };
console.log(obj.constructor);  // [Function: Object]

function Student(name) {
  this.name = name;
}
const student = new Student('Park');
console.log(student.constructor);  // [Function: Student]
```

---

## 모든 것의 부모는 Object

prototype을 계속 타고 올라가면 최종적으로 `Object.prototype`에 도달한다.

```javascript
const arr = [1, 2, 3];

console.log(Object.getPrototypeOf(arr));  // Array.prototype
console.log(Object.getPrototypeOf(Object.getPrototypeOf(arr)));  // Object.prototype
console.log(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(arr))));  // null
```

배열, 문자열, 객체 모두 최상위에 `Object.prototype`이 있다. 이것이 "자바스크립트는 모든 것이 객체다"라는 말의 근거다.

```
[1, 2, 3]
    ↓ __proto__
Array.prototype
    ↓ __proto__
Object.prototype
    ↓ __proto__
null (끝)
```

---

## prototype 조작하기

### Object.setPrototypeOf

기존 객체의 prototype을 다른 객체로 변경할 수 있다.

```javascript
const obj = {};
const proto = {
  sayHi() {
    console.log('안녕');
  }
};

Object.setPrototypeOf(obj, proto);

obj.sayHi();  // '안녕'
```

`obj`의 prototype을 `proto`로 설정했기 때문에 `obj`에서 `sayHi()`를 사용할 수 있다.

### Object.create

새 객체를 생성하면서 prototype을 지정할 수 있다.

```javascript
const parent = { name: 'Kim' };
const child = Object.create(parent);

console.log(child.name);  // 'Kim'
```

`Object.create(부모객체)`는 빈 객체를 생성하고 그 prototype을 `부모객체`로 설정한다.

---

## 프로토타입 체이닝 예시

여러 단계의 상속 구조를 만들 수 있다.

```javascript
const 부모 = { name: 'Kim', age: 50 };
const 자식 = Object.create(부모);
자식.age = 20;
const 손자 = Object.create(자식);

console.log(손자.name);  // 'Kim' (부모에서 찾음)
console.log(손자.age);   // 20 (자식에서 찾음)
```

`손자.name`을 호출하면:
1. 손자 자신에게 `name`이 있는가? → 없음
2. 자식(손자의 prototype)에 `name`이 있는가? → 없음
3. 부모(자식의 prototype)에 `name`이 있는가? → 있음! `'Kim'` 반환

`손자.age`를 호출하면:
1. 손자 자신에게 `age`가 있는가? → 없음
2. 자식(손자의 prototype)에 `age`가 있는가? → 있음! `20` 반환

자식에서 `age`를 재정의했기 때문에 부모의 `age: 50`은 가려진다(shadowing).

---

## 우테코 활용 예시

### instanceof로 타입 확인

프로토타입 체인을 이용해 객체가 특정 constructor의 인스턴스인지 확인할 수 있다.

```javascript
class Car {
  constructor(name) {
    this.name = name;
  }
}

class RacingCar extends Car {
  constructor(name) {
    super(name);
    this.position = 0;
  }
}

const car = new RacingCar('pobi');

console.log(car instanceof RacingCar);  // true
console.log(car instanceof Car);         // true
console.log(car instanceof Object);      // true
```

`instanceof`는 프로토타입 체인을 따라 올라가며 확인하므로 부모 클래스에 대해서도 `true`를 반환한다.

### hasOwnProperty로 자신의 프로퍼티 확인

프로토타입에서 상속받은 것이 아닌 자신만의 프로퍼티인지 확인할 수 있다.

```javascript
class Lotto {
  constructor(numbers) {
    this.numbers = numbers;
  }

  getNumbers() {
    return [...this.numbers];
  }
}

const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

console.log(lotto.hasOwnProperty('numbers'));     // true (자신의 프로퍼티)
console.log(lotto.hasOwnProperty('getNumbers'));  // false (prototype에서 상속)
```

### 실무에서는 class 사용

prototype 조작은 이해를 위한 것이고, 실제 우테코에서는 `class` 문법을 사용한다. `class`가 내부적으로 prototype을 설정해주기 때문에 직접 조작할 일은 거의 없다.

```javascript
// prototype 직접 조작 (레거시)
function Car(name) {
  this.name = name;
}
Car.prototype.move = function() {
  this.position++;
};

// class 문법 (권장)
class Car {
  constructor(name) {
    this.name = name;
  }

  move() {
    this.position++;
  }
}
```

두 코드는 동일하게 동작하지만 `class` 문법이 더 명확하고 가독성이 좋다.
