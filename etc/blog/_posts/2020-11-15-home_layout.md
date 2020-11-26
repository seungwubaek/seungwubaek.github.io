---
layout: single
title: "[Git Page로 Blog 만들기] - [3] 대문 페이지 만들기"
post-order: 3
---
블로그의 대문 페이지를 만들어보자. 이 포스트에서는 Jekyll의 url 부여 방식에 대해 익히고, 대문 페이지에 나의 최근 포스트들을 나열해주는 화면이 나오게 할 것이다.<br/>
mmistakes 테마를 사용했다면 이미 그렇게 나오도록 세팅되어 있다. mmistakes 테마를 적용했다는 가정하에 진행하므로 이번 블로그는 개념 정리를 위해 그냥 읽기만 하면된다.

# index.html

[이전 포스트]({{ site.base_url }}/etc/blog/mmistakes_config/)에서 다뤘던 `_config.yml`을 보면 mmistakes 테마에의해 모든 페이지의 URL을 `[카테고리명]/[페이지 타이틀명]` 구조로 생성하게끔 되어있다. (`permalink` 키로 변경 가능. URL 규칙에 관한 추가 설명은 [http://jekyllrb-ko.github.io/docs/permalinks/](http://jekyllrb-ko.github.io/docs/permalinks/) 참조)

인터넷 상의 어떤 유저가 내 블로그의 홈 화면으로 가려고 한다면 `https://[내 블로그 URL]` 또는 `https://[내 블로그 URL]/` 라고 입력해서 접속 할 것이다. 두 url 모두 url의 끝에 `/`가 붙어있다(`/`를 생략할경우에도 끝에 `/`가 붙은것과 같다).

서버가 이런 URL을 요청 받은 경우 내 블로그의 기본 URL을 제거했을때 뒤에 남은 URL을 디렉토리 경로를 따라가듯 들어가서 별도 설정이 없는한 항상 그곳에 있는 `index.html` 파일을 제공한다.

## 예

### 1. 내 블로그 URL 요청

`https://[내 블로그 URL]/` 경로의 페이지를 요청하면 서버는 블로그의 페이지 중 어떤 페이지를 유저에게 제공해 줄까?<br/>
바로, 블로그 페이지들의 계층 구조에서 최상위 `/` 경로에 있는 `/index.html` 페이지를 제공한다.

### 2. 내 블로그의 특정 카테고리 URL 요청

같은 맥락으로 `https://[내 블로그 URL]/etc/blog/`라고 입력해서 내 블로그의 특정 카테고리 페이지를 요청하면 서버는 유저에게 어떤 페이지를 제공해 줄까?<br/>
`/etc/blog/index.html` 페이지를 제공한다.

### 3. 내 블로그의 특정 포스트 URL 요청

또 현재 포스트의 URL 처럼 `https://[내 블로그 URL]/etc/blog/home_layout/`를 입력해서 특정 포스트의 페이지를 요청하면 어떤 페이지를 제공해줄까?<br/>
다른 예들과 마찬가지로 `/etc/blog/home_layout/index.html` 페이지를 제공한다.

## Jekyll build

Jekyll은 우리가 작성한 liquid html, markdown 문서들로 부터 빌드한 HTML 문서들을 `/_site` 경로 아래에 저장한다. 사용자들에게 보여주는 페이지는 `/_site` 디렉토리 아래에 있는 HTML 문서들이다. 그곳에 보면 `permalink` 설정값에 의해서 각 endpoint 페이지들이 `index.html`로 끝나는 것을 볼 수 있다.<br/>
단 `/_site` 디렉토리는 Git 원격 저장소에는 업로드 하지 않는다. `/.gitignore` 파일에 `/_site` 디렉토리를 무시하도록 설정했는지 확인하자.

# 레이아웃 적용하기

우리는 대문 페이지를 작성하기 위해 최상위 경로에 `/index.html`을 만들 것이다. mmistakes 테마에 의해 이미 만들어진 `/index.html`이 존재할텐데 그래도 어떻게 만드는지 확인하고 가자.<br/>
그리고 반드시 front-matter (머리말)를 붙여야 Jekyll이 해당 파일을 블로그 페이지로 인식한다는 것을 기억하자.

`/index.html` 파일을 열고 그곳에 아래와 같이 작성해보자.

```html
---
layout: home
---
```

이것은 index.html 에 아무 내용 없이 `home`이라는 레이아웃 html을 사용하겠다는 의미다.

`/index.html`에는 아무 내용이 없지만 원래 layout은 아래 그림처럼 다양한 레이아웃을 미리 만들어놓고 내용을 끼워 넣는 방식으로 동일 HTML 구조를 재사용 해야할때 용이하다.

![same contents different layouts]({{ site.gdrive_url_prefix }}1yhLz-54gzofEghboheErvMAt3zCFPoTR)

같은 layout을 유지하면서 contents만 바꿔쓰는 방법도 가능하다. 내 블로그도 이를 이용해서 모든 포스트 내용(contents)이 같은 layout 하나에 들어간다.

![different contents same layouts]({{ site.gdrive_url_prefix }}1LpHiAN6UqcETQdU4TRzvgVbYTd7NnZRG)

`home` 레이아웃에는 최근 포스트를 보여주는 liquid 코드로 작성한 html이 포함되어 있다. 더 자세한 화면 구성은 `/_layouts/home.html` 파일을 참고하자.

대문 페이지 `/index.html`에 front-matter가 있고 `home` 레이아웃이 적용 돼 있으므로 Jekyll은 `index.html`을 올바른 빌드 파일로 인식하고 `home` 레이아웃에 작성된 코드대로 HTML을 빌드한다(`index.md` 마크다운 확장자 파일로 작성해도 `index.html`로 변환해준다.).

여기까지 했다면 [처음 포스트]({{ site.base_url}}/etc/blog/post_1/#7-블로그-테스트)에서 설명했던 테스트 방법으로 블로그를 실행시켜 보자.

대문 페이지가 타나날 것이다.
