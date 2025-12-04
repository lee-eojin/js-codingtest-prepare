# Queue

## 한 줄 요약

먼저 넣은 게 먼저 나온다. (선입선출, FIFO)

## 왜 쓰나?

큐는 "순서대로 처리"해야 할 때 쓴다.

- 은행 대기열: 먼저 온 사람이 먼저 처리됨
- 프린터 대기열: 먼저 요청한 문서가 먼저 출력됨
- BFS: 가까운 노드부터 순서대로 탐색

## JS에서 큐 만들기

JS에는 Queue 클래스가 없다. 배열로 만든다.

```javascript
const queue = [];

queue.push(1);  // 뒤에 넣기
queue.push(2);
queue.push(3);

console.log(queue);  // [1, 2, 3]

queue.shift();  // 앞에서 꺼내기 → 1
queue.shift();  // 앞에서 꺼내기 → 2

console.log(queue);  // [3]
```

- `push(값)`: 뒤에 넣기
- `shift()`: 앞에서 꺼내기 (제거됨)

## 큐가 동작하는 과정

```javascript
const queue = [];

queue.push('A');  // queue: ['A']
queue.push('B');  // queue: ['A', 'B']
queue.push('C');  // queue: ['A', 'B', 'C']

queue.shift();    // 'A' 반환, queue: ['B', 'C']
queue.shift();    // 'B' 반환, queue: ['C']
```

뒤에서 들어가고, 앞에서 나온다.

## 자주 쓰는 패턴

### 1. 맨 앞 값 확인 (제거하지 않고)

```javascript
const queue = [1, 2, 3];

const front = queue[0];  // 1
console.log(queue);  // [1, 2, 3] 그대로
```

### 2. 큐가 비었는지 확인

```javascript
const queue = [];

if (queue.length === 0) {
  console.log("큐가 비어있음");
}
```

### 3. 큐 비우기

```javascript
while (queue.length > 0) {
  const item = queue.shift();
  // item으로 뭔가 처리
}
```

## 이럴 때 사용한다

### 1. BFS (너비 우선 탐색)

BFS는 큐로 구현한다. 가까운 노드부터 순서대로 방문.

```javascript
function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];

  visited.add(start);

  while (queue.length > 0) {
    const node = queue.shift();
    console.log(node);

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}

const graph = {
  1: [2, 3],
  2: [4, 5],
  3: [],
  4: [],
  5: []
};

bfs(graph, 1);  // 1, 2, 3, 4, 5
```

### 2. 최단 거리 찾기

BFS로 최단 거리를 구할 때 큐에 거리 정보도 같이 넣는다.

```javascript
function shortestPath(graph, start, end) {
  const visited = new Set();
  const queue = [[start, 0]];  // [노드, 거리]

  visited.add(start);

  while (queue.length > 0) {
    const [node, distance] = queue.shift();

    if (node === end) {
      return distance;
    }

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, distance + 1]);
      }
    }
  }

  return -1;  // 도달 불가
}
```

### 3. 레벨별 처리 (트리/그래프)

각 레벨(깊이)별로 노드를 처리해야 할 때.

```javascript
function levelOrder(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.value);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);
  }

  return result;
}
```

## 시간복잡도

- push: O(1)
- shift: O(n)
- 맨 앞 확인: O(1)

### shift가 O(n)인 이유

shift는 맨 앞 요소를 제거한 뒤, 나머지 모든 요소를 한 칸씩 앞으로 당긴다.

```javascript
// [1, 2, 3, 4, 5].shift() 실행 과정
// 1. '1' 제거
// 2. '2'를 index 0으로 이동
// 3. '3'을 index 1로 이동
// 4. '4'를 index 2로 이동
// 5. '5'를 index 3으로 이동
// 결과: [2, 3, 4, 5]
```

요소가 n개면 n-1번 이동해야 한다 → O(n).

## 코테에서 shift 써도 되나?

대부분의 경우 괜찮다.

- 일반적인 BFS 문제에서 shift 때문에 시간초과 나는 경우는 드물다
- 코드 가독성이 중요한 코테에서는 단순한 구현이 낫다

그래도 걱정되면? 인덱스로 구현하는 방법이 있다.

```javascript
function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  let head = 0;  // shift 대신 인덱스로 관리

  visited.add(start);

  while (head < queue.length) {
    const node = queue[head];
    head++;  // 다음으로 이동

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}
```

이러면 shift 없이 O(1)에 꺼낼 수 있다. 메모리는 조금 더 쓰지만 속도는 빠르다.

## 스택 vs 큐 비교

Stack은 후입선출(LIFO)이고, Queue는 선입선출(FIFO)다.

둘 다 push로 넣는다. 꺼낼 때가 다르다. Stack은 pop으로 뒤에서 꺼내고, Queue는 shift로 앞에서 꺼낸다.

Stack은 DFS, 괄호 검사에 쓰고, Queue는 BFS, 최단거리에 쓴다.

## 주의사항

### 1. 빈 큐에서 shift하면?

```javascript
const queue = [];
const result = queue.shift();

console.log(result);  // undefined
```

에러는 안 나지만 undefined가 반환된다.

### 2. pop 쓰면 안 됨

```javascript
// 이렇게 하면 큐가 아니라 스택이 됨
queue.push(1);
queue.push(2);
queue.pop();  // 2가 나옴 (뒤에서 꺼냄)
```

큐는 반드시 shift로 꺼내야 한다.
