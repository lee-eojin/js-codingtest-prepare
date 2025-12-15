# Composition & Dependency Injection

## 정의

Composition은 상속(extends) 대신 필요한 기능을 가진 객체를 조합하여 class를 구성하는 패턴이다. 상속은 "is-a" 관계(Healer는 Character다)를 표현하고, 조합은 "has-a" 관계(Healer는 HealAbility를 가진다)를 표현한다. Dependency Injection은 class 내부에서 직접 의존성을 생성하지 않고 외부에서 주입받는 설계 방식이다.

---

## Class 사용의 장점

class를 사용하면 여러 이점이 있다.

```javascript
// 1. 비슷한 구조의 object를 여러 개 생성
class Unit {
  constructor(name, hp, attack) {
    this.name = name;
    this.hp = hp;
    this.attack = attack;
  }
}

const unit1 = new Unit('전사', 100, 5);
const unit2 = new Unit('궁수', 80, 7);
const unit3 = new Unit('마법사', 60, 10);
```

```javascript
// 2. 관련 함수들을 한 곳에 정리
class Calculator {
  static add(a, b) { return a + b; }
  static subtract(a, b) { return a - b; }
  static multiply(a, b) { return a * b; }
  static divide(a, b) { return a / b; }
}

Calculator.add(2, 3);  // 5
```

```javascript
// 3. private으로 내부 구현 숨기기
class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    // 복잡한 검증 로직 (외부에서 안 보임)
  }

  getNumbers() {
    return [...this.#numbers];
  }
}
```

private 필드와 메서드를 사용하면 사용자는 복잡한 내부 로직을 알 필요 없이 public 메서드만 사용하면 된다.

---

## Class의 대안

class가 항상 필요한 것은 아니다.

```javascript
// 1. object를 반환하는 함수로 대체
function createUnit(name, hp, attack) {
  return { name, hp, attack };
}

const unit = createUnit('전사', 100, 5);
```

```javascript
// 2. 관련 함수들은 별도 파일로 분리
// utils/calculator.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// main.js
import { add, subtract } from './utils/calculator.js';
```

상황에 따라 class보다 함수나 모듈이 더 간단할 수 있다.

---

## 상속의 문제점

extends를 과도하게 사용하면 구조가 복잡해진다.

```javascript
// 복잡한 상속 체인
class Character {}
class PlayableCharacter extends Character {}
class Warrior extends PlayableCharacter {}
class EliteWarrior extends Warrior {}
class LegendaryEliteWarrior extends EliteWarrior {}
```

이런 구조의 문제점은 다음과 같다.

- 최상위 class를 수정하면 모든 하위 class에 영향
- 하위 class가 어떤 기능을 상속받는지 추적하기 어려움
- 다중 상속이 필요한 경우 JavaScript에서는 불가능

예를 들어 "공격도 하고 치유도 하는 캐릭터"를 만들려면 상속만으로는 어렵다.

```javascript
// Warrior와 Healer 둘 다 상속받고 싶지만 불가능
class Paladin extends Warrior, Healer {}  // 문법 에러
```

---

## Composition 패턴

Composition은 필요한 기능을 별도 class로 만들고, 조합하여 사용하는 방식이다.

```javascript
// 기능을 담은 class들
class AttackAbility {
  melee() {
    console.log('물리 공격');
  }
}

class HealAbility {
  heal() {
    console.log('치유');
  }
}
```

```javascript
// 기능을 조합하여 class 구성
class Warrior {
  constructor() {
    this.attackAbility = new AttackAbility();
  }

  attack() {
    this.attackAbility.melee();
  }
}

class Healer {
  constructor() {
    this.attackAbility = new AttackAbility();
    this.healAbility = new HealAbility();
  }

  attack() {
    this.attackAbility.melee();
  }

  heal() {
    this.healAbility.heal();
  }
}
```

```javascript
// 공격과 치유 모두 가능한 캐릭터
class Paladin {
  constructor() {
    this.attackAbility = new AttackAbility();
    this.healAbility = new HealAbility();
  }

  attack() {
    this.attackAbility.melee();
  }

  heal() {
    this.healAbility.heal();
  }
}

const paladin = new Paladin();
paladin.attack();  // '물리 공격'
paladin.heal();    // '치유'
```

상속으로는 불가능했던 "공격 + 치유" 조합이 composition으로는 간단하게 구현된다.

---

## 상속 vs 조합

상속과 조합은 각각 적합한 상황이 다르다.

상속이 적합한 경우:
- 명확한 "is-a" 관계 (SellerUser는 User다)
- 부모의 거의 모든 기능을 자식이 사용
- 상속 깊이가 1~2단계로 단순한 경우

조합이 적합한 경우:
- "has-a" 관계 (Car는 Engine을 가진다)
- 여러 기능을 선택적으로 조합해야 하는 경우
- 기능의 재사용이 다양한 class에서 필요한 경우

---

## Dependency Injection

Dependency Injection(DI)은 class가 필요한 의존성을 내부에서 직접 생성하지 않고 외부에서 주입받는 패턴이다.

