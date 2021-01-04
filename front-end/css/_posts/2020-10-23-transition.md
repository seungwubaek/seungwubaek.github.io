---
layout: single
title: "CSS Property: transition"
last_modified_at: "2021-01-04 21:15:00 +0900"
---
CSS를 이용해서 HTML의 특정 요소에 애니메이션 효과를 부여할 수 있는 방법 중 하나.<br/>
특정 요소의 CSS 속성이 변화 할 때, 그 변화 과정 전과 후의 사이에 딜레이를 주어서 애니메이션 처럼 보이게 한다.<br/>
[mmistake theme](https://github.com/mmistakes/minimal-mistakes)에서도 이 속성을 통해 애니메이션을 연출하곤 한다.

## Requirement

* HTML tag 읽는법
* CSS 적용법
  * CSS class selection(선택자)

## Example

1개의 HTML과 1개의 CSS 코드를 통해 transition 애니메이션 예를 들어본다.

### HTML

아래와 같이 단순한 html이 있다. 가만히 있을때 `child`는 눈에 보이지 않는다. 그리고 `mother`에 마우스를 가져다 대면 `mother` 밑에서 `child` 가 쏘-옥 나왔다가 마우스를 밖으로 가져가면 다시 쓰-윽 들어간다.

```html
<div class='mother'>
  여기로 마우스를 가져다 대세요!
  <div class='child'>
    까꿍
  </div>
</div>
```

### CSS

위 HTML에 아래와 같은 css를 적용한다. css를 적용하면 처음의 `child`의 `height`는 0이라서 그 내용물이 보이지 않는데, `mother`에 마우스를 가져다 대면(=`hover`) `child`의 `height`가 `1.5em`으로 변하면서 `child`의 내용물이 보이게 된다.

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

### 시연

위의 html과 css를 이용하면 아래 빨간 박스와 같은 효과를 낼 수 있다.<br/>빨간 박스에 마우스를 가져다 대보자.<br/>모바일로 접속했다면 마우스를 움직이는 대신 빨간 박스 안을 터치했다가 다시 밖을 터치하면 된다.

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

### 브라우저 호환성

이 `transition` property의 효과는 다양한 브라우저에서 호환성을 확보하기 위해 추가 CSS 속성 설정이 필요하다.

정확하진 않지만 IE 브라우저 호환을 위해 `transition` 속성을 사용하고 Chrome, Safari 호환을 위해 `-webkit-transition` 속성을 같이 사용해야한다. 속성값은 동일하게 주면 된다. 위 [Example](#example)의 [CSS](#css)에서도 그렇게 했다.

### 올바로 적용되지 않는 `height` 단위

`height` 값을 늘렸다 줄일때 css `height` 값에 `%` 단위를 사용하면 transition이 올바르게 작동하지 않는다! `px`, `em`, `rem`이 정상 작동하는 것은 확인하였다.
