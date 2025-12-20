# 테스트 작성 (Jest)

## 한 줄 요약

Jest로 코드가 예상대로 동작하는지 자동으로 확인한다.

---

## 기본 구조

```javascript
test('테스트 설명', () => {
  // 준비 (Arrange)
  const calculator = new Calculator();

  // 실행 (Act)
  const result = calculator.add(1, 2);

  // 검증 (Assert)
  expect(result).toBe(3);
});
```

---

## 자주 쓰는 Matcher

### 값 비교

```javascript
expect(value).toBe(3);              // 정확히 일치 (===)
expect(value).toEqual({ a: 1 });    // 객체/배열 내용 비교
expect(value).not.toBe(5);          // 불일치
```

### 참/거짓

```javascript
expect(value).toBeTruthy();         // truthy 값
expect(value).toBeFalsy();          // falsy 값
expect(value).toBeNull();           // null
expect(value).toBeUndefined();      // undefined
expect(value).toBeDefined();        // undefined가 아님
```

### 숫자

```javascript
expect(value).toBeGreaterThan(3);       // > 3
expect(value).toBeGreaterThanOrEqual(3); // >= 3
expect(value).toBeLessThan(5);          // < 5
expect(value).toBeCloseTo(0.3, 5);      // 소수점 비교
```

### 문자열

```javascript
expect(str).toMatch(/패턴/);            // 정규식 매칭
expect(str).toContain('hello');         // 포함 여부
```

### 배열

```javascript
expect(arr).toContain(3);               // 요소 포함
expect(arr).toHaveLength(5);            // 길이
```

### 에러

```javascript
expect(() => new Lotto([1,2,3])).toThrow('[ERROR]');
```

---

## describe로 그룹화

```javascript
describe('Lotto', () => {
  test('6개가 아니면 에러', () => {
    expect(() => new Lotto([1, 2, 3])).toThrow('[ERROR]');
  });

  test('중복되면 에러', () => {
    expect(() => new Lotto([1, 1, 2, 3, 4, 5])).toThrow('[ERROR]');
  });
});
```

---

## beforeEach / afterEach

각 테스트 전후에 실행되는 코드다.

```javascript
describe('Car', () => {
  let car;

  beforeEach(() => {
    car = new Car('pobi');  // 매 테스트 전에 새로 생성
  });

  test('초기 position은 0', () => {
    expect(car.getPosition()).toBe(0);
  });

  test('move하면 position 증가', () => {
    car.move();
    expect(car.getPosition()).toBe(1);
  });
});
```

---

## Mock (가짜 함수)

### Random 값 고정하기

```javascript
import { Random } from '@woowacourse/mission-utils';

jest.mock('@woowacourse/mission-utils', () => ({
  Random: {
    pickNumberInRange: jest.fn(),
  },
}));

test('4 이상이면 전진', () => {
  Random.pickNumberInRange.mockReturnValue(4);

  const car = new Car('pobi');
  car.moveByRandom();

  expect(car.getPosition()).toBe(1);
});
```

### 순차적으로 다른 값 반환

```javascript
Random.pickNumberInRange
  .mockReturnValueOnce(4)   // 첫 번째 호출: 4
  .mockReturnValueOnce(3)   // 두 번째 호출: 3
  .mockReturnValueOnce(5);  // 세 번째 호출: 5
```

---

## 우테코 테스트 패턴

### 1. 도메인 클래스 단위 테스트

```javascript
describe('Lotto', () => {
  test('로또 번호가 6개가 아니면 예외 발생', () => {
    expect(() => new Lotto([1, 2, 3, 4, 5])).toThrow('[ERROR]');
  });

  test('로또 번호에 중복이 있으면 예외 발생', () => {
    expect(() => new Lotto([1, 2, 3, 4, 5, 5])).toThrow('[ERROR]');
  });

  test('당첨 번호와 일치하는 개수 반환', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const matchCount = lotto.getMatchCount([1, 2, 3, 7, 8, 9]);
    expect(matchCount).toBe(3);
  });
});
```

### 2. 에러 메시지 검증

```javascript
test('빈 이름은 에러', () => {
  expect(() => new Car('')).toThrow('[ERROR]');
});

// 더 구체적으로
test('5자 초과 이름은 에러', () => {
  expect(() => new Car('pobipobi')).toThrow(
    '[ERROR] 자동차 이름은 5자 이하만 가능합니다.'
  );
});
```

### 3. 통합 테스트 (ApplicationTest)

```javascript
const mockQuestions = (inputs) => {
  Console.readLineAsync = jest.fn();
  inputs.forEach((input) => {
    Console.readLineAsync.mockResolvedValueOnce(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(Console, 'print');
  return logSpy;
};

test('전체 게임 진행', async () => {
  mockQuestions(['pobi,woni', '3']);
  const logSpy = getLogSpy();

  const app = new App();
  await app.run();

  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('최종 우승자'));
});
```

---

## 테스트 실행

```bash
npm test              # 전체 테스트
npm test -- --watch   # 파일 변경 시 자동 실행
```

---

## 용어 정리

- **Jest**: JavaScript 테스트 프레임워크
- **test/it**: 개별 테스트 케이스 정의
- **describe**: 테스트 그룹화
- **expect**: 검증할 값
- **Matcher**: toBe, toEqual 같은 비교 함수
- **Mock**: 가짜 함수/객체로 대체
