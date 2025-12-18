# Import & Export

## 정의

import/export는 JavaScript 파일을 모듈로 분리하여 개발하는 ES6 문법이다. 한 파일에서 변수, 함수, class를 내보내고(export), 다른 파일에서 가져와서(import) 사용할 수 있다. 코드가 길어지면 파일을 분리하고 필요한 것만 가져다 쓰는 방식으로 관리한다.

---

## export default

파일에서 하나의 값을 기본으로 내보낼 때 사용한다.

```javascript
// utils.js
const calculator = {
  add(a, b) {
    return a + b;
  },
  subtract(a, b) {
    return a - b;
  }
};

export default calculator;
```

```javascript
// main.js
import calculator from './utils.js';

console.log(calculator.add(2, 3));  // 5
```

export default의 특징:
- 파일당 한 번만 사용 가능
- import할 때 이름을 자유롭게 지을 수 있음

```javascript
// 이름을 다르게 해도 됨
import calc from './utils.js';
import myCalculator from './utils.js';
```

---

## export (named export)

여러 개의 값을 내보낼 때 사용한다.

```javascript
// constants.js
const LOTTO_PRICE = 1000;
const LOTTO_COUNT = 6;
const MIN_NUMBER = 1;
const MAX_NUMBER = 45;

export { LOTTO_PRICE, LOTTO_COUNT, MIN_NUMBER, MAX_NUMBER };
```

```javascript
// main.js
import { LOTTO_PRICE, LOTTO_COUNT } from './constants.js';

console.log(LOTTO_PRICE);  // 1000
console.log(LOTTO_COUNT);  // 6
```

선언과 동시에 export할 수도 있다.

```javascript
// constants.js
export const LOTTO_PRICE = 1000;
export const LOTTO_COUNT = 6;

export function validate(numbers) {
  return numbers.length === LOTTO_COUNT;
}

export class Lotto {
  // ...
}
```

named export의 특징:
- 여러 번 사용 가능
- import할 때 정확한 이름을 써야 함
- 중괄호 `{}`로 감싸서 가져옴

---

## export default와 export 동시 사용

한 파일에서 둘 다 사용할 수 있다.

```javascript
// Lotto.js
const LOTTO_COUNT = 6;

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
  }
}

export { LOTTO_COUNT };
export default Lotto;
```

```javascript
// main.js
import Lotto, { LOTTO_COUNT } from './Lotto.js';

const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
console.log(LOTTO_COUNT);  // 6
```

export default는 중괄호 없이 맨 앞에, named export는 중괄호 안에 쓴다.

---

## as로 이름 바꾸기

import할 때 `as` 키워드로 이름을 변경할 수 있다.

```javascript
// constants.js
export const ERROR_MESSAGE = '[ERROR] 잘못된 입력입니다.';
export const SUCCESS_MESSAGE = '성공했습니다.';
```

```javascript
// main.js
import { ERROR_MESSAGE as ERROR, SUCCESS_MESSAGE as SUCCESS } from './constants.js';

console.log(ERROR);    // '[ERROR] 잘못된 입력입니다.'
console.log(SUCCESS);  // '성공했습니다.'
```

이름 충돌을 피하거나 더 짧은 이름을 쓰고 싶을 때 유용하다.

---

## * 로 전체 가져오기

named export된 것들을 한 번에 가져올 수 있다.

```javascript
// constants.js
export const LOTTO_PRICE = 1000;
export const LOTTO_COUNT = 6;
export const MIN_NUMBER = 1;
export const MAX_NUMBER = 45;
```

```javascript
// main.js
import * as LOTTO from './constants.js';

console.log(LOTTO.LOTTO_PRICE);  // 1000
console.log(LOTTO.LOTTO_COUNT);  // 6
console.log(LOTTO.MIN_NUMBER);   // 1
```

`*`는 모든 named export를 가져오고, `as`로 지정한 이름의 객체에 담긴다.

export default와 함께 사용할 때:

```javascript
import Lotto, * as CONSTANTS from './Lotto.js';
```

---

## import 특징

import한 값은 읽기 전용(read-only)이다. 수정하려고 하면 에러가 발생한다.

```javascript
import { LOTTO_PRICE } from './constants.js';

LOTTO_PRICE = 2000;  // TypeError: Assignment to constant variable
```

값을 수정하고 싶다면 해당 파일에서 수정하는 함수를 export해야 한다.

---

## 우테코 활용 예시

### 프로젝트 구조

```
src/
├── index.js
├── App.js
├── domain/
│   ├── Lotto.js
│   ├── LottoGenerator.js
│   └── WinningNumbers.js
├── view/
│   ├── InputView.js
│   └── OutputView.js
└── constants.js
```

### constants.js

```javascript
export const LOTTO = Object.freeze({
  PRICE: 1000,
  COUNT: 6,
  MIN_NUMBER: 1,
  MAX_NUMBER: 45
});

export const ERROR_MESSAGE = Object.freeze({
  INVALID_PRICE: '[ERROR] 금액은 1,000원 단위여야 합니다.',
  INVALID_COUNT: '[ERROR] 로또 번호는 6개여야 합니다.',
  DUPLICATE_NUMBER: '[ERROR] 중복된 번호가 있습니다.'
});

export const INPUT_MESSAGE = Object.freeze({
  PRICE: '구입금액을 입력해 주세요.\n',
  WINNING_NUMBERS: '당첨 번호를 입력해 주세요.\n',
  BONUS_NUMBER: '보너스 번호를 입력해 주세요.\n'
});
```

### Lotto.js

```javascript
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

  getNumbers() {
    return [...this.#numbers];
  }
}

export default Lotto;
```

### InputView.js

```javascript
import { Console } from '@woowacourse/mission-utils';
import { INPUT_MESSAGE } from '../constants.js';

const InputView = {
  async readPrice() {
    const input = await Console.readLineAsync(INPUT_MESSAGE.PRICE);
    return Number(input);
  },

  async readWinningNumbers() {
    const input = await Console.readLineAsync(INPUT_MESSAGE.WINNING_NUMBERS);
    return input.split(',').map(Number);
  }
};

export default InputView;
```

### App.js

```javascript
import Lotto from './domain/Lotto.js';
import LottoGenerator from './domain/LottoGenerator.js';
import InputView from './view/InputView.js';
import OutputView from './view/OutputView.js';

class App {
  async run() {
    const price = await InputView.readPrice();
    const lottos = LottoGenerator.generate(price);
    OutputView.printLottos(lottos);
    // ...
  }
}

export default App;
```

### index.js

```javascript
import App from './App.js';

const app = new App();
await app.run();
```

---

## CommonJS와의 차이

Node.js에서 예전에 사용하던 방식이다. 우테코에서는 ES6 모듈을 사용한다.

```javascript
// CommonJS (옛날 방식)
const Lotto = require('./Lotto.js');
module.exports = App;

// ES6 Module (현재 방식)
import Lotto from './Lotto.js';
export default App;
```

ES6 모듈을 사용하려면 package.json에 `"type": "module"`이 필요하다.

```json
{
  "name": "javascript-lotto",
  "type": "module",
  "scripts": {
    "start": "node src/index.js"
  }
}
```

---

## 용어 정리

- export default: 파일에서 하나의 기본값을 내보내는 문법
- named export: 이름을 지정하여 여러 값을 내보내는 문법
- import: 다른 파일에서 내보낸 값을 가져오는 문법
- 모듈(Module): 독립적인 기능을 가진 파일 단위
- ES6 Module: JavaScript의 공식 모듈 시스템
- CommonJS: Node.js에서 사용하던 이전 모듈 시스템
