# Getter & Setter

## 정의

Getter와 Setter는 object나 class의 데이터를 직접 접근하지 않고 함수를 통해 간접적으로 다루는 패턴이다. `get` 키워드를 붙이면 소괄호 없이 값을 가져올 수 있고, `set` 키워드를 붙이면 등호로 값을 설정할 수 있다. 데이터의 무결성을 보존하고 실수를 방지하기 위해 사용한다.

---

## 함수로 데이터 꺼내기

object의 데이터를 직접 접근하는 대신 함수를 만들어 사용하면 안전하다.

```javascript
const person = {
  name: 'Kim',
  age: 30,
};

// 직접 접근
console.log(person.age + 1);  // 31

// 함수로 접근
const person2 = {
  name: 'Kim',
  age: 30,
  nextAge() {
    return this.age + 1;
  }
};

console.log(person2.nextAge());  // 31
```

함수를 사용하는 이유:
- 복잡한 데이터에서 원하는 값만 쉽게 추출 가능
- 원본 데이터를 직접 건드리지 않아 실수 방지
- 데이터 가공 로직을 한 곳에서 관리

---

## 함수로 데이터 수정하기

데이터 수정도 함수를 통해 하면 안전장치를 추가할 수 있다.

```javascript
const person = {
  name: 'Kim',
  age: 30,
};

// 직접 수정
person.age = 40;

// 함수로 수정
const person2 = {
  name: 'Kim',
  age: 30,
  setAge(newAge) {
    this.age = newAge;
  }
};

person2.setAge(40);
```

함수로 수정하면 검증 로직을 추가할 수 있다.

```javascript
const person = {
  name: 'Kim',
  age: 30,
  setAge(newAge) {
    this.age = parseInt(newAge);  // 문자열이 들어와도 숫자로 변환
  }
};

person.setAge('40');  // 문자열 입력
console.log(person.age);  // 40 (숫자)
console.log(typeof person.age);  // 'number'
```

직접 `person.age = '40'`으로 설정하면 문자열이 그대로 저장되어 나중에 연산 시 문제가 생길 수 있다. 함수를 사용하면 이런 실수를 방지할 수 있다.

---

## get 키워드

함수 앞에 `get`을 붙이면 소괄호 없이 프로퍼티처럼 접근할 수 있다.

```javascript
const person = {
  name: 'Kim',
  age: 30,
  get nextAge() {
    return this.age + 1;
  }
};

// get 없이: person.nextAge()
// get 있으면: person.nextAge (소괄호 없이)
console.log(person.nextAge);  // 31
```

get 함수의 규칙:
- 파라미터가 없어야 함
- return 문이 있어야 함

```javascript
const person = {
  name: 'Kim',
  age: 30,
  get info() {
    return `${this.name}, ${this.age}세`;
  }
};

console.log(person.info);  // 'Kim, 30세'
```

---

## set 키워드

함수 앞에 `set`을 붙이면 등호로 값을 할당하는 것처럼 사용할 수 있다.

```javascript
const person = {
  name: 'Kim',
  age: 30,
  set setAge(newAge) {
    this.age = parseInt(newAge);
  }
};

// set 없이: person.setAge(40)
// set 있으면: person.setAge = 40 (등호 사용)
person.setAge = 40;
console.log(person.age);  // 40
```

set 함수의 규칙:
- 파라미터가 정확히 1개 있어야 함

```javascript
const person = {
  name: 'Kim',
  age: 30,
  set age(newAge) {
    if (newAge < 0) {
      throw new Error('[ERROR] 나이는 0 이상이어야 합니다.');
    }
    this._age = newAge;  // 내부 저장용 변수
  },
  get age() {
    return this._age;
  }
};

person.age = 25;
console.log(person.age);  // 25
```

주의: getter/setter와 같은 이름의 프로퍼티가 있으면 무한루프가 발생할 수 있어서 내부 저장용 변수는 `_` 접두사를 붙이거나 다른 이름을 사용한다.

---

## Class에서 getter/setter

class 안에서도 동일하게 get/set 키워드를 사용할 수 있다.

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  get nextAge() {
    return this.age + 1;
  }

  set setAge(newAge) {
    this.age = newAge;
  }
}

const person = new Person('Kim', 30);
console.log(person.nextAge);  // 31

