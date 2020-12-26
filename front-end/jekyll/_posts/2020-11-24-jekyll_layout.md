---
layout: single
title: "[Layout] Jekyll Layout 이란"
post-order: 1
date: "2020-11-24 11:22:00 +0900"
last_modified_at: "2020-12-26 12:07:00 +0900"
---
Jekyll Layout이란 HTML 문서 덩어리(HTML 템플릿)이다. 특징은 특정 Layout을 사용하는 모든 HTML 문서에게 동일한 구조의 HTML 요소들을 제공한다는 점이다. 앞으로 블로그의 HTML 구조를 Custom 하고 싶다면, Jekyll Layout의 구조를 이해해야만 한다.

# Jekyll Layout

Jekyll Layout이란 HTML로 만들어진 템플릿을 의미한다.

HTML 템플릿은 비유하자면 액자의 프레임 또는 무언갈 담는 그릇이다. HTML 템플릿을 사용하는 것은 액자의 프레임을 유지한채 사진만 교체하는 것, 그릇에 담긴 내용물을 바꾸는 것이라고 할 수 있다.

즉, HTML 템플릿의 이점은 "재사용성"에 있다. 우리는 이 이점을 십분 활용해서 블로그를 개발하는데 필요한 코드의 중복과 시간 비용을 상당히 많이 축소할 수 있다.

예를 들어, 1개 포스트를 작성할 때 마다 상단 메뉴, 왼쪽 사이드 메뉴, 오른쪽 사이드 메뉴, 내 프로필 등은 항상 함께 작성되어야 한다. n개 포스트를 작성한다고 하면 (상단 메뉴, 왼쪽 사이드 메뉴, 오른쪽 사이드 메뉴, 내 프로필) x n 개의 추가 작성이 필요하다.<br/>그러다가 만약 상단 메뉴에 변경이 발생한다면 n개 포스트의 상단 메뉴 수정을 각각 반복 수행해야 할것이다.<br/>이때 레이아웃을 사용한다면 그런 수고를 하지 않아도 된다.

![Jekyll Layout and Content]({{ site.gdrive_url_prefix }}14bowOzN5zzOL5MURkBt_8hV1x30VbI_J)

위 그림과 같이 1개의 Layout을 만들어 놓는다면 그 안의 내용물만 교체해 가며 페이지들을 생산할 수 있다.<br/>
또 Layout 영역에 속하는 요소들은 단 한번의 수정으로 모든 페이지에서 동일한 수정 효과를 볼 수 있다.

## Layout 적용법

내가 만든 Markdown 문서(포스트)나 HTML 문서에 아래와 같이 머리말을 작성해서 Jekyll Layout을 적용할 수 있다.

Layout을 만드는 것이 먼저지만 이해를 위해 만들어진 Layout을 가져오는 것부터 설명하겠다.

### 1. Layout 가져오기

HTML로 작성한 `mypost.html` 페이지에  `basic` 이라는 이름의 Layout을 적용하는 예시이다.
머리말에 `layout` 값을 지정해 주면 된다.</br>
`mypost.html`은 전체 `HTML` 페이지의 일부가 될것이기 때문에
`<html>`, `<head>` 등 완성된 HTML 구조를 갖추지 않은 것이 특징이다.

```html
---
layout: basic
---
<h1 id="대주제1">여기서부터 포스트 내용입니다.</h1>
<p>포스트 단락 1</p>
<p>포스트 단락 2</p>
```

### 2. Layout 만들기

그렇다면, 위 예의 HTML 문서에 나온 `basic` 이라는 Layout은 어떻게 Layout의 역할을 하고
어떻게 HTML 문서(내용물)를 받아들일 수 있을까?

아래 코드는 `/_layouts/basic.html` 이라는 Layout의 예시이다.
문서의 완성을 위해 위의 `mypost.html`과 달리 `<html>`, `<head>` 등 완성된 HTML 구조를 가지도록 만든다.

내용물이 들어갈 위치에 `{% raw %}{{ content }}{% endraw %}`라는 liquid 코드가 있다. 후에 Jekyll에 의해 이 위치에 내용물의 HTML 요소들이 삽입된다.

Layout 파일들은 프로젝트 최상위의 `/_layouts` 경로에 HTML 형식으로 존재한다.
<span class="md-monologue">해보진 않았지만 다른 파일 형식도 가능할 것 같다.</span><br/>
Layout 또한 Jekyll이 인식할 수 있도록 머리말을 넣어준다. 머리말에는 레이아웃에서 사용할 liquid 변수 등도 사용 가능하다.

