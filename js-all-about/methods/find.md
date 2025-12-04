# find()

## 한 줄 요약

조건에 맞는 첫 번째 요소를 찾아서 반환한다.

## 문법

```javascript
배열.find(함수)
```

조건에 맞는 요소를 찾으면 그 요소를 반환하고, 못 찾으면 undefined를 반환한다.

## find가 하는 일

배열을 처음부터 순회하면서 함수가 true를 반환하는 첫 번째 요소를 찾는다. 찾으면 바로 멈추고 그 요소를 반환한다.

```javascript
const numbers = [1, 2, 3, 4, 5];

const found = numbers.find(function(num) {
  return num > 3;
});

console.log(found);  // 4
```

위 코드가 실행되는 과정:

1. 첫 번째 요소 `1` → `1 > 3` → false → 다음으로
2. 두 번째 요소 `2` → `2 > 3` → false → 다음으로
3. 세 번째 요소 `3` → `3 > 3` → false → 다음으로
4. 네 번째 요소 `4` → `4 > 3` → true → `4` 반환하고 종료

`5`는 확인하지 않는다. 찾자마자 멈추기 때문이다.

## for문으로 바꾸면?

```javascript
// for문 버전
const numbers = [1, 2, 3, 4, 5];
let found = undefined;

for (const num of numbers) {
  if (num > 3) {
    found = num;
    break;
  }
}

console.log(found);  // 4
```

```javascript
// find 버전
const numbers = [1, 2, 3, 4, 5];
const found = numbers.find((num) => num > 3);

console.log(found);  // 4
```

## filter와의 차이

- filter: 조건에 맞는 모든 요소를 배열로 반환
- find: 조건에 맞는 첫 번째 요소 하나만 반환

```javascript
const numbers = [1, 2, 3, 4, 5];

// filter - 모든 요소 (배열)
const filtered = numbers.filter((num) => num > 3);
console.log(filtered);  // [4, 5]

// find - 첫 번째 요소 (값 하나)
const found = numbers.find((num) => num > 3);
console.log(found);  // 4
```

## 이럴 때 사용한다

### 1. 객체 배열에서 특정 조건의 객체를 찾을 때

이름으로 자동차를 찾을 때 쓴다.

```javascript
const cars = [
  { name: "pobi", position: 3 },
  { name: "woni", position: 2 },
  { name: "jun", position: 3 }
];

const pobi = cars.find((car) => car.name === "pobi");

console.log(pobi);  // { name: "pobi", position: 3 }
```

### 2. 특정 조건에 맞는 첫 번째 값을 찾을 때

```javascript
const numbers = [10, 20, 30, 40, 50];

// 25보다 큰 첫 번째 숫자
const firstBig = numbers.find((num) => num > 25);

console.log(firstBig);  // 30
```

### 3. 존재 여부를 확인하면서 값도 필요할 때

```javascript
const users = [
  { id: 1, name: "pobi" },
  { id: 2, name: "woni" }
];

const user = users.find((u) => u.id === 1);

if (user) {
  console.log(`${user.name}님 환영합니다.`);
} else {
  console.log("사용자를 찾을 수 없습니다.");
}
```

## includes와의 차이

- includes: 단순 값이 있는지 확인 (true/false)
- find: 조건으로 찾고, 찾은 요소를 반환

```javascript
const numbers = [1, 2, 3, 4, 5];

// includes - 3이 있는지만 확인
numbers.includes(3);  // true

// find - 조건으로 찾기
numbers.find((num) => num === 3);  // 3
numbers.find((num) => num > 3);    // 4
```

객체 배열에서는 includes가 안 되고 find를 써야 한다.

```javascript
const cars = [{ name: "pobi" }, { name: "woni" }];

// includes는 객체 비교가 안 됨
cars.includes({ name: "pobi" });  // false

// find는 조건으로 찾을 수 있음
cars.find((car) => car.name === "pobi");  // { name: "pobi" }
```

## 주의사항

### 1. 못 찾으면 undefined를 반환한다

에러가 나지 않고 undefined가 반환된다. 이걸 활용해서 존재 여부를 확인할 수 있다.

```javascript
const numbers = [1, 2, 3];
const found = numbers.find((num) => num > 10);

console.log(found);  // undefined

if (found === undefined) {
  console.log("찾을 수 없습니다.");
}
```

### 2. 첫 번째 요소만 반환한다

조건에 맞는 게 여러 개 있어도 첫 번째만 반환한다. 전부 필요하면 filter를 써야 한다.

```javascript
const numbers = [1, 2, 3, 4, 5];

// find - 첫 번째만
numbers.find((num) => num > 2);    // 3

// filter - 전부
numbers.filter((num) => num > 2);  // [3, 4, 5]
```

### 3. 원본 배열은 변경되지 않는다

find는 찾기만 하고 배열을 바꾸지 않는다.
