---
layout: single
title: "[Git Page로 Blog 만들기] - [12] Google AdSense 등록해서 수익 창출"
post-order: 12
date: "2021-01-12 14:38:00 +0900"
last_modified_at: "2021-01-12 14:38:00 +0900"
---
구글 애드센스 (Google AdSense)를 이용해서 내 사이트에 광고를 게시하자.
구글 애드센스는 웹 서비스를 통해 손쉽게 광고 게시를 가능케 하고
내 블로그의 방문자 통계 정보에 기반하여 광고 수익 창출을 극대화 한다.<br/>
이때 광고가 게시되는 위치와 광고의 종류 조차 갓구글에 의해 자동으로 선택된다.
물론 관리 웹을 통해 수동 조작할 수도 있다.<br/>
단, 자격을 갖춘 사이트만 AdSense 서비스를 이용할 수 있다.<br/>
Google AdSense를 등록하는 방법과 등록 자격이 무엇인지도 함께 포스트를 통해 설명하도록 한다.

![Google AdSense Home Teaser Image]({{ site.gdrive_url_prefix }}1c5QedFLad7kBWGQ9hkwctOwqCCMSgsAl){:.align-center}

AdSense 시작하기: <https://www.google.com/intl/ko_kr/adsense/start/>

# AdSense 자격 요건

AdSense가 활성화 되기 전에 아래의 항목들에 대한 검토가 요구된다.

* 만 19세 이상 신청 가능
  * 만 19세 미만인 경우는 보호자의 Google 계정으로 신청 가능
  * 단, 그 경우 수익은 보호자에게 지급됨
