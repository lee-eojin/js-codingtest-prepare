# Primitive & Reference Data Type

## 정의

자바스크립트의 자료형은 크게 Primitive(원시) 타입과 Reference(참조) 타입으로 나뉜다. Primitive 타입은 값 자체가 변수에 저장되고, Reference 타입은 값이 저장된 메모리 주소(참조)가 변수에 저장된다. 이 차이로 인해 복사, 비교, 함수 전달 시 서로 다른 동작을 보인다.

---

## Primitive Data Type

문자(string), 숫자(number), 불리언(boolean), null, undefined, Symbol, BigInt가 Primitive 타입에 해당한다. 이 타입들은 값 자체가 변수에 직접 저장된다.

```javascript
var name = 'john';
var age = 20;
```

`name` 변수에는 `'john'`이라는 문자열 값 자체가 저장된다. 다른 곳을 참조하는 것이 아니라 실제 데이터가 변수 공간에 들어있다.

---

## Reference Data Type

Object, Array, Function이 Reference 타입에 해당한다. 이 타입들은 실제 데이터가 변수에 저장되는 것이 아니라, 데이터가 위치한 메모리 주소(참조)가 저장된다.

```javascript
var person = { name: 'Kim' };
```

`person` 변수에는 `{ name: 'Kim' }` 객체 자체가 아니라, 해당 객체가 메모리 어딘가에 있다는 참조(주소)가 저장된다. 변수는 실제 데이터를 가리키는 화살표를 들고 있을 뿐이다.

---

## 복사 시 차이점

### Primitive 타입 복사

Primitive 타입은 값 자체가 복사되므로 원본과 복사본이 완전히 독립적이다.

```javascript
var 이름1 = '김';
var 이름2 = 이름1;  // '김' 값 자체를 복사
이름1 = '박';

console.log(이름1);  // '박'
console.log(이름2);  // '김' (영향 없음)
```

이름2는 복사 시점의 값 `'김'`을 자기 공간에 저장한 것이므로, 이후 이름1이 변경되어도 영향을 받지 않는다.

### Reference 타입 복사

Reference 타입은 참조(주소)가 복사되므로 원본과 복사본이 같은 데이터를 가리키게 된다.

```javascript
var 이름1 = { name: '김' };
var 이름2 = 이름1;  // 참조(화살표)를 복사
이름1.name = '박';

console.log(이름1);  // { name: '박' }
console.log(이름2);  // { name: '박' } (같이 바뀜)
```

이름2에 복사된 것은 객체 자체가 아니라 객체를 가리키는 화살표다. 둘 다 같은 객체를 가리키고 있으므로 한쪽에서 수정하면 다른 쪽에서도 변경된 값이 보인다.

```
이름1 ──┐
       ├──▶ { name: '박' }  (같은 객체를 가리킴)
이름2 ──┘
```

---

## 객체 비교

새로운 객체를 할당할 때마다 새로운 참조(화살표)가 생성된다. 객체를 비교할 때는 내용이 아닌 참조를 비교한다.

```javascript
var 이름1 = { name: '김' };
var 이름2 = { name: '김' };

console.log(이름1 == 이름2);   // false
console.log(이름1 === 이름2);  // false
```

내용이 완전히 동일해도 `false`가 나온다. 두 변수가 가진 화살표가 서로 다른 메모리 주소를 가리키기 때문이다.

```
이름1 ──▶ { name: '김' }  (메모리 주소 A)
이름2 ──▶ { name: '김' }  (메모리 주소 B)
```

같은 참조를 공유할 때만 `true`가 된다.

```javascript
var 이름1 = { name: '김' };
var 이름2 = 이름1;  // 같은 참조 공유

console.log(이름1 === 이름2);  // true
```

객체의 내용을 비교하고 싶으면 프로퍼티를 직접 비교해야 한다.

```javascript
console.log(이름1.name === 이름2.name);  // true
```

