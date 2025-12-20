# slice()

## 한 줄 요약

배열이나 문자열의 일부분을 잘라서 새로 반환한다.

## 문법

```javascript
배열.slice(시작인덱스, 끝인덱스)
문자열.slice(시작인덱스, 끝인덱스)
```

시작인덱스부터 끝인덱스 직전까지 잘라서 반환한다. 끝인덱스는 포함되지 않는다.

## slice가 하는 일

```javascript
const numbers = [0, 1, 2, 3, 4];
const sliced = numbers.slice(1, 4);

console.log(sliced);   // [1, 2, 3]
console.log(numbers);  // [0, 1, 2, 3, 4] (원본 유지)
```

인덱스 1부터 인덱스 4 직전(3)까지 잘라낸다.

```
인덱스:   0  1  2  3  4
값:     [0, 1, 2, 3, 4]
            ↑     ↑
          시작   끝(포함X)
결과:      [1, 2, 3]
```

## 다양한 사용법

### 끝인덱스 생략

끝인덱스를 생략하면 끝까지 잘라낸다.

```javascript
const numbers = [0, 1, 2, 3, 4];

numbers.slice(2);    // [2, 3, 4] (인덱스 2부터 끝까지)
numbers.slice(0);    // [0, 1, 2, 3, 4] (전체 복사)
```

### 음수 인덱스

음수를 쓰면 뒤에서부터 센다.

```javascript
const numbers = [0, 1, 2, 3, 4];

numbers.slice(-2);      // [3, 4] (뒤에서 2개)
numbers.slice(-3, -1);  // [2, 3] (뒤에서 3번째부터 1번째 직전까지)
```

### 문자열에서도 사용

```javascript
const message = "hello world";

message.slice(0, 5);   // "hello"
message.slice(6);      // "world"
message.slice(-5);     // "world" (뒤에서 5글자)
```

## 이럴 때 사용한다

### 1. 배열을 복사할 때

slice()를 인자 없이 호출하면 배열 전체를 복사한다.

```javascript
const original = [1, 2, 3];
const copy = original.slice();

copy.push(4);

console.log(original);  // [1, 2, 3] (원본 유지)
console.log(copy);      // [1, 2, 3, 4]
```

### 2. 배열의 일부만 가져올 때

```javascript
const lottoNumbers = [1, 7, 15, 23, 35, 42, 45];

// 앞에서 6개만
const mainNumbers = lottoNumbers.slice(0, 6);
console.log(mainNumbers);  // [1, 7, 15, 23, 35, 42]

// 마지막 1개 (보너스 번호)
const bonus = lottoNumbers.slice(-1);
console.log(bonus);  // [45]
```

### 3. 커스텀 구분자를 파싱할 때

문자열 계산기에서 `"//;\n1;2;3"` 형태의 입력을 파싱할 때:

```javascript
const input = "//;\n1;2;3";

// 구분자 추출 (인덱스 2의 문자)
const delimiter = input.slice(2, 3);
console.log(delimiter);  // ";"

// 숫자 부분 추출 (\n 이후)
const numberPart = input.slice(4);
console.log(numberPart);  // "1;2;3"
```

### 4. 문자열 앞뒤를 잘라낼 때

```javascript
const wrapped = "[ERROR] 잘못된 입력입니다.";

// [ERROR] 부분 제거
const message = wrapped.slice(8);
console.log(message);  // "잘못된 입력입니다."
```

## splice와의 차이

이름이 비슷해서 헷갈리기 쉽다.

- slice: 잘라서 새 배열 반환, 원본 유지
- splice: 원본 배열을 직접 수정

```javascript
const arr1 = [0, 1, 2, 3, 4];
const arr2 = [0, 1, 2, 3, 4];

// slice - 원본 유지
const sliced = arr1.slice(1, 3);
console.log(arr1);    // [0, 1, 2, 3, 4] (그대로)
console.log(sliced);  // [1, 2]

// splice - 원본 변경
const spliced = arr2.splice(1, 2);
console.log(arr2);     // [0, 3, 4] (1, 2가 제거됨)
console.log(spliced);  // [1, 2]
```

웬만하면 slice를 쓰는 게 안전하다. 원본을 유지하니까.

## 주의사항

### 1. 끝인덱스는 포함되지 않는다

```javascript
const numbers = [0, 1, 2, 3, 4];

numbers.slice(1, 3);  // [1, 2] (3은 포함 안 됨)
```

### 2. 원본은 변경되지 않는다

slice는 항상 새 배열/문자열을 반환한다. 원본은 그대로다.

```javascript
const original = [1, 2, 3];
const sliced = original.slice(0, 2);

console.log(original);  // [1, 2, 3]
console.log(sliced);    // [1, 2]
```

### 3. 범위를 벗어나도 에러가 나지 않는다

```javascript
const numbers = [1, 2, 3];

numbers.slice(0, 100);  // [1, 2, 3] (끝까지만)
numbers.slice(100);     // [] (빈 배열)
```
