# Extends & Super

## 정의

extends는 기존 class를 복사하여 새로운 class를 만드는 문법이다. 이를 상속(inheritance)이라고 부른다. 비슷한 구조의 class가 여러 개 필요할 때, 공통 부분을 부모 class에 정의하고 자식 class에서 extends로 상속받아 사용한다. super는 부모 class의 constructor나 prototype에 접근할 때 사용하는 키워드다.

---

## 기본 문법

`class 자식 extends 부모` 형태로 작성하면 부모 class의 constructor 내용이 자식 class로 복사된다.

```javascript
class User {
  constructor(id) {
    this.id = id;
    this.email = id + '@example.com';
  }
}

class SellerUser extends User {

}

const seller = new SellerUser('kim');
console.log(seller);  // { id: 'kim', email: 'kim@example.com' }
```

SellerUser는 아무 내용도 없지만, User를 상속받았기 때문에 `id`와 `email` 프로퍼티를 가진 인스턴스가 생성된다.

---

## super()의 필요성

자식 class에서 constructor를 정의할 때는 반드시 `super()`를 먼저 호출해야 한다. super()는 부모 class의 constructor를 실행하는 함수다.

```javascript
class User {
  constructor(id) {
    this.id = id;
  }
}

class SellerUser extends User {
  constructor(id) {
    // super() 없이 this 사용하면 에러 발생
    this.company = 'samsung';  // ReferenceError
  }
}
```

자식 class에서 `this`를 사용하려면 super()가 먼저 실행되어야 한다. 이는 JavaScript 엔진이 강제하는 규칙이다.

```javascript
class User {
  constructor(id) {
    this.id = id;
  }
}

class SellerUser extends User {
  constructor(id) {
    super(id);  // 부모 constructor 먼저 실행
    this.company = 'samsung';
  }
}

const seller = new SellerUser('kim');
console.log(seller);  // { id: 'kim', company: 'samsung' }
```

super(id)를 호출하면 부모 class의 `constructor(id)`가 실행되어 `this.id = id`가 먼저 처리된다. 그 후에 자식 class의 `this.company`가 추가된다.

---

## 파라미터 전달

부모 class의 constructor에 파라미터가 있다면, super()에도 동일하게 전달해야 한다.

```javascript
class User {
  constructor(id, email) {
    this.id = id;
    this.email = email;
  }
}

class SellerUser extends User {
  constructor(id, email, company) {
    super(id, email);  // 부모에게 id, email 전달
    this.company = company;
  }
}

const seller = new SellerUser('kim', 'kim@shop.com', 'samsung');
console.log(seller);
// { id: 'kim', email: 'kim@shop.com', company: 'samsung' }
```

super()에 파라미터를 전달하지 않으면 부모의 프로퍼티가 undefined가 된다.

```javascript
class SellerUser extends User {
  constructor(id, email, company) {
    super();  // 파라미터 누락
    this.company = company;
  }
}

const seller = new SellerUser('kim', 'kim@shop.com', 'samsung');
console.log(seller);
// { id: undefined, email: undefined, company: 'samsung' }
```

---

## 메서드 상속

부모 class에 정의된 메서드는 자식 class의 인스턴스에서도 사용할 수 있다.

```javascript
class User {
  constructor(id) {
    this.id = id;
  }

  sayHi() {
    console.log('안녕 ' + this.id);
  }
}

class SellerUser extends User {
  constructor(id) {
    super(id);
    this.company = 'samsung';
  }
}

const seller = new SellerUser('kim');
seller.sayHi();  // '안녕 kim'
```

이것이 가능한 이유는 prototype chain 때문이다. `seller.sayHi()`를 호출하면 먼저 seller 객체에서 sayHi를 찾고, 없으면 SellerUser.prototype에서 찾고, 없으면 User.prototype에서 찾는다.

---

## super로 부모 메서드 호출

자식 class의 메서드 내부에서 `super.메서드()`를 사용하면 부모 class의 메서드를 호출할 수 있다.

```javascript
class User {
  constructor(id) {
    this.id = id;
  }

  sayHi() {
    console.log('안녕 ' + this.id);
  }
}

class SellerUser extends User {
  constructor(id) {
    super(id);
    this.company = 'samsung';
  }

  sayHi() {
    super.sayHi();  // 부모의 sayHi() 호출
    console.log('판매자입니다');
  }
}

const seller = new SellerUser('kim');
seller.sayHi();
// '안녕 kim'
// '판매자입니다'
```

super의 의미는 위치에 따라 다르다.

- constructor 내부: `super()` → 부모 class의 constructor
- 메서드 내부: `super.메서드()` → 부모 class의 prototype

