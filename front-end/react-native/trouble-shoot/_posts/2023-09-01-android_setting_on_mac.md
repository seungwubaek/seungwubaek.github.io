---
layout: single
title: "macOS에서 Android 환경 설정 시 발생하는 문제 모음"
post-order: 4
date: "2023-09-01 00:33:00 +0900"
last_modified_at: "2023-09-01 00:33:00 +0900"
---

이 포스트는 macOS에서 Android 환경 설정 시 발생하는 문제들을 모아놓은 포스트이다.<br/>
macOS 환경설정에 고통받는 모든 이들에게 하나라도 도움이 되길 바란다... 😭

# Android SDK version N/A

## 문제

macOS에서 Android 빌드 및 실행이 제대로 작동하지 않을때는 `npx react-native doctor` 명령어를 실행해 보고
환경설정들이 정상적으로 설정되어 있는지 확인하는 과정을 거친다.

그 중에 `Android SDK version` 항목이 있는데 그 값이 무슨 짓을 해도 `N/A`로 표시되는 문제가 발생한다.

이 문제는 아래의 설정들이 이미 정상적으로 설정되어 있음에도 발생한다.

* `Node.js` 설치
* `npm` 설치
* `Watchman` 설치
* `Adb` 설치 및 설정
* `JDK` 설치 및 설정
* `Android Studio` 설치 및 설정
  * 올바른 `SDK`, `Google APIs ARM 64 v8a System Image` 등 설치
* 환경변수 설정
  * `ANDROID_HOME`
  * `ANDROID_SDK_ROOT`
    * react native 구버전에서 필요했던 것으로 보이며, 지금은 필요한지 확실치 않으나 일단 해둠
    * `ANDROID_HOME`과 같은 경로로 설정
  * `$ANDROID_SDK_ROOT/emulator`
  * `$ANDROID_SDK_ROOT/tools`
  * `$ANDROID_SDK_ROOT/platform-tools`
  * `$ANDROID_SDK_ROOT/cmdline-tools/latest/bin`
* `XCODE` 설치 및 설정
* `Ruby` 설치 및 설정
* `Cocoapods` 설치 및 설정


## 해결

이 문제는 java의 버전과 `cmdline-tools` 버전이 맞지 않아서 발생하는 문제이다.
따라서 올바른 버전의 JDK와 `cmdline-tools`를 설치하면 된다.

`cmdline-tools`에서 제공하는 `sdkmanager --list` 명령어를 실행해보면 제대로 실행되지 않음을 알 수 있다.

구글링을 해보면 이 문제를 해결하기 위해 대체로 다음과 같이 조언하는데, 해결 방향은 옳지만 문제가 하나 있다.

* Android Studio를 실행하고, `Preferences`를 열어서 `Appearance & Behavior` > `System Settings` > `Android SDK`를 선택한다.
* `SDK Tools` 탭을 선택하고, `Android SDK Command-line Tools (latest)`를 체크한다.
* `Apply` 버튼을 눌러서 설치를 진행한다.

이 `Android SDK Command-line Tools (latest)`가 `cmdline-tools`를 의미한다.

이 해결 방법에서 문제는 바로 `Android SDK Command-line Tools (latest)`의 버전 `(latest)` 이다.

2023년 9월 1일 기준으로 나는 JDK 14를 사용하고 있는데,
`cmdline-tools`의 `latest` 버전은 `11`이며 이는 JDK 14와 호환되지 않는다.

따라서 JDK 14 기준으로 아래와 같이 하면 이 문제는 해결된다.

* Android Studio에서 `Android SDK Command-line Tools`를 설치할 때, `latest` 버전이 아닌 `10` 버전을 설치
* 환경변수 설정(`.bashrc` or `.zprofile` 등등..)에서 `$ANDROID_SDK_ROOT/cmdline-tools/latest/bin`를
  `$ANDROID_SDK_ROOT/cmdline-tools/10.0/bin`으로 변경

