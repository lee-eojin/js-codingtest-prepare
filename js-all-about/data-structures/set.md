# Set

## 한 줄 요약

중복 없이 값을 저장한다.

## 왜 쓰나?

배열은 중복을 허용한다. 같은 값이 여러 번 들어갈 수 있다.

```javascript
const arr = [1, 2, 2, 3, 3, 3];
console.log(arr);  // [1, 2, 2, 3, 3, 3]
```

Set은 중복을 허용하지 않는다. 같은 값을 넣어도 하나만 저장된다.

```javascript
const set = new Set([1, 2, 2, 3, 3, 3]);
console.log(set);  // Set(3) {1, 2, 3}
```

## new Set()이 뭔가?

```javascript
const set1 = new Set();
```

이 코드를 분해하면:

- `const set1`: set1이라는 변수 선언
- `new`: 새로운 객체를 만들어라
- `Set()`: Set이라는 설계도(클래스)를 사용해서

`new`는 "새로운 인스턴스(객체)를 생성하라"는 키워드다. JS에 내장된 Set 클래스를 가져다가 실제로 쓸 수 있는 객체를 만드는 것.

배열과 비교하면 이해하기 쉽다.

```javascript
// 배열은 리터럴로 만들 수 있다
const arr = [];
const arr2 = [1, 2, 3];

// Set은 new로만 만들 수 있다
const set = new Set();
const set2 = new Set([1, 2, 3]);
```

배열은 `[]`라는 문법이 있어서 new 없이 만들 수 있지만, Set은 `new Set()`으로만 만들 수 있다.

괄호 안에 넣는 값은 초기값이다.

```javascript
new Set()           // 빈 Set
new Set([1, 2, 3])  // 1, 2, 3이 들어있는 Set
new Set("hello")    // 'h', 'e', 'l', 'o'가 들어있는 Set
```

## Set 만들기

```javascript
// 빈 Set
const set1 = new Set();

// 배열로 초기화
const set2 = new Set([1, 2, 3]);

// 문자열로 초기화 (각 문자가 요소가 됨)
const set3 = new Set("hello");  // Set(4) {'h', 'e', 'l', 'o'}
```

## 기본 메서드

- `add(값)`: 값 추가
- `delete(값)`: 값 삭제
- `has(값)`: 값 존재 여부 (true/false)
- `clear()`: 전체 삭제
- `size`: 요소 개수 (메서드 아님, 속성)

```javascript
const set = new Set();

set.add(1);
set.add(2);
set.add(3);
set.add(2);  // 무시됨 (이미 있음)

console.log(set.size);    // 3
console.log(set.has(2));  // true
console.log(set.has(5));  // false

set.delete(2);
console.log(set.has(2));  // false
```

## 배열 ↔ Set 변환

```javascript
// 배열 → Set
const arr = [1, 2, 2, 3];
const set = new Set(arr);

// Set → 배열
const backToArr = [...set];  // [1, 2, 3]
// 또는
const backToArr2 = Array.from(set);  // [1, 2, 3]
```

## 이럴 때 사용한다

### 1. 배열 중복 제거

가장 흔한 사용법.

```javascript
const numbers = [1, 2, 2, 3, 3, 3, 4];
const unique = [...new Set(numbers)];

console.log(unique);  // [1, 2, 3, 4]
```

한 줄로 중복 제거 끝.

### 2. 이미 처리한 값인지 체크 (방문 체크)

BFS/DFS에서 방문 여부를 체크할 때.

```javascript
const visited = new Set();

function visit(node) {
  if (visited.has(node)) {
    return;  // 이미 방문함
  }
  visited.add(node);
  // 처리 로직
}
```

배열로 하면 `includes()`를 써야 하는데, 이건 O(n)이다. Set의 `has()`는 O(1)이라 훨씬 빠르다.

### 3. 두 배열의 교집합/합집합/차집합

```javascript
const a = new Set([1, 2, 3, 4]);
const b = new Set([3, 4, 5, 6]);

// 교집합: 둘 다 있는 것
const intersection = [...a].filter(x => b.has(x));
console.log(intersection);  // [3, 4]

// 합집합: 둘 중 하나라도 있는 것
const union = new Set([...a, ...b]);
console.log([...union]);  // [1, 2, 3, 4, 5, 6]

// 차집합: a에만 있는 것
const difference = [...a].filter(x => !b.has(x));
console.log(difference);  // [1, 2]
```

### 4. 중복 이름 검사

우테코 2주차에서 자동차 이름 중복 검사할 때 썼던 패턴.

```javascript
function hasDuplicate(names) {
  const uniqueNames = new Set(names);
  return uniqueNames.size !== names.length;
}

console.log(hasDuplicate(['pobi', 'woni', 'jun']));   // false
console.log(hasDuplicate(['pobi', 'woni', 'pobi'])); // true
```

중복이 있으면 Set의 크기가 원본 배열보다 작아진다.

### 5. 문자열에서 고유 문자 개수

```javascript
const str = "hello";
const uniqueChars = new Set(str);

console.log(uniqueChars.size);  // 4 (h, e, l, o)
```

## Set 순회하기

```javascript
const set = new Set([1, 2, 3]);

// for...of
for (const value of set) {
  console.log(value);
}

// forEach
set.forEach(value => {
  console.log(value);
});
```

## 시간복잡도

Set은 추가, 삭제, 검색 전부 O(1)이다.

배열과 비교하면 검색에서 차이가 난다. 배열의 `includes()`는 처음부터 끝까지 훑어야 해서 O(n)이고, Set의 `has()`는 O(1)이다. 이게 핵심이다.

## 주의사항

### 1. 객체는 참조로 비교한다

```javascript
const set = new Set();

set.add({ name: 'pobi' });
set.add({ name: 'pobi' });

console.log(set.size);  // 2 (다른 객체로 취급)
```

내용이 같아도 다른 객체면 중복으로 안 친다. 객체의 중복 제거가 필요하면 다른 방법을 써야 한다.

### 2. 인덱스로 접근 불가

```javascript
const set = new Set([1, 2, 3]);

console.log(set[0]);  // undefined
```

Set은 순서가 있긴 하지만 인덱스 접근은 안 된다. 배열로 변환해서 써야 한다.

### 3. length가 아니라 size

```javascript
const set = new Set([1, 2, 3]);

console.log(set.length);  // undefined
console.log(set.size);    // 3
```

배열은 length, Set은 size다.
