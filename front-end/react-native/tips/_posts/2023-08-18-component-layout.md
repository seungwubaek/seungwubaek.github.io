---
layout: single
title: "Component의 Layout 알아내기"
post-order: 1
date: "2023-08-18 16:25:00 +0900"
last_modified_at: "2023-08-18 16:25:00 +0900"
---

View의 width, height, x, y 값을 알아야 할 때가 있다. 컴포넌트의 애니메이션 position 등에서 말이다.
이를 위해 `onLayout` 이벤트를 사용한다.

```jsx
<View
  onLayout={event => {
    const { width, height, x, y } = event.nativeEvent.layout;
  }}
>
...
```
