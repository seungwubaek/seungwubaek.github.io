---
layout: single
title: "Django의 기본적인 특징"
post-order: 1
date: "2023-12-16 02:06:00 +0900"
last_modified_at: "2023-12-16 12:18:00 +0900"
excerpt:
  "
  Django(장고)는 Python 기반의 풀스택 웹 프레임워크이다.
  Django만 있으면 Python 문법의 로직 구현을 통해 완전한 웹 어플리케이션을 개발할 수 있다.<br/>
  Java에게 Spring이 있다면 Python에게는 Django가 있다.
  본 포스트는 Django를 간단히 소개하고 Django의 기본적인 특징에 대해 다룬다.
  "
---

<div class="notice--warning" markdown="1">
본 포스트의 내용은 Django 및 Flask, FastAPI, Spring 등 여러 웹 프레임워크에 대한 개인적인 경험을 바탕으로 작성되었으며,
주관적이거나 정확하지 않은 내용이 포함되어 있을 수 있습니다.
</div>

<img
  src="{{ site.gdrive_url_prefix }}1HPrn2jbbNsLQ4tFgRY6qsSZugo4mME6w"
  alt="Django Logo"
  class="align-center"
  style="max-height: 300px; border-radius: 25px;"
/>

{{ page.excerpt }}

# Django !

Django 공식 홈페이지의 대문 문구를 시작으로 Django에 대해 알아보자.

> Django는 빠른 개발과 깔끔하고 실용적인 디자인을 돕는 고수준 Python 웹 프레임워크이다.
> 숙련된 개발자들에의해 만들어진 Django는 웹 개발의 수많은 번거로운 사항들을 처리하므로,
> 당신은 바퀴부터 재발명할 필요 없이 앱을 작성하는데에만 집중할 수 있다. 이러한 Django는 무료이며 오픈소스이다.

여기서 디자인이란 시각적 디자인이 아니라, 소프트웨어 디자인을 의미한다.<br/>
Django는 웹 애플레이션에 관한 소프트웨어 디자인 패턴 중 널리 알려진 효율적인 방식을 응용하여(MVT 패턴)
웹 서비스를 단계별로 구조화 하고 개발자가 그 위에서 비즈니스 로직을 효과적으로 구현할 수 있도록 돕는다.

또한 바퀴부터 재발명할 필요가 없다는 것은,
개발자가 웹 서비스를 위해 웹 서버에서 구현해야하는 여러가지 로직들이 Django에 이미 최적화된 형태로
완성돼 있다는 의미이다.<br/>
즉, 개발자는 Django가 제공하는 튼튼하고 질 좋고 검증된 바퀴, 핸들, 문, 유리 등(웹 기본 기능들)을 조립하는 것으로
마차를 만들든, 자동차를 만들든 최종 목적을 위한 개발 단계에 즉시 착수할 수 있다는 것을 의미한다.

또 지금은 어디갔는지 모르겠지만, 예전엔 이런 느낌의 문구가 있었던 걸로 기억한다.

> 마감시간에 쫓기는 완벽주의자들을 위한 웹 프레임워크

이 문구는 완벽함을 추구하는 개발자들이 완벽한 웹 기능을 구현하기 위해 겪는 2가지 문제,
'모든 로직은 높은 안정성을 갖고 최적화된 형태로 만들어져야 한다'는 문제와, 그 과정에서 오는 필연적인 '시간 부족' 문제,
이 2가지 문제를 동시에 해결해주겠다는 Django의 철학으로 보인다.

## 발음하기: JANG-oh

Django(장고)는 1930-1950년대 미국의 재즈 기타리스트 Django Reinhardt(장고 라인하르트)의 이름에서 따왔다고 한다.
심지어 장고를 발음하는 오디오 레코드도 있다. 재미로 한번 들어보자.

<https://www.red-bean.com/~adrian/django_pronunciation.mp3>{: target="_blank"}

## Django의 소프트웨어 디자인 패턴

### MVT(Model-View-Template)

Django는 MVT(Model-View-Template) 디자인 패턴을 따른다.

일반적으로 잘 알려진 소프트웨어 디자인 패턴 중 하나로 MVC(Model-View-Controller)가 있는데 MVT는 Django에서 만든 MVC의 변형이다.

MVC와 MVT는 다음과 같은 매칭 관계를 갖는다.

| MVC | MVT |
| --- | --- |
| Model | Model |
| View | Template |
| Controller | View |

## Python 기반의 유일무이한 풀스택 웹 프레임워크

Django는 Python으로 작성된 풀스택 웹 프레임워크이다.

