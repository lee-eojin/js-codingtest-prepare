# reduce()

## 한 줄 요약

배열의 모든 요소를 하나의 값으로 합친다.

## 문법

```javascript
배열.reduce(함수, 초기값)
```

## reduce가 하는 일

reduce는 배열을 순회하면서 값을 누적해나간다. 최종적으로 하나의 값을 반환한다.

```javascript
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce(function(accumulator, current) {
  return accumulator + current;
}, 0);

console.log(sum);  // 15
```

- accumulator: 누적된 값 (이전까지의 결과)
- current: 현재 요소
- 0: 초기값 (accumulator의 시작값)

위 코드가 실행되는 과정을 단계별로 보면:

1. 초기값 `0`이 accumulator에 들어간다
2. 첫 번째 요소 `1`이 current에 들어간다
3. `0 + 1 = 1` → 이게 다음 accumulator가 된다
4. 두 번째 요소 `2`가 current에 들어간다
5. `1 + 2 = 3` → 이게 다음 accumulator가 된다
6. 세 번째 요소 `3`이 current에 들어간다
7. `3 + 3 = 6` → 이게 다음 accumulator가 된다
8. 네 번째 요소 `4`가 current에 들어간다
9. `6 + 4 = 10` → 이게 다음 accumulator가 된다
10. 다섯 번째 요소 `5`가 current에 들어간다
11. `10 + 5 = 15` → 최종 결과

## for문으로 바꾸면?

reduce도 for문을 짧게 쓴 것이다.

```javascript
// for문 버전
const numbers = [1, 2, 3, 4, 5];
let sum = 0;  // 초기값

for (const num of numbers) {
  sum = sum + num;  // 누적
}

console.log(sum);  // 15
```

```javascript
// reduce 버전
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, cur) => acc + cur, 0);

console.log(sum);  // 15
```

acc는 accumulator, cur는 current의 줄임말로 자주 쓴다.

## 이럴 때 사용한다

### 1. 배열의 합계를 구할 때

가장 기본적인 사용법이다.

```javascript
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, cur) => acc + cur, 0);

console.log(sum);  // 15
```

### 2. 배열의 최댓값을 구할 때

```javascript
const numbers = [3, 1, 4, 1, 5, 9, 2, 6];
const max = numbers.reduce((acc, cur) => {
  if (cur > acc) {
    return cur;
  }
  return acc;
}, numbers[0]);

console.log(max);  // 9
```

초기값으로 배열의 첫 번째 요소를 넣는다. 현재 값이 누적값보다 크면 현재 값을 반환하고, 아니면 누적값을 유지한다.

더 짧게 쓰면:

```javascript
const max = numbers.reduce((acc, cur) => cur > acc ? cur : acc, numbers[0]);
```

### 3. 등수별 당첨 개수를 셀 때

로또 미션에서 등수별로 몇 개씩 당첨됐는지 세는 데 쓸 수 있다.

```javascript
const ranks = [5, 5, 4, 3, 5, 5];  // 각 로또의 등수

const count = ranks.reduce((acc, rank) => {
  acc[rank] = (acc[rank] || 0) + 1;
  return acc;
}, {});

console.log(count);  // { 3: 1, 4: 1, 5: 4 }
```

초기값으로 빈 객체 `{}`를 넣고, 각 등수가 나올 때마다 해당 키의 값을 1씩 증가시킨다.

### 4. 총 상금을 계산할 때

```javascript
const results = [
  { rank: 5, prize: 5000 },
  { rank: 4, prize: 50000 },
  { rank: 5, prize: 5000 }
];

const totalPrize = results.reduce((acc, result) => acc + result.prize, 0);

console.log(totalPrize);  // 60000
```

## 주의사항

### 1. 초기값을 꼭 넣어라

초기값을 생략하면 배열의 첫 번째 요소가 초기값이 된다. 하지만 빈 배열일 때 에러가 난다.

```javascript
// 빈 배열 + 초기값 없음 = 에러!
const empty = [];
const sum = empty.reduce((acc, cur) => acc + cur);
// TypeError: Reduce of empty array with no initial value
```

```javascript
// 빈 배열 + 초기값 있음 = 안전
const empty = [];
const sum = empty.reduce((acc, cur) => acc + cur, 0);

console.log(sum);  // 0
```

### 2. 반드시 return이 있어야 한다

return을 빼먹으면 다음 accumulator가 undefined가 된다.

```javascript
// 잘못된 예시
const sum = [1, 2, 3].reduce((acc, cur) => {
  acc + cur;  // return이 없음!
}, 0);

console.log(sum);  // undefined
```

```javascript
// 올바른 예시
const sum = [1, 2, 3].reduce((acc, cur) => {
  return acc + cur;
}, 0);

console.log(sum);  // 6
```

### 3. reduce는 복잡하면 for문으로 대체해도 된다

reduce가 익숙하지 않으면 for문으로 써도 된다. 동작은 똑같다. 코드가 읽기 어려우면 for문이 나을 수도 있다.
