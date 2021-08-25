---
layout: single
title: "[Git Page Jekyll Blog] - [16] 포스트 공유하기: Copy URL"
post-order: 16
date: "2021-08-25 14:06:00 +0900"
last_modified_at: "2021-08-25 14:06:00 +0900"
---
이 포스트에서는 해당하는 포스트를 공유하기 위해 클립보드에 포스트 URL을 복사하는 방법에 대해 알아본다.

내 블로그의 포스트 페이지 구조에서는 페이지의 상단과 하단의 <strong>Share on</strong> 섹션에서 공유 기능을 제공하고 있다.<br/>
<strong>Share on</strong> 섹션에는 포스팅 날짜 기준으로 5가지 공유 버튼이 존재하며 버튼을 클릭했을때 각각의 공유 기능이 수행된다.<br/>
`Copy URL`, `Kakao`, `Facebook`, `Twitter`, `Linkedin` 이들이 공유 버튼에 해당하며 이름에서 유추할 수 있듯이
URL을 복사하거나 각 플랫폼에 공유할 수 있다.

내 블로그 소스 중 <https://github.com/seungwubaek/seungwubaek.github.io/blob/master/_includes/social-share.html>을
보면 공유 버튼을 클릭했을때 어떤 기능이 수행되는지 얼추 확인해 볼 수 있다.

<a class="btn btn--clipboard" id="shareon-clipboard" title="Copy URL to Clipboard" data-clipboard-text="{{ site.url }}{{ page.url }}">
  <i class="fas fa-fw fa-link" aria-hidden="true"></i>
  <span> Copy URL</span>
</a>
방식의 공유는 버튼을 클릭했을때 페이지의 URL 값을 클립보드에 저장하는 방식의 공유방법이다.<br/>
그 후 URL이 클립보드에 성공적으로 저장되면 URL이 클립보드에 저장되었다는 사실을 유저에게 알리기 위해 메시지 팝업을 띄운다.
이 메시지 팝업은 공유 기능 구현과 별개의 작업이므로 본 포스트에서는 다루지 않는다.

## 1. clipboard.js 플러그인 사용하기

클라이언트가 버튼을 클릭한 순간, 클라이언트의 클립보드를 제어하기 위해서 `clipboard.js` 라는 Javascript 플러그인의
도움을 받을 것이다. 이 플러그인과 커스텀 Javascript만 있으면 클립보드를 제어 할 수 있다.

### clipboard.js 다운로드

<https://clipboardjs.com/>에 접속하면 `download a ZIP` 링크가 있다. 링크를 클릭해서 다운로드 하자.<br/>
내 블로그에서는 모든 js 플러그인들을 `/assets/js/plugins` 디렉터리 하위에서 관리하고 있으므로 다운로드한 플러그인을
`/assets/js/plugins/clipboard.js` 경로에 위치시켰다.

다운로드한 스크립트는 최종적으로 클라이언트가 URL을 통해 접근할 수 있는 곳에 위치시켜야한다.
그래야 클라이언트가 `clipboard.js` 플러그인을 자신의 장비에 다운로드 할 수 있으며 우리가 의도한대로 클립보드를
제어 당할<span class="md-monologue">(?)</span> 수 있게 된다.