---

## 함수 파라미터와 Reference

함수에 객체를 전달하면 참조가 복사되어 전달된다. 파라미터는 일종의 지역 변수처럼 동작한다.

### 프로퍼티 수정은 원본에 영향

```javascript
var 이름1 = { name: '김' };

function 변경(obj) {
  obj.name = 'park';  // 화살표 타고 들어가서 프로퍼티 수정
}

변경(이름1);
console.log(이름1);  // { name: 'park' }
```

`obj`와 `이름1`이 같은 객체를 가리키므로, `obj.name`을 수정하면 원본도 바뀐다.

### 재할당은 원본에 영향 없음

```javascript
var 이름1 = { name: '김' };

function 변경(obj) {
  obj = { name: 'park' };  // obj에 새로운 화살표 할당
}

변경(이름1);
console.log(이름1);  // { name: '김' } (변경 안 됨)
```

함수가 호출되면 `obj`라는 파라미터 변수가 생성되고, `이름1`의 참조가 복사된다. 이 시점에 `obj`와 `이름1`은 같은 객체를 가리킨다.

하지만 `obj = { name: 'park' }`은 `obj` 변수에 새로운 화살표를 할당하는 것이다. `이름1`이 가진 화살표는 건드리지 않는다.

```
호출 시점:
이름1 ──┐
       ├──▶ { name: '김' }
obj ───┘

재할당 후:
이름1 ──▶ { name: '김' }  (그대로)
obj ────▶ { name: 'park' }  (새 객체)
```

---

## 우테코 활용 예시

### 방어적 복사로 불변성 유지

클래스에서 배열이나 객체를 다룰 때 참조 공유 문제를 방지하기 위해 방어적 복사를 사용한다.

```javascript
class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = [...numbers];  // 입력 배열 복사
  }

  getNumbers() {
    return [...this.#numbers];  // 복사본 반환
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');
    }
  }
}
```

생성자에서 입력받은 배열을 스프레드 연산자로 복사하고, getter에서도 복사본을 반환한다. 외부에서 배열을 수정해도 내부 상태가 보호된다.

```javascript
const input = [1, 2, 3, 4, 5, 6];
const lotto = new Lotto(input);

input.push(7);  // 외부 배열 수정
console.log(lotto.getNumbers());  // [1, 2, 3, 4, 5, 6] (영향 없음)

const output = lotto.getNumbers();
output.push(8);  // 반환값 수정
console.log(lotto.getNumbers());  // [1, 2, 3, 4, 5, 6] (영향 없음)
```

### 객체 내용 비교 메서드

객체의 동등성을 확인할 때는 참조가 아닌 내용을 비교하는 메서드를 구현한다.

```javascript
class Car {
  #name;
  #position;

  constructor(name) {
    this.#name = name;
    this.#position = 0;
  }

  equals(other) {
    return this.#name === other.getName()
        && this.#position === other.getPosition();
  }

  getName() {
    return this.#name;
  }

  getPosition() {
    return this.#position;
  }
}

const car1 = new Car('pobi');
const car2 = new Car('pobi');

console.log(car1 === car2);       // false (참조 비교)
console.log(car1.equals(car2));   // true (내용 비교)
```

### 새 객체 생성으로 상태 업데이트

원본 객체를 직접 수정하지 않고 새 객체를 생성하면 상태 추적이 용이하다.

```javascript
class GameResult {
  #result;

  constructor() {
    this.#result = {
      FIRST: 0,
      SECOND: 0,
      THIRD: 0,
    };
  }

  addRank(rank) {
    this.#result = {
      ...this.#result,
      [rank]: this.#result[rank] + 1,
    };
  }

  getResult() {
    return { ...this.#result };  // 복사본 반환
  }
}
```

스프레드 연산자로 기존 객체를 복사한 뒤 특정 프로퍼티만 변경하는 패턴이다.
