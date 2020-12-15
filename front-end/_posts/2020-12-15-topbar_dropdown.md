---
layout: single
title: "Topbar Dropdown Menu"
post-order: 2
date: "2020-12-15 20:07:00 +0900"
last_modified_at: "2020-12-15 23:16:00 +0900"
---
Topbar의 특정 메뉴에 마우스를 갖다대면 그 아래로 하위 메뉴들이 펼쳐지는 드롭다운 메뉴를 만들자.
이때 퍼포먼스를 위해 `CSS`를 활용하고 `Javascript`의 사용을 최소화 한다.

이 포스트의 `Javascript`에서는 `JQuery`를 사용한다. 물론 순수 `Javascript`를 써도 아주 간단한 수준으로 사용되지만
요즘 `JQuery`를 금지할 정도로 퍼포먼스를 요하는 일은 없기 때문에 편의상 `JQuery`를 쓴다.

# 1. 좌측 정렬된 Dropdown Menu

이 Dropdown은 Sub Menu가 좌측으로 정렬되어 있다. 따라서 Sub Menu의 좌측 위치가 부모 메뉴의 좌측과 같은 위치에서 시작하고
Sub Menu의 내용 길이가 길어지면 Sub Menu의 가로 길이가 좌에서 우로 확장된다.

## Sample

<iframe class="width-100-100" style="height: 250px;"
        src="/assets/iframes/topbar_dropdown/topbar_dropdown.html">Topbar Dropdown Sample</iframe>

## Sample Code

# 2. 우측 정렬된 Dropdown Menu

이 Dropdown은 [1. 좌측 정렬된 Dropdown Menu](#1-좌측-정렬된-dropdown-menu)와 반대로 Sub Menu가 우측으로 정렬되어 있다.
따라서 Sub Menu의 우측 위치가 부모 메뉴의 우측과 같은 위치에서 시작하고
Sub Menu의 내용 길이가 길어지면 Sub Menu의 가로 길이가 우에서 좌로 확장된다.

## Sample

<iframe class="width-100-100" style="height: 250px;"
        src="/assets/iframes/topbar_dropdown/topbar_dropdown_right-align.html">Topbar Dropdown Sample</iframe>

## Sample Code
