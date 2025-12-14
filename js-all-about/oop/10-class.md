# Class

## 정의

Class는 ES6에서 도입된 문법으로, constructor와 prototype을 더 명확하고 직관적으로 작성할 수 있게 해준다. 내부적으로는 기존 prototype 기반 상속과 동일하게 동작하지만, 문법이 깔끔하고 다른 언어의 클래스 문법과 유사하여 가독성이 높다. 우테코를 포함한 현대 자바스크립트 개발에서 객체 생성의 표준 방식으로 사용된다.

---

## 기본 문법

`class` 키워드와 함께 클래스명을 대문자로 시작하여 정의한다. 내부에 `constructor()` 메서드를 작성하면 인스턴스 생성 시 자동으로 실행된다.

```javascript
class User {
  constructor() {
    this.name = 'Kim';
    this.phone = '1234';
  }
}

const user1 = new User();
console.log(user1);  // { name: 'Kim', phone: '1234' }
```

`new` 키워드로 인스턴스를 생성하면 `constructor()` 내부 코드가 실행되어 `this`에 프로퍼티가 추가된다. 기존 function 기반 constructor와 동작은 동일하지만 문법이 더 명확하다.

---

## 파라미터 활용

`constructor()`에 파라미터를 정의하면 인스턴스 생성 시 다른 값을 전달할 수 있다.

```javascript
class User {
  constructor(name, phone) {
    this.name = name;
    this.phone = phone;
  }
}

const user1 = new User('Kim', '1234');
const user2 = new User('Park', '5678');

console.log(user1);  // { name: 'Kim', phone: '1234' }
console.log(user2);  // { name: 'Park', phone: '5678' }
```

파라미터로 전달받은 값을 `this.프로퍼티`에 할당하여 매번 다른 데이터를 가진 인스턴스를 생성할 수 있다.

---

## 메서드 추가

클래스에 메서드를 추가하는 방법은 두 가지가 있다.

### constructor 내부에 추가

```javascript
class User {
  constructor(name, phone) {
    this.name = name;
    this.phone = phone;
    this.printAll = function() {
      console.log(this.name + ' ' + this.phone);
    };
  }
}
```

이 방식은 인스턴스마다 함수가 복사되어 생성된다. 메모리를 더 사용하지만, 인스턴스별로 다른 동작이 필요할 때 사용할 수 있다.

### constructor 바깥에 추가 (권장)

```javascript
class User {
  constructor(name, phone) {
    this.name = name;
    this.phone = phone;
  }

  printAll() {
    console.log(this.name + ' ' + this.phone);
  }
}
```

`constructor()` 바깥에 메서드를 정의하면 자동으로 `User.prototype`에 추가된다. 모든 인스턴스가 하나의 함수를 공유하므로 메모리 효율적이다. 일반적으로 이 방식을 사용한다.

```javascript
const user1 = new User('Kim', '1234');
const user2 = new User('Park', '5678');

// 같은 함수를 공유
console.log(user1.printAll === user2.printAll);  // true
```

---

## 필드 (Field)

ES2022부터 클래스 필드를 `constructor` 없이 직접 정의할 수 있다.

```javascript
class User {
  name = 'Kim';
  phone = '1234';

  printAll() {
    console.log(this.name + ' ' + this.phone);
  }
}

const user = new User();
console.log(user.name);  // 'Kim'
```

필드는 인스턴스 프로퍼티로 추가된다. 단, 외부에서 전달받은 값을 사용하려면 여전히 `constructor`가 필요하다.

```javascript
class User {
  role = 'member';  // 기본값은 필드로

  constructor(name, phone) {
    this.name = name;   // 파라미터 값은 constructor에서
    this.phone = phone;
  }
}
```

---

## Private 필드 (#)

ES2022부터 `#`을 붙여 private 필드를 정의할 수 있다. 클래스 외부에서 접근이 불가능하다.

```javascript
class User {
  #password;

  constructor(name, password) {
    this.name = name;
    this.#password = password;
  }

  checkPassword(input) {
    return this.#password === input;
  }
}

const user = new User('Kim', 'secret123');

console.log(user.name);       // 'Kim'
console.log(user.#password);  // SyntaxError: Private field
console.log(user.checkPassword('secret123'));  // true
```

private 필드는 외부에서 직접 접근하거나 수정할 수 없다. 내부 상태를 보호하고 캡슐화를 구현할 때 사용한다.

### private 메서드

메서드도 `#`을 붙여 private으로 만들 수 있다.

