---
layout: single
title: "Linux OS의 ssh config에서 alias로 필요한 옵션 미리 설정하고 불필요한 입력 줄이기"
date: "2021-05-13 17:08:00 +0900"
last_modified_at: "2021-05-13 17:08:00 +0900"
---
SSH는 암호화된 네트워크 통신 목적으로 많은 곳에서 응용되고 있다.<br/>
그중 Linux CLI 환경의 사용자가 원격으로 서버를 통제하기 위해 ssh를 활용해서 수동으로 여러대의 서버를 왔다갔다 접속하는 경우가 있다.
그러나 서버 설정에 맞게 ssh 커맨드의 옵션들을 수정해가며 반복 입력하기가 상당히 수고스럽다.
이때 config 파일을 이용하면 그러한 수고스러움을 덜 수 있다.<br/>
이 포스트에서는 Linux CLI 환경에서 ssh의 config 파일에 대해 알아보고
ssh 커맨드를 사용할 때 수동으로 입력해야하는 ssh 옵션들을 생략하는 방법을 살펴본다.

## 초기 설정

### 파일 생성

ssh의 `config` 파일은 `~/.ssh/config` 에 위치한다.
만약 해당 파일이 존재하지 않는다면 직접 만들어주면 된다.

```bash
touch ~/.ssh/config
```

### 권한 설정

config 파일에는 소유자의 쓰기, 읽기 권한만 부여되어 있어야한다.
따라서 아래 명령어를 이용해서 config 파일에 알맞는 권한을 설정하도록 한다.

```bash
chmod 600 ~/.ssh/config
```

## config 상세

config 파일은 하나의 alias에 여러 옵션들이 매핑되도록 작성되며 자세한 구조는 아래와 같다.

```
Host <Alias Name>
    <SSH 옵션명> <옵션값>
```

위 구조로 작성한 config 파일의 내용은 실제 ssh 커맨드를 사용할때 다음과 같이 작성해서 config 파일의 내용을 적용할 수 있다.

### 사용 가능한 SSH 옵션명

* HostName :<br/>
  ssh 접속하려는 서버의 주소. `/etc/hosts` 등의 alias 호스트명도 입력 가능하다.
* User :<br/>
  ssh 접속하려는 서버의 계정명.
* Port :<br/>
  ssh 접속하려는 서버의 접속 포트.

### 사용법

```bash
ssh <Alias Name>
```

이렇게만 입력하면 config 파일에 설정한 `[SSH 옵션명]`의 내용이 커맨드에 자동으로 반영된다.

### config과 사용법 예시

아래는 많이 쓰는 옵션들을 설정한 예시이다.

```
Host myDev1
    HostName 192.168.100.101
    User sammy
    Port 10101
```

위 예시의 설정 내용으로 ssh 커맨드를 사용하려면 shell에 아래처럼 입력하면 된다.

```bash
ssh myDev1
```

위 단축 ssh 명령어는 아래와 같은 ssh 완전한 형태의 명령어를 사용하는 것과 같다.

```bash
ssh -p 10101 sammy@192.168.100.101
```

<div class="md-reference" markdown=1>
* <https://linuxize.com/post/using-the-ssh-config-file/>
</div>
