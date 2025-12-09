# this (2) - constructor와 event listener

## 이전 내용 복습

1. 일반 함수에서 this → window
2. 객체 메서드에서 this → 그 객체 (주인님)
3. 화살표 함수에서 this → 바깥 this를 그대로 씀

---

## 3. constructor 안에서 this

constructor는 객체를 찍어내는 기계다. 비슷한 객체를 여러 개 만들고 싶을 때 쓴다.

```javascript
function 기계() {
  this.이름 = 'Kim';
}
```

함수처럼 생겼지만 이건 기계(constructor)다. 안에 this.어쩌구를 넣어서 만든다.

여기서 this는 뭘까? 이 기계로부터 새로 생성될 객체를 의미한다.

`this.이름 = 'Kim'`은 "새로 생성되는 객체의 이름 속성에 'Kim'을 넣어라"라는 뜻이다.

### 기계에서 객체 뽑는 법

```javascript
function 기계() {
  this.이름 = 'Kim';
}

var 오브젝트 = new 기계();
console.log(오브젝트);  // { 이름: 'Kim' }
```

new 키워드를 붙여서 호출하면 새로운 객체가 나온다. this 덕분에 `{ 이름: 'Kim' }` 값을 가진 객체가 만들어진다.

### 파라미터를 받으면 더 유용하다

```javascript
function 기계(이름) {
  this.이름 = 이름;
}

var 오브젝트1 = new 기계('Kim');
var 오브젝트2 = new 기계('Park');

console.log(오브젝트1);  // { 이름: 'Kim' }
console.log(오브젝트2);  // { 이름: 'Park' }
```

이렇게 하면 같은 구조의 객체를 다른 값으로 여러 개 만들 수 있다.

---

## 4. event listener 안에서 this

```javascript
document.getElementById('버튼').addEventListener('click', function(e) {
  console.log(this);
});
```

event listener 안에서 this는 `e.currentTarget`과 같다.

e.currentTarget은 지금 이벤트가 동작하는 곳, 즉 addEventListener가 붙은 HTML 요소를 뜻한다.

```javascript
document.getElementById('버튼').addEventListener('click', function(e) {
  console.log(this);               // <button id="버튼">...</button>
  console.log(e.currentTarget);    // <button id="버튼">...</button>
  // 둘이 같다
});
```

---

## 콜백함수 안에서 this는?

여기서부터 헷갈리기 시작한다. 콜백함수는 함수 안에 파라미터로 들어가는 함수를 말한다.

### case 1: event listener 안에서 콜백함수

```javascript
document.getElementById('버튼').addEventListener('click', function(e) {
  var 어레이 = [1, 2, 3];
  어레이.forEach(function() {
    console.log(this);
  });
});
```

forEach 안의 콜백함수에서 this는 뭘까?

정답은 window다.

왜? forEach 안의 function(){}은 그냥 일반 함수다. 일반 함수에서 this는 window라고 했다. event listener 안에 있든 말든 상관없다. 일반 함수니까 window다.

### case 2: 객체 메서드 안에서 콜백함수

```javascript
var 오브젝트 = {
  이름들: ['김', '이', '박'],
  함수: function() {
    오브젝트.이름들.forEach(function() {
      console.log(this);
    });
  }
};

오브젝트.함수();
```

forEach 안의 this는 뭘까?

역시 window다.

오브젝트.함수()를 호출하면 함수 안의 this는 오브젝트가 맞다. 하지만 forEach 안의 콜백함수는 또 다른 일반 함수다. 일반 함수에서 this는 window다.

function을 만날 때마다 this가 바뀔 수 있다는 걸 기억해야 한다.

### case 3: 화살표 함수로 바꾸면?

```javascript
var 오브젝트 = {
  이름들: ['김', '이', '박'],
  함수: function() {
    오브젝트.이름들.forEach(() => {
      console.log(this);
    });
  }
};

오브젝트.함수();
```

이번엔 this가 오브젝트다.

화살표 함수는 자기만의 this를 만들지 않는다. 바깥 함수의 this를 그대로 쓴다. 바깥 함수(함수:)의 this는 오브젝트니까, 화살표 함수 안의 this도 오브젝트다.

---

## 정리

- constructor 안에서 this → 새로 생성되는 객체
- event listener 안에서 this → e.currentTarget (이벤트 붙은 요소)
- 콜백함수(일반 함수)에서 this → window (새로운 함수니까)
- 콜백함수(화살표 함수)에서 this → 바깥 this 유지

this가 헷갈리면 화살표 함수를 쓰거나, 애초에 this를 안 쓰는 게 낫다.
