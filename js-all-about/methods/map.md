# map()

## 한 줄 요약

배열의 모든 요소를 변환해서 새로운 배열을 만든다.

## 문법

```javascript
배열.map(함수)
```

배열의 각 요소에 함수를 적용하고, 그 결과들을 모아서 새 배열을 반환한다. 원본 배열은 변경되지 않는다.

```javascript
const numbers = [1, 2, 3];
const doubled = numbers.map(function(num) {
  return num * 2;
});

console.log(numbers);  // [1, 2, 3] (원본 유지)
console.log(doubled);  // [2, 4, 6]
```

화살표 함수로 더 짧게 쓸 수 있다.

```javascript
const doubled = numbers.map((num) => num * 2);
```

## 이럴 때 사용한다

### 1. 배열의 모든 요소를 변환할 때

split으로 나눈 문자열 배열을 숫자 배열로 바꿀 때 자주 쓴다.

```javascript
const input = "1,2,3";
const strings = input.split(",");  // ["1", "2", "3"]
const numbers = strings.map((str) => Number(str));  // [1, 2, 3]
```

더 짧게 쓰면:

```javascript
const numbers = input.split(",").map(Number);  // [1, 2, 3]
```

`map(Number)`는 `map((str) => Number(str))`와 같은 의미다.

### 2. 객체 배열에서 특정 값만 뽑을 때

자동차 객체 배열에서 이름만 뽑아서 새 배열을 만들 때 쓴다.

```javascript
const cars = [
  { name: "pobi", position: 3 },
  { name: "woni", position: 2 },
  { name: "jun", position: 3 }
];

const names = cars.map((car) => car.name);
// ["pobi", "woni", "jun"]
```

### 3. 입력값 정리할 때

사용자 입력에서 앞뒤 공백을 제거하는 데 자주 쓴다.

```javascript
const input = "pobi, woni, jun";  // 쉼표 뒤에 공백이 있음
const names = input.split(",").map((name) => name.trim());
// ["pobi", "woni", "jun"]
```

trim()은 문자열 앞뒤의 공백을 제거하는 메서드다.

## 주의사항

### 1. 반드시 return이 있어야 한다

return을 빼먹으면 undefined로 채워진 배열이 만들어진다.

```javascript
// 잘못된 예시
const result = [1, 2, 3].map((num) => {
  num * 2;  // return이 없음!
});
// [undefined, undefined, undefined]

// 올바른 예시
const result = [1, 2, 3].map((num) => {
  return num * 2;
});
// [2, 4, 6]
```

화살표 함수에서 중괄호 없이 쓰면 자동으로 return된다.

```javascript
const result = [1, 2, 3].map((num) => num * 2);  // return 생략 가능
// [2, 4, 6]
```

### 2. map은 항상 같은 길이의 배열을 반환한다

원본 배열이 3개면 결과도 3개다. 일부만 걸러내고 싶으면 filter를 써야 한다.
