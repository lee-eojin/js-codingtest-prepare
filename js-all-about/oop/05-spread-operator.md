# Spread Operator

## 정의

스프레드 연산자(Spread Operator)는 ES6에서 도입된 문법으로, 세 개의 점(`...`)을 사용하여 이터러블(배열, 문자열 등)을 개별 요소로 펼치거나 객체의 프로퍼티를 펼치는 역할을 한다.

---

## 기본 동작 원리

스프레드 연산자는 배열이나 객체를 감싸고 있는 괄호를 제거하고 내부 요소들을 펼쳐놓는다고 이해할 수 있다.

### 배열에서의 동작

```javascript
const array = ['hello', 'world'];
console.log(array);     // ['hello', 'world']
console.log(...array);  // hello world
```

배열에 스프레드 연산자를 적용하면 대괄호가 제거되고 개별 요소들이 펼쳐진다. `console.log(...array)`는 `console.log('hello', 'world')`와 동일하게 동작한다.

### 문자열에서의 동작

문자열은 이터러블 객체이므로 스프레드 연산자를 적용할 수 있다.

```javascript
const str = 'hello';
console.log(...str);  // h e l l o
```

각 문자가 개별 요소로 펼쳐진다.

---

## 배열 조작

### 배열 합치기

두 개 이상의 배열을 하나로 합칠 때 스프레드 연산자를 사용하면 간결하게 표현할 수 있다.

```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5];
const combined = [...arr1, ...arr2];

console.log(combined);  // [1, 2, 3, 4, 5]
```

기존 `concat` 메서드보다 직관적이며, 중간에 다른 요소를 삽입하는 것도 용이하다.

```javascript
const combined = [...arr1, 'middle', ...arr2];
// [1, 2, 3, 'middle', 4, 5]
```

### 배열 복사 (얕은 복사)

자바스크립트에서 배열을 등호(`=`)로 할당하면 참조가 복사되어 동일한 배열을 가리키게 된다.

```javascript
const original = [1, 2, 3];
const reference = original;

original[0] = 100;
console.log(reference);  // [100, 2, 3]
```

스프레드 연산자를 사용하면 새로운 배열을 생성하여 원본과 독립적인 복사본을 만들 수 있다.

```javascript
const original = [1, 2, 3];
const copy = [...original];

original[0] = 100;
console.log(copy);  // [1, 2, 3]
```

이는 얕은 복사(Shallow Copy)이므로 중첩된 객체나 배열은 여전히 참조를 공유한다는 점에 유의해야 한다.

---

## 객체 조작

ES2018부터 객체에도 스프레드 연산자를 사용할 수 있다.

### 객체 합치기

```javascript
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, ...obj1 };

console.log(obj2);  // { c: 3, a: 1, b: 2 }
```

### 객체 복사 (얕은 복사)

```javascript
const original = { a: 1, b: 2 };
const copy = { ...original };

original.a = 100;
console.log(copy);  // { a: 1, b: 2 }
```

### 프로퍼티 덮어쓰기

동일한 키가 존재할 경우, 나중에 오는 값이 이전 값을 덮어쓴다.

```javascript
const defaults = { theme: 'light', fontSize: 14 };
const userSettings = { theme: 'dark' };

const settings = { ...defaults, ...userSettings };
console.log(settings);  // { theme: 'dark', fontSize: 14 }
```

스프레드 순서에 따라 결과가 달라지므로 순서에 주의해야 한다.

---

## 함수 호출 시 인수 전달

배열의 요소들을 함수의 개별 인수로 전달할 때 스프레드 연산자가 유용하다.

```javascript
function add(a, b, c) {
  return a + b + c;
}

const numbers = [1, 2, 3];
console.log(add(...numbers));  // 6
```

스프레드 연산자가 도입되기 전에는 `Function.prototype.apply`를 사용했다.

```javascript
// ES6 이전 방식
add.apply(null, numbers);

// ES6 이후 방식
add(...numbers);
```

---

## apply와 call 메서드

