---
layout: single
title: "React Hook 입문 - 렌더링"
post-order: 3
date: "2023-08-17 15:50:00 +0900"
last_modified_at: "2023-08-17 15:50:00 +0900"
---

React Hook은 Functional Component(이하 "함수형 컴포넌트"라 한다)에서 React 기능을 사용할 수 있게 해주는 API 이다.

React가 자체 제공하는 거의 필수적인 Hook들과 커뮤니티에서 만든 많은 Hook들도 있으며,
스스로 Hook을 만들어 사용할 수도 있다.

## Hook의 필요성

Hook은 함수형 컴포넌트에서 다양한 React 기능을 사용하기 위해 필요하며,
변수의 전역적 관리, 컴포넌트 생명주기에 따른 리액션, 그리고 라이브러리 활용까지
보다 확장된 기능들을 사용하기 위해 필요하다.

이 섹션에서는 특히 렌더링 관점에서 Hook의 역할을 중심으로 설명한다.

함수형 컴포넌트는 함수다. 그리고 특별히 함수형 컴포넌트라는 함수는 `return` 결과물이 렌더링 된다.

이때, 알다시피 `return` 한다는 것은 함수 내부 내용물이 메모리에서 해지된다는 것을 의미한다.<br/>
만약 화면에 보여지는 정보에 변경이 발생해서 화면을 갱신(다시 렌더링) 해야 한다면
같은 함수형 컴포넌트를 다시 호출해야 한다.

그런데 기본적으로 함수를 다시 호출하면,
한번 `return` 했었기 때문에 이전에 함수 내부에 저장했던 변수들은 모두 초기화된다.

하지만 웹 화면은 갱신하더라도 화면의 일부만 업데이트 되고 나머지는 그대로 유지돼야 한다. (마치 AJAX 처럼)<br/>
바로 이 점이 함수형 컴포넌트가 가진 문제이다.

그리고 이때 Hooks를 이용하면 함수형 컴포넌트가 `return` 했음에도 불구하고
다시 호출했을 때 이전 상태를 유지해야할 정보는 그대로 유지해주고, 업데이트 해야할 것은 업데이트 하도록 할 수 있다.

따라서 React는 함수형 컴포넌트에서 Hook 기법을 이용해
함수 내부 변수들이 렌더링에 상관없이 값이 변하지 않도록 유지하거나,
필요한 시점에 변하게 하는 등 변수의 상태를 관리할 수 있게 해준다. 이것을 상태 관리라고 한다.

이러한 Hook 기법은 객체 지향 프로그래밍의 1급 객체 함수의 Closure(클로저) 개념을 이용한 것이다.

## 렌더링과 상호작용하는 정보 관리: `useState`

어떤 값의 상태 변화가 렌더링과 상호작용 하게 하려면 `useState`를 사용한다.

`useState`는 2개의 값을 Array 형태로 반환하며, Array의 첫번째 값은 state(상태값), 두번째 값은 상태값을 변경하는 `setter` 함수이다.

첫번째 값(이하 "상태값"이라 한다)은 항상 읽기 전용이다. 이 값에 직접 다른 값을 할당하더라도 상태값은 변경되지 않는다. (`value = 1;` 작동 안함)

두번째 값 `setter` 함수를 호출해서 상태값을 변경할 수 있다.
`setter(변경 값)` 형태로 호출하며, 인자로 전달한 `변경 값`이 상태값이 된다.<br/>
단, `setter` 함수 호출과 함께 넘긴 인자(`변경 값`)가 기존의 상태값과 다른 경우에만 상태값이 변경되며,
기존 상태값과 동일하다면 아무일도 일어나지 않는다.

컴포넌트의 리렌더링은 바로 이 상태값이 변경될 때 일어난다.
따라서 `setter` 함수로 컴포넌트의 리렌더링을 제어할 수 있게 되는 것이다.<br/>
반대로 (`setter` 함수 호출 했음에도) 상태값이 변경되지 않았다면, 리렌더링은 일어나지 않는다.

