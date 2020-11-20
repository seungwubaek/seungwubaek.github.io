---
layout: single
title: "문제 해결 정리"
post-order: 301
---
이 포스트는 Jekyll 과 Jelyll Theme [minimal-mistakes] 테마에 대한 Trouble Shooting 포스트이다. Jekyll과 mmistakes 테마를 이용하면서 경험했던 문제들을 나열하고 문제들을 해결하기 위해 내가 했던 방법들을 설명한다.

## 웹 페이지의 가로 길이가 멋대로 짧아진다

HTML 요소의 CSS에는 분명 width: 100%가 지정되어 있는데 일정 수준으로 화면 크기를 작게하니 화면 가로 길이가 아래처럼 쪼그라 들었다. Topbar의 가로 길이가 줄어든 것이 한눈에 보인다. 그 밑의 모든 내용들도 가로 길이가 줄어든 상태이다. 이게 무슨일인가.. 아주 난감했다..

![shorter web width than browsers](/assets/images/ETC/Blog/weired_width_what_happen.jpg)

원인은 바로 아래 그림 처럼 영문 텍스트가 `/` 까지 포함해서 아주 긴 한 줄로 인식이 되는 것이었다.<br/>이때 이 긴 한 줄은 웹 페이지의 가로 길이가 부족하다고 해도 자동 줄바꿈이 작동하지 않는다!

![unbreakable word style url](/assets/images/ETC/Blog/weired_width_came_from_en_text.jpg)

원인을 알았으니 해결은 비교적 빠르게 찾을 수 있었다. 자동 줄바꿈 처리를 하는 방법을 찾으면 된다.

이 처리는 CSS로 구현할 수 있다. 아래의 CSS 속성을 적용하면 된다.<br/>
나는 일단 포스트 본문 중 `<a>` 태그에만 적용하였다.

```css
#main .page .page__content {
    a {
        -ms-word-break: break-all;
        word-break: break-all;
    }
}
```

또 `hypens` 속성으로 한 단어를 자동 줄바꿈 할때 이어지는 단어라는 표현을 위해 `-`가 삽입되는 방식도 있는데 이것은 혼란을 더 줄것 같고, `break-all` 외에 `break-word`도 있어서 자동 줄바꿈이 단어 단위로 일어나게 할 수도 있다. 하지만 한 단어가 너무 길다면 또 똑같은 문제의 반복이므로 나는 그냥 `break-all`로 할련다.

그렇게 CSS 스타일을 적용하면 아래와 같이 해결된다.

![breakable word style url](/assets/images/ETC/Blog/weired_width_solved.jpg)

Good Job!

[mmistakes]: https://github.com/mmistakes/minimal-mistakes
