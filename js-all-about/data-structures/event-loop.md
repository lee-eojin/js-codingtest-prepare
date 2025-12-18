# Event Loop (Stack, Queue와 브라우저 동작원리)

## 정의

브라우저는 자바스크립트를 실행할 때 Stack과 Queue라는 자료구조를 사용한다. 일반 코드는 Stack에서 순서대로 실행되고, 시간이 걸리는 코드(ajax, 이벤트리스너, setTimeout)는 Queue를 거쳐 나중에 실행된다. 이 구조를 이해하면 비동기 코드가 왜 예상과 다르게 동작하는지 알 수 있다.

---

## Stack (Call Stack)

코드를 실행하는 공간이다. 코드를 위에서부터 한 줄씩 Stack에 넣고, 맨 위부터 하나씩 실행한다.

```javascript
function first() {
  console.log('1');
}

function second() {
  console.log('2');
}

first();
second();
// 출력: 1, 2
```

실행 순서:
1. `first()` 호출 → Stack에 추가
2. `console.log('1')` 실행 → Stack에서 제거
3. `first()` 완료 → Stack에서 제거
4. `second()` 호출 → Stack에 추가
5. `console.log('2')` 실행 → Stack에서 제거
6. `second()` 완료 → Stack에서 제거

Stack은 후입선출(LIFO) 구조다. 마지막에 들어간 게 먼저 나온다.

---

## Queue (Task Queue)

시간이 걸리는 코드가 대기하는 공간이다. ajax 요청, 이벤트리스너, setTimeout 같은 코드는 바로 실행되지 않고 Queue에서 기다린다.

```javascript
console.log('1');

setTimeout(function() {
  console.log('2');
}, 0);

console.log('3');

// 출력: 1, 3, 2
```

0초 후에 실행하라고 했는데 왜 마지막에 실행될까?

실행 순서:
1. `console.log('1')` → Stack에서 바로 실행
2. `setTimeout` → 콜백을 Queue로 보냄 (대기)
3. `console.log('3')` → Stack에서 바로 실행
4. Stack이 비었음 → Queue에서 콜백을 Stack으로 이동
5. `console.log('2')` 실행

Queue는 선입선출(FIFO) 구조다. 먼저 들어간 게 먼저 나온다.

---

## Event Loop

Stack과 Queue를 연결해주는 역할이다. Stack이 비었는지 계속 확인하고, 비면 Queue에서 코드를 꺼내 Stack으로 옮긴다.

```javascript
console.log('시작');

setTimeout(() => console.log('타이머1'), 0);
setTimeout(() => console.log('타이머2'), 0);

console.log('끝');

// 출력: 시작, 끝, 타이머1, 타이머2
```

1. `console.log('시작')` → Stack에서 실행
2. 첫 번째 setTimeout → 콜백을 Queue로
3. 두 번째 setTimeout → 콜백을 Queue로
4. `console.log('끝')` → Stack에서 실행
5. Stack 비었음 → Queue에서 '타이머1' 콜백을 Stack으로
6. Stack 비었음 → Queue에서 '타이머2' 콜백을 Stack으로

---

## Stack을 바쁘게 하면 안 되는 이유

Stack이 비어야 Queue에 있는 코드가 실행된다. Stack이 오래 실행되면 이벤트리스너, setTimeout 같은 코드가 멈춘다.

```javascript
// 나쁜 예: Stack을 오래 점유
for (let i = 0; i < 1e10; i++) {
  // 100억번 반복
}

// 이 동안:
// - 버튼 클릭 안 됨
// - setTimeout 콜백 실행 안 됨
// - 브라우저가 멈춤
```

반복문이 끝날 때까지 다른 코드가 실행되지 않는다. 브라우저가 하얗게 변하거나 "응답 없음" 상태가 된다.

---

## 해결 방법

### 1. setTimeout으로 나누기

작업을 작은 단위로 나눠서 Queue를 거치게 한다.

```javascript
function processChunk(start, end) {
  for (let i = start; i < end; i++) {
    // 작업
  }

  if (end < 1e10) {
    setTimeout(() => processChunk(end, end + 1e8), 0);
  }
}

processChunk(0, 1e8);
```

각 청크 사이에 다른 코드가 실행될 수 있다.

### 2. Web Worker 사용

별도의 스레드에서 무거운 작업을 처리한다.

```javascript
// main.js
const worker = new Worker('worker.js');

worker.onmessage = function(e) {
  console.log('결과:', e.data);
};

// worker.js
let result = 0;
for (let i = 0; i < 1e10; i++) {
  result += i;
}
postMessage(result);
```

---

## Promise와 Microtask Queue

Promise의 then은 일반 Queue가 아닌 Microtask Queue로 간다. Microtask Queue는 일반 Queue보다 우선순위가 높다.

```javascript
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

console.log('4');

// 출력: 1, 4, 3, 2
```

실행 순서:
1. `console.log('1')` → 바로 실행
2. setTimeout 콜백 → Task Queue로
3. Promise then 콜백 → Microtask Queue로
4. `console.log('4')` → 바로 실행
5. Microtask Queue 먼저 → `console.log('3')` 실행
6. Task Queue → `console.log('2')` 실행

---

## 우테코 활용 예시

### 비동기 입력 처리

Console.readLineAsync는 비동기 함수다. await 없이 호출하면 예상과 다르게 동작한다.

```javascript
// 잘못된 예시
class App {
  run() {
    const input = Console.readLineAsync('입력: ');
    console.log(input);  // Promise 객체가 출력됨
  }
}

// 올바른 예시
class App {
  async run() {
    const input = await Console.readLineAsync('입력: ');
    console.log(input);  // 실제 입력값이 출력됨
  }
}
```

---

## 용어 정리

- **Stack (Call Stack)**: 코드가 실행되는 공간, 후입선출(LIFO)
- **Queue (Task Queue)**: 비동기 콜백이 대기하는 공간, 선입선출(FIFO)
- **Event Loop**: Stack이 비면 Queue에서 코드를 가져오는 루프
- **Microtask Queue**: Promise then 콜백이 들어가는 우선순위 높은 Queue
