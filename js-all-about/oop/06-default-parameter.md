# Default Parameter & Arguments

## 정의

기본 매개변수(Default Parameter)는 ES6에서 도입된 문법으로, 함수 호출 시 인수가 전달되지 않았을 때 사용할 기본값을 지정할 수 있다. `arguments` 객체는 함수에 전달된 모든 인수를 유사 배열 형태로 접근할 수 있게 해주는 내장 객체다.

---

## Default Parameter

### 기본 사용법

함수 매개변수에 등호(`=`)를 사용하여 기본값을 지정한다. 해당 매개변수에 인수가 전달되지 않거나 `undefined`가 전달되면 기본값이 사용된다.

```javascript
function greet(name = 'Guest') {
  console.log(`Hello, ${name}!`);
}

greet('Kim');     // Hello, Kim!
greet();          // Hello, Guest!
greet(undefined); // Hello, Guest!
```

기본값은 인수가 `undefined`일 때만 적용된다. `null`이나 빈 문자열은 유효한 값으로 취급되어 기본값이 적용되지 않는다.

```javascript
greet(null);  // Hello, null!
greet('');    // Hello, !
```

### 표현식을 기본값으로 사용

기본값으로 단순 값뿐 아니라 표현식을 사용할 수 있다. 표현식은 함수가 호출될 때 평가된다.

```javascript
function createId(prefix = 'ID', number = Date.now()) {
  return `${prefix}-${number}`;
}

console.log(createId());  // ID-1699999999999 (호출 시점의 타임스탬프)
```

### 다른 매개변수 참조

기본값 표현식에서 앞서 정의된 매개변수를 참조할 수 있다. 단, 뒤에 정의된 매개변수는 참조할 수 없다.

```javascript
function multiply(a, b = a * 2) {
  return a * b;
}

console.log(multiply(3));     // 18 (3 * 6)
console.log(multiply(3, 4));  // 12 (3 * 4)
```

### 함수 호출을 기본값으로 사용

함수 호출 결과를 기본값으로 사용할 수 있다. 해당 함수는 기본값이 필요할 때만 호출된다.

```javascript
function getDefaultValue() {
  console.log('기본값 함수 호출됨');
  return 10;
}

function calculate(a, b = getDefaultValue()) {
  return a + b;
}

calculate(5, 3);  // 8 (getDefaultValue 호출되지 않음)
calculate(5);     // 15 (getDefaultValue 호출됨)
```

---

## arguments 객체

`arguments`는 함수 내부에서 자동으로 생성되는 유사 배열 객체로, 함수에 전달된 모든 인수에 접근할 수 있다.

### 기본 사용법

```javascript
function showArguments() {
  console.log(arguments);
  console.log(arguments.length);
}

showArguments(1, 2, 3);
// Arguments(3) [1, 2, 3]
// 3
```

매개변수를 선언하지 않아도 전달된 모든 인수에 접근할 수 있다.

### 인덱스로 접근

```javascript
function sum() {
  let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}

console.log(sum(1, 2, 3, 4, 5));  // 15
```

### 유사 배열 객체의 한계

`arguments`는 배열이 아니라 유사 배열 객체(Array-like Object)다. `length` 프로퍼티와 인덱스 접근은 가능하지만, 배열 메서드(`map`, `filter`, `reduce` 등)는 직접 사용할 수 없다.

```javascript
function double() {
  // TypeError: arguments.map is not a function
  return arguments.map(x => x * 2);
}
```

배열 메서드를 사용하려면 배열로 변환해야 한다.

```javascript
function double() {
  const arr = [...arguments];  // 또는 Array.from(arguments)
  return arr.map(x => x * 2);
}

console.log(double(1, 2, 3));  // [2, 4, 6]
```

### 화살표 함수에서는 사용 불가

화살표 함수는 자체 `arguments` 객체를 가지지 않는다. 화살표 함수 내에서 `arguments`를 참조하면 외부 스코프의 `arguments`를 참조하게 된다.

```javascript
function outer() {
  const inner = () => {
    console.log(arguments);  // outer의 arguments
  };
  inner();
}

outer(1, 2, 3);  // Arguments(3) [1, 2, 3]
```

---

## Rest Parameter (나머지 매개변수)

ES6에서 도입된 Rest Parameter는 `arguments` 객체의 현대적인 대안이다. 세 개의 점(`...`)과 매개변수명을 사용하여 정의한다.

```javascript
function sum(...numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

console.log(sum(1, 2, 3, 4, 5));  // 15
```

### Rest Parameter의 장점

Rest Parameter는 실제 배열이므로 배열 메서드를 직접 사용할 수 있다.

```javascript
function double(...numbers) {
  return numbers.map(x => x * 2);
}

console.log(double(1, 2, 3));  // [2, 4, 6]
```

일부 매개변수를 개별로 받고 나머지를 배열로 받을 수 있다.

```javascript
function greetAll(greeting, ...names) {
  return names.map(name => `${greeting}, ${name}!`);
}

console.log(greetAll('Hello', 'Kim', 'Park', 'Lee'));
// ['Hello, Kim!', 'Hello, Park!', 'Hello, Lee!']
```

Rest Parameter는 반드시 마지막 매개변수여야 한다.

---

## 우테코 활용 예시

### 기본값을 활용한 설정 객체

설정 객체에 기본값을 제공하여 선택적 옵션을 처리한다.

```javascript
class LottoGame {
  #config;

  constructor(config = {}) {
    this.#config = {
      minNumber: config.minNumber ?? 1,
      maxNumber: config.maxNumber ?? 45,
      count: config.count ?? 6,
      price: config.price ?? 1000,
    };
  }
}
```

### Rest Parameter로 가변 인수 처리

여러 개의 인수를 받아 처리해야 하는 경우 Rest Parameter를 활용한다.

```javascript
class Validator {
  static validateAll(value, ...validators) {
    validators.forEach(validator => {
      if (!validator(value)) {
        throw new Error('[ERROR] 유효성 검증에 실패했습니다.');
      }
    });
  }
}

const isPositive = n => n > 0;
const isInteger = n => Number.isInteger(n);
const isInRange = n => n >= 1 && n <= 45;

Validator.validateAll(25, isPositive, isInteger, isInRange);
```

### 에러 메시지 생성 함수

기본값과 Rest Parameter를 조합하여 유연한 에러 메시지 생성 함수를 만든다.

```javascript
class ErrorMessage {
  static create(template, ...values) {
    return values.reduce(
      (message, value, index) => message.replace(`{${index}}`, value),
      template
    );
  }
}

const message = ErrorMessage.create(
  '[ERROR] {0}은(는) {1}자 이하여야 합니다.',
  '자동차 이름',
  5
);
// '[ERROR] 자동차 이름은(는) 5자 이하여야 합니다.'
```

### 배열 메서드와 함께 활용

Rest Parameter로 받은 배열을 배열 메서드와 함께 활용하여 데이터를 처리한다.

```javascript
class Calculator {
  static sum(...numbers) {
    return numbers.reduce((acc, num) => acc + num, 0);
  }

  static average(...numbers) {
    if (numbers.length === 0) return 0;
    return Calculator.sum(...numbers) / numbers.length;
  }

  static max(...numbers) {
    return Math.max(...numbers);
  }
}

const scores = [85, 90, 78, 92, 88];
console.log(Calculator.average(...scores));  // 86.6
```