person.setAge = 40;
console.log(person.age);  // 40
```

---

## Private 필드와 getter/setter

private 필드(`#`)와 함께 사용하면 데이터를 더 안전하게 보호할 수 있다.

```javascript
class Person {
  #name;
  #age;

  constructor(name, age) {
    this.#name = name;
    this.#age = age;
  }

  get name() {
    return this.#name;
  }

  get age() {
    return this.#age;
  }

  set age(newAge) {
    if (typeof newAge !== 'number') {
      throw new Error('[ERROR] 나이는 숫자여야 합니다.');
    }
    if (newAge < 0) {
      throw new Error('[ERROR] 나이는 0 이상이어야 합니다.');
    }
    this.#age = newAge;
  }
}

const person = new Person('Kim', 30);
console.log(person.name);  // 'Kim'
console.log(person.age);   // 30

person.age = 40;           // setter 호출
console.log(person.age);   // 40

// person.#age = 50;       // SyntaxError (직접 접근 불가)
// person.age = '50';      // Error: 나이는 숫자여야 합니다.
```

private 필드는 외부에서 직접 접근할 수 없고, getter/setter를 통해서만 접근 가능하다. 이 조합으로 완전한 캡슐화를 구현할 수 있다.

---

## getter만 제공하기 (읽기 전용)

setter 없이 getter만 제공하면 읽기 전용 프로퍼티를 만들 수 있다.

```javascript
class Car {
  #name;
  #position;

  constructor(name) {
    this.#name = name;
    this.#position = 0;
  }

  get name() {
    return this.#name;
  }

  get position() {
    return this.#position;
  }

  move() {
    this.#position++;
  }
}

const car = new Car('pobi');
console.log(car.name);      // 'pobi'
console.log(car.position);  // 0

car.move();
console.log(car.position);  // 1

// car.name = 'woni';       // setter가 없어서 변경 안 됨 (무시됨)
// car.position = 100;      // setter가 없어서 변경 안 됨 (무시됨)
```

name과 position은 getter만 있어서 외부에서 읽을 수는 있지만 직접 수정할 수는 없다. position은 오직 move() 메서드를 통해서만 변경된다.

---

## 우테코 활용 예시

### Lotto 번호 조회

```javascript
class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = [...numbers].sort((a, b) => a - b);
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');
    }
    if (new Set(numbers).size !== 6) {
      throw new Error('[ERROR] 중복된 번호가 있습니다.');
    }
  }

  get numbers() {
    return [...this.#numbers];  // 복사본 반환
  }

  get formattedNumbers() {
    return `[${this.#numbers.join(', ')}]`;
  }
}

const lotto = new Lotto([3, 1, 4, 5, 6, 2]);
console.log(lotto.numbers);           // [1, 2, 3, 4, 5, 6]
console.log(lotto.formattedNumbers);  // '[1, 2, 3, 4, 5, 6]'
```

### Car 상태 조회

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

  get name() {
    return this.#name;
  }

  get position() {
    return this.#position;
  }

  get status() {
    return `${this.#name} : ${'-'.repeat(this.#position)}`;
  }

  move(condition) {
    if (condition >= 4) {
      this.#position++;
    }
  }
}

const car = new Car('pobi');
car.move(5);
car.move(3);
car.move(6);

console.log(car.name);      // 'pobi'
console.log(car.position);  // 2
console.log(car.status);    // 'pobi : --'
```

### 게임 결과 통계

```javascript
class GameResult {
  #results;

