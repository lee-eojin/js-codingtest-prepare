# Spread Operator

## 한 줄 요약

점 세 개(...)는 괄호를 벗겨준다.

---

## 기본 문법

마침표 3개를 연달아 찍으면 spread operator다.

```javascript
var 어레이 = ['hello', 'world'];
console.log(어레이);      // ['hello', 'world']
console.log(...어레이);   // hello world
```

배열에 붙이면 대괄호가 사라진다. 'hello', 'world'만 남는다.

---

## 문자열에 붙이면

문자열도 배열처럼 인덱스로 접근할 수 있다.

```javascript
var 문자 = 'hello';
console.log(문자[0]);  // 'h'
console.log(문자[1]);  // 'e'
```

그래서 spread를 붙이면 글자가 하나씩 펼쳐진다.

```javascript
var 문자 = 'hello';
console.log(...문자);  // h e l l o
```

`console.log('h', 'e', 'l', 'l', 'o')`랑 같다.

---

## 활용 1: 배열 합치기

```javascript
var a = [1, 2, 3];
var b = [4, 5];
var c = [...a, ...b];

console.log(c);  // [1, 2, 3, 4, 5]
```

a와 b의 괄호를 벗기고 새 배열에 넣으면 합쳐진다.

---

## 활용 2: 배열 복사

등호로 복사하면 문제가 생긴다.

```javascript
var a = [1, 2, 3];
var b = a;

a[0] = 100;
console.log(b);  // [100, 2, 3]
```

a를 수정했는데 b도 바뀐다. 왜? 등호는 값을 복사한 게 아니라 같은 배열을 가리키게 만든 것이다. 값 공유가 일어난다.

spread로 복사하면 독립적인 배열이 된다.

```javascript
var a = [1, 2, 3];
var b = [...a];

a[0] = 100;
console.log(b);  // [1, 2, 3]
```

a의 괄호를 벗기고 새 괄호로 감싸면 새로운 배열이 만들어진다. a와 b는 별개다.

---

## 활용 3: 객체 합치기

객체의 중괄호도 벗길 수 있다.

```javascript
var o1 = { a: 1, b: 2 };
var o2 = { c: 3, ...o1 };

console.log(o2);  // { c: 3, a: 1, b: 2 }
```

o1의 내용이 o2에 들어갔다.

---

## 활용 4: 객체 복사

배열과 마찬가지로 객체도 등호로 복사하면 값 공유가 일어난다.

```javascript
var o1 = { a: 1, b: 2 };
var o2 = { ...o1 };

o1.a = 100;
console.log(o2);  // { a: 1, b: 2 }
```

spread로 복사하면 독립적인 객체가 된다.

---

## 키 값 중복되면?

```javascript
var o1 = { a: 1, b: 2 };
var o2 = { a: 3, ...o1 };

console.log(o2);  // { a: 1, b: 2 }
```

같은 키가 있으면 뒤에 오는 게 이긴다. o2에 a: 3이 먼저 있고, ...o1에서 a: 1이 뒤에 왔으니 a: 1이 된다.

순서를 바꾸면 결과도 바뀐다.

```javascript
var o1 = { a: 1, b: 2 };
var o2 = { ...o1, a: 3 };

console.log(o2);  // { a: 3, b: 2 }
```

---

## 주의할 점

spread는 아무데서나 쓸 수 없다. 함수 소괄호, 배열 대괄호, 객체 중괄호 안에서만 쓴다.

```javascript
// 됨
console.log(...[1, 2, 3]);
var arr = [...[1, 2, 3]];
var obj = { ...{ a: 1 } };

// 안 됨
...arr;  // 에러
```

---

## 코테에서

배열 복사할 때 자주 쓴다.

```javascript
const original = [1, 2, 3];
const copy = [...original];
```

Math.max에 배열 넘길 때도 쓴다.

```javascript
const numbers = [3, 1, 4, 1, 5];
const max = Math.max(...numbers);  // 5
```

Math.max는 배열을 받지 않고 숫자들을 따로따로 받는다. spread로 괄호를 벗기면 된다.

---

## 활용 5: 함수 파라미터에 배열 넣기

함수가 파라미터를 여러 개 받을 때, 배열에 있는 값들을 넣고 싶으면 spread를 쓴다.

```javascript
function 더하기(a, b, c) {
  console.log(a + b + c);
}

var 어레이 = [10, 20, 30];
```

배열의 값들을 파라미터로 넣으려면?

```javascript
더하기(어레이[0], 어레이[1], 어레이[2]);  // 귀찮음
더하기(...어레이);  // 간단
```

spread로 괄호를 벗기면 `더하기(10, 20, 30)`이랑 같아진다.

---

## apply, call 함수

spread가 없던 시절엔 apply를 썼다.

```javascript
더하기(...어레이);           // 요즘 방식
더하기.apply(undefined, 어레이);  // 옛날 방식
```

apply가 뭔지 알아보자.

### apply 기본 개념

```javascript
var person = {
  인사: function() {
    console.log(this.name + ' 안녕');
  }
};

var person2 = {
  name: '손흥민'
};
```

person에 있는 인사() 함수를 person2에서 쓰고 싶다. person2에 함수를 새로 만들기 귀찮다.

apply를 쓰면 된다.

```javascript
person.인사.apply(person2);  // '손흥민 안녕'
```

person.인사()를 실행하는데, person2에 적용해서 실행해라. 그래서 this가 person2가 된다.

### call도 똑같다

```javascript
person.인사.apply(person2);
person.인사.call(person2);
```

둘 다 결과는 같다.

### apply vs call 차이

파라미터 넣는 방식이 다르다.

```javascript
person.인사.apply(person2, [1, 2, 3]);  // 배열로 넣음
person.인사.call(person2, 1, 2, 3);     // 따로따로 넣음
```

apply는 배열로, call은 따로따로.

### 다시 아까 예제로 돌아오면

```javascript
function 더하기(a, b, c) {
  console.log(a + b + c);
}

var 어레이 = [10, 20, 30];
더하기.apply(undefined, 어레이);
```

더하기() 함수를 실행하는데, undefined에 적용하고(아무데도 적용 안 함), 파라미터로 어레이를 넣어라.

apply는 배열을 풀어서 파라미터로 넣어준다. 그래서 `더하기(10, 20, 30)`이랑 같아진다.

undefined를 넣은 이유는 아무데도 적용할 필요가 없어서다. 빈칸으로 두면 에러나니까 아무 값이나 넣은 것.

### 결론

spread 연산자가 생겨서 다행이다. apply보다 훨씬 직관적이다.

```javascript
더하기(...어레이);  // 이게 낫다
```
