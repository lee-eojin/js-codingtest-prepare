# forEach()

## 한 줄 요약

배열의 모든 요소에 대해 함수를 실행한다.

## 문법

```javascript
배열.forEach(함수)
```

## forEach가 하는 일

forEach는 배열의 각 요소를 하나씩 꺼내서 함수에 넣고 실행한다. 반환값은 없다.

```javascript
const names = ["pobi", "woni", "jun"];

names.forEach(function(name) {
  console.log(name);
});

// 출력:
// pobi
// woni
// jun
```

위 코드가 실행되는 과정:

1. 첫 번째 요소 `"pobi"`를 함수에 넣고 실행 → `console.log("pobi")`
2. 두 번째 요소 `"woni"`를 함수에 넣고 실행 → `console.log("woni")`
3. 세 번째 요소 `"jun"`를 함수에 넣고 실행 → `console.log("jun")`

## for문으로 바꾸면?

forEach는 for문과 거의 같다.

```javascript
// for문 버전
const names = ["pobi", "woni", "jun"];

for (const name of names) {
  console.log(name);
}
```

```javascript
// forEach 버전
const names = ["pobi", "woni", "jun"];

names.forEach((name) => {
  console.log(name);
});
```

## map과 forEach의 차이

- map: 새 배열을 반환한다. 변환할 때 쓴다.
- forEach: 반환값이 없다. 그냥 실행만 한다.

```javascript
const numbers = [1, 2, 3];

// map - 새 배열을 반환
const doubled = numbers.map((num) => num * 2);
console.log(doubled);  // [2, 4, 6]

// forEach - 반환값 없음
const result = numbers.forEach((num) => num * 2);
console.log(result);  // undefined
```

변환된 배열이 필요하면 map, 그냥 실행만 하면 되면 forEach를 쓴다.

## 이럴 때 사용한다

### 1. 배열의 각 요소를 출력할 때

```javascript
const cars = [
  { name: "pobi", position: 3 },
  { name: "woni", position: 2 }
];

cars.forEach((car) => {
  const progress = "-".repeat(car.position);
  console.log(`${car.name} : ${progress}`);
});

// 출력:
// pobi : ---
// woni : --
```

### 2. 배열의 각 요소에 어떤 작업을 할 때

각 자동차를 전진시키는 예시:

```javascript
const cars = [
  { name: "pobi", position: 0 },
  { name: "woni", position: 0 }
];

cars.forEach((car) => {
  const random = Math.floor(Math.random() * 10);
  if (random >= 4) {
    car.position = car.position + 1;
  }
});
```

### 3. 인덱스가 필요할 때

forEach는 두 번째 인자로 인덱스를 받을 수 있다.

```javascript
const names = ["pobi", "woni", "jun"];

names.forEach((name, index) => {
  console.log(`${index + 1}번: ${name}`);
});

// 출력:
// 1번: pobi
// 2번: woni
// 3번: jun
```

## 주의사항

### 1. forEach는 반환값이 없다

forEach 안에서 return을 해도 의미가 없다. 새 배열이 필요하면 map을 써야 한다.

```javascript
// 이렇게 하면 안 됨
const doubled = numbers.forEach((num) => {
  return num * 2;
});
console.log(doubled);  // undefined

// 이렇게 해야 함
const doubled = numbers.map((num) => num * 2);
console.log(doubled);  // [2, 4, 6]
```

### 2. forEach는 중간에 멈출 수 없다

for문은 break로 중간에 멈출 수 있지만, forEach는 안 된다. 중간에 멈춰야 하면 for문을 쓰거나 find/some을 써야 한다.

```javascript
// for문은 break 가능
for (const num of numbers) {
  if (num === 3) break;
  console.log(num);
}

// forEach는 break 불가능 (에러남)
numbers.forEach((num) => {
  if (num === 3) break;  // SyntaxError!
  console.log(num);
});
```

### 3. 웬만하면 for...of를 써도 된다

forEach와 for...of는 거의 같다. 취향 차이라서 편한 걸 쓰면 된다.

```javascript
// forEach
names.forEach((name) => {
  console.log(name);
});

// for...of (같은 동작)
for (const name of names) {
  console.log(name);
}
```