  constructor() {
    this.#results = {
      FIRST: 0,
      SECOND: 0,
      THIRD: 0,
      FOURTH: 0,
      FIFTH: 0,
    };
  }

  addResult(rank) {
    if (this.#results[rank] !== undefined) {
      this.#results[rank]++;
    }
  }

  get totalPrize() {
    const prizes = {
      FIRST: 2000000000,
      SECOND: 30000000,
      THIRD: 1500000,
      FOURTH: 50000,
      FIFTH: 5000,
    };

    return Object.entries(this.#results)
      .reduce((sum, [rank, count]) => sum + prizes[rank] * count, 0);
  }

  get profitRate() {
    const totalSpent = Object.values(this.#results)
      .reduce((sum, count) => sum + count, 0) * 1000;

    if (totalSpent === 0) return 0;
    return ((this.totalPrize / totalSpent) * 100).toFixed(1);
  }

  get summary() {
    return { ...this.#results };
  }
}

const result = new GameResult();
result.addResult('FIFTH');
result.addResult('FIFTH');
result.addResult('FOURTH');

console.log(result.summary);     // { FIRST: 0, SECOND: 0, THIRD: 0, FOURTH: 1, FIFTH: 2 }
console.log(result.totalPrize);  // 60000
console.log(result.profitRate);  // '2000.0'
```

---

## getter vs 일반 메서드

getter와 일반 메서드 중 선택 기준:

getter 사용:
- 단순히 값을 반환하는 경우
- 계산된 프로퍼티 (derived property)
- 파라미터가 필요 없는 경우

일반 메서드 사용:
- 파라미터가 필요한 경우
- 객체의 상태를 변경하는 경우
- 동작(action)을 나타내는 경우

```javascript
class Lotto {
  #numbers;

  // getter: 단순 반환, 파라미터 없음
  get numbers() {
    return [...this.#numbers];
  }

  // 메서드: 파라미터 필요
  getMatchCount(winningNumbers) {
    return this.#numbers.filter(n => winningNumbers.includes(n)).length;
  }

  // 메서드: 파라미터 필요
  hasNumber(number) {
    return this.#numbers.includes(number);
  }
}
```

---

## Tell, Don't Ask 원칙

getter를 사용할 때 가장 중요한 원칙은 "Tell, Don't Ask"다. 객체에게 데이터를 달라고 요청(ask)하지 말고, 행동을 지시(tell)하라는 의미다. 데이터를 가진 객체가 스스로 로직을 처리하도록 해야 한다.

### 문제가 되는 패턴

```javascript
class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
  }

  getNumbers() {
    return this.#numbers;
  }
}

class LottoGame {
  play() {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

    // 데이터를 꺼내서 외부에서 처리 (Bad)
    const hasBonus = lotto.getNumbers().includes(bonusNumber);
    const matchCount = lotto.getNumbers().filter(n => winning.includes(n)).length;
  }
}
```

이 코드의 문제점:
- Lotto 객체는 데이터만 보관하고 아무 일도 하지 않음
- 로직이 Lotto 외부(LottoGame)에서 처리됨
- Lotto의 내부 구조(배열)가 외부에 노출됨
- numbers의 타입이 바뀌면 외부 코드도 전부 수정해야 함

### 올바른 패턴

```javascript
class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
  }

  // 객체가 스스로 판단
  hasNumber(number) {
    return this.#numbers.includes(number);
  }

  // 객체가 스스로 계산
  getMatchCount(winningNumbers) {
    return this.#numbers.filter(n => winningNumbers.includes(n)).length;
  }
}

class LottoGame {
  play() {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

    // 객체에게 질문 (Good)
    const hasBonus = lotto.hasNumber(bonusNumber);
    const matchCount = lotto.getMatchCount(winning);
  }
}
```

데이터를 꺼내지(get) 않고, 객체에게 메시지를 보내 객체가 스스로 처리하게 한다.

---

## getter 남용의 문제점

### 1. 객체가 수동적이 됨

```javascript
// Bad: 객체가 단순 데이터 보관소
class Car {
  #position;

  getPosition() {
    return this.#position;
  }
}

// 외부에서 비교
if (car1.getPosition() > car2.getPosition()) {
  console.log('car1 승리');
}
```

```javascript
// Good: 객체가 능동적으로 판단
class Car {
  #position;

  isAheadOf(other) {
    return this.#position > other.#position;
  }
}

// 객체에게 질문
if (car1.isAheadOf(car2)) {
  console.log('car1 승리');
}
```

### 2. 내부 구현이 노출됨

```javascript
// Bad: position이 number라는 것이 노출됨
const maxPosition = Math.max(...cars.map(car => car.getPosition()));

// position을 { x, y } 객체로 변경하면?
// 외부 코드 전체 수정 필요
```

```javascript
// Good: 내부 구현 숨김
class Car {
  #position;

  isWinner(maxPosition) {
    return this.#position === maxPosition;
  }

  compareTo(other) {
    return this.#position - other.#position;
  }
}

