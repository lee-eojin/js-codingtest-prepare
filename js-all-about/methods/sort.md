# sort()

## 한 줄 요약

배열을 정렬한다.

## 문법

```javascript
배열.sort()
배열.sort(비교함수)
```

## sort가 하는 일

배열의 요소들을 순서대로 정렬한다. 기본적으로 문자열 기준으로 정렬한다.

```javascript
const fruits = ["banana", "apple", "cherry"];
fruits.sort();

console.log(fruits);  // ["apple", "banana", "cherry"]
```

## 숫자 정렬 주의사항

숫자 배열을 그냥 sort()하면 예상과 다르게 정렬된다.

```javascript
const numbers = [10, 2, 30, 4, 5];
numbers.sort();

console.log(numbers);  // [10, 2, 30, 4, 5] → [10, 2, 30, 4, 5]가 아니라...
// 실제 결과: [10, 2, 30, 4, 5]
```

왜냐하면 sort()는 기본적으로 요소를 문자열로 변환해서 비교하기 때문이다. "10"은 "2"보다 앞에 온다 (첫 글자 "1"이 "2"보다 작으니까).

숫자를 제대로 정렬하려면 비교 함수를 넣어야 한다.

```javascript
const numbers = [10, 2, 30, 4, 5];

// 오름차순 (작은 수 → 큰 수)
numbers.sort((a, b) => a - b);
console.log(numbers);  // [2, 4, 5, 10, 30]

// 내림차순 (큰 수 → 작은 수)
numbers.sort((a, b) => b - a);
console.log(numbers);  // [30, 10, 5, 4, 2]
```

## 비교 함수가 작동하는 원리

비교 함수는 두 요소 a, b를 받아서:
- 음수를 반환하면: a가 앞으로
- 양수를 반환하면: b가 앞으로
- 0을 반환하면: 순서 유지

```javascript
// a - b 의 의미
// a = 2, b = 10 일 때
// 2 - 10 = -8 (음수) → 2가 앞으로 → 오름차순

// b - a 의 의미
// a = 2, b = 10 일 때
// 10 - 2 = 8 (양수) → 10이 앞으로 → 내림차순
```

외울 필요 없이 이렇게 기억하면 된다:
- 오름차순: `(a, b) => a - b`
- 내림차순: `(a, b) => b - a`

## 이럴 때 사용한다

### 1. 로또 번호를 오름차순으로 정렬할 때

로또 미션에서 번호를 오름차순으로 출력해야 한다.

```javascript
const lottoNumbers = [42, 7, 15, 1, 35, 23];
lottoNumbers.sort((a, b) => a - b);

console.log(lottoNumbers);  // [1, 7, 15, 23, 35, 42]
```

### 2. 우승자를 이름순으로 정렬할 때

문자열은 그냥 sort()해도 된다.

```javascript
const winners = ["woni", "pobi", "jun"];
winners.sort();

console.log(winners);  // ["jun", "pobi", "woni"]
```

### 3. 객체 배열을 특정 속성으로 정렬할 때

자동차를 위치 순으로 정렬할 때:

```javascript
const cars = [
  { name: "pobi", position: 3 },
  { name: "woni", position: 5 },
  { name: "jun", position: 2 }
];

// position 오름차순
cars.sort((a, b) => a.position - b.position);

console.log(cars);
// [
//   { name: "jun", position: 2 },
//   { name: "pobi", position: 3 },
//   { name: "woni", position: 5 }
// ]
```

### 4. 이름순으로 객체 정렬할 때

문자열 속성으로 정렬하려면 localeCompare를 쓴다.

```javascript
const cars = [
  { name: "woni", position: 3 },
  { name: "pobi", position: 5 },
  { name: "jun", position: 2 }
];

cars.sort((a, b) => a.name.localeCompare(b.name));

console.log(cars);
// [
//   { name: "jun", position: 2 },
//   { name: "pobi", position: 5 },
//   { name: "woni", position: 3 }
// ]
```

## 주의사항

### 1. 원본 배열이 변경된다

다른 메서드들과 달리 sort는 원본 배열을 직접 변경한다.

```javascript
const original = [3, 1, 2];
const sorted = original.sort((a, b) => a - b);

console.log(original);  // [1, 2, 3] 원본이 바뀜!
console.log(sorted);    // [1, 2, 3]
console.log(original === sorted);  // true (같은 배열)
```

원본을 유지하려면 복사 후 정렬해야 한다.

```javascript
const original = [3, 1, 2];
const sorted = [...original].sort((a, b) => a - b);

console.log(original);  // [3, 1, 2] 원본 유지
console.log(sorted);    // [1, 2, 3]
```

### 2. 숫자는 반드시 비교 함수를 넣어라

그냥 sort()하면 문자열로 비교되어 이상하게 정렬된다.

```javascript
// 잘못된 예시
[10, 2, 1].sort()           // [1, 10, 2] (문자열 비교)

// 올바른 예시
[10, 2, 1].sort((a, b) => a - b)  // [1, 2, 10]
```

### 3. 정렬은 불안정할 수 있다

같은 값을 가진 요소들의 원래 순서가 유지되지 않을 수 있다. 대부분의 경우 문제가 되지 않지만, 순서가 중요하다면 주의해야 한다.
