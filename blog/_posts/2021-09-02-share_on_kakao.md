---
layout: single
title: "[Git Page Jekyll Blog] - [17] 포스트 공유하기: Kakao"
post-order: 17
date: "2021-09-02 16:37:00 +0900"
last_modified_at: "2021-09-02 16:47:00 +0900"
---
이 포스트에서는 Kakao에 포스트의 링크를 공유하는 방법에 대해 알아본다.
Kakao 공유 방법은 Kakao가 제공하는 API를 사용하며 이를위해 Kakao 개발자 사이트에 등록한 후
Kakao가 제공하는 SDK 다운로드하고 SDK에서 Kakao API를 호출하는 Javascript를 구현하는 과정으로 진행된다.

내 블로그의 포스트 페이지 구조에서는 페이지의 상단과 하단의 <strong>Share on</strong> 섹션에서 공유 기능을 제공하고 있다.<br/>
<strong>Share on</strong> 섹션에는 포스팅 날짜 기준으로 5가지 공유 버튼이 존재하며 버튼을 클릭했을때 각각의 공유 기능이 수행된다.<br/>
`Copy URL`, `Kakao`, `Facebook`, `Twitter`, `Linkedin` 이들이 공유 버튼에 해당하며 이름에서 유추할 수 있듯이
URL을 복사하거나 각 플랫폼에 공유할 수 있다.

내 블로그 소스 중 <https://github.com/seungwubaek/seungwubaek.github.io/blob/master/_includes/social-share.html>을
보면 공유 버튼을 클릭했을때 어떤 기능이 수행되는지 얼추 확인해 볼 수 있다.

카카오 공유 기능은
<a class="btn btn--kakao" id="shareon-kakao" title="Share on Kakao"
    onclick="scrapKakao(this);">
  <img class="kakao-symbol" src="/assets/images/icon/kakao_bubble.png"/>
  <span> Kakao</span>
</a>
버튼을 클릭했을때 카카오로 연결되는 팝업이 뜨고 팝업에서 카카오 플랫폼에 로그인 한 후, 카카오 채팅창을 열어 페이지의 링크를 공유하는 기능이다.

이 카카오 공유 기능과 디자인 등은 직접 개발하는 것이 아니고 카카오 플랫폼 측에서 제공하는 것을 사용한다.<br/>
즉, 우리는 카카오가 제공하는 API를 우리 블로그에서 호출하고 정상적으로 연동되도록 하면 된다.

이를 위해 카카오 서버 측에 우리 블로그를 등록해주어야 하며, 우리 블로그 측에서는 카카오 SDK를 다운로드 받고 관련 API 기능을 구현해주면 된다.

## 1. Kakao Developers

