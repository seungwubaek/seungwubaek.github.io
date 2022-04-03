---
layout: single
title: "파이썬 Miniconda를 이용한 Package 설치 방법"
date: "2022-04-03 21:19:00 +0900"
last_modified_at: "2022-04-03 21:19:00 +0900"
post-order: 4
---
파이썬 가상환경 및 패키지 관리 도구인 Miniconda를 이용해서 파이썬 가상환경을 구축하고
파이썬 패키지 `Selenium`을 설치하는 과정을 통해 파이썬 패키지 설치 방법에 관해 간단히 알아보자.

## Miniconda

Miniconda(미니콘다)란 파이썬 패키지와 환경을 설정을 자동으로 관리해주며 사용자의 편의성을 향상시켜주는 도구이다.

Miniconda의 전신은 Anaconda(아나콘다)이며, Miniconda는 Anaconda의 용량축소 버전이다.

<div class="notice--info" markdown="1">
#### 파이썬 가상환경이란
{: class="no_toc"}

파이썬의 환경(env)이란 파이썬 패키지를 설치하는 공간을 의미하며 패키지를 설치하면 파이썬을 실행시켰을때 언제든 해당 패키지를 사용할 수 있게 한다.
그런데 만약, 특정 패키지 버전이 업데이트되거나, 패키지가 더이상 필요없어지거나, 패키지끼리 충돌이 일어나거나 하면?

파이썬을 올바로 사용하지 못하는 경우도 생길수 있지 않을까?

여기서 태어난 것이 파이썬 가상환경(venv)이다. 파이썬 가상환경은 패키지를 설치 공간을
내 컴퓨터의 파이썬이 설치된 곳에 직접 설치하는 것이 아니라 임의의 디렉토리를 만들어서 그곳에다가 설치한 패키지를 모아둔다.

그렇게 함으로써 더이상 패키지가 필요하지 않거나 충돌이 일어나거나 할때 임의의 디렉토리를 그저 `삭제` 하는 것(가상환경을 삭제하는 것)만으로 패키지가 설치되기 이전의 환경으로 되돌릴 수 있게한다. 또한 서로 다른 패키지가 설치된 파이썬 환경을 자유로이 전환하면서 사용할수도 있게 한다.
</div>

### Miniconda 설치

Miniconda 설치를 위해 아래 공식 홈페이지로 들어가서 설치 파일을 다운로드하고 실행하자.
일반적인 사용자라면 Windows 64-bit 운영체제의 installer를 다운로드받아서 설치하면 된다.

<https://docs.conda.io/en/latest/miniconda.html>

![Miniconda Download Links]({{ site.gdrive_url_prefix }}1CE7bN2OjGwwwdDrz8PPPkyMY3JfDBWHL)

귀찮으면 아래 링크를 클릭해서 바로 다운로드를 시작할 수 있다.

<https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-x86_64.exe>

### 파이썬 가상환경 구축

설치가 완료되었다면 이제 패키지를 설치해볼 차례다 그 전단계로 가상환경을 만들어야한다.

명령어 입력을 위해 명령 프롬프트(또는 Git Bash 등의 CLI 도구) 화면을 띄우자.

<div class="notice--info" markdown="1">
#### 명령프롬프트 띄우는법
{: class="no_toc"}

<kbd>win</kbd> + <kbd>r</kbd>을 눌러서 실행화면을 키고 `cmd`를 입력하자.

![Window Execution]({{ site.gdrive_url_prefix }}1L_bQ0ZmmMGK8Z7RnKVMsUPIe6KB5qeak}
</div>

명령 프롬프트 화면에서 다음과 같이 입력하면 간단히 가상환경 구축이 완료된다.

가상환경의 이름은 임의로 `virt-env` 라고 하겠다. 원하는대로 바꿔도 좋다.

```bash
conda create -n virt-env
```

중간에 `Proceed ([y]/n)?` (진행하시겠습니까?) 메시지에 `y`를 입력하고 엔터를 친다.

그리고 다음 그림과 같은 메시지들이 나타났다면 정상적으로 설치가 완료된 것이다.

![Conda Create Environment]({{ site.gdrive_url_prefix }}1TjsJGRSipnkEcthoe4ctLPk-ChXAprzw)

## 파이썬 패키지 설치하기

위에서 miniconda를 이용해서 가상환경을 구축하였다면 이제 그 환경에서 패키지를 설치해보자.

### 가상환경 활성화

가상환경으로 진입하기 위해 아래 명령어를 명령 프롬프트에 입력한다. 가상환경의 이름은 위에서 만든 `virt-env` 라고 가정하겠다.

```bash
conda activate virt-env
```

정상적으로 명령러가 실행되면 나면 아래 그림처럼 명령어 입력줄의 맨 앞에 `(virt-env)`라는 prefix가 붙어있는 걸 볼 수 있다.

![Conda Activate Environment]({{ site.gdrive_url_prefix }}1ewz6T96ZvawLeav_JIZrZww75UibvN9R)

이것이 가상환경으로 진입했다는 의미이다.

이 상태에서는 내 컴퓨터의 본 환경과 분리하여 패키지를 설치·삭제 할 수 있다.
따라서 특정 프로그램 때문에 설치를 못한다는 둥.. 여러가지 복잡하게 얽힌 다양한 에러 상황을 손쉽게 회피할 수 있는 것이다.

### 파이썬 설치

가상환경 `virt-env` 내부에 진입한 상태에서 파이썬 버전3을 설치해보자. 아래 명령어를 입력하면 쉽게 설치할 수 있다.

중간에 `Proceed ([y]/n)?` (진행하시겠습니까?) 메시지가 나온다. `y`를 입력하고 엔터를 친다.

```bash
conda install python=3
```

이것저것 깔리는 메시지들이 출력되는데.. 설치가 완료되니까 저절로 화면이 지워져서 캡쳐를 못했다.. 이어서 다른 패키지들을 설치해보자.

### 파이썬 패키지 설치

파이썬이 정상적으로 설치됐다면 이제 파이썬 패키지를 설치하자. 이번 섹션에서는 예시를 위해 `selenium`을 설치해보도록 한다.

아래와 같이 입력하자. 설치 과정은 위 섹션 [파이썬 설치](#파이썬-설치) 과정과 동일하다.

```bash
conda install -c conda-forge selenium
```

위 명령어에서 `-c conda-forge` 는 selenium 패키지를 다운로드하는 채널을 `conda-forge`로 지정해주는 역할을 하는 옵션이다.

아래와 같이 설치 화면이 나오고 설치가 완료되면 `done` 이라는 메시지가 나타날 것이다.
참고로 위 섹션에서 파이썬 설치 단계에서도 아래와 유사한 화면이 나타났었을 것이다.

![Conda Install Package]({{ site.gdrive_url_prefix }}1e6YTUCczgwlAq1qV0ofaMSGnDQpgaghg)

이렇게 패키지 설치까지 완료가 됐다.

### 파이썬 패키지 사용

지금까지 Miniconda 가상환경을 구축하여 파이썬 패키지를 설치하였을때 해당 패키지를 사용하려면 전제조건이 있다.

바로, 패키지가 설치돼있는 가상환경으로 진입하는 것이다.

위에서 설명했지만, 파이썬과 패지키를 사용하기 위해서 먼저 아래와 같이 명령 프롬프트에 명령어를 입력해서 가상환경으로 진입한 후 사용하자.

```bash
conda activate virt-env
```
