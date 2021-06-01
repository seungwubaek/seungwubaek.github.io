---
layout: single
title: "Git을 이용한 협업: Fork 부터 Pull Request 까지"
date: "2021-05-31 17:15:00 +0900"
last_modified_at: "2021-06-01 16:42:00 +0900"
---
Git은 쉽고 효율적인 버전 관리를 통해 커뮤니티(Github)에 공유된 Open Source 프로젝트 또는 개인 및 단체의 Private Source에
접근, 생성, 수정 할 수 있도록 하는 도구이다.
이 포스트에서는 Github에 업로드 되어있는 source에 접근해 작업하고 Pull Request 하기까지
타인과 협업하면서 프로젝트를 개발하는 일반적인 협업 전략과 그 방법에 대해 알아본다.

<div class="notice--info" markdown=1>
이 포스트는 Git 명령어 add, commit, push, merge, fetch를 어느정도 이해하고 있다고 가정합니다.
</div>

## One of the Git Flow

아래 다이어그램은 Git을 활용한 여러가지 협업 전략 중 하나이다.
이와같은 Git을 활용한 협업의 순서도를 Git Flow 라고 한다. Git Flow는 상황에 따라 다양하게 분화 할 수 있다.

이 포스트에서는 아래 Git Flow로 협업을 수행한다.

Fork -> Clone -> Local Repo에 원본(Upstream) Repo 등록 -> Branch -> Commit & Push -> Fetch -> Solve Conflicts -> Commit & Push -> Pull Request

![One of the Git Flow]({{ site.gdrive_url_prefix }}1dBD4F8sNrgrfk7wOnAckN9W5Qud_SlHS)
{:style="margin-bottom: 0;" class="img-popup"}
<div style="font-size: .75em;" markdown=1>
One of the Git Flow &copy; Sammy Baek
</div>

## CONTRIBUTING.md

보통 Github에 올라와있는 Open Source Repository를 보면 `CONTRIBUTING.md`, `CONTRIBUTION_GUIDE.md` 등의 파일이 업로드 돼있다.

이 파일에는 '개발자 라이센스를 먼저 등록해라', 'Pull Request를 해라' 등 개인이 해당 Repository에 기여하기 위한 자격 요건부터
어떻게 Source를 수정하고 업로드 하는지에 대한 지침이 기록되어있다.

규모가 큰 프로젝트일수록 많은 인원이 원격으로 개발에 참여하므로 빠르고 효율적인 기여와 코드의 신뢰성 검증을 위해 이런 지침을 따를 필요가 있다.

어떤 Git 프로젝트에 참여하게 된다면 제일 먼저 해당 프로젝트의 `CONTRIBUTING.md` 파일 내용을 살펴보고 그 지침대로 기여하도록 하자.

# Git 협업 과정

## 1. Fork

Fork란 타인 소유의(또는 공동 소유의) 프로젝트 소스와 commit 내역, branch 등 원본 Remote Repository의 구조를 그대로 복사하여
내 소유의 새로운 Remote Repository로 생성하는 기능이다.

Fork 작업은 `CONTRIBUTING.md` 파일에도 설명돼있지 않은 경우가 많지만, 일반적으로 Git 협업을 위한 첫 단추는 Fork 이다.

Fork한 저장소는 내 소유이므로 내 마음대로 Source를 수정할 수 있다.
이때 Fork 저장소의 내용을 아무리 수정해도 원본 저장소엔 영향을 주지 않는다.<br/>
따라서 Fork 저장소를 이용하면 Git 기능을 마음껏 활용하여 소스를 수정해볼 수 있으면서도 원본 Source에 대한 무분별한 수정을 막을 수 있다.
그렇기 때문에 Fork 기능을 사용한다.<br/>
이후 Fork 저장소의 수정 내역을 원본 Source로 업데이트 하는 과정(Pull Request)을 거쳐야만 원본 Source에 수정 내역들(commits)이 반영된다.

