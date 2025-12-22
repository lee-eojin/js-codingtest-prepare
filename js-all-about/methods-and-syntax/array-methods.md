# 배열 메서드

## 한 줄 요약

배열을 다루는 내장 메서드들. 반복문 대신 자주 쓴다.

---

## 조건 확인 메서드

### some() - 하나라도 만족하면 true

```javascript
const numbers = [1, 2, -3, 4];

numbers.some(num => num < 0);  // true (-3이 있으니까)
```

```javascript
const numbers = [1, 2, 3, 4];

numbers.some(num => num < 0);  // false (음수 없음)
```

하나라도 조건 만족하면 바로 true 반환하고 멈춤.

### every() - 전부 만족하면 true

```javascript
const numbers = [2, 4, 6, 8];

numbers.every(num => num % 2 === 0);  // true (전부 짝수)
```

```javascript
const numbers = [2, 4, 5, 8];

numbers.every(num => num % 2 === 0);  // false (5는 홀수)
```

하나라도 조건 불만족하면 바로 false 반환하고 멈춤.

---

## 변환 메서드

### map() - 각 요소 변환

```javascript
const strings = ['1', '2', '3'];

strings.map(Number);  // [1, 2, 3]
```

```javascript
const numbers = [1, 2, 3];

numbers.map(n => n * 2);  // [2, 4, 6]
```

원본 배열 안 바뀜. 새 배열 반환.

### filter() - 조건에 맞는 요소만

```javascript
const numbers = [1, 2, 3, 4, 5];

numbers.filter(n => n > 2);  // [3, 4, 5]
```

```javascript
const words = ['apple', 'banana', 'cherry'];

words.filter(w => w.length > 5);  // ['banana', 'cherry']
```

### reduce() - 누적 계산

```javascript
const numbers = [1, 2, 3, 4];

numbers.reduce((acc, cur) => acc + cur, 0);  // 10
```

- `acc` → 누적값 (accumulator)
- `cur` → 현재값 (current)
- `0` → 초기값

---

## 검색 메서드

### find() - 조건 맞는 첫 번째 요소

```javascript
const numbers = [1, 5, 10, 15];

numbers.find(n => n > 7);  // 10
```

못 찾으면 `undefined` 반환.

### findIndex() - 조건 맞는 첫 번째 인덱스

```javascript
const numbers = [1, 5, 10, 15];

numbers.findIndex(n => n > 7);  // 2
```

못 찾으면 `-1` 반환.

### includes() - 포함 여부

```javascript
const numbers = [1, 2, 3];

numbers.includes(2);  // true
numbers.includes(5);  // false
```

### indexOf() - 요소의 인덱스

```javascript
const fruits = ['apple', 'banana', 'cherry'];

fruits.indexOf('banana');  // 1
fruits.indexOf('grape');   // -1 (없음)
```

---

## 정렬 메서드

### sort() - 정렬 (원본 변경됨!)

```javascript
// 문자열 정렬 (기본)
['banana', 'apple', 'cherry'].sort();  // ['apple', 'banana', 'cherry']

// 숫자 오름차순
[3, 1, 4, 1, 5].sort((a, b) => a - b);  // [1, 1, 3, 4, 5]

// 숫자 내림차순
[3, 1, 4, 1, 5].sort((a, b) => b - a);  // [5, 4, 3, 1, 1]
```

주의: 원본 배열이 바뀜!

### reverse() - 뒤집기 (원본 변경됨!)

```javascript
[1, 2, 3].reverse();  // [3, 2, 1]
```

---

## 추가/제거 메서드

### push() - 끝에 추가

```javascript
const arr = [1, 2];
arr.push(3);  // arr = [1, 2, 3]
```

### pop() - 끝에서 제거

```javascript
const arr = [1, 2, 3];
arr.pop();  // 3 반환, arr = [1, 2]
```

### unshift() - 앞에 추가

```javascript
const arr = [1, 2];
arr.unshift(0);  // arr = [0, 1, 2]
```

### shift() - 앞에서 제거

```javascript
const arr = [1, 2, 3];
arr.shift();  // 1 반환, arr = [2, 3]
```

### splice() - 중간 추가/제거

```javascript
const arr = [1, 2, 3, 4];
arr.splice(1, 2);  // [2, 3] 반환, arr = [1, 4]
// splice(시작인덱스, 제거개수)
```

---

## 기타 메서드

### join() - 배열 → 문자열

```javascript
[1, 2, 3].join(',');   // '1,2,3'
[1, 2, 3].join(' - '); // '1 - 2 - 3'
```

### slice() - 일부 복사

```javascript
const arr = [1, 2, 3, 4, 5];
arr.slice(1, 3);  // [2, 3] (인덱스 1~2)
arr.slice(2);     // [3, 4, 5] (인덱스 2부터 끝까지)
```

원본 안 바뀜.

### concat() - 배열 합치기

```javascript
[1, 2].concat([3, 4]);  // [1, 2, 3, 4]
```

---

## 우테코 활용 예시

### 로또 번호 중복 체크

```javascript
const numbers = [1, 2, 3, 4, 5, 6];
const uniqueNumbers = new Set(numbers);

if (numbers.length !== uniqueNumbers.size) {
  throw new Error('[ERROR] 중복된 번호가 있습니다.');
}
```

### 음수 체크

```javascript
if (numbers.some(num => num < 0)) {
  throw new Error('[ERROR] 음수는 입력할 수 없습니다.');
}
```

### 문자열 배열 → 숫자 배열

```javascript
const strings = ['1', '2', '3'];
const numbers = strings.map(Number);  // [1, 2, 3]
```

### 합계 구하기

```javascript
const sum = numbers.reduce((acc, cur) => acc + cur, 0);
```
