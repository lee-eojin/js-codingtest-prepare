# 에러 처리 (Error Handling)

## 한 줄 요약

throw로 에러를 발생시키고, try-catch로 에러를 잡는다.

---

## throw - 에러 발생시키기

```javascript
throw new Error('[ERROR] 메시지');
```

throw를 만나면 코드 실행이 즉시 중단된다.

```javascript
function validate(value) {
  if (value < 0) {
    throw new Error('[ERROR] 음수는 입력할 수 없습니다.');
  }
  return value;
}

validate(-1);  // 여기서 에러 발생, 아래 코드 실행 안 됨
console.log('이 코드는 실행 안 됨');
```

---

## try-catch - 에러 잡기

에러가 발생해도 프로그램이 멈추지 않게 한다.

```javascript
try {
  // 에러가 발생할 수 있는 코드
  validate(-1);
} catch (error) {
  // 에러 발생 시 실행
  console.log(error.message);
}

console.log('프로그램 계속 실행');
```

catch의 파라미터로 에러 객체를 받는다. `error.message`로 메시지를 꺼낼 수 있다.

---

## try-catch-finally

finally는 에러 여부와 관계없이 항상 실행된다.

```javascript
try {
  doSomething();
} catch (error) {
  console.log('에러 발생:', error.message);
} finally {
  console.log('항상 실행됨');
}
```

---

## 에러 다시 던지기

catch에서 처리하지 못하는 에러는 다시 throw한다.

```javascript
try {
  validate(input);
} catch (error) {
  if (error.message.includes('[ERROR]')) {
    console.log(error.message);  // 우리가 만든 에러는 출력
  } else {
    throw error;  // 예상 못한 에러는 다시 던짐
  }
}
```

---

## 우테코 에러 처리 패턴

### 1. 생성자에서 검증 후 throw

```javascript
class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');
    }
    if (new Set(numbers).size !== 6) {
      throw new Error('[ERROR] 로또 번호에 중복이 있습니다.');
    }
  }
}
```

### 2. App에서 try-catch로 에러 출력

```javascript
class App {
  async run() {
    try {
      await this.#play();
    } catch (error) {
      Console.print(error.message);
    }
  }
}
```

### 3. 입력 검증 실패 시 재입력

```javascript
async readPrice() {
  try {
    const input = await Console.readLineAsync('금액: ');
    this.#validatePrice(input);
    return Number(input);
  } catch (error) {
    Console.print(error.message);
    return this.readPrice();  // 재귀로 다시 입력
  }
}
```

### 4. 에러 메시지 상수로 관리

```javascript
const ERROR_MESSAGE = Object.freeze({
  INVALID_COUNT: '[ERROR] 로또 번호는 6개여야 합니다.',
  DUPLICATE: '[ERROR] 중복된 번호가 있습니다.',
  OUT_OF_RANGE: '[ERROR] 번호는 1~45 사이여야 합니다.',
});

// 사용
throw new Error(ERROR_MESSAGE.INVALID_COUNT);
```

---

## 에러 메시지 규칙

우테코에서는 에러 메시지가 `[ERROR]`로 시작해야 한다.

```javascript
// 올바른 예
throw new Error('[ERROR] 잘못된 입력입니다.');

// 잘못된 예
throw new Error('잘못된 입력입니다.');
```

테스트에서 `[ERROR]`가 포함되어 있는지 확인하기 때문이다.

---

## 용어 정리

- **throw**: 에러를 발생시키는 키워드
- **try**: 에러가 발생할 수 있는 코드를 감싸는 블록
- **catch**: 에러 발생 시 실행되는 블록
- **finally**: 에러 여부와 관계없이 실행되는 블록
- **Error**: 에러 객체를 만드는 생성자
