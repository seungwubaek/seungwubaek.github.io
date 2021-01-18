---
layout: single
title: "[Git Page Jekyll Blog 만들기] - [12] Google AdSense 등록해서 수익 창출"
post-order: 12
date: "2021-01-12 14:38:00 +0900"
last_modified_at: "2021-01-18 21:01:00 +0900"
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

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-9480069633849139"
     data-ad-slot="4156046869"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

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

## AdSense 시작하기

먼저 아래 링크로 들어가서 시작하기 버튼을 누른다.

<https://www.google.com/intl/ko_kr/adsense/start/>

그리고 다음과 같은 양식 페이지에 광고를 등록하고 싶은 내 소유의 사이트 URL과 내 이메일 주소를 입력한다.<br/>
나는 그 밑의 선택지에서 `예, 맞춤 도움말 및 실적 개선 제안을 제공하는 이메일을 받겠습니다.`를 선택했다.
말 그대로 실적 개선 제안을 받고 싶기 때문이다.

![Google AdSense Registration - Sign Up]({{ site.gdrive_url_prefix }}13r8Wu6-DNbBLtrAlQkvM20FxHX4aqyPb)

위 그림에서 <span style="background-color: #4285F4;border-radius: 3px;padding: 4px 15px;color: white;font-size: 12px;">저장하고 계속하기</span>
버튼을 누르고 또 양식을 작성해야 한다. 내 집 주소를 입력하는 수준이므로 빠르게 입력하고 넘긴다.

## 블로그 소유 권한 확인

Google Analytics나 Google Search Console에서도 그랬듯, 이번에도 내 블로그가 내 소유인지 확인하는 과정을 거친다.

![Google AdSense Registration - Connect URL on Manager Web]({{ site.gdrive_url_prefix }}1BXltxKoekU89y5wMPuHIfTxPSUJxupSq)

위와 같이 애드센스 서비스와 내 사이트를 연결하기 위한 코드가 나온다.

![Google AdSense Registration - Connect URL on My Page]({{ site.gdrive_url_prefix }}1gOIsetQHPWTtuZPP6nP8dpmwf9O89WIU)

나와있는 설명대로 쭉 진행하면 되는데, 텍스트 박스에 있는 `<script>` 태그를 복사해서
내 블로그의 `<head>` 태그안에 포함되도록 한다.
이때 내 블로그 어디에서든지 `<head>` 안에 이 `<script>` 태그가 유지될 수 있도록 해야한다.
홈 화면의 Jekyll Layout과 포스트 화면의 Jekyll Layout이 달라서 `<head>` 태그의 내용이 바뀌는 등의 상황에 주의하자.

## 기다림...

![Google AdSense Registration - Wait for google confirm]({{ site.gdrive_url_prefix }}1xu8Kcrw-soN0tXByEhfUiDGeyOj6JbJ8)

`<script>` 태그를 삽입하고 확인을 누른다음 태그가 올바로 삽입된 것이 확인되면 위와 같이 '검토 중입니다' 메시지가 나온다.

이제 좋은 결과가 나오길 기다려보자..

<span class="md-monologue">나도 현재 검토 결과를 기다리는 중이라 더 포스트 할 수 있는 내용이 없다.. 두렵다..<br/>
검토가 완료된 후 마저 포스팅 하도록 하겠다.</span>

<br/>
<br/>
<br/>

.<br/>
.<br/>
.<br/>

<br/>
<br/>
<br/>

## 검토 완료

2021-01-12 포스트를 업로드 한 이후 약 6일이 지난 2021-01-17 21시 25분. 마침내 검토가 완료 되었다.

그 결과는...

<br/>
<br/>
<br/>

.<br/>
.<br/>
.<br/>

<br/>
<br/>
<br/>

![AdSense - Confirmed Email]({{ site.gdrive_url_prefix }}1JljZkzSp51xQn_nOmDBR5gJ3SoHrXGGV)

검토 확인! 🎉🎉

검토 결과는 이메일로 받을 수 있다. 게시자 ID는 공개용 ID라서 가릴 필요 없지만 괜히 이 포스트 보시는 분들 놀라실까봐 가렸다.

혹시 검토 과정에서 걸러지는 사이트가 경우가 있다면 나는 블로그 만드는데 많이 노력했다는 점에서 검토에 자신감이 있었지만
노력한 양에 비해 콘텐츠양이 적어서 불안감도 있었다.

뭐랄까.. 그냥 검토에 시간이 필요한 것이었는지 적합하지 않는 경우 신청이 거부되기도 하는것인지
AdSense 신청에 성공하기 어려운지는 사실 잘 모르겠다. 불법적인 것만 아니면 될것 같은데...

