---
layout: single
title: "Liquid와 Jekyll로 함수 만들기"
post-order: 2
date: "2021-01-12 17:07:00 +0900"
last_modified_at: "2021-01-12 17:07:00 +0900"
---
Liquid의 기능을 이용하면 Jekyll에서 함수 처럼 작동하는 Liquid 문법을 사용할 수 있다.
다만 진짜 함수는 아니며 HTML 안에 다른 파일의 내용을 삽입하는 방법으로 함수처럼 보이도록 한다.

설명에 앞서 Liquid의 기본 개념과 문법에 대해서 어느정도 알고 있다고 가정한다.
기본 개념에 관련한 내용은 이 [포스트]({{ site.baseurl }}/front-end/liquid/liquid/#page-title)를 참조하면 좋다.

## Requirement

Jekyll, Liquid

# 함수 구현 방법

함수 구현 핵심은 Liquid의 `include` tag 이다.

## Liquid tag: `include`

Liquid `include` 태그를 써서 HTML 안에 다른 파일의 내용을 삽입할 수 있다.

아래는 아주 간단한 사용 예이다.

```liquid
<p>
{% raw %}{% include liquid_example.html %}{% endraw %}
</p>
```

위 코드는 현재 파일에 `liquid_example.html` 이라는 파일 내용을 불러오는 코드이다.<br/>
이것은 Jekyll의 페이지 빌드 단계에서 순수 HTML로 변환되어 `<p>` 태그 안에 `liquid_example.html` 파일의 내용이 삽입된다.

이런 작업은 마치 C 언어의 `#include`를 연상시킨다.

이때 이것으로 함수화가 가능한 이유는 `include` 태그에 인자를 넘길수 있다는 점 때문이다.
