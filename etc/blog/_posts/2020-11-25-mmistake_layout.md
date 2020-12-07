---
layout: single
title: "[Git Page로 Blog 만들기] - [9] Minimal-Mistakes Layout 소개"
post-order: 9
date: "2020-11-25 00:01:00 +0900"
last_modified_at: "2020-11-26 00:02:01 +0900"
---
Jekyll Theme [Minimal-Mistakes](https://github.com/mmistakes/minimal-mistakes)에서 구현한 Layout은 무엇이 있는지 간략히 살펴보자.
이 과정을 통해 테마에서 사용하는 주요한 Layout의 구조를 이해하고 Custom 할 때 도움이 되었으면 좋겠다.
<span class="md-monologue">주요한 Layout이라기 보단 내가 사용한 Layout 위주이다...</span>

## Requirement

* Jekyll Layout<br/>
    Jekyll Layout에 대한 이해가 필요하다면 Jekyll 카테고리에서 "[[Layout] Jekyll Layout 이란]({{ site.base_url }}/front-end/jekyll/jekyll_layout/)" 포스트를 참조하자.

* Jekyll Include<br/>
    [Jekyll 공식 사이트](https://jekyllrb.com/)의 [한국어 번역 사이트](https://jekyllrb-ko.github.io/)를 보면 Jekyll Include를 '조각파일'이라고 번역하였다.
    매우 적절한 표현이므로 그대로 사용한다.<br/>
    조각 파일이 무엇인지 궁금하다면 Jekyll 공식 사이트의 한국어 번역 사이트에서 [이곳](https://jekyllrb-ko.github.io/docs/includes/)을 읽어보자.
    아주 잘 설명 돼 있다.

# Minimal-Mistakes Layout

## default

Layout `default`는 전체 HTML 태그를 만드는 가장 바깥의 Layout이다.

* 첫번째로 `<head>`에서 `seo`, `css`, `javascript` 들을 로드한다.
* 내용물 `{% raw %}{{ content }}{% endraw %}` 삽입 전, `masthead`[^masthead]라고 부르는 Topbar를 로드한다.<br/>
  내가 mmistakes 테마를 사용할 시점의 `masthead`는 내 블로그의 Topbar 보다 높이가 더 길고, Dropdown 메뉴도 지원하지 않았다.
  그래서 나는 내가 원하는 대로 약간 Custom 하였다.
  <span class="md-monologue">Dropdown Menu 를 직접 만들어보고 싶다는 욕구도 이 테마를 선택한 이유 중 하나이다.</span>😀
* 내용물 `{% raw %}{{ content }}{% endraw %}` 를 삽입 한다.
* 내용물 `{% raw %}{{ content }}{% endraw %}` 삽입 후, 바닥 HTML(`footer.html`)과 `javascript`를 로드한다.

이때 나는 `footer.html`를 주석 처리해서 제거하고 제거된 내용 중 일부를 sidebar로 옮겼다.<br/>
나는 footer가 차지하는 공간의 넓이에 비해 그 역할이 크지 않다고 생각했다.<br/>
<span class="md-monologue">footer에 들어가는 것은 MIT license의 CopyRight, Social Link, RSS 정도가 끝이다.</span>

![Minimal-Mistakes Layout default]({{ site.gdrive_url_prefix }}13IswcBlDQ4MLJreRSLv14Jh307q4VW_K)

## archive

Layout `archive`는 Layout `default`를 Layout으로 갖는 Layout이다.
<span class="md-monologue">내가 그린 기린 그림 같아서 재밌군.</span><br/>
그림으로 표현하면 아래와 같다.

![Minimal-Mistakes Layout archive]({{ site.gdrive_url_prefix }}1lX4GrWWo4p_RqHbJVzZEdK4IfvWPg5YE){: class="align-center"}

* Header Image<br/>
  `archive`에는 상단에 사이트 전체화면을 관통하는 Image와 Header를 넣을 수도 있다.
  <span class="md-monologue">나는 '내용 중심의 포스트' 철학에 어긋나는 것 같아, 사용하진 않는다.</span>
* Breadcrumb<br/>
  Breadcrumb이 이곳에 포함된다.
* Sidebar<br/>
  머리말에서 `sidebar` 값을 설정하면 메뉴 리스트와 내 프로필이 나타나도록 만들 수 있다.<br/>
  단, 메뉴 리스트를 나오게 하려면 문서 마다 머리말에 `sidebar.nav` 변수를 수동으로 입력해야한다.
  페이지 마다 메뉴가 다르다면 유용하지만 나는 메뉴 리스트에 블로그 카테고리 목차가 들어간다.
  그래서 어떤 페이지이든 동일한 내용이 반복된다. 그래서 중복 코딩 작업을 줄이고자 개인적으로 조금 손봤다.
* Title<br/>
  그리고 머리말에 작성한 `title`이 이곳에 로드된다.

그다음 마지막으로 `{% raw %}{{ content }}{% endraw %}`가 들어간다.

## home

Layout `home`은 최상위 경로의 `/index.html`에서 사용하는 Layout 이며, Layout `archive`를 Layout으로 갖는다.

`/index.html`의 Layout으로 사용된다는 말은 블로그 대문 페이지로 들어왔을 때 처음으로 보여지는 Layout이라는 의미이다.

그래서 이곳에는 '최근 포스트'를 보여주는 리스트형 게시판이 있다.

팁을 하나 주자면, 오른쪽 사이드에 페이지 목차를 생성하는 공간이 있는데 대문 페이지에서는 이 페이지 목차가 필요하지 않을 가능성이 높다.
그럴 경우 아래와 같이 머리말에 변수를 하나 추가해서 오른쪽 페이지 목차를 Off 시킬수 있다.

```markdown
---
classes: wide
---
```

`home` 또한 Layout 이므로 '최근 포스트' 요소 위에 `{% raw %}{{ content }}{% endraw %}` 가 위치해 있는데,
여기서 더이상 연결된 것은 없으므로 내용 추가를 위해 custom이 필요하다.

## single

포스트의 Layout이다. 아주 많은 기능들이 이 Layout에 포함 되어있다. Layout `archive` 처럼 Layout `default`를 상위 Layout으로 갖는다.

지금 보고있는 포스트의 Layout이 바로 `single` 이다.

![Minimal-Mistakes Layout single]({{ site.gdrive_url_prefix }}1N7kQMAK3G0ep7T0o74PuzBr-yAi6iYOA)

* Header Image<br/>
  Layout `archive`와 동일하게 상단에 사이트 전체화면을 관통하는 Image와 Header를 넣을 수 있다.
  <span class="md-monologue">나는 이것도 사용하지 않는다.</span>
* Breadcrumb<br/>
  Layout `archive`와 동일하다.
* Sidebar<br/>
  Layout `archive`와 동일하다.
* SEO<br/>
  `title`(타이틀), `description`(설명), `published_date`(날짜) 등 포스트 고유의 `<meta>` 태그가 추가된다.
* Title<br/>
  Header Image를 사용하지 않는다면 `<h1>` 태그로 포스트의 `title`이 자동으로 생성된다.
* Content<br/>
  비로소 포스트의 내용이 되는 `{% raw %}{{ content }}{% endraw %}` 가 삽입된다.<br/>
  주로 Markdown 파일 형식으로 만든 포스트 파일의 내용이 이곳에 들어가게 된다.
* Category<br/>
  현재 포스트가 속해있는 Category 들을 보여준다.
* Date<br/>
  포스팅 날짜를 보여준다.
* Share<br/>
  포스트를 Social 이곳 저곳에 공유 할 수 있게 Link를 제공한다.
* Pagination<br/>
  목차로 돌아갈 필요없이 Previous(이전)/Next(다음) 포스트로 곧장 넘어갈 수 있는 버튼을 제공한다.
  그러나 포스트 순서가 기본적으로 날짜 기준으로 정렬 돼 있어서 원치 않는 포스트로 이어질수 있다.
  따라서 다음 포스트가 무엇인지 수동으로 지정해 주어야만 한다.
* Comment<br/>
  댓글 기능이다. 댓글 기능을 지원하는 Vendor에 맞게 별도로 설정해야 사용 가능하다.
* Related Post<br/>
  관련 포스트를 나열해준다. 어떤 기준으로 나열하는 건지 모르겠지만 정말로 관련성이 있는 포스트를 보여주는 기능은 아닌것 같다.
  <span class="md-monologue">에이... Deeplearning Recommendation Engine 정도 기대했는데...ㅋ</span>

---

[^masthead]: masthead: 돛대의 꼭대기, 신문 1면의 발행사 이름을 의미한다. 즉, Topbar와 크게 다르지 않은 의미이다.