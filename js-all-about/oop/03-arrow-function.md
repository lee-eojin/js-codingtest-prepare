# Arrow Function

## 한 줄 요약

함수를 짧게 쓰는 문법. this를 바꾸지 않는다.

---

## 기본 문법

기존에 함수를 만드는 방법은 두 가지였다.

```javascript
// 방법 1
function 함수() {
  // 어쩌구
}

// 방법 2
var 함수 = function() {
  // 어쩌구
};
```

ES6부터 화살표 함수가 추가됐다.

```javascript
var 함수 = () => {
  // 어쩌구
};
```

function 키워드 대신 =>를 쓴다.

---

## 왜 쓰나

### 1. 입출력 기능이 직관적으로 보인다

함수는 왜 쓰는가?

- 여러 기능을 한 단어로 묶고 싶을 때 (재사용)
- 입출력 기능을 만들 때

arrow function은 입출력 기능을 직관적으로 표현한다.

```javascript
var 두배만들기 = (x) => { return x * 2 };

console.log(두배만들기(4));  // 8
console.log(두배만들기(8));  // 16
```

x가 들어가서 x * 2가 나온다는 게 한눈에 보인다.

### 2. 파라미터가 하나면 소괄호 생략 가능

```javascript
var 두배만들기 = x => { return x * 2 };
```

### 3. 한 줄이면 중괄호와 return 생략 가능

```javascript
var 두배만들기 = x => x * 2;
```

이렇게 쓰면 x가 어떻게 변하는지 바로 보인다.

---

## arrow function과 this

이게 핵심이다.

일반 함수는 호출될 때마다 this가 새로 정해진다. 하지만 arrow function은 this를 새로 만들지 않는다. 바깥에 있던 this를 그대로 가져다 쓴다.

### 일반 함수에서 this

```javascript
var 오브젝트 = {
  함수: function() {
    console.log(this);
  }
};

오브젝트.함수();  // 오브젝트
```

메서드 안에서 this는 그 메서드의 주인님(오브젝트)을 가리킨다.

### arrow function에서 this

```javascript
var 오브젝트 = {
  함수: () => {
    console.log(this);
  }
};

오브젝트.함수();  // window
```

arrow function은 자기만의 this를 만들지 않는다. 바깥의 this를 그대로 쓴다.

이 코드에서 바깥의 this는 뭔가? 전역 스코프의 this, 즉 window다. 그래서 window가 출력된다.

### 이게 왜 중요한가

콜백함수에서 바깥 this를 쓰고 싶을 때 유용하다.

```javascript
var 오브젝트 = {
  이름: 'Kim',
  출력: function() {
    setTimeout(function() {
      console.log(this.이름);
    }, 1000);
  }
};

오브젝트.출력();  // undefined
```

setTimeout 안의 일반 함수에서 this는 window가 된다. window.이름은 없으니까 undefined.

```javascript
var 오브젝트 = {
  이름: 'Kim',
  출력: function() {
    setTimeout(() => {
      console.log(this.이름);
    }, 1000);
  }
};

오브젝트.출력();  // 'Kim'
```

arrow function으로 바꾸면 바깥 this(오브젝트)를 그대로 쓴다. 그래서 'Kim'이 출력된다.

---

## 주의할 점

arrow function이 항상 좋은 건 아니다. this가 달라지기 때문에 일반 function을 완전히 대체할 수 없다.

객체 메서드를 arrow function으로 만들면 this가 객체를 가리키지 않는다.

```javascript
// 이렇게 쓰면 안 됨
var 오브젝트 = {
  이름: 'Kim',
  출력: () => {
    console.log(this.이름);  // undefined
  }
};
```

메서드는 일반 function으로, 콜백은 arrow function으로 쓰는 게 일반적이다.

---

## 정리

- arrow function은 함수를 짧게 쓰는 문법
- 파라미터 1개면 () 생략 가능
- return 한 줄이면 {}와 return 생략 가능
- this를 새로 만들지 않고 바깥 this를 그대로 씀
- 메서드에는 일반 function, 콜백에는 arrow function
