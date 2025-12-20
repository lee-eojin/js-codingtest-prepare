# MissionUtils 라이브러리

## 한 줄 요약

우테코에서 제공하는 Console 입출력과 Random 함수 라이브러리다.

---

## 설치

```bash
npm install @woowacourse/mission-utils
```

---

## import

```javascript
import { Console, Random } from '@woowacourse/mission-utils';
```

---

## Console

### Console.readLineAsync(질문)

사용자 입력을 받는다. Promise를 반환하므로 await과 함께 사용한다.

```javascript
const input = await Console.readLineAsync('이름을 입력하세요: ');
console.log(input);  // 사용자가 입력한 값
```

**주의**: 입력값은 항상 문자열이다. 숫자가 필요하면 변환해야 한다.

```javascript
const input = await Console.readLineAsync('금액: ');
const price = Number(input);
```

### Console.print(메시지)

화면에 출력한다. console.log 대신 사용한다.

```javascript
Console.print('안녕하세요');
Console.print(`결과: ${result}`);
```

---

## Random

### Random.pickNumberInRange(min, max)

min 이상 max 이하의 랜덤 정수를 반환한다.

```javascript
const number = Random.pickNumberInRange(1, 45);
// 1 ~ 45 사이의 정수
```

자동차 경주 전진 조건에 사용:

```javascript
const randomValue = Random.pickNumberInRange(0, 9);
if (randomValue >= 4) {
  car.move();
}
```

### Random.pickUniqueNumbersInRange(min, max, count)

min 이상 max 이하에서 중복 없이 count개의 정수를 뽑아 배열로 반환한다.

```javascript
const numbers = Random.pickUniqueNumbersInRange(1, 45, 6);
// [23, 7, 41, 3, 15, 32] 같은 배열 (정렬 안 됨)
```

로또 번호 생성에 사용:

```javascript
const lottoNumbers = Random.pickUniqueNumbersInRange(1, 45, 6);
const sortedNumbers = lottoNumbers.sort((a, b) => a - b);
```

### Random.shuffle(배열)

배열을 무작위로 섞은 새 배열을 반환한다.

```javascript
const original = [1, 2, 3, 4, 5];
const shuffled = Random.shuffle(original);
// [3, 1, 5, 2, 4] 같은 배열
```

---

## 우테코 활용 패턴

### 1. InputView 클래스

```javascript
import { Console } from '@woowacourse/mission-utils';

class InputView {
  async readPrice() {
    const input = await Console.readLineAsync('구입금액을 입력해 주세요.\n');
    return Number(input);
  }

  async readCarNames() {
    const input = await Console.readLineAsync('자동차 이름을 입력하세요.\n');
    return input.split(',').map((name) => name.trim());
  }
}
```

### 2. OutputView 클래스

```javascript
import { Console } from '@woowacourse/mission-utils';

class OutputView {
  printLottos(lottos) {
    Console.print(`\n${lottos.length}개를 구매했습니다.`);
    lottos.forEach((lotto) => {
      Console.print(`[${lotto.getNumbers().join(', ')}]`);
    });
  }

  printError(message) {
    Console.print(message);
  }
}
```

### 3. 로또 생성기

```javascript
import { Random } from '@woowacourse/mission-utils';

class LottoGenerator {
  generate() {
    const numbers = Random.pickUniqueNumbersInRange(1, 45, 6);
    return new Lotto(numbers.sort((a, b) => a - b));
  }

  generateMultiple(count) {
    return Array.from({ length: count }, () => this.generate());
  }
}
```

### 4. 자동차 이동

```javascript
import { Random } from '@woowacourse/mission-utils';

class Car {
  #name;
  #position = 0;

  move() {
    if (this.#canMove()) {
      this.#position++;
    }
  }

  #canMove() {
    return Random.pickNumberInRange(0, 9) >= 4;
  }
}
```

---

## 테스트에서 Mock 처리

Random은 테스트할 때 값을 고정해야 한다.

```javascript
import { Random } from '@woowacourse/mission-utils';

// Random.pickNumberInRange를 mock
jest.spyOn(Random, 'pickNumberInRange').mockReturnValue(4);

// 여러 번 호출될 때 다른 값
jest.spyOn(Random, 'pickNumberInRange')
  .mockReturnValueOnce(4)
  .mockReturnValueOnce(3);
```

Console.readLineAsync도 mock 처리:

```javascript
import { Console } from '@woowacourse/mission-utils';

Console.readLineAsync = jest.fn()
  .mockResolvedValueOnce('8000')
  .mockResolvedValueOnce('1,2,3,4,5,6')
  .mockResolvedValueOnce('7');
```

---

## 주의사항

### 1. Console.print 사용 필수

console.log 대신 Console.print를 써야 테스트가 통과한다.

```javascript
// 잘못된 예
console.log('결과');

// 올바른 예
Console.print('결과');
```

### 2. readLineAsync는 async/await 필수

```javascript
// 잘못된 예
const input = Console.readLineAsync('입력: ');  // Promise 객체

// 올바른 예
const input = await Console.readLineAsync('입력: ');
```

### 3. Random 결과는 정렬 안 됨

pickUniqueNumbersInRange 결과는 정렬되어 있지 않다. 필요하면 직접 정렬한다.

```javascript
const numbers = Random.pickUniqueNumbersInRange(1, 45, 6);
numbers.sort((a, b) => a - b);  // 오름차순 정렬
```

---

## 용어 정리

- **MissionUtils**: 우테코에서 제공하는 유틸리티 라이브러리
- **Console**: 입출력 관련 함수 모음
- **Random**: 랜덤 값 생성 함수 모음
- **Mock**: 테스트에서 함수의 동작을 가짜로 대체
