# Template Literals

## 정의

템플릿 리터럴(Template Literals)은 ES6에서 도입된 문자열 표기법으로, 백틱(`` ` ``)을 사용하여 문자열을 정의한다. 기존 따옴표 방식과 달리 여러 줄 문자열과 표현식 삽입을 지원하여 동적 문자열 생성을 간결하게 처리할 수 있다.

---

## 기본 문법

백틱(`` ` ``)으로 문자열을 감싸서 정의한다. 키보드에서 숫자 1 왼쪽, 물결표(~) 아래에 위치한 키다.

```javascript
const message = `Hello, World!`;
```

---

## 여러 줄 문자열 (Multi-line Strings)

기존 따옴표 문자열에서 줄바꿈을 포함하려면 이스케이프 문자(`\n`)를 사용하거나 문자열을 연결해야 했다.

```javascript
// 기존 방식
const message = '첫 번째 줄\n두 번째 줄';

// 또는
const message = '첫 번째 줄' +
  '두 번째 줄';
```

템플릿 리터럴에서는 줄바꿈을 그대로 포함할 수 있다.

```javascript
const message = `첫 번째 줄
두 번째 줄`;
```

소스 코드에서 입력한 줄바꿈이 문자열에 그대로 반영되므로 가독성이 향상된다.

---

## 표현식 삽입 (Expression Interpolation)

`${expression}` 구문을 사용하여 문자열 내에 표현식을 삽입할 수 있다. 표현식은 평가된 후 문자열로 변환되어 삽입된다.

### 변수 삽입

```javascript
const name = 'Kim';
const age = 25;

// 기존 방식: 문자열 연결
const message = '이름: ' + name + ', 나이: ' + age;

// 템플릿 리터럴
const message = `이름: ${name}, 나이: ${age}`;
```

### 표현식 삽입

단순 변수뿐 아니라 모든 자바스크립트 표현식을 삽입할 수 있다.

```javascript
const a = 10;
const b = 20;

console.log(`합계: ${a + b}`);  // '합계: 30'
console.log(`최댓값: ${Math.max(a, b)}`);  // '최댓값: 20'
console.log(`조건: ${a > b ? 'a가 크다' : 'b가 크다'}`);  // '조건: b가 크다'
```

---

## Tagged Templates (태그드 템플릿)

템플릿 리터럴 앞에 함수를 붙여서 호출하면 문자열의 각 부분을 분리하여 처리할 수 있다. 이를 태그드 템플릿(Tagged Templates)이라고 한다.

```javascript
function tag(strings, ...values) {
  console.log(strings);  // ['Hello, ', '! You are ', ' years old.']
  console.log(values);   // ['Kim', 25]
}

const name = 'Kim';
const age = 25;

tag`Hello, ${name}! You are ${age} years old.`;
```

첫 번째 매개변수 `strings`는 표현식으로 분리된 문자열 조각들의 배열이다. 나머지 매개변수들은 삽입된 표현식들의 값이다.

태그드 템플릿은 직접 작성할 일은 적지만, `styled-components` 같은 CSS-in-JS 라이브러리에서 이 문법을 사용한다.

---

## 우테코 활용 예시

### 결과 출력 포맷팅

콘솔 출력 시 여러 값을 조합하여 출력할 때 템플릿 리터럴을 사용하면 가독성이 높아진다.

```javascript
class OutputView {
  static printRoundResult(cars) {
    cars.forEach(car => {
      const { name, position } = car.getStatus();
      Console.print(`${name} : ${'-'.repeat(position)}`);
    });
  }

  static printWinners(winners) {
    const winnerNames = winners.map(car => car.getName()).join(', ');
    Console.print(`최종 우승자 : ${winnerNames}`);
  }
}
```

문자열 연결 연산자(`+`)를 사용하는 것보다 출력 형식을 직관적으로 파악할 수 있다.

### 에러 메시지 생성

에러 메시지에 동적 값을 포함할 때 템플릿 리터럴을 활용한다.

```javascript
const ERROR_MESSAGE = Object.freeze({
  INVALID_NAME_LENGTH: (maxLength) =>
    `[ERROR] 자동차 이름은 ${maxLength}자 이하만 가능합니다.`,
  INSUFFICIENT_STOCK: (productName, requestedQuantity) =>
    `[ERROR] ${productName}의 재고가 부족합니다. 요청 수량: ${requestedQuantity}`,
  INVALID_NUMBER_RANGE: (min, max) =>
    `[ERROR] 숫자는 ${min}부터 ${max} 사이의 값이어야 합니다.`,
});

throw new Error(ERROR_MESSAGE.INVALID_NAME_LENGTH(5));
```

에러 메시지 템플릿을 함수로 정의하면 동적 값을 포함하면서도 메시지를 상수로 관리할 수 있다.

### 입력 프롬프트 메시지

사용자 입력을 받을 때 안내 메시지를 구성하는 데 활용한다.

```javascript
const INPUT_MESSAGE = Object.freeze({
  PRICE: '구입금액을 입력해 주세요.\n',
  CAR_NAMES: '경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n',
  ROUND_COUNT: '시도할 횟수는 몇 회인가요?\n',
});
```

### 통계 결과 포맷팅

복잡한 형식의 출력을 구성할 때 템플릿 리터럴의 여러 줄 지원을 활용한다.

```javascript
class LottoResultFormatter {
  static format(result, earningRate) {
    return `
당첨 통계
---
3개 일치 (5,000원) - ${result.FIFTH}개
4개 일치 (50,000원) - ${result.FOURTH}개
5개 일치 (1,500,000원) - ${result.THIRD}개
5개 일치, 보너스 볼 일치 (30,000,000원) - ${result.SECOND}개
6개 일치 (2,000,000,000원) - ${result.FIRST}개
총 수익률은 ${earningRate}%입니다.`.trim();
  }
}
```

여러 줄에 걸친 출력 형식을 소스 코드에서 시각적으로 확인할 수 있어 유지보수가 용이하다. `trim()`을 사용하여 앞뒤 공백을 제거한다.
