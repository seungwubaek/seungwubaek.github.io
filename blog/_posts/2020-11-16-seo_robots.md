---
layout: single
title: "[Git Page Jekyll Blog] - [5] 검색 엔진에 노출 시키기 (SEO, robots 등)"
post-order: 5
date: "2020-11-16 00:00:00 +0900"
last_modified_at: "2021-02-04 15:27:00 +0900"
---
내 블로그를 검색 엔진에 효과적으로 노출시키기 위한 SEO(검색 엔진 최적화), robots.txt, sitemap.xml에 대해 알아보자.
이들은 검색 엔진의 Crawler가 내 블로그를 탐색 할 수 있도록 허락하고 내 블로그 사이트를 외부로 효과적으로 노출시켜서
적절한 사용자들이 정보를 찾아 유입될 수 있도록 한다.

# SEO

SEO란 Search Engine Optimization의 약자로, 한국어로는 검색 엔진 최적화이다. 검색 엔진을 위해 내 사이트를 최적화 한다는 뜻이다.

인터넷 공간은 크기를 가늠할 수 없을 만큼 어마어마하다. 그런 공간 속에서 어떻게 다른 사람들이 내 사이트의 작은 외침을 듣게 할 수 있을까?

그렇게 하기위해, 유명한 검색 엔진들에게 내 사이트의 존재를 올바로 알려야한다.<br/>
검색 엔진이 내 사이트의 존재를 알고 어떤 내용을 담고 있는지 안다면 다른 사람들이 내 블로그의 존재와 URL이 뭔지 알지 못하더라도
검색 엔진이 내 사이트에서 검색 키워드와 관련된 내용을 가진 페이지를 사용자들에게 제공할 것이다.

<div class="notice--info" markdown="1">
#### Crawler
{: class="no_toc"}

보통 인터넷에 있는 데이터를 수집할때는 Crawler(크롤러)라고 하는 프로그램을 사용한다.<br/>
Crawler란 한국어로는 '기어다니는 자'라는 뜻인데 실제로는 인터넷 공간의 링크들을 따라 떠돌아 다니면서 HTML을 읽고 그 안의 텍스트나 각종 미디어 데이터를 수집하는 프로그램을 의미한다.<br/>
인터넷에는 아주 많고 다양한 종류의 Crawler가 돌아다니고 있고 검색 엔진 또한 검색 결과 제공에 필요한 데이터를 저장하기위해 고유 Crawler를 가지고 있다.
</div>

검색 엔진들은 자세히 공개하진 않지만 고유 Crawler의 데이터 수집 정책과 검색 알고리즘을 가지고 있다. 따라서 우리의 사이트를 Naver, Google 등 유명한 검색 엔진에 올바로 알리기 위해서는 그들 각자가 가진 데이터 수집 정책에 알맞게 사이트를 구성해야한다. <span class='md-monologue'>갑에게 허리를 숙이는 을처럼..</span>

예를들어, `<head>` 태그 안에는 `<meta>` 태그들이 있는데 그 태그에는 블로그의 `title`, `description` 뿐만 아니라 블로그를 대표하는 이미지까지, 사이트와 페이지에 대한 다양한 메타 데이터가 들어간다. 때문에 Crawler에게 이러한 메타 정보는 사이트와 페이지를 빠르게 파악하는데 아주 좋은 요소가 된다. 따라서 우리 사이트가 Crawler와 검색엔진의 눈에 잘 띄게 하기 위해서는 이런 메타 정보를 '잘' 입력해 놓아야만 한다.

