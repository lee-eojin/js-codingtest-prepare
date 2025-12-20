# 정규표현식 (Regular Expression)

## 한 줄 요약

문자열에서 패턴을 찾거나 검증할 때 사용한다.

---

## 기본 문법

```javascript
const regex = /패턴/;
regex.test('문자열');  // true 또는 false
```

---

## 자주 쓰는 메서드

### test() - 일치 여부 확인

```javascript
const regex = /hello/;
regex.test('hello world');  // true
regex.test('hi');           // false
```

### match() - 일치하는 부분 추출

```javascript
const str = 'abc123def456';
str.match(/\d+/);   // ['123'] (첫 번째만)
str.match(/\d+/g);  // ['123', '456'] (전부)
```

### replace() - 치환

```javascript
const str = 'hello world';
str.replace(/world/, 'JS');  // 'hello JS'
```

### split() - 분리

```javascript
const str = '1,2;3:4';
str.split(/[,;:]/);  // ['1', '2', '3', '4']
```

---

## 자주 쓰는 패턴

| 패턴 | 의미 | 예시 |
|------|------|------|
| `\d` | 숫자 | `\d+` → 하나 이상의 숫자 |
| `\D` | 숫자 아닌 것 | |
| `\s` | 공백 | 스페이스, 탭, 줄바꿈 |
| `\S` | 공백 아닌 것 | |
| `.` | 아무 문자 하나 | |
| `+` | 1개 이상 | |
| `*` | 0개 이상 | |
| `?` | 0개 또는 1개 | |
| `^` | 시작 | `^hello` → hello로 시작 |
| `$` | 끝 | `world$` → world로 끝 |
| `[]` | 문자 클래스 | `[abc]` → a, b, c 중 하나 |
| `[^]` | 부정 | `[^abc]` → a, b, c가 아닌 것 |

---

## 플래그

```javascript
/패턴/g   // global: 모든 일치 항목
/패턴/i   // ignore case: 대소문자 무시
/패턴/m   // multiline: 여러 줄
```

---

## 우테코 활용 예시

### 1. 숫자만 포함되어 있는지 검증

```javascript
function isNumber(input) {
  return /^\d+$/.test(input);
}

isNumber('123');   // true
isNumber('12a3');  // false
isNumber('');      // false
```

`^\d+$`: 시작부터 끝까지 숫자 1개 이상

### 2. 커스텀 구분자 추출 (계산기 미션)

```javascript
const input = '//;\n1;2;3';

if (input.startsWith('//')) {
  const match = input.match(/^\/\/(.)\n(.*)$/);
  const delimiter = match[1];  // ';'
  const numbers = match[2];    // '1;2;3'
}
```

### 3. 쉼표로 구분된 입력 파싱

```javascript
const input = 'pobi, woni, jun';
const names = input.split(/,\s*/);  // 쉼표 + 공백 0개 이상
// ['pobi', 'woni', 'jun']
```

### 4. 숫자와 문자 분리

```javascript
const input = '콜라-10';
const match = input.match(/^(.+)-(\d+)$/);
const name = match[1];    // '콜라'
const count = match[2];   // '10'
```

### 5. 공백 제거

```javascript
const input = '  hello world  ';
input.trim();                    // 'hello world' (앞뒤 공백)
input.replace(/\s+/g, ' ');      // ' hello world ' (연속 공백을 하나로)
```

---

## 주의사항

### 1. 특수문자는 이스케이프

`.`, `+`, `*`, `?`, `[`, `]`, `(`, `)`, `{`, `}`, `|`, `\`, `^`, `$` 등은 `\`로 이스케이프해야 한다.

```javascript
// 마침표를 찾고 싶을 때
/\./.test('hello.');  // true
/./.test('hello.');   // true (하지만 아무 문자나 매칭됨)
```

### 2. 정규식이 복잡하면 그냥 split 쓰자

간단한 분리는 정규식 없이도 가능하다.

```javascript
// 정규식
'1,2,3'.split(/,/);

// 그냥 문자열
'1,2,3'.split(',');
```

---

## 용어 정리

- **정규표현식**: 문자열 패턴을 표현하는 식
- **플래그**: 정규식의 동작을 변경하는 옵션 (g, i, m)
- **이스케이프**: 특수문자 앞에 `\`를 붙여 문자 그대로 인식하게 함
