---
layout: single
title: "Anaconda 가상환경을 Jupyter Notebook Kernel로 등록하기"
date: "2021-05-27 14:53:00 +0900"
last_modified_at: "2021-05-27 14:53:00 +0900"
---
간단한 환경 구축과 명령어 실행으로 Anaconda 가상환경을 Jupyter Notebook Kernel로 등록하여 사용할 수 있다.<br/>
Anaconda 가상환경을 Jupyter Notebook Kernel로 등록하는 것의 목적과 이점은
Anaconda가 가진 구축, 설치, 교체가 쉬운 Portable Python 가상 환경을 그대로 Jupyter Notebook에서 사용할 수 있다는 점과
Jupyter Notebook이 가진 메모리 상주형의 인터랙티브 프로그래밍과 보고서 및 시각화 기능을 동시에 누릴 수 있다는 점이다.<br/>
이번 포스트에서는 `myenv`라는 이름의 Anaconda 가상환경을 Jupyter Notebook Kernel로 등록하는 방법에 대해 살펴본다.

## 환경 구축

### Activate Environment

가장 먼저 Jupyter Notebook Kernel로 등록하고 싶은 Anaconda 가상환경을 activate 한다.<br/>
이후부터 쉬운 설명을 위해 아래와 같이 `py38-tf24` 라는 이름의 가상환경을 예로 든다.

```bash
conda activate py38-tf24
```

### Install ipykernel

Jupyter Notebook에 커널을 등록하기 위해서는 python module `ipykernel`이 필요하다.
해당 모듈이 없을 경우 pip 또는 anaconda로 install 한다.

```bash
pip install ipykernel
```

or

```bash
conda install ipykernel
```

## Kernel 등록

[환경 구축](#환경-구축) 세션의 내용을 모두 수행했다면 아래와 같이 명령어를 이용해서 가상환경을 등록할 수 있다.

<div class="notice--warning" markdown="1">
#### 주의
{:.no_toc}
아래 명령어는 반드시 등록하려는 가상환경이 __activate__ 된 상태에서 수행하도록 한다.
</div>

```bash
python -m ipykernel install --user --name myenv --display-name "Python (TF2.4)"
```

* `--user`<br/>
  현재 사용자 권한 수준으로 kernel을 등록한다.

* `--name`<br/>
  Jupyter Notebook 내부적으로 사용할 가상환경의 명칭이다. activate 된 가상환경 실제 명칭에 상관없이 alias처럼 작동한다.

* `--display-name`<br/>
  Jupyter Notebook Web UI에 표시되는 명칭을 부여한다.

위 명령어가 성공적으로 실행되면 Jupyter Notebook Web UI에서 `new`를 눌렀을때
`--display-name`에 설정한 명칭으로 등록된 커널을 확인할 수 있다.

![Jupyter Notebook Web UI - New Kernel "Python (TF2.4)"]({{ site.gdrive_url_prefix }}10ALSOvltJDaL63JD5jgVFxxh8KNF2ml3){:style="max-width: 200px;"}

## Kernel 제거

반대로 등록된 Jupyter Notebook Kernel을 제거하는 방법도 알아본다.

먼저 제거하고 싶은 Kernel을 아래 명령어를 통해 확인한다.

```bash
jupyter kernelspec list
```

이전에 [Kernel 등록](#kernel-등록) 세션에서 `--name myenv` 옵션으로 등록한 Kernel이 보인다.

![jupyter kernelspec list]({{ site.gdrive_url_prefix }}1jF4a-k8ohzmfbenoy3M3XSR4CAAg3026){:style="max-width: 700px;"}

아래 명령어에 `myenv` 명칭을 그대로 사용하여 실행하면 제거가 완료된다.

```bash
jupyter kernelspec remove myenv
```

![jupyter kernelspec remove myenv]({{ site.gdrive_url_prefix }}1BFOeH7I2gcvlvmzfKFI8z-GWSYwAThj6){:style="max-width: 700px;"}

## 기타 도움말

`--help` 옵션을 넣어 실행하면 명령어 관련 여러가지 도움말을 볼 수 있으니 참고하자.

```bash
python -m ipykernel insatll --help
```

<div class="md-reference" markdown=1>
* <https://ipython.readthedocs.io/en/stable/install/kernel_install.html>
* <https://stackoverflow.com/questions/42635310/remove-kernel-on-jupyter-notebook>
</div>
