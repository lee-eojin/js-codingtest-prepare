# import / export

## 정의

import/export는 ES6에서 도입된 모듈 문법이다. 코드가 길어지면 파일을 나눠서 관리하는데, 이때 다른 파일의 변수, 함수, 클래스를 가져오거나 내보낼 수 있게 해준다. 우테코 미션에서 도메인 클래스, 상수, 유틸리티 함수를 파일별로 분리할 때 필수로 사용한다.

---

## export default

하나의 값을 기본으로 내보낼 때 사용한다. 파일당 하나만 가능하다.

```javascript
// library.js
const a = 10;
export default a;

// main.js
import a from './library.js';
console.log(a);  // 10
```

import할 때 변수명은 자유롭게 지을 수 있다.

```javascript
// 같은 파일을 다른 이름으로 import
import myValue from './library.js';
console.log(myValue);  // 10
```

클래스를 내보낼 때 가장 많이 사용하는 방식이다.

```javascript
// Car.js
class Car {
  #name;

  constructor(name) {
    this.#name = name;
  }

  getName() {
    return this.#name;
  }
}

export default Car;

// App.js
import Car from './Car.js';
const car = new Car('pobi');
```

---

## export (named export)

여러 개의 값을 내보낼 때 사용한다.

```javascript
// library.js
const a = 10;
const b = 20;
export { a, b };

// main.js
import { a, b } from './library.js';
console.log(a);  // 10
console.log(b);  // 20
```

선언과 동시에 export할 수도 있다.

```javascript
// library.js
export const a = 10;
export const b = 20;
export function add(x, y) {
  return x + y;
}

// main.js
import { a, b, add } from './library.js';
console.log(add(a, b));  // 30
```

import할 때 반드시 `{ }` 중괄호를 사용하고, 내보낸 이름과 동일한 이름을 써야 한다.

---

## export default와 export 동시 사용

하나의 파일에서 둘 다 사용할 수 있다.

```javascript
// library.js
const a = 10;
const b = 20;
const c = 30;

export { a, b };
export default c;

// main.js
import c, { a, b } from './library.js';
console.log(a);  // 10
console.log(b);  // 20
console.log(c);  // 30
```

`export default`한 것은 중괄호 바깥에, `export`한 것들은 중괄호 안에 작성한다.

---

## as로 이름 바꾸기

import할 때 변수명을 변경할 수 있다.

```javascript
// library.js
const a = 10;
export { a };

// main.js
import { a as value } from './library.js';
console.log(value);  // 10
// console.log(a);   // ReferenceError (a는 존재하지 않음)
```

이름 충돌을 피하거나 더 명확한 이름을 쓸 때 유용하다.

```javascript
// constants.js에서 가져올 때
import { ERROR_MESSAGE as ERROR } from './constants.js';
import { ERROR_MESSAGE as LOTTO_ERROR } from './lotto/constants.js';
```

export할 때도 as를 사용할 수 있다.

```javascript
// library.js
const internalName = 10;
export { internalName as publicName };

// main.js
import { publicName } from './library.js';
```

---

## * 로 전체 가져오기

export한 것들을 한꺼번에 객체로 가져올 수 있다.

```javascript
// library.js
export const a = 10;
export const b = 20;
export const c = 30;

// main.js
import * as lib from './library.js';

console.log(lib.a);  // 10
console.log(lib.b);  // 20
console.log(lib.c);  // 30
```

`*`은 모든 named export를 가져온다. 반드시 `as`로 이름을 지정해야 한다.

export default와 함께 사용할 때는 따로 import한다.

```javascript
// library.js
export const a = 10;
export const b = 20;
export default 30;

// main.js
import defaultValue, * as lib from './library.js';

console.log(defaultValue);  // 30
console.log(lib.a);         // 10
console.log(lib.b);         // 20
```

---

## import한 값은 읽기 전용

