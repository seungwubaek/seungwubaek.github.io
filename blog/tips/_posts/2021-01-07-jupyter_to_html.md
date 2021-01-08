---
layout: single
title: "Jupyter Notebook 화면을 블로그로 가져오기"
date: "2021-01-07 09:18:00 +0900"
last_modified_at: "2021-01-08 18:46:00 +0900"
---
Data Science 관련 작업을 하면 Jupyter Notebook을 사용하는 경우가 많다.<br/>
이 포스트에서는 작성한 Notebook의 Python 코드 셀, Markdown 셀,
Pandas Dataframe Output, Matplotlib Plot Image Output을 있는 그대로 Jekyll 블로그로 가져와서
포스팅 하는 방법을 알아본다.<br/>
nbconvert를 사용해서 html로 변환하며 iframe으로 가져올 것이다.

## Requirement

Jekyll, Jupyter Notebook

# 방법 요약

1. nbconvert로 ipynb 파일을 HTML로 변환한다.
2. nbconvert 변환에 사용한 template과 변환된 HTML을 열어서 그 안에서 사용된 CSS, Javascript를 그대로 옮겨서
   Jekyll Layout (/_layout/jupyter-notebook.html)을 하나 만든다.
3. 방금 만든 Jekyll Layout으로 iframe으로 사용할 HTML 파일(/assets/iframes/jupyter-notebook/simple.html)을
   하나 만들고 nbconvert로 변환했던 HTML에서 `<head>` 내용만 제외하고 복붙한다.(`<head>`는 layout에 들어있게 할것)
4. 포스트를 하나 만들고 `<iframe>` 태그 안에 3에서 만든 simple.html을 넣는다.

# 방법 상세

## 1. 샘플

포스팅 할 Notebook은 이미 있다고 가정한다. 여기서는 설명을 위해 아래와 같은 단순한 내용의 Notebook 샘플을 사용할 것이다.<br/>
Markdown 셀, Python Code 셀, Pandas Dataframe, Matplotlib Plot이 있다. (코드 내용 설명 생략)

![Jupyter Notebook Sample]({{ site.gdrive_url_prefix }}1whqzf_6jM2CAbnlDd0jKOeDXfHiuqTbj)

## 2. Notebook 파일 위치 확인

우리가 Jupyter에서 작성하고 저장한 파일(기본적으로 일정 주기로 자동저장 됨)은 어디 있을까?<br/>
맨 처음 빈 Jupyter Notebook Web UI에서 파일을 하나 만들때 아래와 같은 화면에서 파일을 생성했을 것이다.

아래 화면을 보면 나는 위 샘플을 `[Jupyter Home 경로]/GitBlog/simple.ipynb`로 저장했음을 알 수 있다.

![Jupyter Notebook Web UI]({{ site.gdrive_url_prefix }}1ROIYIpFBgiyVVT3K3nmh8eZnpmk1iA1q)

실제 그 경로로 가보면 `ipynb` 확장자를 가진 파일을 볼 수 있다.
<span class="md-monologue">컴퓨터 여러대로 포스팅해서.. 설명과 그림 상의 경로가 정확히 일치하지 않는다.</span>

![Jupyter Notebook File]({{ site.gdrive_url_prefix }}1T-O8A5QYZiguDvYT6bLjfT62HmYiN0fd)

그리고 그 파일을 열어보면 재미난 형태를 볼 수 있는데, 내가 작성한 텍스트, 코드들과 어떤 python kernel을 사용했는지 까지
`Json` 형태로 들어있고 눈으로도 제법 수월하게 읽을 수 있다.

![ipynb content]({{ site.gdrive_url_prefix }}1RsjOfmtUY1-enpcoyepGlBfxIy5_H0Po)

그럼 여기서 아이디어가 하나 떠오른다.<br/>
'이정도로 단순하며 체계적이고 상세한 단일 `Json` 구조라면 HTML로 바꾸기 그리 어렵진 않겠는걸?
셀 부분만 HTML 구조로 변환하고 블로그로 가져와서 Jupyter Notebook UI 비스무리하게 CSS를 입히면 되겠다.'

## 3. Notebook 파일을 HTML로 변환

그렇다. <span class="md-monologue">'내가 생각한 것은 반드시 이 세상에 있다'는 절대 법칙에 의하여</span>
Jupyter nbconvert를 이용하면 ipynb 파일을 자동으로 HTML로 변환할 수 있다. 콘솔 창에서 명령어 한줄만 치면 된다.

