---
layout: single
title: "[Checkout] 특정 commit으로 checkout 하기"
post-order: 2
---

미래, 현재, 과거 등 여러 상태에 놓인 commit들에서 현재 내 코드의 상태를 특정 과거의 상태로 돌리려면 어떻게 해야할까?

`git checkout <이동 목적지 commit hash>` 명령어를 사용하면 detach 상태가 된다. 이럴때는 아래와 같이 하면 된다.

# 주의사항

  아래 커맨드를 이용하면 저장(backup or commit) 되지 않은 변경 사항들이 날아가 버리므로 주의해서 백업 해놓자.

# Command

아래 git 명령어를 사용해서 로컬 브랜치 master 의 상태를 원하는 commit으로 바꿔버릴 수 있다.

``` shell
git checkout -B master <이동 목적지 commit hash>
```

* 옵션 `-B <branch name>`

    `<branch name>`이라는 이름으로 새로운 브랜치를 만든다. 만약 `<branch name>`이름의 브랜치가 이미 존재한다면, 해당 브랜치를 checkout 하려는 목적지 commit의 상태로 되돌린다.

# Example

다음과 같은 commit log를 가지는 Repository가 있다고 하자. <span class='md-monologue'>(내 블로그임ㅋ)</span>

![commit log](https://drive.google.com/uc?export=view&id=1BwE3ZHoUhTLLaHQcs26fLf77QC46RMII)

여기서 아래와 같이 명령어 실행한다.

```shell
git checkout -B master fe2317c
```

그러면 아래 그림에서 보듯, HEAD -> master의 위치가 바뀐 것을 볼수있다.<br/>
이것은 로컬 브랜치 master가 commit <span style="color: blue;">fe2317c</span> 을 보는 것으로 변경되었고 내 현재 코드의 상태가 master 브랜치를 보고있다는 뜻이다.

![commit log, changed master](https://drive.google.com/uc?export=view&id=1RJ3YbUNaFu0E7g7_nOWXRrMdax3vM_jo)
