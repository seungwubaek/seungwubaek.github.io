---
layout: single
title: "[Git Page Jekyll Blog 만들기] - [2] Jekyll과 mmistakes의 config"
post-order: 2
date: "2020-11-14 00:00:00 +0900"
last_modified_at: "2020-11-17 15:02:00"
---
Jekyll config의 주요 값들을 소개한다. 포스트를 보고 해당 값들을 내 입맛에 맞게 변경해보자.<br/>
Jekyll 서버는 작동할 때 yaml 형식의 `_config.yml` 파일을 읽어들인다. 그리고 Jekyll과 Jekyll [minimal-mistakes][mmistakes] 테마는 config 값에 따라 약속되어 있는 작업들을 수행하고 서버의 기능이나 화면 구성을 변화시킨다. 그외에도 사용자 설정값을 얼마든지 마음대로 정의할 수도 있다.

# _config.yml

최상위 경로의 `/_config.yml` 파일을 이용해서 여러가지 설정값을 변경할 수 있다. 여기서 변경한 설정값은 모든 페이지에서 liquid 문법을 이용해 불러 사용할 수 있다.

따라서 mmistakes도 미리 많은 변수들을 설정값으로 등록해 놓고 사용자에 따라 다양한 custom을 할 수 있게 테마를 구현해 놓았다.

## 주의사항

테스트로 서버를 실행하는 중에는 `_config.yml` 값의 변경이 반영되지 않는다. 그러므로 값 변경 후에는 서버를 재시작 해줘야만 한다.

## 주요 설정값 소개

주요한 설정값들을 소개해 본다. `_config.yml`에 들어가서 찾기 기능으로 아래 키워드들을 검색하면 금방 찾아서 확인 해볼 수 있다.

### 블로그 기본정보

블로그 기본 정보들을 설정해보자.

* locale<br/>
  블로그의 UI 언어를 설정할 수 있다. 한글도 있다 😮 "ko"로 설정하면 한글 UI가 적용된다.
  나는 블로그 언어도 customize 할 예정이라 지금은 기본 "en-US"로 설정해두고 나중에 적용할것이다.<br/>
  UI의 언어 변환 작동 방법은 Jekyll이 HTML 파일을 생성할때 liquid를 이용해서 `/_data/ui-text.yml` 경로의 파일을 읽고 언어에 맞는 값을 HTML에 넣는 방법으로 작동한다.
  해당 파일을 열어보면 언어 별로 다양한 UI (키, 값) 쌍들이 저장돼 있다.

* title<br/>
  내 블로그 명칭을 지정할수 있다. 명칭을 지정하면 Topbar의 왼쪽 상단에 출력된다. 블로그 만들기에서 내가 가장 처음 조작했던 작업이다!

* name<br/>
  내 이름을 지정한다. 작성자 프로필과 화면 아래의 저작권 표시등에 출력된다.

* description<br/>
  HTML `<head>`에 실리는 내 블로그 소개 문구. [5번째 포스트]({{ page.baseurl }}/etc/blog/seo_robots)에서 다룰 SEO 기능에서 사용하는 중요한 값이다. 내 블로그의 정체성을 분명히 표현하면서 핵심이 되는 키워드가 들어가도록 작성하자.

* repository<br/>
  liquid 문법에 의해 사용되는 전역변수 중 하나로 생각하면 되는데, 테스트 해본 결과 full url을 다 써줘야 정상적으로 연결이 되었다. 블로그의 특정 포스트 등에서 `{% raw %}{{ site.repository }}{% endraw %}`라고 입력하여 url 값을 가져올 수 있다.

* logo<br/>
  블로그 왼쪽 상단에 `title`과 함께 나타난다. 브라우저의 탭에도 나타난다. 내 블로그를 표현하는 기호라 생각하면 좋다. 그래서 나도 멋진걸로 하나 만들었다. ㅋㅋㅋ 의미가 궁금하다면 [About]({{ site.baseurl }}/about/) 페이지에서 그 의미를 확인할 수 있다.

* comments<br/>
  내 블로그 포스트에서 댓글 기능을 사용할수 있게 하는 설정이다. 이 값 외에도 실제 포스트에서 `comments: true`를 설정해 주어야 해당 포스트에서 댓글 기능이 활성화 된다(당연히 자동화 하는 방법 있음). 또 댓글들을 보관하는 서버가 있을텐데 그런 서비스 업체도 여러군데가 있기 때문에 관련된 설정도 해야한다. 댓글 기능의 구현에 관해서는 후에 따로 자세히 포스팅 할 예정이다.

### analytics

내 블로그의 방문자 분석을 지원해주는 서비스를 연결할 수 있다. 나는 구글 Analytics를 사용하고 있다. 이 내용은 나중에 따로 포스팅 하겠다.

### author

자기소개에 해당하는 내용들이 있다. 여기 채워지는 내 정보들은 데스크톱일 경우 왼쪽 사이드바에, 모바일일 경우 화면 상단에 나타난다.<br/>
내 이름과 사진, 설명 등이 있고 나와 관련된 링크들을 추가할 수 있다.<br/>
나는 링크로 메일, Github, Instagram을 등록했다. `url` 값을 채워야만 등록된다.

### footer

`author` 설정값에 있던것과 같은 링크들을 추가 할 수 있다. 작성방법은 똑같지만 나는 footer를 화면 구조에서 아예 삭제했으므로 설정 의미가 없다.

### defaults

[Jekyll Tutorial](http://jekyllrb-ko.github.io/docs/step-by-step/01-setup/)을 공부했다면 이 [값](http://jekyllrb-ko.github.io/docs/configuration/front-matter-defaults/)에 관해 알고 있을 것이다. 이 설정을 이용해서 댓글 기능을 모든 포스트에서 활성화 하는 방법 등을 조절/자동화 할 수 있다. Jekyll Tutorial을 공부하지 않았다면.. 나중을 위해서라도 보는게 좋을것이다.<br/>
이처럼 `_config.yml`은 jekyll의 설정값들이 들어있는 곳이기도 하다.

### footer_scripts

어느날 나만의 javascript를 추가하고 싶다면? 이곳에 내 자바스크립트가 위치한 경로를 입력하자. 나의 경우는 `/assets/js/customs.js` 파일이 등록 돼있다.<br/>
여기에 설정한 값은 Jekyll이 HTML을 생성할때 Liquid를 이용해서 설정된 경로에 있는 javascript를 HTML 문서 하단에 등록한다.

 [mmistakes]: https://github.com/mmistakes/minimal-mistakes
