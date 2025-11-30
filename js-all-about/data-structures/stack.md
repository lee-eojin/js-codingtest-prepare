# Stack

## 한 줄 요약

나중에 넣은 게 먼저 나온다. (후입선출, LIFO)

## 왜 쓰나?

배열도 있는데 왜 스택이라는 개념이 필요할까? 스택은 "가장 최근 것부터 처리"해야 할 때 쓴다.

- 뒤로가기 버튼: 가장 최근 페이지로 돌아감
- Ctrl+Z (실행취소): 가장 최근 작업을 취소
- 괄호 검사: 가장 최근 열린 괄호와 매칭

## JS에서 스택 만들기

JS에는 Stack 클래스가 없다. 배열로 만든다.

```javascript
const stack = [];

stack.push(1);  // 넣기
stack.push(2);
stack.push(3);

console.log(stack);  // [1, 2, 3]

stack.pop();  // 꺼내기 → 3
stack.pop();  // 꺼내기 → 2

console.log(stack);  // [1]
```

핵심은 두 개뿐이다.

| 메서드 | 설명 |
|--------|------|
| `push(값)` | 맨 위에 넣기 |
| `pop()` | 맨 위에서 꺼내기 (제거됨) |

## 스택이 동작하는 과정

```javascript
const stack = [];

stack.push('A');  // stack: ['A']
stack.push('B');  // stack: ['A', 'B']
stack.push('C');  // stack: ['A', 'B', 'C']

stack.pop();      // 'C' 반환, stack: ['A', 'B']
stack.pop();      // 'B' 반환, stack: ['A']
```

배열의 끝이 스택의 "위"다. push는 끝에 추가하고, pop은 끝에서 꺼낸다.

## 자주 쓰는 패턴

### 1. 맨 위 값 확인 (제거하지 않고)

```javascript
const stack = [1, 2, 3];

const top = stack[stack.length - 1];  // 3
console.log(stack);  // [1, 2, 3] 그대로
```

pop()은 값을 제거하지만, 인덱스 접근은 확인만 한다.

### 2. 스택이 비었는지 확인

```javascript
const stack = [];

if (stack.length === 0) {
  console.log("스택이 비어있음");
}
```

### 3. 스택 비우기

```javascript
while (stack.length > 0) {
  const item = stack.pop();
  // item으로 뭔가 처리
}
```

## 이럴 때 사용한다

### 1. 괄호 짝 맞추기

열린 괄호를 스택에 넣고, 닫힌 괄호가 나오면 꺼내서 매칭한다.

```javascript
function isValidParentheses(str) {
  const stack = [];

  for (const char of str) {
    if (char === '(') {
      stack.push(char);
    } else if (char === ')') {
      if (stack.length === 0) {
        return false;  // 매칭할 '('가 없음
      }
      stack.pop();
    }
  }

  return stack.length === 0;  // 남은 '('가 없어야 함
}

console.log(isValidParentheses("(())"));   // true
console.log(isValidParentheses("(()"));    // false
console.log(isValidParentheses(")("));     // false
```

### 2. 문자열 뒤집기

```javascript
function reverse(str) {
  const stack = [];

  for (const char of str) {
    stack.push(char);
  }

  let result = '';
  while (stack.length > 0) {
    result += stack.pop();
  }

  return result;
}

console.log(reverse("hello"));  // "olleh"
```

물론 `str.split('').reverse().join('')`이 더 간단하지만, 스택 개념을 이해하기 좋은 예시다.

### 3. DFS (깊이 우선 탐색)

재귀 대신 스택으로 DFS를 구현할 수 있다.

```javascript
function dfs(graph, start) {
  const visited = new Set();
  const stack = [start];

  while (stack.length > 0) {
    const node = stack.pop();

    if (visited.has(node)) {
      continue;
    }

    visited.add(node);
    console.log(node);

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
      }
    }
  }
}
```

## 시간복잡도

| 연산 | 시간복잡도 |
|------|-----------|
| push | O(1) |
| pop | O(1) |
| 맨 위 확인 | O(1) |

배열 끝에서만 작업하니까 전부 O(1)이다.

## 주의사항

### 1. 빈 스택에서 pop하면?

```javascript
const stack = [];
const result = stack.pop();

console.log(result);  // undefined
```

에러는 안 나지만 undefined가 반환된다. 필요하면 length 체크를 먼저 하자.

### 2. shift/unshift 쓰지 마라

```javascript
// 이렇게 하면 안 됨
stack.unshift(1);  // 앞에 넣기
stack.shift();     // 앞에서 꺼내기
```

shift/unshift는 배열 앞에서 작업한다. 배열 앞에서 삽입/삭제하면 모든 요소를 밀어야 해서 O(n)이다. 스택은 반드시 push/pop을 써라.
