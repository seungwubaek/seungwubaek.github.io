---
layout: single
title: "Fixed Topbar 구현"
post-order: 1
date: "2020-12-07 20:26:00 +0900"
last_modified_at: "2020-12-07 22:49:00 +0900"
---
스크롤을 내리거나 올려도 항상 브라우저 화면의 최상단에 위치하는 Fixed Topbar를 만들자.<br/>
포스트 내용의 세로 길이가 브라우저 화면의 세로 길이 보다 길면 스크롤바가 생긴다.
그리고 스크롤바를 스크롤 했을때 보통의 Topbar는 화면 밖으로 사라진다.<br/>
이때 CSS `position: fixed` 속성값 설정과 몇가지 보완을 통해
내 블로그의 Topbar 처럼 화면을 스크롤 했을때에도 항상 화면의 최상단에 위치해 있는 Fixed Topbar를 구현하자.

아래는 Fixed Topbar 예제이다. 직접 스크롤을 내려보자. Topbar가 항상 최상위에 고정 되어있다.

<iframe class="width-80-100" style="height: 300px;"
        src="/assets/iframes/fixed_topbar.html">Fixed Topbar Example</iframe>

Fixed Topbar를 구현하는 방법은 2가지가 있다.<br/>
둘 모두 설명할 것인데 [첫번째](#구현-method-1)는 약간 문제가 있지만 구현이 매우 간단하고<br/>
[두번째](#구현-method-2)는 문제를 일부 해결했지만 Javascript를 사용한다.

## Fixed Topbar 장점과 문제점

먼저 일반 Topbar 대비 Fixed Topbar의 장점과 윗 단락에서 언급한 문제란 무엇인지 알아본다.

### 장점: 연산 효율 증가

CSS `position: fixed` 속성을 갖는 모든 요소는
유저측 장비에서 브라우저가 화면을 그리는데 필요한 연산을 줄일 수 있다는 장점을 가진다.

일반적으로 HTML 요소들은 층층이 모여 쌓이는 구조로 되어 있다.
그래서 단 1개 요소의 형태(높이 등) 변경만으로도 전체 구조의 변화를 일으킬 수 있고
그럴 경우 전체 변화를 계산하기 위해 연결된 모든 HTML 요소들의 변화를 연산해야 한다.

Fixed Topbar 또한 CSS `position: fixed` 속성을 갖는데,
이 속성은 다른 HTML 요소들로부터 Topbar를 구조적으로 독립시킨다.

Topbar가 독립된다는 것은 다른 HTML 요소의 형태 변화에 영향을 받지 않는다는 것이다.
반대로 다른 요소들 또한 Topbar의 형태 변화에 영향을 받지 않는다.

즉, 한쪽의 구조 변화가 다른 한쪽의 구조에 영향을 주지 않기 때문에
실제 변화가 발생한 한쪽만 다시 그리기 위해 연산하면 되고
다른 한쪽은 변화가 없으므로 추가적인 연산이 필요하지 않게된다.

### 문제점: Fixed Topbar가 내용을 가림

내용 가림 문제는 Fixed Topbar가 전체 HTML 구조에서 독립되어 있기 때문에 발생한다.

* HTML 요소 가림

    Topbar가 Fixed가 아니라면 전체 HTML 구조 최상위에 있게 되고
    내용 요소는 Topbar 아래에 붙는다.<br/>
    Topbar가 Fixed라면 HTML 구조에서 독립되므로 내용 요소가 구조 최상위에 있게 된다.
    그래서 Fixed Topbar와 내용 요소가 같은 최상위 위치에서 겹치는 문제가 발생한다.

* 자동 스크롤 가림

    페이지 이동 이벤트에서 `href`에 `hash` 값
    (예: `href`가 `https://[blog url]/page1/#주제-1` 일 때 `hash` 값은 `#주제-1` 이다.)이 있을때,
    또는 페이지 내에서 `hash` 값의 위치로 스크롤 할 때,
    브라우저는 `hash`가 가르키는 요소의 y 좌표가
    브라우저 화면의 꼭대기(Top)에 오도록 자동 스크롤 한다.
    이때 Fixed Topbar는 항상 Top에 위치하므로 스크롤한 위치의 라인을 가리게 된다.

따라서 Fixed Topbar를 구현할때엔 이러한 가림 문제를 해결해야 한다.

# 구현 Method 1

첫번째 방법은 오직 CSS만 사용해서 Topbar를 구현한다.

이 방법은 아래 2가지 이벤트가 발생할 때 [자동 스크롤 가림 문제](#문제점-fixed-topbar가-내용을-가림)를 해결하지 못한다.<br/>
* (해결) 다른 페이지에서 이동해 왔을 때
* (미해결) URL 주소값을 Browser에 직접 입력해서 화면을 스크롤 할 때

하지만 해결하지 못한 부분이 사용자 경험에 큰 영향을 주지 않을 수 있고
CSS 만 사용하기 때문에 구현이 쉽다는 장점이 있다.<br/>
때문에 다른 블로그들을 보면 문제를 그냥 안고 가는 경우도 있다.

자동 스크롤 가림 문제를 좀더 해결해보고 싶다면, 두번째 방법 [구현 Method 2](#구현-method-2)를 보자.

## 과정

### Topbar 만들기

### Topbar에 CSS 속성 부여

### Navigation 구현

# 구현 Method 2

두번째 방법은 CSS를 사용해서 Topbar를 구현하고 Javascript를 사용해서
[가림 문제](#문제점-fixed-topbar가-내용을-가림)를 일부 해결한다.

[구현 Method 1](#구현-method-1)의 가림 문제 중 해결되는 문제는 아래와 같다.<br/>
* (해결) 다른 페이지에서 이동해 왔을 때
* (미해결) URL 주소값을 Browser에 직접 입력해서 화면을 스크롤 할 때

## 과정

### Topbar 만들기

### Topbar에 CSS 속성 부여

### Navigation 구현
