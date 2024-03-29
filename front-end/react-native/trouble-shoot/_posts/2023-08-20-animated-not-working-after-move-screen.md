---
layout: single
title: "Animated가 제대로 작동하지 않음"
post-order: 3
date: "2023-08-20 19:40:00 +0900"
last_modified_at: "2023-08-20 19:40:00 +0900"
---

애니메이션을 표현하기 위해 사용하는 `Animated`는 다양한 원인으로 인해 제대로 표현되지 않을 수 있다.
본 포스트에서는 Animated가 정상 작동하지 않는 경우의 원인과 해결방법에 대해 알아본다.

# `setState`로 인해 리렌더링이 발생하는 경우

## 원인

`Animated`가 정상적으로 동작하지 않을때 무엇보다 가장 먼저 살펴봐야 할 부분은
애니메이션이 동작하는 시간 동안 `setState`가 호출되고 있지 않은가 하는가이다.

`setState`가 호출되면 리렌더링이 발생하기 때문에 애니메이션이 초기화 되기 때문이다.

## 해결

그러므로 `Animated`가 제대로 작동하지 않으면, 코드를 보면서 머릿속으로 앱의 시작부터 애니메이션이 종료될 때까지
전체 로직을 따라가보면서 그 과정에 `setState`가 호출되는 부분이 있는지 살펴보자.

애니메이션의 종료 시점까지 `setState`가 호출되면 안된다.

# 스크린 이동(`navigate`) 직후 Layout Animation이 작동하지 않는 경우

## 문제

`useEffect()`로 렌더링 직후 재생을 시작하는 Layout Animation 애니메이션이 있다.
이 애니메이션은 보통의 상황에서 잘 작동한다.

그런데 이전 스크린에서 키보드로 무언가 작성하고 나서 react-navigation 패키지의
`navigation.navigate()` 또는 `navigation.goBack()` 메소드를 통해 다음 스크린으로 이동한 다음
`useEffect()`로 Layout Animation이 작동하는 상황에서는 원하는대로 작동하지 않는다.

## 원인

이 문제는 Simulator 환경에서만 발생하는 문제이다.

만약 이전 스크린에서 활성화돼 있던 키보드가 있었다면, `navigate()`로 스크린 이동했을 때 비활성화된다.
그리고 키보드가 내려가는 애니메이션이 재생된다.

이때 다음 스크린으로 이동이 완료되고, 다음 스크린이 렌더링 되자마자 `useEffect()`를 통해 재생될 예정이었던
Layout Animation이 이어서 재생을 시작하면 문제가 발생한다.

이전 스크린에서 키보드 비활성화 애니메이션과 다음 스크린에서 Layout Animation의 재생 타임라인이
겹쳐서 발생하는 문제로 추정된다.<br/>
이 때문에 Layout Animation의 재생이 곧장 끝나버린다.

그런데 EAS를 이용해 APK로 빌드(`eas build -p android`) 해서 실제 기기에 설치 후 실행시켜보면
문제가 발생하지 않는다.<br/>
따라서 이 이슈의 발생 여부는 그래픽 구현 성능에 좌우되는 것으로 추정한다.

## 재연

* 이전 스크린에서 `TextInput`에 텍스트를 입력을 위해 포커스를 준다.
  * 키보드가 자동으로 활성화(키보드가 올라오는 애니메이션 재생)된다.
* <kbd>Enter</kbd>를 누르거나 작성 완료 버튼을 누른다
* `onSubmitEditing()` 이벤트에서 `goBack()` 함수가 호출된다.
  * 키보드가 자동으로 비활성화(키보드가 내려가는 애니메이션 재생)된다.
* 다음 스크린으로 이동하면서 `useEffect()`가 호출된다.
  * `useEffect()`에서 Layout Animation이 재생된다.
  * Layout Animation의 재생 시점이 키보드 비활성화 애니메이션의 재생 시간대와 겹치는 상황 발생
  * Layout Animation이 곧장 재생이 끝나고 예상한 애니메이션 효과가 나타나지 않는다.

## 해결

실제 앱 배포 이후에는 이상이 없으므로 크게 신경쓰지 않아도 된다. 하지만 개발 단계에서도 임시로 해결하는 방법이 있다.

위 [재연](#재연)에서 `TextInput`에 입력을 완료한 다음, 키보드를 직접 터치(클릭)해서 수동으로 비활성화하자.

키보드가 내려가는 애니메이션을 먼저 재생시켰기 때문에
다음 스크린으로 이동한 다음 재생되는 Layout Animation과 재생 타임라인이 겹치지 않게 되고
Layout Animation이 정상적으로 재생된다.

# TypeError: Cannot read property 'start' of undefined

## 문제

컴포넌트가 re-render 된 후, 그 전에 한번 호출했던 어떤 `Animated`의 `start` 함수를 다시 호출하면 발생.

## 해결

`Animated.reset()` 함수를 사용한다.

<div class="notice--info" markdown=1>
<https://reactnative.dev/docs/animated#reset>

* `reset`<br/>
  Stops any running animation and resets the value to its original.<br/>
  실행 중인 애니메이션을 중지하고 값을 원래 값으로 재설정합니다.
</div>


* 해당 `Animated` 객체의 `start`를 호출하기 전에 `reset`을 호출한다.
* 해당 `Animated`가 `sequence`, `loop` 등으로 연결된 `Animated.CompositeAnimation`이라면 nested `Animated`들도 `reset` 해야 할 수 있다.