```javascript
// DI 적용 전: 내부에서 직접 생성
class Healer {
  constructor() {
    this.healAbility = new HealAbility();  // 직접 생성
  }

  heal() {
    this.healAbility.heal();
  }
}

const healer = new Healer();
```

```javascript
// DI 적용 후: 외부에서 주입
class Healer {
  constructor(healAbility) {
    this.healAbility = healAbility;  // 외부에서 주입받음
  }

  heal() {
    this.healAbility.heal();
  }
}

const healAbility = new HealAbility();
const healer = new Healer(healAbility);
```

DI의 장점:
- class가 한 가지 역할에만 집중 (단일 책임 원칙)
- 다른 구현체로 쉽게 교체 가능
- 테스트 시 mock 객체 주입 용이

```javascript
// 테스트 시 mock 주입
class MockHealAbility {
  heal() {
    console.log('테스트용 치유');
  }
}

const mockHeal = new MockHealAbility();
const healer = new Healer(mockHeal);  // mock 주입
```

---

## 우테코 활용 예시

### Validator 조합

검증 로직을 별도 class로 분리하고 조합하는 패턴이다.

```javascript
class LengthValidator {
  validate(value, min, max) {
    if (value.length < min || value.length > max) {
      throw new Error(`[ERROR] 길이는 ${min}~${max}자여야 합니다.`);
    }
  }
}

class RangeValidator {
  validate(number, min, max) {
    if (number < min || number > max) {
      throw new Error(`[ERROR] 값은 ${min}~${max} 사이여야 합니다.`);
    }
  }
}

class DuplicateValidator {
  validate(array) {
    if (new Set(array).size !== array.length) {
      throw new Error('[ERROR] 중복된 값이 있습니다.');
    }
  }
}
```

```javascript
// Lotto에서 필요한 validator 조합
class Lotto {
  #numbers;
  #rangeValidator;
  #duplicateValidator;

  constructor(numbers, rangeValidator, duplicateValidator) {
    this.#rangeValidator = rangeValidator;
    this.#duplicateValidator = duplicateValidator;
    this.#validate(numbers);
    this.#numbers = [...numbers];
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');
    }
    this.#duplicateValidator.validate(numbers);
    numbers.forEach(num => this.#rangeValidator.validate(num, 1, 45));
  }

  getNumbers() {
    return [...this.#numbers];
  }
}

// 사용
const rangeValidator = new RangeValidator();
const duplicateValidator = new DuplicateValidator();
const lotto = new Lotto([1, 2, 3, 4, 5, 6], rangeValidator, duplicateValidator);
```

### InputView와 OutputView 분리

입출력 의존성을 주입받아 테스트하기 쉬운 구조를 만든다.

```javascript
class InputView {
  async readLine(prompt) {
    const { Console } = await import('@woowacourse/mission-utils');
    return Console.readLineAsync(prompt);
  }
}

class OutputView {
  print(message) {
    console.log(message);
  }
}
```

```javascript
class App {
  #inputView;
  #outputView;

  constructor(inputView, outputView) {
    this.#inputView = inputView;
    this.#outputView = outputView;
  }

  async run() {
    const input = await this.#inputView.readLine('입력: ');
    this.#outputView.print(`결과: ${input}`);
  }
}

// 실제 사용
const app = new App(new InputView(), new OutputView());
await app.run();
```

```javascript
// 테스트용 mock
class MockInputView {
  constructor(inputs) {
    this.inputs = inputs;
  }

  async readLine() {
    return this.inputs.shift();
  }
}

class MockOutputView {
  constructor() {
    this.outputs = [];
  }

  print(message) {
    this.outputs.push(message);
  }
}

// 테스트
const mockInput = new MockInputView(['테스트']);
const mockOutput = new MockOutputView();
const app = new App(mockInput, mockOutput);
await app.run();
console.log(mockOutput.outputs);  // ['결과: 테스트']
```

### RandomGenerator 주입

랜덤 로직을 분리하면 테스트가 쉬워진다.

```javascript
class RandomGenerator {
  generate(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

class Car {
  #name;
  #position;
  #randomGenerator;

  constructor(name, randomGenerator) {
    this.#name = name;
    this.#position = 0;
    this.#randomGenerator = randomGenerator;
  }

  move() {
    const value = this.#randomGenerator.generate(0, 9);
    if (value >= 4) {
      this.#position++;
    }
  }

  getPosition() {
    return this.#position;
  }
}
```

```javascript
// 테스트용 mock (항상 전진)
class MockRandomGenerator {
  generate() {
    return 5;  // 항상 4 이상
  }
}

const mockRandom = new MockRandomGenerator();
const car = new Car('pobi', mockRandom);
car.move();
console.log(car.getPosition());  // 1 (항상 전진)
```

---

## 용어 정리

- Composition(조합): 상속 대신 객체를 조합하여 기능을 구성하는 패턴
- Dependency Injection(의존성 주입): 의존성을 외부에서 주입받는 설계 방식
- has-a 관계: "~를 가진다" 관계 (Car has Engine)
- is-a 관계: "~이다" 관계 (Dog is Animal)
- Mock: 테스트를 위해 실제 객체를 대체하는 가짜 객체
- 단일 책임 원칙: class는 한 가지 역할만 담당해야 한다는 원칙
