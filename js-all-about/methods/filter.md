# filter()

## 한 줄 요약

조건에 맞는 요소만 걸러서 새로운 배열을 만든다.

## 문법

```javascript
배열.filter(함수)
```

## filter가 하는 일

filter는 배열의 각 요소를 함수에 넣어서, true가 반환되면 새 배열에 담고, false면 버린다.

```javascript
const numbers = [1, 2, 3, 4, 5];
const bigNumbers = numbers.filter(function(num) {
  return num > 3;
});

console.log(bigNumbers);  // [4, 5]
```

위 코드가 실행되는 과정을 단계별로 보면:

1. 첫 번째 요소 `1`을 꺼낸다
2. 함수에 넣는다 → `1 > 3` → `false` → 버림
3. 두 번째 요소 `2`를 꺼낸다
4. 함수에 넣는다 → `2 > 3` → `false` → 버림
5. 세 번째 요소 `3`을 꺼낸다
6. 함수에 넣는다 → `3 > 3` → `false` → 버림
7. 네 번째 요소 `4`를 꺼낸다
8. 함수에 넣는다 → `4 > 3` → `true` → 새 배열에 담음
9. 다섯 번째 요소 `5`를 꺼낸다
10. 함수에 넣는다 → `5 > 3` → `true` → 새 배열에 담음
11. 최종 결과: `[4, 5]`

## for문으로 바꾸면?

filter도 for문을 짧게 쓴 것이다.

```javascript
// for문 버전
const numbers = [1, 2, 3, 4, 5];
const bigNumbers = [];

for (const num of numbers) {
  if (num > 3) {
    bigNumbers.push(num);
  }
}

console.log(bigNumbers);  // [4, 5]
```

```javascript
// filter 버전
const numbers = [1, 2, 3, 4, 5];
const bigNumbers = numbers.filter((num) => num > 3);

console.log(bigNumbers);  // [4, 5]
```

## map과 filter의 차이

- map: 모든 요소를 변환한다. 결과 배열 길이가 같다.
- filter: 조건에 맞는 요소만 남긴다. 결과 배열 길이가 줄어들 수 있다.

```javascript
const numbers = [1, 2, 3, 4, 5];

numbers.map((num) => num * 2);     // [2, 4, 6, 8, 10] 길이 5
numbers.filter((num) => num > 3);  // [4, 5] 길이 2
```

## 이럴 때 사용한다

### 1. 특정 조건에 맞는 요소만 뽑을 때

우승자를 찾을 때 최대 위치와 같은 자동차만 걸러낸다.

```javascript
const cars = [
  { name: "pobi", position: 3 },
  { name: "woni", position: 2 },
  { name: "jun", position: 3 }
];

const maxPosition = 3;
const winners = cars.filter((car) => car.position === maxPosition);

console.log(winners);
// [{ name: "pobi", position: 3 }, { name: "jun", position: 3 }]
```

### 2. 유효한 값만 남길 때

빈 문자열이나 잘못된 값을 제거할 때 쓴다.

```javascript
const inputs = ["pobi", "", "woni", "", "jun"];
const validInputs = inputs.filter((input) => input !== "");

console.log(validInputs);  // ["pobi", "woni", "jun"]
```

더 짧게 쓰면:

```javascript
const validInputs = inputs.filter((input) => input);
```

빈 문자열 `""`은 falsy라서 false로 판단되고, 나머지 문자열은 truthy라서 true로 판단된다.

### 3. 중복 제거할 때

filter와 indexOf를 조합하면 중복을 제거할 수 있다.

```javascript
const numbers = [1, 2, 2, 3, 3, 3];
const unique = numbers.filter((num, index) => {
  return numbers.indexOf(num) === index;
});

console.log(unique);  // [1, 2, 3]
```

indexOf는 해당 값이 처음 나타나는 위치를 반환한다. 현재 index와 같으면 처음 나타난 것이고, 다르면 중복이다.

### 4. 특정 값 제외할 때

배열에서 특정 값을 제외하고 싶을 때 쓴다.

```javascript
const numbers = [1, 2, 3, 4, 5];
const without3 = numbers.filter((num) => num !== 3);

console.log(without3);  // [1, 2, 4, 5]
```

## 주의사항

### 1. 조건에 맞는 게 없으면 빈 배열을 반환한다

에러가 나지 않고 빈 배열 `[]`이 반환된다.

```javascript
const numbers = [1, 2, 3];
const result = numbers.filter((num) => num > 10);

console.log(result);  // []
```

### 2. 원본 배열은 변경되지 않는다

filter는 새 배열을 만들어서 반환한다.

```javascript
const original = [1, 2, 3, 4, 5];
const filtered = original.filter((num) => num > 3);

console.log(original);  // [1, 2, 3, 4, 5] 그대로
console.log(filtered);  // [4, 5] 새 배열
```

### 3. 함수는 반드시 true/false를 반환해야 한다

정확히는 truthy/falsy 값을 반환하면 된다. true로 판단되면 남기고, false로 판단되면 버린다.
