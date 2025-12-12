# Arrow Function

## 정의

화살표 함수(Arrow Function)는 ES6에서 도입된 함수 표현식의 간결한 문법이다. `function` 키워드 대신 화살표(`=>`)를 사용하여 함수를 정의하며, 렉시컬 `this` 바인딩이라는 특징을 가진다.

---

## 기본 문법

### 함수 선언 방식 비교

기존 자바스크립트에서 함수를 선언하는 방식은 두 가지다.

```javascript
// 함수 선언문
function add(a, b) {
  return a + b;
}

// 함수 표현식
const add = function(a, b) {
  return a + b;
};
```

화살표 함수는 함수 표현식의 간결한 대안으로 사용된다.

```javascript
const add = (a, b) => {
  return a + b;
};
```

### 문법 단축 규칙

화살표 함수는 특정 조건에서 더 간결하게 작성할 수 있다.

파라미터가 하나인 경우 소괄호를 생략할 수 있다.

```javascript
const double = x => {
  return x * 2;
};
```

함수 본문이 단일 표현식인 경우 중괄호와 `return` 키워드를 생략할 수 있다. 이 경우 표현식의 결과가 암묵적으로 반환된다.

```javascript
const double = x => x * 2;
```

객체 리터럴을 반환할 때는 소괄호로 감싸야 한다. 중괄호가 함수 본문이 아닌 객체 리터럴임을 명시하기 위함이다.

```javascript
const createPerson = (name, age) => ({ name, age });
```

---

## 렉시컬 this 바인딩

화살표 함수의 가장 중요한 특징은 자체적인 `this` 바인딩을 생성하지 않는다는 것이다. 대신 함수가 정의된 시점의 외부 스코프에서 `this`를 상속받는다. 이를 렉시컬 `this`(Lexical this)라고 한다.

### 일반 함수와의 차이

일반 함수에서 `this`는 함수 호출 방식에 따라 동적으로 결정된다.

```javascript
const obj = {
  name: 'Kim',
  greet: function() {
    console.log(this.name);
  }
};

obj.greet();  // 'Kim'
```

화살표 함수를 메서드로 사용하면 `this`가 해당 객체를 참조하지 않는다.

```javascript
const obj = {
  name: 'Kim',
  greet: () => {
    console.log(this.name);
  }
};

obj.greet();  // undefined (this가 window를 참조)
```

화살표 함수는 정의 시점의 외부 스코프 `this`를 사용하므로, 전역 스코프에서 정의된 경우 `this`가 전역 객체를 참조하게 된다.

### 콜백 함수에서의 활용

화살표 함수는 콜백 함수에서 외부 컨텍스트의 `this`를 유지해야 할 때 유용하다.

일반 함수를 콜백으로 사용할 경우 `this` 바인딩 문제가 발생한다.

```javascript
const timer = {
  seconds: 0,
  start: function() {
    setInterval(function() {
      this.seconds++;  // this가 window를 참조
      console.log(this.seconds);
    }, 1000);
  }
};

timer.start();  // NaN (window.seconds가 undefined)
```

화살표 함수를 사용하면 외부 함수의 `this`를 그대로 사용할 수 있다.

```javascript
const timer = {
  seconds: 0,
  start: function() {
    setInterval(() => {
      this.seconds++;  // this가 timer를 참조
      console.log(this.seconds);
    }, 1000);
  }
};

timer.start();  // 1, 2, 3, ...
```

---

## 화살표 함수를 사용하면 안 되는 경우

### 객체 메서드

객체의 메서드로 화살표 함수를 사용하면 `this`가 해당 객체를 참조하지 않으므로 일반 함수를 사용해야 한다.

```javascript
// 잘못된 사용
const person = {
  name: 'Kim',
  getName: () => this.name  // undefined
};

// 올바른 사용
const person = {
  name: 'Kim',
  getName() {
    return this.name;
  }
};
```

### 생성자 함수

화살표 함수는 생성자로 사용할 수 없다. `new` 키워드와 함께 호출하면 에러가 발생한다.

```javascript
const Person = (name) => {
  this.name = name;
};

const person = new Person('Kim');  // TypeError: Person is not a constructor
```

### 이벤트 핸들러에서 DOM 요소 참조

이벤트 핸들러에서 `this`로 DOM 요소에 접근해야 하는 경우 일반 함수를 사용해야 한다.

```javascript
// this로 DOM 요소에 접근 불가
button.addEventListener('click', () => {
  this.classList.add('active');  // this가 window
});

// this로 DOM 요소에 접근 가능
button.addEventListener('click', function() {
  this.classList.add('active');  // this가 button 요소
});
```

---

## 우테코 활용 예시

### 배열 메서드 콜백

배열의 고차 함수(`map`, `filter`, `reduce` 등)에서 화살표 함수를 사용하면 간결한 코드를 작성할 수 있다.

```javascript
class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
  }

  getMatchCount(winningNumbers) {
    return this.#numbers.filter(number =>
      winningNumbers.includes(number)
    ).length;
  }

  getSortedNumbers() {
    return [...this.#numbers].sort((a, b) => a - b);
  }
}
```

`filter`와 `sort`의 콜백을 화살표 함수로 작성하여 가독성을 높였다. 동시에 클래스 메서드 내부이므로 `this`가 인스턴스를 유지하여 `this.#numbers`에 정상적으로 접근할 수 있다.

### 입력 처리 및 변환

입력값을 파싱하고 변환하는 로직에서 화살표 함수를 활용할 수 있다.

```javascript
class InputParser {
  static parseCarNames(input) {
    return input
      .split(',')
      .map(name => name.trim())
      .filter(name => name.length > 0);
  }

  static parseNumbers(input) {
    return input
      .split(',')
      .map(str => Number(str.trim()));
  }
}
```

메서드 체이닝과 화살표 함수를 조합하면 데이터 변환 파이프라인을 선언적으로 표현할 수 있다.

### 클래스 메서드 내 콜백

클래스 메서드에서 배열을 순회하며 인스턴스 상태를 변경할 때 화살표 함수를 사용하면 `this` 바인딩 문제를 피할 수 있다.

```javascript
class RaceController {
  #cars;

  constructor() {
    this.#cars = [];
  }

  initCars(names) {
    this.#cars = names.map(name => new Car(name));
  }

  playRound(moveCondition) {
    this.#cars.forEach(car => {
      if (moveCondition() >= 4) {
        car.move();
      }
    });
  }

  getWinners() {
    const maxPosition = Math.max(...this.#cars.map(car => car.getPosition()));
    return this.#cars.filter(car => car.getPosition() === maxPosition);
  }
}
```

모든 배열 메서드의 콜백을 화살표 함수로 작성하여 `this`가 `RaceController` 인스턴스를 유지하도록 했다.