또한 두개 이상의 상태값이 있다고 할 때, 상태값 중 하나라도 변경되면 리렌더링이 일어난다.
이때, 변경이 없었었던 상태값은 리렌더링이 일어나더라도 초기화 되지 않고 이전 상태를 유지한다.

```jsx
// App.js
import React, { useState } from 'react';

function App() {
  const [count1, setCount1] = useState(0);  // count1은 count2가 바뀌어도 초기화 되지 않는다.
  const [count2, setCount2] = useState(0);  // count2는 count1이 바뀌어도 초기화 되지 않는다.

  return (
    <div>
      <h1>Hello World</h1>
      <p>You clicked count1: {count1} times</p>
      <button onClick={() => setCount1(count1 + 1)}>Click: count1</button>
      <p>You clicked count2: {count2} times</p>
      <button onClick={() => setCount2(count2 + 1)}>Click: count2</button>
    </div>
  );
}
```

## 렌더링에 영향을 주지 않는 정보 관리: `useMemo`, `useCallback`, `useRef`

`useMemo`/`useCallback`/`useRef`와 `useState`의 공통점은
리렌더링에 의한 할당값의 초기화를 막고 이전 정보를 유지하도록 해준다는 점이다.

차이점은 `useState`의 상태값과 달리, 할당된 값을 변경해도 컴포넌트의 리렌더링이 발생하지 않는다는 점이다.

### `useMemo`

`useMemo`는 할당값을 캐싱해서 리렌더링으로인한 초기화로부터 보호하는 기능을 제공하는 hook 이다.

리렌더링이 발생했을 때, `useMemo`의 캐싱값은 특정 초기화 조건을 만족한 경우에만 초기화되고,
그렇지 않으면 캐싱값을 재사용한다.

특정 초기화 조건이란 `useMemo`의 두번째 인자(dependency)로 전달된 배열의 값 중 변경된 값이 있는지 여부이다.<br/>
변경 값이 있으면 캐시값을 초기화 하며, 변경 값이 없으면 캐시값을 재사용한다.

주로 복잡한 계산의 결과를 재사용하는데 쓰이며, 리렌더링이 불필요한 재계산 부하를 일으키는 경우 유용하다.

```jsx
// App.js
import React, { useState } from 'react';

function App() {
  const [count1, setCount1] = useState(0);  // 얘가 바뀌면 sum이 다시 계산(초기화) 된다.
  const [count2, setCount2] = useState(0);  // 얘가 아무리 바뀌어도 sum은 초기화 되지 않는다.

  const sum = useMemo(() => {
    console.log('useMemo 초기화');
    let sum = 0;
    for (let i = 0; i <= count1; i++) {
      sum += i;
    }
    return sum;
  }, [count1]); // dependency: count1 상태값의 변경이 초기화 조건이다.

  return (
    <div>
      <h1>Hello World</h1>
      <p>You clicked count1: {count1} times</p>
      <button onClick={() => setCount1(count1 + 1)}>Click: count1</button>
      <p>You clicked count2: {count2} times</p>
      <button onClick={() => setCount2(count2 + 1)}>Click: count2</button>
      <p>count1 summary: {sum}</p>
    </div>
  );
}
```

### `useCallback`

`useCallback`은 `useMemo`와 유사하며 함수를 캐시하는 역할을 하는 Hook이다.

### `useRef`

`useRef`는 참조값이 리렌더링에도 초기화 되지 않고 기억되도록 할 때 사용하는 Hook이다.

`useMemo`/`useCallback`과 공통점은 리렌더링에 의해 값이 초기화 되지 않는다는 점이다.

차이점은 참조값을 초기화하는 초기화 조건이 없다는 점이다.

주로 사용하는 경우는 다음과 같다.

* 단순히 값을 기억해야하는 경우
* DOM을 직접 조작해야하는 경우

```jsx
// App.js
import React, { useRef } from 'react';

function App() {
  const count = useRef(0); // 값을 기억하는 용도

  return (
    <div>
      <h1>Hello World</h1>
      {/* 버튼을 클릭해서 count++ 해도 리렌더링 되지 않으므로 화면의 변화를 볼 수 없다 */}
      <p>You clicked {count.current} times</p>
      <button onClick={() => count.current++}>Click</button>
    </div>;
  );
}
```