`apply`와 `call`은 함수의 `this`를 명시적으로 바인딩하면서 함수를 호출하는 메서드다. 스프레드 연산자의 등장 배경을 이해하는 데 도움이 된다.

### 기본 개념

```javascript
const person = {
  greet: function() {
    console.log(`Hello, ${this.name}`);
  }
};

const user = { name: 'Kim' };

person.greet.call(user);   // Hello, Kim
person.greet.apply(user);  // Hello, Kim
```

두 메서드 모두 첫 번째 인수로 `this`를 지정하고 함수를 실행한다.

### call과 apply의 차이

두 번째 이후 인수를 전달하는 방식이 다르다.

```javascript
function introduce(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const user = { name: 'Kim' };

introduce.call(user, 'Hello', '!');     // Hello, Kim!
introduce.apply(user, ['Hello', '!']);  // Hello, Kim!
```

`call`은 인수를 개별적으로, `apply`는 배열로 전달한다. 스프레드 연산자가 도입된 이후로는 `apply` 대신 스프레드 연산자를 사용하는 것이 더 간결하다.

---

## 사용 제한

스프레드 연산자는 특정 컨텍스트에서만 사용할 수 있다.

- 함수 호출의 인수
- 배열 리터럴
- 객체 리터럴

단독으로 사용하면 문법 오류가 발생한다.

```javascript
// 유효한 사용
console.log(...[1, 2, 3]);
const arr = [...[1, 2, 3]];
const obj = { ...{ a: 1 } };

// 문법 오류
...[1, 2, 3];  // SyntaxError
```

---

## 우테코 활용 예시

### 배열 불변성 유지

원본 배열을 변경하지 않고 새로운 배열을 생성할 때 스프레드 연산자를 활용한다.

```javascript
class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = [...numbers].sort((a, b) => a - b);
  }

  getNumbers() {
    return [...this.#numbers];
  }

  #validate(numbers) {
    // 유효성 검증 로직
  }
}
```

생성자에서 입력받은 배열을 복사하여 외부 변경으로부터 보호하고, getter에서도 복사본을 반환하여 내부 상태의 불변성을 유지한다.

### Math 함수와 함께 사용

배열에서 최댓값, 최솟값을 구할 때 스프레드 연산자가 유용하다.

```javascript
class RaceController {
  #cars;

  getWinners() {
    const positions = this.#cars.map(car => car.getPosition());
    const maxPosition = Math.max(...positions);
    return this.#cars.filter(car => car.getPosition() === maxPosition);
  }
}
```

`Math.max`와 `Math.min`은 개별 숫자를 인수로 받으므로, 배열의 경우 스프레드 연산자로 펼쳐서 전달해야 한다.

### 객체 병합을 통한 상태 업데이트

기존 객체의 일부 프로퍼티만 변경할 때 스프레드 연산자를 활용한다.

```javascript
class GameResult {
  #result;

  constructor() {
    this.#result = {
      FIRST: 0,
      SECOND: 0,
      THIRD: 0,
      FOURTH: 0,
      FIFTH: 0,
    };
  }

  addRank(rank) {
    this.#result = {
      ...this.#result,
      [rank]: this.#result[rank] + 1,
    };
  }

  getResult() {
    return { ...this.#result };
  }
}
```

기존 상태를 펼치고 특정 프로퍼티만 덮어쓰는 패턴은 불변성을 유지하면서 상태를 업데이트할 때 자주 사용된다.

### 함수 인수 전달

여러 개의 값을 함수에 전달할 때 배열로 관리하다가 스프레드 연산자로 펼쳐서 전달한다.

```javascript
class LottoGenerator {
  generate(count) {
    return Array.from({ length: count }, () => this.#generateLotto());
  }

  #generateLotto() {
    const numbers = Random.pickUniqueNumbersInRange(
      LOTTO.MIN_NUMBER,
      LOTTO.MAX_NUMBER,
      LOTTO.COUNT
    );
    return new Lotto(numbers);
  }
}
```

`Random.pickUniqueNumbersInRange`가 반환하는 배열을 `Lotto` 생성자에 전달할 때, 생성자 내부에서 스프레드 연산자로 복사하여 사용한다.
