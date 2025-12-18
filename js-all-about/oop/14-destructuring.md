# Destructuring

## 정의

Destructuring은 배열이나 객체에서 데이터를 꺼내 변수로 만드는 문법이다. 좌우 형태를 똑같이 맞추면 내부 데이터가 자동으로 변수에 할당된다. 여러 개의 데이터를 한 번에 변수로 만들 수 있어서 코드가 간결해진다.

---

## Array Destructuring

배열의 데이터를 순서대로 변수에 할당한다.

```javascript
// 기존 방식
const array = [2, 3, 4];
const a = array[0];
const b = array[1];
const c = array[2];

// Destructuring
const [a, b, c] = [2, 3, 4];

console.log(a);  // 2
console.log(b);  // 3
console.log(c);  // 4
```

배열과 비슷한 형태로 변수를 선언하면 각 위치의 값이 변수에 할당된다.

### 일부만 추출

필요한 값만 추출할 수 있다.

```javascript
const [first, second] = [1, 2, 3, 4, 5];

console.log(first);   // 1
console.log(second);  // 2
```

중간 값을 건너뛰려면 쉼표로 자리를 비운다.

```javascript
const [first, , third] = [1, 2, 3];

console.log(first);  // 1
console.log(third);  // 3
```

### 기본값 설정

값이 없을 때 사용할 기본값을 지정할 수 있다.

```javascript
const [a, b, c = 5] = [2, 3];

console.log(a);  // 2
console.log(b);  // 3
console.log(c);  // 5 (기본값)
```

값이 undefined일 때만 기본값이 적용된다.

```javascript
const [a = 10] = [undefined];
console.log(a);  // 10

const [b = 10] = [null];
console.log(b);  // null (null은 값이 있는 것으로 취급)
```

### 나머지 요소 모으기

rest 문법과 함께 사용하면 나머지를 배열로 모을 수 있다.

```javascript
const [first, ...rest] = [1, 2, 3, 4, 5];

console.log(first);  // 1
console.log(rest);   // [2, 3, 4, 5]
```

---

## Object Destructuring

객체의 데이터를 key 이름으로 변수에 할당한다.

```javascript
// 기존 방식
const obj = { name: 'Kim', age: 30 };
const name = obj.name;
const age = obj.age;

// Destructuring
const { name, age } = { name: 'Kim', age: 30 };

console.log(name);  // 'Kim'
console.log(age);   // 30
```

key 이름과 동일한 변수가 자동으로 생성된다.

### 다른 이름으로 변수 만들기

key와 다른 이름의 변수를 만들 수 있다.

```javascript
const { name: userName, age: userAge } = { name: 'Kim', age: 30 };

console.log(userName);  // 'Kim'
console.log(userAge);   // 30
// console.log(name);   // ReferenceError (name 변수는 생성 안 됨)
```

`key: 변수명` 형태로 작성한다.

### 기본값 설정

```javascript
const { name, age, city = 'Seoul' } = { name: 'Kim', age: 30 };

console.log(name);  // 'Kim'
console.log(age);   // 30
console.log(city);  // 'Seoul' (기본값)
```

이름 변경과 기본값을 동시에 사용할 수도 있다.

```javascript
const { name: userName = 'Anonymous' } = {};

console.log(userName);  // 'Anonymous'
```

### 중첩 객체 Destructuring

객체 안의 객체도 destructuring 할 수 있다.

```javascript
const person = {
  name: 'Kim',
  address: {
    city: 'Seoul',
    zip: '12345'
  }
};

const { name, address: { city, zip } } = person;

console.log(name);  // 'Kim'
console.log(city);  // 'Seoul'
console.log(zip);   // '12345'
```

---

## 변수를 Object로 집어넣기

key와 value 이름이 같으면 축약할 수 있다.

```javascript
const name = 'Kim';
const age = 30;

// 기존 방식
const obj1 = { name: name, age: age };

// 축약 문법
const obj2 = { name, age };

console.log(obj2);  // { name: 'Kim', age: 30 }
```

---

## 함수 파라미터에서 Destructuring

### Object 파라미터

```javascript
// 기존 방식
function greet(user) {
  console.log(user.name);
  console.log(user.age);
}

// Destructuring
function greet({ name, age }) {
  console.log(name);
  console.log(age);
}

const user = { name: 'Kim', age: 30 };
greet(user);
// 'Kim'
// 30
```

