# async / await

## 정의

async/await은 Promise를 더 쉽게 사용하는 ES8 문법이다. async는 함수를 Promise로 만들어주고, await은 then()을 대신한다. 코드가 동기식처럼 읽혀서 가독성이 좋다.

---

## async 키워드

함수 앞에 async를 붙이면 그 함수가 자동으로 Promise를 반환한다.

```javascript
async function 더하기() {
  return 1 + 1;
}

// 함수 실행 결과는 Promise
더하기().then((결과) => {
  console.log(결과);  // 2
});
```

new Promise() 없이도 Promise가 만들어진다. return한 값은 then()에서 받을 수 있다.

---

## await 키워드

await은 Promise가 완료될 때까지 기다린다. then() 대신 사용한다.

```javascript
async function 실행() {
  const 프로미스 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('완료');
    }, 1000);
  });

  const 결과 = await 프로미스;  // 1초 기다림
  console.log(결과);  // '완료'
}

실행();
```

await 오른쪽에 Promise를 넣으면, 성공할 때까지 기다렸다가 결과값을 변수에 담아준다.

**주의**: await은 async 함수 안에서만 사용 가능하다.

---

## then vs await 비교

```javascript
// then 방식
function getData() {
  fetch('/api/data')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

// await 방식
async function getData() {
  const response = await fetch('/api/data');
  const data = await response.json();
  console.log(data);
}
```

await 방식이 위에서 아래로 읽히니까 더 직관적이다.

---

## 에러 처리 (try / catch)

await은 Promise가 실패하면 에러가 나고 코드가 멈춘다.

```javascript
async function 실행() {
  const 프로미스 = new Promise((resolve, reject) => {
    reject('실패함');
  });

  const 결과 = await 프로미스;  // 여기서 에러 발생
  console.log(결과);  // 실행 안 됨
}
```

에러를 처리하려면 try/catch를 사용한다.

```javascript
async function 실행() {
  const 프로미스 = new Promise((resolve, reject) => {
    reject('실패함');
  });

  try {
    const 결과 = await 프로미스;
    console.log(결과);
  } catch (error) {
    console.log('에러:', error);  // '에러: 실패함'
  }
}

실행();
```

try 안의 코드가 에러나면 catch가 실행된다.

---

## 여러 개 순차 실행

await을 여러 번 쓰면 순서대로 실행된다.

```javascript
async function 순차실행() {
  const 첫번째 = await fetch('/api/first');
  console.log('첫 번째 완료');

  const 두번째 = await fetch('/api/second');
  console.log('두 번째 완료');

  const 세번째 = await fetch('/api/third');
  console.log('세 번째 완료');
}
```

첫 번째가 끝나야 두 번째가 시작된다.

---

## 우테코 활용 예시

### Console.readLineAsync

우테코 미션에서 입력을 받을 때 async/await을 사용한다.

```javascript
import { Console } from '@woowacourse/mission-utils';

class App {
  async run() {
    const name = await Console.readLineAsync('이름을 입력하세요: ');
    const age = await Console.readLineAsync('나이를 입력하세요: ');

    Console.print(`${name}님은 ${age}살입니다.`);
  }
}
```

then 체이닝보다 훨씬 읽기 쉽다.

### 입력 검증과 재입력

에러 발생 시 다시 입력받는 패턴에 활용된다.

```javascript
class InputView {
  async readPrice() {
    try {
      const input = await Console.readLineAsync('금액을 입력하세요: ');
      this.#validatePrice(input);
      return Number(input);
    } catch (error) {
      Console.print(error.message);
      return this.readPrice();  // 재귀로 다시 입력
    }
  }

  #validatePrice(input) {
    if (isNaN(input)) {
      throw new Error('[ERROR] 숫자를 입력해주세요.');
    }
  }
}
```

### App.js 전체 흐름

```javascript
class App {
  async run() {
    try {
      const price = await this.#inputView.readPrice();
      const lottos = this.#purchaseLottos(price);
      const winningNumbers = await this.#readWinningNumbers();
      this.#printResult(lottos, winningNumbers, price);
    } catch (error) {
      Console.print(error.message);
    }
  }

  async #readWinningNumbers() {
    const numbers = await this.#inputView.readTargetNumbers();
    const bonus = await this.#inputView.readBonusNumber();
    return new WinningNumbers(numbers, bonus);
  }
}
```

---

## 용어 정리

- **async**: 함수를 Promise로 만드는 키워드
- **await**: Promise가 완료될 때까지 기다리는 키워드
- **try/catch**: 에러 발생 시 처리하는 문법