```bash
jupyter nbconvert --to html --template classic --no-prompt \
                  --output hello_simple.html ./simple.ipynb
```

<span class="md-monologue">그러면서 화면 가로 사이즈가 좁을까봐 두줄로 씀.. ㅋㅋ 반응형 웹의 생활화!</span>

명령어를 실행시키면 아래 그림과 같은 메시지와 함께 변환 완료된다.

![nbconvert Command and Stdout]({{ site.gdrive_url_prefix }}1dh4U7XCp-486hSXpe98yZGy18y_83QS5)

명령어에 대한 자세한 설명은 좀 더 아래 섹션 [5-1. command parameter](#5-1-command-parameter)를 보자

## 4. 변환 결과 확인 및 분석

위 명령어를 실행하면 아래 처럼 `hello_simple.html` 파일이 생성된 것을 볼 수 있다.

![nbconvert Convert ls Result]({{ site.gdrive_url_prefix }}1uLzmUIeEvlLT31Q8uCm9fiOCbNbMERVC)

이 `hello_simple.html`을 크롬 같은 브라우저로 열면 맨 처음 [샘플](#1-샘플)과 거의 똑같고
맨 왼쪽의 `In[1]`, `Out[1]` 같은 자동 넘버링만 빠진 화면을 볼 수 있다.

### 4-1. 너무 방대한 파일

그러면 HTML로 만들어졌고 블로그로 옮기기만 하면 될텐데... 문제가 아직 남아있다.

`hello_simple.html`을 메모장이나 `vi` 등 에디터로 열어보면 `<html>` 태그가 통으로 들어가 있고,
`<head>`에는 Javascript도 들어가 있고, CSS도 박혀있으며 그 양이 어마어마하다.

![nbconvert Convert File Result]({{ site.gdrive_url_prefix }}1jLZY1y9_J54EvkwchTBzLzpO1Bz-LgKa)

심지어 그림 파일조차 데이터 그대로 들어가 있다. 바이너리 데이터가 `Base64`로 인코딩된 형태이다.

![Matplot Image Encoded with Base64]({{ site.gdrive_url_prefix }}1jHy1JiZjplwR0IFQ6rsPFB4EC_j7OkW7)
{: id="image-encoded-base64"}

그리고 이 변환된 HTML 파일은 전체 줄수가 13277 라인이라고 한다.<br/>
<span class="md-monologue">글자수는 30만자이니까 영문 1자 = 1 Byte 기준으로 총 30만 Btye = 292KB 정도 하겠군</span>

![Converted File Length]({{ site.gdrive_url_prefix }}1DfY0tnw735r3eu6-x6asARRCC4hCUyT2)

근데 그중 내가 작성한 셀 내용은 맨 아래에 100줄 정도가 다 이다.

내 다른 포스트의 용량이 대충 5~20KB 인데 반해, 이 변환된 HTML 파일은 300KB에 달한다.
이런 파일을 Notebook을 작성할 때마다 블로그에 포스팅 하면 Git Repository에서 차지하는 용량이 너무 커진다.

### 4-2. 변환 HTML 파일을 블로그로 옮기기 위한 설계

여기서 잠깐 생각 타임. 위와 같은 방대한 양의 변환 파일을 어떻게 효과적으로 블로그로 옮길지 설계를 하자.

Jupyter Notebook을 사용해본 사람은 짐작 할 수 있겠지만 위의 Javascript, CSS 부분은 Jupyter Notebook의 UI를 꾸미고
페이지 렌더링 하는데 사용하는 것이기 때문에 Jupyter Notebook의 코드 실행과는 상관이 없다.<br/>
따라서 UI가 동일한 같은 버전의 Jupyter Notebook 이라면 Javascript, CSS 부분은 셀의 코드 내용과는 무관하게
모든 Notebook 파일에서 항상 동일할 것이라 예상 할 수 있다.

그러므로 일단 동일하게 반복될거라 예상되는 Javascript, CSS 부분으로 Jupyter Notebook 전용의 Jekyll Layout을 만들자.<br/>
그러면 Jupyter Notebook을 포스트 할 때 마다 Javascript, CSS를 넣는 것을 자동화 할 수 있다.
그리고 Jekyll Layout 안에 Jupyter Notebook의 셀 내용만 채워서 포스트를 빠르게 생산할 수 있게 된다.

그런데 Jekyll Layout에 Javascript, CSS를 넣으면 Jupyter Notebook을 포스트 할 때 마다 1만 3천줄에 달하는 CSS가 생긴다.
따라서 내 Git Repository 용량을 아끼기 위해 `<link rel="stylesheet">` 태그를 이용해서 CSS를 주소로 대체한다.<br/>
이렇게 하면 내 포스트는 CSS 내용을 포함하지 않는데 클라이언트의 요청이 들어올때에 CSS를 따로 전송해준다.
클라이언트는 포스트를 볼 때에 CSS가 없는 포스트를 받게 되고, CSS는 별도 요청으로 받아서 스스로 마저 처리하게끔 한다.

![HandShake for Stylesheet]({{ site.gdrive_url_prefix }}1d3hBw-a3lG8kLSrI5dH2BM2F8i6UnfoN)

위 그림처럼 유저가 Jupyter Notebook 포스트를 요청하면 CSS 내용이 빠져있는 Post 페이지만 준다.
대신 CSS가 서버의 어디에 있는지 주소를 함께 알려준다. (이것이 바로 `<link rel="stylesheet">` 태그의 역할)<br/>
그러면 유저는 서버에게 서버의 그 주소에 있는 CSS 파일을 달라고 다시 한번 요청한다. 그럼 그때서야 서버는 CSS를 보내준다.

이렇게 하면 서버는 모든 Jupyter Notebook 포스트에 동일하게 적용할 1개 CSS 파일을 특정 위치에 저장해 뒀다가 유저가 요청할 때
그것을 전송해주면 되기 때문에 포스트 마다 CSS 내용을 전부 기록할 필요가 없어지므로 서버 용량 낭비를 줄일 수 있다.

이렇게 `<link rel="stylesheet">` 태그를 활용한 Jekyll Layout을 사용하면 포스트를 효율적으로 뽑을 수 있을 것이다.

그렇다면 HTML로 변환된 Jupyter Notebook의 Javascript, CSS들은 뭐로부터 만들어진걸까? 어디서 가져오면 되는걸까?<br/>
그 답은 바로 다음 섹션에서 설명할 nbconvert에서 찾아볼 수 있다.

## 5. nbconvert 상세

위 섹션에서 다룬 Javascript, CSS를 얻기 위해 nbconvert가 작업한 내용을 뜯어보자.

### 5-1. command parameter

`jupyter nbconvert` [명령어](#3-notebook-파일을-html로-변환)로 Jupyter Notebook 파일을 HTML로 변환 할때
명령어의 파라미터들은 아래와 같다.

* `--to`<br/>
  목적 파일을 어떤 형태로 변환시킬건지를 의미한다. 우리는 `html`로 변경할것이다.
  그외에도 `jupyter nbconvert --help`를 쳐보면 `markdown`, `asciidoc`, `custom`, `latex`,
  `notebook`, `pdf`, `python`, `rst`, `script`, `slides`, `webpdf` 들이 가능하다고 나온다.<br/>
  `markdown`도 쓸만할 것 같지만 나중에 CSS를 적용하기 어려우므로 패스한다.<br/>
  `pdf`나, `webpdf`도 해보니까 pdf로 떨어지는게 쓸만할 것 같은데.. 이걸 쓰려면 `xelatex`, `pyppeteer`, `chromium` 등
  추가적인 도구 설치가 필요하고 어짜피 포스팅 하기에 용량이 클 것 같으므로 패스한다.
  <span class="md-monologue">매우 귀찮..</span>
* `--template`<br/>
  `--to html` 옵션을 사용했을 때 변환한 HTML에 CSS와 HTML 구조를 지정해 줄 수 있다. 우리는 이 옵션 값에 `classic`을 사용한다.
  `classic`을 사용하면 Jupyter Notebook Web에서 보던 화면과 똑같은 스타일과 구조의 디자인을 만들 수 있다.
* `--no-prompt`<br/>
  Jupyter Notebook Web에서 셀을 실행하면 셀 왼쪽에 내가 입력한 내용인지, 실행 결과 출력인지를 나타내는
  `In[1]`, `Out[1]` 등의 In/Out 자동 넘버링이 있다.
  이때 이 옵션을 붙이면 변환 HTML 파일에서 자동 넘버링을 해제 할 수 있다. 쓸지 말지는 자유.
* `--output`<br/>
  변환할 파일의 파일명을 지정해 줄 수 있다. 이 옵션을 쓰지 않으면 원본 파일명에 확장자만 변환하려는 확장자로 바뀐다.
* `./simple.ipynb`<br/>
  변형 대상 파일의 경로이다. 당연한 말이지만 반드시 필요하다.

다른 옵션도 여러가지 있고 콘솔 명령어가 아닌 프로그래밍으로 `nbconvert`를 사용할 수 있다.
<https://nbconvert.readthedocs.io/en/latest/config_options.html#cli-flags-and-aliases>
이곳을 참조하자.

### 5-2. template 템플릿

nbconvert가 가진 template에 대해 좀 더 살펴보자.

template을 이용해서 HTML 변환 내용의 구조와 CSS를 변형 시킬수 있다.
이 template들은 `[jupyter 설치 경로]/share/jupyter/nbconvert/templates`에 확장자가 `j2` 인 파일로 정의되어 있다.

경로를 못 찾겠으면 명령어 `jupyter --paths` 를 실행시켜서 나오는 경로 중에 찾아보면 된다.

아래 그림은 우리가 선택한 `classic` template 파일의 내용이다.

![nbconvert Template made from jinja]({{ site.gdrive_url_prefix }}1M0FlBC55vwHmgFD-U-sNIqwC0CYCBXai)

`<html>`, `<script>` 등의 HTML 태그도 보이고 liquid 문법과 아주 비슷하게
`{% raw %}{% %}{% endraw %}` 기호로 감싸진 부분도 보인다.

이 liquid와 유사한 문법은 `jinja` template 문법이라고한다.
이 문법을 사용해서 나만의 custom template도 만들어 사용할 수 있다.<br/>
그렇다는 것은 다른 사람들이 만들어 놓은 것들도 많다는 뜻이겠지만, 당장 필요하진 않다.

그냥 그렇다는 것만 알아두고 여기서 보고 가야 할 부분을 빨간 네모로 표시하였다.

첫번째 영역은 `mathjax.html.j2` 라는 파일을 가져오는 것이고,<br/>
두번째 영역은 `jquery_url`을 가지고 `<script>` 태그를 만드는 곳,<br/>
세번째 영역은 `CSS` 스타일을 넣는 곳이다.<br/>

드디어 살짝 빛이 보이는 것 같다. template의 코드를 추적해보면 필요한 Javascript와 CSS를 얻을 수 있을 것 같다.

일단 아래 경로에서 세번째 영역에 나와있는 CSS 파일 중 가장 부피가 큰 것 하나를 얻을 수 있다!

![nbconvert template classic style css location]({{ site.gdrive_url_prefix }}1U3IbPL0N7aYHuvDZw3tpLMxRc3idUkdt)

세번째 영역의 CSS 파일을 제외하곤 양이 많지 않으므로 나머지는 그대로
새로 만들 Jupyter Notebook 전용 Jekyll Layout에 복붙하기로 한다.

### 5-3. 셀 내용

Javascript와 CSS는 그것으로 됐고, 포스트 하려는 Jupyter Notebook 셀 내용은 변환된 `hello_simple.html`을 열어서
파일 맨 밑의 `<body>` 태그에 보면 있다.

![Converted Jupyter Cell Content]({{ site.gdrive_url_prefix }}1mRth3DTDWHrQvX-JyDYSth6yFc-JJbUi)

Jupyter 전용 Layout에 위 섹션에서 말했던 Javascript, CSS 부분이 들어가 있으므로

우리가 블로그에 포스트 할때 마다 할일은 이 `<body>` 부분의 내용을 포스트에 그대로 복붙하는 것이다.

## 6. CSS 충돌 문제

이제 Jekyll Layout을 만들면 되는데 치명적인 문제가 하나 있다... [5-2. template 템플릿](#5-2-template-템플릿)에서 찾아낸
Jupyter Notebook을 위한 CSS를 사용해야 하는데 이미 내 블로그는 블로그 전용의 CSS가 있다는 점이다.

만약 Jupyter Notebook CSS를 그냥 적용한다면 내 블로그 CSS와 합쳐져서 블로그 스타일 전체가 엉망이 된다.

가장 좋은 방법은 기존에 있던 다른 CSS보다 앞서서 Jupyter Notebook CSS를 내 블로그에 적용하고
어디에서 CSS가 충돌하는지 확인한 다음 서로 겹쳐지지 않게끔 Jupyter Notebook CSS에 CSS Class를 부여한다든지 하는 방법이다.<br/>
하지만 이미 블로그가 개발된 상태에서 충돌을 찾아 일일히 고치기란 여간 버거운일이 아닐 수 없다.

거기에 Jupyter nbconvert를 위한 Custom Template를 만들수도 있다.<br/>
이것 또한 1분 1초 아까운 마당에 구조를 구상하고 jinja template도 익혀야 하니 진입 장벽을 넘기가 쉽지 않다.

그 방법을 제외하면 다른 방법을 2가지 정도로 나눌 수 있다.

1. 내 블로그 CSS를 적용하지 않은 빈 Layout에 Jupyter Notebook CSS만 적용한 Layout을 만든다.<br/>
   이렇게 하면 Jupyter Notbebook 포스트를 클릭했을때 내 블로그 틀이 다 지워지고 Jupyter Notebook 화면만 달랑 나온다.
   그리고 유저는 포스트 내용을 다 본 다음 '뒤로가기'를 눌러서 돌아와야한다.<br/>
   이 방법은 Blog UI가 제 기능을 상실하고 사용자 경험의 질을 저하시키므로 좋지 못하다. 따라서 패스.

2. `<iframe>` 태그를 활용한다.<br/>
   `<iframe>`은 하나의 HTML 안에다가 또다른 HTML을 삽입하는 방법이다.
   이때 삽입된 HTML은 CSS, Javascript 등을 포함하여 부모 HTML로 부터 완전히 독립된다.
   따라서 이 방법을 쓰면 CSS가 충돌나지 않으면서 각자에게 서로 다른 CSS를 적용 시킬 수 있다.<br/>
   실제로 신뢰할 수 있는 많은 곳에서 각자의 목적 달성을 위해 `<iframe>` 태그를 사용 중에 있으며
   Jupyter Notebook의 경우 대표적으로 Github가 비슷한 방식을 사용하고 있다.
   그 예로 <https://github.com/Trusted-AI/AIF360/blob/master/examples/tutorial_credit_scoring.ipynb> 이곳을 보자.
   개발자 도구(<kbd>F12</kbd>)로 HTML 구조를 보면 Jupyter Notebook 내용을 `<iframe>`으로 가져온 것을 볼 수 있다.

그래서 우리는 2번 방법, `<iframe>` 태그를 사용해서 HTML 안에 HTML 형태로 포스트를 만들것이다.

이것을 활용해서 내 블로그 CSS를 가지는 포스트 페이지(HTML) 안에다가 Jupyter Notebook CSS를 가지는
Notebook HTML을 삽입해서 Javascript, CSS 충돌을 피하게 할 것이다.

## 7. Jekyll Layout 만들기

`<iframe>` 태그 안으로 들어갈 Jupyter Notebook 전용의 Jekyll Layout을 만든다.
이 Layout은 기존 블로그 CSS들을 포함하지 않는다.

나는 `_layouts/jupyter-notebook-v4.6.3.html` 경로로 만들었다.
그럴일이 많진 않지만 Jupyter 버전도 함께 명시해서 나중에 Jupyter가 버전업 하면서
UI가 수정될 것(CSS가 바뀔테니까)까지 고려하였다.

### 7-1. Jekyll Layout: Jupyter Notebook

Jupyter Notebook을 위한 Jekyll Layout 코드이다.
코드의 머리말에는 앞으로의 호환성을 고려해서 Jupyter version 뿐 아니라 notebook, nbconvert의 version도 함께 기록했다.

`<html>` 태그로 시작하고 `<script>` 태그를 이용해서 필요한 Javascript를 인터넷으로부터 받아온다.

그리고 2개의 `<link rel="stylesheet">` 태그가 들어가 있는데 각각 `/assets/css/jupyter-highlighter.css`,
`/assets/css/jupyter-notebook.css` 경로를 가리키고 있다.

전자는 코드를 색을 이쁘게 바꿔주는 CSS이고 후자는 HTML을 Jupyter Notebook 스타일로 꾸며주는 CSS이다.

여기 나온 모든 코드들은 앞서 설명한 대로 모두 nbconvert template `classic`의 `index.html.j2`와
변환 결과 HTML 파일로부터 가져왔다.

<div class='code-reducible code-reduce' markdown="1">
```html
{% raw %}
---
jupyter-version: "4.6.3"
notebook-version: "6.1.6"
nbconvert-version: "6.0.6"
---
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.10/require.min.js"></script>

<link rel="stylesheet" href="{{ '/assets/css/jupyter-highlighter.css' | relative_url }}">
<style type="text/css">
  .container {
    width: 90% !important;
}
</style>
<link rel="stylesheet" href="{{ '/assets/css/jupyter-notebook.css' | relative_url }}">
<style type="text/css">
/* Overrides of notebook CSS for static HTML export */
body {
  overflow: visible;
  padding: 8px;
}

div#notebook {
  overflow: visible;
  border-top: none;
}
// div#notebook-container{
//   padding: 6ex 12ex 8ex 12ex;
// }
@media print {
  body {
    margin: 0;
  }
  div.cell {
    display: block;
    page-break-inside: avoid;
  }
  div.output_wrapper {
    display: block;
    page-break-inside: avoid;
  }
  div.output {
    display: block;
    page-break-inside: avoid;
  }
}
</style>

<!-- Load mathjax -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/latest.js?config=TeX-MML-AM_CHTML-full,Safe"> </script>
<!-- MathJax configuration -->
<script type="text/x-mathjax-config">
init_mathjax = function() {
  if (window.MathJax) {
    // MathJax loaded
    MathJax.Hub.Config({
      TeX: {
        equationNumbers: {
        autoNumber: "AMS",
        useLabelIds: true
        }
      },
      tex2jax: {
        inlineMath: [ ['$','$'], ["\\(","\\)"] ],
        displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
        processEscapes: true,
        processEnvironments: true
      },
      displayAlign: 'center',
      CommonHTML: {
        linebreaks: {
        automatic: true
        }
      },
      "HTML-CSS": {
        linebreaks: {
        automatic: true
        }
      }
    });
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  }
}
init_mathjax();
</script>
<!-- End of mathjax configuration -->
<body>
{{ content }}
</body>
<script>
function resizeParentIframe() {
  $(parent.document.getElementById(window.name)).css({
    'border': 0,
    'width': '100%',
    'height': document.body.scrollHeight
  });
}
window.onload = resizeParentIframe;
window.onresize = resizeParentIframe;
$('img').on('load', resizeParentIframe);
</script>
</html>
{% endraw %}
```
</div>

위 코드에서 `<body>` 태그는 `{% raw %}{{ content }}{% endraw %}` 와 `<script>`로 구성돼 있다.
나중에 Jupyter Notebook 내용을 포스트 해야할 때 `{% raw %}{{ content }}{% endraw %}` 부분에
`nbconvert`로 변환한 파일의 `<body>` 부분을 복붙해서 넣게 될것이다.

그리고 `<script>` 부분은 나중에 Jekyll Layout으로 구성한 HTML(자식)이 다른 포스트(부모)의 `<iframe>`에 들어갈텐데
그때 부모의 `<iframe>` 태그의 높이를 조절하는 함수이다.<br/>
iframe을 쓰면 내부 HTML(자식)이 부모에서 독립되므로 자식이 이미지를 늦게 로드해서 높이가 변해도
부모 입장에서는 그것을 인지 할 수 없게된다. 그리고 `<iframe>`에 스크롤바가 생긴다...🙄

이 문제를 해결하기 위해 위 스크립트를 쓰면 자식이 이미지 로드를 완료해서 높이가 변경됐을때
부모로 거슬러 올라가 `<iframe>`을 찾아내서 높이를 변경시킨다.<br/>
그 작업이 올바로 수행되기 위해 하나 더 해야할 것이 있는데 그건 뒤에서 살펴본다.

참고로 Jupyter Notebook 원본에는 코드가 A4 종이에 나오는 것처럼 박스가 둘러져 있고 그림자가 적용돼 있는데
공간을 넓게 쓰기 위해 그건 없애버렸다. (주석 처리 했으므로 아래 코드와 `다운 받은 jupyter-notebook.scss` 파일에서
검색으로 '//' 기호를 찾아보면 수정한 부분을 볼 수 있다.)

### 7-2. CSS 등록

위의 Jupyter Notebook 전용 Jekyll Layout에서 사용할 CSS를 내 Jekyll 서버의 리소스로 저장해놓자.

파일 내용의 양이 너무 많아서 링크로 대체한다.

<a href="{{ site.repository }}/blob/master/assets/css/jupyter-highlighter.scss">이곳</a>의 내용을 복사해서
 `/assets/css/jupyter-highlighter.scss` 경로에 파일로 저장한다.

<a href="{{ site.repository }}/blob/master/assets/css/jupyter-notebook.scss">이곳</a>의 내용을 복사해서
 `/assets/css/jupyter-notebook.scss` 경로에 파일으로 저장한다.

위 두 파일의 경로는 `<link rel="stylesheet">`에서 링크가 걸리는 위치이다.

CSS의 파일 이름이 SCSS인데, Jekyll이 블로그를 빌드할때 이것을 CSS 파일로 변환해주므로 걱정하지 않아도 된다.

## 8. Jupyter Notebook 포스팅 하기

Jupyter Notebook 1개를 포스팅하려면 파일을 2개 만들어야한다.
일단 여기서는 이 포스트 맨위의 [샘플](#1-샘플)의 내용을 포스트하는 코드를 만들 것이다.

우리가 만들 파일 2개 중<br/>
하나는 `<iframe>`에 들어갈 실제 Jupyter Notebook 내용을 담은 파일이고,<br/>
하나는 `<iframe>` 태그를 넣은 포스트이다.

### 8-1. Jupyter Notebook Iframe

`<iframe>` 태그에 들어갈 내용을 만들어보자.

`/assets/iframes/jupyter-notebooks/2021-01-07-simple.html` 이라는 이름의 파일을 만들고 아래 내용을 넣는다.

아래 내용이 바로 nbconvert를 이용해서 `simple.ipynb` 파일을 `simple.html`로 변환했을때, `<body>` 태그 안에 들어있는 코드이다.

머리말에 `layout: jupyter-notebook-v4.6.3` 이 적용돼 있으므로 Jekyll이 빌드를 통해 Javascript, CSS 등을 붙여줄 것이다.

따라서 앞으로는 포스트를 만들때 이 부분의 내용만 바꿔주면 된다.

<div class='code-reducible code-reduce' markdown="1">
```
{% raw %}
---
layout: jupyter-notebook-v4.6.3
---
<div tabindex="-1" id="notebook" class="border-box-sizing">
  <div class="container" id="notebook-container">

<div class="cell border-box-sizing text_cell rendered"><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h1 id="Jupyter-Notebook">Jupyter Notebook<a class="anchor-link" href="#Jupyter-Notebook">&#182;</a></h1>
</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">

<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="kn">import</span> <span class="nn">pandas</span> <span class="k">as</span> <span class="nn">pd</span>
<span class="kn">import</span> <span class="nn">matplotlib.pyplot</span> <span class="k">as</span> <span class="nn">plt</span>
</pre></div>

    </div>
</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h3 id="&#45936;&#51060;&#53552;&#45716;-&#51076;&#51032;&#47196;-&#49373;&#49457;">&#45936;&#51060;&#53552;&#45716; &#51076;&#51032;&#47196; &#49373;&#49457;<a class="anchor-link" href="#&#45936;&#51060;&#53552;&#45716;-&#51076;&#51032;&#47196;-&#49373;&#49457;">&#182;</a></h3>
</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">

<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">header</span> <span class="o">=</span> <span class="p">[</span><span class="s1">&#39;col1&#39;</span><span class="p">,</span> <span class="s1">&#39;col2&#39;</span><span class="p">,</span> <span class="s1">&#39;col3&#39;</span><span class="p">,</span> <span class="s1">&#39;col4&#39;</span><span class="p">]</span>
<span class="n">data</span> <span class="o">=</span> <span class="p">[[</span><span class="mi">1</span><span class="p">,</span><span class="mi">2</span><span class="p">,</span><span class="mi">3</span><span class="p">,</span><span class="mi">4</span><span class="p">],[</span><span class="mi">5</span><span class="p">,</span><span class="mi">6</span><span class="p">,</span><span class="mi">7</span><span class="p">,</span><span class="mi">8</span><span class="p">],[</span><span class="mi">9</span><span class="p">,</span><span class="mi">10</span><span class="p">,</span><span class="mi">11</span><span class="p">,</span><span class="mi">12</span><span class="p">]]</span>
</pre></div>

    </div>
</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">

<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">df</span> <span class="o">=</span> <span class="n">pd</span><span class="o">.</span><span class="n">DataFrame</span><span class="p">(</span><span class="n">data</span><span class="p">,</span> <span class="n">columns</span><span class="o">=</span><span class="n">header</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">

<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">df</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">

<div class="output_area">


<div class="output_html rendered_html output_subarea output_execute_result">
<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>col1</th>
      <th>col2</th>
      <th>col3</th>
      <th>col4</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>2</td>
      <td>3</td>
      <td>4</td>
    </tr>
    <tr>
      <th>1</th>
      <td>5</td>
      <td>6</td>
      <td>7</td>
      <td>8</td>
    </tr>
    <tr>
      <th>2</th>
      <td>9</td>
      <td>10</td>
      <td>11</td>
      <td>12</td>
    </tr>
  </tbody>
</table>
</div>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">

<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">df</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">legend</span><span class="p">(</span><span class="n">df</span><span class="o">.</span><span class="n">columns</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">show</span><span class="p">()</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">

<div class="output_area">



<div class="output_png output_subarea ">
<img src="{{ site.gdrive_url_prefix }}1DVcquKL6H9UpwlGdsLWERY98nohgpq_i">
</div>

</div>

</div>
</div>

</div>
    </div>
  </div>

{% endraw %}
```
</div>

### 8-2. iframe을 넣은 포스트

`<iframe>`을 넣을 포스트는 그 무엇이든 상관이 없다.
왜냐면 앞서 설명한대로 `<iframe>` 태그 특성에 의해 Jupyter Notebook의 내용은 부모에게서 독립된 HTML이 될 것이기 때문이다.

대충 아래와 같이 간단한 포스트를 만든다고 가정한다.

````
```
```
포스트 입니다.

아래는 Jupyter Notebook 코드 입니다.

<iframe id="frame1" name="frame1" src="/assets/iframes/jupyter-notebooks/2021-01-07-simple/">Faild to load.</iframe>
````

위에 보이는 `<iframe>` 태그에 Jupyter Notebook 코드가 들어가게된다.

이때 `<iframe>` 을 만들때 항상 `id`, `name` 속성을 넣어주고 두 값을 같은 값으로 만들어준다.<br/>
이것은 [7-1. Jekyll Layout: Jupyter Notebook](#7-1-jekyll-layout-jupyter-notebook)에서 설명했던,
부모와 자식이 독립되어 `<iframe>`에 스크롤바가 생기는 문제를 해결하는 스크립트에서 사용한다.

## 9. 이미지는 파일에 임베드 하지 말자

맨 위에서 nbconvert 변환할 때 [변환 파일 안에 이미지 바이너리 데이터가 통째로 박혀있는 것](#image-encoded-base64)을
보인바 있다.<br/>
하지만 이미지는 기본적으로 용량이 크다. 이것은 Git Repository 용량에 부담이 되므로 '다른 이름으로 저장'한다음
다른 곳에 넣어놓고 가져오자.

![Jupyter Notebook Image Save as ...]({{ site.gdrive_url_prefix }}18WSTxnNy-9uvvcjbeT--t8f6CzXQ8rlg)

참고로 나는 구글 드라이브에 업로드 시켜놓고 가져온다.<br/>
위 섹션 [8-1. Jupyter Notebook Iframe](#8-1-jupyter-notebook-iframe) 내용 중에
`<img>` 태그의 `src` 값을 구글 드라이브 링크로 바꾸었다.<br/>

## 결과

위 작업을 한 결과가 어떤지 보여주기 위해 이 포스트에 [샘플](#1-샘플)을 과정대로 진행해서 iframe으로 아래처럼 담아보았다.

```html
<iframe id="f1" name="f1" src="/assets/iframes/jupyter-notebooks/2021-01-07-simple/">Jupyter Notebook</iframe>
```

라고 포스트에 넣으면 아래처럼 나오게된다.

<iframe id="f1" name="f1" src="/assets/iframes/jupyter-notebooks/2021-01-07-simple/">Jupyter Notebook</iframe>

이번 포스트는 양이 매우 많았다...

__마치며:__<br/>
Jupyter Notebook을 Jekyll 블로그에 넣는 방법에 대해 문의주신 Liam427 님께 감사드립니다~<br/>
더 완벽한 답을 드리려고 하다보니 이것저것 내용이 많아졌네요..<br/>
이 글을 통해 문제를 해결하셨으면 좋겠습니다! 새해복 많이 받으세요~
