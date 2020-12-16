---
layout: single
title: "Topbar Dropdown Menu"
post-order: 2
date: "2020-12-15 20:07:00 +0900"
last_modified_at: "2020-12-16 17:17:00 +0900"
---
Topbar의 특정 메뉴에 마우스를 갖다대면 그 아래로 하위 메뉴들이 펼쳐지는 드롭다운 메뉴를 만들자.
이때 퍼포먼스를 위해 `CSS`를 활용하고 `Javascript`의 사용을 최소화 한다.
단, 드롭다운 메뉴가 펼쳐질때 애니메이션을 사용하지 않는다.

이 포스트의 `Javascript`에서는 `JQuery`를 사용한다.
물론 순수 `Javascript`를 써도 아주 간단한 수준으로만 사용되지만
요즘 `JQuery`를 금지할 정도로 퍼포먼스를 요하는 일은 없기 때문에 편의상 `JQuery`를 쓴다.

이어서 2가지 형태의 Dropdown Menu들을 보자.

아래 샘플들을 보면 검은색 띠 형태로 Topbar가 있다.
그리고 그 안에는 `ShortMenu`, `LooooooogMenu` 2개의 Main Menu가 있다.<br/>
이 Main Menu들에 마우스를 가져다 대면 `hover` 이벤트가 발생하고 마우스가 위치한 Main Menu 아래로
Sub Menu 리스트가 펼쳐진다.<br/>
마지막으로 특정 Sub Menu에 마우스를 가져다대면 Sub Menu의 바탕색이 회색으로 변해서
사용자에게 현재 마우스가 위치한 곳을 명확히 알려준다.

# 1. 좌측 정렬된 Dropdown Menu

이 Dropdown 샘플은 Topbar 안에 Main Menu가 좌측으로 정렬 되어있다.
그리고 Sub Menu가 길어져서 좌측 화면 밖으로 벗어나는 것을 막기 위해 Sub Menu도 부모 기준으로 좌측 정렬되어 있다.<br/>
즉, Sub Menu의 좌측 위치가 부모 메뉴의 좌측과 같은 위치에서 시작하고
Sub Menu의 내용이 길어지면 Sub Menu의 가로 길이가 좌에서 우로 확장된다.

## Sample

<iframe class="width-100-100" style="height: 250px;"
        src="/assets/iframes/topbar_dropdown/topbar_dropdown.html">Topbar Dropdown Sample</iframe>

## 구현 설명

코드가 길고 설명이 많지만 그 내용은 별로 어렵지 않으므로 글을 읽는 따분함만 좀 견뎌낸다면
금방 핵심을 이해하고 응용할 수 있을 것이다.

### HTML 구현

Topbar와 Dropdown 메뉴의 HTML 구조는 아래와 같다.

![HTML Structure of Dropdown Menu]({{ site.gdrive_url_prefix }}1Yi0HlVUyFczvq97kMcNzJ-Fjl5jsJrLR){: class="align-center"}

```html
<ul class='main-menus'>
  <li class='main-menu-item'>
    <a class='menu-title'>ShortMenu</a>
    <ul class='sub-menus'>
      <li class='sub-menu-item'><a class='menu-title'>Sub Menu</a></li>
      <li class='sub-menu-item'><a class='menu-title'>Looong Sub Menu</a></li>
    </ul>
  </li>
  <li class='main-menu-item'>
    <a class='menu-title'>LooooooogMenu</a>
    <ul class='sub-menus'>
      <li class='sub-menu-item'><a class='menu-title'>Sub Menu 1</a></li>
      <li class='sub-menu-item'><a class='menu-title'>Hello World !</a></li>
    </ul>
  </li>
</ul>
```

### CSS 구현

