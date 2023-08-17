---
layout: single
title: "React 프로젝트 기본 지식"
post-order: 2
date: "2023-08-17 15:31:00 +0900"
last_modified_at: "2023-08-17 15:31:00 +0900"
---

본 포스트는 React 입문자에게 React 프로젝트에 관한 기본 지식을 설명하는 포스트이다.

# 프로젝트 시작

## 프로젝트 환경 구성

### Node.js 버전 관리 프로그램 설치

버전 관리 프로그램을 사용할지 말지는 개발자의 선택이지만,
프로젝트를 구성하는 언어, 패키지, 기타 도구들은 요구하는 Node.js 버전이 다르기 때문에
버전 관리 프로그램을 사용하는 것이 좋다.

어떤 패키지가 당장은 프로젝트에서 사용중인 Node.js 버전과 호환되더라도
치명적 버그 등으로 패키지를 업데이트 해야만 한다던지,
새로 출시된 신박한 기능을 사용하고 싶어서 업데이트 해야만 한다던지 할 때
예기치못하게 호환되지 않을 수도 있다.

버전 관리 프로그램을 사용하지 않으면
그런 상황들 마다 기존에 설치한 Node.js를 제거하고 새로 설치하는 것을 반복해야한다. (자주 있는 일은 아니다)

대신 버전 관리 프로그램을 이용하면 그런 상황에서 손쉽게 Node.js의 버전을 교체할 수 있다.

**Windows**

chocolatey를 이용해 설치

```bash
choco install nvm
```

**Linux Ubuntu**

`npm`도 있다고 가정

```bash
apt-get update
apt-get install wget npm
npm install -g n
```

### Node.js 설치

**Windows**

```bash
nvm install lts
nvm use lts

# 확인
node -v
```

**Linux Ubuntu**

```bash
n lts

# 확인
node -v
```

## 프로젝트 초기화

CRA (Create React App)로 프로젝트 초기화.
CRA는 React 프로젝트를 쉽게 시작할 수 있도록 유용한 자동화 도구와 설정들을 제공한다.

`package.json`의 `"dependencies"` 항목에 있는 `react-scripts`가 CRA 녀석의 본체이다.


**프로젝트 폴더를 이미 만들었을 경우**

```bash
cd <프로젝트 폴더>
npx create-react-app .
```

**프로젝트 폴더를 만들면서 프로젝트를 생성할 경우**

```bash
npx create-react-app <프로젝트 이름>
```

## Typescript 적용할 경우

바뀔수도 있으니 공식문서를 먼저 참고하자.<br/>
<https://create-react-app.dev/docs/adding-typescript/>{:target="_blank"}

```bash
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

## 프로젝트 시작

다음 명령어로 프로젝트를 실행할 수 있다.

```bash
npm start
```

# 프로젝트 구조

React 프로젝트는 CRA로 생성할 경우 다음과 같은 프로젝트 구조를 갖는다.

```bash
├── node_modules/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

## 디렉토리 및 파일

### 최상위 경로의 파일들

* `package.json`, `package-lock.json`
  * 프로젝트 빌드 및 실행에 필요한 설정값, React 관련 또는 여러 커뮤니티 패키지 목록이 담겨있다.

* `README.md`
  * 프로젝트 생성 후 React에 대한 설명을 담은 `README.md` 파일이 자동 생성된다.<br/>
    제대로 유지보수 하려면 이 파일을 이대로 두지 말고 프로젝트에 맞게 수정하는 것을 잊지 말자.

### `node_modules/` 디렉토리

프로젝트에서 사용하는 패키지 모듈들이 설치되는 공간이다.
나중에 프로젝트를 배포하게 된다면, 배포 소스가 실행될 시점에 생성하는 것이므로
개발중에 github에 업로드 하지 않도록 주의하자!

실제 운영 시에는 On-Premise 서버 또는 AWS EC2와 같은 클라우드 컨테이너에 배포하며,
깨끗한 환경에서 앞에 봤던 세팅부터 `npm install`을 실행해서 `node_modules/` 생성하는 등 모든 준비를 처음부터 진행한다.

### `public/` 디렉토리

`public` 디렉토리는 클라이언트에게 전송할 정적 파일들을 담는 디렉토리이다.

기본 제공되는 `favicon.ico`, `logo192.png`, `logo512.png`는 임시로 React 로고를 담고 있으므로
프로젝트에 맞게 대체해야한다.

`index.html`은 SPA(Single Page Application)의 진입점이며, `<html>` 태그가 시작되는 지점이다.
프로젝트에서 작성한 모든 React 스크립트는 이 파일에 첨부된다.

### `src/` 디렉토리

React 개발에 필요한 모든 스크립트가 담긴 디렉토리이다.

CRA로 프로젝트를 생성하고 실행시키면 브라우저는 제일 먼저 `index.js`를 실행시킨다.

`index.js`는 `src/App.js` 파일에 있는 최상위 React Component `App`을 가져와서(`import` 해서)
`public/index.html`에 있는 `<div id="root">`에 붙이는 것으로 DOM을 구성한다.

### 소스 디렉토리 및 파일

웹을 구성하는 컴포넌트, UI, 로직 구현 소스가 들어있는 파일들은
모두 `src/` 디렉토리 하위에 생성한다.

그중 컴포넌트는 `components/` 디렉토리를 생성하여 그 하위에서 관리한다.

컴포넌트는 그 양이 많아질수록 유지보수와 협업 효율을 위해 체계적으로 관리해야 한다.<br/>
그래서 나는 Atomic Design과 Presentational and Container Component 패턴을 적용해서 관리한다.<br/>
이에 관해서는 이후 React Coding Convention 포스트에서 다루도록 하겠다.

그밖에 `apis/`, `utils/`, `styles/` 등의 디렉토리를 생성해서 사용하게 된다.

## 네이밍 규칙

React 파일은 대문자로 시작하는 CamelCase로 작성한다. 최상위 컴포넌트를 만드는 파일 `App.js`가 그 예이다.

또한 컴포넌트 변수명도 대문자로 시작하는 CamelCase로 작성한다.

React에 관한 다른 네이밍 규칙은 없다. 개발자의 취향에 따라 작성하면 된다.

내가 사용하는 네이밍 규칙은 이후 React Coding Convention 포스트에서 다루도록 하겠다.

```jsx
// SomeComponent.js
const SomeComponent = () => {
  return <div>Some Component</div>;
};
```
