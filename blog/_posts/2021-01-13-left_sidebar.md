---
layout: single
title: "[Git Page Jekyll Blog 만들기] - [13] 왼쪽 사이드바 만들기 (기본)"
post-order: 13
date: "2021-01-13 22:01:00 +0900"
last_modified_at: "2021-01-13 22:01:00 +0900"
---
내 블로그의 데스크탑 웹에서 제일 왼쪽에 또는 모바일 웹에서 Topbar 다음으로 위쪽에 항상 표시되는 사이드바를 만들자.<br/>
이 포스트는 `Minimal-Mistakes Jekyll Theme`을 사용하는 블로그를 기준으로 설명한다.

## Requirement

Jekyll, YAML

# `Minimal-Mistakes` 사이드바

우리는 <strong>Minimal-Mistakes Jekyll Theme</strong>에서 제공하는 사이드바 옵션을 이용해서 왼쪽 사이드바를 만들 것이다.<br/>
테마 자체에서 사이드바 기능을 제공하므로 만드는 방법은 아주 간단하다.

## 1. 기본 화면

맨 처음 Minimal-Mistakes Jekyll 테마를 가지고 Jekyll 블로그 서버를 빌드하자.
혹시 Jekyll로 블로그를 만드는 방법을 잘 모른다면 이 포스트의 시리즈인 `[Git Page Jekyll Blog 만들기]`
[시리즈]({{ site.baseurl }}/blog/)를 처음부터 보자.

```bash
bundle exec jekyll serve
```

그리고 접속해 보면 아래와 같은 화면이 나온다.

화면의 가장 왼쪽을 보면 사이드바라고 하기엔 부족하지만 아래 3가지 정보가 보이게 되어있다.

* Your Name: `_config.yml` 파일에 입력한 내 이름
* Bio ("I am an __anmazing__ person"): `_config.yml` 파일에 입력한 나에 대한 설명
* <i class="fas fa-fw fa-map-marker-alt"></i>Somewhere : `_config.yml` 파일에 입력한 내 위치

![Minimal-Mistakes Jekyll Theme Initial Web]({{ site.gdrive_url_prefix }}1IgGH27OceBtalYB6pT_hMDobOYf6L_Oh)

그리고 Topbar에 있는 메뉴들을 눈여겨 보자. Minimal-Mistakes Theme에서 제공하는 샘플 메뉴들인데
다음 과정을 진행하면서 이 메뉴들이 사이드바에 나오도록 할 것이다.

## 2. 사이드바 옵션 설정

### 머리말 변수 입력

사이드바 옵션을 설정하려면 페이지나 포스트에 아래와 같은 머리말 변수가 있으면 된다.

```yaml
---
author_profile: true
sidebar:
  nav: "[사이드바 정보를 담은 YAML 오브젝트명]"
---
```

위 코드에서 `author_profile`은 사이드바 자체를 보이게 할지 말지를 결정한다. 여기에 `false`를 주면 사이드바가 아예 사라진다.

`sidebar.nav`의 값인 `[사이드바 정보를 담은 YAML 오브젝트명]`은 `_data/navigation.yml` 경로의 파일에 들어있다.

`_data` 디렉토리는 말그대로 블로그에서 사용할 각종 데이터를 저장해두는 디렉토리이다.

`navigation.yml` 파일은 navigation 정보를 데이터로 저장해둔다.
그리고 그 파일엔 Minimal-Mistakes 테마에서 만든 "main" 오브젝트가 있다.

이 "main" 오브젝트는 [1. 기본 화면](#1-기본-화면)에서 설명했던 Topbar에 나오는 메뉴에 대한 정보를 담고 있다.

![Navigation File]({{ site.gdrive_url_prefix }}1E1e2huWGo3t-c5w2sfqszgAY7b_uA1Qc)

만약 `navigation.yml` 파일에 "main" 오브젝트가 없다면 연습을 위해
같은 내용을 `navigation.yml` 파일에 넣자. 편의를 위해 아래 텍스트를 복붙해서 사용하자. ^^

```yaml
# main links
main:
  - title: "Quick-Start Guide"
    url: https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/
  - title: "About"
    url: https://mmistakes.github.io/minimal-mistakes/about/
  - title: "Sample Posts"
    url: /year-archive/
  - title: "Sample Collections"
    url: /collection-archive/
  - title: "Sitemap"
    url: /sitemap/
```

### 테스트

이제 실험을 위해 이 "main" 오브젝트의 정보가 사이드바에도 나오도록 할 것이다. 포스트나 페이지의 머리말을 아래처럼 만들자.

```yaml
---
author_profile: true
sidebar:
  nav: "main"
---
```

그런다음 Jekyll이 블로그를 다시 빌드하고 브라우저를 새로고침하자 그러면 사이드바에 아래와 같은 내용이 생긴다.<br/>
(포스트나 페이지의 머리말이므로 아마 메인 화면에서는 안나올 것이다. 머리말을 작성한 포스트나 페이지에서 새로고침 하자.)

![Left Sidebar on Desktop Web]({{ site.gdrive_url_prefix }}1P2kli0rOKMkQ98LZN-D3qouEE3Cu9lAf)

위 처럼 사이드바에 새롭게 나타난 메뉴를 클릭하면 `navigation.yml` 파일의 `main` 오브젝트의 `url` 정보로 연결된다.

또 모바일 사이드의 웹에서도 아래 그림처럼 반응형으로 잘 작동한다.

![Left Sidebar on Mobile Web]({{ site.gdrive_url_prefix }}1v342cKAMa-e39roIL716z_-aLk2GVZaf)

`Toggle menu`라는 버튼으로 사이드바 메뉴를 접고 펼수 있다.

## 참고

우리는 테스트를 위해 머리말을 페이지나 포스트에 직접 입력했다.<br/>
하지만 앞으로 내 블로그에서 사이드바가 항상 나오도록 하려면 Jekyll 설정에서 default 값을 세팅해주는 작업이 필요하다.

그 방법은 이전 포스트
[[Git Page Jekyll Blog 만들기] - [2] Jekyll과 mmistakes의 config]({{ site.baseurl }}/blog/mmistakes_config/#defaults)
의 내용을 참고하자.