그리고 아래와 같은 CSS를 적용한다. Dropdown 기능 구현을 위한 부분만 설명하고
나머지 CSS 설정은 밑에서 [전체 코드](#sample-code)로 싣도록 하겠다.

```css
.main-menu-item {
  position: relative;
}
.main-menu-item:hover {
  color: black;
  background-color: white;
}
.sub-menus {
  position: absolute;
  left: -9999px;
  margin-left: -1;
}
.main-menu-item:hover .sub-menus {
  left: 0;
}
.sub-menu-item:hover {
  background-color: #ccc;
}
```

* Line 1~3: 메인 메뉴 요소에 대한 CSS<br/>
  여기에 `position: relative`를 설정해두는 이유는 하위 요소에 `position: absolute`를 부여했을때
  그 요소의 offset 속성 `top`, `left`, `right`, `bottom`이 상위 요소 중 `position: relative`를
  가지고 있는 요소를 기준으로 계산 되기 때문이다.

* Line 4~7<br/>
  마우스가 해당 요소에 `hover` 하면 흑백을 반전시킨다.

* Line 8~9: 하위 메뉴에 대한 CSS<br/>
  `position: absolute`가 있으므로 이 요소는 부모 요소의 바깥으로 튀어 나갈수 있다.
  또한 자신보다 상위 요소 중 `position: relative` 속성을 가진 요소를 기준으로 offset이 결정된다.

* Line 10<br/>
  하위 메뉴는 평소에 보이지 않게 하기 위해 화면 왼쪽 바깥에 둔다.
  `left: -9999px` 또는 `height: 0` 속성으로도 같은 효과를 낼수 있는데 `left: -9999px`가 성능면에서 더 좋다고 한다.

* Line 11<br/>
  하위 메뉴가 border 1px를 가지므로 그만큼 마이너스(-) margin을 주어서 위치를 조절한다.

* Line 13~15<br/>
  마우스 `hover`가 일어나면 Line 10에서 설정했던 `left: -9999px`를 `left: 0`로 바꿔준다.
  그러면 하위 메뉴의 `left` 위치 값이 `0` 위치로 이동한다.<br/>
  이때 Line 2의 `position: relative`에 의해 부모의 왼쪽 면이 `left: 0`에 해당하는 위치로 연산되고
  하위 메뉴가 부모의 왼쪽 면으로 정렬된다.

* Line 16~18<br/>
  하위 메뉴의 아이템에 마우스가 `hover` 하면 회색으로 바탕색을 변경해준다.

### Javascript 구현

마지막으로 아래의 Javascript 코드를 실행한다.

```javascript
var $allMainMenuItem = $('.main-menu-item');
$allMainMenuItem.each(function(idx, elem){
  var $mainMenuItem = $(this);
  var $subMenus = $($mainMenuItem.children('.sub-menus'));
  var mainMenuWidth = $mainMenuItem.width();
  var subMenuWidth = $subMenus.width();
  if(mainMenuWidth > subMenuWidth) {
    $subMenus.width(mainMenuWidth);
  }
});
```

## Sample Code

아래는 Topbar에서부터 Dropdown Menu를 구현하는 전체 코드이다.

# 2. 우측 정렬된 Dropdown Menu

이 Dropdown 샘플은 [1. 좌측 정렬된 Dropdown Menu](#1-좌측-정렬된-dropdown-menu)와 반대로
Main Menu가 우측 정렬 되어 있다.
그리고 Sub Menu가 길어져서 우측 화면 밖으로 벗어나는 것을 막기 위해 Sub Menu도 부모 기준으로 우측 정렬되어 있다.<br/>
즉, Sub Menu의 우측 위치가 부모 메뉴의 우측과 같은 위치에서 시작하고
Sub Menu의 내용이 길어지면 Sub Menu의 가로 길이가 우에서 좌로 확장된다.

## Sample

<iframe class="width-100-100" style="height: 250px;"
        src="/assets/iframes/topbar_dropdown/topbar_dropdown_right-align.html">Topbar Dropdown Sample</iframe>

## Sample Code
