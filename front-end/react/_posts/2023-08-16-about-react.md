---
layout: single
title: "React 란"
post-order: 1
date: "2023-08-16 01:42:00 +0900"
last_modified_at: "2023-08-16 01:42:00 +0900"
---

React는 Javascript로 작성된 Web UI 라이브러리이다.
페이스북에서 개발되고 유지보수되고 있으며 현재 전세계적으로 매우 유명한 Web UI 라이브러리 중 하나이다.

React는 SPA(Single Page Application) 방식의 웹 구현을 위해 사용하는 주요 라이브러리 중 하나이며,
전통적인 HTML, CSS, JS을 이용한 웹 구현 기법과 비교해서 DOM 생성 효율을 높이고 코드의 재사용성을 강화했다.

React는 주로 아래와 같은 특징을 가진다.

- Virtual DOM
- Component 기반
- JSX
- 단방향 데이터 흐름
- 활성화된 커뮤니티

## Virtual DOM (Virtual Document Object Model)

Virtual DOM은 React의 핵심적인 기능이다.
Virtual DOM은 DOM이 변경될 때 변경된 부분만을 감지하여 렌더링(재조정 Reconciliation)하기 위해 사용된다.

DOM은 CSS 등의 스타일이 적용되기 전에 웹 페이지의 구조를 표현하는 트리 구조이다.<br/>
DOM을 얻기 위해서는 먼저 HTML로 웹 페이지를 구조화 해야하고, 브라우저는 이 HTML을 해석하여 DOM으로 변환한다.

이때 React로 웹 페이지를 작성하면 Virtual DOM을 이용해서 브라우저의 DOM 생성 작업량을 최적화 할 수 있도록 돕는다.

만약 웹 페이지에서 사용자의 액션 등으로 웹 페이지의 구조가 변화한다면,
브라우저는 변경된 구조를 파악하고 렌더링 하기 위해 DOM을 다시 생성해야한다.

그런데 짧은 시간동안 웹 페이지의 구조에 많은 변경이 발생하면
브라우저의 DOM 생성작업에 부하가 걸리고 성능이 저하될 수 있다.

React로 만든 웹 페이지는 DOM 생성 전에 먼저 메모리에 Virtual DOM을 생성하고,
생성한 Virtual DOM을 기반으로 실제 DOM을 생성하게 된다.

만약 React로 만든 웹 페이지에서 사용자 액션 등으로 구조의 변경이 발생하면,
브라우저는 변경된 구조의 DOM을 바로 생성하는 것이 아니라, React를 통해 구조 변경에 대응하는 가상의 DOM(Virtual DOM)을 먼저 생성한다.

그리고 그것을 실제 DOM(구조 변경 전)과 비교해서 변경이 발생한 부분을 감지하고 해당 부분을 변경해 주는 것으로 DOM의 생성 횟수를 최소화한다.

### DOM vs Virtual DOM 예시

예를들어 `for` loop로 `<li>` 태그를 500개 생성하는 코드가 있다고 가정하자.

그러면 잠재적으로 500번의 DOM 생성이 발생할 수 있다. (사실 웹 브라우저가 그렇게 멍청하진 않겠지만)<br/>
그러나 이때 React를 사용하면 `<li>` 500개 생성 작업을 Virtual DOM에 미리 그려보고,
단 1번의 DOM 변경에서 `<li>` 500개를 담으면 된다는 것을 계산할 수 있다.

## JSX

JSX는 Javascript와 XML을 합쳐서 만든 문법이다.

Javascript는 프로그래밍 언어이고, XML은 마크업 언어이다.<br/>
따라서 JSX는 Jekyll의 Liquid 또는 Python의 Django, Jinja 또는 Spring의 JSP와 같은
템플릿 언어 기능을 Javascript와 마크업으로 구현하는 문법이라고도 할 수 있다.

React에서는 JSX의 이러한 성질을 이용하여 HTML과 JS를 한 파일에서 작성할 수 있으므로 코드 생산성과 가독성을 높일 수 있다.

### 코드 예

