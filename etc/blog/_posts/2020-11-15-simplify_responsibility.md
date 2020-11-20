---
layout: single
title: "[Git Page로 Blog 만들기] - [4] 반응형 웹 단순화 하기"
post-order: 4
---
애니메이션 적용, 요소 사이즈 결정 등의 작업을 더 직관적으로 파악하기 위해 반응형 웹의 폰트 사이즈 변화를 단순화하자. 폰트 사이즈에 대한 비율(`em` 등)에 의존적인 각 요소의 크기 변화를 단순화 할 수 있다.

이 포스트의 내용은 해도 되고 안해도 된다. 폰트 사이즈의 잦은 변화가 부담스러울 경우에만 적용하면 된다!

# 폰트 사이즈 변화의 문제점

mmistakes 테마는 웹 브라우저의 사이즈의 변화에 따라서 웹 화면 구성 요소들의 사이즈가 함께 변화한다(=반응형 웹). 그 중 폰트 사이즈는 데스크톱/테블릿/모바일 3종류로 변화가 세분화 되어있다. 그리고 다른 구성 요소의 사이즈도 폰트 사이즈 크기에 의존적으로 변화한다(폰트 사이즈의 1.3배 등).<br/>
그런데 폰트 사이즈 변화 마다 애니메이션이 적용되어 있어서 글자가 많은 화면의 경우는 컴퓨터 사양에따라 렉이 걸리기도 한다.<br/>
또 각 폰트 사이즈에 비례해서 변화하는 다른 구성 요소들의 크기, padding, margin 등 style을 제대로 파악하고 구현하기에는 고려해야할 사항이 많고 복잡하다.

따라서 폰트 사이즈를 고정하고 반응형 웹의 작동을 단순화 하도록 한다.

## CSS 수정하기

`/_sass/minimal-mistakes/_reset.scss` 경로의 파일을 열어보면 아래와 같은 코드를 볼 수 있다.

![mmistakes responsive font-size css]({{ site.gdrive_url_prefix }}1DMHnYMX2wAi7NroJGSYMOj1BwOLAqo97)

한눈에 보이겠지만, SASS를 이용한 함수 코드가 보인다. `@include`로 시작하는 코드가 3군데가 있다. 3개의 코드는 브라우저 화면 사이즈(`$small`, `$large`, `$x-large`)에 따라 `font-size`를 변화시킨다.

```sass
@include breakpoint($small) {
    font-size: 18px;
}

@include breakpoint($large) {
    font-size: 20px;
}

@include breakpoint($x-large) {
    font-size: 22px;
}
```

바로 이 세개 함수를 주석 처리하자. 그러면 더이상 웹브라우저 사이즈에 따라 `font-size`가 변화하지 않게된다. 대신 위 3개 함수 위에 `font-size: 16px;`로 설정한 값이 모든 html 요소에 적용된다.