주의, 구글 안드로이드 [공식문서](https://developer.android.com/studio/command-line?hl=ko#tools-sdk)에 따르면
`cmdline-tools`가 제공하는 프로그램들은 기존의 `tools` 하위의 프로그램들을 대체한다고 한다.<br/>

따라서 환경변수를 설정할 때, `$ANDROID_SDK_ROOT/tools/bin` 경로는 설정하지 말아야한다.
`$ANDROID_SDK_ROOT/cmdline-tools/10.0/bin` 경로에 있는 프로그램들과 중복되기 때문이다.

<div class="md-reference" markdown="1">
* <https://developer.android.com/studio/command-line?hl=ko#tools-sdk>{:target="_blank"}
</div>

# npx react-native run-android 명령어의 빌드가 진행되지 않음

## 문제

macOS에서 `npx react-native run-android` 명령어를 입력했음에도 app 설치가 진행되지 않는다.

## 해결

`gradlew`에 실행 권한이 없어서 발생하는 문제일 수 있다.<br/>
이건 모든 문제 상황에서 항상 가장 먼저 체크해봐야할 사항이기도 하다.

`chmod 755 android/gradlew` 명령어를 실행하면 해결된다.

Windows의 Git Bash, Linux, macOS를 오고가며 `git clone`을 수행할 때가 있는데,
그럴때마다 이러한 실행 권한 문제에 부딪히는 경우가 종종 있었다.

# macOS m1, m2에서 Android 빌드 에러

## 문제

macOS m1, m2에서 Android 빌드 시 다음과 같은 메시지를 동반한 에러가 발생할 수 있다.

```
reanimated:configureCMakeDebug[arm64-v8a]
```

App을 개발하다보면 종종 `react-navigation` 패키지를 사용할 텐데,
해당 패키지를 install 할 때 dependency로 `react-native-reanimated` 패키지가 함께 install 된다.
그리고 이 문제는 그 패키지에서 발생하는 에러이다.

## 해결

원인은 `react-native-reanimated` 패키지와 m1, m2의 호환성 문제에 있지 않을까 싶다.

이를 해결하기 위해 다음과 같이 iTerm2의 `Rosetta` 사용 옵션을 활성화 하자.

intel 칩셋 기반 프로그램과 호환을 위해 `arm64-v8a`를 `x86_64`로 변환하는 것과 관련된 것으로 보인다.
정확한 과정은 찾아보지 않아서 모른다.

`Finder` > `응용프로그램` > `iTerm` 오른쪽 클릭 > `정보 가져오기` > `Rosetta를 사용하여 열기` 체크

![Use Rosetta]({{ site.gdrive_url_prefix }}1n5pt3VpibLU8OAXaM5VBqk3BbmdZg3Ps)


<div class="md-reference" markdown="1">
* <https://velog.io/@taese0ng/M1-%EB%A7%A5%EC%97%90%EC%84%9C-React-Native-%EC%84%B8%ED%8C%85%ED%95%98%EA%B8%B0>{:target="_blank"}
</div>

# macOS Android 빌드 시 SafeAreaContextPackage 에러

## 문제

macOS에서 `npx react-native run-android` 명령어를 이용해서 Android 빌드 시 다음과 같은 에러가 발생한다.

```
/Users/sammy/projects/moneybook/android/app/build/generated/rncli/src/main/java/com/facebook/react/PackageList.java:21: error: cannot find symbol
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
                                    ^
  symbol:   class SafeAreaContextPackage
  location: package com.th3rdwave.safeareacontext
/Users/sammy/projects/moneybook/android/app/build/generated/rncli/src/main/java/com/facebook/react/PackageList.java:72: error: cannot find symbol
      new SafeAreaContextPackage(),
          ^
  symbol:   class SafeAreaContextPackage
  location: class PackageList
```

## 해결

다음의 명령어를 이용해서 빌드 캐시를 삭제하면 해결된다.

```bash
$ cd android
$ ./gradlew clean
```

<div class="md-reference" markdown="1">
* <https://github.com/th3rdwave/react-native-safe-area-context/issues/419>{:target="_blank"}
</div>