## 컴포넌트 Mount/Update/Unmount: `useEffect`

`useEffect`는 컴포넌트의 생명주기 중 특정 시점에, 상태값 변화에 따라, 특정 작업의 수행을 지시할 수 있는 Hook이다.

### 생명주기

함수형 컴포넌트에는 생명주기가 있다. 생명주기는 Mount/Update/Unmount로 구분한다.

각 주기는 다음을 의미한다

* Mount(마운트): 컴포넌트가 DOM에 추가됨
* Update(업데이트): DOM에 추가돼 있는 기존 컴포넌트의 내용이 변경됨
* Unmount(언마운트): 컴포넌트가 DOM에서 제거됨

참고로 점점 사용하지 않고있는 Class Component에도
`componentWillMount`, `componentDidMount`, `componentDidUpdate`, `componentWillUnmount` 등과 같이
함수형 컴포넌트의 생명주기 보다 더 세분화된 생명주기가 있다는 것을 알 수 있다.<br/>
하지만 앞서 말했듯이 Class Component는 Legacy로 구분하고 있으므로 쓰지 말도록 하자.
React가 이런 과정을 거쳐서 여기까지 왔다는 것만 인지하고 넘어가자.

`useEffect`는 `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`를 합친 것이라고 생각할 수도 있다.

### 실행조건: dependency 인자

또한 `useEffect`의 실행 조건을 `useMemo` 처럼 dependency 배열로 전달 할 수 있다.
그리고 무엇이 전달됐는가에 따라 `useEffect`를 실행할 생명 주기 시점이 달라진다.

* dependency 배열이 없으면 Mount/Update 시점에 실행된다. (매 렌더링 마다 실행)
* dependency 배열이 빈 배열이면 Mount 시점에만 실행된다. (첫 렌더링에만 1회 실행. 업데이트 시점에는 실행되지 않음)
* dependency 배열에 값이 있으면 Mount/Update 시점에 dependency 배열의 값이 변경된 경우에만 실행된다.

```jsx
// App.js
import React, { useEffect } from 'react';

function App() {
  // 매 렌더링 마다 실행
  useEffect(() => {
    console.log('마운트 시점과 업데이트 시점에 실행됩니다.');
  });

  // 마운트 시점에만 실행
  useEffect(() => {
    console.log('마운트 시점에만 실행됩니다.');
  }, []);

  useEffect(() => {
    console.log('count가 변경될 때만 실행됩니다.');
  }, [count]);

  return <div>
    <h1>Hello World</h1>
  </div>;
}
```

### Unmount

마지막으로 Umount 시점에 실행해야 할 작업이 있다면 `useEffect`의 `return`문에 함수를 작성하면 된다.

dependency 배열의 값은 Unmount 시점에는 의미가 없으므로 빈 배열을 전달하면 된다.

다만 컴포넌트의 Mount 시점에 DB Connection을 연결했다가,
컴포넌트 Unmount 시점에 해제하는 경우는 아래와 같이 `useEffect` 함수를 유용하게 사용할 수 있다.

```jsx
// App.js

import React, { useEffect } from 'react';

import connectDB from './db';

function App() {
  const db = useRef(null);

  useEffect(() => {
    const connection = connectDB();
    db.current = connection.getDB();

    return () => {
      db.current.disconnect();
      db.current = null;
    };
  }, []);

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
```

<div class="md-reference" markdown=1>
* <https://create-react-app.dev/docs/adding-typescript/>
* <https://react.dev/reference/react#state-hooks>
* <https://ko.wikipedia.org/wiki/클로저_(컴퓨터_프로그래밍)>
* <https://react.dev/reference/react/useState>
* <https://react.dev/reference/react/useMemo>
* <https://react.dev/reference/react/useRef>
* <https://stackoverflow.com/questions/31556450/what-is-mounting-in-react-js>
* <https://react.dev/reference/react/Component#componentdidmount>
</div>