그런데 내 블로그 구조 상 `/assets/js/plugins` 디렉토리는 클라이언트가 URL로 접근할 수 없는 장소이다.<br/>
그럼에도 클라이언트가 이 플러그인을 올바로 사용할 수 있는 이유는 [플러그인 Uglify](#플러그인-uglify)
섹션에서 이어서 설명한다.

지금은 클라이언트가 해당 플러그인에 접근 할 수 없더라도 플러그인 관리를 위해 설명한 대로 `/assets/js/plugins/clipboard.js`
위치에 다운로드한 파일이 오게 한다.

### 플러그인 로드

클라이언트는 내 블로그에 접속해서 화면을 생성할때 내 블로그 서버로부터 HTML, CSS, Javascript 등 각종 코드 및 미디어 데이터들을
다운로드 받고 클라이언트 측의 브라우저에서 실행시키는 '페이지 로드' 과정을 거친다.<br/>
이 과정 중에는 `clipboard.js` 플러그인을 다운로드 받고 실행시켜 메모리에 로드하는 '플러그인 로드' 과정도 포함된다.

다음 단락부터 `clipboard.js` 플러그인을 로드하는 방법에 대해 설명할 것인데, 내 블로그에서는 그 방법을 약간 고도화 하여
구현하고 있으므로 내 블로그의 방법을 따를 것이라면 다음 단락의 내용은 따라할 필요 없이 눈으로만 읽고 이해한 후
다음 섹션 [플러그인 Uglify](#플러그인-uglify)로 넘어가면 된다.

`clipboard.js` 플러그인은 모든 포스트에서
<a class="btn btn--clipboard" id="shareon-clipboard" title="Copy URL to Clipboard" data-clipboard-text="{{ site.url }}{{ page.url }}">
  <i class="fas fa-fw fa-link" aria-hidden="true"></i>
  <span> Copy URL</span>
</a>
공유 기능을 위해 사용되고 있을 뿐만 아니라 클립보드로 무언가 복사하는 기능 자체도 다양한 상황에서 종종 사용될 것으로 예상되기 때문에
블로그의 모든 페이지에서 항시 로드 되도록 설계하기로 했다.

단, 클라이언트가 페이지를 로드 할 때 모든 페이지에서 클라이언트 측에 플러그인 다운로드 용량 수준의 네트워크 트래픽 및
플러그인의 실행에 들어가는 자원과 시간 만큼의 부하를 발생시킨다는 점을 꼭 염두에 두어야한다.

블로그 페이지를 만들때 HTML 소스 어딘가에 `<script src="접근 가능한 clipboard.js 경로">` 형태의 태그를 넣으면
클라이언트 측의 페이지가 로드 될 때 플러그인도 함께 로드된다.

내 블로그 테마의 근간이 되는 Jekyll Theme `Minimal-Mistakes` 에서는 모든 페이지의 시작이 Jekyll Layout `default`로부터
시작한다. 즉, Layout `default`는 모든 페이지 레이아웃의 가장 바깥 프레임이 된다.<br/>
따라서 아래와 같은 `<script>` 태그를 Layout `default`의 `<head>` 태그 내부 또는 페이지 최하단에 추가하면
모든 페이지에서 `clipboard.js` 플러그인이 로드될 것이다.

```html
<script src="/assets/js/plugins/clipboard.js"></script>
```

만약 페이지를 만들때 수동으로 `<script>` 태그를 삽입한다면 어느날 한번 쯤은 삽입을 빼먹는 실수를 할 수도 있다.<br/>
따라서 이처럼 Jekyll Layout에 `<script>` 태그를 박아두면 그런 사태를 미연에 방지할 수 있을 것이다.

### 플러그인 Uglify

내 블로그에서는 Uglify 도구로 `Node.js`의 `uglify-js` 패키지를 이용했다.

`clipboard.js` 플러그인은 위 섹션 [플러그인 로드](#플러그인-로드)에서 설명한 바와 다르게 `<script>` 태그로 단독으로
로드되지 않는다.<br/>
대신 다른 플러그인을 포함하는 여러 javascript 파일들과 함께 Uglify 되고 단일 파일 `main.min.js` 파일로 통합된다.

그리고나서 클라이언트에게 클라이언트가 접근 할 수 없는 `/assets/js/plugins/clipboard.js` 경로 대신에
클라이언트가 접근 할 수 있는 `/assets/js/main.min.js` 경로를 대신 제공한다.

<div class="notice--info" markdown="1">
#### Uglify 란
{:.no_toc}
Uglify(또는 Minify)란 Javascript 코드를 경량화(단순화, 최소화, 압축, 통합) 하는 작업을 의미한다.<br/>
경량화는 개발자가 수동으로 하지 않고 뛰어난 선지자들께서 이미 개발해 놓으신 도구를 이용해서 자동으로 이뤄진다.<br/>
Uglify를 거치면 개발 편의상 지정한 변수명 `var userInfo` 가 있다고 할때 `var o` 와 같이 변수 선언 의미를 유추 할 수 없는
길이가 짧은 변수명으로 치환되며 줄내림, 들여쓰기 등의 모든 공백이 제거된다.<br/>
그래서 가독성이 매우 떨어지게 되는데 그럼에도 이런 경량화 작업이 수행되는 이유는 클라이언트가 다운로드 해야하는 Javascript의
용량을 줄여서 네트워크 부하를 낮춰줄 수 있기 때문이다.<br/>
또한 가독성이 좋지 못하다는 점은 역으로 악의적인 다른 프로그래머들의 소스 접근을 방해하는 수단이 된다.<br/>
<span class="md-monologue">다만, 예상했겠지만 Uglify의 복호화는 변수명만 제외하면 아주 쉽다. 사실상 보안의 의미가 있다고는 할 수 없음.</span><br/>
경량화를 거친 javascript 파일명은 주로 `*.min.js` 패턴으로 명명된다.
</div>

#### uglify-js 설치 및 실행

`uglify-js` 패키지를 사용한 Uglify를 수행하기 위해서는 `Node.js`가 필요하다.
`Node.js`는 [공식 사이트](https://nodejs.org/en/download/)를 통해 쉽게 구할 수 있고
`Node.js`가 설치되면 `uglify-js` 또한 아래 명령어로 쉽게 설치 할 수 있다.

`Node.js`의 존재 목적인 `Node.js` 서버 구동은 하지 않을 것이다.
오직 몇몇 빌드와 도구 사용을 위해서만 사용할 것이므로 뭔지 잘 모르는 프레임워크가 등장했다고 쫄지말자.
<span class="md-monologue">나 스스로에게 하는말...ㄷㄷ</span>

```bash
npm install uglify-js
```

그다음 `/package.json` 파일에서 키 `"scripts"`를 찾는다.

Jekyll Theme `Minimal-Mistakes` 의 경우 이미 `"scripts"` 키에 대한 내용이 정의되어 있을 것이다.
만약 그렇지 않다면 아래 설명에 따라 만들어 넣으면 된다

`"scripts"`에 들어가 있는 항목들은 `Node.js`로 실행하는 '사용자 정의 명령어 목록'에 해당한다.
그 중 `"uglify"`라고 명명된 사용자 정의 명령어에는 `uglify-js`를 실행하는 내용이 작성 되어있다.<br/>
그 값을 아래와 같이 우리가 다운로드 했던 `assets/js/plugins/clipboard.js` 플러그인 경로가 포함되도록 수정한다.

아래 코드를 실행하면 `assets/js/plugins/clipboard.js`와 `assets/js/_main.js` 파일의 내용을 압축하고 변수명을 치환한 후
단일 파일 `assets/js/main.min.js`로 통합한다.

```json
"scripts": {
  "uglify": "uglifyjs assets/js/plugins/clipboard.js assets/js/_main.js -c -m -o assets/js/main.min.js"
}
```

그다음 CLI에 아래 명령어를 실행시킨다.

```bash
npm run uglify
```

위 명령어를 실행하는 것은 CLI에서
`uglifyjs assets/js/plugins/clipboard.js assets/js/_main.js -c -m -o assets/js/main.min.js`
명령어를 실행한 것과 차이가 없다.<br/>
다만, javascript에 수정이 생길 때 마다 Uglify를 해줘야 하는데 그때 마다 매번 긴 명령어를 입력하는 것이 번거로우므로
단축 명령어로 사용한다고 보면 된다.

명령어 실행이 완료되면 `clipboard.js`를 포함하고 있는 `/assets/js/main.min.js` 파일이 생성된다. (기존에 있었다면 덮어씌워짐)<br/>
이 경로는 클라이언트가 URL을 통해 접근 할 수 있는 경로이다.
(<{{ site.url }}/assets/js/main.min.js> 경로를 브라우저에 입력하면 그 내용을 볼 수 있다.)

그다음 Layout `default`의 최하단에 `<script src="/assets/js/main.min.js"></script>` 태그를 삽입한다.
(Minimal-Mistakes Jeykyll Theme을 사용한다면 이미 해당 스크립트가 삽입되도록 설정되어 있다.)<br/>
이로써 클라이언트는 내 블로그의 어느 페이지를 가든지 `main.min.js` 파일을 로드하게 되었고 그 안에는 `clipboard.js` 플러그인이 포함되어있다.

## 2. Button HTML 작성

다음으로 공유 버튼을 만든다. 내 블로그에서는 이런
<a class="btn btn--clipboard" id="shareon-clipboard" title="Copy URL to Clipboard" data-clipboard-text="{{ site.url }}{{ page.url }}">
  <i class="fas fa-fw fa-link" aria-hidden="true"></i>
  <span> Copy URL</span>
</a>
버튼을 만들었는데 버튼의 CSS는 따로 다루지 않겠다.

버튼을 만드는 HTML 소스코드는 아래와 같으며 그 중 공유 기능 구현을 위해 반드시 필요한 부분은 `<a>` 태그의 attribute `id`와
property `data-clipboard-text` 이다.<br/>
다양한 방식의 클립보드 복사를 위해 `data-clipboard-text` 속성 외에 다른 속성 값을 활용하는 여러 액션이 있으므로
[공식 홈페이지](https://clipboardjs.com/)의 설명을 참조하자.

```html
<a class="btn btn--clipboard" id="shareon-clipboard" title="Copy URL to Clipboard" data-clipboard-text="{% raw %}{{ site.url }}{{ page.url }}{% endraw %}">
  <i class="fas fa-fw fa-link" aria-hidden="true"></i>
  <span> Copy URL</span>
</a>
```

위 소스 코드에서 `id`는 클립보드 기능을 추가할 html 오브젝트를 지정하는 역할을 한다.
버튼 작성이 완료되면 Javascript를 하나 만들어서 지정한 `id`를 가진 `<a>` 태그에 Clipboard 오브젝트를 할당하는 작업을 진행할 것이다.

`data-clipboard-text`는 클립보드에 복사할 값이 된다.
위 코드의 `data-clipboard-text="{% raw %}{{ site.url }}{{ page.url }}{% endraw %}"`은 Liquid 템플릿 언어로 작성되어 있으며
Jekyll에 의해 페이지가 Build 될 때, `{% raw %}{{ 블로그 주소 }}{{ 현재 페이지 경로 }}{% endraw %}` 포맷의 문자열로 치환된다.

## 3. Custom Javascript 작성

이제 `clipboard.js` 플러그인을 이용해서 위에서 생성한 Button을 클릭하면 클립보드에 복사가 일어나도록
Custom Javascript를 작성한다.

내 블로그에서는 Custom Javascript들을 `/assets/js/customs` 디렉토리에 모아서 관리하고 있으며
지금 작성하는 Javascript 역시 해당 디렉토리 하위에 `/assets/js/customs/copy-to-clipboard.js` 경로로 작성했다.

현재 작성된 `copy-to-clipboard.js` 파일은
<https://github.com/seungwubaek/seungwubaek.github.io/blob/master/assets/js/customs/copy-to-clipboard.js>
에서 볼 수 있으며 그 코드는 아래와 같다.

```javascript
$(function(){
  var clipboard = new ClipboardJS('.header-link');
  clipboard.on('success', function(e) {
    simpleNotice.show('URL을 클립보드에 복사하였습니다.');
    e.clearSelection();
  });
  // clipboard.on('error', function(e) {
  // });
  var clipboardShareOn = new ClipboardJS('#shareon-clipboard');
  clipboardShareOn.on('success', function(e) {
    simpleNotice.show('URL을 클립보드에 복사하였습니다.');
    e.clearSelection();
  });
});
```

코드를 보면 `var clipboard` 변수와 `var clipboardShareOn` 변수 2개를 할당하는 것을 볼 수 있다.<br/>
전자의 변수는 페이지 내 모든 제목, 소제목들에 클립보드 복사 기능을 부여하는 기능을 하며,
후자의 변수는 우리가 현재 포스트에서 다루고 있는 `Copy URL` 공유 버튼에 클립보드 복사 기능을 부여하는 기능을 한다.

후자의 변수에 할당된 내용을 보면 클래스 객체를 생성하는 듯한 코드 `new ClipboardJS` 가 있다.
(Javascript 버전에 따라 클래스-like 라고 해야 할 수도 있고 공식적인 클래스라고 할 수도 있어서 표현이 애매하다.)<br/>
클라이언트 입장에서 보면 이 코드를 실행하기 전에 `clipboard.js` 플러그인을 먼저 메모리에 로드 해야
해당 코드가 올바로 작동 할 수 있다.<br/>
그리고 생성하려는 객체에 앞에서 지정한 `id` 값인 `#sharedon-clipboard`를 인자로 넘긴다.

이를 통해 `shareon-clipboard`를 `id`로 가지는 `<a>` 태그가 클릭되면 속성값인 `data-clipboard-text`의 값을 클립보드에
복사하는 기능이 실행된다.

그 다음 라인의 `clipboardShareOn.on('success', ...` 코드는 클립보드에 복사가 성공적으로 수행 되었을 경우 실행되는
콜백 함수이다.<br/>
그 블록의 내용을 보면 `simpleNotice`라는 녀석이 나오는데 이 녀석은 `<div>` 태그를 이용해서 화면에 팝업 같은 알림을
띄워주는 기능을 한다.
이 `simpleNotice`는 구글 Document들에서 구현한 알림 팝업의 작동 스타일을 참고하여 `jquery`로 내가 자체 구현하였다.<br/>
`simpleNotice`는 클립보드 복사와 상관없는 내용이므로 본 포스트에서는 다루지 않는다.

### Custom Javascript Uglify

위 [플러그인 Uglify](#플러그인-uglify) 섹션에서와 같이 방금 작성한 `copy-to-clipboard.js` 역시 Uglify를 거친다.

아래는 내 `package.json` 파일 내용의 일부이다.

```json
"scripts": {
  "uglify-heads": "uglifyjs assets/js/vendor/jquery/jquery-3.4.1.js -c -m -o assets/js/heads.min.js",
  "uglify-head-customs": "uglifyjs assets/js/customs/head-common.js -c -m -o assets/js/head-customs.min.js",
  "uglify": "uglifyjs assets/js/plugins/jquery.fitvids.js assets/js/plugins/jquery.magnific-popup.js assets/js/plugins/jquery.ba-throttle-debounce.js assets/js/plugins/pagination-2.1.5.js assets/js/plugins/smooth-scroll.js assets/js/plugins/gumshoe.js assets/js/plugins/clipboard.js assets/js/_main.js -c -m -o assets/js/main.min.js",
  "uglify-customs": "uglifyjs assets/js/customs/common.js assets/js/customs/nav-remocon.js assets/js/customs/whole-toc.js assets/js/customs/simple-notice.js assets/js/customs/sidebar.js assets/js/customs/auto-scroll.js assets/js/customs/responsive-topbar.js assets/js/customs/copy-to-clipboard.js assets/js/customs/fold-code-block.js assets/js/customs/statistics.js assets/js/customs/lang-pack.js assets/js/customs/right-widget.js assets/js/customs/site-pagination.js assets/js/customs/magnific-popup.js assets/js/customs/post-utility.js -c -m -o assets/js/customs.min.js",
  "uglify-kakao-custom": "uglifyjs assets/js/customs/kakao.js -c -m -o assets/js/kakao-custom.min.js",
  "add-banner": "node banner.js",
  "build-heads-all:js": "npm run uglify-heads && npm run uglify-head-customs",
  "build:js": "npm run build-heads-all:js && npm run uglify && npm run uglify-customs && npm run uglify-kakao-custom && npm run add-banner"
}
```

이들 중 `"uglify-customs"` 키를 보면 `copy-to-clipboard.js`를 포함하여 많은 Custom Javascript들이 `/assets/js/customs.min.js` 파일로
Uglify 되는 것을 알 수 있다.

또한 `"build:js"` 키를 보면 아래 한줄의 명령어로 `clipboard.js` 등의 플러그인 뿐만 아니라 `copy-to-clipboard.js` 등의
모든 커스텀 스크립트들을 전부 Uglify 하게 된다.

```bash
npm run build:js
```

Uglify가 완료되었다면 해당 파일 역시 클라이언트가 페이지 로드 중에 다운로드 받고 메모리에 로드해야한다.
따라서 아래와 같은 코드를 HTML 소스에 삽입해준다.

```html
<script src="/assets/js/customs.min.js"></script>
```

단, `/assets/js/customs.min.js`에는 클립보드 복사 코드가 포함되어있고 해당 코드가 작동하려면 `clipboard.js` 플러그인이
먼저 로드되어 있어야한다.<br/>
따라서 `/assets/js/main.min.js` 파일이 앞서 로드되도록 HTML 구조를 짜야한다.

여기까지 클립보드로 URL을 복사하는 공유 방법에 대한 설명이 완료되었다.<br/>
설명을 따라 만들었다면 최종적으로 빌드된 페이지의 HTML 소스에는 다음의 두 줄이 포함될 것이다.

```html
<script src="/assets/js/main.min.js"></script>
<script src="/assets/js/customs.min.js"></script>
```

## Tip. _config.yml 작성

이번 섹션에서는 Jekyll Theme `Minimal-Mistakes`에 있는 기능으로 Javascript를 편하게 로드하는 방법에 대해 보충 설명하려고 한다.

위에서 이미 `*.min.js` 형태로 Uglify 된 Javascript를 페이지에 로드하는 방법에 대해 설명하였다.<br/>
페이지에 아래 태그가 들어가도록 하면 되며 주로 Jekyll Layout에 넣어서 항시 로드하도록 한다고 했다.

```html
<script src="/assets/js/main.min.js"></script>
<script src="/assets/js/customs.min.js"></script>
```

그런데 `Minimal-Mistakes`에는 설정 파일의 내용을 수정하는 것으로 위처럼 수동으로 `<script>` 태그를 Layout `default`에 넣는 작업을
자동화 할 수 있다.<br/>

아래 코드와 같이 `_config.yml` 파일에서 `footer_scripts` 라는 키 값을 찾아 입력하면 Layout `default`의 하단에
2개의 Javascript 경로가 자동으로 `<script>` 태그로 삽입된다.

```yaml
footer_scripts:
  - /assets/js/main.min.js
  - /assets/js/customs.min.js
```

사실 `_config.yml` 설정 파일을 이용해서 이렇게 동적으로 스크립트를 삽입하거나 제거하는 방법은
꼭 Jekyll Theme `Minimal-Mistakes`가 아니더라도 Jekyll에 대한 지식만 가지고도 직접 구현해볼 수 있다.
