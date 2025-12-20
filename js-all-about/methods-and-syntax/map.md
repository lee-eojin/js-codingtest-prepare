# map()

## 한 줄 요약

배열의 모든 요소를 변환해서 새로운 배열을 만든다.

## 문법

```javascript
배열.map(함수)
```

## map이 하는 일

map은 배열의 각 요소를 하나씩 꺼내서, 함수에 넣고, 그 결과를 새 배열에 담는다. 이걸 배열의 모든 요소에 대해 반복한다.

```javascript
const numbers = [1, 2, 3];
const doubled = numbers.map(function(num) {
  return num * 2;
});

console.log(doubled);  // [2, 4, 6]
```

위 코드가 실행되는 과정을 단계별로 보면:

1. numbers 배열의 첫 번째 요소 `1`을 꺼낸다
2. 함수에 `1`을 넣는다 → `1 * 2` → `2`가 반환됨
3. 반환된 `2`를 새 배열에 담는다
4. 두 번째 요소 `2`를 꺼낸다
5. 함수에 `2`를 넣는다 → `2 * 2` → `4`가 반환됨
6. 반환된 `4`를 새 배열에 담는다
7. 세 번째 요소 `3`을 꺼낸다
8. 함수에 `3`을 넣는다 → `3 * 2` → `6`이 반환됨
9. 반환된 `6`을 새 배열에 담는다
10. 최종 결과: `[2, 4, 6]`

## for문으로 바꾸면?

map은 사실 for문을 짧게 쓴 것이다. 아래 두 코드는 같은 결과를 낸다.

```javascript
// for문 버전
const numbers = [1, 2, 3];
const doubled = [];

for (const num of numbers) {
  doubled.push(num * 2);
}

console.log(doubled);  // [2, 4, 6]
```

```javascript
// map 버전
const numbers = [1, 2, 3];
const doubled = numbers.map((num) => num * 2);

console.log(doubled);  // [2, 4, 6]
```

map을 쓰면 코드가 짧아지고, "배열을 변환한다"는 의도가 명확하게 드러난다.

## 화살표 함수로 짧게 쓰기

map 안의 함수는 여러 형태로 쓸 수 있다.

```javascript
// 일반 함수
numbers.map(function(num) {
  return num * 2;
});

// 화살표 함수 (기본)
numbers.map((num) => {
  return num * 2;
});

// 화살표 함수 (짧게) - 한 줄이면 중괄호와 return 생략 가능
numbers.map((num) => num * 2);
```

세 코드 모두 같은 결과를 낸다. 보통 가장 짧은 형태를 많이 쓴다.

## 이럴 때 사용한다

### 1. 문자열 배열을 숫자 배열로 바꿀 때

split으로 나눈 결과는 문자열 배열이다. 숫자로 계산하려면 변환해야 한다.

```javascript
const input = "1,2,3";
const strings = input.split(",");  // ["1", "2", "3"] 문자열!

const numbers = strings.map((str) => Number(str));
console.log(numbers);  // [1, 2, 3] 숫자!
```

더 짧게 쓰면:

```javascript
const numbers = input.split(",").map(Number);
```

`map(Number)`는 각 요소에 Number 함수를 적용한다는 뜻이다. `map((str) => Number(str))`와 같은 의미다.

### 2. 객체 배열에서 특정 값만 뽑을 때

자동차 객체 배열에서 이름만 뽑아서 새 배열을 만들 때 쓴다.

```javascript
const cars = [
  { name: "pobi", position: 3 },
  { name: "woni", position: 2 },
  { name: "jun", position: 3 }
];

const names = cars.map((car) => car.name);
console.log(names);  // ["pobi", "woni", "jun"]
```

각 car 객체에서 name 속성만 꺼내서 새 배열을 만든다.

### 3. 입력값의 공백을 제거할 때

사용자가 `"pobi, woni, jun"`처럼 쉼표 뒤에 공백을 넣어서 입력할 수 있다. split만 하면 공백이 남아있다.

```javascript
const input = "pobi, woni, jun";
const names = input.split(",");
console.log(names);  // ["pobi", " woni", " jun"] 공백이 있음!
```

map과 trim을 써서 공백을 제거한다.

```javascript
const input = "pobi, woni, jun";
const names = input.split(",").map((name) => name.trim());
console.log(names);  // ["pobi", "woni", "jun"] 깔끔!
```

trim()은 문자열 앞뒤의 공백을 제거하는 메서드다.

## 주의사항

### 1. 반드시 return이 있어야 한다

함수에서 return을 빼먹으면 undefined가 반환된다.

```javascript
// 잘못된 예시
const result = [1, 2, 3].map((num) => {
  num * 2;  // return이 없음!
});
console.log(result);  // [undefined, undefined, undefined]
```

```javascript
// 올바른 예시
const result = [1, 2, 3].map((num) => {
  return num * 2;  // return 필수!
});
console.log(result);  // [2, 4, 6]
```

화살표 함수에서 중괄호 없이 쓰면 자동으로 return된다.

```javascript
const result = [1, 2, 3].map((num) => num * 2);  // 중괄호 없으면 return 자동
console.log(result);  // [2, 4, 6]
```

### 2. map은 항상 같은 길이의 배열을 반환한다

원본 배열이 3개면 결과 배열도 3개다. 일부 요소만 걸러내고 싶으면 map이 아니라 filter를 써야 한다.

### 3. 원본 배열은 변경되지 않는다

map은 새 배열을 만들어서 반환한다. 원본 배열은 그대로 유지된다.

```javascript
const original = [1, 2, 3];
const doubled = original.map((num) => num * 2);

console.log(original);  // [1, 2, 3] 그대로
console.log(doubled);   // [2, 4, 6] 새 배열
```
