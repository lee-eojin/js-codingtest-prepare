# split()

## 한 줄 요약

문자열을 특정 구분자로 잘라서 배열로 만든다.

## 문법

```javascript
문자열.split(구분자)
```

구분자를 기준으로 문자열을 나눠서 배열을 반환한다. 원본 문자열은 변경되지 않는다.

```javascript
const input = "pobi,woni,jun";
const result = input.split(",");

console.log(input);   // "pobi,woni,jun" (원본 유지)
console.log(result);  // ["pobi", "woni", "jun"]
```

## 이럴 때 사용한다

### 1. 사용자 입력을 여러 개로 나눠야 할 때

우테코 미션에서 "자동차 이름을 입력하세요"라고 하면 사용자는 `"pobi,woni,jun"`처럼 쉼표로 구분해서 입력한다. 이 문자열을 그대로 쓸 수는 없고, 각각의 이름을 따로 꺼내서 처리해야 한다. split을 써서 배열로 만들면 반복문으로 각 이름을 처리할 수 있다.

```javascript
const input = "pobi,woni,jun";
const names = input.split(",");  // ["pobi", "woni", "jun"]

for (const name of names) {
  console.log(name);
}
```

구분자는 쉼표 외에도 다양하게 쓸 수 있다.

```javascript
"a,b,c".split(",")      // ["a", "b", "c"] 쉼표
"a b c".split(" ")      // ["a", "b", "c"] 공백
"1:2:3".split(":")      // ["1", "2", "3"] 콜론
```

### 2. 문자열을 한 글자씩 쪼개야 할 때

구분자를 빈 문자열 `""`로 주면 한 글자씩 나눠진다. 문자열의 각 글자를 확인하거나 뒤집을 때 사용한다.

```javascript
"hello".split("")  // ["h", "e", "l", "l", "o"]
```

문자열 뒤집기 예시:

```javascript
const original = "hello";
const reversed = original.split("").reverse().join("");
// "olleh"
```

reverse()는 배열을 뒤집는 메서드, join()은 배열을 문자열로 합치는 메서드다. 이 세 개를 조합하면 문자열을 뒤집을 수 있다.

### 3. 여러 줄로 된 데이터를 처리할 때

줄바꿈 문자 `\n`으로 split하면 각 줄을 배열의 요소로 만들 수 있다.

```javascript
const data = "첫째줄\n둘째줄\n셋째줄";
const lines = data.split("\n");  // ["첫째줄", "둘째줄", "셋째줄"]
```

## 주의사항

split의 결과는 항상 문자열 배열이다. 숫자처럼 보여도 실제로는 문자열이다.

```javascript
"1,2,3".split(",")  // ["1", "2", "3"] ← 문자열!
```

숫자로 계산하려면 Number()로 변환해야 한다.

```javascript
const strings = "1,2,3".split(",");  // ["1", "2", "3"]
const numbers = [];

for (const str of strings) {
  numbers.push(Number(str));
}

console.log(numbers);  // [1, 2, 3] ← 숫자!
```