// position 구조가 바뀌어도 외부 코드 변경 불필요
const winner = cars.reduce((a, b) => a.compareTo(b) > 0 ? a : b);
```

### 3. 디미터 법칙 위반

디미터 법칙(Law of Demeter)은 "친구하고만 대화하라"는 원칙이다. 객체의 내부 구조를 타고 들어가면 안 된다.

```javascript
// Bad: 디미터 법칙 위반 (체이닝으로 깊이 들어감)
lotto.getNumbers().filter(n => n > 10).length;
car.getEngine().getFuel().getLevel();

// Good: 필요한 것만 요청
lotto.countNumbersGreaterThan(10);
car.getFuelLevel();
```

---

## 자동차 경주 리팩토링 예시

### Before: getter로 데이터를 꺼내서 처리

```javascript
class Car {
  #name;
  #position;

  constructor(name) {
    this.#name = name;
    this.#position = 0;
  }

  getName() {
    return this.#name;
  }

  getPosition() {
    return this.#position;
  }

  move() {
    this.#position++;
  }
}

class RaceGame {
  #cars;

  findWinners() {
    // 외부에서 position을 꺼내서 비교
    const maxPosition = Math.max(
      ...this.#cars.map(car => car.getPosition())
    );

    return this.#cars
      .filter(car => car.getPosition() === maxPosition)
      .map(car => car.getName());
  }
}
```

문제점:
- Car의 position을 외부에서 직접 비교
- position의 타입이나 구조가 바뀌면 RaceGame도 수정 필요
- Car는 데이터만 제공하고 판단은 외부에서 함

### After: 객체에게 메시지를 보내 처리

```javascript
class Car {
  #name;
  #position;

  constructor(name) {
    this.#name = name;
    this.#position = 0;
  }

  get name() {
    return this.#name;  // 출력용으로만 사용
  }

  move() {
    this.#position++;
  }

  // Car끼리 비교
  compareTo(other) {
    return this.#position - other.#position;
  }

  // 특정 position과 같은지 판단
  isSamePosition(other) {
    return this.#position === other.#position;
  }
}

class RaceGame {
  #cars;

  findWinners() {
    const maxPositionCar = this.#findMaxPositionCar();
    return this.#findSamePositionCars(maxPositionCar);
  }

  #findMaxPositionCar() {
    return this.#cars.reduce((max, car) =>
      car.compareTo(max) > 0 ? car : max
    );
  }

  #findSamePositionCars(maxCar) {
    return this.#cars
      .filter(car => car.isSamePosition(maxCar))
      .map(car => car.name);
  }
}
```

개선점:
- Car가 스스로 비교 로직을 가짐 (compareTo, isSamePosition)
- position을 외부에 노출하지 않음
- position 구조가 바뀌어도 Car 내부만 수정하면 됨

---

## 로또 리팩토링 예시

### Before: getter로 번호를 꺼내서 처리

```javascript
class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
  }

  getNumbers() {
    return [...this.#numbers];
  }
}

class WinningLotto {
  #winningNumbers;
  #bonusNumber;

  // 외부에서 번호를 꺼내서 비교
  match(lotto) {
    const numbers = lotto.getNumbers();
    const matchCount = numbers.filter(n =>
      this.#winningNumbers.includes(n)
    ).length;
    const hasBonus = numbers.includes(this.#bonusNumber);

    return { matchCount, hasBonus };
  }
}
```

### After: 객체에게 질문

```javascript
class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
  }

  // 출력용으로만 제공
  get numbers() {
    return [...this.#numbers];
  }

  // 특정 번호 포함 여부를 스스로 판단
  hasNumber(number) {
    return this.#numbers.includes(number);
  }

  // 다른 Lotto와 일치 개수를 스스로 계산
  countMatchingNumbers(other) {
    return this.#numbers.filter(n => other.hasNumber(n)).length;
  }
}

