# includes()

## 한 줄 요약

배열이나 문자열에 특정 값이 포함되어 있는지 확인한다.

## 문법

```javascript
배열.includes(찾을값)
문자열.includes(찾을값)
```

포함되어 있으면 true, 없으면 false를 반환한다.

## includes가 하는 일

배열이나 문자열을 처음부터 끝까지 훑으면서 찾는 값이 있는지 확인한다.

```javascript
const numbers = [1, 2, 3, 4, 5];

console.log(numbers.includes(3));  // true
console.log(numbers.includes(10)); // false
```

문자열에서도 쓸 수 있다.

```javascript
const message = "hello world";

console.log(message.includes("world"));  // true
console.log(message.includes("foo"));    // false
```

## for문으로 바꾸면?

```javascript
// for문 버전
const numbers = [1, 2, 3, 4, 5];
let hasThree = false;

for (const num of numbers) {
  if (num === 3) {
    hasThree = true;
    break;
  }
}

console.log(hasThree);  // true
```

```javascript
// includes 버전
const numbers = [1, 2, 3, 4, 5];
const hasThree = numbers.includes(3);

console.log(hasThree);  // true
```

## 이럴 때 사용한다

### 1. 중복 검사할 때

로또 번호에 이미 있는 숫자인지 확인할 때 쓴다.

```javascript
const lottoNumbers = [1, 7, 15, 23, 35, 42];
const bonusNumber = 7;

if (lottoNumbers.includes(bonusNumber)) {
  throw new Error("[ERROR] 보너스 번호가 당첨 번호와 중복됩니다.");
}
```

### 2. 유효한 값인지 검사할 때

입력값이 허용된 값 목록에 있는지 확인할 때 쓴다.

```javascript
const validCommands = ["Y", "N"];
const userInput = "Y";

if (!validCommands.includes(userInput)) {
  throw new Error("[ERROR] Y 또는 N만 입력 가능합니다.");
}
```

### 3. 특정 문자가 포함되어 있는지 확인할 때

```javascript
const input = "//;\n1;2;3";

if (input.includes("//")) {
  console.log("커스텀 구분자가 있습니다.");
}
```

### 4. 당첨 번호와 일치하는지 확인할 때

로또 미션에서 내 번호가 당첨 번호에 포함되는지 확인할 때 쓴다.

```javascript
const winningNumbers = [1, 7, 15, 23, 35, 42];
const myNumbers = [7, 15, 23, 30, 35, 42];

let matchCount = 0;

for (const myNum of myNumbers) {
  if (winningNumbers.includes(myNum)) {
    matchCount = matchCount + 1;
  }
}

console.log(matchCount);  // 5
```

## indexOf와의 차이

indexOf는 위치를 반환하고, includes는 true/false를 반환한다.

```javascript
const numbers = [1, 2, 3];

// indexOf - 위치 반환 (없으면 -1)
numbers.indexOf(2);   // 1
numbers.indexOf(10);  // -1

// includes - true/false 반환
numbers.includes(2);   // true
numbers.includes(10);  // false
```

단순히 있는지 없는지만 확인할 때는 includes가 더 읽기 쉽다.

```javascript
// indexOf 사용 (읽기 어려움)
if (numbers.indexOf(3) !== -1) {
  console.log("있음");
}

// includes 사용 (읽기 쉬움)
if (numbers.includes(3)) {
  console.log("있음");
}
```

## 주의사항

### 1. 객체는 같은 참조여야 찾을 수 있다

객체 배열에서 includes를 쓰면 예상과 다르게 동작할 수 있다.

```javascript
const cars = [{ name: "pobi" }, { name: "woni" }];

// 새로 만든 객체는 찾을 수 없음
console.log(cars.includes({ name: "pobi" }));  // false

// 같은 참조면 찾을 수 있음
const pobi = { name: "pobi" };
const cars2 = [pobi, { name: "woni" }];
console.log(cars2.includes(pobi));  // true
```

객체 배열에서 특정 조건으로 찾으려면 find나 some을 써야 한다.

### 2. 대소문자를 구분한다

```javascript
const message = "Hello World";

console.log(message.includes("hello"));  // false
console.log(message.includes("Hello"));  // true
```

대소문자 무시하고 찾으려면 toLowerCase()로 변환 후 비교한다.

```javascript
const message = "Hello World";
console.log(message.toLowerCase().includes("hello"));  // true
```
