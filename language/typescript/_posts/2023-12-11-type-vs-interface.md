---
layout: single
title: "[TypeScript] Type Alias vs Interface"
post-order: 1
date: "2023-12-11 02:34:00 +0900"
last_modified_at: "2023-12-17 22:21:00 +0900"
---

Type Alias와 Interface 중 어느것을 사용해야 할까?<br/>
결론을 말하자면 명확한 답은 없는 것 같다. 둘 간에는 미묘한 차이가 있지만 개발이나 서비스 중에 문제를 일으킬 만한 이슈는
없기 때문에 상황에 따라 적절한 것을 사용하면 될 것 같다.<br/>
이 포스트에서는 타이핑을 위한 선택 기준을 소개하고, Type Alias와 Interface의 차이점을 알아본다.

## 나의 선택 기준

나는 Type Alias를 선택했고 지금까지 계속 사용하고 있다.<br/>
내가 Type Alias를 선택한 이유는 Type Alias 방식이 내게 더 직관적으로 다가왔기 때문이다.

나는 처음 TypeScript를 접했을 때 이미 5년 간 Python을 사용해왔고 Java 경험도 약간 있었다.<br/>
그래서인지 선택에 있어서 Python과 Java의 영향을 받았다.

Python에서는 타입 힌트를 위한 `typing` 모듈을 사용했고, Java에서는 Java의 정적 타입 시스템을 사용했다.

Python의 `typing` 모듈의 이름과 어울리는 것은 TypeScript의 Type Alias(`type`)와 Interface(`interface`) 중
단순하게 형태가 유사한 `type` 이기도 하다.

또한 Java에도 `interface`가 있는데 TypeScript의 `interface`와 개념적으로 차이가 있다고 느껴졌기 때문에
`interface`로 타입을 선언하는 것이 불편했다.

나는 TypeScript를 작성할때 거의 타입 힌트를 목적으로 보고 타이핑을 사용했다.
따라서 목적에 걸맞게 키워드 `type`을 사용하는 것이 직관적으로 이해가 쉬웠다.<br/>
만약 추상화 또는 다형성으로 타이핑 목적의 초점을 맞추고 있었다면 `interface`를 사용하게 됐을 것이다.

그 외에도 `type`은 4글자, `interface`는 9글자라서 `type`을 사용하는 것이 더 편했다. ^^

## 좀 더 신뢰할 수 있는 선택 기준

TypeScript 공식 문서에서는 개인의 기호에 따라 선택하되,
무엇을 쓸지 모르겠다면 우선 Interface를 사용하고 필요한 경우 Type Alias를 사용하라고 한다.<br/>
(Ref. TypeScript 공식 문서
<a
  href="https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces"
  rel="noopener noreferrer"
  target="_blank">내용</a>)

# Type Alias와 Interface의 유사점