Python으로 작성되었으며, 인증/인가, DB 연동, ORM, View, API, 보안 정책, Admin 등 웹 서비스에 필요한 다양한 기능들을
제공한다.
Django는 긴 역사와 함께 다양한 웹 서비스에 활용되면서 그만큼 다양한 기능들을 갖추게 되었다.

Python 개발자가 웹 서비스 구축을 시도한다면 Django는 차선책이 없는 유일한 선택지가 된다.<br/>
Django 하나가 BackEnd Server 역할 뿐만 아니라 FrontEnd Server 역할까지 모두 담당할 수 있기 때문이다.

### 손쉬운 풀스택 구성

백엔드 영역에서 비즈니스 로직 구현을 위해 Python 기반의 Django API와 Python 순수 문법을 사용하고,
프론트엔드 영역에서 UI 구현을 위해 Django Template(HTML 생성을 위한 Django의 Template Language), CSS, Javascript만 사용해도
추가적인 학습 없이 완전한 웹 서비스를 금방 구축할 수 있다.
보다 편리한 스타일링을 위해 SASS 등의 CSS 전처리기도 도입할 수 있다.

<span class="md-monologue">WSGI(Web Server Gateway Interface)는 Python 기반의 웹 어플리케이션들이
공통적으로 사용하는 필수 레이어이므로 따로 다루지 않음</span>

특히, 개인적으로 Django에서 좋아하는 부분은 Django ORM이다.
Django ORM은 Django와 Python 도메인 수준에서 DB Data 조작을 편리하고 세밀하고 강력하게 수행할 수 있게 도와준다.
Django ORM을 사용하다보면 아름답다고 느껴지기도 한다.

### 빠른 개발

