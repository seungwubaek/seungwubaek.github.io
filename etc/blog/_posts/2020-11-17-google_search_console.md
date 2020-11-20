---
layout: single
title: "[Git Page로 Blog 만들기] - [7] Goole Search Console 연동"
post-order: 7
date: "2020-11-17 17:16:00 +0900"
last_modified_at: "2020-11-17 17:16:00 +0900"
---
Google Search Console은 구글 검색 엔진에 노출 시킬 수 있게하고 내 사이트에 대한 검색 통계를 제공해준다.
또한 구글 Crawler에게 내 블로그의 존재를 알려서 보다 효과적으로 구글 검색 엔진이 내 블로그를 인식할 수 있도록 한다.

## Google Search Console에 내 사이트 등록

먼저 구글에 'Search Console'이라고 검색해서 Google Search Console 첫화면으로 간다. 아래와 같은 화면에서 왼쪽의 '도메인'은 여러 사이트를 여러 도메인으로 묶은 대형 서버를 위한 서비스인 것 같다. 우리는 우리 사이트 1개에 대해서만 작업할 것이므로 오른쪽의 '__URL 접두어__' 를 선택한다.

URL 입력란에 `https://[내 블로그 URL].github.io` 를 넣자.

![Google Search Console - Welcome to Google Search Console]({{ site.gdrive_url_prefix }}1EIJpEzBAfNETkYROzbpTw5HTSO29236k)

그러면 소유권 확인이라는 페이지가 나온다. 위에서 지정한 URL이 내 것이 맞는지 확인하는 곳이다.

이 페이지의 설명 대로라면 HTML을 다운로드 받아서 내 블로그 최상위 경로에 놓으면 된다. 그렇게 해도 되겠지만 mmistakes 테마를 쓰므로 다른 방법으로 진행하자.

![Google Search Console - Site Verification]({{ site.gdrive_url_prefix }}1KSeylvUJO6bChwDzjPwHULGPFDTlL7z-)

다른 확인 방법 중에 'HTML 태그' 방법이 있다. 이곳에는 `<head>` 태그 안에 `<meta>` 태그를 하나 넣으라고 되어있다. 이 `<meta>` 태그의 내용은 사실 바로 위에서 다운로드 받는 HTML 파일의 내용과 똑같다.

`<meta>` 태그 안에 `content` 속성의 값인 긴 Hash 값을 복사하자. 이것이 내 사이트의 소유권 증명 코드이다.

![Google Search Console - Site Verification (Other method)]({{ site.gdrive_url_prefix }}1qPGb5vrRiUATmMmOewY-znQj2Zz_UfMo)

이제 `_config.yml` 파일로 가면 `google_site_verification`이라는 키가 있다. 그곳에 위에서 복사한 소유권 증명 코드를 붙여넣자.<br/>
아래 사진에 보이는 것과 같이 Google Search Console 뿐만 아니라 bing, yandex, naver의 증명 코드도 있다. 이런 과정을 통해 여러 검색 엔진의 Crawler에게 내 사이트의 존재를 알리는 것이다.

![easy insert site verification with mmistakes config]({{ site.gdrive_url_prefix }}14qcC-vw2na7di2MiUhe9sdeIs-GAJf3j)

위와 같이 설정한 이후 테스트 서버를 실행해보면 아래의 개발자 도구(<kbd>F12</kbd>) 캡쳐 그림에서 맨 아래에 `<meta name="google-site-verification">`이라는 메타 태그가 들어간 것을 볼수있다.

![google-site-verification meta tag in my site head]({{ site.gdrive_url_prefix }}19mDW7vBZJst2KZaSwTDiJk-BrlY-ezaN)

그리고 다시 Google Search Console 등록 화면에서 '확인' 버튼을 누르면 구글은 내 페이지에서 `<meta>` 태그에 있는 `google-site-verification` 값을 찾고 정상적으로 완료되면 아래와 같은 창을 볼수 있다.

![Google Search Console - complete site verification]({{ site.gdrive_url_prefix }}1uK_hN1u_Y6IDD5cEIPYDwJvObGdv3i_I)

여기까지 Google Search Console 등록이 완료되었다.

## Google Analytics에 연결

Google Search Console 연동은 위 섹션 [Google Search Console에 내 사이트 등록](#google-search-console에-내-사이트-등록)을 완료한 후 할 수 있다. 그 후 UA(Google Universal Analytics)에서 진행한다.
