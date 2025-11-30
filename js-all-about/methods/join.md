# join()

## 한 줄 요약

배열의 모든 요소를 하나의 문자열로 합친다.

## 문법

```javascript
배열.join(구분자)
```

배열의 요소들을 구분자로 연결해서 문자열을 반환한다. 원본 배열은 변경되지 않는다.

```javascript
const names = ["pobi", "woni", "jun"];
const result = names.join(",");

console.log(names);   // ["pobi", "woni", "jun"] (원본 유지)
console.log(result);  // "pobi,woni,jun"
```

구분자를 생략하면 기본값으로 쉼표가 사용된다.

```javascript
["a", "b", "c"].join()   // "a,b,c"
["a", "b", "c"].join(",") // "a,b,c" (위와 동일)
```

## 이럴 때 사용한다

### 1. 여러 데이터를 하나의 문자열로 출력할 때

우테코 미션에서 우승자가 여러 명일 때 `"pobi, woni"`처럼 쉼표로 구분해서 출력해야 한다. 배열을 그대로 출력하면 `["pobi", "woni"]`가 나오니까, join을 써서 문자열로 합쳐야 한다.

```javascript
const winners = ["pobi", "woni"];
const result = winners.join(", ");

console.log(`최종 우승자 : ${result}`);
// 최종 우승자 : pobi, woni
```

### 2. 배열을 다시 문자열로 만들어야 할 때

split으로 쪼갠 배열을 다시 문자열로 합칠 때 join을 쓴다. split과 join은 서로 반대 역할이다.

```javascript
// 문자열 → 배열
"a,b,c".split(",")      // ["a", "b", "c"]

// 배열 → 문자열
["a", "b", "c"].join(",")  // "a,b,c"
```

### 3. 문자열을 뒤집을 때

split으로 한 글자씩 쪼개고, reverse로 뒤집고, join으로 다시 합친다.

```javascript
const original = "hello";
const reversed = original.split("").reverse().join("");
// "olleh"
```

여기서 join("")은 구분자 없이 그냥 붙이는 것이다.

### 4. 배열 요소를 특정 형식으로 연결할 때

구분자를 다양하게 바꿔서 원하는 형식을 만들 수 있다.

```javascript
const words = ["JavaScript", "is", "fun"];

words.join(" ")    // "JavaScript is fun" (공백)
words.join("-")    // "JavaScript-is-fun" (하이픈)
words.join("")     // "JavaScriptisfun" (구분자 없음)
words.join("\n")   // 줄바꿈으로 연결
```

## 주의사항

배열에 숫자가 있어도 join의 결과는 항상 문자열이다.

```javascript
const numbers = [1, 2, 3];
const result = numbers.join(",");

console.log(result);         // "1,2,3"
console.log(typeof result);  // "string"
```
