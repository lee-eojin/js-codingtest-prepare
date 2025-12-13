# Constructor (생성자 함수)

## 정의

Constructor는 비슷한 구조의 객체를 여러 개 생성하기 위한 템플릿 역할을 하는 함수다. `new` 키워드와 함께 호출하면 새로운 객체(인스턴스)를 생성하여 반환한다. 객체를 등호로 복사하면 참조만 공유되기 때문에, 독립적인 객체를 여러 개 만들려면 constructor를 사용해야 한다.

---

## 기본 문법

`function` 키워드로 정의하며, 관례적으로 첫 글자를 대문자로 작명한다. 내부에서 `this`는 새로 생성될 객체를 가리킨다.

```javascript
function Student() {
  this.name = 'Kim';
  this.age = 15;
}

var student1 = new Student();
var student2 = new Student();

console.log(student1);  // { name: 'Kim', age: 15 }
console.log(student2);  // { name: 'Kim', age: 15 }
```

`new` 키워드와 함께 호출하면 다음 과정이 진행된다.

1. 빈 객체가 생성되고 `this`에 바인딩된다
2. 함수 내부 코드가 실행되어 `this`에 프로퍼티를 추가한다
3. 완성된 객체가 자동으로 반환된다

---

## 파라미터로 다른 값 부여

매번 같은 값을 가진 객체만 생성하면 의미가 없다. 파라미터를 활용하면 생성 시점에 다른 값을 넣을 수 있다.

```javascript
function Student(name, age) {
  this.name = name;
  this.age = age;
}

var student1 = new Student('Kim', 15);
var student2 = new Student('Park', 16);

console.log(student1);  // { name: 'Kim', age: 15 }
console.log(student2);  // { name: 'Park', age: 16 }
```

파라미터로 전달받은 값을 `this.프로퍼티`에 할당하면 매번 다른 데이터를 가진 객체를 생성할 수 있다.

---

## 메서드 추가

객체에 함수를 포함시키려면 constructor 내부에서 `this`에 함수를 할당한다.

```javascript
function Student(name, age) {
  this.name = name;
  this.age = age;
  this.sayHi = function() {
    console.log('안녕하세요 ' + this.name);
  };
}

var student1 = new Student('Kim', 15);
student1.sayHi();  // '안녕하세요 Kim'
```

메서드 내부의 `this`도 해당 인스턴스를 가리키므로 `this.name`으로 인스턴스의 프로퍼티에 접근할 수 있다.

---

## 용어 정리

constructor(생성자 함수)로부터 생성된 객체를 instance(인스턴스)라고 부른다.

```javascript
function Student(name) {
  this.name = name;
}

var student1 = new Student('Kim');  // student1은 Student의 인스턴스
var student2 = new Student('Park'); // student2도 Student의 인스턴스
```

---

## 등호 복사와의 차이

등호로 객체를 복사하면 참조만 공유되어 같은 객체를 가리키게 된다. constructor를 사용하면 매번 새로운 독립적인 객체가 생성된다.

```javascript
// 등호 복사: 참조 공유
var obj1 = { name: 'Kim' };
var obj2 = obj1;
obj1.name = 'Park';
console.log(obj2.name);  // 'Park' (같이 바뀜)

// constructor: 독립적인 객체
function Person(name) {
  this.name = name;
}
var person1 = new Person('Kim');
var person2 = new Person('Kim');
person1.name = 'Park';
console.log(person2.name);  // 'Kim' (영향 없음)
```

---

## 우테코 활용 예시

### 자동차 경주 Car 생성

```javascript
function Car(name) {
  this.name = name;
  this.position = 0;

  this.move = function() {
    this.position++;
  };

  this.getStatus = function() {
    return this.name + ' : ' + '-'.repeat(this.position);
  };
}

var car1 = new Car('pobi');
var car2 = new Car('woni');

car1.move();
car1.move();
console.log(car1.getStatus());  // 'pobi : --'
console.log(car2.getStatus());  // 'woni : '
```

### 로또 번호 생성

```javascript
function Lotto(numbers) {
  this.numbers = numbers;

  this.getMatchCount = function(winningNumbers) {
    return this.numbers.filter(function(num) {
      return winningNumbers.includes(num);
    }).length;
  };
}

var lotto1 = new Lotto([1, 2, 3, 4, 5, 6]);
var lotto2 = new Lotto([7, 8, 9, 10, 11, 12]);

var winning = [1, 2, 3, 7, 8, 9];
console.log(lotto1.getMatchCount(winning));  // 3
console.log(lotto2.getMatchCount(winning));  // 3
```

### 상품 데이터 관리

```javascript
function Product(name, price) {
  this.name = name;
  this.price = price;

  this.getVat = function() {
    return this.price * 0.1;
  };

  this.getTotalPrice = function() {
    return this.price + this.getVat();
  };
}

var product1 = new Product('shirts', 50000);
var product2 = new Product('pants', 60000);

console.log(product1.getVat());        // 5000
console.log(product2.getTotalPrice()); // 66000
```

### ES6 class와의 관계

ES6의 `class` 문법은 constructor의 문법적 설탕(syntactic sugar)이다. 내부 동작은 동일하지만 더 명확한 문법을 제공한다.

```javascript
// constructor 방식
function Car(name) {
  this.name = name;
  this.position = 0;
}

// class 방식 (ES6)
class Car {
  constructor(name) {
    this.name = name;
    this.position = 0;
  }
}
```

우테코 프리코스 과정에서는 주로 `class` 문법을 사용했지만, constructor의 동작 원리를 이해하면 `class`가 어떻게 동작하는지 파악하기 쉽다.
