# Promise

## 정의

Promise는 비동기 작업의 성공/실패를 판정하는 객체다. 콜백함수 대신 `.then()`과 `.catch()`로 성공/실패 시 실행할 코드를 지정할 수 있다. 코드가 옆으로 길어지지 않고, 실패 처리가 가능하다는 점에서 콜백보다 낫다.

---

## 기본 문법

```javascript
const 프로미스 = new Promise(function(성공, 실패) {
  // 작업 수행
  성공();  // 성공 판정
  // 또는
  실패();  // 실패 판정
});

프로미스
  .then(function() {
    // 성공 시 실행
  })
  .catch(function() {
    // 실패 시 실행
  });
```

- `성공()` 호출 → then() 실행
- `실패()` 호출 → catch() 실행

파라미터 이름은 보통 `resolve`, `reject`를 쓴다.

```javascript
const promise = new Promise(function(resolve, reject) {
  resolve();
});
```

---

## 예시 1: 연산 성공 후 실행

```javascript
const 프로미스 = new Promise(function(resolve, reject) {
  const 결과 = 1 + 1;
  resolve();
});

프로미스.then(function() {
  console.log('연산 성공');
});

// 출력: 연산 성공
```

1+1 연산이 완료되면 `resolve()` 호출 → then() 실행

---

## 예시 2: 결과값 전달

성공 시 데이터를 넘기고 싶으면 `resolve(데이터)`로 전달한다.

```javascript
const 프로미스 = new Promise(function(resolve, reject) {
  const 결과 = 1 + 1;
  resolve(결과);
});

프로미스.then(function(data) {
  console.log('결과:', data);
});

// 출력: 결과: 2
```

then의 파라미터로 결과값을 받을 수 있다.

실패 시에도 마찬가지로 `reject(에러메시지)`로 전달한다.

```javascript
const 프로미스 = new Promise(function(resolve, reject) {
  reject('뭔가 잘못됨');
});

프로미스
  .then(function(data) {
    console.log(data);
  })
  .catch(function(error) {
    console.log('에러:', error);
  });

// 출력: 에러: 뭔가 잘못됨
```

---

## 예시 3: 1초 대기 후 실행

```javascript
const 프로미스 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve();
  }, 1000);
});

프로미스.then(function() {
  console.log('1초 대기 완료');
});
```

setTimeout 콜백 안에서 resolve()를 호출하면, 1초 후에 then()이 실행된다.

---

## 예시 4: 이미지 로딩

이미지가 로드되면 성공, 실패하면 에러를 처리한다.

```javascript
const 프로미스 = new Promise((resolve, reject) => {
  const img = document.querySelector('#test');

  img.addEventListener('load', () => {
    resolve('이미지 로딩 성공');
  });

  img.addEventListener('error', () => {
    reject('이미지 로딩 실패');
  });
});

프로미스
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
```

이벤트리스너 안에서 resolve/reject를 호출하면 된다.

---

## 예시 5: 함수로 Promise 감싸기

Promise를 리턴하는 함수를 만들면 재사용이 편하다.

```javascript
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// 사용
delay(1000).then(() => {
  console.log('1초 후');
});

// 체이닝
delay(1000)
  .then(() => {
    console.log('1초 후');
    return delay(1000);
  })
  .then(() => {
    console.log('2초 후');
  });
```

함수가 Promise를 return하면 호출하는 쪽에서 `.then()` 사용 가능하다.

---

## Promise 상태

Promise 객체는 3가지 상태를 가진다.

| 상태 | 설명 |
|------|------|
| pending | 대기 중 (성공/실패 판정 전) |
| fulfilled (resolved) | 성공 |
| rejected | 실패 |

```javascript
const p1 = new Promise((resolve, reject) => {});
console.log(p1);  // Promise {<pending>}

const p2 = new Promise((resolve, reject) => resolve());
console.log(p2);  // Promise {<fulfilled>}

const p3 = new Promise((resolve, reject) => reject());
console.log(p3);  // Promise {<rejected>}
```

한 번 성공/실패가 결정되면 다시 바뀌지 않는다.

---

## Promise는 비동기를 만들지 않는다

Promise 안의 코드는 동기적으로 실행된다. 10초 걸리는 연산을 넣으면 10초 동안 브라우저가 멈춘다.

```javascript
const 프로미스 = new Promise((resolve, reject) => {
  // 이 코드는 바로 실행됨 (비동기 아님)
  for (let i = 0; i < 1e10; i++) {}  // 브라우저 멈춤
  resolve();
});
```

Promise는 비동기 작업을 "만드는" 게 아니라, 이미 비동기인 작업(setTimeout, fetch 등)의 결과를 다루는 패턴이다.

---

## then 체이닝

then()은 Promise를 반환하므로 연속으로 연결할 수 있다.

```javascript
const 프로미스 = new Promise((resolve, reject) => {
  resolve(1);
});

프로미스
  .then((result) => {
    console.log(result);  // 1
    return result + 1;
  })
  .then((result) => {
    console.log(result);  // 2
    return result + 1;
  })
  .then((result) => {
    console.log(result);  // 3
  });
```

return한 값이 다음 then의 파라미터로 전달된다.

---

## 콜백 vs Promise

```javascript
// 콜백 패턴 (콜백 지옥)
doSomething(function(result) {
  doSomethingElse(result, function(newResult) {
    doThirdThing(newResult, function(finalResult) {
      console.log(finalResult);
    });
  });
});

// Promise 패턴
doSomething()
  .then((result) => doSomethingElse(result))
  .then((newResult) => doThirdThing(newResult))
  .then((finalResult) => console.log(finalResult))
  .catch((error) => console.log(error));
```

Promise가 더 읽기 쉽고, 에러 처리도 한 곳에서 할 수 있다.

---

## 우테코 활용 예시

### Console.readLineAsync

우테코 미션에서 제공하는 입력 함수는 Promise를 반환한다.

```javascript
import { Console } from '@woowacourse/mission-utils';

// readLineAsync는 Promise를 반환
Console.readLineAsync('입력: ').then((input) => {
  console.log('입력값:', input);
});
```

보통은 async/await과 함께 사용한다. (다음 문서에서 다룸)

### Promise로 감싸기

콜백 기반 함수를 Promise로 바꿀 수 있다.

```javascript
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

delay(1000).then(() => {
  console.log('1초 후 실행');
});
```

---

## 용어 정리

- **Promise**: 비동기 작업의 성공/실패를 나타내는 객체
- **resolve**: 성공 판정 함수
- **reject**: 실패 판정 함수
- **then**: 성공 시 실행할 콜백 등록
- **catch**: 실패 시 실행할 콜백 등록
- **pending**: 아직 결과가 정해지지 않은 상태
- **fulfilled**: 성공 상태
- **rejected**: 실패 상태
