---
layout: single
title: "[Merge] 여러 branch를 하나로 합치기"
post-order: 3
style-branch: "color: yellow; background-color: black;"
---

여러개의 branch를 하나로 합치는 방법을 알아보자. 단, git 충돌(Confilct)은 다루지 않는다.

# 작업 요약

우리가 하려는 작업은 아래 그림으로 요약 할 수 있다. 시간적으로 아래가 과거, 위로 갈수록 현재이다. 여기서, merge를 하면 "merge commit"이 하나 추가된다는 사실을 알아두자.

![]({{ page.gdrive_url_prefix }}1ZbZLYojV78SrE57jS4oCIejZ4PSysJ4c){:style="max-height: 450px;" class="align-center"}

# 예제

## 1. 초기 상태 - 여러개의 브랜치

먼저 아래 그림의 commit log 처럼 브랜치가 여러개로 나뉘어 있는 상황에서 시작한다.<br/>
commit log가 위에 있을수록 최근의 commit이다. 위에서 부터 순서대로<br/>

* 원격 브랜치 총 4개<br/>
  <span style="{{ page.style-branch}}">origin/toc_v2</span>, <span style="{{ page.style-branch}}">origin/new_post</span>, <span style="{{ page.style-branch}}">origin/master</span>, <span style="{{ page.style-branch}}">origin/navremocon</span>

* 로컬 브랜치 총 2개<br/>
  <span style="{{ page.style-branch}}">toc_v2</span>, <span style="{{ page.style-branch}}">master</span>

가 있다.

그리고 그림의 가장 왼쪽에 나뭇가지 같은 수직선이 commit들의 연관 관계를 보여준다. 그리고 그 중 맨 끝점이 세군데가 있는데 이들은 각자 더이상 이어지는 commit이 없다는 의미이다.<br/>
이 포스트의 최종 목표는 이 세 점들을 원격 브랜치 <span style="{{ page.style-branch}}">origin/master</span> 로 모아서 하나의 점으로 연결하는 것이다.

![](https://drive.google.com/uc?export=view&id=1eNAYkcIuBbURG3FQ_-umSDP2GfUVYESB)

## 2. Git Merge (1/3)회

제일 먼저 나의 로컬 브랜치 master가 원격 브랜치 origin/master 와 같은 위치에 가 있도록 하고 HEAD가 master를 보도록 하자.

```shell
git checkout -B master origin/master
```

이제 첫번째 merge를 실행한다

```shell
git merge origin/navremocon
```

그러면 merge가 실행되고 vi editor 화면이 나온다. merge 작업도 하나의 commit 이므로 이 vi editor 화면에서 commit 메시지를 작성할 수 있다. 나는 그냥 닫았다(vi 명령모드 q). 그래도 자동 merge 메시지가 입력된다.<br/>
그리고 아래와 같이 merge로 인해 추가/삭제 된 코드 요약이 출력된다.

![](https://drive.google.com/uc?export=view&id=1iAbbX1FFbApCUohcrNcMo7Er9qhU50K6)

아래 그림은 첫번째 merge 완료 후 commit log 이다. 맨 위의 점으로 아래에서부터 빨강, 연두 2개의 선이 모여들었다.<br/>
맨 위 점에서 빨간선을 따라 내려갈 때, 바로 전 * 로 표시된 commit은 원격 브랜치 origin/master 이고<br/>연두선을 따라 내려갈 때, 바로 전 commit은 원격 브랜치 origin/navremocon 임을 알 수 있다.<br/>merge가 의도한대로 정상적으로 두 브랜치가 하나로 연결된 것이다.

commit 메시지는 `Merge remote-tracking branch 'origin/navremocon'` 라고 자동 입력된 것이 보인다.

![](https://drive.google.com/uc?export=view&id=1pqfgkBaOljayRqBs1hN79C5VhHORHQL_)

## 3. Git Merge (2/3)회

그러면 이제 HEAD는 윗단계 merge로 생성한 새로운 commit에 위치해 있다. 그 새로운 commit 에 다음 브랜치를 또 merge 시킨다.

```shell
git merge origin/new_post
```

아래처럼 merge로 인한 코드 변화 요약 결과가 보이고

![](https://drive.google.com/uc?export=view&id=1HKqIAma9oelAcTpzA39syZMRljvu53rY)

아래 그림의 세번째 commit log 가 윗단계에서 merge commit인데 그 위로 원격 브랜치 origin/new_post 가 합쳐져서 하나로 모인것은 볼 수 있다.

이번에도 commit 메시지는 자동으로 생성한 `Merge remote-tracking branch 'origin/new_post'` 이다.

![](https://drive.google.com/uc?export=view&id=1IuOl2dNru7oa3CSSntC_q0r-pNSiFqsw)

## 4. Git Merge (3/3)회

마찬가지로 마지막으로 한번 더 merge 한다.

```shell
git merge origin/toc_v2
```

![](https://drive.google.com/uc?export=view&id=10MONzsaawrky8NQs0jCDVD39U4gvpD7w)

그럼 여기까지 commit log의 가장 위에 로컬 브랜치 master 로 3개 원격 브랜치의 내용이 모두 모였다! 하지만 아직 끝이 아니다.

![](https://drive.google.com/uc?export=view&id=1j608tjzNIMngPWvnbLD0uwvXLh3w758X)

## 5. 원격 브랜치 업데이트

내 컴퓨터의 디렉토리(로컬)에서 일어난 작업은 아직 github 원격 저장소에 아무것도 반영되지 않았다. 따라서 위의 merge 작업은 원격 저장소에는 아무 영향이 없다.<br/>
이제 실제로 원격 저장소에 merge 결과를 반영 시켜보자.

원격 브랜치 origin/master에 로컬 브랜치 master의 결과를 push 한다.

```shell
git push origin/master
```

## 6. Github 확인

원격 저장소에 push가 완료되면 이제 모든 브랜치가 합쳐진 소스가 반영됐을 것이다. github으로 들어가보면 아래와 같은 커밋 히스토리가 올라가 있는 것을 볼 수 있다.

![](https://drive.google.com/uc?export=view&id=1qpUAW3IysieVhQKvVWYpw3GUPX1YmpsK)