함수 호출 시 `{ name, age } = { name: 'Kim', age: 30 }`이 실행되는 것과 같다.

### 기본값과 함께

```javascript
function greet({ name = 'Guest', age = 0 } = {}) {
  console.log(`${name}, ${age}세`);
}

greet({ name: 'Kim' });  // 'Kim, 0세'
greet({});               // 'Guest, 0세'
greet();                 // 'Guest, 0세' (= {} 덕분에 에러 안 남)
```

`= {}`는 인자 자체가 없을 때를 대비한 기본값이다.

### Array 파라미터

```javascript
function sum([a, b]) {
  return a + b;
}

console.log(sum([10, 20]));  // 30
```

---

## 복잡한 구조 Destructuring

배열과 객체가 섞인 복잡한 구조도 가능하다.

```javascript
const data = {
  body: {
    height: 190,
    weight: 70
  },
  size: ['상의 Large', '바지 30인치']
};

const {
  body: { height, weight },
  size: [top, bottom]
} = data;

console.log(height);  // 190
console.log(weight);  // 70
console.log(top);     // '상의 Large'
console.log(bottom);  // '바지 30인치'
```

좌우 형태를 똑같이 맞추고, 변수로 만들 위치에 변수명을 쓰면 된다.

---

## 값 교환하기

Destructuring을 사용하면 임시 변수 없이 두 값을 교환할 수 있다.

```javascript
let a = 1;
let b = 2;

// 기존 방식
let temp = a;
a = b;
b = temp;

// Destructuring
[a, b] = [b, a];

console.log(a);  // 2
console.log(b);  // 1
```

---

## 우테코 활용 예시

### 입력 파싱

```javascript
function parseCarNames(input) {
  const names = input.split(',').map(name => name.trim());
  return names;
}

// Destructuring으로 첫 번째 값만 검증
function validateFirstCar(input) {
  const [first, ...rest] = input.split(',');

  if (!first || first.trim() === '') {
    throw new Error('[ERROR] 첫 번째 자동차 이름이 비어있습니다.');
  }

  return [first.trim(), ...rest.map(n => n.trim())];
}
```

### 로또 번호 처리

```javascript
class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  // Destructuring으로 당첨 정보 한 번에 받기
  checkWinning({ winningNumbers, bonusNumber }) {
    const matchCount = this.#countMatch(winningNumbers);
    const hasBonus = this.#numbers.includes(bonusNumber);

    return { matchCount, hasBonus };
  }

  #countMatch(winningNumbers) {
    return this.#numbers.filter(n => winningNumbers.includes(n)).length;
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');
    }
  }
}

const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
const { matchCount, hasBonus } = lotto.checkWinning({
  winningNumbers: [1, 2, 3, 7, 8, 9],
  bonusNumber: 10
});

console.log(matchCount);  // 3
console.log(hasBonus);    // false
```

### 게임 결과 반환

```javascript
class RaceGame {
  #cars;

  // 여러 값을 한 번에 반환
  getResult() {
    const winners = this.#findWinners();
    const maxPosition = this.#getMaxPosition();

    return { winners, maxPosition };
  }

  #findWinners() {
    // ...
  }

  #getMaxPosition() {
    // ...
  }
}

// 호출하는 쪽에서 Destructuring
const { winners, maxPosition } = game.getResult();
```

### 설정 객체 받기

```javascript
class Car {
  #name;
  #position;

  // 설정 객체를 받아서 Destructuring
  constructor({ name, position = 0 }) {
    this.#validateName(name);
    this.#name = name;
    this.#position = position;
  }

  #validateName(name) {
    if (name.length > 5) {
      throw new Error('[ERROR] 자동차 이름은 5자 이하만 가능합니다.');
    }
  }
}

const car = new Car({ name: 'pobi' });
const car2 = new Car({ name: 'woni', position: 3 });
```

---

## 용어 정리

- Destructuring: 배열이나 객체의 데이터를 분해하여 변수에 할당하는 문법
- Array Destructuring: 배열을 분해하는 것, 순서 기반
- Object Destructuring: 객체를 분해하는 것, key 이름 기반
- 기본값(Default Value): 값이 undefined일 때 사용되는 값
- 축약 문법(Shorthand): `{ name: name }`을 `{ name }`으로 줄이는 것
