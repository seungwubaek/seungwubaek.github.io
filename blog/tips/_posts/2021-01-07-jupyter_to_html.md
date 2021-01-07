---
layout: single
title: "Jupyter Notebook 화면을 블로그로 가져오기"
date: "2021-01-07 09:18:00 +0900"
last_modified_at: "2021-01-07 09:18:00 +0900"
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
3. 방금 만든 layout을 가지는 HTML 파일(/assets/iframes/jupyter-notebook/simple.html)을 하나 만들고
   nbconvert로 변환했던 HTML에서 `<head>` 내용만 제외하고 복붙한다.(`<head>`는 layout에 들어있게 할것)
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
<span class="md-monologue">그러면서 화면 가로 사이즈가 좁을까봐 두줄로 씀.. ㅋㅋ 반응형 웹의 생활화!</span>

```bash
jupyter nbconvert --to html --template classic --no-prompt \
                  --output hello_simple.html ./simple.ipynb
```

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

그리고 이 변환된 HTML 파일은 전체 줄수가 13277 라인이라고 한다.

![Converted File Length]({{ site.gdrive_url_prefix }}1DfY0tnw735r3eu6-x6asARRCC4hCUyT2)

근데 그중 내가 작성한 셀 내용은 맨 아래에 100줄 정도가 다 이다.

내 다른 포스트의 용량이 대충 5~20KB 인데 반해, 이 변환된 HTML 파일은 300KB에 달한다.
이런 파일을 Notebook을 작성할 때마다 블로그에 포스팅 하면 Git Repository에서 차지하는 용량이 너무 커진다.

### 4-2. 변환 HTML 파일을 블로그로 옮기기 위한 설계

여기서 잠깐 생각 타임. 위와 같은 방대한 양의 변환 파일을 어떻게 효과적으로 블로그로 옮길지 설계를 하자.

Jupyter Notebook을 사용해본 사람은 짐작 할 수 있겠지만 위의 Javascript, CSS 부분은 Jupyter Notebooke의 UI를 꾸미는데
사용하는 것이기 때문에 Jupyter Notebook의 코드 실행과는 상관이 없다.<br/>
따라서 셀의 코드 내용과는 무관하게 모든 Notebook 파일에서 항상 동일할 것이라 예상 할 수 있다.

그렇다면 동일하게 반복될거라 예상되는 Javascript, CSS 부분만 들어내서 Jupyter Notebook 전용의 Jekyll Layout으로 만들자.<br/>
그리고 Git Repository 용량을 아끼기 위해 Jupyter Notebook을 포스팅 할 때 마다 1만3천줄에 달하는 CSS를 추가하지 말고
`<stylesheet>` 태그를 이용해서 주소로 대체한다.<br/>
그리고 클라이언트의 요청 때 전송해주면 클라이언트가 CSS를 받아서 마저 처리하게끔 한다.

![HandShake for Stylesheet]({{ site.gdrive_url_prefix }}1d3hBw-a3lG8kLSrI5dH2BM2F8i6UnfoN)

위 그림처럼 유저가 Jupyter Notebook 포스트를 요청하면 CSS가 빠져있는 Post 페이지만 준다.
대신 CSS가 서버의 어디에 있는지 주소만 알려준다.<br/>
그러면 유저는 서버의 그 주소에 있는 CSS 파일을 달라고 다시 한번 요청한다. 그럼 그때서야 서버는 CSS를 보내준다.

이렇게 하면 서버는 포스트 파일 마다 똑같은 CSS를 붙일 필요가 없어지고 별도로 1개 CSS 파일만 가지고 있으면 되기 때문에
새로운 Notebook이 있을때 마다 Jekyll Layout은 유지한 채로 셀 내용만 바꿔치기 해서
용량 낭비를 줄이고 포스트를 효율적으로 뽑을 수 있을 것이다.

다음으로 이런 Javascript, CSS들은 그럼 어디서 가져오면 되는걸까?
바로 다음 섹션에서 설명 할 nbconvert에서 찾아볼 수 있다.

## 5. nbconvert 상세

위 섹션의 Javascript, CSS를 얻기 위해 nbconvert가 작업한 내용을 뜯어보자.

### 5-1. command parameter

`jupter nbconvert`로 Jupyter Notebook 파일을 HTML로 변환 할때 파라미터들은 아래와 같다

* `--to`<br/>
  목적 파일을 어떤 형태로 변환시킬건지를 의미한다. 우리는 `html`로 변경할것이다. 그외에도 help를 쳐보면
  `markdown`, `asciidoc`, `custom`, `latex`, `notebook`, `pdf`, `python`, `rst`, `script`, `slides`, `webpdf` 들이
  가능하다고 나온다.<br/>
  `markdown`도 쓸만할 것 같지만 나중에 CSS를 적용하기 어려우므로 패스한다.
* `--template`<br/>
  변환한 HTML에 CSS와 구조를 지정해 줄 수 있다. 우리는 이 옵션 값에 `classic`을 사용한다. `classic`을 사용하면
  Jupyter Notebook Web에서 보던 화면과 똑같은 스타일과 구조의 디자인을 만들 수 있다.
* `--no-prompt`<br/>
  Jupyter Notebook Web에서 셀을 실행하면 `In[1]`, `Out[1]` 등 셀 왼쪽에 In/Out 자동 넘버링이 된다.
  이때 이 옵션을 붙이면 자동 넘버링을 해제 할 수 있다. 쓸지 말지는 자유.
* `--output`<br/>
  변환할 파일의 파일명을 지정해 줄 수 있다. 이 옵션을 쓰지 않으면 원본 파일명에 확장자만 `html`로 변환된다.
* `./simple.ipynb`<br/>
  변형 대상 파일의 경로이다

다른 옵션도 여러가지 있는데
<https://nbconvert.readthedocs.io/en/latest/config_options.html#cli-flags-and-aliases>
이곳을 참조하자.

### 5-2. template 템플릿

nbconvert가 가진 template에 대해 좀 더 살펴보자.

template을 이용해서 변환 내용의 구조와 CSS를 변형 시킬수 있다.
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

살짝 빛이 보이는 것 같다. template의 코드를 추적해서 Javascript와 CSS를 얻어보자.

일단 아래 경로에서 세번째 영역에 나와있는 CSS 파일 중 하나를 얻을 수 있다!

![nbconvert template classic style css location]({{ site.gdrive_url_prefix }}1U3IbPL0N7aYHuvDZw3tpLMxRc3idUkdt)

세번째 영역의 CSS 파일을 제외하곤 양이 많지 않으므로 나머지는 그대로 복붙하기로 한다.

## 6. 문제점

CSS 충돌

## 7. Jekyll Layout 만들기

## 8. 이미지는 파일에 임베드 하지 말자

![Jupyter Notebook Image Save as ...]({{ site.gdrive_url_prefix }}18WSTxnNy-9uvvcjbeT--t8f6CzXQ8rlg)

## 결과

<iframe src="/assets/iframes/jupyter-notebooks/2021-01-07-simple/" class="width-100-100">Jupyter Notebook</iframe>
