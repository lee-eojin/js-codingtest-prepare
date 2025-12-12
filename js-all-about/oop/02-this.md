# this (2) - 생성자 함수와 이벤트 리스너

## 이전 내용 복습

1. 일반 함수 호출: `this`는 전역 객체
2. 메서드 호출: `this`는 메서드를 소유한 객체
3. 화살표 함수: 렉시컬 스코프의 `this`를 상속

---

## 생성자 함수에서의 this

생성자 함수(Constructor Function)는 동일한 구조의 객체를 여러 개 생성하기 위한 템플릿 역할을 한다. 생성자 함수 내부의 `this`는 새로 생성될 인스턴스를 참조한다.

```javascript
function Person(name) {
  this.name = name;
}

const person1 = new Person('Kim');
const person2 = new Person('Park');

console.log(person1);  // { name: 'Kim' }
console.log(person2);  // { name: 'Park' }
```

`new` 키워드와 함께 생성자 함수를 호출하면 다음과 같은 과정이 진행된다.

1. 빈 객체가 생성되고 `this`에 바인딩된다
2. 생성자 함수 내부 코드가 실행되어 `this`에 프로퍼티를 추가한다
3. 완성된 객체가 반환된다

따라서 `this.name = name`은 새로 생성되는 인스턴스의 `name` 프로퍼티에 인자로 전달받은 값을 할당하는 것이다.

### 클래스 문법에서의 동일한 동작

ES6의 클래스 문법은 생성자 함수의 문법적 설탕(Syntactic Sugar)이다. `constructor` 내부의 `this`도 동일하게 새로 생성되는 인스턴스를 참조한다.

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
}

const person = new Person('Kim');
console.log(person.name);  // 'Kim'
```

---

## 이벤트 리스너에서의 this

이벤트 리스너의 콜백 함수 내부에서 `this`는 이벤트가 바인딩된 DOM 요소를 참조한다. 이는 `event.currentTarget`과 동일한 값이다.

```javascript
const button = document.getElementById('button');

button.addEventListener('click', function(event) {
  console.log(this === event.currentTarget);  // true
  console.log(this);  // <button id="button">...</button>
});
```

이벤트 리스너에서 `this`가 DOM 요소를 참조하는 것은 브라우저가 콜백 함수를 호출할 때 해당 요소를 `this`로 바인딩하기 때문이다.

### 화살표 함수를 사용한 경우

화살표 함수는 자체적인 `this` 바인딩이 없으므로, 이벤트 리스너에서 화살표 함수를 사용하면 DOM 요소가 아닌 외부 스코프의 `this`를 참조하게 된다.

```javascript
const button = document.getElementById('button');

button.addEventListener('click', (event) => {
  console.log(this);  // window (또는 외부 스코프의 this)
  console.log(event.currentTarget);  // <button id="button">...</button>
});
```

DOM 요소에 접근해야 할 경우 `this` 대신 `event.currentTarget`을 사용하거나, 일반 함수를 사용해야 한다.

---

## 콜백 함수에서의 this 바인딩 문제

콜백 함수는 함수의 인자로 전달되어 나중에 호출되는 함수다. 콜백 함수가 일반 함수로 작성된 경우, 호출 시점에 새로운 `this` 바인딩이 발생한다.

### 문제 상황

```javascript
const counter = {
  count: 0,
  increment: function() {
    [1, 2, 3].forEach(function(item) {
      this.count += item;  // this가 window를 참조
    });
  }
};

counter.increment();
console.log(counter.count);  // 0 (변경되지 않음)
```

`forEach`의 콜백 함수는 일반 함수이므로 내부의 `this`는 전역 객체를 참조한다. 따라서 `counter.count`가 아닌 `window.count`에 값을 더하게 되어 의도한 대로 동작하지 않는다.

### 해결 방법 1: 화살표 함수 사용

화살표 함수는 렉시컬 스코프의 `this`를 상속하므로 외부 함수의 `this`를 그대로 사용할 수 있다.

```javascript
const counter = {
  count: 0,
  increment: function() {
    [1, 2, 3].forEach((item) => {
      this.count += item;  // this가 counter를 참조
    });
  }
};

counter.increment();
console.log(counter.count);  // 6
```

### 해결 방법 2: this를 변수에 저장

화살표 함수가 도입되기 전에 사용되던 방식으로, 외부 함수의 `this`를 변수에 저장해두고 콜백 내부에서 해당 변수를 참조한다.

```javascript
const counter = {
  count: 0,
  increment: function() {
    const self = this;
    [1, 2, 3].forEach(function(item) {
      self.count += item;
    });
  }
};
```

### 해결 방법 3: bind 메서드 사용

`Function.prototype.bind`를 사용하여 `this`를 명시적으로 바인딩할 수 있다.

```javascript
const counter = {
  count: 0,
  increment: function() {
    [1, 2, 3].forEach(function(item) {
      this.count += item;
    }.bind(this));
  }
};
```

---

## 우테코 활용 예시

### 클래스 메서드에서 배열 순회

클래스 메서드 내부에서 배열 메서드를 사용할 때 화살표 함수를 활용하면 `this` 바인딩 문제를 피할 수 있다.

```javascript
class LottoGame {
  #lottos;
  #result;

  constructor(lottos) {
    this.#lottos = lottos;
    this.#result = { FIRST: 0, SECOND: 0, THIRD: 0, FOURTH: 0, FIFTH: 0 };
  }

  calculate(winningNumbers) {
    this.#lottos.forEach((lotto) => {
      const rank = this.#getRank(lotto, winningNumbers);
      if (rank) {
        this.#result[rank]++;
      }
    });
  }

  #getRank(lotto, winningNumbers) {
    // 순위 계산 로직
  }
}
```

`forEach`의 콜백을 화살표 함수로 작성하여 `this`가 `LottoGame` 인스턴스를 유지하도록 한다. 이를 통해 `this.#getRank`와 `this.#result`에 정상적으로 접근할 수 있다.

### 생성자에서 유효성 검증

생성자 함수 또는 클래스의 `constructor`에서 `this`를 사용하여 인스턴스의 초기 상태를 설정하고 유효성을 검증한다.

```javascript
class Car {
  #name;
  #position;

  constructor(name) {
    this.#validate(name);
    this.#name = name;
    this.#position = 0;
  }

  #validate(name) {
    if (name.length > 5) {
      throw new Error('[ERROR] 자동차 이름은 5자 이하만 가능합니다.');
    }
  }

  move(condition) {
    if (condition >= 4) {
      this.#position++;
    }
  }

  getStatus() {
    return { name: this.#name, position: this.#position };
  }
}
```

`this.#validate(name)`으로 유효성 검증 메서드를 호출하고, `this.#name`과 `this.#position`으로 인스턴스의 private 필드를 초기화한다.
