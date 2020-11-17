---
layout: single
title: "[Git Page로 Blog 만들기] - [6] Google Analytics 연동"
post-order: 6
date: "2020-11-16 21:43:00 +0900"
last_modified_at: "2020-11-17 14:48:00"
---

Google Analytics를 이용해서 내 블로그의 방문자 통계를 추적하고 감시해보자. <span class="md-monologue">무료이다.</span><br/>
그리고 Google의 또 다른 Web Service들과 연동해서 효과적인 수익 창출을 노려볼 수 있다. <span class="md-monologue">무료로.</span>

# Google Analytics

Google Analytics는 내 블로그의 이용자 통계를 추적하는 서비스를 제공한다.

2020년 10월, GA4(Google Analytics 4)가 출시되었다. Google Analytics 3를 UA(Universal Analytics)라 일컫는다. GA4는 앱 + 웹 속성을 기반으로 한다고 한다. 즉, 모바일 앱 관련 기능을 강화하려는 것 같다.

Google Analytics에 대한 개념과 상세 정보는 [애널리틱스 고객센터](https://support.google.com/analytics#topic=9143232) 에서 대충 확인했다.

__아래는 mmistakes 테마를 사용한다는 가정하의 설명글이다.__ 

mmistakes 테마를 사용하지 않는 경우, Google Analytics를 내 사이트에 등록할때 gtag라는 javascript를 `<head>` tag에 넣는 과정을 먼저 이해하면 따라올 수 있다. mmistakes 테마는 그 과정이 이미 이뤄져있다. 어렵진 않다. Google Analytics 등록을 진행하다보면 자연스레 할 수 있을것이다.

## 옵션 1. 기존 사이트: Google Analytics 4 연결

기존의 UA를 사용하던 사이트에 GA4(Google Analytics 4) 사용 하려고 한다면 이 섹션의 내용을 읽어보자. 근데, 이전 통계 데이터를 GA4 이전하는 방법을 모르겠다;; 까짓거.. 처음부터 다시 시작하기로 했다.

그런데 GA4가 UA의 기능을 모두 포함하는게 아닌것 같다. 따라서 앞으로 어떻게 될진 모르겠지만 현재로써는 UA의 tracking_id와 GA4의 새로운 id인 '측정 ID'를 모두 추적하는 '이중 속성' 형태로 구현하도록 하겠다.

Analytics 홈 화면 왼쪽 하단의 있는 관리 페이지 버튼(톱니바퀴)을 클릭하자. 그러면 아래처럼 'GA4로 업그레이드'라는 메뉴가 보인다. 클릭하자.

![]({{ page.gdrive_url_prefix }}1xe6oRIST8BgnSK9ZCHsY-i8zLT1EdpGx)

시작한다.

![]({{ page.gdrive_url_prefix }}1R2wd1TQor9tyBkcE6oQ3s15e4FJ6D4Ts)

읽어보고 쭉쭉 넘긴다.

![]({{ page.gdrive_url_prefix }}1jq0ENoZrPSV7JVTV43hUtydBZ1i_4bxB)

그러면 금방 연결되었다. 이제 태그 ID를 연결시킬 차례이다.

![]({{ page.gdrive_url_prefix }}1WvYnm6vXbOjySw6Lo5BAJe4Wboz9CqIQ)

GA 속성 보기 버튼을 누르면 새로운 Analytics의 관리 화면으로 넘어간다. 데이터 스트림 메뉴로 들어가자.
그러면 그곳에 내 블로그 URL이 보인다. 클릭하면 이전의 tracking id와 같이 'G-'로 시작하는 '측정 ID'라는 항목이 있다.

![]({{ page.gdrive_url_prefix }}1RAg9EL-Ury475HLjCLsISVbG1y1jwQYR)

`_config.yml` 파일에서 전에 설정했던 `tracking_id`의 값 아래에 `stream_id`를 만들어서 '측정 ID'를 값으로 넣는다.

![]({{ page.gdrive_url_prefix }}1sBhDtp4TR75TYKezIaabT8WVyxgVbtaZ)

`/_includes/analytics-providers/google-gtag.html` 파일에 기존에 있던 gtag javascript 코드가 있는데, 다음의 마지막 줄을 추가한다.

```javascript
gtag('config', '{% raw %}{{ site.analytics.google.stream_id }}{% endraw %}');
```

그럼 코드가 아래처럼 된다.

![]({{ page.gdrive_url_prefix }}1ZWmJFhiD1jfQGAgS6ocOpZqOdPiOa_5c)

이러면 설정이 완료 됬다. 아래는 처음부터 GA4를 설정하는 과정이므로 아래 섹션은 [건너뛰자](#적용-및-테스트).

## 옵션 2. 신규 사이트: 처음부터 Google Analytics 4 연결

<div class="notice--warning" markdown="1">
#### 주의
{: class="no_toc"}
Google Analytics에 Google Search Console를 연결하려면 GA4가 아니라 UA가 필요하다. 둘 모두 등록 방법은 비슷하므로 GA4에 대한 설명만 하겠다.
</div>

이 서비스를 이용하기 위해서 먼저 구글에 __google analytics__ 라고 검색하자. 그리고 검색된 구글 애널리틱스 페이지로 들어가면 아래와 같이 환영해준다. 🎉

![]({{ page.gdrive_url_prefix }}1HHPfyPY0FFeVdhyflH-yNGBX1by22_vo)

계정 이름(구글 계정 ID가 아니고 애널리틱스 내에서만 쓰인다)을 원하는대로 만든다.

![]({{ page.gdrive_url_prefix }}1WjIfgJw3SFowi2op0im8NfpOSGXoEYdY)

속성 이름은 다중의 애널리틱스 서비스를 이용할때, 현재 서비스를 부르는 별칭이라고 보면 된다. 난 내 블로그 URL로 했다. 뭘하든 상관없다.

![]({{ page.gdrive_url_prefix }}1l7TUeQBjVf4DMDWPztrnntozIXhrKYUI)

비즈니스 정보를 입력한다. <span class="md-monologue">지..직원이요..?</span>

![]({{ page.gdrive_url_prefix }}1uNv7SS0TuRYSZie-dlcBjUzR1pkA6kUV)

동의 동의 동의..!!

![]({{ page.gdrive_url_prefix }}1GVlZx2pT1jyr61pbyhBy_M3agR7GUdB8)

'iOS', 'Android', '웹' 중 하나의 플랫폼을 선택하라는 화면이 보인다. Git Page이므로 제일 오른쪽의 웹을 선택한다.

![]({{ page.gdrive_url_prefix }}1BUpWxkzqoE2GCZ7h5Hlv9U4qpVDioRp1)

그다음 나오는 관리 화면에서는 '데이터 스트림' 설정을 하라고 한다. 그리고 'G-'로 시작하는 측정 ID가 보인다. 그 ID를 복사하자.

![]({{ page.gdrive_url_prefix }}1RAg9EL-Ury475HLjCLsISVbG1y1jwQYR)

`_config.yml` 파일에서 아래 그림과 같은 위치를 찾는다.

그리고 `provider: "google-gtag"` 라고 입력한다.

사진 속의 `tracking-id`는 내 블로그의 GA3(Google Analytics 3) ID 값이다. 우리는 GA4이므로 무시하고 공란으로 둔다.

그 다음 `tracking_id`의 값 아래에 `stream_id`를 새로 만들어서 복사했던 '측정 ID'를 값으로 넣는다.

![]({{ page.gdrive_url_prefix }}1sBhDtp4TR75TYKezIaabT8WVyxgVbtaZ)

`/_includes/analytics-providers/google-gtag.html` 파일에 기존에 있던 javascript 코드가 있는데, 아래와 같은 마지막 줄을 추가한다.

```javascript
gtag('config', '{% raw %}{{ site.analytics.google.stream_id }}{% endraw %}');
```

![]({{ page.gdrive_url_prefix }}1ZWmJFhiD1jfQGAgS6ocOpZqOdPiOa_5c)

## 적용 및 테스트

그러면 설정 완료. 완료 됐으면 반드시 `git add`, `git commit` 한 후, 원격 저장소로 `git push` 하는 것을 잊지 말자.

제대로 적용됐는지 테스트 해보기 위해 내 블로그에 한번 접속한 다음 구글 애널리틱스로 들어가서 왼쪽 사이드의 홈 또는 실시간 메뉴를 누르고 '지난 30분 동안 사용자' 정보가 1 증가하는 것을 확인하자.

![]({{ page.gdrive_url_prefix }}1-KiIgVG9l1Y_vdx7gOJLkENOYM53k9k3)
