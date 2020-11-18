---
layout: single
title: "[Rebase] (Squash) 과거 커밋들을 하나로 합치기"
post-order: 4
---

과거의 커밋들을 하나로 합쳐서 commit tree를 정리하자. 이를 위해 `git rebase` 커맨드를 사용한다.<br/>
내 Repository는 만들자마자 commit 개수가 2500여개가 넘었다. 다른 Repository를 Fork한 까닭이다. 내가 한 commit은 고작 110여개인데 억울하다.<br/>
또 Fork를 했기 때문에 내 Repository의 Issue, Wiki 기능도 사용 할 수 없고,
내 Repository Github site에 들어가면 자꾸 Fork한 Repository와 commit의 내용과 양을 비교하며 경고하듯 알려준다.

* 부록: Fork의 목적

    다른 사람의 Source를 가져다 쓰기 위해 Fork 하는 것은 Fork의 목적에 잘 부합하지 않는것 같다.
    Fork의 목적은 어떤 Repository의 내용을 수정하고 수정 내역을 타인과 서로 비교하며 조율한 후 Repository에 수정을 반영하는 협업을 수행하는 것에 있는 것 같다.

    그래서 내 블로그를 Fork한 Repository가 아닌 새로운 Repository로 만들되 원래 의도대로 Fork 했었던 commit들은 다 가져오고 대신, 내가 한 commit이 아닌 Fork된 commit들은 전부 rebase 시키자

# 과정

1. 새 보금자리 만들기

2. 다른 사람의 Source 가져오기

3. 다른 사람의 commit들을 Squash

# 과정 수행

## 1. 새 보금자리 만들기

## 2. 다른 사람의 Source 가져오기

## 3. 다른 사람의 commit들을 Squash

아래 커맨드를 이용해서 rebase 시작

```shell
git rebase -i --root
```

다른 Repository를 Fork해서 사용했기 때문에 전체 commit들 중 내가 commit 한 부분은 최근 110여개 뿐이며 과거의 2500여개는 다른 Repository에서 다른 사람이 commit 한 것.

# 결과

rebase 전 2621개 commits

![Github - my commits before rebase](https://drive.google.com/uc?export=view&id=11_W6jtat2998f2Tehkfhx_ABmKmYRflv)

rebase 후 117개 commits

![Github - my commits after rebase](https://drive.google.com/uc?export=view&id=1jJeNyyJ7YwzG6PmPbahAmo0G-89Lddlc)
