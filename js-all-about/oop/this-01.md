# this

## 한 줄 요약

this는 "나를 호출한 주인님"을 가리킨다.

## this가 어려운 이유

this는 쓰는 위치에 따라 뜻이 달라진다. 고정된 값이 아니라 상황에 따라 바뀐다. 그래서 헷갈린다.

하지만 핵심 규칙은 하나다. "누가 이 함수를 불렀는가?"를 생각하면 된다.

---

## 1. 그냥 쓰거나 일반 함수에서 쓰면 → window

### 그냥 this만 쓰면

```javascript
console.log(this);
```

이러면 뭐가 출력될까? `window`라는 객체가 나온다.

### 일반 함수 안에서 this를 쓰면

```javascript
function 아무함수() {
  console.log(this);
}

아무함수();
```

이것도 `window`가 나온다.

### window가 뭔데?

window는 브라우저가 제공하는 최상위 객체다. 전역변수, 전역함수, DOM 같은 걸 전부 보관하는 거대한 창고라고 생각하면 된다.

```javascript
var x = 300;
```

이렇게 전역변수를 만들면 어디에 저장될까?

```javascript
console.log(window.x);  // 300
```

window 안에 들어간다. 함수도 마찬가지다.

```javascript
function 인사() {
  console.log('안녕');
}

// 위 코드는 사실 이것과 똑같다
window.인사 = function() {
  console.log('안녕');
};
```

우리가 함수를 만들면 자바스크립트가 알아서 window 안에 넣어준다. 그래서 `인사()`로 호출하든 `window.인사()`로 호출하든 같다.

### 그래서 왜 this가 window인가?

여기서 중요한 포인트가 나온다.

```javascript
function 아무함수() {
  console.log(this);
}

아무함수();
```

이 함수의 주인이 누구인가? window다. 왜냐하면 이 함수는 `window.아무함수`니까.

this는 "나를 호출한 주인님"이라고 했다. 아무함수()의 주인님은 window다. 그래서 this가 window인 것이다.

### strict mode에서는 다르다

```javascript
'use strict';

function 아무함수() {
  console.log(this);
}

아무함수();  // undefined
```

strict mode를 켜면 일반 함수 안에서 this가 undefined가 된다. 실수 방지용으로 일부러 이렇게 만들어놨다.

---

## 2. 객체 메서드 안에서 쓰면 → 그 객체 (주인님)

### 기본 예시

```javascript
const person = {
  name: 'Kim',
  sayHello: function() {
    console.log(this);
  }
};

person.sayHello();
```

이러면 뭐가 나올까?

```javascript
{ name: 'Kim', sayHello: f }
```

person 객체 전체가 나온다. 왜? sayHello의 주인님이 person이니까.

### this로 객체 내부 값 접근하기

```javascript
const person = {
  name: 'Kim',
  sayHello: function() {
    console.log(this.name);
  }
};

person.sayHello();  // 'Kim'
```

this가 person을 가리키니까, this.name은 person.name과 같다. 그래서 'Kim'이 출력된다.

### 중첩된 객체에서는?

```javascript
const company = {
  name: 'Woowa',
  team: {
    name: 'Frontend',
    sayTeamName: function() {
      console.log(this);
    }
  }
};

company.team.sayTeamName();
```

여기서 this는 뭘까? company일까, company.team일까?

정답은 `company.team`이다.

```javascript
{ name: 'Frontend', sayTeamName: f }
```

this는 바로 위 주인님만 가리킨다. sayTeamName을 직접 품고 있는 건 team이지 company가 아니다.

---

## 핵심: 1번과 2번은 사실 같은 규칙이다

1번에서 "일반 함수의 this는 window"라고 했고, 2번에서 "메서드의 this는 주인님 객체"라고 했다.

근데 이 둘은 같은 얘기다.

```javascript
function 아무함수() {
  console.log(this);
}

아무함수();  // window
```

이 함수는 사실 window의 메서드다. `window.아무함수()`랑 같다. 그래서 주인님인 window가 this가 된다.

결국 규칙은 하나다.

> this = 이 함수를 호출한 주인님 객체

이것만 기억하면 된다.

---

## 3. 화살표 함수에서는 → 바깥의 this를 그대로 쓴다

화살표 함수는 자기만의 this를 만들지 않는다. 바깥에 있는 this를 그대로 가져다 쓴다.

### 화살표 함수 예시

```javascript
const person = {
  name: 'Kim',
  sayHello: function() {
    const inner = () => {
      console.log(this);
    };
    inner();
  }
};

person.sayHello();
```

inner는 화살표 함수다. 화살표 함수는 자기 this가 없다. 그래서 바깥 함수(sayHello)의 this를 그대로 쓴다.

sayHello의 this는 뭐였나? person이다. 그래서 inner 안의 this도 person이다.

```javascript
{ name: 'Kim', sayHello: f }
```

### 만약 일반 함수였다면?

```javascript
const person = {
  name: 'Kim',
  sayHello: function() {
    const inner = function() {
      console.log(this);
    };
    inner();
  }
};

person.sayHello();  // window
```

일반 함수는 자기만의 this를 새로 만든다.

inner()를 호출할 때 주인님이 누구인가? 점(.) 앞에 아무것도 없다. 그냥 inner()로 호출했다. 이런 경우 주인님은 window다.

### 화살표 함수를 쓰는 이유

콜백 함수에서 바깥 this를 쓰고 싶을 때 화살표 함수가 편하다.

```javascript
const person = {
  name: 'Kim',
  friends: ['Park', 'Lee'],
  printFriends: function() {
    this.friends.forEach(function(friend) {
      console.log(this.name + '의 친구: ' + friend);
    });
  }
};

person.printFriends();
// undefined의 친구: Park
// undefined의 친구: Lee
```

forEach 안의 콜백은 일반 함수라서 this가 window가 된다. window.name은 없으니까 undefined.

화살표 함수로 바꾸면?

```javascript
const person = {
  name: 'Kim',
  friends: ['Park', 'Lee'],
  printFriends: function() {
    this.friends.forEach((friend) => {
      console.log(this.name + '의 친구: ' + friend);
    });
  }
};

person.printFriends();
// Kim의 친구: Park
// Kim의 친구: Lee
```

화살표 함수는 바깥 this(person)를 그대로 쓰니까 잘 동작한다.

---

## 정리

- 일반 함수: this = 나를 호출한 주인님 (점 앞에 있는 객체)
- 화살표 함수: this = 바깥 스코프의 this를 그대로 씀

this를 판단하는 방법:

1. 점(.) 앞에 뭐가 있나 본다
2. 있으면 그게 this
3. 없으면 window (strict mode에선 undefined)
4. 화살표 함수면 바깥 this

---

## 코테에서 this

코테에서 this를 직접 쓸 일은 많지 않다. 하지만 클래스 문법을 쓸 때는 알아야 한다.

```javascript
class Car {
  constructor(name) {
    this.name = name;
  }

  move() {
    console.log(this.name + ' 전진');
  }
}

const car = new Car('pobi');
car.move();  // 'pobi 전진'
```

클래스 안에서 this는 새로 만들어지는 인스턴스를 가리킨다.