좀 더 직관적이고 자세히 어떤것들이 있는지는 [이 사이트](https://blog.usefulparadigm.com/%EA%B2%80%EC%83%89%EC%97%94%EC%A7%84%EC%B5%9C%EC%A0%81%ED%99%94-seo-%EC%89%AC%EC%9A%B4-%EA%B0%80%EC%9D%B4%EB%93%9C-f003911b0a79)에 이해하기 쉽게 나와있다. 참조하면 좋을것 같다.

## 고급 SEO: 구조화된 데이터

블로그 페이지의 구조를 일정 형식을 갖추어 만들면 구글 검색 등에서 검색 결과를 사용자에게 보여줄때
더 이해하기 쉽고 체계적으로 보여줄 수 있다고 한다.

따라서, 내 생각에는 사용자의 Query에 부응하기 위해 잘 구조화 돼 있는 페이지가 더 쉽게 노출될 수 있을 것 같다.

페이지의 구조가 될 수 있는 타입은 다양한데, <https://schema.org>에 정의돼 있다.
구글을 비롯한 대부분의 검색 엔진은 해당 사이트에 정의되어 있는 구조를 권장 하는 것 같다.

구글 검색 센터의 내용 <https://developers.google.com/search/docs/data-types/article?hl=ko>을 보면
페이지의 구조 종류에 따른 가이드가 나와있는데 그 중 우리는 `article` 구조를 활용한다.

### 페이지 본문 구조: `Article`

내 페이지의 소스를 보면 본문이 시작하는 태그가 다음과 같이 되어 있다.

```html
<article class="page" itemscope="" itemtype="https://schema.org/CreativeWork" style="height: auto !important;">
  <meta itemprop="headline" content="[Git Page Jekyll Blog] - [5] 검색 엔진에 노출 시키기 (SEO, robots 등)">
  <meta itemprop="description" content="내 블로그를 검색 엔진에 효과적으로 노출시키기 위한 SEO(검색 엔진 최적화), robots.txt, sitemap.xml에 대해 알아보자. 이들은 검색 엔진의 Crawler가 내 블로그를 탐색 할 수 있도록 허락하고 내 블로그 사이트를 외부로 효과적으로 노출시켜서 적절한 사용자들이 정보를 찾아 유입될 수 있도록 한다.">
  <meta itemprop="datePublished" content="2020-11-16T00:00:00+09:00">
  <meta itemprop="dateModified" content="2020-11-17T15:31:00+09:00">
  ...
```

본문은 `<article>` 태그로 시작한다. 이 태그는 블로그, 매거진, 뉴스 기사 등의 내용을 담는다.
(<https://developer.mozilla.org/ko/docs/Web/HTML/Element/article>)<br/>
따라서 검색 엔진에게 해당 태그의 내용이 페이지의 주요 내용임을 알릴 수 있다.

또 `<article>` 태그의 속성 `itemtype`의 값은 `https://schema.org/CreativeWork`으로 되어 있다.
`CreativeWork`는 책, 영화, 사진, 소프트웨어 프로그램 등의 정보를 다루는 페이지 구조를 의미한다. (<https://schema.org/CreativeWork>)

그다음 내부를 보면 `<meta>` 태그의 속성 `itemprop`이 있고 각각 `headline`, `description`, `datePublished`, `dateModified`를 값으로 가진다.
각각 페이지의 제목, 설명, 출간 일자, 수정 일자를 의미한다.

이때 날짜의 경우 [ISO8601 포맷](https://ko.wikipedia.org/wiki/ISO_8601)에 따라 작성되어야 한다.

* 예: `2020-11-16T00:00:00+09:00`

### 탐색경로

내 블로그의 모든 페이지 본문의 상단에는 경로가 명시돼 있다. 이 경로를 이용해, 현재 페이지의 상위 카테고리로 쉽게 이동 할 수 있다.

구조화된 데이터의 종류에는 이런 '페이지 경로 구조'도 포함된다. (<https://developers.google.com/search/docs/data-types/breadcrumb?hl=ko#microdata>)

이것의 구현을 위해 내 블로그의 `Breadcrumb`은 다음과 같은 소스로 구현된다.

```html
<nav class="breadcrumbs">
  <ol itemscope itemtype="https://schema.org/BreadcrumbList">
  ...
  <li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem">
    <a href="https://seungwubaek.github.io/" itemprop="item"><span itemprop="name">Home</span></a>
    <meta itemprop="position" content="1">
  </li>
  <li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem">
    <a href="/blog" itemprop="item"><span itemprop="name">Blog</span></a>
    <meta itemprop="position" content="2">
  </li>
  ...
```

`<nav>` 태그를 이용해서 해당 내용이 Navigation에 대한 내용임을 알린다.

탐색경로는 `itemtype` 속성의 값으로 `https://schema.org/BreadcrumbList`를 가지는 `<ol>` 태그로 시작한다.<br/>
그 하위에는 `itemtype` 속성의 값으로 `https://schema.org/ListItem`을 가지는 `<li>` 태그가 오도록 하고
페이지가 속한 최상위 카테고리부터 순서대로 `<meta>` 태그에 `itemprop="position" content="1"` 속성의 `content`를 1씩 늘려가며
배치한다.

위 [페이지 본문 구조 `Article`](#페이지-본문-구조-article)과 [탐색경로](#탐색경로)의 구현은 일일히 HTML을 작성한 것이 아니며
Liquid 템플릿 언어를 활용해서 모든 페이지에서 동일하게 작동하게끔 자동화 되어있다.

Minimal-Mistakes 테마에는 이 자동화를 비롯해 OpenGraph 등 다양한 SEO가 구현되어있다.
내 블로그도 Minimal-Mistakes 테마를 사용하는 중이며 일부 커스텀된 소스를 아래에서 참조하자.

* 페이지 본문 구조: <https://github.com/seungwubaek/seungwubaek.github.io/blob/master/_layouts/single.html>
* 탐색경로: <https://github.com/seungwubaek/seungwubaek.github.io/blob/master/_includes/my-breadcrumbs.html>

# robots.txt

Crawler는 내 사이트에 있는 텍스트와 이미지 데이터들을 수집해간다. 이때 Crawler들이 내 블로그에서 수집 할 수 있는 정보의 제한에 대해 정의한 파일이 `robots.txt`이다.<br/>
내 블로그는 모두 공개 되어있으므로 특별한 제한이 없다. 따라서 블로그 최상위 경로에 `/robots.txt` 파일을 만들고 아래와 같이 입력한다.

```
User-agent: *
Allow: /
Sitemap: https://[내 블로그 url]/sitemap.xml
```

모든 Crawler(`User-agent: *`)에게 모든 것(`Allow: /`)을 공개한다는 의미이다.

다만 이 제한은 말 뿐이다. 선량한 Crawler는 제한을 성실히 지킬것이고 악성 Crawler는 멋대로 굴것이다. 따라서 별도의 장치 없이는 제한한 결과가 오히려 더 좋지 못할 수 있다.

# sitemap.xml

위 항목 `robots.txt` 파일의 내용을 보면 `Sitemap`이라는 키워드가 있다. 그 키워드의 값으로 `sitemap.xml` 파일 경로를 입력한다. `sitemap.xml`이라는 파일은 내 블로그에 존해하는 모든 페이지들의 URL을 한곳에 모아서 보여주는 파일이다. 이 파일의 정보를 통해 사용자와 Crawler는 블로그의 전체 구조를 쉽고 빠르게 이해할 수 있다.

이 파일은 내가 직접 만들수도 있지만 `jekyll plugin`을 이용해서 자동화 할 수 있다. mmistakes 테마를 사용하면 해당 플러그인이 내장 되어있다.

## 옵션1. mmistakes 테마를 사용하지 않음

`/_config.yml` 파일에 아래 내용이 있음을 확인하자.

```yml
plugins:
  - jekyll-sitemap
```

또 `/Gemfile` 파일에 아래 내용이 있음을 확인하자.<br/>

```gemfile
group :jekyll_plugins do
  gem "jekyll-sitemap"
end
```

## 옵션2. mmistakes 테마를 사용함

mmistakes 테마를 사용하는 경우 `/Gemfile` 안에 `gem "minimal-mistakes-jekyll"`이 있을 것이다. 그러면 그 플러그인에 `jekyll-sitemap` 플러그인이 내장 되어있으므로, [옵션1](#옵션1-mmistakes-테마를-사용하지-않음)과 같이 따로 설정하지 않아도 된다.

여기까지 했다면 Jekyll이 서버를 빌드 할 때 `/_site/sitemap.xml`이 자동 생성된다. 내가 직접 만든 파일이 아니므로 Jekyll 빌드 결과 디렉토리인 `/_site` 디렉토리에 생성된다.

브라우저 주소창에 `https://[내 블로그 url]/sitemap.xml` 이라고 입력하면 아래 그림처럼 자동 생성된 내용을 볼 수 있다.

![sitemap.xml]({{ site.gdrive_url_prefix }}12LItOXiHhquv9_eWsASLQc143UU5O7yW)