카카오 공유하기를 포함하여, 카카오에서 제공하는 모든 API를 사용하기 위해서는 카카오 서버에 우리 블로그를 등록해야 한다.<br/>
이런 등록 작업은 서버가 제공하는 API를 악의적이거나 무분별하게 사용하는 것을 막고 사용자의 신원을 확실히 하기 위해서이다.<br/>
대개 플랫폼들이 그렇듯 이 문제를 해결하기 위해 카카오 또한 개발자 사이트(<https://developers.kakao.com/>)를 운영하고 있다.

### Kakao Developers 등록

카카오 개발자 사이트(<https://developers.kakao.com/>)에 접속하면 아래와 같은 화면을 볼 수 있다.<br/>
오래되서 기억이 잘 안나는데 개발자 등록이 필요한 경우엔 등록해주거나 아니면 단순히 카카오 아이디로 로그인 하면된다.
카카오 아이디 조차 없다면 회원가입 하자.

### 내 애플리케이션

로그인을 완료한 다음에는 메뉴 중 `내 애플리케이션`을 클릭한다.

![Kakao Developers Site]({{ site.gdrive_url_prefix }}1jJ4eZyE-AFDK7vZ1lLwwVlqA-_-P0_9k){:style="max-height: 500px;"}

## 2. 애플리케이션 추가하기

`내 애플리케이션` 메뉴를 선택하여 들어오면 아래 처럼 내가 등록한 애플리케이션 목록이 보인다.
처음에는 목록에 아무것도 없다. 아래 그림은 내 블로그가 등록된 이후이므로 내 블로그에 대한 것이 보인다.

여기서 애플리케이션이란 Kakao 플랫폼에서 제공하는 다양한 API 서비스들을 사용하는 하나의 프로젝트라고 할 수 있다.<br/>
그림과 같이 내 블로그 [Extra Brain]({{ site.url }})에서 Kakao API를 사용 할 것이기 때문에 하나의 애플리케이션으로 등록한 것을 볼 수 있다.

![My Application List]({{ site.gdrive_url_prefix }}15PE8F-7D0gkVzajz3z0yrO6TMyA3_A5I){:style="max-height: 250px;"}

등록한 애플리케이션 하나에서 API 하나만 호출할 수 있는 것이 아니고 여러 종류의 API가 호출 가능하며,
애플리케이션 하나에 내 블로그 처럼 API를 사용하는 한개의 사이트만 존재하는 것이 아니고 여러개의 사이트가 존재할 수 있다.

이 포스트에서는 카카오에서 제공한 메뉴얼과 경험적인 내용을 혼합하여 설명하고 있으므로 용어의 정의 등 정확한 정보를 알고 싶다면
[`문서`](https://developers.kakao.com/docs) 메뉴를 클릭해서 궁금한 것들을 살펴보자.

### 애플리케이션 등록 폼

위 그림에서 `애플리케이션 추가하기` 버튼을 누르면 아래와 같은 입력 폼이 뜬다.

여기서 입력한 내용은 카카오 로그인 API를 활용할 경우 보여진다고 한다.
`앱 아이콘`, `앱 이름`에는 애플리케이션을 대표하는 것을 각각 넣자.<br/>
내 블로그 애플리케이션을 등록할 때는 `앱 아이콘`에 내 블로그의 아이콘을, `앱 이름`에 블로그 이름을 넣었다.
`사업자명`은 상업적인 목적으로 사용하는 경우가 아니라면 대충 내 이름으로 넣자(카카오 로그인 API를 사용할 경우엔 고려할 필요가 있다).
나중에 변경 가능하다.

![Application Adding Form]({{ site.gdrive_url_prefix }}1W2TFP6G3diYnXVDS38YtVSnMCbFyt452){:style="max-height: 500px;"}

애플리케이션이 등록되고 목록에 나타났다.

![My Application List after adding]({{ site.gdrive_url_prefix }}1SEISkdN-Jj-MUHFMiNX3AbvYwAIy7OMr){:style="max-height: 250px;"}

## 3. 애플리케이션 요약정보

애플리케이션 목록에서 등록한 애플리케이션을 클릭하면 아래와 같은 `요약정보` 화면이 나온다.<br/>
여기서 `앱 키`란 API를 사용하려고 할 때
"이보시오 카카오 양반, 나는 카카오에 등록돼 있는 'Extra Brain' 이라는 애플리케이션에 소속된 몸이요."
하는 것과 같이 API 사용 권한을 획득하기 위해 블로그 측에서 서버에 제시해야하는 암호키다.

`앱 키`의 항목을 보면 API를 호출하는 방법에 따라 서로 다른 키를 가지는 것을 볼 수 있다. 우리는
<a class="btn btn--kakao" id="shareon-kakao" title="Share on Kakao"
    onclick="scrapKakao(this);">
  <img class="kakao-symbol" src="/assets/images/icon/kakao_bubble.png"/>
  <span> Kakao</span>
</a>
버튼을 클릭하면 Custom Javascript에서 API를 호출할 것이므로 `JavaScript 키`만 사용하면 된다.

`JavaScript 키` 같은 경우는 웹에서 사용된다는 특성상 블로그에 접속한 클라이언트가 그 값을 알 수 있지만 일단은
<span class="md-monologue">예의상(?)</span> 가려놓았다.<br/>
그리고 네번째 `Admin 키`는 써보진 않았지만 왠지 세상을 멸망 시킬 수 있는 만능 열쇠 같으므로 유출되지 않도록 주의하자.

![Application Summary]({{ site.gdrive_url_prefix }}1ldosIHlX_umkqfhCfCgPoNfFjk9OhnnI){:style="max-height: 600px;"}

## 4. Kakao API 종류

이때 Kakao API로 어떤 기능들을 호출 할 수 있는지 보려면 화면의 왼쪽 메뉴를 보면 알 수 있다.
`카카오 로그인`, `카카오링크`, `카카오채널`, `음성`, `푸시알림` 들이 그것들이다.
각자의 이름만 봐도 무엇인지 유추 가능하다.

![Kakao API List]({{ site.gdrive_url_prefix }}1tOGfQV-IwUa18zF2ej9eyWebcQEHnR_L){:style="max-height: 500px;"}

우리가 이중에 사용할 API는 `카카오링크`이다. 아래 그림은 Kakao Developers 문서에 나와있는 내용이다.

![What is Kakao Link](https://developers.kakao.com/docs/latest/ko/assets/style/images/message/message_link.png){:style="max-height: 400px;"}
{:style="margin-bottom: 0;" class="img-popup" data-title="Ref. <a href='https://developers.kakao.com/docs/latest/ko/message/common#intro'>https://developers.kakao.com/docs/latest/ko/message/common#intro</a>"}
<div style="font-size: .75em;" markdown=1>
Ref. <https://developers.kakao.com/docs/latest/ko/message/common#intro>
</div>

> 카카오링크 API는 카카오가 제공하는 카카오톡 친구 또는 대화 목록 페이지를 띄워 사용자가 메시지를 보낼 수 있도록 합니다.
> 따라서 서비스가 카카오톡 친구 정보를 출력하는 페이지를 직접 만들 필요가 없고, 모든 카카오톡 친구가 목록에 포함됩니다.
> 대신, 카카오톡 친구 정보를 데이터로 제공하지 않습니다.
> 카카오링크 API는 웹 페이지 소스코드에 공유할 내용을 정의하는 등 상대적으로 간단하게 기능을 구현할 수 있습니다.
> &ndash; <https://developers.kakao.com/docs/latest/ko/message/common#intro>

## 5. 플랫폼

다음으로 `요약정보` 화면에서 `플랫폼 설정하기` 버튼을 클릭한다.<br/>
여기서 플랫폼이란, API를 호출하는 API 사용자 측의 플랫폼의 종류를 의미한다.

![Platform List using API]({{ site.gdrive_url_prefix }}1TcwJskX1E7zuy_6112uleHHKWY9XppsN){:style="max-height: 600px;"}

내 블로그의 경우 Github에서 제공하는 Git Page 블로그 웹 서비스를 사용하여 제작되었으므로 Web 플랫폼에 해당한다.
처음엔 등록 버튼만 있고 다른 것들은 보이지 않는다. `Web 플랫폼 등록` 버튼을 클릭하자.

![Registered Platform List]({{ site.gdrive_url_prefix }}1QcFkyt2GyFMp2h8c6Kdllhjc12aj_QGl){:style="max-height: 500px;"}

`Web 플랫폼 등록` 버튼을 클릭하면 API를 사용자는 Web 사이트의 주소를 입력하는 화면이 나온다. 한 줄에 한 주소 씩 입력하면 된다.

아래 그림에서 첫번째 줄은 내 블로그 주소이며 두번째, 세번째 줄은 내 블로그를 로컬 환경에서 테스트 할 때 사용하는 주소이다.<br/>
이처럼 사이트 수정 마다 별다른 테스트 없이 바로 deploy 하지 않고 테스트를 위한 주소를 별도로 등록해서 사용해 볼 수 있다.

![Register Web Platform]({{ site.gdrive_url_prefix }}1GaR7KDDbFub2tgKfJYqwsaPJNu8tj_Gt){:style="max-height: 500px;"}

등록이 완료되면 아래처럼 플랫폼 등록 정보를 볼 수 있다.

![Registered Web Platform Info]({{ site.gdrive_url_prefix }}1qAg9rtFePSSO44GaFxDhd532Gq9QQhjp){:style="max-height: 500px;"}

## 6. 카카오링크

다음으로 우리 블로그에서 사용할 '카카오링크' API를 사용 등록 및 설정하는 과정을 진행한다.

### 메시지 API

'카카오링크'는 '메시지' API 하위의 API 이다.<br/>
메시지 API는 문자 그대로 카톡 유저에게 메시지를 전달하는 기능을 의미한다.
그리고 메시지 API는 다시 '카카오링크' API와 '카카오톡 메시지' API로 나뉜다.

카카오링크는 API를 호출하기만 하면 팝업 창을 띄우고 카톡 친구 목록을 나열해서 유저가 보낼 사람들을 선택하고
공유하기 버튼을 누르면 링크의 공유가 이뤄지는 전과정을 카카오 서버가 알아서 해준다. 그래서 간단하고 단순하다.

카카오톡 메시지 API는 내부적으로 내 블로그 서버에 카톡 친구 목록 데이터만 넘겨주고, 팝업 창, 보낼 사람 목록 선택 등
최종 공유 요청을 제외한 나머지 과정을 수동으로 제작해야하는 API이다.
그만큼 세부적인 조정이 가능하지만 단순 링크 공유 목적에서 봤을땐 과하다.
특히 내 블로그가 돌아가고 있는 서버는 Github 서버이지 내가 운용하는 서버가 아니다.. 😥
그러므로 가능한진 모르겠지만 카카오톡 메시지 API 까지는 건드리지 말자.

자세한 내용은 카카오에서 공식 제공하는 메뉴얼을 아래 링크를 통해 살펴 보자.

* 메시지 API: <https://developers.kakao.com/product/message>
* 카카오 메시지 API 이해하기: <https://developers.kakao.com/docs/latest/ko/message/common>
* 카카오링크 API: <https://developers.kakao.com/docs/latest/ko/message/js-link>

## 7. 메시지 템플릿 빌더

이제 '카카오링크' API를 사용하기 위해 API를 등록하고 메시지 내용이 상대에게 전달됐을 때 상대에 보이는 카톡 말풍선의 형태를 정의 할 것이다.

이를 위해 왼쪽 메뉴에서 `카카오링크`를 클릭하자. 카카오링크 화면의 하단의 `메시지 템플릿 목록`에는 아직 아무것도 없다.

메시지 템플릿을 만들기 위해 `메시지 템플릿 빌더 바로가기` 버튼을 클릭하자.

![Kakao Link - Message Builder]({{ site.gdrive_url_prefix }}15ih5vXv3tbBBnUKqdqN2SSyc3uzY0kSp){:style="max-height: 500px;"}

여기서 메시지 템플릿을 제작할 수 있다. 템플릿을 제작하는 것은 카카오링크 API를 사용 등록하는 것이며,
하나의 카톡 말풍선의 레이아웃을 제작하는 것이다.

### 템플릿 만들기

왼쪽의 `+ 템플릿 만들기`를 클릭하자.

![Message Template List]({{ site.gdrive_url_prefix }}1wSnNc9DybjJ_bVGNZYidY4nxzXUmKgdg){:style="max-height: 400px;"}

`+ 템플릿 만들기`를 클릭하면 아래와 같이 기본 레이아웃을 선택하는 팝업이 뜬다. 이중 맨왼쪽의 `FEED`를 선택하고 확인을 누른다.

![Generate Message Template]({{ site.gdrive_url_prefix }}14GhA55yrujuhe0Jednta7Vzu393BL-8V){:style="max-height: 500px;"}

화면 왼쪽의 `+ 템플릿 만들기` 아래에 방금 생성한 템플릿 목록이 하나 추가된 것이 보인다. 템플릿의 ID가 60282로 할당되었다.
이 ID 값은 나중에 블로그 측에서 원하는 템플릿을 지정할때 사용한다.
템플릿 설명란에는 템플릿이 어떤 역할을 하는지 알기 쉽게 설명을 달아주자.
내 블로그에서 공유를 위한 템플릿의 템플릿 설명에는 "Share On" 이라고 썼었다.

![Message Template List after generating]({{ site.gdrive_url_prefix }}1p4iRwDdTswWFf3O5A7pUXfbOx8OXrpCF){:style="max-height: 500px;"}

### 이미지 탭

그 다음 내용을 하나씩 살펴보자. 왼쪽에 <strong>미리보기</strong> 칸이 있고 그 옆에 7가지 탭(`이미지`, `프로필`, `제목/설명`, `소셜`, `버튼`,
`공통링크`, `기타`)들이 있다.
이 탭들의 내용을 채워가면서 <strong>미리보기</strong>를 통해 현재 메시지 템플릿을 이용하여 카카오 링크가 공유되었을 때
상대가 보게될 말풍선을 미리 볼 수 있다.

이곳의 내용은 새로 작성한 메시지 템플릿으로 설명하지 않고 기존 내 블로그에서 사용하고 있는 메시지 템플릿을 가지고 설명한다.

이제 탭의 내용을 단계적으로 채워보자. 먼저 `이미지` 탭을 보면 기본적으로 이미지 3개가 들어가도록 설정되어 있다.
첫번째 이미지 섹션에는 '이미지 업로드'와 'Custom' 2가지 선택지가 있다.

'이미지 업로드'를 선택하고 이미지를 업로드하면, 카카오 링크가 공유됐을 때 업로드 해놓은 이미지가 공유 상대가 받는 말풍선에 항상 함께 나타난다.

하지만 나는 고정적인 이미지 전달이 아니라 동적으로 이미지를 전달하기로 했다.
즉, 카카오 공유 버튼을 클릭했을 때 공유된 페이지에 있는 이미지를 할당해서 전달할 것이다.
그렇게 하기 위해 'Custom'을 선택하고 `${img1}`이라고 쓰자.
`${img1}`은 User Argument를 의미하는데 이것이 무엇인지는 뒤이어 [제목/설명 탭](#제목설명-탭)을 설명할 때 설명하도록 한다.

이미지 사이즈, 비율, 생중계 섹션까지는 필요하지 않으므로 기본값으로 한다.

![Message Template - Image]({{ site.gdrive_url_prefix }}17cOv4mWpj_Oqi5xm3BYkvfQgtNp1lxEI){:style="max-height: 500px;"}

### 프로필 탭

그다음 `프로필` 탭에서는 '사용 안함'을 선택하자. 원한다면 사용하자. 이 값 역시 User Argument를 이용하면 좋다.

![Message Template - Profile]({{ site.gdrive_url_prefix }}1HcOMhykMORlE6K7MqFJx8Il4hHF54I26){:style="max-height: 300px;"}

### 제목/설명 탭

다음은 `제목/설명` 탭의 내용을 채워보자. 여기서는 User Argument에 대해서 살펴본다.<br/>
탭 내용에서 유추 할 수 있듯이 공유하려는 링크에 대한 제목과 설명을 말풍선에 채워넣는 칸이다.
만약 제목에 "안녕하세요", 설명에 "Sammy Baek 입니다."라고 적으면 <strong>미리보기</strong>에서도 볼 수 있듯,
모든 말풍선에서 고정적인 텍스트로 전달될 것임을 알 수 있다.

그런데 내 블로그에서는 공유 버튼을 클릭했을때 말풍선 제목에 고정된 텍스트가 아니라
공유 버튼이 클릭된 시점에 해당 페이지의 타이틀, 설명에는 해당 페이지의 설명을 동적으로 할당해 넣을 것이다.
이를 위해 아래 그림과 같이 실제 제목과 설명 텍스트 대신 `${title}`과 `${description}` 이라는 값이 적혀있다.
이런 동적 할당 작업은 `${변수명}` 포맷의 User Argument를 이용해서 할 수 있다.

![Message Template - Title & Description]({{ site.gdrive_url_prefix }}1XSoiK-f9xM5Dp-9Gsm8GArO5bNHxER50){:style="max-height: 400px;"}

#### User Argument

User Argument란 템플릿 빌드 중에 입력해야하는 입력 필드의 값을 템플릿을 생성하는 시점에 할당해 두는 것이 아니라
나중에 원하는 시점에 채워넣기 위해 비워두는 공간을 의미한다. (Placeholder의 역할을 한다.)

User Argument를 사용할때는 다음의 과정을 진행한다.
템플릿 빌드 화면에서는 특정한 입력 필드 자리에 텍스트 대신 그 필드를 지칭하는 변수를 `${변수명}` 포맷으로 작성한다.<br/>
그리고 내 블로그에서는 Custom Javascript로 템플릿 빌드 화면에서 작성한 이름과 동일한 키 `변수명`을 가지는
Json 오브젝트를 만든 다음,
API 호출 함수에 템플릿 ID와 `변수명`을 인자로 넘겨주면 된다.

예를 들어, 템플릿 빌드 화면에서 말풍선 제목으로 들어갈 값을 User Argument `${title}`이라고 정의하였다면
Custom Javascript에서 말풍선 제목의 실제 텍스트를 채워줄 때는 아래 같은 코드가 필요하다.<br/>
Custom Javascript는 뒤에서 또 설명하므로 지금은 따라 만들지 말고 눈으로만 보자.

```javascript
sendScrap({
  ...,
  templateId: 60282,
  templateArgs: {
    title: $('meta[property="og:title"]').attr('content')
  },
  ...
});
```

`sendScrap`이 우리가 사용할 API 함수이다.<br/>
`templateId`는 템플릿 빌드할 때 자동 생성되었던 템플릿 ID를 의미한다.<br/>
그리고 `templateArgs`에서는 템플릿에서 정의한 User Argument들의 값을 채운다.<br/>
버튼이 클릭되면 페이지 HTML에서 페이지 타이틀을 추출하고 Json 오브젝트의 키 값 `title`에 할당한다.
이것은 API 함수에 인자로 전달 되며 API 함수가 호출되면 `templateArgs`가 자동 파싱되어 `title` 값이
템플릿 ID `templateId`를 가진 템플릿에서 User Argument `${title}` 자리에 채워진다.

템플릿 빌드 화면에서 <strong>미리보기</strong> 칸 밑에 <strong>User Argument</strong> 칸을 보면 해당 템플릿에서
어떤 User Argument를 사용하고 있는지 그 목록을 볼 수 있다.

![Message Template - User Argument]({{ site.gdrive_url_prefix }}1vB9RrzbTp0eCvk4xWD1zTgHExX15YGZa){:style="max-height: 300px;"}

### 소셜 탭

`소셜` 탭에서는 좋아요 수, 구독자 수 같은 값들을 포함시킬 수 있다.
이러한 좋아요 수, 구독자 수는 유저가 행위를 할 때 마다 동적으로 변화한다.
그러므로 사용한다면 User Argument를 이용하는 것이 좋다.<br/>
그러나 블로그가 돌아가고 있는 Git Page는 내가 운용하는 별도의 서버가 아니고 Static Web Page이므로 이런 Back-End 기능을 넣을 수 없다.
따라서 '사용 안함'을 선택하자.

![Message Template - Social]({{ site.gdrive_url_prefix }}1Cn-AwHjTzApVFuMdnFS4OUygvr1z4-hH){:style="max-height: 200px;"}

### 버튼 탭

`버튼` 탭에서는 말풍선에 버튼을 추가할 수 있다. 우리는 '자세히 보기' 버튼 하나만 넣고 공유할 블로그 페이지의 링크와 연결시키면 된다.
따라서 아래 그림과 같이 작성한다.

![Message Template - Button]({{ site.gdrive_url_prefix }}100I8dobfkDoYj9VVBeiMGnheqLmq2Jiz){:style="max-height: 500px;"}

### 공통링크 탭

`공통링크` 탭에서는 위 섹션 `버튼` 탭에서 버튼을 클릭했을때 연결시켜줄 링크를 정의하는 곳이다.

앞서 애플리케이션을 등록할때 Web 플랫폼에서 사용할 것으로 등록했으므로 Android, iOS는 하지 않고 모바일 웹과 웹만 설정한다.
아래 그림과 같이 DOMAIN, PATH 필드의 내용을 넣으면 버튼 클릭 시
연결되는 링크는 `https://seungwubaek.github.io/${pagePathname}`이 된다.

여기서도 User Argument `${pagePathname}`이 사용된 것을 볼 수 있다.<br/>
그 이유는 마찬가지로 항상 고정된 링크를 전달하지 않고 블로그 페이지에서 공유 버튼이 클릭된 시점에 해당 페이지의 URL을 추출해서
동적으로 링크 URL을 할당해줘야 하기 때문이다.

![Message Template - Common Link]({{ site.gdrive_url_prefix }}1MoStHCm7wvcDN-e3UaI71UVwGwglSMvb){:style="max-height: 500px;"}

### 기타 탭

`기타` 탭에서는 출처 링크를 정할 수 있다. 각자 블로그 주소로 지정하자.

![Message Template - ETC]({{ site.gdrive_url_prefix }}1EKrP_MpNqRaRKKIA9fpLwTecI-rfuwq2){:style="max-height: 500px;"}

그리고 기타 설정에서 전달 기능을 부여할 수 있는데.. 전달 가능하게 해줘야 내 블로그가 널리 퍼지지 않을까.. ㅎㅎ

![Message Template - ETC / ETC Settings]({{ site.gdrive_url_prefix }}1pjNe0Jc1oAUGBkGOBQAgJAZaLXFrTjp-){:style="max-height: 150px;"}

여기까지 만들면 메시지 템플릿 작성이 완료된다. 앞으로는 내 블로그 쪽에서 수행할 작업만 남았다.

## 8. Kakao 버튼 만들기

이번 섹션에서는 Kakao 공유 버튼을 만든다.<br/>
이 과정을 거치면서 디자인 측면에서는 각자의 블로그에 따라 버튼의 크기와 카카오 아이콘 색깔들을 정확히 정하고
기능 측면에서는 Javascript로 해당 버튼을 클릭하는 이벤트가 발생했을때 카카오 API를 호출하여 공유하는 기능을 부여한다.

### 카카오 디자인 가이드

아래 사이트에 접속하면 '웹 환경에서 사용 가능한 카카오 링크 버튼'에 대한 리소스를 다운로드 받을 수 있다.

<https://developers.kakao.com/tool/resource/talk>

그런데 리소스 아이콘 크기가 작고(애초에 작은 아이콘 용도로 쓰는 것이긴 하다) 해상도가 낮아 내 블로그에서는 내가 직접
카카오 심볼(말풍선) 모양과 색상을 똑같이 따서 하나 만들어서 사용하고 있다.<br/>
<span class="md-monologue">다운로드 받은 아이콘을 피피티에 넣고 크기를 키운 후 투명도를 올린 다음 피피티 일반 도형들을 그 위에 올리자..</span>

```html
<img style="width: 25px; height: 25px;" src="/assets/images/icon/kakao_bubble.png"/>
```

<img style="width: 25px; height: 25px;" src="/assets/images/icon/kakao_bubble.png"/>

그밖에 아래 사이트에 접속하면 `카카로 로그인` API를 사용할때 요구되는 여러가지 상세한 디자인 가이드를 볼 수 있다.

다른 플랫폼의 로그인 버튼과 카카오 로그인 버튼을 나란히 배치할 때 그 크기를 다른 버튼과 동등히 해야만 한다고 말하고 있다.
카카오에서 중요시하는 디자인 상의 주의점으로 어떤것들이 있는지 한번 읽어보자.<br/>
단, `카카오 로그인`에 대한 주의사항이라서 우리가 구현하는 공유 버튼에 해당하지 않는 내용도 있다.

<https://developers.kakao.com/docs/latest/ko/reference/design-guide#login-button>

위 링크의 내용을 읽다보면 아이콘 배경색에 대한 컬러 코드(#FEE500)도 알 수 있다.
해당 컬러 코드를 입히면 아래 같은 아이콘 컨테이너를 만들 수 있다.

```html
<p>
<a style="display: inline-flex; width: 40px; height: 40px; border-radius: 8px; background-color: #FEE500;"></a>
</p>
```

<p>
<a style="display: inline-flex; width: 40px; height: 40px; border-radius: 8px; background-color: #FEE500;"></a>
</p>

이제 심볼과 컨테이너를 합치면..

```
<a style="display: inline-flex; width: 40px; height: 40px; border-radius: 8px; background-color: #FEE500; align-items: center; justify-content: center;">
  <img style="width: 25px; height: 25px;" src="/assets/images/icon/kakao_bubble.png"/>
</a>
```

뿅 !

<p>
<a style="display: inline-flex; width: 40px; height: 40px; border-radius: 8px; background-color: #FEE500; align-items: center; justify-content: center;">
  <img style="width: 25px; height: 25px;" src="/assets/images/icon/kakao_bubble.png"/>
</a>
</p>

디자인이 완성되었다.

### 카카오 공유 버튼

위에서 만든 공유 버튼과 유사하게 내 블로그에서는 아래의 소스를 사용한다.

```html
<a class="btn btn--kakao" id="shareon-kakao" title="Share on Kakao"
    onclick="scrapKakao(this);">
  <img class="kakao-symbol" src="/assets/images/icon/kakao_bubble.png"/>
  <span> Kakao</span>
</a>
```

위 섹션 [카카오 디자인 가이드](#카카오-디자인-가이드)에서 얘기한 카카오의 노랑 바탕색과 둥근 모서리 등의 디자인을
CSS Class `btn`, `btn--kakao`로 미리 정의해 두고 `<a>` 태그에 적용하였다.

CSS Class `btn`, `btn--kakao` 들은 카카오 디자인 뿐만 아니라 버튼의 역할을 하기위한 여러가지 CSS가 적용되어있다.<br/>
이러한 CSS들은 내 블로그에 특화된 디자인에 대한 내용이므로 각자 취향껏 CSS를 작성해보자.

Jekyll Theme `Minimal-Mistakes`를 사용자라면 CSS Class `btn`, `btn--kakao`을 똑같이 넣을 수 있다.<br/>
이 부분은 SCSS 기술을 사용해서 구현하므로 그 내용을 보충 설명하겠다. 같은 테마를 사용하고 있지 않다면 넘어가도 된다.<br/>
`_buttons.scss` 파일에서 `.btn` 클래스 내부에 `$buttoncolors:`로 시작하는 라인을 찾는다.
이 라인은 프로그래밍 언어에서 Array나 List 같은 역할을 한다.
따라서 그 원소들을 쭉 보면 facebook, twitter, linkdin 들이 있는 것을 알 수 있다.
여기에 이어서 `(kakao, $kakao-color)`라고 넣자.<br/>
그다음 `_variables.scss` 파일에가서 `$kakao-color: #FEE500 !default;`라고 넣자.<br/>
이렇게 하면 CSS Class `btn--kakao`가 자동 생성된다.

그리고 `<a>` 태그가 클릭 됐을 경우 취할 액션은 속성 `onclick="scrapKakao(this)";` 코드를 넣어서
Custom Javascript에 정의한 내용이 작동하도록 하였다. Custom Javascript의 내용은 아래에 이어서 다룬다.

`<a>` 태그 내부의 `<img>` 태그는 카카오 심볼 이미지를 로드하는 태그이다.

`<span> Kakao</span>`은 카카오 레이블에 해당하는 텍스트이다.

## 9. Kakao API 호출하는 Javascript 함수 만들기

버튼 디자인까지 완료되었으므로 이제는 버튼 클릭 이벤트가 발생하면 카카오링크 API가 호출되도록 Custom Javascript를 구현할 차례이다.

이 과정을 진행하면서 우리는 총 3개의 `<script>` 태그를 블로그 포스트 페이지의 HTML 코드에 삽입하게 된다.<br/>
첫번째는 카카오 SDK를 로드하는 부분, 두번째는 SDK를 초기화하는 Javascript 코드, 세번째는 카카오링크 API를 호출하는
Custom Javascript 코드이다.<br/>
이 3개의 `<script>`는 전체 HTML 코드 내에서 각자의 삽입 위치는 상관 없지만 반드시 서로 간의 순서는 유지하면서 삽입 돼야한다.
그래서 관리 편의성을 위해 아래와 같이 3개 나란히 삽입할 것이다.

```html
{% raw %}{% if page.use_kakao-sdk %}{% endraw %}
<script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
<script type="text/javascript">
  Kakao.init('카카오 개발자 사이트에 등록한 Javascript 앱 키');
</script>
<script src="{{ "/assets/js/kakao-custom.min.js" | relative_url }}"></script>
{% raw %}{% endif %}{% endraw %}
```
{:id="kakao-script"}

위 코드의 내용은 이어서 설명하면서 하나씩 파헤쳐 본다.

### Kakao SDK 다운로드

카카오링크 API를 사용하기에 앞서 해당 API에 관련된 세부적인 구현 코드가 담긴 SDK가 필요하다.
아래 링크에 접속해보면 몇가지 버전의 SDK가 존재한다.

<https://developers.kakao.com/docs/latest/ko/sdk-download/js>

그 중 SDK 코드를 압축하고 경량화한, 두번째 항목 `Full SDK (Minified)` 버전을 사용 할 건데 직접 다운로드 하진 않는다.<br/>
두번째 항목에 연결돼 있는 링크는 아래 주소와 같다. 클릭해보면 그 내용을 볼 수 있다.
내용을 텍스트 파일로 바꿔보면 105KB 정도의 용량을 가진다.

<https://developers.kakao.com/sdk/js/kakao.min.js>

우리는 해당 SDK를 다운로드하여 블로그 서버에 별도 보관해두지 않고 유저가 블로그의 포스트 페이지에 접속했을때
스스로 SDK를 다운로드 하도록 할 것이다.

이처럼 블로그 서버에 SDK를 보관해두지 않는 이유는, 클라이언트가 SDK가 필요할때 마다 블로그 서버에서 SDK를 전달해주려면
클라이언트와 블로그 서버 측 모두 SDK 용량에 해당하는 105KB 만큼의 네트워크 트래픽을 감당해야 하기 때문이다.
따라서 그 트래픽을 우리 블로그 서버 측에서 부담하지 않고 카카오 서버 측으로 넘기기 위해서 클라이언트가 직접 다운로드 하게했다.
<span class="md-monologue">쉿... 카카오 형님한텐 비밀</span><br/>
또한 이런 SDK의 경우 버전 업데이트가 잦으므로 SDK를 제공하는 사이트에서 직접 받아오는게 최신화에 유리하기 때문이다.<br/>
그러나 클라이언트 측에서는 SDK를 블로그 서버에서 제공하나, 카카오 서버에서 제공하나 상관없이 105KB 만큼 다운로드를 해야하므로
반드시 네트워크 트래픽을 감당해야 한다. 이것은 클라이언트의 블로그 사용 경험에 부정적인 영향을 주는 요소이므로 염두에 두자.<br/>
이 클라이언트 측의 네트워크 트래픽을 줄이기 위해서는 AJAX 방식의 블로그가 필요한데 일단 생략한다.
안타깝지만 내 블로그도 AJAX 방식으로 동작하지 않는다.
<span class="md-monologue">Jekyll Theme Minimal-Mistakes를 기반으로 하기 때문인데,
한번 맘 먹고 뜯어 고치려다가 너무 할게 많고 귀찮아서 보류했다.ㅋ</span>

이제 클라이언트가 스스로 SDK를 다운로드 하도록 만들기 위해 카카오 API를 사용하는 HTML 코드 어딘가에
아래와 같은 `<script>` 태그를 하나 만들어 넣을 것이다.

내 블로그에서는 포스트 페이지의 하단부에 넣었는데
내 블로그 처럼 Jekyll Theme `Minimal-Mistakes`를 사용한다면 `_include/scripts.html` 파일에 넣으면 된다.<br/>
보기만 하고 아직 넣진 말자. 넣게 될 최종 코드는 [위](#kakao-script)에서 보았다.

```html
<script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
```

위 코드의 `src`가 가르키는 URL은 앞에서 봤던 `Full SDK (Minified)`의 URL과 일치한다.<br/>
따라서 내 블로그에 접속한 클라이언트의 브라우저는 `<script>` 태그를 만났을때 알아서 카카오 개발자 사이트의 SDK 목록 페이지에서
`Full SDK (Minified)` SDK를 다운로드하고 실행한다.

### SDK 초기화

위 섹션에서 Kakao SDK를 다운로드 및 실행한 이후에는 SDK를 사용하기 전에 초기화 과정이 필요하다.<br/>
이 과정은 한 줄의 Javascript 코드면 되기 때문에 HTML 코드에 `<script>` 태그를 삽입하고 그 안에 Javascript 코드를 직접 작성한다.

작성할 코드는 아래와 같다.

```javascript
<script type="text/javascript">
  Kakao.init('카카오 개발자 사이트에 등록한 Javascript 앱 키');
</script>
```

`Kakao.init()` 함수 안에 들어가는 `카카오 개발자 사이트에 등록한 Javascript 앱 키`란 개발자 사이트에 애플리케이션을 등록했을때
받은 앱 키를 의미한다.<br/>
잘 기억 나지 않는다면 [애플리케이면 요약정보](#애플리케이션-요약정보) 섹션에서 설명했던 앱 키에 대해 다시 읽어 보자.

### Custom Javascript

앞에서 카카오 SDK를 다운로드 및 로드 하였고 초기화(`Kakao.init()`) 하였으므로 이제 SDK를 사용할 수 있다.<br/>
본격적으로 이번 섹션에서 SDK를 활용하여 카카오링크 API를 호출하는 Custom Javascript를 작성해본다.

#### sendScrap

우리는 카카오링크 API를 호출하기 위해 카카오 SDK에 정의돼있는 `sendScrap()` 함수를 사용할 것이다.

`sendScrap()` 함수는 함수명 '스크랩'하여 '전송'한다('send', 'scrap')에서 그 기능을 어느정도 유추 할 수 있듯이
사이트의 메타 정보를 담아서 카카오링크를 전송하는 카카오링크 API 이다.<br/>
아래 링크의 문서를 보면 `sendScrap()` 함수가 어떤 인자를 받는지 세부적인 정보를 알 수 있다.

<https://developers.kakao.com/sdk/reference/js/release/Kakao.Link.html#.sendScrap>

이 함수에 사이트의 메타 정보들을 담아 실행시키면 앞서 [메시지 템플릿 빌더](#메시지-템플릿-빌더) 섹션에서 등록한 메시지 템플릿의
디자인에 사이트의 메타 정보들이 담기고 아래와 같은 메시지 형태로 대상자에게 전송된다.

![Kakao Message Template - Preview]({{ site.gdrive_url_prefix }}1a8Um1Ypj77ZpuCntmI1jST9o_7WSTbri)

#### 구현

이제 카카오링크 API `sendScrap` 함수를 활용하는 코드를 작성해보자.

아래의 코드는 `scrapKakao()` 라는 함수를 정의하고 있다. 이 함수는 내부에서 카카오링크 API `sendScrap()` 함수를 호출한다.<br/>
또한 `scrapKakao()` 함수는 앞서 [Kakao 버튼 만들기](#kakao-버튼-만들기) 섹션에서 만든 버튼의 `onclick` 속성에서 호출된다.<br/>
즉, `scrapKakao()` 함수는 카카오 공유 버튼이 클릭되면 실행되고 `sendScrap()` 함수를 호출해서 카카오링크 기능을 수행한다.

나는 `/assets/js/customs/kakao.js` 라는 파일을 생성하고 아래의 코드를 작성한 후 나중에
`/assets/js/kakao-custom.min.js` 파일로 Minify 하였다.<br/>
Minify가 무엇인지 잘 모르겠다면 [이전 포스트]({{ site.base_url}}/blog/share_on_clipboard/#uglify-)에서
Uglify(=Minify)에 대해 조금 언급했던 내용을 참고하자.

##### 최종 코드

```javascript
function scrapKakao() {
  var imgUrl1 = 'https://seungwubaek.github.io/android-chrome-192x192.png';
  var imgUrl2 = '';
  var imgUrlRest = '';
  var $imgs = $('.page__content img');
  var imgUrlCnt = $imgs.length+1;
  if($imgs.length > 0) {
    imgUrl2 = $imgs[0].src;
  }
  if($imgs.length > 1) {
    imgUrl2 = $imgs[1].src;
  }
  if($imgs.length > 2) {
    imgUrlRest = $imgs[2].src;
  }

  Kakao.Link.sendScrap({
    requestUrl: location.origin + location.pathname,
    templateId: 46696,
    templateArgs: {
      img1: imgUrl1,
      img2: imgUrl2,
      imgRest: imgUrlRest,
      imgCnt: imgUrlCnt,
      title: $('meta[property="og:title"]').attr('content'),
      description: $('meta[property="og:description"]').attr('content'),
      pagePathname: location.pathname
    },
    installTalk: true
  });
}
```

##### 코드 설명

첫번째 라인부터 차근차근 따라가보자.

```javascript
function scrapKakao() {
  var imgUrl1 = 'https://seungwubaek.github.io/android-chrome-192x192.png';
  var imgUrl2 = '';
  var imgUrlRest = '';
```

첫번째 라인에서 함수명을 정의하고 함수 블록이 시작된다.<br/>
2~4라인은 3개 이미지의 이미지 주소를 정의했다. 이 3개 값은 메시지 템플릿에서 작성한 3개의 이미지 칸에 각각 들어가게된다.<br/>
첫번째 이미지 주소는 내 블로그 아이콘으로 항상 고정돼있으며 두번째, 세번째 이미지 주소는 기본적으로 공란으로 설정되어있다.

```javascript
var $imgs = $('.page__content img');
var imgUrlCnt = $imgs.length+1;
if($imgs.length > 0) {
  imgUrl2 = $imgs[0].src;
}
if($imgs.length > 1) {
  imgUrl2 = $imgs[1].src;
}
if($imgs.length > 2) {
  imgUrlRest = $imgs[2].src;
}
```

그리고 `var $imgs` 변수에는 현재 포스트 페이지에 있는 모든 이미지 사진이 Jquery로 선택되어 담긴다.
`var imgUrlCnt` 변수는 `var $imgs` 변수에 담긴 이미지 개수가 총 몇개인지 센다.
(`+1`을 한 이유는 첫번째 이미지로 내 블로그 아이콘을 항상 포함하기 때문이다.)

다음 라인의 if문을 보면 앞에서 작성한 `var imgUrl2`, `var imgUrlRest` 변수에 이미지 주소를 할당하는 작업을 진행한다.<br/>
처음부터 바로 각 변수에 이미지 주소를 할당하지 않은 이유는 포스트 마다 포함된 이미지 개수가 다르기 때문이다.

위 코드에 따르면 페이지에 포함된 이미지가 아예 없으면 공유된 메시지의 첫번째 이미지에 내 블로그 아이콘만 나타날 것이고
나머지는 빈칸일 것이다.<br/>
이미지가 1개 있으면 공유된 메시지의 첫번째 이미지에 내 블로그 아이콘, 두번째 이미지에 페이지에 포함된 1개의 이미지가 나타난다.<br/>
이미지가 2개 있으면 공유된 메시지의 첫번째 이미지에 내 블로그 아이콘, 두번째 이미지에 페이지에 포함된 이미지 중 두번째 이미지가 나타난다.<br/>
이미지가 3개 이상 이면 공유된 메시지의 첫번째 이미지에 내 블로그 아이콘, 두번째 이미지에 페이지에 포함된 이미지 중 두번째 이미지,
세번째 이미지에 페이지에 포함된 이미지 중 세번째 이미지가 나타난다.

이는 이미지 개수에 따라 이미지 배치를 어떻게 할 것인지에 대한 개인적인 처리 방안이므로 이미지 배치에 관해서는
각자의 판단에 맡긴다.

마지막으로 예상한대로 아래의 코드가 카카오링크 API의 몸체이다.<br/>
이 앞의 코드들은 몸체 코드에 들어갈 내용을 미리 준비(메모리로 로드)하는 과정이라고 생각하면 된다.

```javascript
Kakao.Link.sendScrap({
  requestUrl: location.origin + location.pathname,
  templateId: 46696,
  templateArgs: {
    img1: imgUrl1,
    img2: imgUrl2,
    imgRest: imgUrlRest,
    imgCnt: imgUrlCnt,
    title: $('meta[property="og:title"]').attr('content'),
    description: $('meta[property="og:description"]').attr('content'),
    pagePathname: location.pathname
  },
  installTalk: true
});
```

카카오링크 API `sendScrap()` 함수는 SDK의 메소드로 정의되어 있으므로 `Kakao.Link.sendScrap()`으로 호출 할 수 있다.<br/>
그리고 `sendScrap({Json Object})` 형태로 Json Object를 인자로 받는다.

그 인자를 순서대로 보자. 이런 인자들 중 몇개는 옵션이므로 굳이 작성하지 않을 수도 있다.<br/>
`requestUrl`은 상대에게 전달할 URL이다. 즉, 공유할 페이지의 링크이다.<br/>
`templateId`는 메시지 템플릿으로 사용할 템플릿 ID 값이다. 앞의 [템플릿 만들기](#템플릿-만들기) 섹션에서 등록한 템플릿 ID를
여기에 입력해준다.<br/>
`templateArgs`의 내용은 다시 Json Object로 되어있다. 그 내부의 Key/Value 중 Key의 이름은 메시지 템플릿에서 작성했던
User Argument의 이름과 같다.
`templateArgs` 중 이미지(`img1`, `img2`, `imgRest`)를 넣어주는 부분이 특이한데 이미지 데이터를 직접 넘겨주는 것이 아니라,
이미지 주소를 넘겨주고 있다.<br/>
`templateArgs`에 특정 Key의 값으로 넣은 Value가 Key 이름과 동일한 메시지 템플릿의 User Argument에 매칭되고
Value와 같은 값으로 치환된다.<br/>
마지막 `installTalk`는 카카오톡이 설치돼 있지 않을경우 설치 페이지로 이동시킬건지 정하는 옵션이다.

아래 그림은 메시지 템플릿의 User Argument와 `templateArgs`가 실제 카카오링크 말풍선에서 어디에 위치하는지 표시한 그림이다.

![Kakao Link Message Template - Detail Structure]({{ site.gdrive_url_prefix }}1urt60whr85opvp_YrKdrjiPpNJs5yMgR){:style="max-height: 550px;"}

붉은색 레이블은 카카오 메시지 빌더에서 지정한 User Argument를 의미한다.<br/>
푸른색 레이블은 Custom Javascript에서 작성한 값을 의미하며 붉은색 레이블(User Argument)과 동일한 자리에 들어간다.

### SDK 켜기/끄기

마지막으로 [Kakao API 호출하는 Javascript 함수 만들기](#kakao-api-호출하는-javascript-함수-만들기) 섹션 초반에 보인 HTML 코드에서
처음 라인의 `{% raw %}{% if page.use_kakao-sdk %} ... {% endif %}{% endraw %}` 코드는 카카오 SDK 사용을 켜거나 끄는 기능을 한다.

이 코드는 Liquid로 작성한 코드인데 Git Page가 Jekyll을 사용하기 때문에 정상 작동한다.
포스트 머릿말에 아래와 같이 `true` 값을 주어 작성하면 카카오 SDK를 켤 수 있고 `false` 값을 주어서 끌 수도 있다.

````html
```
use_kakao-sdk: true
```
````

켜거나 끈다는 개념은 서버가 동작 중에 동적으로 수행되는 것이 아니고 Jekyll이 페이지를 빌드하는 시점에 위 값을 확인하고
그 값이 `false` 이면 그 내부 블록({% raw %}{% endif %}{% endraw %}를 만날 때 까지의 영역)에 있는 3개 `<script>` 태그를
HTML 코드에 넣지 않고 페이지를 생성한다는 의미이다.

이처럼 카카오 SDK 사용을 켜거나 끄는 이유는 SDK를 사용하지 않음에도 SDK에 관련된 3개의 `<script>` 태그가
항상 로드되어 SDK를 다운로드 하고 `scrapKakao()` 함수를 정의하기 때문이다.<br/>
그래서 카카오 SDK를 사용하지 않을 때 false를 주면 `<script>` 태그들이 로드 되지 않고 SDK도 다운로드 하지 않으므로 클라이언트 측의
네트워크 부하를 줄여줄 수 있다.

내 블로그에서는 특정 페이지가 Jekyll 프레임워크 기준으로 '포스트' 종류의 페이지인 경우에 자동으로 `use_kakao-sdk` 값을
`true`로 설정하도록 했다.<br/>
이 방법은 `/_config.yml` 파일에 아래와 같은 내용을 넣어서 구현 할 수 있다.<br/>
추가로, `_config.yml` 파일 변경하고 변경 사항이 올바로 반영 되었는지 로컬 환경에서 테스트 하려면 잊지말고 Jekyll Server를
재시작하여야 한다.

```
defaults:
  - scope:
      path: ""
      type: posts
    values:
      use_kakao-sdk: true
```

여기까지 카카오 공유 버튼 만들기 설명을 완료했다. 개인적으로 이해가 부족해서 구현상 허점이 몇군데 있는 것 같다.<br/>
하지만 지금까지의 내용들을 이해한 독자라면 필요없는 부분은 삭제하고 더 좋은 기능은 추가해서 지금까지 설명한 것 보다 더 나은 형태의
카카오링크를 생성할 수 있을 것이다.

<div class="md-reference" markdown=1>
* <https://developers.kakao.com/>
* <https://developers.kakao.com/product/message>
* <https://developers.kakao.com/docs>
* <https://developers.kakao.com/docs/latest/ko/message/common#intro>
* <https://developers.kakao.com/docs/latest/ko/message/common>
* <https://developers.kakao.com/docs/latest/ko/message/js-link>
* <https://developers.kakao.com/docs/latest/ko/reference/design-guide#login-button>
* <https://developers.kakao.com/docs/latest/ko/sdk-download/js>
* <https://developers.kakao.com/sdk/js/kakao.min.js>
* <https://developers.kakao.com/sdk/reference/js/release/Kakao.Link.html#.sendScrap>
* <https://developers.kakao.com/tool/resource/talk>
</div>
