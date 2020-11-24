---
layout: single
title: "[Git Page로 Blog 만들기] - [9] Minimal-Mistakes의 Layout 소개"
post-order: 9
date: "2020-11-24 11:22:00 +0900"
last_modified_at: "2020-11-24 11:22:00 +0900"
---
Jekyll의 Layout이란 무엇이며, Jekyll Theme [Minimal-Mistakes](https://github.com/mmistakes/minimal-mistakes)에서 구현한 Layout은 무엇이 있는지 간략히 살펴보자.
블로그의 HTML 구조를 임의로 Custom 하고 싶다면, Jekyll Layout의 구조를 이해해야만 한다.

# Layout

레이아웃이란 HTML로 만들어진 템플릿을 의미한다.

HTML 템플릿은 비유하자면 액자의 프레임 또는 무언갈 담는 그릇이다. 또 액자의 프레임을 유지한채 사진만 교체하는 것, 그릇에 담긴 내용물을 바꾸는 것이 레이아웃 사용법에 대한 직관적 이해라고 할 수 있다.

즉, HTML 템플릿의 이점은 HTML 구조의 "재사용성"에 있다. 우리는 이 이점을 십분 활용해서 블로그를 개발하는데 필요한 코드의 중복과 시간 비용을 상당히 많이 축소할 수 있다.

예를 들어, 1개 포스트를 작성할 때 마다 상단 메뉴, 왼쪽 사이드 메뉴, 오른쪽 사이드 메뉴, 내 프로필 등은 항상 함께 작성되어야 한다. n개 포스트를 작성한다고 하면 (상단 메뉴, 오른쪽 사이드 메뉴, 내 프로필) x n 개의 추가 작성이 필요하다.<br/>그러다가 만약 상단 메뉴에 변경이 발생한다면 n개 포스트의 상단 메뉴 수정을 각각 반복 수행해야 할것이다.<br/>이때 레이아웃을 사용한다면 그런 수고를 하지 않아도 된다.

## 기본 사용법

내가 만든 Markdown 문서(포스트)나 HTML 문서에 Jekyll Layout을 적용하려면 아래와 같이 머릿말을 이용해 적용 할 수 있다.

어떤 Markdown 문서에 'basic' 이라는 이름의 layout을 적용하는 방법

```markdown
---
layout: basic
---
여기서부터 포스트 내용입니다.
포스트 내용 1
포스트 내용 2
```

# Minimal-Mistakes Layout

## default

## archive

## home

## single