```html
---
---
<html>
<head></head>
<body>
<nav class="main-nav">목차</nav>
<div>basic 레이아웃입니다! 아래 위치에 내용물이 삽입됩니다.</div>
<div class="page__content">
{% raw %}{{ content }}{% endraw %}
</div>
<div>여기는 다시 basic 레이아웃 입니다!</div>
</body>
</html>
```

### 3. Layout이 적용된 페이지

위와 같이 작성하면 `mypost.html` 파일에 `basic` Layout이 입혀지고 Jekyll에 의해 최종적으로 아래처럼 변환된다.

실제로 Layout이 입혀진 페이지를 확인해보고 싶다면 `/_site` 폴더에서 그 결과물을 볼 수 있다.<br/>
유저에게 제공하는 페이지는 `/_site` 에 있는 변환된 `HTML` 파일들이다.

```html
<html>
<head></head>
<body>
<nav class="main-nav">목차</nav>
<div>basic 레이아웃입니다! 아래 위치에 내용물이 삽입됩니다.</div>
<div class="page__content">
<h1 id="대주제1">여기서부터 포스트 내용입니다.</h1>
<p>포스트 단락 1</p>
<p>포스트 단락 2</p>
</div>
<div>여기는 다시 basic 레이아웃 입니다!</div>
</body>
</html>
```

## 다중 Layout 적용법

Layout을 여러겹으로 입히는것도 얼마든지 가능하다. 그 방식은 바로 위에서 본 1개 Layout 적용 방법과 크게 다를 것이 없다.

3개의 Layout과 1개의 포스트로 예를 들어본다.

![Jekyll Multi-Layered Layout and Content]({{ site.gdrive_url_prefix }}146--hHOK4od4vqv9yaHzPFpd8zEFn3nx)

### 1. 바깥 Layout 만들기

`/_layouts/outer.html` 파일을 생성하고 아래와 같은 내용을 넣는다.

```html
---
---
<html>
<head></head>
<body>
<div class="layout" id="outer">레이아웃 outer 시작</div>
{% raw %}{{ content }}{% endraw %}
<div>레이아웃 outer 끝</div>
</body>
</html>
```

### 2. 중간 Layout 만들기

`/_layouts/middle.html` 파일을 생성하고 아래와 같은 내용을 넣는다.<br/>
머리말을 보면 자신도 Layout이면서 `layout` 값으로 `outer` Layout을 가진다.
이처럼 Layout에 포스트 내용을 넣듯, __Layout에 Layout을 넣는다.__

```html
---
layout: outer
---
<div class="layout" id="middle">레이아웃 middle 시작</div>
{% raw %}{{ content }}{% endraw %}
<div>레이아웃 middle 끝</div>
```

### 3. 내부 Layout 만들기

`/_layouts/inner.html` 파일을 생성하고 아래와 같은 내용을 넣는다.<br/>
Layout `middle`이 Layout을 가진것과 마찬가지로 Layout `inner`도 Layout을 가진다.

```html
---
layout: middle
---
<div class="layout" id="inner">레이아웃 inner 시작</div>
<div class="page__content">
{% raw %}{{ content }}{% endraw %}
</div>
<div>레이아웃 inner 끝</div>
```

### 4. Layout 가져오기

이제 내용물로 들어갈 문서를 작성하자. 마크다운으로도 가능하므로 이번엔 마크다운으로 작성해보자.
어짜피 Build 시, Jekyll이 HTML로 변환하므로 차이는 없다.

`mypost.md` 파일을 생성하고 아래와 같은 내용을 넣는다.

```markdown
---
layout: inner
---
# 포스트 주제

포스트의 내용입니다. 다중 레이아웃 구조 안에 들어갑니다.
```

### 5. Layout이 적용된 페이지

위 설계가 build 되면 Jekyll에 의해 `mypost.md` 문서는 아래 코드를 가지는 `mypost.html` 페이지로 변환된다.

```html
<html>
<head></head>
<body>
<div class="layout" id="outer">레이아웃 outer 시작</div>
<div class="layout" id="middle">레이아웃 middle 시작</div>
<div class="layout" id="inner">레이아웃 inner 시작</div>
<div class="page__content">
<h1>포스트 주제</h1>
<p>포스트의 내용입니다. 다중 레이아웃 구조에 들어갑니다.</p>
</div>
<div>레이아웃 inner 끝</div>
<div>레이아웃 middle 끝</div>
<div>레이아웃 outer 끝</div>
</body>
</html>
```
