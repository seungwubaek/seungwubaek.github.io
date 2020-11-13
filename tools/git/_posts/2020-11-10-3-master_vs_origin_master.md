---
layout: single
title: "[개념] master vs origin/master"
post-order: 1
---

master 와 origin/master 의 차이는 뭘까? 이 포스트를 통해 그 의미들을 이해해보자.

## Git Log

아래 그림은 내 블로그 Repository의 commit log들을 보여준다. 위에 있을수록 최근이며 아래로 갈수록 과거이다.

로그 내용 중 <span style="color: yellow; background-color: black;">(HEAD -> master, origin/master...</span> 라고 쓰여진 것들을 통해 branch 등을 볼 수 있다.

![](https://drive.google.com/uc?export=view&id=1BwE3ZHoUhTLLaHQcs26fLf77QC46RMII)

## Repository vs Branch

master 그리고 origin/master의 모호함은 바로 Remote/Local Repository와 Branch 를 구분하는 것에 어려움을 겪으면서 온 것이다. 위 그림의 노란 부분들을 보자.

### <span style="color: yellow; background-color: black;">origin/master</span>

origin 이라는 이름의 원격 저장소 안에 master 브랜치를 의미한다.

그리고 이 브랜치는 위 commit log 그림에서 첫번째 log인 commit <span style="color: blue;">5c8deb2</span> 를 보고있는 상태이다.

보통 원격 저장소를 새로 만들면, 자동으로 가장 초기 상태의 원격 저장소 별칭은 origin으로, 초기 상태의 브랜치는 master로 만들어진다.

### <span style="color: yellow; background-color: black;">origin/navremocon</span>

origin 이라는 이름의 원격 저장소 안에 navremocon 브랜치를 의미한다.

origin/navremocon 브랜치는 commit log 4번째 줄의 commit <span style="color: blue;">56e2efa</span> 를 보고있는 상태이다.

추가로 origin/navremocon은 바로 1개 commit 이전에 origin/master와 서로 다른 가지로 갈라진 것을 볼 수 있다.

### <span style="color: yellow; background-color: black;">origin/HEAD</span>

origin 원격 저장소의 '현재' 코드 상태를 의미한다. origin 원격 저장소는 현재 origin/master 브랜치의 상태와 같음을 알 수 있다.

### <span style="color: yellow; background-color: black;">HEAD -> master</span>

먼저 <span style="color: yellow; background-color: black; font-size: .8em;">HEAD -></span>라는 표현은 제외하고 보자.<br/>
master는 브랜치 이름을 의미한다. 그리고 위와 다르게 원격 저장소가 아닌 __로컬 저장소__(현재 작업중인 내 컴퓨터 디렉토리 내 저장소)의 브랜치이다.

그리고 <span style="color: yellow; background-color: black; font-size: .8em;">HEAD -></span>라는 표현은 로컬 저장소의 '현재' 코드 상태가 로컬 저장소의 master 브랜치의 상태와 같음을 의미한다.

로컬 저장소의 master 브랜치는 commit log 첫번째 줄의 commit <span style="color: blue;">5c8deb2</span> 를 보고있는 상태이고 이 상태는 원격 저장소의 브랜치인 origin/master의 상태와 똑같다.

### <span style="color: yellow; background-color: black;">navremocon</span>

navremocon은 로컬 저장소의 브랜치 이름을 의미한다.

로컬 저장소 navremocon 브랜치는 commit log 4번째 줄의 commit <span style="color: blue;">56e2efa</span> 를 보고있는 상태이고 이 상태는 원격 저장소의 브랜치인 origin/navremocon의 상태와 똑같다.
