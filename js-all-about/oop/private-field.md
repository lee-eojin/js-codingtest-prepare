# Private 필드와 메서드 (#)

## 한 줄 요약

`#`을 붙이면 클래스 내부에서만 접근 가능하다.

---

## public vs private

```javascript
class Car {
  // public - 외부에서 호출 가능
  move() {
    console.log('이동');
  }

  // private - 클래스 내부에서만 호출 가능
  #fuel() {
    console.log('연료 소모');
  }
}

const car = new Car();
car.move();    // ✅ 가능
car.#fuel();   // ❌ 에러! private이라 외부에서 못 부름
```

---

## 왜 쓰냐?

1. **캡슐화** - 외부에 노출할 필요 없는 로직 숨기기
2. **실수 방지** - 외부에서 잘못 호출하는 거 막기
3. **의도 표현** - "이건 내부용이야"라고 알려줌

---

## private 필드

```javascript
class Lotto {
  #numbers;  // private 필드

  constructor(numbers) {
    this.#numbers = numbers;
  }

  getNumbers() {
    return [...this.#numbers];  // 복사본 반환
  }
}

const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
lotto.getNumbers();   // ✅ [1, 2, 3, 4, 5, 6]
lotto.#numbers;       // ❌ 에러!
```

---

## private 메서드

```javascript
class Calculator {
  calculate(input) {
    const numbers = this.#parse(input);
    this.#validate(numbers);
    return this.#sum(numbers);
  }

  #parse(input) {
    return input.split(',').map(Number);
  }

  #validate(numbers) {
    if (numbers.some(n => n < 0)) {
      throw new Error('[ERROR] 음수 불가');
    }
  }

  #sum(numbers) {
    return numbers.reduce((a, b) => a + b, 0);
  }
}
```

---

## 우테코 활용 패턴

### App 클래스

```javascript
class App {
  async run() {
    // public - 외부에서 호출
    const input = await Console.readLineAsync('입력: ');
    const result = this.#process(input);
    Console.print(result);
  }

  #process(input) {
    // private - 내부에서만 사용
  }
}
```

### 도메인 클래스

```javascript
class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error('[ERROR] 6개여야 합니다.');
    }
  }

  getNumbers() {
    return [...this.#numbers];
  }
}
```

---

## 주의사항

### 1. 선언 먼저

private 필드는 클래스 맨 위에 선언해야 한다.

```javascript
class Car {
  #name;  // 선언 먼저!

  constructor(name) {
    this.#name = name;
  }
}
```

### 2. 상속 안 됨

private은 자식 클래스에서 접근 불가.

```javascript
class Parent {
  #secret = '비밀';
}

class Child extends Parent {
  show() {
    console.log(this.#secret);  // ❌ 에러!
  }
}
```

---

## 용어 정리

- **public**: 외부에서 접근 가능 (기본값)
- **private**: 클래스 내부에서만 접근 가능 (`#` 붙임)
- **캡슐화**: 내부 구현을 숨기고 필요한 것만 노출