```javascript
class User {
  #name;

  constructor(name) {
    this.#validate(name);
    this.#name = name;
  }

  #validate(name) {
    if (name.length === 0) {
      throw new Error('[ERROR] 이름은 비어있을 수 없습니다.');
    }
  }

  getName() {
    return this.#name;
  }
}
```

`#validate()`는 클래스 내부에서만 호출 가능하다. 외부에 노출할 필요 없는 내부 로직을 숨길 때 유용하다.

---

## Static 메서드와 프로퍼티

`static` 키워드를 사용하면 인스턴스가 아닌 클래스 자체에 속하는 메서드나 프로퍼티를 정의할 수 있다.

```javascript
class Calculator {
  static PI = 3.14159;

  static add(a, b) {
    return a + b;
  }

  static multiply(a, b) {
    return a * b;
  }
}

console.log(Calculator.PI);           // 3.14159
console.log(Calculator.add(2, 3));    // 5
console.log(Calculator.multiply(2, 3)); // 6

const calc = new Calculator();
console.log(calc.add);  // undefined (인스턴스에서 접근 불가)
```

static 메서드는 인스턴스 없이 `클래스명.메서드()`로 호출한다. 유틸리티 함수나 팩토리 메서드에 적합하다.

---

## constructor 함수와 비교

기존 function 기반 constructor와 class는 동일하게 동작한다.

```javascript
// function 기반 constructor
function User(name) {
  this.name = name;
}
User.prototype.sayHi = function() {
  console.log('안녕 ' + this.name);
};

// class 문법
class User {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    console.log('안녕 ' + this.name);
  }
}
```

class 문법의 장점은 다음과 같다.

- 문법이 직관적이고 가독성이 좋다
- prototype을 직접 다루지 않아도 된다
- private 필드, static 메서드 등 추가 기능 지원
- `new` 없이 호출하면 에러 발생 (실수 방지)

```javascript
// function은 new 없이 호출해도 에러 안 남
function User(name) {
  this.name = name;
}
User('Kim');  // 에러 없음, window.name = 'Kim'

// class는 new 없이 호출하면 에러
class User {
  constructor(name) {
    this.name = name;
  }
}
User('Kim');  // TypeError: Class constructor User cannot be invoked without 'new'
```

---

## 우테코 활용 예시

### 자동차 경주 Car 클래스

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

  getName() {
    return this.#name;
  }

  getPosition() {
    return this.#position;
  }

  getStatus() {
    return `${this.#name} : ${'-'.repeat(this.#position)}`;
  }
}

const car = new Car('pobi');
car.move(5);
car.move(3);
car.move(6);
console.log(car.getStatus());  // 'pobi : --'
```

### 로또 Lotto 클래스

```javascript
class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = [...numbers];
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');
    }
    if (new Set(numbers).size !== 6) {
      throw new Error('[ERROR] 로또 번호에 중복이 있습니다.');
    }
  }

  getNumbers() {
    return [...this.#numbers];
  }

  getMatchCount(winningNumbers) {
    return this.#numbers.filter(num => winningNumbers.includes(num)).length;
  }

  hasNumber(number) {
    return this.#numbers.includes(number);
  }
}

const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
console.log(lotto.getMatchCount([1, 2, 3, 7, 8, 9]));  // 3
```

### Validator 유틸리티 클래스

static 메서드를 활용한 유틸리티 클래스 예시다.

```javascript
class Validator {
  static isPositiveNumber(value) {
    return typeof value === 'number' && value > 0;
  }

  static isInRange(value, min, max) {
    return value >= min && value <= max;
  }

  static hasNoDuplicates(array) {
    return new Set(array).size === array.length;
  }

  static validateCarName(name) {
    if (name.length === 0 || name.length > 5) {
      throw new Error('[ERROR] 자동차 이름은 1자 이상 5자 이하여야 합니다.');
    }
  }
}

// 인스턴스 생성 없이 사용
Validator.validateCarName('pobi');
console.log(Validator.isPositiveNumber(10));  // true
console.log(Validator.hasNoDuplicates([1, 2, 3]));  // true
```

### 용어 정리

- Field: 클래스 내부에 정의된 변수 (인스턴스 프로퍼티)
- Method: 클래스 내부에 정의된 함수
- Constructor: 인스턴스 생성 시 자동 호출되는 초기화 메서드
- Instance: 클래스로부터 생성된 개별 객체
- Static: 인스턴스가 아닌 클래스 자체에 속하는 멤버
- Private: 클래스 외부에서 접근 불가능한 멤버 (`#` 사용)
