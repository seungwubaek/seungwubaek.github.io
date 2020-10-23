---
layout: posts
---
# Git Page를 이용한 Blog 만들기

## CSS Transition

CSS를 이용해서 HTML의 특정 요소에 애니메이션 효과를 부여할 수 있는 방법 중 하나.

특정 요소의 CSS 속성이 변화 할 때, 그 변화 과정 전과 후의 사이에 딜레이를 주어서 애니메이션 처럼 보이게 한다.

[mmistake theme](https://github.com/mmistakes/minimal-mistakes)에서는 주로 이 속성을 통해 애니메이션을 연출한다.

## Example

1개의 HTML과 1개의 CSS 코드를 통해 Transition 예를 들어본다.

### HTML

아래와 같이 단순한 html이 있다고 할 때 `mother`에 마우스를 가져다 대면 `mother` 밑에서 `child` 가 나왔다가 마우스를 밖으로 가져가면 다시 들어가는 애니메이션을 연출하는 예제를 만들어본다.

```html
<div class='mother'>
    여기로 마우스를 가져다 대세요!
    <div class='child'>
        까꿍
    </div>
</div>
```

여기에 아래와 같은 css를 적용한다.

아래 css를 적용하면 처음의 `child`의 `height`는 0이라서 그 내용물이 보이지 않는데, `mother`에 마우스를 가져다 대면(=`hover`) `child`의 `height`가 `1.5em`으로 변하면서 `child`의 내용물이 보이게 된다.

```css
.child {
    height: 0px;
    overflow-y: hidden;

    transition: height 1s ease-in-out;
    -webkit-transition: height 1s ease-in-out;
}
.mother {
    width: 200px;
}
.mother:hover {
    background-color: red;
    .child {
        height: 1.5em;
        
        transition: height 1s ease-in-out;
        -webkit-transition: height 1s ease-in-out;
    }
}
```

위의 html과 css를 이용하면 아래 빨간 박스와 같은 효과를 낼수 있다.<br/>빨간 박스에 마우스를 가져다 대보자.

<html>
    <head>
        <style>
            .mother { text-align: center; }
            .child {
                height: 0px;
                overflow-y: hidden;
                transition: height 0.5s ease-in-out;
                -webkit-transition: height 0.5s ease-in-out;
            }
            .mother:hover .child {
                height: 1.5em;
                transition: height 0.5s ease-in-out;
                -webkit-transition: height 0.5s ease-in-out;
            }
        </style>
    </head>
    <body>
        <div style='border: 1px solid red;'>
        <div class='mother'>여기로 마우스를 가져다 대세요!
            <div class='child'>까꿍</div>
        </div>
        </div>
    </body>
</html>

## 주의

### 올바로 적용되지 않는 `height` 단위

위 [Example](#example)처럼 `height` 값을 늘렸다 줄이는 transition은, css에서 `height` 값을 지정할 때 `%` 단위를 사용하면 애니메이션이 올바르게 작동하지 않는다! `px`, `em`, `rem`이 정상 작동하는 것까지 확인함.

#### 해결 방법

결국, CSS 만으로 이 문제를 해결하는 방법은 찾지 못했다... OTL.. 그래서 하는수없이 Javascript를 사용했다.<br/>
아래에 요약 설명이 있지만 이해가 어렵다면 코드를 직접 보는것이 더 빠를수도 있다. [여기]({{ site.repository | append: '/tree/master/assets/js/customs.js' }})에서 `Sidebar Sub Menus dropdown animaion`라는 주석 부분부터 보면 된다.

0. 아래는 모두 JS를 사용했다.

1. 각 메뉴에 ID 부여

    내 사이드바는 큰 주제가 하나의 `<ul>` 태그로 되어 있으므로 각 태그에 Incremental ID를 부여한다.

2. 각 메뉴가 가진 서브메뉴 개수에 비례하는 `height` 파악

    항목1과 동시에 각 `<ul>` 태그가 가진 하위 항목의 개수를 파악했다. 이 항목 개수가 많은 태스는 그 양에 비례하게 태그의 `height`가 더 길어야 하기 때문이다.

3. 각 ID에 대응하는 `height`를 css로 적용

    `ID` 부여와 `ID`에 대응하는 `height` 측정이 완료되면, `<head>` 태그 안에 `<style>` 태그를 하나 만들어서 넣는다.
