---
layout: single
title: "[Git Page로 Blog 만들기] - [8] 첫번째 포스트 게시하기"
post-order: 8
date: "2020-11-17 23:52:07 +0900"
last_modified_at: "2020-11-17 23:52:07 +0900"
---
포스트를 게시하는 법을 알아보자. 아주아주 간단하다. 이 주제를 먼저 다뤘어야 하는데, 사이트를 실행하고 환경을 구성하는데에만 어느새 7개의 포스트를 썼다...
지금이라도 간단히 포스트를 만들어보자.

# Markdown

Markdown이란 HTML과 같은 마크업 언어이다. Markdown 언어로 된 문서는 확장자가 `md`이다. 또 Markdown 사용 목적은 딱딱한 일반 텍스트에 쉽고 빠르게 스타일을 적용하기 위함이기 때문에 그 문법은 HTML 보다는 훨씬 쉽다. Jekyll의 포스트는 HTML이나 이 Markdown 언어를 이용해서 작성된다. 엄밀히 말하면 Markdown 언어로 작성한 문서를 Jekyll이 HTML 문서로 변환한다.

Markdown의 문법은 구글링으로 통해 쉽게 찾아볼수 있는데 급하다면 여기 [블로그](https://heropy.blog/2017/09/30/markdown/)와 [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)를 찾아보면 된다.

일단은 한번 빠르게 읽어보자. 그리고 직접 Markdown으로 포스트를 작성하면서 익히는게 가장 빠르다. '어떤 스타일을 적용하고 싶은데 기억이 안난다' 할때 마다 Markdown Cheatsheet를 찾아보면 좋을것이다.

## Markdown Style Case

Markdown Style의 몇가지 Case를 보고 넘어가자

### Header (대주제, 소주제 등)
문단의 주제를 표현하기 위해 큰 글귀, 조금 큰 글귀 등을 적을 수 있다. 글 앞에 # 을 붙이면 되고 적게 붙일수록 상위 주제를 의미한다. 보통 최상위 1부터 6단계 소주제까지 표현 가능하다.<br/>
내 포스트에서는 1, 2단계 헤더에 약간 스타일의 변형을 적용했다.<br/>
특히 주제는 HTML로 변형될때 `<h1 id="주제명">` 형태로 `id` 속성이 추가 되어 해당 주제의 위치로 이동하려할 때(navigation)에 유용하다.

# # 제일 큼
{: class="no_toc"}
## ## 두번째
{: class="no_toc"}
#### ### 네번째
{: class="no_toc"}
###### ###### 여섯번째
{: class="no_toc"}

&nbsp;

### Bold(굵은 글씨)

어떤 글자를 Bold로 표현하기 위해서는 글자 앞뒤로 __(언더바 2개)를 붙인다.

__\_\_굵은 글씨\_\___

### Italic(기울임꼴)

기울임꼴 글자를 표현하기 위해서는 글자 앞위로 _(언더바 1개)를 붙인다.

_\_기울임꼴\__

### Inline Code (한 줄 코드)

내가 쓴 글에서 특정 단어가 코드의 일부 임을 말하고 싶을때, `(backtick)으로 글을 감싼다.

코드를 `` `print('코드입니다')` `` 이렇게 줄 사이에 넣는다.

### Code Block(코드 블록)

한 줄 짜리 코드가 아니라 코드로 된 단락을 만드려면 코드로 작성할 단락의 위와 아래를 ```(backtick 3개)로 감싼다.

````
```
def main():
  print('이곳은 코드를 작성하는 영역입니다.')
  exit()
```
````

### Code Language Specific (특정 언어의 코드 블록)

코드 단락을 만들되 특정 언어만의 Highlight를 적용 할 수 있다. 코드를 감싸는 ```(backtick 3개) 중 윗줄에 언어명을 붙여쓴다.

````python
```python
def main():
    print('이곳은 코드를 작성하는 영역입니다.')
    exit()
```
````

### 링크

문서 내에 다른 곳으로 가는 링크를 걸수 있다. `[링크명](링크 URL)` 형태로 작성한다.

# 내용 작성하기

## front-matter (머릿말)

모든 포스트에 front-matter (머릿말)이라고 하는 내용이 들어가있다. 머릿말이 있어야만 Jekyll은 해당 문서를 블로그의 페이지로 인식한다. 머릿말이 없으면 해당 문서는 무시된다.

머릿말에는 페이지에 대한 여러가지 정보를 담고 있다. [블로그 만들기 첫번째 포스트]({{ site.base_url }}/etc/blog/post_1/#3-jekyll-tutorial)에서 언급했던 [Jekyll Tutorial](https://jekyllrb-ko.github.io/docs/step-by-step/01-setup/)을 진행했다면 알겠지만 포스트의 화면을 일관되게 구성하는 방법과 글로벌 변수 또는 사용자 정의 변수를 선언해서 사용할 수도 있다.

내가 머릿말에 지정해서 사용하는 설정들은 아래와 같다.

먼저, `_config.yml`에 `default`로 지정한 변수와 전역 변수이다.

```yml
defaults:  # 페이지의 머릿말에 선언하지 않아도 아래 내용들은 기본값으로 적용됨.
  - scope:
      path: ""          # 모든 경로의 페이지에 적용
      type: posts       # 포스트 타입의 페이지에 적용
    values:
      layout: single    # single 레이아웃을 적용
      author_profile: true  # 내 프로필을 사이드바에 표시함
      read_time: false      # '한 포스트를 다 읽는데 n분 걸림' 이라는 문구를 붙여주는 완독 추측 시간
      comments: true        # 댓글 기능 활성화
      share: true       # 소셜 공유 기능 활성화
      related: true     # 관련 포스트 추천 활성화
      toc: true         # 현재 페이지의 목차 보기 활성화
      sidebar:          # (내 커스텀 변수) 블로그 목차 보기
        nav: main-sidebar   # (내 커스텀 변수) /_data/navigation.yml에 main-sidebar의 내용을 정의
# (내 커스텀 기능) 구글 드라이브에서 이미지 가져오기 url 접두어
gdrive_url_prefix: "https://drive.google.com/uc?export=view&id="
```

그리고 명시적으로 표현해주어야 하거나 페이지 별로 다르게 적용돼야 하는것들은 페이지 자체 머릿말에 적는다. 이 페이지의 머릿말은 아래와 같다.

```yml
---
layout: single                                 # 페이지에 single 레이아웃을 적용
title: "[Git Page로 Blog 만들기] - [8] 첫번째 포스트 게시하기"  # 페이지 타이틀
post-order: 8                                  # (내 커스텀 변수) 같은 카테고리 내 정렬 순서
date: "2020-11-17 21:19:00 +0900"              # 최초 포스팅 날짜. 별도 정렬 순서가 없으면 이 값으로 정렬됨. 파일명에 기록되어있다면 생략 가능.
last_modified_at: "2020-11-17 21:19:00 +0900"  # 마지막 수정 날짜.
---
```

mmistakes 테마를 사용한다면 `single` 레이아웃이 내장 돼있다. 연습을 위해 위에서 `post-order`만 제외하고 비슷한 머릿말을 갖도록 포스트를 하나 만들어 보자.

Jekyll Tutorial을 보고 파일명 포맷 변경을 따로 하지 않았다면 파일명 앞에 년월일을 붙여 `YYYY-mm-DD-[파일명].md` 포맷으로 파일을 생성하자.

```yml
---
layout: sigle
title: "첫 포스트"
date: "2020-01-01 00:00:00 +0900"
last_modified_at: "2020-01-01 00:00:01 +0900"
---
```

## 일반 텍스트

머릿말 이후부터 일반 텍스트를 작성할 수 있다. 텍스트는 앞서 설명한대로 markdown 문법을 지켜가며 작성하면 된다.

연습을 위해 앞서 만든 파일에 아래와 같이 이어 써보자.

```
첫번째 포스트를 작성하고 있다.

## 소주제1

나만의 __멋진__ 블로그를 만들어야지.<br/>
화이팅!
```

## 코드

코드도 작성해보자. 코드 역시 markdown 문법의 inline code 또는 code block으로 작성할 수 있다. [위 섹션](#markdown-style-case)에서 코드에 대한 간단한 사용법을 볼 수 있다.

연습으로 아래와 같이 써보자.

````javascript
```javascript
console.log('hihi');
```
````

## 변수 사용

앞서 머릿말에 변수를 선언해서 사용할 수 있다고 했다. 이런 변수들은 liquid라는 템플릿 언어로 작동한다. 때문에 꼭 머릿말이 아니더라도 문서 중간에 사용할 수도 있다.

<div class="notice--info" markdown="1">
#### Liquid
{: class="no_toc"}
Liquid는 Ruby로 작성된 오픈소스 Template Language이다. 또한 Jekyll에서도 Liuquid 문법을 지원한다.<br/>
Liquid의 문법은 [공식 사이트](https://shopify.github.io/liquid/)에 자세히 나와있다. 영어로 되어있지만 템플릿 언어를 이용하면 HTML 문서를 더욱 풍부하게 만들수 있고 Jekyll의 많은 부분에서 Liquid를 사용하므로 영어를 두려워 말고 도전하자!
</div>

변수를 호출할때 아래와 같이 이중 중괄호로 감싸서 Liquid 코드를 호출한다. 연습으로 아래와 같이 문서에 기록해보자.

```
이 문서의 title은 '{% raw %}{{ page.title }}{% endraw %}' 이다!

다음 문서의 title은 '{% raw %}{{ page.title | append: "에 이어 두번째 포스트" }}{% endraw %}' 이다!
```

이중괄호 대신 `{- [내용] -}` 형태로 사용하면 변수의 앞뒤에 붙는 공백을 제거 할 수 있다.

## 이미지

이미지를 붙여 넣기 위해서는 위 섹션에서 설명한 [링크](#링크)와 비슷한 표현법을 사용한다. 링크 앞에 ! (느낌표)를 붙이면 된다.

`[이미지 alt](이미지가 저장된 위치 또는 URL)` 과 같이 작성한다.

이미지 alt란 인터넷 접속 끊김 등의 예기치 못한 상황으로 이미지를 올바로 표현하지 못할때 다신 나타나는 텍스트 문구이다. Google Crawler가 이 alt 속성을 크롤링 한다고 하니 반드시 적절한 키워드로 기록해두자.

나는 이미지 링크를 나의 Google Drive에서 가져온다. 깃허브에 asset으로 올릴수도 있겠지만 깃허브는 기본적으로 코드 형상 관리용이므로 이미지 용량을 저장하기에는 부담스럽다. 그러므로 15GB 무료 이용 가능한 Google Drive를 추천한다.

구글 드라이브에서 아래처럼 이미지를 공유하기 위한 폴더를 하나 만들자.

![]({{ site.gdrive_url_prefix }}1BjkkH9XxtnimSE0r17UwmCLAl8ZydLNa){: style="max-width: 400px; max-height: 500px;"}

오른쪽 버튼을 눌러 나오는 공유 버튼을 클릭한다.

![]({{ site.gdrive_url_prefix }}19MxzchtdVSXTAqpzAng18_yiF4OSkNXU){: style="max-width: 400px; max-height: 500px;"}

이때 반드시 공유 모드가 '링크가 있는 ... 모든 사용자가 볼수있음' 수준이어야 한다 그보다 높은 '편집 할 수 있음' 과 같은 상태에 놓지말자!

![]({{ site.gdrive_url_prefix }}187ysGmi_vh3WGpUwY5lcQm1Aw45wkETI){: style="max-width: 400px; max-height: 500px;"}

그리고 몇개 이미지를 업로드 한다.

![]({{ site.gdrive_url_prefix }}1-YoNEOr5_yValJHB4fDK8eE4OYKxNKQz){: style="max-width: 400px; max-height: 500px;"}

이미지의 링크를 얻기위해 업로드한 이미지를 오른쪽 클릭하고 '링크 생성' 버튼을 누른다.

![]({{ site.gdrive_url_prefix }}13NZ0kLUIw7ejb750I1Jnl0RxqScrZ-Tl){: style="max-width: 400px; max-height: 500px;"}

그리고 '링크 복사'를 눌러서 클립보드에 복사한다.

![]({{ site.gdrive_url_prefix }}1YLpW6tVoQV1eSF9WZUOAZzDXVk_pzsFs){: style="max-width: 400px; max-height: 500px;"}

이 링크를 가져오면 아래 빨간 박스처럼 URL 안에 `이미지ID`가 들어있다. 다른 URL은 필요없다. URL을 그대로 가져다 쓰면 문서 내에 인라인으로 이미지를 넣을 수 없다.

![]({{ site.gdrive_url_prefix }}1_1VsWhdR2SrQzmgsnm_tx660GUpAL8Nz){: style="max-width: 400px; max-height: 500px;"}

마지막으로 구글 드라이브 이미지 URL을

`https://drive.google.com/uc?export=view&id=이미지ID`

형태로 만든다. 그리고 그 링크 URL을

`[이미지 alt](구글 드라이브 이미지 URL)`

로 문서에 삽입한다.

이때 나는 변수를 사용한다. `이미지ID` 앞부분의 구글 접두 URL은 항상 반복되므로 `_config.yml`에 아래와 같이 설정해 놓는다.

```yml
gdrive_url_prefix: "https://drive.google.com/uc?export=view&id="
```

그리고 이제 문서에서는 이 접두 URL을 포함하여 완전한 URL로 작성할 필요 없이

`{% raw %}{{ site.gdrive_url_prefix }}{% endraw %}이미지ID`

형태로 간략화 할수있다.
