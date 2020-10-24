---
layout: posts
title: "[Git Page로 Blog 만들기] - 준비 및 시작"
---
Github 서비스를 이용해서 나만의 Github Page를 만들자.

## Requirement

* Git, Github<br/>
    Git을 사용하는 기본적인 방법을 알아야하고, Github ID와 Git Page 생성을 위한 Repository가 필요함.

* Jekyll<br/>
    웹 페이지를 만들기위해 사용할 프레임워크

* HTML, Liquid, CSS, SASS, Javascript<br/>
    웹 페이지의 구조를 잡고 꾸미기위해 사용할 언어

> 나무로된 집을 지으려면 톱에 대한 설명은 하고 가야겠지. 본격적인 블로그 설명에 앞서 블로그를 만드는 도구를 먼저 설명하고 가겠다.

## Jekyll

`Jekyll`은 여러 텍스트 파일로부터 정적 웹사이트 구축을 위한 파일을 생성해주는 프레임워크이다.

쉽게 말해서 `Jekyll`은 다양한 형식의 텍스트 파일을 웹 페이지 구성 요소인 `HTML`, `CSS`로 변환해준다. 사실 나도 필요할때 필요한 기능만 사용하는터라 잘 알진 못한다.<br/>
특히 내가 좋아하는 기능은 `Markdown`으로 작성한 문서를 `HTML` 파일로 변환시켜주는 기능이다.<br/>
물론 단순히 변환만으로 끝나는 것이 아니다. 정적 웹사이트를 만든다는 목적에 맞게, 변환된 내용이 그럴듯한 웹 화면으로 보이게끔 자동화된 방법으로 뷰를 꾸미는 것을 돕는다.<br/>
또한 인터넷에 아주 많은 `Jekyll Theme`이 올라와 있으므로 웹 페이지를 빈 화면으로부터 하나하나 다 만들 필요가 없으며, 적당한 테마를 다운받고 가져다 쓰면 된다. 이쁜 테마를 선택했고 뷰가 맘에 든다면 별다른 수정없이 그저 포스팅만 해도 된다.

예를들어, 내 블로그의 데스크탑 모드 화면에서 상단 메뉴, 왼쪽 사이드바는 내가 직접 `HTML`, `CSS`를 수정 및 적용했고 `Jekyll`의 도움으로 다른 뷰에서도 항상 이 2가지가 화면에 보이도록 자동화했다. (반응형 웹으로 만들었기 때문에 모바일 모드로 보면 좀 다르다.)<br/>
동시에 포스트의 글 부분은 `Markdown`으로 작성하였으며 이것을 `Jekyll`이 `HTML` 파일로 변환했고, 나는 그저 `Markdown` 포스트가 `HTML`로 변환된 이후를 가정하고 항상 화면의 중앙에 보이게끔 배치하였다.

## 블로그 만들기

### 블로그 생성

블로그는 HTML, CSS, Javascript를 구성 요소로 해서 만들어진다고 보면된다. 일단 구성 요소들을 만들었다면 브라우저가 구성 요소들을 인식하고 우리가 아는 일반적인 웹 페이지처럼 시각적으로 보여주게된다. 여기까지는 __내__ 컴퓨터에서 __나만__ 볼수 있는 블로그이다.<br/>하지만 우리의 목적은 블로그를 다른 사람들과 공유하는 것이므로, 인터넷이 필요하다.

### 개발 환경 구성

Ruby, Jekyll, VSCode

### Jekyll Tutorial

영문으로 되어있으며 한글 번역 버전이 있으나 100% 번역 돼 있지는 않다.<br/>
일단 블로그 만들기에 부딪히고 보는 사람들도 있겠지만, 나는 어느정도 준비를 한 후에 들어가는 성격이다. 그러니 블로그를 만들기전에 [이곳](https://jekyllrb-ko.github.io/docs/step-by-step/01-setup/)에서 __Jekyll Tutorial__ 을 진행해보자.<br/>
나는 튜토리얼을 완료한 후 오른쪽 리스트 중 <span style="padding: 2px; background-color: black;"><span style="border-bottom: 1px solid red; color: white; font-weight: bold;">컨텐츠</span></span> 항목에 있는 내용도 대층 다 훝어봤다. (핸드폰 모드로 본다면 컨텐츠라는 항목은 상단 콤보박스 안에 있다.)

### Jekyll Theme 가져오기

나는 2020년 10월 기준 가장 Fork가 많았던 [mmistakes theme](https://github.com/mmistakes/minimal-mistakes)을 가져왔다. 이 테마는 운영자가 오래전부터 지금까지 꾸준히 활동하면서 개선 하고 있는 테마이다. 그래서 최근의 트렌드가 가장 잘 반영되었을 것이라 생각했다. 당장 `Google Analytics` 연동, `댓글` 기능이 구현 돼 있는것 만으로도 만족한다.

### 테스트

```shell
gem install jekyll bundler
```

```shell
bundle install
```

```shell
bundle exec jekyll serve
```

### 배포

git page가 빌드되기까지 시간이 걸릴수 있음