아무튼 이어서 AdSense 적용을 진행해보자.

설정을 마무리하기 위해 메일의 링크를 클릭하거나 <https://www.google.com/adsense> 링크를 클릭하면
AdSense 웹 서비스 화면으로 이동할 수 있다.

![AdSense Web - Start]({{ site.gdrive_url_prefix }}1HCmk42b7H8D-ru97VIg9iwVY3MWQgdYt)

위와 같은 화면이 나왔다면
<span style="background-color: #4285F4;border-radius: 3px;padding: 4px 15px;color: white;font-size: 12px;">광고 설정</span>
버튼을 클릭하자.

![AdSense - warning messages]({{ site.gdrive_url_prefix }}1mFMAHScoPZxQHQPdvGAS2-LUotHptcN7)

그러면 내 사이트가 등록돼 있는것이 보이고 위에 경고 메시지 2개가 떠있다.

빨간 메시지는 '수익 손실 위험 - 수익에 심각한 영향을 미치지 않도록 사이트에서 발견된 ads.txt 파일 문제를 해결해야 합니다.'
이고<br/>
그다음 노란 메시지는 '판매자 정보를 Google sellers.json' 파일에 게시하시기 바랍니다. 현재 공개 상태를 검토하려면
계정 설정 페이지를 방문하세요' 라는 내용의 메시지이다.

## ads.txt

위 경고 메시지들에서 빨간 메시지의 `ads.txt`는 무엇일까?

구글 고객센터의 <https://support.google.com/adsense/answer/7532444?hl=ko>에 나와있는 공식 설명은 아래와 같다.

> <strong>Ads.txt 가이드</strong><br/>
> 공식 디지털 판매자 또는 ads.txt는 승인받은 것으로 확인된 판매자(예: 애드센스)를 통해서만 디지털 광고 인벤토리가 판매될 수 있게 해주는 IAB Tech Lab 솔루션입니다. ads.txt 파일을 직접 만들면 사이트에서 광고를 판매할 수 있는 판매자를 더 효과적으로 관리할 수 있으며, 가짜 인벤토리가 광고주에게 판매되는 것을 방지할 수 있습니다.
>
> ads.txt 파일을 사용할 것을 적극 권장합니다. ads.txt 파일은 구매자가 가짜 인벤토리를 식별할 수 있게 도와주어 가짜 인벤토리에 광고비가 지출되지 않도록 해 주므로 광고주의 수익이 늘어날 수 있습니다.

`ads.txt` 파일을 사용할 것을 <strong>적극 권장</strong>한다고 돼있다.

잘 이해가 안되서 IAB Tech Lab의 <https://iabtechlab.com/ads-txt/>에 나와있는 설명도 봤다.

> <strong>WHAT IS THE ADS.TXT PROJECT?</strong><br/>
> The mission of the ads.txt project is simple: Increase transparency in the programmatic advertising ecosystem. ads.txt stands for Authorized Digital Sellers and is a simple, flexible and secure method that publishers and distributors can use to publicly declare the companies they authorize to sell their digital inventory.

ads.txt는 Authorized Digital Sellers의 약자이다... 게시자와 배포자가 광고 인벤토리를 허용한 회사를 공개적으로 선언하는데
사용할 수 있다... 광고 에코 시스템의 투명성 향상을 목적으로 한다고 적혀있다.

그러한 설명들에서 짐작컨데 `ads.txt` 파일이란 내 블로그에 게시되는 광고 중에서 플랫폼과 합의를 거쳐 공식 허가되지 않은(불법 등)
광고 또는 내가 게시 허용하지 않은 종류의 광고들이 규정을 어기고 불법적으로 광고되는 것을 방지하는 역할을 하는 파일인 것 같다.

광고 컨테이너('인벤토리'라고 부르는 것 같음)가 탈취(?)될 수도 있나보다.
`ads.txt` 파일을 열어보면 내 게시자 ID를 포함해 어떤 ID 값들이 들어 있는데 광고가 열람됐을때 해당 광고가
내 ID에서 게시가 허용돼 있는지 확인 할 것 같다.

정확히는 모르겠지만 해서 나쁠것 같지 않고 구글이 <strong>적극 권장</strong>하고 있고 수익에도 영향이 있다고 하니 하라는 대로 하자.

이제 빨간 메시지의 <span style="color: #4285F4;">지금 해결하기</span>를 클릭하면 아래 내용이 나온다.

![AdSense - ads.txt]({{ site.gdrive_url_prefix }}1vbEtUOOqWOJSDsxcRYDcGTL_rf7xwp47)

거기서 <span style="color: #4285F4;">다운로드</span>를 눌러서 내 블로그의 최상위에 `/ads.txt` 파일로 위치시키자.

