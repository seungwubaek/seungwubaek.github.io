---
layout: single
title: "TypeScript IDE Intellisense for React Native"
post-order: 1
date: "2023-08-21 00:29:00 +0900"
last_modified_at: "2023-08-21 00:29:00 +0900"
---

이 포스트는 TypeScript로 React Native 개발을 할 때 Intellisense 작동을 원활히 하기 위한 팁을 모은 포스트이다.<br/>
나는 IDE로 VSCode 사용하고 있기 때문에 이 포스트도 VSCode를 기준으로 작성했다.

# Styled Component `styled.TextInput`로 만든 `ref`에 대한 Intellisense

## 문제

React Native의 컴포넌트인 `TextInput`은 유저와 인터렉션 할 수 있는(입력 작업) 컴포넌트이다보니,
해당 DOM 노드에 직접 접근하기 위해 `styled.TextInput`에 property `ref`를 할당해야 할 때가 있다.

그러나 Styled Component v6.0.7 기준, `styled.TextInput`에 대한 `ref`에 할당하려는 변수를
`useRef`로 생성할 때 제네릭 타입을 `TextInput`으로 넣으면 Intellisense가 작동하지 않는다.<br/>
사실 React Native의 `TextInput`과 `styled.TextInput`은 같은 역할을 함에도 불구하고 말이다.
그래도 실행 시 작동은 한다. 다만 빨간줄이 그어져서 보기 불편하다.

## 해결

* Styled Component로 작성한 `styled.TextInput`을 React Native의 컴포넌트 `TextInput`으로 타입 캐스팅준다
* `useRef`로 `ref`를 생성할 때 `useRef`의 제네릭 타입에 React Native의 컴포넌트 `TextInput` 타입을 지정한다.

```tsx
import React from 'react';
import styled from 'styled-components/native';

// Types
import type { TextInput } from 'react-native';

// Styled Components
export const StViewContainer = styled.View``;
export const StText = styled.Text``;
export const StTextInput = styled.TextInput`` as typeof TextInput;  // 타입 캐스팅

// Component
// 회원가입을 위해 이메일과 비밀번호를 입력받는다.
const Join = () => {
  const emailOnSubmitEditing = () => {
    passwordInputRef.current?.focus();
  };
  const passwordInputRef = React.useRef<TextInput>(null);  // useRef에 제네릭 타입으로 TextInput을 지정한다.

  return (
    <StViewContainer>
      <StTextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        value={email}
        onChangeText={(text) => setEmail(text)}
        onSubmitEditing={emailOnSubmitEditing}
      ></StTextInput>
      <StTextInput
        ref={passwordInputRef}  // ref의 Intellisense가 정상 작동한다.
        placeholder="Password"
        secureTextEntry
        value={password}
        returnKeyType="done"
        onChangeText={(text) => setPassword(text)}
      ></StTextInput>
    </StViewContainer>
  );
};
```