---

## 메서드 오버라이딩

자식 class에서 부모와 동일한 이름의 메서드를 정의하면, 자식의 메서드가 우선 사용된다. 이를 오버라이딩(overriding)이라고 한다.

```javascript
class User {
  constructor(id) {
    this.id = id;
  }

  getInfo() {
    return this.id;
  }
}

class SellerUser extends User {
  constructor(id, company) {
    super(id);
    this.company = company;
  }

  getInfo() {
    return this.id + ' (' + this.company + ')';
  }
}

const user = new User('kim');
const seller = new SellerUser('park', 'samsung');

console.log(user.getInfo());    // 'kim'
console.log(seller.getInfo());  // 'park (samsung)'
```

---

## 상속의 주의점

상속을 여러 단계로 연결하면 구조가 복잡해진다. 부모 → 자식 → 손자 형태의 상속 체인이 길어지면 코드 파악이 어려워지므로 적당한 깊이를 유지하는 것이 좋다.

```javascript
// 과도한 상속 체인 (비권장)
class A {}
class B extends A {}
class C extends B {}
class D extends C {}
class E extends D {}
```

상속보다 조합(composition)이 더 유연한 경우가 많다. 상속은 "is-a" 관계(SellerUser는 User다)에 적합하고, 조합은 "has-a" 관계(Car는 Engine을 가진다)에 적합하다.

---

## 우테코 활용 예시

### 로또 번호 검증 상속

기본 검증 로직을 가진 부모 class와 추가 검증이 필요한 자식 class를 분리할 수 있다.

```javascript
class NumberValidator {
  #numbers;

  constructor(numbers) {
    this.#validateCount(numbers);
    this.#validateDuplicates(numbers);
    this.#numbers = [...numbers];
  }

  #validateCount(numbers) {
    if (numbers.length !== 6) {
      throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');
    }
  }

  #validateDuplicates(numbers) {
    if (new Set(numbers).size !== numbers.length) {
      throw new Error('[ERROR] 중복된 번호가 있습니다.');
    }
  }

  getNumbers() {
    return [...this.#numbers];
  }
}

class Lotto extends NumberValidator {
  constructor(numbers) {
    super(numbers);
    this.#validateRange(numbers);
  }

  #validateRange(numbers) {
    const isInvalid = numbers.some(num => num < 1 || num > 45);
    if (isInvalid) {
      throw new Error('[ERROR] 번호는 1~45 사이여야 합니다.');
    }
  }

  getMatchCount(winningNumbers) {
    return this.getNumbers().filter(num => winningNumbers.includes(num)).length;
  }
}

const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
console.log(lotto.getMatchCount([1, 2, 3, 7, 8, 9]));  // 3
```

### 자동차 타입별 분리

기본 Car class를 상속받아 다른 이동 조건을 가진 자동차를 구현할 수 있다.

```javascript
class Car {
  #name;
  #position;

  constructor(name) {
    this.#validateName(name);
    this.#name = name;
    this.#position = 0;
  }

  #validateName(name) {
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

class FastCar extends Car {
  constructor(name) {
    super(name);
  }

  move(condition) {
    if (condition >= 3) {  // 더 낮은 조건으로 전진
      super.move(4);  // 부모의 move 호출 (condition >= 4이면 전진)
    }
  }
}

const normalCar = new Car('pobi');
const fastCar = new FastCar('woni');

normalCar.move(3);  // 전진 안 함
fastCar.move(3);    // 전진함

console.log(normalCar.getStatus());  // 'pobi : '
console.log(fastCar.getStatus());    // 'woni : -'
```

### InputView와 OutputView 분리

공통 View 기능을 상속받아 입출력을 분리하는 패턴이다.

```javascript
class View {
  print(message) {
    console.log(message);
  }

  printError(message) {
    console.log(`[ERROR] ${message}`);
  }
}

class OutputView extends View {
  printResult(result) {
    this.print(`결과 : ${result}`);
  }

  printWinners(winners) {
    const names = winners.map(car => car.getName()).join(', ');
    this.print(`최종 우승자 : ${names}`);
  }
}
```

---

## 용어 정리

- extends: 부모 class를 상속받는 키워드
- super(): 부모 class의 constructor를 호출하는 함수
- super.method(): 부모 class의 prototype 메서드를 호출
- inheritance(상속): class 간에 속성과 메서드를 물려받는 것
- overriding(오버라이딩): 부모 메서드를 자식에서 재정의하는 것
- parent/child class: 부모/자식 관계의 class (base/derived라고도 함)
