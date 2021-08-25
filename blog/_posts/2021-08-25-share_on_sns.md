---
layout: single
title: "[Git Page Jekyll Blog] - [15] 포스트 공유하기: Facebook, Twitter, Linkedin"
post-order: 15
date: "2021-08-25 14:01:00 +0900"
last_modified_at: "2021-08-25 14:01:00 +0900"
---
이 포스트에서는 해당하는 포스트를 `Facebook`, `Twitter`, `Linkedin`에 공유하는 기능에 대해 간략히 알아본다.

내 블로그의 포스트 페이지 구조에서는 페이지의 상단과 하단의 <strong>Share on</strong> 섹션에서 공유 기능을 제공하고 있다.<br/>
<strong>Share on</strong> 섹션에는 포스팅 날짜 기준으로 5가지 공유 버튼이 존재하며 버튼을 클릭했을때 각각의 공유 기능이 수행된다.<br/>
`Copy URL`, `Kakao`, `Facebook`, `Twitter`, `Linkedin` 이들이 공유 버튼에 해당하며 이름에서 유추할 수 있듯이
URL을 복사하거나 각 플랫폼에 공유할 수 있다.

내 블로그 소스 중 <https://github.com/seungwubaek/seungwubaek.github.io/blob/master/_includes/social-share.html>을
보면 공유 버튼을 클릭했을때 어떤 기능이 수행되는지 얼추 확인해 볼 수 있다.

모바일 환경에서 `Facebook`, `Twitter`, `Linkedin` 버튼들을 클릭하면 각자의 소셜 앱으로 연결될 것이며
그 외엔 데스크톱 환경과 차이가 없으므로 이하 설명은 데스크톱 환경을 기준으로 설명한다.

이 방법에서 공유는 사용자가 공유 버튼을 클릭했을때 팝업창을 하나 띄워서 각 플랫폼이 제공하는 특정 API를 호출하고
팝업창에서 `플랫폼 로그인 -> 플랫폼에 공유`로 이어지는 과정을 수행하는 것으로 진행된다.

예를들어
<a href="https://www.facebook.com/sharer/sharer.php?u={{ page.url | absolute_url | url_encode }}" class="btn btn--facebook" onclick="window.open(this.href, 'window', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0'); return false;" title="{{ site.data.ui-text[site.locale].share_on_label | default: 'Share on' }} Facebook"><i class="fab fa-fw fa-facebook" aria-hidden="true"></i><span> Facebook</span></a>
버튼을 클릭하면, 팝업창에서 Facebook으로 로그인 한 후 내 Facebook 타임라인에 공유하게 된다.

각 플랫폼이 제공하는 API는 위에 링크한 내
[블로그 소스](https://github.com/seungwubaek/seungwubaek.github.io/blob/master/_includes/social-share.html)에서
17, 19, 21번째 라인을 보면 대략 감을 잡을 수 있다.

이들은 내가 만든게 아니고 `Minimal-Mistakes` Jekyll 테마에서 구현한 것이므로 더이상의 자세한 설명은 생략하도록 한다.

어짜피 플랫폼 별 API만 알면 나머진 구현하는데 크게 어려운 점은 없다.
