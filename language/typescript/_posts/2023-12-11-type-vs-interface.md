---
layout: single
title: "[TypeScript] Type Alias vs Interface"
post-order: 1
date: "2023-12-11 02:34:00 +0900"
last_modified_at: "2023-12-11 02:34:00 +0900"
---

Type Alias와 Interface 중 어느것을 사용해야 할까?<br/>
명확한 답은 없는 것 같다. 둘 간에는 미묘한 차이가 있지만 개발이나 서비스 중에 문제를 일으키는 이슈는 아니기 때문에
상황에 따라 적절한 것을 사용하면 될 것 같다.<br/>
이 포스트에서는 나의 선택 기준을 소개하고, Type Alias와 Interface의 차이점을 알아본다.

## 나의 선택 기준

나는 Type Alias를 선택했고 지금까지 계속 사용하고 있다.<br/>
내가 Type Alias를 선택한 이유는 Type Alias 방식이 내게 더 직관적으로 다가왔기 때문이다.

나는 처음 TypeScript를 접했을 때 이미 5년 간 Python을 사용해왔고 Java 경험도 약간 있었다.

Python에서는 타입 힌트를 위한 `typing` 모듈을 사용했고, Java에서는 Java의 정적 타입 시스템을 사용했다.<br/>
Python의 `typing` 모듈의 이름과 어울리는 것은 단순하게 Type Alias `type` 이었다.<br/>
또한 Java와 TypeScript가 둘 다 가지고 있는 `interface`가 개념적으로 차이가 있다고 느껴졌기 때문에
`interface`로 타입을 정의하는 것이 불편했다.

또 `type`은 4글자, `interface`는 9글자라서 `type`을 사용하는 것이 더 편했다. ^^

TypeScript 공식 문서에서는 개인의 기호에 따라 선택하되,
무엇을 쓸지 모르겠다면 우선 Interface를 사용하고 필요한 경우 Type Alias를 사용하라고 한다.

# Type Alias와 Interface의 유사점

Type Alias와 Interface는 거의 차이가 없다. 심지어 두개를 섞어 사용할 수도 있다.

```ts
// Type Alias
type Person = {
  name: string;
  age: number;
};

// Interface
interface Career {
  company: string;
  position: string;
  period: string;
}

// Type Alias와 Interface를 섞어서 Type을 정의
type Developer1 = Person & Career;

// Type Alias와 Interface를 섞어서 Interface를 정의
interface Developer2 extends Person, Career {}
```

# Type Alias와 Interface의 차이점

Type Alias와 Interface는 대개 유사하지만 다음과 같이 4가지의 미묘한 차이를 가진다.

## 1. Interface는 Declaration Merging이 가능하지만 Type Alias는 불가능하다.

즉, Interface는 선언한 내용을 수정(Declaration Merging)할 수 있지만 Type Alias는 할 수 없다.

Interface는 이처럼 재선언이 용이하므로 3rd party library를 만들 때 Interface를 사용한다.<br/>
3rd party library 유저는 필요한 경우 3rd party library 내부에 선언된 Interface를 재선언해서 사용할 수 있다.

Type Alias는 재선언은 불가능하지만, 교차 타입(Intersection Type)을 방식으로 기존에 선언한 Type을 확장시켜서
중복되지 않는 다른 이름으로 새로운 Type을 선언함으로써 같은 효과를 낼 수 있다.

```ts
// ==============================
// Interface
// ==============================
interface Person {
  name: string;
  age: number;
}

// 기존 Interface에 속성을 추가
interface Person {
  gender: string;
}

// ==============================
// Type Alias
// ==============================
type Person = {
  name: string;
  age: number;
};

// 기존 Type Alias에 같은 방식으로 속성을 추가하려고 하면 에러 발생
type Person = {
  gender: string;
}
// Error: Duplicate identifier 'Person'.
```

### Type Alias의 교차 타입(Intersection Type)

```ts
// Type Alias는 같은 이름을 가진 타입의 재선언은 안되지만 다음과 같이 교차 타입(Intersection Type)을 사용해서 새로운 타입을 생성하면
// 기존 타입에 필드를 추가한 것과 같은 효과를 낼 수 있다.
type PersonWithGender = Person & {
  gender: string;
}
```

## 2. Type Alias는 `Union` 연산자를 사용할 수 있다.

Type Alias는 `Union` 연산자(`|`)를 사용해서 여러 타입을 하나로 묶을 수 있는 반면, Interface는 할 수 없다.

```ts
// Type Alias
type Person = {
  name: string;
  age: number;
}

// Gender는 string (ex. '남', '여') 또는 number (ex. 0, 1) 타입을 가질 수 있다고 하자.
type Gender = string | number;

// 이후 다음과 같이 Person 타입을 확장하여 사용할 수 있을 것이다.
type PersonWithGender = Person & {
  gender: Gender;
}
```

## 3. `Union` 연산자를 사용한 Type Alias는 `extends`, `implements`를 사용할 수 없다.

위 섹션에서 설명한 것과 같이 Type Alias는 `Union` 연산자를 사용할 수 있다.
하지만 `Union`을 사용한 타입은 사전에 정의한 몇개의 타입(`string`, `number`, 또는 커스텀 타입 등)
중 하나가 올 수 있다는 제약을 갖는 것은 맞지만, 정확히 한가지 타입으로 정해지진 않는다.

완전히 정적인 타입만 다룰 수 있는 Interface와 Class는 `Union`을 사용한 타입으로 `extends` 또는 `implements` 할 수 없다.

```ts
// Type Alias
// Union을 활용한 타입 선언
type PersonWithGender = {
  name: string;
  age: number;
  gender: string | number;
}

// Interface
// extends 불가능
interface Person extends PersonWithGender {}
// Error:
// An interface can only extend an object type or
// intersection of object types with statically known members.

// Class
// implements 불가능
class Person implements PersonWithGender {}
// Error:
// A class can only implement an object type or
// intersection of object types with statically known members.
```

## 4. Interface는 원시 타입에 별칭을 붙일 수 없지만 Type Alias는 가능하다.

Interface는 `string`, `number`, `boolean`, `null`, `undefined`, ... 등 원시 타입(primitive type)에 별칭을 부여할 수 없다.

<span class="md-monologue">근데 그럴 일이 있나..?</span>

```ts
// Interface는 원시 타입(primitive type)을 rename 할 수 없다.
interface SanitizedString extends string {}

// Type Alias는 가능하다.
type SanitizedString = string;
```

<div class="md-reference" markdown=1>
* <https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces>
* <https://medium.com/@martin_hotell/interface-vs-type-alias-in-typescript-2-7-2a8f1777af4c>
* <https://medium.com/humanscape-tech/type-vs-interface-언제-어떻게-f36499b0de50>
* <https://one-armed-boy.tistory.com/entry/Interface-in-TS-vs-Java>
</div>