class WinningLotto {
  #winningNumbers;  // Lotto 객체
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    this.#winningNumbers = winningNumbers;
    this.#bonusNumber = bonusNumber;
  }

  // 로또에게 질문
  match(lotto) {
    const matchCount = lotto.countMatchingNumbers(this.#winningNumbers);
    const hasBonus = lotto.hasNumber(this.#bonusNumber);

    return { matchCount, hasBonus };
  }
}
```

개선점:
- Lotto가 hasNumber, countMatchingNumbers 메서드를 가짐
- 번호 배열을 직접 조작하지 않고 Lotto에게 질문
- Lotto 내부 구조가 바뀌어도 외부 영향 없음

---

## getter가 허용되는 경우

getter를 무조건 사용하지 말라는 것은 아니다. 다음 경우에는 getter 사용이 적절하다.

### 1. 출력(View)을 위한 값 조회

```javascript
class Car {
  #name;
  #position;

  // 출력을 위해 필요
  get name() {
    return this.#name;
  }

  // 출력 형식을 제공하는 것이 더 좋음
  get status() {
    return `${this.#name} : ${'-'.repeat(this.#position)}`;
  }
}

// View에서 사용
console.log(car.name);
console.log(car.status);
```

### 2. 불변 객체의 값 조회

```javascript
class Money {
  #amount;

  constructor(amount) {
    this.#amount = amount;
  }

  // 불변 객체이므로 값 조회 허용
  get amount() {
    return this.#amount;
  }

  add(other) {
    return new Money(this.#amount + other.amount);
  }
}
```

### 3. DTO(Data Transfer Object)

데이터 전달 목적의 객체는 getter가 주 역할이다.

```javascript
class LottoResultDto {
  constructor(matchCount, prize, count) {
    this.matchCount = matchCount;
    this.prize = prize;
    this.count = count;
  }
}
```

---

## Collection 반환 시 주의점

getter로 Collection(배열, 객체)을 반환할 때는 반드시 방어적 복사를 해야 한다.

### 위험한 코드

```javascript
class Lotto {
  #numbers;

  getNumbers() {
    return this.#numbers;  // 원본 반환 (위험!)
  }
}

const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
const numbers = lotto.getNumbers();
numbers.push(7);  // 원본이 오염됨!
console.log(lotto.getNumbers());  // [1, 2, 3, 4, 5, 6, 7]
```

### 안전한 코드

```javascript
class Lotto {
  #numbers;

  getNumbers() {
    return [...this.#numbers];  // 복사본 반환
  }

  // 또는 Object.freeze로 불변 처리
  getNumbersImmutable() {
    return Object.freeze([...this.#numbers]);
  }
}

const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
const numbers = lotto.getNumbers();
numbers.push(7);  // 복사본만 변경됨
console.log(lotto.getNumbers());  // [1, 2, 3, 4, 5, 6] (원본 유지)
```

객체도 마찬가지다.

```javascript
class GameResult {
  #results;

  // 얕은 복사
  get results() {
    return { ...this.#results };
  }

  // 깊은 복사가 필요한 경우
  get resultsDeep() {
    return JSON.parse(JSON.stringify(this.#results));
  }
}
```

---

## 정리: getter 사용 가이드라인

### 사용해도 좋은 경우

1. 출력(View)을 위한 단순 값 조회
2. 불변 객체의 값 조회
3. DTO에서 데이터 전달
4. 테스트에서 상태 검증

### 사용을 피해야 하는 경우

1. getter로 꺼낸 값으로 로직을 수행할 때
2. getter 체이닝으로 깊이 들어갈 때
3. Collection을 꺼내서 외부에서 조작할 때

### 리팩토링 신호

다음 코드가 보이면 리팩토링을 고려한다.

```javascript
// getter + 외부 로직 → 메서드로 이동
if (car.getPosition() > other.getPosition()) { }
→ if (car.isAheadOf(other)) { }

// getter + filter/map → 메서드로 이동
lotto.getNumbers().filter(n => winning.includes(n)).length
→ lotto.getMatchCount(winning)

// getter 체이닝 → 직접 메서드 제공
car.getEngine().getFuelLevel()
→ car.getFuelLevel()
```

---

## 용어 정리

- Getter: 데이터를 가져오는(get) 함수, `get` 키워드 사용
- Setter: 데이터를 설정하는(set) 함수, `set` 키워드 사용
- 캡슐화(Encapsulation): 데이터와 메서드를 하나로 묶고 외부 접근을 제한하는 것
- 읽기 전용(Read-only): getter만 제공하여 외부에서 수정 불가능하게 만든 프로퍼티
- 무결성(Integrity): 데이터가 정확하고 일관된 상태를 유지하는 것
- Tell, Don't Ask: 객체에게 데이터를 요청하지 말고 행동을 지시하라는 원칙
- 디미터 법칙(Law of Demeter): 객체는 직접 관련된 객체와만 상호작용해야 한다는 원칙
- 방어적 복사(Defensive Copy): 원본 보호를 위해 복사본을 반환하는 기법
