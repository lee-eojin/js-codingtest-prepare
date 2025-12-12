# this

## 정의

`this`는 함수가 호출될 때 결정되는 특별한 키워드로, 현재 실행 컨텍스트에서 참조하는 객체를 가리킨다. 정적으로 결정되는 것이 아니라 함수가 어떻게 호출되었는지에 따라 동적으로 바인딩된다.

---

## 1. 전역 컨텍스트와 일반 함수에서의 this

### 전역에서 this

전역 스코프에서 `this`를 참조하면 전역 객체를 가리킨다. 브라우저 환경에서는 `window`, Node.js 환경에서는 `global`이 전역 객체다.

```javascript
console.log(this);  // window (브라우저 환경)
```

### 일반 함수 내부에서 this

일반 함수 내부에서 `this`는 함수 호출 방식에 따라 결정된다. 단순 호출 시 전역 객체를 참조한다.

```javascript
function showThis() {
  console.log(this);
}

showThis();  // window
```

이러한 동작의 이유는 자바스크립트의 함수가 전역 객체의 메서드로 등록되기 때문이다.

```javascript
function greet() {
  console.log('hello');
}

// 위 선언은 다음과 동일하게 동작한다
window.greet = function() {
  console.log('hello');
};

greet();         // 'hello'
window.greet();  // 'hello'
```

전역에서 선언한 함수는 `window` 객체의 프로퍼티로 등록되므로, 해당 함수 내부의 `this`는 호출 주체인 `window`를 참조하게 된다.

### strict mode에서의 차이

`'use strict'` 모드에서는 일반 함수 내부의 `this`가 `undefined`가 된다. 이는 의도치 않은 전역 객체 참조를 방지하기 위한 설계다.

```javascript
'use strict';

function showThis() {
  console.log(this);
}

showThis();  // undefined
```

---

## 2. 메서드에서의 this

객체의 메서드로 호출된 함수 내부에서 `this`는 해당 메서드를 소유한 객체를 참조한다.

```javascript
const person = {
  name: 'Kim',
  greet: function() {
    console.log(this.name);
  }
};

person.greet();  // 'Kim'
```

`person.greet()`를 호출하면 `greet` 함수 내부의 `this`는 점(`.`) 연산자 앞의 객체인 `person`을 참조한다. 따라서 `this.name`은 `person.name`과 동일한 값을 반환한다.

### 중첩 객체에서의 this

중첩된 객체 구조에서 메서드를 호출할 때, `this`는 해당 메서드를 직접 소유한 객체만 참조한다.

```javascript
const company = {
  name: 'Woowa',
  team: {
    name: 'Frontend',
    getName: function() {
      return this.name;
    }
  }
};

console.log(company.team.getName());  // 'Frontend'
```

`company.team.getName()`을 호출하면 `this`는 `company`가 아닌 `team` 객체를 참조한다. 메서드 호출 시 점 연산자 바로 앞의 객체가 `this`로 바인딩되기 때문이다.

---

## 3. 화살표 함수에서의 this

화살표 함수는 자체적인 `this` 바인딩을 생성하지 않는다. 대신 렉시컬 스코프의 `this`를 그대로 사용한다. 이를 렉시컬 this(Lexical this)라고 한다.

```javascript
const person = {
  name: 'Kim',
  greet: function() {
    const inner = () => {
      console.log(this.name);
    };
    inner();
  }
};

person.greet();  // 'Kim'
```

화살표 함수 `inner` 내부의 `this`는 자신을 감싸는 외부 함수 `greet`의 `this`를 그대로 참조한다. `greet`의 `this`는 `person`이므로 'Kim'이 출력된다.

### 일반 함수와의 비교

동일한 상황에서 일반 함수를 사용하면 결과가 달라진다.

```javascript
const person = {
  name: 'Kim',
  greet: function() {
    const inner = function() {
      console.log(this.name);
    };
    inner();
  }
};

person.greet();  // undefined
```

일반 함수 `inner`는 단순 호출되었으므로 `this`가 전역 객체를 참조한다. 전역 객체에는 `name` 프로퍼티가 없으므로 `undefined`가 출력된다.

### 콜백 함수에서의 활용

화살표 함수는 콜백 함수에서 외부 컨텍스트의 `this`를 유지해야 할 때 유용하다.

```javascript
const counter = {
  count: 0,
  increment: function() {
    // 일반 함수: this가 undefined 또는 window
    [1, 2, 3].forEach(function() {
      this.count++;  // 동작하지 않음
    });
  }
};
```

```javascript
const counter = {
  count: 0,
  increment: function() {
    // 화살표 함수: 외부 this(counter) 유지
    [1, 2, 3].forEach(() => {
      this.count++;  // 정상 동작
    });
  }
};

counter.increment();
console.log(counter.count);  // 3
```

---

## this 바인딩 규칙 요약

1. 전역/일반 함수 호출: 전역 객체 (strict mode에서는 `undefined`)
2. 메서드 호출: 메서드를 소유한 객체
3. 화살표 함수: 렉시컬 스코프의 `this`

함수 호출 시 `this`를 판단하는 방법은 다음과 같다.

- 점(`.`) 연산자 앞에 객체가 있으면 그 객체가 `this`
- 없으면 전역 객체 (strict mode에서는 `undefined`)
- 화살표 함수면 외부 스코프의 `this`를 그대로 사용

---

## 우테코 활용 예시

클래스 기반 설계에서 `this`는 인스턴스를 참조하는 데 사용된다.

```javascript
class Car {
  #name;
  #position;

  constructor(name) {
    this.#name = name;
    this.#position = 0;
  }

  move() {
    this.#position++;
  }

  getStatus() {
    return `${this.#name} : ${'-'.repeat(this.#position)}`;
  }
}

const car = new Car('pobi');
car.move();
car.move();
console.log(car.getStatus());  // 'pobi : --'
```

클래스 내부에서 `this`는 `new` 키워드로 생성된 인스턴스를 가리킨다. `constructor`에서 `this.#name`으로 인스턴스의 private 필드에 값을 할당하고, 메서드에서 `this`로 해당 인스턴스의 상태에 접근한다.

### 콜백에서 this 유지하기

배열 메서드의 콜백에서 인스턴스 메서드를 호출할 때 화살표 함수를 사용하면 `this` 바인딩 문제를 피할 수 있다.

```javascript
class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
  }

  getMatchCount(winningNumbers) {
    return this.#numbers.filter((number) =>
      winningNumbers.includes(number)
    ).length;
  }
}
```

`filter`의 콜백을 화살표 함수로 작성하면 `this`가 `Lotto` 인스턴스를 유지하므로 `this.#numbers`에 정상적으로 접근할 수 있다.
