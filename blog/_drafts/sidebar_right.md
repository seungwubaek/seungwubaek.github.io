---
layout: single
title: "[Git Page로 Blog 만들기] - [?] 오른쪽 사이드바 (페이지 내 목차)"
post-order: 8
date: "2020-11-23 00:00:00 +0900"
last_modified_at: "2020-11-23 00:00:00 +0900"
---

`_config.yml` 파일에서 `defaults` 항목에 `toc_sticky: true` 추가

'/assets/js/_main.js' 파일에서

`SmoothScroll`의 `offset`을 `0`으로, `Gumshoe`의 `offset`을 `topbar height`로 만들어 준다.

참고로 SmoothScroll은 윈도우의 애니메이션 표시 옵션을 off 하면 적용되지 않는다.

```javascript
// Smooth scrolling
  var scroll = new SmoothScroll('a[href*="#"]', {
    offset: 0,  // 0으로 해야 정확함
    speed: 400,
    speedAsDuration: true,
    durationMax: 500
  });

  // Gumshoe scroll spy init
  if($("nav.toc").length > 0) {
    var spy = new Gumshoe("nav.toc a", {
      // Active classes
      navClass: "active", // applied to the nav list item
      contentClass: "active", // applied to the content

      // Nested navigation
      nested: false, // if true, add classes to parents of active link
      nestedClass: "active", // applied to the parent items

      // Offset & reflow
      offset: 56, // how far from the top of the page to activate a content area  // topbar 사이즈
      reflow: true, // if true, listen for reflows

      // Event support
      events: true // if true, emit custom events
    });
  }
```

그다음 아래 명령어 실행. npm이 없으면 인스톨 할 것. node.js 인스톨 하면 딸려옴

```shell
npm run uglify
```