```jsx
// 1. XML(HTML) 방식으로 작성한 Javascript 코드 예
const element = <div>Hello, world!</div>;

// 2. 보다 프로그래밍 언어스럽게 작성한 코드
const elementText = 'Hello, world!';
const element = <div>{elementText}</div>;

// 3. 스타일까지 적용한 코드
const elementText = 'Hello, world!';
const elementStyle = { color: 'red', backgroundColor: 'yellow' };
const element = <div style={elementStyle}>{elementText}</div>;
```

## Component 기반

React의 Component는 UI를 구성하는 기본 단위이다.<br/>
React는 이러한 Components들을 이어붙여 웹 페이지 UI를 완성한다.

Component는 `<div>`, `<p>` 와 같은 HTML 태그,
React Built-in 태그, 또는 개발자가 스스로 제작한 마크업 태그에 스타일과 JS 프로그래밍 로직이 포함된 개념이다.

하나의 Component는 하나의 작은 조각(`<div>`, `<input>`, ...)일 수 있으며,
여러개의 하위 Component를 포함한 복잡한 조각일 수도 있고, 페이지 전체일 수도 있다.

```jsx
const myComponent = () => {
  return (
    <div>
      <p>Hello, world!</p>
      <p>React is awesome!</p>
    </div>
  );
};
```

또한 Component는 JS로 구현한 눈에 보이지 않는 로직을 포함할 수 있으며,
상태(State)라 부르는 데이터를 저장/변경/전달 할 수 있다.

```jsx
const myComponent = () => {
  const [count, setCount] = useState(0);  // 상태(State)

  // 상태 변경 함수
  const onClick = () => {
    setCount(count + 1);
  };

  // onClick 이벤트 핸들러를 통해 상태 변경
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={onClick}>Click me!</button>
    </div>
  );
};
```

Component는 Class Component와 Functional Component 두 종류로 모두 존재하는데 기능과 역할은 동일하다.
하지만 공식적으로 Functional Component를 추천하고 있으며,
23년 8월 15일 기준 Class Component는 Legacy 취급 받게되었다. <https://react.dev/reference/react/Component>

### Built-in components

React에서 기본 제공하는 Component들이다.

* `<Fragment>`
* `<StrictMode>`
* `<Suspense>`
* `<Profiler>`

### API & Hook

React는 다양한 API와 Hook으로 Component에 더 많은 기능을 제공한다. 아래는 그 예시들이며 종류는 훨씬 더 많다.

* API
  * `createRoot()`: Root Component 생성
  * `hydrateRoot()`: 기존 HTML에 Root Component 부착 (Server Side Rendering으로 활용)
  * `createPortal()`: DOM 안의 원하는 특정 위치에 Component 부착 (Model 구현 등에 활용)
* Hook
  * `useState`: 상태(State) 관리
  * `useEffect`: Side Effect 처리
  * `useCallback`: 재사용 가능 함수 제작
  * `useMemo`: 재사용 가능한 값 제작
  * `useRef`: 렌더링을 발생시키지 않는 재사용 가능한 값 제작
  * `useContext`: Context API 사용

## 단방향 데이터 흐름

Component는 자신이 가진 어떤 상태(State) 정보 또는 데이터를 다른 Component에 전달할 수 있는데,
이때 전달 방향은 기본적으로 상위 Component에서 하위 Component로 단방향으로 이뤄진다.
하위에서 상위로 전달하는 역방향은 기본적으로는 불가능하다는 뜻이다.

단방향 흐름에 대한 React 스태프의 설명 영상을 본적이 있는데 이렇게 단방향으로만 정보가 전달되도록 한 것은
일관된 데이터 흐름으로 개발 효율을 올리기 위해서라고 했던 걸로 기억한다.
<span class="md-monologue">영상 출처를 못찾겠네..!!</span>

