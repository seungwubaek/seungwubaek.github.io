---
layout: single
title: "Liquid와 Jekyll로 함수 만들기 & Tutorial"
post-order: 2
date: "2021-01-12 17:07:00 +0900"
last_modified_at: "2021-01-12 23:01:00 +0900"
---
Liquid의 기능을 이용하면 Jekyll에서 함수 처럼 작동하는 Liquid 문법을 사용할 수 있다.
다만 진짜 함수는 아니며 HTML 안에 다른 파일의 내용을 삽입하는 방법으로 함수처럼 보이도록 한다.

설명에 앞서 Liquid의 기본 개념과 문법에 대해서 어느정도 알고 있다고 가정한다.
또는 이 [포스트]({{ site.baseurl }}/front-end/liquid/liquid/#page-title)를 참조하면 좋다.

## Requirement

Jekyll, Liquid

## 주의점

Jekyll로 Liquid 구문을 해석하도록 하려면 Jekyll에게 해당 파일을 변환하라고 일러주어야 한다.<br/>
따라서 Liquid를 사용하는 파일은 머리말이 필요함을 잊지 말자.<br/>

```liquid
---
---
```

# Liquid 함수 구현을 위한 아이디어

함수 구현 핵심은 Liquid의 `include` tag 이다.

## Liquid tag: `include`

Liquid `include` 태그를 써서 HTML 안에 다른 파일의 내용을 삽입할 수 있다.<br/>
단, Jekyll을 사용할 때 Liquid `include` 태그로 불러올 수 있는 다른 파일은 `_includes/` 디렉토리 하위에 존재해야만 한다.

아래는 아주 간단한 사용 예이다.

`include`의 원래 기능에 대한 보다 나은 설명은
[Jekyll 공식 문서 한국어 버전](https://jekyllrb-ko.github.io/docs/includes/)을 참조하자.<br/>
<span class="md-monologue">공식문서의 설명만 보고도 감을 잡을지도 모른다.</span>

```liquid
---
layout: default
---
<p>
{% raw %}{% include math_example.html %}{% endraw %}
</p>
```

위 코드는 현재 파일에 `math_example.html` 이라는 파일 내용을 불러오는 코드이다.
이때 파일의 경로에서 `_includes/` 디렉토리는 쓰지 않는다.

위와 같이 작성하면 Jekyll의 페이지 빌드 단계에서 `<p>` 태그 안에 `math_example.html` 파일의 내용이 삽입되고
순수 HTML로 변환된다.

이런 작업은 마치 C 언어에서 `#include` 키워드에 대한 전처리기 작업을 연상시킨다.

## `include` tag에 인자 넘기기

`include` 태그를 사용할때 아래와 같은 방식으로 1개 이상의 인자를 넘겨 줄 수 있다.<br/>
인자를 넘길 수 있다는 점에서 `include` 태그가 더욱 함수다워 졌다.

```liquid
---
layout: default
---
{% raw %}{% include math_example.html [인자명1]=[인자값1] [인자명2]=[인자값2] %}{% endraw %}
```

위와 같이 코드를 짜면 `include`는 넘겨받은 2개의 인자를 삽입하려는 파일의 내부로 전달한다.

그리고 이때 만약 삽입하려는 `math_example.html` 파일 안에서도 Liquid를 사용하고 있다면
이 전달 받은 값을 또다시 Liquid로 처리 할 수 있다.

이렇게 `include` tag 를 함수처럼 사용하는 것이다.

## Liquid로 인자 받기

바로 위 [include tag에 인자 넘기기](#include-tag에-인자-넘기기) 섹션에서 넘겨받은 인자는
아래처럼 `include.[인자명]` 키워드로 받아서 사용할 수 있다.

아래 Liquid 코드는 넘겨받은 인자를 이용해서 Liquid 변수 `param1`을 새로 선언하고 출력하는 과정이다.<br/>
만약 넘겨준 인자가 없었다면 해당 값은 빈 값이 된다. 참고로 이를 Boolean 값으로 변환하면 `False`에 해당한다.

```liquid
{% raw %}{% assign param1 = include.[인자명1] %}{% endraw %}
{% raw %}{{ param1 }}{% endraw %}
```

코드에서 한가지 신경쓸 점은 <strong>머리말</strong>이 없다는 점이다.

[Jekyll 공식 문서 한국어 버전](https://jekyllrb-ko.github.io/docs/includes/)에서 잘 번역했듯,
`include` 태그에 의해 삽입되는 파일은 전체 파일의 일부인 <strong>조각 파일</strong> 이라고 할 수 있다.

따라서 완전한 구조를 갖춘 HTML 파일일 필요도 없고 HTML 구조일 필요 조차 없다.
그리고 이미 자신을 호출하는 부모 파일에 머리말이 있을 것이므로 머리말이 필요없다.

# Tutorial

이론적인 얘기는 여기까지 하고 실제 튜토리얼을 통해 감을 잡아보자.

## 1. 함수 생성

숫자 인자 2개를 받아 두 인자를 더한 값을 반환하는 함수를 만든다.

아래와 같은 내용으로 `_include/math_example.html` 파일을 생성한다.

```liquid
{% raw %}{% assign math_result = include.param_a | plus: include.param_b %}{% endraw %}
{% raw %}{{ math_result }}{% endraw %}
```

참고로 Liquid 문법에 대한 궁금증은
[Liquid가 무엇인지에 대한 포스트]({{ site.baseurl }}/front-end/liquid/liquid/#page-title)에서 언급했던
공식 Liquid 문서 <https://shopify.github.io/liquid/>에서 대부분 해소 할 수 있을 것이다.

## 2. 함수 사용

함수의 결과를 리스트로 보여주는 HTML 문서를 만든다.

아래의 내용으로 제일 상위 디렉토리에 `tutorial_page.html`를 생성한다.

```liquid
---
---
{% raw %}{% assign param_a = 1 %}{% endraw %}
{% raw %}{% assign param_b = 3 %}{% endraw %}
<li>첫번째 인자 param_a 의 값은 {% raw %}{{ param_a }}{% endraw %}</li>
<li>두번째 인자 param_b 의 값은 {% raw %}{{ param_b }}{% endraw %}</li>
{% raw %}{% capture res %}{% include math_example.html param_a=param_a param_b=param_b %}{% endcapture %}{% endraw %}
<li>두 인자를 합한 값은 {% raw %}{{ res }}{% endraw %}</li>
```
## 3. 결과 확인

이제 `https://[내 블로그 URL]/tutorial_page/` URL로 접속하여 결과를 확인해본다. (URL은 설정에 따라 다를 수 있음)

# 참고

## Layout `empty`

위 `tutorial_path.html` [파일](#2-함수-사용)의 머리말엔 아무것도 없다.<br/>
그러면 Jekyll 설정에 별다른 처리를 하지 않았다면 기본값으로 `layout: default`가 적용된다.

그 상태로 Tutorial 결과를 보면 아마 `default` 레이아웃에 있던 태그들이 섞여서 튜토리얼의 결과 확인이 불편할 수 있다.<br/>
이때 깔끔한 결과 화면을 보고 싶다면 아래처럼 자신을 Layout으로 사용하는 포스트나 페이지의 내용은 그대로 보여주고
Layout 자체에는 추가적인 내용이 아무것도 없는 빈 layout `empty`를 하나 만들어서 사용하면 편리하다.

레이아웃 명칭은 `empty`가 아닌 원하는 것으로 지정하면 된다.

경로: `_layouts/empty.html`

```liquid
---
---
{% raw %}{{ content }}{% endraw %}
```

또한 Jekyll에서 정의한 설정, 글로벌 변수들을 Liquid를 이용해서 Javascript에 넣고 싶을 때,
빈 Layout `empty`가 유용하게 사용된다.