Type Alias와 Interface는 거의 차이가 없다.
심지어 아래 [차이점 섹션에서 설명할 특수한 상황](#3-union-연산자를-사용한-type-alias는-extends-implements를-사용할-수-없다)을 제외하고
대부분은 두개를 섞어 사용할 수도 있다.

TypeScript는 구조적 타이핑(Structural Typing)을 사용하기 때문에 구조적으로 동일한 타입은 같은 타입으로 취급한다.<br/>
따라서 아래 예시에서 Type Alias로 선언한 `Developer1` 타입의 변수를 Interface로 선언한 `Developer2` 타입의 변수에 할당할 수도 있다.

반면에 Java는 명목적 타이핑(Nominal Typing)을 사용하기 때문에 다른 타입끼리는 구조적으로 동일하더라도 다른 것으로 취급한다.

```ts
// ==============================
// Type Alias
// ==============================
type Person = {
  name: string;
  age: number;
};

// ==============================
// Interface
// ==============================
interface Career {
  company: string;
  position: string;
  period: string;
}

// Type Alias와 Interface를 섞어서 Type을 정의
type Developer1 = Person & Career;

// Type Alias와 Interface를 섞어서 Interface를 정의
interface Developer2 extends Person, Career {}

// Type Alias로 선언한 Developer1과 Interface로 선언한 Developer2는 구조적으로 동일한 타입이며 혼용할 수 있음
// feat. TypeScript Structural Type System
// - https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html#structural-type-system
```

# Type Alias와 Interface의 차이점

Type Alias와 Interface는 대개 유사하지만 다음과 같이 4가지의 미묘한 차이를 가진다.

## 1. Interface는 Declaration Merging이 가능하지만 Type Alias는 불가능하다.

즉, Interface는 선언한 내용을 수정(Declaration Merging)할 수 있지만 Type Alias는 할 수 없다.

Interface는 이처럼 재선언이 용이하므로 3rd party library를 만들 때 Interface를 사용한다.<br/>
3rd party library의 유저는 필요한 경우 3rd party library 내부에 선언된 Interface를 커스텀(재선언) 해서 사용할 수 있다.

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

위 예시 코드에서 `interface Person`은 3개 필드(`name`, `age`, `gender`)를 가진 타입이다.

아래 예시 코드는 Type Alias의 교차 타이핑을 사용해서 `interface Person`과 동일한 3개 필드를 갖는 타입
`type PersonWithGender`을 선언한다.

```ts
// 위 예시 코드과 같이 기존에 선언한 Person 타입이 있다고 가정하자.
type Person = {
  name: string;
  age: number;
};

// Type Alias는 같은 이름을 가진 타입의 재선언(수정)은 안된다.
// 하지만 다음과 같이 교차 타입(Intersection Type)을 사용해서 새로운 타입을 생성하면
// 기존 타입에 필드를 추가한 것과 같은 수정 효과를 낼 수 있다.
type PersonWithGender = Person & {
  gender: string;
}

// 참고:
// 필드 추가 방식의 재선언 이외에도 Pick, Omit 등 유틸리티 타입을 사용해서
// 기존 타입을 다양한 방식으로 확장할 수 있다.
// - https://www.typescriptlang.org/docs/handbook/utility-types.html
```

## 2. Type Alias는 `Union`(`|`) 연산자를 이용해 합집합 타입(Union Type)을 선언할 수 있다.

Type Alias는 `Union` 연산자(`|`)를 사용해서 두개 이상의 타입을 결합한 합집합 타입을 선언할 수 있다.

합집합 타입(Union Type)은 집합 안에 속한 두개 이상의 타입들 중 하나가 될 수 있는 타입이라는 의미이다.

```ts
// ==============================
// Type Alias
// ==============================
type Person1 = {
  name: string;
  age: number;
}

type Person2 = {
  name: string;
  company: string;
}

// Person 타입을 갖는 객체는 Person1 또는 Person2 타입 중 하나가 될 수 있다.
type Person = Person1 | Person2;

// ok
const person1: Person = {
  name: 'John',
  age: 20,
};

// ok
const person2: Person = {
  name: 'Jane',
  company: 'Google',
};
```

## 3. `Union` 연산자를 이용한 합집합 타입(Union Type)은 `extends`, `implements`에 적용될 수 없다.

[위 섹션에서 설명한 것](#2-type-alias는-union-연산자를-이용해-합집합-타입union-type을-선언할-수-있다)과 같이
Type Alias에서는 `Union` 연산자를 사용하여 Union Type을 선언할 수 있다.

Union Type은 '사전에 선언한 두개 이상의 타입 중 하나가 될 수 있다'는 제약을 가지는데,
<u>선언 순간에 정확히 한가지 타입으로 정해지진 않는다.</u>

따라서 완전히 정적인 타입만 다룰 수 있는 Interface와 Class는 Union Type 객체를
`extends` 또는 `implements` 할 수 없다.

```ts
// ==============================
// Type Alias
// ==============================
type Person1 = {
  name: string;
  age: number;
  gender: string; // 성별을 '남' 또는 '여'로 표현한다 가정
}

type Person2 = {
  name: string;
  age: number;
  gender: number; // 성별을 0 또는 1로 표현한다 가정
}

// Union Type 선언
type PersonWithGender = Person1 | Person2;

// ==============================
// Interface
// ==============================
// extends 불가능
interface Person extends PersonWithGender {}

// Error: ts(2312)
// An interface can only extend an object type or
// intersection of object types with statically known members.

// ==============================
// Class
// ==============================
// implements 불가능
class Person implements PersonWithGender {}

// Error: ts(2422)
// A class can only implement an object type or
// intersection of object types with statically known members.
```

## 4. Interface는 원시 타입에 별칭을 붙일 수 없지만 Type Alias는 가능하다.

Interface는 `string`, `number`, `boolean`, `null`, `undefined`, ... 등 원시 타입(primitive type)에 별칭을 부여할 수 없다.

<span class="md-monologue">근데 굳이 그렇게까지 할 일이 있나..?</span>

```ts
// Type Alias는 가능하다.
type SanitizedString1 = string;

// Interface는 원시 타입(primitive type)을 rename 할 수 없다.
interface SanitizedString2 extends string {}
// Error: ts(2840)
// An interface cannot extend a primitive type like 'string'; an interface can only extend named types and classes
```

<div class="md-reference" markdown=1>
* <https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces>
* <https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html#structural-type-system>
* <https://www.typescriptlang.org/docs/handbook/utility-types.html>
* <https://medium.com/@martin_hotell/interface-vs-type-alias-in-typescript-2-7-2a8f1777af4c>
* <https://medium.com/humanscape-tech/type-vs-interface-언제-어떻게-f36499b0de50>
* <https://one-armed-boy.tistory.com/entry/Interface-in-TS-vs-Java>
</div>