* 구글 [프로그램 정책](https://support.google.com/adsense/answer/48182) 준수
  * 자신의 사이트에 게시된 광고를 자신이 지속해서 클릭하는 등 광고 클릭수를 허위로 부풀리면 안됨
  * 사용자를 현혹하거나 거짓 링크를 작성하는 것으로 광고 클릭수를 부풀리면 안됨 등
* 자신이 소유한 사이트
* [소유 사이트와 AdSense 연결](https://support.google.com/adsense/answer/7036617)
* [수취인 주소 등록](https://support.google.com/adsense/answer/47333)
* [전화번호 인증](https://support.google.com/adsense/answer/2922269)
  * 전화번호 인증은 국가 또는 사람 마다 다른 것 같음
  * 나는 전에 다른 구글 서비스에서 전화번호 인증을 한 까닭인지.. 인증 요구가 없었음

더 자세한 정보는 AdSense 고객센터를 읽어보자: <https://support.google.com/adsense#topic=3373519>

AdSense를 처음 등록 신청하면 Google AdSense 전문가가 신청한 사이트가 위 항목들을 준수하고 있는지 검토하는 시간을 가진다.<br/>
검토 완료까지 일반적으로 1일 이내의 시간이 소요되지만 며칠에서 몇주까지 걸릴 수도 있다고 한다.
검토 기간이 길어지는 이유는 사이트의 관리 상태와 이용 현황에 따라 달라진다고 한다.<br/>
이러한 검토가 완료된 이후부터 광고 게시가 가능해진다.

개인적인 생각인데 AdSense는 등록한 URL로부터 사이트 전체를 검토한다고 하니
빠르고 효과적인 검토를 위해 SEO 활성과 `sitemap.xml` 파일이 있는 편이 좋을 것 같다.<br/>
이전에 작성했던 이 [포스트]({{ site.baseurl }}/blog/seo_robots/#page-title)를 참고해서
SEO 활성법, `sitemap.xml` 등록법을 알아보고 올바로 있는지 확인하자.

<span class="md-monologue">난 이 포스트를 작성하는 시점에 AdSense 사용 신청을 했다... 콘텐츠양이 많지 않은데.. 괜찮을까?<br/>
사이트가 어느정도 활성화 돼야 AdSense의 자격 요건을 충족하는건지, 내 사이트를 그 시험대에 올린다! 덜덜..</span> 😬

# 서비스 신청 방법

먼저 아래 링크로 들어가서 시작하기 버튼을 누른다.

<https://www.google.com/intl/ko_kr/adsense/start/>

그리고 다음과 같은 양식 페이지에 광고를 등록하고 싶은 내 소유의 사이트 URL과 내 이메일 주소를 입력한다.<br/>
나는 그 밑의 선택지에서 `예, 맞춤 도움말 및 실적 개선 제안을 제공하는 이메일을 받겠습니다.`를 선택했다.
말 그대로 실적 개선 제안을 받고 싶기 때문이다.

![Google AdSense Registration - Sign Up]({{ site.gdrive_url_prefix }}13r8Wu6-DNbBLtrAlQkvM20FxHX4aqyPb)

위 그림에서 <span style="background-color: #4285F4;border-radius: 3px;padding: 4px 15px;color: white;font-size: 12px;">저장하고 계속하기</span>
버튼을 누르고 또 양식을 작성해야 한다. 내 집 주소를 입력하는 수준이므로 빠르게 입력하고 넘긴다.

![Google AdSense Registration - Connect URL on Manager Web]({{ site.gdrive_url_prefix }}1BXltxKoekU89y5wMPuHIfTxPSUJxupSq)

그러면 위와 같이 애드센스 서비스와 내 사이트를 연결하기 위한 코드가 나온다.

![Google AdSense Registration - Connect URL on My Page]({{ site.gdrive_url_prefix }}1gOIsetQHPWTtuZPP6nP8dpmwf9O89WIU)

나와있는 설명대로 쭉 진행하면 되는데, 텍스트 박스에 있는 `<script>` 태그를 복사해서
내 블로그의 `<head>` 태그안에 포함되도록 한다.
이때 내 블로그 어디에서든지 `<head>` 안에 이 `<script>` 태그가 유지될 수 있도록 해야한다.
홈 화면의 Jekyll Layout과 포스트 화면의 Jekyll Layout이 달라서 `<head>` 태그의 내용이 바뀌는 등의 상황에 주의하자.

![Google AdSense Registration - Wait for google confirm]({{ site.gdrive_url_prefix }}1xu8Kcrw-soN0tXByEhfUiDGeyOj6JbJ8)

`<script>` 태그를 삽입하고 확인을 누른다음 태그가 올바로 삽입된 것이 확인되면 위와 같이 '검토 중입니다' 메시지가 나온다.

이제 좋은 결과가 나오길 기다려보자..

<span class="md-monologue">나도 현재 검토 결과를 기다리는 중이라 더 포스트 할 수 있는 내용이 없다.. 두렵다..<br/>
검토가 완료된 후 마저 포스팅 하도록 하겠다.</span>

# 참고

## AdSense를 통한 수입

AdSense 고객센터의
[내용](https://support.google.com/adsense/answer/180195?hl=ko&ref_topic=1319755&visit_id=637460122308861255-395764619&rd=1)에
따르면

![Google AdSense Income]({{ site.gdrive_url_prefix }}17sUpJWN6KiQzVMSnHCvbexpLX83phFPS)

구글이
광고 게시를 통해 얻은 전체 수익에서 지분(%) 만큼을 게시자에게 제공 한다고 한다.<br/>
또 사이트 트래픽 양, 제공하는 콘텐츠 유형, 사용자의 위치, 광고 설정 방법에 따라서도 달라진다.

수입에 대한 상세 내용은 고객센터의 수입 관련
[설명](https://support.google.com/adsense/answer/180195?hl=ko&ref_topic=1319755&visit_id=637460122308861255-395764619&rd=1)을
참조해보자.

## 효과적인 AdSense

AdSense 고객센터의 [내용](https://support.google.com/adsense/answer/7299563?hl=ko&ref_topic=1319756&visit_id=637460122308861255-395764619&rd=1)에
따르면 AdSense로 수익을 높이려면 아래와 같은 질문에 만족하는 답을 할 수 있어야 한다고 한다.

* 페이지만의 특별한 장점이 있나요?<br/>
  독창적이고 관련성 높은 콘텐츠 보유
* 페이지의 메뉴가 명확하고 사용하기 쉽나요?<br/>
  직관적인 UI
* 페이지에서 제공하는 콘텐츠가 독창적이고 흥미롭나요?<br/>
  저작권에 주의!

## 구글 검색 결과의 영향

AdSense를 등록해도 내 사이트에 대한 기존의
[구글 검색 결과에는 영향이 없다고 한다.](https://support.google.com/adsense/answer/9717?hl=ko&ref_topic=1319753)
