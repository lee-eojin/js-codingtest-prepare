# for 반복문

## 한 줄 요약

정해진 횟수만큼 코드를 반복 실행한다.

## 문법

```javascript
for (초기값; 조건; 증감) {
  // 반복할 코드
}
```

---

## 기본 for문

```javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// 출력: 0, 1, 2, 3, 4
```

실행 순서:
1. `let i = 0` - 초기값 설정
2. `i < 5` - 조건 확인 (true면 실행)
3. `console.log(i)` - 코드 실행
4. `i++` - 증감
5. 2~4 반복 (조건이 false가 될 때까지)

---

## for...of (배열 순회)

배열의 값을 하나씩 꺼낸다.

```javascript
const names = ['pobi', 'woni', 'jun'];

for (const name of names) {
  console.log(name);
}

// 출력:
// pobi
// woni
// jun
```

인덱스가 필요 없을 때 사용한다. forEach와 거의 같다.

---

## for...in (객체 순회)

객체의 key를 하나씩 꺼낸다.

```javascript
const car = { name: 'pobi', position: 3 };

for (const key in car) {
  console.log(key, car[key]);
}

// 출력:
// name pobi
// position 3
```

배열에는 for...in 쓰지 말고 for...of를 쓴다.

---

## 언제 뭘 쓸까?

| 상황 | 추천 |
|------|------|
| 배열 순회 (값만 필요) | for...of, forEach |
| 배열 순회 (인덱스 필요) | 기본 for, forEach |
| 객체 순회 | for...in, Object.keys() |
| 특정 횟수 반복 | 기본 for |
| 중간에 멈춰야 함 | for (break 사용) |

---

## break와 continue

### break - 반복 중단

```javascript
for (let i = 0; i < 10; i++) {
  if (i === 5) break;
  console.log(i);
}

// 출력: 0, 1, 2, 3, 4
```

### continue - 다음 반복으로 건너뛰기

```javascript
for (let i = 0; i < 5; i++) {
  if (i === 2) continue;
  console.log(i);
}

// 출력: 0, 1, 3, 4
```

forEach는 break/continue 사용 불가. 필요하면 for문을 쓴다.

---

## 이럴 때 사용한다

### 1. 로또 번호 생성 (특정 횟수 반복)

```javascript
const lottos = [];

for (let i = 0; i < count; i++) {
  const lotto = generateLotto();
  lottos.push(lotto);
}
```

### 2. 라운드 진행

```javascript
for (let round = 0; round < roundCount; round++) {
  playRound();
  printResult();
}
```

### 3. 배열에서 특정 값 찾기 (중간에 멈춰야 할 때)

```javascript
const numbers = [1, 2, 3, 4, 5];
let found = null;

for (const num of numbers) {
  if (num === 3) {
    found = num;
    break;  // 찾으면 멈춤
  }
}
```

---

## for vs forEach 비교

```javascript
const names = ['pobi', 'woni', 'jun'];

// for...of
for (const name of names) {
  console.log(name);
}

// forEach
names.forEach((name) => {
  console.log(name);
});
```

둘 다 거의 같다. 차이점:

| | for | forEach |
|---|---|---|
| break 가능 | O | X |
| continue 가능 | O | X |
| 인덱스 접근 | 별도 변수 필요 | 두 번째 인자로 제공 |
| async/await | 정상 동작 | 주의 필요 |

---

## 주의사항

### 1. for...in은 배열에 쓰지 말자

```javascript
const arr = ['a', 'b', 'c'];

// 나쁜 예
for (const i in arr) {
  console.log(i);  // '0', '1', '2' (문자열!)
}

// 좋은 예
for (const item of arr) {
  console.log(item);  // 'a', 'b', 'c'
}
```

for...in은 인덱스를 문자열로 반환하고, 상속된 속성까지 순회할 수 있어서 예상치 못한 결과가 나올 수 있다.

### 2. forEach에서 async/await 주의

```javascript
// 잘못된 예 - 순차 실행 안 됨
names.forEach(async (name) => {
  await doSomething(name);
});

// 올바른 예
for (const name of names) {
  await doSomething(name);
}
```

forEach 안에서 await을 쓰면 기다리지 않고 다 동시에 실행된다. 순차 실행이 필요하면 for...of를 쓴다.
