---
layout: single
title: "로컬 환경의 Jekyll Blog Server에 모바일 장비로 접속하기"
date: "2021-02-03 15:52:00 +0900"
last_modified_at: "2021-02-03 15:52:00 +0900"
excerpt: "우리는 블로그를 구성하는 Markdown, HTML, Javascript 파일 등을 제작하고 나서 Github 저장소에 소스를 업로드 하기 전에
제작한 소스가 정상적으로 작동하는지 확인하기 위해 로컬 환경에서 먼저 Jekyll Server를 실행시켜서 테스트 하곤 한다.<br/>
이때 실행시켜 놓은 로컬 Jekyll Blog Server에 데스크톱이 아닌, 모바일 장비로 접속하려면 어떻게 하는지 알아보자."
---
{{ page.excerpt }}

## 1. 네트워크 망 공유

모바일 장비가 로컬의 Jekyll Server에 접속하려면 Jekyll Server가 실행되고 있는 데스크톱과 동일한 네트워크 망에 위치해야 한다.

즉, 공유기를 사용해서 Jekyll Server가 실행되고 있는 데스크톱은 유선 랜을 쓰고 그 공유기의 와이파이에 모바일 장비가 접속한 상태
또는 Jekyll Server와 모바일 장비가 모두 무선 인터넷을 사용하고 있는 상태 등이 여기에 해당한다.

단, 인터넷 접속 가능 여부는 상관이 없다. 같은 망내에 있는 것이 핵심이다.

이 포스트의 내용은 현재 Jekyll Server를 실행하는 데스크톱의 네트워크가 그런 상태에 있어야만 가능하다.
데스크톱이 그런 상태에 있다면 모바일 장비의 무선 인터넷(=와이파이)을 켜서 같은 무선 인터넷으로 접속한다.

## 2. `--host` 옵션과 함께 Jekyll Server 실행

Jekyll Server를 실행하려는 데스크톱에서 아래 커맨드를 이용해서 실행하는데 옵션 `--host`에 특정 값을 넘겨서 실행시킨다.

* `bundler`를 사용하지 않는 경우

```bash
jekyll server --host 0.0.0.0
```

* `bundler`를 사용하는 경우

```bash
bundle exec jekyll serve --host 0.0.0.0
```

위 명령어의 실행 로그에서 내 Jekyll Server가 포트 `4000`번을 사용하고 있음을 확인 할 수 있다.

```
Server address: http://0.0.0.0:4000
Server running... press ctrl-c to stop.
```

## 3. Jekyll Server IP 확인

여기까지 왔다면 이제 Jekyll Server가 실행중인 데스크톱의 IP만 알면 모바일에서도 접속할 수 있다.

Windows OS라면, <kbd>Alt</kbd> + <kbd>R</kbd>을 눌러 나온 실행창에 `cmd`라고 치고 엔터.

그러면 아래처럼 윈도우 프롬프트 창이 나오는데 그곳에 `ipconfig`이라고 치고 엔터.

![Check IP on Windows OS]({{ site.gdrive_url_prefix }}1EYyJz4Kg2gZYYXGnHfx2S5vk3wzlbhSH){:style="max-height: 600px;"}

그러면 위 빨간색 밑줄과 같이 `이더넷 어댑터`라는 네트워크에 `IPv4 주소` 값으로 `***.***.***.***` 형식의 IP가 나온다.<br/>
이 IP는 보통 앞 두개 옥텟이 `192.168.`으로 시작하나 (또는 `10.`, `172.`로 시작하기도 함)
로컬 네트워크는 인터넷과 연결된 네트워크가 아니고 내부 네트워크이므로
권고 사항은 있지만 꼭 그래야할 이유는 없으며 공유기 설정 등에 따라 얼마든지 다를 수 있다.

## 4. 접속

모바일에서 브라우저를 켜고 주소창에 `<위에서 확인한 IP>:<포트>` 의 형식으로 입력하고 이동한다.

예: `192.168.202.93:4000`이라고 입력 후 이동

![Connect to Jekyll Server using Mobile Device]({{ site.gdrive_url_prefix }}1oaT48-xkzy7-VhXnGdRL8YFSrAxofNgU){:style="max-height: 600px;"}

잘 나온다.