import한 변수는 수정할 수 없다. read-only다.

```javascript
// library.js
export let count = 0;

// main.js
import { count } from './library.js';

count = 10;  // TypeError: Assignment to constant variable.
```

값을 변경하고 싶다면 내보내는 파일에서 함수를 제공해야 한다.

```javascript
// library.js
export let count = 0;
export function increment() {
  count++;
}

// main.js
import { count, increment } from './library.js';

console.log(count);  // 0
increment();
console.log(count);  // 1
```

---

## 구조 분리 패턴

우테코 미션에서 파일을 나누는 기본 패턴이다.

```
src/
├── domain/
│   ├── Lotto.js
│   ├── LottoGenerator.js
│   └── WinningNumbers.js
├── view/
│   ├── InputView.js
│   └── OutputView.js
├── constants.js
├── App.js
└── index.js
```

### 상수 분리

```javascript
// constants.js
export const LOTTO = Object.freeze({
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
  COUNT: 6,
  PRICE: 1000
});

export const ERROR_MESSAGE = Object.freeze({
  INVALID_COUNT: '[ERROR] 로또 번호는 6개여야 합니다.',
  DUPLICATE: '[ERROR] 중복된 번호가 있습니다.'
});

// Lotto.js
import { LOTTO, ERROR_MESSAGE } from '../constants.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== LOTTO.COUNT) {
      throw new Error(ERROR_MESSAGE.INVALID_COUNT);
    }
  }
}

export default Lotto;
```

### 도메인 클래스 분리

```javascript
// Car.js
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

  getName() {
    return this.#name;
  }

  getPosition() {
    return this.#position;
  }
}

export default Car;

// RaceController.js
import Car from './Car.js';

class RaceController {
  #cars;

  initCars(names) {
    this.#cars = names.map(name => new Car(name));
  }

  // ...
}

export default RaceController;
```

### 유틸리티 함수 분리

```javascript
// validator.js
export function validateNotEmpty(value) {
  if (value.trim() === '') {
    throw new Error('[ERROR] 빈 값은 입력할 수 없습니다.');
  }
}

export function validateNumber(value) {
  if (isNaN(value)) {
    throw new Error('[ERROR] 숫자만 입력할 수 있습니다.');
  }
}

// InputView.js
import { validateNotEmpty, validateNumber } from '../validator.js';

class InputView {
  async readPrice() {
    const input = await Console.readLineAsync('구입금액을 입력하세요.\n');
    validateNotEmpty(input);
    validateNumber(input);
    return Number(input);
  }
}

export default InputView;
```

---

## index.js와 App.js 구조

프로그램의 진입점과 메인 로직을 분리한다.

```javascript
// index.js (진입점)
import App from './App.js';

new App().run();

// App.js (메인 로직)
import InputView from './view/InputView.js';
import OutputView from './view/OutputView.js';
import LottoGame from './domain/LottoGame.js';

class App {
  async run() {
    // 게임 로직
  }
}

export default App;
```

---

## CommonJS (참고)

Node.js에서 예전에 사용하던 모듈 문법이다. 우테코에서는 ES6 import/export를 사용하지만, 레거시 코드나 설정 파일에서 볼 수 있다.

```javascript
// CommonJS 방식 (옛날)
// export
module.exports = { a: 10 };
// 또는
module.exports.a = 10;

// import
const lib = require('./library.js');
console.log(lib.a);
```

```javascript
// ES6 방식 (현재)
// export
export const a = 10;
// 또는
export default { a: 10 };

// import
import { a } from './library.js';
```

---

## 용어 정리

- **모듈(Module)**: 독립적인 기능을 가진 파일 단위
- **export default**: 파일당 하나만 가능한 기본 내보내기
- **named export**: 이름을 지정해서 여러 개 내보내기
- **import**: 다른 파일에서 내보낸 것을 가져오기
- **as**: import/export 시 이름을 변경하는 키워드