Django는 빠른 웹 어플리케이션 개발을 가능케 한다.
이것은 위 섹션 [Python 기반의 유일무이한 풀스택 웹 프레임워크](#python-기반의-유일무이한-풀스택-웹-프레임워크) 초입에서
설명한 처럼, 웹 개발에 필요한 다양한 기능들이 Django에 대부분 자체적으로 마련돼 있으므로 가능하다.

만약 웹 프레임워크에서 웹 개발에 필요한 어떤 기능을 제공하지 않는다면 개발자는 그것들을 직접 구현해야하고
그만큼 시간을 소모하게 된다.

로그인 기능, DB 연결 기능, 데이터 접근/조작/관리 기능,  통신 기능, 메일링 기능, 파일 업로드/다운로드 기능,
해커는 알지만 나는 잘 모르는 수많은 보안 정책, UI 화면 렌더링 기능, 페이징 기능 등... 🤯<br/>
이러한 기능들은 웹을 구축할 때마다 반복적으로 요구되기 때문에 상당히 번거롭고 시간을 잡아먹지만 절대 빼놓을 수 없다.

Django는 이런 반복적인 웹 서버 기능을 미리 마련해 놓았기 때문에
개발자가 이들을 직접 구현할 필요가 없고 개발 시간을 절약할 수 있게된다.

### 유저와 상호작용하는 웹 서비스에 더욱 적절하다

Django 외에 유명한 Python 기반의 웹 프레임워크에는 Flask, FastAPI가 있다.
이들도 물론 뛰어나지만 Micro Framework 이기 때문에 Django 만큼 웹 서비스를 위한 기능들을
폭넓고 완성도있게 제공하지 않는다.<br/>
따라서 인터넷 상의 수많은 유저와 상호작용하는 웹 서비스를 구축하는 경우 다양한 웹 기능을 골고루 사용해야하므로
Flask, FastAPI 보다 Django를 이용했을 때 개발 속도가 더 빠르다.

### 경험담: 경량의 FastAPI 보다 Django 개발 속도가 더 빠르다

따로 기록해놓은 바가 없어서 정확한 수치를 제시할 수는 없지만 경험담으로써 전하고자 한다.

대략 FastAPI를 이용한 BackEnd API 서버 개발기간으로 당초 1개월을 설정했지만 이후 3개월로 증가했다.
물론 나의 프로젝트 관리 미스도 한몫 했을 것이다.

<span class="md-monologue"></span>

#### 백엔드 API 서버 스택으로 FastAPI 선택 그리고 그 결과
{:.no_toc}

예전에 나는 E-Commerce 웹 서비스 구축을 위해 Django와 FastAPI 중 하나를 백엔드 API 서버 스택으로 선택해야 했었다.

Django에는 웹 서버의 다양한 기본 기능들이 마련되어 있지만 실사용을 위해서는 사용을 위한 설정 단계들이 필요했다.
만약 Django를 쓰지 않는다면 내 프로젝트에 굳이 필요하지 않은 이러한 설정 단계들을 생략하고 개발 시간을 단축할 수 있을 것이라 여겼다.

따라서 프로젝트가 아직 MVP 수준이기도 했고 기능도 간단했으므로 단순한 구조만 염두에 두고 가볍고 빠르다고 알려진 FastAPI를 선택했다.

그러나 결과적으로 FastAPI를 사용하는 것이 전체 개발 시간을 단축시켜주진 못했다.

FastAPI로 코어 API를 구현하는 것까지는 쉬웠다.
하지만 인증/인가/보안이 없는 날것의 상태로 배포할 순 없었기 때문에 추가 개발이 필요했다.

<span class="md-monologue">혹시 내가 바로 마감시간에 쫓기는 완벽주의자?</span>

#### 눈덩이 같이 불어난 추가 개발
{:.no_toc}

효과적인 유지보수를 위한 디자인 패턴 구현, 보안 통신 설정, Access Control 구현, 체계적인 DB 관리 등
조금만 더 살을 붙이려고 시도하니 해야할 일이 엄청나게 많아졌다.

FastAPI는 소프트웨어 디자인 패턴의 형태를 강제 하지 않기 때문에 소프트웨어 디자인을 도입하려면 이를 스스로 결정해야 했다.
나는 MVC 디자인 패턴으로 레이어를 구성하기로 하고 각 단계에 맞는 모듈들을 직접 작성했다.

각 레이어간 연동을 고려해서 설계를 하고 Controller, Service, DTO 등을 직접 구현해 나갔다.

#### Third Party 라이브러리 SQLAlchemy 적용
{:.no_toc}

또한 Django에는 Django ORM이 존재하지만 FastAPI에는 ORM이 존재하지 않기 때문에
데이터 조작을 위해 SQLAlchemy를 연동시키고 DAO를 작성해야만 했다.

SQLAlchemy를 도입하는 것도 결코 쉬운 일은 아니다.
특히 Data Access Layer의 규모가 커지고 역할 비중이 증가할수록 더욱 어려워진다.

이렇게 각 단계를 직접 설계하고 구현해나가다보니, 결국 Django를 이용하는 것 보다 더 많은 시간을 소비했다.
Django의 표현을 빌리자면, 마차로 짐을 옮기려는데 먼저 마차의 바퀴부터 만들어 나갔던 것이다.

#### 유구한 역사(?)를 지닌 커뮤니티
{:.no_toc}

물론 Django 역시, Django 자체적으로 제공하지 못하는 보다 높은 수준의 기능 구현하기 위해
Third Party 라이브러리를 가져와서 사용해야하는 경우가 많다.

Django는 출시된지 상대적으로 오래되었고 Python 진영에서 제일 유명했던 웹 프레임워크이기 때문에
그만큼 커뮤니티의 규모도 크다고 할 수 있다.

따라서 다양한 상황을 커버할 수 있는 다양한 Third Party들이 존재하며,
Django에 마련된 확장기능을 활용하면 그러한 Third Party들을 얼마든지 Plug-in/out 할 수 있다.

예를 들면, WebSocket 같이 Django에서 제공하지 않는 프로토콜을 사용하고 싶다던지,
AWS Cognito 또는 OAuth2.0 같이 인증/인가를 외부 제공자에게 일부 위임한다던지,
Celery 같은 비동기 작업큐를 도입한다던지, Boto3 같은 클라우스 서비스를 사용한다던지,
자체 보안 정책 이상의 추가 정책 적용, 결제 대행 서비스 도입 등의 경우가 이에 해당한다.

중요한 것은 Django가 그런 고도화 기능들을 고려하고 있을 때, Flask, FastAPI는 여전히 기본적인 기능 구현에 애를 먹고 있을 것이다.

## Django의 보안

웹 서비스에서 보안은 아주아주 중요한 요소이다. 두번 말해도 세번 말해도 수백수천번을 말해도 중요하다.
그만큼 중히 여기고 단단한 보안 정책을 준비해도 악의적 공격을 완벽히 방어할 수는 없다.
그래서 Django도 여러가지 공격에 대비한 보안 정책을 제공한다.

* HTTPS
* XSS
* CSRF
* SQL Injection
* Clickjacking
* Session

## Django를 사용하는 회사들

Django는 Instagram, Pinterest, Mozilla, Disqus, Bitbucket에서 사용되었거나 사용되고 있다.

---

지금까지 Django의 기본적인 특징에 대해 알아보았다.
시간이 부족해서 알차게 채우지 못한 부분이 많은 것 같다. 기회가 되면 내용을 조금씩 업데이트할 예정이다.

<div class="md-reference" markdown="1">
* <https://www.djangoproject.com/>
* <https://docs.djangoproject.com/en/5.0/faq/general/#faq-general>
* <https://docs.djangoproject.com/en/5.0/topics/security/>
* <https://en.wikipedia.org/wiki/Django_(web_framework)>
</div>
