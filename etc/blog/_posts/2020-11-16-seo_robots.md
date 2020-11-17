---
layout: single
title: "[Git Page로 Blog 만들기] - [5] SEO (검색 사이트에 노출 시키기)"
post-order: 5
date: "2020-11-16 00:00:00 +0900"
last_modified_at: "2020-11-17 15:31:00 +0900"
---

Crawler들이 내 블로그를 탐색 할 수 있도록 허락하고 내 블로그 사이트를 외부로 노출시켜서 인터넷 사용자들이 유입될 수 있도록 한다.

# SEO

SEO란 Search Engine Optimization의 약자로, 한국어로는 검색 엔진 최적화이다. 검색 엔진을 위해 내 사이트를 최적화 한다는 뜻이다.

인터넷 공간은 크기를 가늠할 수 없을 만큼 어마어마하다. 그런 공간 속에서 어떻게 다른 사람들이 내 사이트의 작은 외침을 듣게 할 수 있을까?

그렇게 하기위해, 유명한 검색 엔진들에게 내 사이트의 존재를 올바로 알려야한다.<br/>검색 엔진이 내 사이트의 존재를 안다면, 다른 사람들이 내 사이트가 존재 하는지, URL은 뭔지 알지 못하더라도 그들이 검색 엔진에서 어떤 키워드를 검색했을때 검색 엔진은 내 사이트에서 해당 키워드와 관련된 페이지를 검색 결과로 제공할 것이다.

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

![]({{ page.gdrive_url_prefix }}12LItOXiHhquv9_eWsASLQc143UU5O7yW)
