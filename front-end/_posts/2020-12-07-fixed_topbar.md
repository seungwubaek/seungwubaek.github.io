---
layout: single
title: "Fixed Topbar 구현"
post-order: 1
date: "2020-12-07 20:26:00 +0900"
last_modified_at: "2020-12-09 21:26:00 +0900"
---
스크롤을 내리거나 올려도 항상 브라우저 화면의 최상단에 위치하는 Fixed Topbar를 만들자.<br/>
포스트 내용의 세로 길이가 브라우저 화면의 세로 길이 보다 길면 스크롤바가 생긴다.
그리고 스크롤바를 스크롤 했을때 보통의 Topbar는 화면 밖으로 사라진다.<br/>
이때 CSS `position: fixed` 속성값 설정과 몇가지 보완을 통해
내 블로그의 Topbar 처럼 화면을 스크롤 했을때에도 항상 화면의 최상단에 위치해 있는 Fixed Topbar를 구현하자.

## Fixed Topbar 샘플

아래는 Fixed Topbar 샘플이다. Topbar가 항상 최상위에 고정 되어있다.

<iframe class="width-80-100" style="height: 300px;"
        src="/assets/iframes/fixed_topbar/fixed_topbar.html">Fixed Topbar Sample</iframe>

Fixed Topbar를 구현하는 방법은 2가지가 있다.<br/>
둘 모두 설명할 것인데 [첫번째](#구현-method-1)는 약간 문제가 있지만 구현이 매우 간단하고<br/>
[두번째](#구현-method-2)는 문제를 일부 해결했지만 Javascript를 사용한다.

## Fixed Topbar 장점과 문제점

먼저 일반 Topbar 대비 Fixed Topbar의 장점과 위에서 언급한 문제란 무엇인지 알아본다.

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

문제를 해결하지 않고 일반적으로 Fixed Topbar를 구현하면 아래 처럼 된다.

<iframe class="width-80-100" style="height: 300px;"
    src="/assets/iframes/fixed_topbar/fixed_topbar-hide_html.html">Fixed Topbar Sample - Hide HTML</iframe>

겹침을 보여주기 위해 Topbar를 약간 투명하게 했다. Topbar와 내용이 겹치는것을 볼수 있다.<br/>
그리고 "여기를 클릭하면..." 이라는 메시지의 링크를 클릭하면 자동 스크롤이 되지만 Topbar에 가려진다.

* HTML 요소 가림

  Fixed Topbar가 다른 HTML 요소를 가린다.<br/>
  Topbar가 Fixed가 아니라면 전체 HTML 구조의 최상위에 있게 되고
  내용 요소는 Topbar 아래에 붙는다.<br/>
  Topbar가 Fixed라면 HTML 구조에서 독립되므로 내용 요소가 구조 최상위에 있게 된다.
  그래서 Fixed Topbar와 내용 요소가 같은 최상위 위치에서 겹치는 문제가 발생한다.

* 자동 스크롤 시 HTML 요소 가림
  {: id="자동-스크롤-시-HTML-요소-가림"}
  특정 위치로 자동 스크롤 할때 우리는 스크롤이 Fixed Topbar 바로 아래로 스크롤 되기를 기대하지만<br/>
  브라우저는 이동하려는 위치의 y 좌표가 브라우저 화면의 꼭대기(Top)에 오도록 자동 스크롤 한다.
  이때 Fixed Topbar는 항상 Top에 위치하므로 스크롤한 위치의 라인을 가리게 된다.

따라서 Fixed Topbar를 구현할때엔 이러한 가림 문제를 해결해야 한다.

### 문제가 발생하는 이벤트

위의 HTML 요소 가림 문제는 구체적으로 아래와 같은 상황에서 발생한다.

* <p id="문제-상황-1">문제 상황 1<br/>
  링크를 클릭하여 다른 페이지로 부터 이동해 올 때</p>

* <p id="문제-상황-2">문제 상황 2<br/>
  링크를 클릭하여 다른 페이지로 부터 이동해 온 다음 특정 위치로 자동 스크롤 할 때</p>

* <p id="문제-상황-3">문제 상황 3<br/>
  링크를 클릭하여 같은 페이지 내에서 다른 위치로 자동 스크롤 할 때</p>

* <p id="문제-상황-4">문제 상황 4<br/>
  같은 페이지의 URL에 hash만 다른 값을 주소 표시줄에 직접 입력해서 자동 스크롤 할 때</p>

# 구현 Method 1

첫번째 방법은 오직 __CSS만 사용해서__ Fixed Topbar를 구현한다.

이 방법은 [문제 상황 1](#문제-상황-1)(페이지가 처음 로드 되었을 때)의 경우에서만
Fixed Topbar가 내용을 가리지 않도록 한다.

나머지 [문제 상황 2](#문제-상황-2), [3](#문제-상황-3), [4](#문제-상황-4)는 해결하지 못한다.

하지만 이 방법은 CSS 만 사용하기 때문에 구현이 쉽다는 장점이 있는데다가
HTML 요소 가림 문제가 사용자 경험에 큰 영향을 주지 않을 수 있기 때문에
다른 블로그들을 보면 문제를 그냥 안고 가는 경우가 많은 것 같다.

이런 가림 문제를 좀 더 해결해보고 싶다면, 두번째 방법 [구현 Method 2](#구현-method-2)를 보자.

## 과정

* Topbar를 최상단에 고정시키는 CSS 속성을 부여한다

```css
.topbar {
  position: fixed;
  top: 0;
}
```

* 다른 요소들이 Topbar에 겹치지 않도록 한다<br/>
  Topbar가 차지하는 높이 만큼 `<html>` 태그에 윗 여백을 준다.
  <span class="md-monologue">인터넷을 다 뒤져봐도 이렇게 하는 경우가 없었다.
  순수 내 Try&Error로 찾은것. 그래서 오히려 문제가 생길수도 있겠지..</span>

```css
html {
  margin-top: 40px;
}
```

## 샘플

<iframe class="width-80-100" style="height: 300px;"
    src="/assets/iframes/fixed_topbar/fixed_topbar-method1.html">Fixed Topbar Sample - Method 1</iframe>

## 샘플 코드

```html
<html>
<head>
<style>
html {
  margin-top: 40px;   /* topbar 높이 만큼 윗 여백 설정 */
}
body {
  padding: 0;
  margin: 0;
}
.topbar {
  position: fixed;    /* 요소 고정 */
  top: 0;             /* 최상위에 위치 시킴 */
  background: rgba(0, 0, 0, .75);
  color: white;
  width: 100%;
  height: 32px;
  font-size: 20px;
  text-align: center;
  border-bottom: 4px solid red;
}
.content {
  font-size: 16px;
  padding-left: 10px;
  padding-right: 10px;
}
.header {
  font-size: 20px;
  margin-bottom: 5px;
  border-bottom: 1px solid gray;
}
</style>
</head>
<body>
<div class='topbar'>Topbar</div>
<div class='content'>
  <h1 class="header" id="섹션-1">섹션 1</h1>
  <p>섹션 1의 내용입니다.<br/>
     섹션 1의 내용입니다.<br/>
  <a href="#섹션-3">여기</a>를 클릭하면 섹션3로 자동 스크롤합니다.</p>
  <h1 class="header" id="섹션-2">섹션 2</h1>
  <p>섹션 2의 내용입니다.<br/>
     섹션 2의 내용입니다.</p>
  <h1 class="header" id="섹션-3">섹션 3</h1>
  <p>섹션 3의 내용입니다.<br/>
     섹션 3의 내용입니다.<br/>
     <a href="#섹션-1">여기</a>를 클릭하면 섹션1로 자동 스크롤합니다.</p>
  <h1 class="header" id="섹션-4">섹션 4</h1>
  <p>섹션 4의 내용입니다.<br/>
     섹션 4의 내용입니다.</p>
  <h1 class="header" id="섹션-5">섹션 5</h1>
  <p>섹션 5의 내용입니다.<br/>
     섹션 5의 내용입니다.</p>
</div>
</body>
</html>

```

# 구현 Method 2

두번째 방법은 CSS를 사용해서 Topbar를 구현하고 Javascript를 사용해서
[HTML 요소 가림 문제](#문제점-fixed-topbar가-내용을-가림)를 일부 해결한다.

[문제가 발생하는 4가지 상황](#문제가-발생하는-이벤트) 중 상황 1, 2, 3을 해결 할 수 있다.

## 과정

* [구현 Method 1](#구현-method-1)과 같이 Topbar를 최상단에 고정시키는 CSS 속성을 부여한다

```css
.topbar {
  position: fixed;
  top: 0;
}
```

* 다른 요소들이 Topbar에 겹치지 않도록 한다([문제 상황 1](#문제-상황-1)의 해결)<br/>
  구현 Method 1과 달리 Topbar가 차지하는 높이 만큼 `<html>` 태그가 아닌
  `<div class="content">` 태그에 윗 여백을 준다. 이것이 더 reasonable 하다.

```css
.content {
  padding-top: 40px;
}
```

* [문제 상황 2](#문제-상황-2)의 해결<br/>
  페이지 로드가 완료 됐을때 주소에 `hash`[^hash]가 있으면 자동 스크롤이 발생한다.<br/>
  그런데 자동 스크롤의 위치가 올바르지 않으므로 올바른 `hash` 위치로 스크롤 하는 코드를 삽입한다.

<div class="notice--info" markdown="1">
## 문제 해결의 핵심
{: style="margin-top: 0.5em;"}
함수 `scrollTo`는 지정한 y좌표를 브라우저 화면의 꼭대기에 오도록 스크롤한다.<br/>
이점을 이용해서, `hash`의 y좌표로 스크롤 하는 것이 아니고 그것보다 일정 값(`top_offset` 변수) 만큼
더 위에 있는 y좌표로 스크롤 하게 한다.<br/>
그렇게 하면 스크롤 됐을때 화면의 꼭대기에는 `hash`의 y좌표보다 일정 값 만큼 더 위에 있는 y좌표가 위치해
있을 것이다.
</div>

```javascript
$(function() {  // 페이지 로드가 완료된 이후 실행되게 한다.
  // top_offset: Fixed Topbar가 차지하는 높이를 고려해서 스크롤을 내리고 싶은 만큼 입력. (px 단위)
  top_offset = 99;
  if(location.hash.length > 0) {
    var h = decodeURIComponent(location.hash);  // 한글 hash를 인식하기 위한 조치
    var yPos = $(h).offset().top - top_offset;
    scrollTo({top: yPos, behavior: 'smooth'});
  }
});
```

* [문제 상황 3](#문제-상황-3)의 해결<br/>
  페이지 내에서 링크를 클릭하면 해당하는 위치로 자동 스크롤이 발생한다.<br/>
  이때도 `hash` 값을 기준으로 위치를 계산하는데 역시 자동 스크롤의 위치가 올바르지 않다.
  올바른 위치로 스크롤 하는 코드를 삽입한다.

```javascript
$(function() {
  top_offset = 99;
  // <a> tag 에만 적용한다. 모든 태그에 적용시키는 어렵다. 필요한 순간에 그때그때 적용하기로 한다.
  // <a> tag가 페이지 내에서 움직이는 용도임을 구별하기 위한 조건문
  $('a').click(function (e) {
    // 현위치의 href와 이동하려는 곳의 href가 hash 값만 빼고 일치
    if($(this)[0].origin == location.origin &&
      $(this)[0].pathname == location.pathname) {
      e.preventDefault();
      var h = $(this).attr('href');
      var yPos = $(h).offset().top - top_offset;
      scrollTo({top: yPos, behavior: 'smooth'});
      history.pushState({}, null, h);  // 주소표시줄의 hash를 이동한 위치의 값으로 변경해줌
    }
  });
});
```

## 샘플

이 포스트 맨위에 [샘플](#fixed-topbar-샘플)을 실었으므로 참고하자.

## 샘플 코드

```html
<html>
<head>
<style>
body {
  padding: 0;
  margin: 0;
}
.topbar {
  position: fixed;    /* 요소 고정 */
  top: 0;             /* 최상위에 위치 시킴 */
  background: rgba(0, 0, 0, .75);
  color: white;
  width: 100%;
  height: 32px;
  font-size: 20px;
  text-align: center;
  border-bottom: 4px solid red;
}
.content {
  font-size: 16px;
  padding-top: 40px;  /* topbar 높이 만큼 윗 여백 설정 */
  padding-left: 10px;
  padding-right: 10px;
}
.header {
  font-size: 20px;
  margin-bottom: 5px;
  border-bottom: 1px solid gray;
}
</style>

</head>
<body>
<div class='topbar'>Topbar</div>
<div class='content'>
  <h1 class="header" id="섹션-1">섹션 1</h1>
  <p>섹션 1의 내용입니다.<br/>
     섹션 1의 내용입니다.<br/>
  <a href="#섹션-3">여기</a>를 클릭하면 섹션3로 자동 스크롤합니다.</p>
  <h1 class="header" id="섹션-2">섹션 2</h1>
  <p>섹션 2의 내용입니다.<br/>
     섹션 2의 내용입니다.</p>
  <h1 class="header" id="섹션-3">섹션 3</h1>
  <p>섹션 3의 내용입니다.<br/>
     섹션 3의 내용입니다.<br/>
     <a href="#섹션-1">여기</a>를 클릭하면 섹션1로 자동 스크롤합니다.</p>
  <h1 class="header" id="섹션-4">섹션 4</h1>
  <p>섹션 4의 내용입니다.<br/>
     섹션 4의 내용입니다.</p>
  <h1 class="header" id="섹션-5">섹션 5</h1>
  <p>섹션 5의 내용입니다.<br/>
     섹션 5의 내용입니다.</p>
</div>
<script src="/assets/js/main.min.js"></script>
<script>
$(function(){
  // 스크롤 목적지 y좌표를 40px 만큼 위로 올린다
  var top_offset = 40;

  // (부드러운) 스크롤을 수행하는 함수
  function scrollToHash(h) {
    var yPos = $(h).offset().top - top_offset;
    scrollTo({top: yPos, behavior: 'smooth'});
  }

  // 다른 페이지에서 넘어왔을 때 올바른 자동 스크롤
  if(location.hash.length > 0) {
    var h = decodeURIComponent(location.hash);  // 한글 hash를 인식하기 위한 조치
    scrollToHash(h);
  }

  // 같은 페이지에서 다른 위치로 스크롤 할 때 올바른 자동 스크롤
  $('a').click(function (e) {
    if($(this)[0].origin == location.origin &&
       $(this)[0].pathname == location.pathname) {
      e.preventDefault();
      var h = $(this).attr('href');
      scrollToHash(h);
      history.pushState({}, null, h);
    }
  });
});
</script>
</body>
</html>
```

[^hash]: hash: href 끝에 `#`으로 시작하는 문자열. 요소의 id를 의미.