물론 기본적인 방식이 단방향이라는 것이지 전혀 불가능한 것은 아니다.
React는 [자체 로직](https://react.dev/learn/thinking-in-react#step-5-add-inverse-data-flow)과
API [useContext](https://react.dev/reference/react#context-hooks),
또는 커뮤니티에서 제공하는 다양한 라이브러리([Redux](https://ko.redux.js.org/introduction/getting-started),
[Recoil](https://recoiljs.org/ko/docs/introduction/motivation) 등)를 활용해서
역방뱡 뿐만 아니라 전역적인 데이터 흐름까지 가능하도록 열려있다.

## 활성화된 커뮤니티

React는 커뮤니티가 매우 활성화 되어 있다.
따라서 React 공식으로 제공해주지 못하는 많은 기능들도 커뮤니티 버전으로 제공받을 수 있다.

특히 React는 모든 기능을 자체적으로 관리하지 않고 코어 기능에 집중하고 있으며,
다른 부분들은 커뮤니티에 많이 이양하였기 때문에
React를 사용하려면 여러가지 커뮤니티 라이브러리를 함께 사용할 수 밖에 없다.

### 대표적인 커뮤니티 기능 라이브러리

- Create React App (<https://create-react-app.dev/>)
- React Router (<https://reactrouter.com/en/main/>)
- React Query (<https://tanstack.com/query/>)
- Styled Components (<https://styled-components.com/>)
- Recoil (<https://recoiljs.org/ko/>)
- Redux (<https://ko.redux.js.org/>)
- Swiper (<https://swiperjs.com/react/>)

### 대표적인 커뮤니티 UI 라이브러리

- Material UI (<https://mui.com/>)
- Ant Design (<https://ant.design/>)
- Chakra UI (<https://chakra-ui.com/>)
- Tailwind CSS (<https://tailwindcss.com/>)

## 웹 개발을 위해 어떤 라이브러리를 쓰는게 좋을까?

결론부터 말하자면 답은 없다.

웹 개발을 위해 어떤 라이브러리를 사용해야할지 고민 중인 사람들도 있을 것 같다.
나 또한 그런 사람 중 하나였다.<br/>
실제로 사용해 보는 것만 제외하고 React, Vue.js, Angular에 대해 여러가지 조사를 했고 결국 React를 선택했지만,
아무리 조사를 한들, 실제로 익히고 실무에서 사용해보기 전까지 알 수 없는 것들이 많았다.

### JSX의 indentation 지옥(까지는 아니지만.. 자꾸만 신경쓰이게 하는걸)

내가 React를 선택한 가장 큰 이유는 JSX 였다.<br/>
JSX의 Javascript는 웹 특화 프로그래밍 언어로 기초적인 사용법은 이미 알고 있는 경우(내 경우가 그랬다)가 많고
모르더라도 배우기 쉽기 때문에, Javascript로 작성할 수 있는 React는 다른 진영의 라이브러리와 비교했을 때
상대적으로 초기 학습 비용이 적고 그만큼 결과물도 빠르게 생산해 낼 수 있다는 점이 아주 큰 강점이라고 생각한다.
<span class="md-monologue">정작 React 사용법을 빠르게 익히지 못한다면 이야기가 달라지지만...</span>

하지만, JSX 문법은 어떻게보면 indentation이 지나치게 많고 가독성이 떨어져 보이기도 하다.
지난 1년 간 React로 여러 랜딩페이지, 회사 홈페이지, 이커머스 웹 플랫폼을 배포해 오면서
이제 JSX 코딩 스타일에 익숙해질법도 하건만 `return` 뒤에 이어지는 JSX에 indentation들을 보면
'어떻게 좀 개선하면 안될까' 라는 생각이 들곤한다.

#### 예

하나의 indentation 당 space 2칸을 적용한 경우

{% raw %}
<div class="code-reducible code-reduce" markdown="1">
```jsx
const OrderGroupControlPanel = (props) => {
  ...

  return (
    <StDivOrderListControlPanel>
      <StDivControlPanelButtonGroup>
        <span className="group-title">발주 검토 적용 예정 내용</span>
        <pre
          className="control-panel__preview"
          dangerouslySetInnerHTML={{ __html: markUpJSON(confirmOrderInfoByGroup)}}>
        </pre>
      </StDivControlPanelButtonGroup>
      <StDivControlPanelButtonGroup className="horizontal space-between">
        <div className="group-item button-wrapper">
          <StButtonOrderListControlPanel
            className={`btn__cancel ${btnActive.cancel ? 'active' : ''}`}
            onClick={() => cancelOrders(controlFuncAttrs)}
          >
            취소
          </StButtonOrderListControlPanel>

          <StButtonOrderListControlPanel
            className={`btn__pick ${btnActive.pick ? 'active' : ''}`}
            onClick={() => pickOrders(controlFuncAttrs)}
          >
            승인
          </StButtonOrderListControlPanel>

          <StButtonOrderListControlPanel
            className={`btn__update ${btnActive.update ? 'active' : ''}`}
            onClick={() => updateOrders(controlFuncAttrs)}
          >
            수정
          </StButtonOrderListControlPanel>

          ...

          </div>
      </StDivControlPanelButtonGroup>
    </StDivOrderListControlPanel>
  );
}
```
</div>
{% endraw %}

### Virtual DOM이 마법의 도구(Magical Tool)는 아니다

또한 Virtual DOM이 DOM의 생성을 효율적으로 하기 위한 자동화된 방법이라고 해서
React를 선택하는데 있어서 긍정적인 요소로 생각했다.
그러나 긍정적인 요소는 맞지만 마법의 도구는 아니다.

Virtual DOM은 엄밀히 따지면 자동화를 통해 DOM 생성을 가능한 빠르고 효율적으로 생성하는 방법이므로
준수한 퀄리티를 내면서 생산성을 올려주는 테크닉이며,
DOM 생성의 효율화만 놓고 보자면 수동으로 최적화하는 것이 더 효과적일 수도 있다.

### 객체 지향 방식(Class Component) 선호

객체지향 프로그래밍 방식에 익숙해서 인지,
Functional Component 보다 Class Component 접근 방식으로 문제를 풀었으면 훨씬 쉽게 해결될 이슈들이 종종 있었다.

그래서 `useEffect` 같은 Hook 기법은 기발하지만 Functional Component를 추천한다는 공식적인 메시지를 보기 전까지,
나는 `componentDidMount` 같은 Class Component 기반의 로직을 작성했었다.

### 단방향 데이터 흐름은 불편할 수 있다

또한 단방향 데이터 흐름을 강제하는 것 때문에 한 줄로 끝날 수 있는 코드가 빙빙둘러 길어져야만 하는 경우가 있었다.
그렇게 되면 버그 포인트가 될 가능성도 높아지며 가독성도 떨어진다.<br/>
물론 양방향 데이터 흐름이 좋다고는 할 수 없지만...

### 커뮤니티 의존도가 높다

마지막으로, 활성화된 커뮤니티는 React의 장점이기도 하지만,<br/>
커뮤니티에서 제공하는 라이브러리는 상업적인 목적이 없다면
개발과 유지보수에 대한 책임 소재가 불분명할 수도 있기 때문에 (오픈소스의 단점)
점차 버그나 유지보수가 이뤄지지 않을 수도 있고, 사용하지 않게 될 수도 있고, 그러다 갑자기 사라질지도 모를 일이다.

### 결론

나는 이러한 불만들에도 불구하고 React를 선택했지만 그것이 최선의 선택이었다는 생각이 들진 않는다.<br/>
그렇다고 다른 진영의 라이브러리를 선택하는 것이 최선의 선택인 것도 아닐 것이다. 😅<br/>
React의 단점은 다른 라이브러리들의 장점이 될 수 있고, 다른 라이브러리의 단점은 React의 장점이 될 수도 있기 때문이다.

마지막으로 웹 개발을 위한 라이브러리 선택에 대해 하고 싶은 말은,
React는 현재 충분히 유명하며 활성화 되어있고 매력적이라는 것이다.

구글 트렌드: <https://trends.google.co.kr/trends/explore?cat=5&date=today%205-y&q=React,Angular,Vue.js&hl=ko>

<div class="md-reference" markdown=1>
* <https://react.dev/blog/2023/03/16/introducing-react-dev>
* <https://ko.wikipedia.org/wiki/리액트_(자바스크립트_라이브러리)>
* <https://developer.mozilla.org/ko/docs/Web/API/Document_Object_Model/Introduction>
* <https://poiemaweb.com/js-dom>
* <https://ko.legacy.reactjs.org/docs/faq-internals.html>
* <https://velog.io/@jangws/React-Fiber>
* <https://immigration9.github.io/react/2021/05/29/react-fiber-architecture.html>
* <https://wit.nts-corp.com/2019/02/14/5522>
* <https://junghyunkim.tistory.com/entry/번역-Virtual-DOM-이-뭔데-한번-만들어보기>
* <https://react.dev/reference/react/Component>
</div>