내 블로그에 반영되도록 변경 내용을 `git add`, `git commit`, `git push` 하고 블로그 URL에 따라
`https://[블로그 주소].github.io/ads.txt` 와 같은 URL 경로로 `ads.txt` 파일이 블로그 최상위에 정상적으로 위치해 있는지 확인하자.

링크를 클릭해서 내용이 출력되면 완료가 된 것인데 구글 고객센터
<https://support.google.com/adsense/answer/9785860?hl=ko&ref_topic=7533328>의 내용을 보면<br/>
AdSense의 '`ads.txt` 파일을 만들어야 한다'는 경고 메시지가 사라지기까지 며칠 걸릴 수 있고
사이트에서 광고 요청을 많이 하지 않는 경우 최대 한달까지 걸릴 수 있다고 적혀있다.
<span class="md-monologue">내 사이트를 콕 집어 하는 말인가... 쉬익쉬익...</span>

## sellers.json

주로 구글 고객센터에 나와있는 내용들로 진행하고 있는데... 나를 의미하는 호칭이 게시자, 판매자 2종류인 것 같다.

sellers.json 파일에 대한 설명은
구글 고객센터 <https://support.google.com/adsense/answer/9889911?hl=ko&ref_topic=7533328>에서 아래와 같이 소개하고 있다.

> <strong>sellers.json으로 판매자 정보 제공하기</strong><br/>
> Sellers.json은 광고 생태계의 투명성을 높이고 사기를 방지하는 데 도움이 되는 IAB Tech Lab 표준입니다. Sellers.json은 공개적으로 사용 가능한 판매자 정보 파일을 통해 작동합니다. 게시자는 애드센스 계정 유형에 따라 파일에서 개인 또는 업체 이름을 공유할 수 있습니다. 이를 통해 광고주는 게시자의 신원을 탐색하고 확인할 수 있습니다.

내 사이트에 광고를 하려는 광고주에게 나의 투명성을 알리는 역할을 하는 것 같다.
<strong>정보를 투명하게 공개</strong>하라면서 수익에 영향을 미칠 수 있다고 하니 열심히 작성하자.

위에서 봤던 노란 경고 메시지에서 <span style="color: #4285F4;">작업</span>을 클릭하거나

아래 그림처럼 AdSense 웹 서비스 화면 왼쪽에서
<span style="text-decoration: underline;">계정 > 설정 > 계정 정보</span> 순서로 차례로 클릭하자.

![AdSense - Setting Account Info]({{ site.gdrive_url_prefix}}15YzMz6GWKciRTmm7w9vwT3aafVpbqrpI)

그리고 그곳에 나온 양식을 확인한다.

![AdSense - Sellers.json]({{ site.gdrive_url_prefix }}1dxFHn-nTAdX7jMFpB4aRa-Ez9nN1lzDV){:style="max-height: 500px;"}

내 식별자들과 시간대가 이미 잘 설정돼 있다.

이때 판매자 정보 공개 상태가 <strong>공개</strong>가 아니라면 <strong>공개</strong>로 설정하자.

<span style="color: red; font-size: 1.2em; font-weight: bold; text-decoration: underline;">주의!!
위 양식 정보중 2행의 고객ID 값은 공유되선 안된다!</span>

그리고 판매자 정보 공개 상태의 비즈니스 도메인 입력란은 광고주에게 공개할 법인 도메인을 위한 입력란이다.<br/>
음... 아무래도 내 블로그 `.github.io` 도메인은 나의 법인 도메인은 아닌것 같으므로 공란으로 두자.

그런 다음 검증을 위해 <http://realtimebidding.google.com/sellers.json> 이 사이트로 접속한 후

<kbd>Ctrl</kbd> + <kbd>F</kbd>를 눌러 텍스트 검색으로 자신의 게시자 ID를 찾아보라고 한다.

그런데... 위 사이트에 출력되는 게시자 ID 리스트는 pub-0으로 시작하는것을 보니 ID가 오름차순 정렬 되어있는 것 같고
게시자 ID는 16자리이고 그만큼 데이터가 많아 로드 속도는 느리며 내 게시자 ID는 pub-9로 시작한다...

그래서 검증은 포기! sellers.json 공개쯤이야 잘 됐겠지!

이제 `ads.txt` 파일이 제대로 인식되기까지 며칠에서 최대 한달 걸린다고 하니, 기다렸다가 제대로 인식되는지 확인하자.

## 또 기다림...

2021-01-17 21시 25분 쯤 AdSense 검토 완료 메시지를 받고 여기까지 포스트 작성한 시각은 2021-01-18 00시 18분이다.

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