Fork는 Github 웹페이지에서 UI를 통해 수행한다. Github에서 Fork 하려는 원본 Repository로 이동한 후 오른쪽 상단의 Fork 버튼을 클릭하자.<br/>
예를 들기위해 [tensorflow](https://github.com/tensorflow/tensorflow)를 Fork 해보았다.

![Git Fork Btn on github]({{ site.gdrive_url_prefix }}1y32bm0bhlkxvsqUTB_vzTmAzASarD5fV){:style="width:100%; max-width:450px;"}

그러면 아래처럼 어떤 조직명으로 연결할 것인지 팝업이 뜬다. 보통 내 계정 1개가 있다. 그것을 클릭한다.

![Fork tensorflow]({{ site.gdrive_url_prefix }}1grLTuFP7Yg8VeUKFgW0zT5hcUty2rUMh){:style="width:100%; max-width:450px;"}

위처럼 내 Git 계정으로 Fork 하면 `seungwubaek/tensorflow` 저장소가 생성된다.

![tensorflow is forking]({{ site.gdrive_url_prefix }}1XyVMH0yUUrhn_rEeySonqc6B7_7_V9Pm)
![forking result]({{ site.gdrive_url_prefix }}1dNV5SE69XuIZAjZqaGukG3aOHgW3VtGu)

## 2. Clone

Clone은 Remote Repository에 있는 프로젝트 소스와 Commit History 등을 Local Repository로 그대로 다운로드하는 기능이다.

이후 개발자는 Clone된 Local Repository의 내용을 수정한 후에 Commit & Push 해서 Remote Repository의 Commit History를
Local Repository에서 commit을 추가한 Commit History와 동일해지도록 업데이트 한다. 그런 의미에서 'clone(클론, 복제)'라 부르는 것이다.

Github 웹페이지에서도 웹페이지가 지원하는 UI로 개발이 가능하지만 매우 불편하고 수정된 코드의 테스트도 할 수 없다.
따라서 `README.md` 파일의 오타 등 간단하고 명확한 수정이 아니라면 Clone하여 로컬에 소스를 받은 다음 작업을 진행해야 한다.

Clone 하기 위해서는 Clone 하려는 Repository의 주소를 알아야한다. 우리는 Fork한 Repository를 Clone 할 것이므로
아래와 같이 Forked Repository의 Github 웹페이지에서 Clone 주소를 복사한다.

![Copy clone url]({{ site.gdrive_url_prefix }}13hVjkJB9dQsjfpfa2NKZSYtqqtMNtUVe){:style="max-height:350px;"}

주소를 복사했다면 내 로컬 환경(노트북, PC 등)에서 아래 명령어에 복사한 주소를 붙여넣고 실행하면 된다.

```bash
git clone <복사한 Forked Repository 주소> <생성 폴더명>
```

위 명령어에서 `<생성 폴더명>` 인자를 생략하면 저장소명과 동일한 폴더가 생성된다.

<div class="notice--info" markdown="1">
#### Fork vs Clone
{:.no_toc}
프로젝트의 소스와 commit 히스토리 등을 복사해온다는 점에서 Fork와 Clone은 유사하게 보일 수 있다.<br/>
그러나 Fork는 <strong>원본</strong> Remote Repository를 복사해서 내 소유의 <strong>새로운</strong> Remote Repository를 생성하는 개념이며<br/>
Clone은 <strong>Remote</strong> Repository를 <strong>Local</strong> Repository로 복사하는 개념이므로 전혀 다르다.
</div>

## 3. Local Repository에 원본(Upstream) Repository 등록

Clone 직후 아래 명령어를 쳐보면 Local Repository에서 바라보고 있는 Remote Repository 목록이 나온다.
처음에는 당연히 Clone 대상인 Forked Repository 1개가 존재한다.<br/>
이 Forked Repository는 기본적으로 `origin`이라는 별칭으로 불린다.

작업을 진행하기 전에 Fork 원본 Repository의 주소를 Local Repository에 연결해서 작업 중간에
원본 Repository 소스에 수정이 있을 경우 그 변경 사항을 Local에서 빠른 갱신할 수 있어서 협업 효율을 높여준다.

```bash
git remote -v
```

![git remote -v]({{ site.gdrive_url_prefix }}1ASn7g9qqaactySRrxouK0hxY6NWwSb-f)

원본 Remote Repository를 등록하기 위해서 아래 명령어를 사용한다.

```bash
git remote add <생성 폴더명 또는 upstream> <원본 Remote Repository URL>
```

보통 `<생성 폴더명>`은 Fork 원본을 의미하는 `upstream`을 사용한다.
`upstream`은 git에서 사용하는 예약어는 아니므로 원하는 별칭으로 수정해서 불러도 좋다.
만약 생략한다면 `<원본 Remote Repository URL>`이 가리키는 저장소명이 자동 적용된다.

* 예

```bash
git remote add upstream https://github.com/tensorflow/tensorflow.git
```

원본 Remote Repository를 등록한 후 Remote Repository 목록을 보면 Forked Repository와
`upstream`이라는 별칭의 원본 Repository가 추가된 것을 볼 수 있다.

![git remote -v after adding]({{ site.gdrive_url_prefix }}112gppszYSnkooxT9QwHtLF4hSQgHLK_p)

그후 아래 명령어를 실행해서 `upstream` 저장소가 가진 commit 내역을 불러오자.

```bash
git fetch --all
```

commit history를 보면 여기까지 진행했을 때 Local, Forked Remote, Upstream Remote 3곳의 master branch가 모두 한 곳에 모여있다.

```bash
git log -10
```

![Tensorflow Commit History (Local, Forked, Upstream)]({{ site.gdrive_url_prefix }}1ypKOlpZsfRTf3G64hsCZXZqNZ7Udh4bU)

## 4. Branch

본격적인 수정 작업들은 모두 Local Repository에서 진행한다.
이때 각 수정의 단위를 Branch로 쪼개는 것이 좋다. 즉, 기능 한 개를 개발할 때 마다 Branch 한 개를 생성해서 작업한다.

그렇게 함으로써 수정을 여러번 거듭하면서 수정 이전의 소스를 잃어 버리는 것을 막을 수 있고
협업 중 내 작업이 끝나기 전 타인에 의한 수정 내역을 쉽게 반영할 수 있다.

```bash
git branch <branch name>
```

## 5. Commit & Push

Local Repository에서 수정이 완료되면 그 내역을 원본 Remote Repository가 아닌 Forked Remote Repository에 Commit & Push 한다.

```bash
git push <repository name> <branch name>
```

```bash
git push origin branch1
```

[3. 원본 Remote Repository 등록](#3-원본-remote-repository-등록) 세션에서 등록한 `upstream` 저장소에도 수정 내역 반영을 '시도'할 수 있다.
그러나 이러한 경로로 Upstream Repository의 내용을 수정하면 Fork 한 의미가 없어진다.
이러한 수정 방법은 우리가 원하는 협업 전략이 아니므로 `upstream`에 직접 Push 하지 말자.

<strong>주의</strong>할 점은 Push 할 때 계정이 `upstream` Repository에 직접적인 수정 권한을 가지고 있다면 push에 성공하고
원본 소스에 의도치 않은 변형을 일으킨다는 점이다.<br/>
이 점은 협업자를 예상치 못한 소스 변형으로 당황케하거나 프로그램 에러를 발생시키게 될수도 있다.

`upstream`을 등록한 이유는 `upstream`에 직접 수정을 하기 위해서가 아니라 오직 `upstream`의 최신 작업 내역을 빠르게 갱신해오기 위함이다.

## 6. Fetch

마지막으로 수정 내역들을 반영하는 작업을 시작하기 전에 Upstream Repository에 다른 협업자들이 먼저 업데이트한 수정 내역이 있는지 확인하자.

```bash
git fetch upstream
```

Commit History를 보고 Upstream Repository에 변경이 있었다면 이것을 내 수정 내역에도 똑같이 반영시켜야 할수도 있다.

Upstream Repository에 변경이 있더라도 그 내용이 내 commit 내역에 전혀 영향이 없다면 따로 처리해야할 것은 없다.

## 7. Solve Conflict & Commit & Push

다른 협업자에의한 Upstream commit 내역이 내 Commit과 충돌한다면 해당 충돌 부분을 해결한 후 다시
Forked Remote Repository에 Commit & Push 하자.

```bash
git pull
```

```bash
git push origin branch1
```

## 8. Pull Request

Pull Request는 내가 수정한 Commit들을 원본 Repository에 반영(Pull)해줄 것을 요청(Request)하는 작업이다.

충돌 문제를 해결하고 안전하게 병합이 가능하다면 이제 Pull Request 방법으로 원본 Repository에 수정 내역을 반영하는 작업을 수행한다.

앞의 [7. Solve Conflict & Commit & Push](#7-solve-conflict--commit--push) 세션에서 push 한 수정 내역은
Forked Repository(`origin`)에 업로드 되어있다.

Forked Repository Github UI로 가서 push 했던 브랜치로 이동하자.

아래 그림을 보면 예로 들었던 브랜치 `branch1`에 `Test Commit`이라는 내용의 commit이 하나 push 돼있다.

![Test Commit on Forked Repository]({{ site.gdrive_url_prefix }}1kPvQYK2fQZpaAOvFIsE7wY32MAMlJcpq)

이때 Forked Repository에 원본 Repository와 다른 commit이 추가되었으므로 아래와 같은 메시지가 뜬다.

![Compare & Pull Request Button]({{ site.gdrive_url_prefix }}12KVzrsx3oQ07B75TJskiq1E7vDJC39WK)

<span style="background-color: #33a355; border: 1px solid #2f904d; border-radius:8px; padding: 2px 10px; color: white;">Compare & pull request</span>
버튼을 클릭하자. 그러면 아래와 같은 Pull Request 양식이 뜬다.

![Open Pull Request Form]({{ site.gdrive_url_prefix }}1uBv2enXSb2sbLyZdIpfJM03WY6K80VTj)

Pull Request 양식에서는 자동으로 코드 충돌 검사를 수행한다. 이상이 있다면 충돌 해결 작업부터 다시 수행하면 된다.
이상이 없으면 "<span style="color: #33a355; font-weight: 500;">Able to merge.</span>" 라는 메시지를 볼 수 있다.

이어서 `CONTRIBUTING.md` 파일의 지침을 상기하면서 양식 내용을 채워 넣고
<span style="background-color: #33a355; border: 1px solid #2f904d; border-radius:8px; padding: 2px 10px; color: white;">Create pull request</span>
버튼을 클릭한다.

그러면 Pull Request는 원본 Repository의 `Pull requests` 내역에 추가된다.

![tensorflow's Pull requests menu]({{ site.gdrive_url_prefix }}19N-SoIz_ApFlXrbLTFvR0GQVEGKCkQ_9)

이 내역은 이제 원본 Repository에 수정 권한을 가진 사람들에 의해 검토될 것이며
원본 소스와 병합(merge)되는 것이 타당한 것으로 판단되는 경우 원본 소스에 병합될 것이다.

여기까지 하면 협업 프로세스가 끝이 난다.

<div class="md-reference" markdown=1>
* <https://git-scm.com/>
* <https://docs.github.com/en/github/getting-started-with-github/quickstart/fork-a-repo>
* <https://github.com/tensorflow/tensorflow>
* <https://velog.io/@cos/Github%EC%97%90%EC%84%9C-%ED%98%91%EC%97%85%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95>
* <https://git-scm.com/docs/git-push>
</div>
