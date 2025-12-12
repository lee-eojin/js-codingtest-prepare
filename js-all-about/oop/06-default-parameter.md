# Default Parameter & Arguments

## 한 줄 요약

파라미터 기본값을 정할 수 있고, arguments로 모든 파라미터를 한번에 다룰 수 있다.

---

## Default Parameter

파라미터를 안 넣었을 때 기본값을 줄 수 있다.

```javascript
function 더하기(a, b = 10) {
  console.log(a + b);
}

더하기(1);  // 11
```

b에 값을 안 넣으면 기본값 10이 들어간다. 1 + 10 = 11.

---

## 다양한 default 값

### 수학 연산

```javascript
function 더하기(a, b = 2 * 5) {
  console.log(a + b);
}

더하기(1);  // 11
```

### 다른 파라미터 사용

```javascript
function 더하기(a, b = 2 * a) {
  console.log(a + b);
}

더하기(3);  // 9
```

b가 없으면 2 * a가 된다. a가 3이니까 b는 6. 3 + 6 = 9.

### 함수 호출

```javascript
function 임시함수() {
  return 10;
}

function 더하기(a, b = 임시함수()) {
  console.log(a + b);
}

더하기(3);  // 13
```

b가 없으면 임시함수()를 실행해서 그 결과값 10을 넣는다.

---

## arguments

함수 안에서 쓸 수 있는 특별한 키워드다. 모든 파라미터를 배열처럼 담고 있다.

```javascript
function 함수(a, b, c) {
  console.log(arguments);
}

함수(2, 3, 4);  // [2, 3, 4]
```

arguments는 입력된 파라미터를 전부 담은 배열 비슷한 자료다.

---

## arguments 활용

### 인덱스로 접근

```javascript
function 함수(a, b, c) {
  console.log(arguments[0]);  // 2
  console.log(arguments[1]);  // 3
  console.log(arguments[2]);  // 4
}

함수(2, 3, 4);
```

### 반복문으로 전부 출력

```javascript
function 함수(a, b, c) {
  for (var i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
}

함수(2, 3, 4);
```

파라미터 개수가 몇 개든 전부 처리할 수 있다.

---

## 주의할 점

arguments는 진짜 배열이 아니다. 배열처럼 생겼지만 유사배열(array-like object)이다. 그래서 배열 메서드(map, filter 등)를 바로 쓸 수 없다.

```javascript
function 함수(a, b, c) {
  arguments.map(x => x * 2);  // 에러
}
```

배열로 바꾸려면 spread를 쓴다.

```javascript
function 함수(a, b, c) {
  const arr = [...arguments];
  console.log(arr.map(x => x * 2));  // [4, 6, 8]
}

함수(2, 3, 4);
```

---

## 요즘은 rest parameter

arguments 대신 rest parameter를 더 많이 쓴다. 다음 문서에서 다룬다.
