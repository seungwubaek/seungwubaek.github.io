---
layout: single
title: "[Git Page로 Blog 만들기] - [4] 반응형 웹 단순화 하기"
post-order: 4
---

폰트 사이즈 변화를 단순화해서 각 요소의 크기를 비율 위주에서 px 값 위주로 변경하자. 그렇게 하는것이 애니메이션 적용, 요소 사이즈 결정 등의 작업을 더 직관적으로 파악하고 쉽게 접근할 수 있게한다.

이 포스트의 내용은 해도 되고 안해도 된다. 폰트 사이즈의 잦은 변화가 부담스러울 경우에만 적용하면 된다!

mmistakes 테마는 웹 브라우저의 사이즈에 따라서 블로그 구성 요소들이 반응형으로 작동한다. 그런데 데스크톱/테블릿/모바일 3종류 장비에서 각각 서로 다른 style을 구현하기에는 고려해야할 사항이 많고 복잡하다.<br/>
특히, 웹 화면 사이즈에따라 폰트 크기가 변화하는 것 때문에 폰트 크기에 의존해서 사이즈가 결정되는 다른 요소들의 변화를 함께 파악하기가 쉽지 않다.

따라서 폰트 사이즈를 고정하고 반응형 웹의 작동을 단순화 하도록 한다.

`/_sass/minimal-mistakes/_reset.scss` 경로의 파일을 열어보면 아래와 같은 코드를 볼 수 있다.

![]({{ page.gdrive_url_prefix }}1DMHnYMX2wAi7NroJGSYMOj1BwOLAqo97)

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
