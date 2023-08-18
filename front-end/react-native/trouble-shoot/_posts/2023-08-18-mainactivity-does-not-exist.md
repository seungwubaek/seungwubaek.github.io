---
layout: single
title: "MainActivity does not exist."
post-order: 1
date: "2023-08-18 15:58:00 +0900"
last_modified_at: "2023-08-18 15:58:00 +0900"
---

Android Build Error .MainActivity does not exist.

## 문제

AVD를 Android Version `Nugat`에서 Android Version `Tiramisu`로 바꾼 후(device 자체를 새로 만듬),
`npm run android`로 실행 시 에러

```bash
Activity class {com.noovies/com.noovies.MainActivity} does not exist.
```

## 해결

`npm start`로 일단 Metro Bundler를 실행하고, AVD 안에서 직접 앱을 실행하면 에러가 안남.
그렇게 한번 실행한 이후 재빌드에도 문제가 없음.

빌드 설정이 꼬였거나 캐싱 문제이지 않나 싶다. 이후 다시 발생한적은 없다.

아래 방법대로 했을 때는 에러 해결이 안됨

- AVD Device 안에서 앱 삭제 후 재빌드
- 패키지 삭제<br/>
  `adb uninstall com.noovies`
- Shell 재시작
- 재설치<br/>
  `npm run android`
