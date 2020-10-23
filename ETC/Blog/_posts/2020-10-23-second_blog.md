---
layout: posts
---
# Git Page를 이용한 Blog 만들기

## CSS Transition

CSS를 이용해서 HTML의 특정 요소에 애니메이션 효과를 부여할 수 있는 방법 중 하나.

특정 요소의 CSS 속성이 변화 할 때, 그 변화 과정 전과 후의 사이에 딜레이를 주어서 애니메이션 처럼 보이게 한다.

[mmistake theme](https://github.com/mmistakes/minimal-mistakes)에서는 주로 이 속성을 통해 애니메이션을 연출한다.

## Example

아래와 같이 단순한 html이 있다고 할 때 `mother`에 마우스를 가져다 대면 `mother` 밑에서 `child` 가 나왔다가 마우스를 밖으로 가져가면 다시 들어가는 애니메이션을 연출하는 예제를 만들어본다.

```html
<div class='mother'>
    여기로 마우스를 가져다 대세요!
    <div class='child'>
        까꿍
    </div>
</div>
```

여기에 아래와 같은 css를 적용한다.

처음에 `child`의 css에는 `height`가 0으로 되어있는데, `mother`에 마우스를 가져다 대면(`hover`) `child`의 `height`가 

```css
.child {
    height: 0px;
    overflow-y: hidden;

    transition: height 1s ease-in-out;
    -webkit-transition: height 1s ease-in-out;
}
.mother {
    width: 200px;
}
.mother:hover {
    background-color: red;
    .child {
        height: 1.5em;
        
        transition: height 1s ease-in-out;
        -webkit-transition: height 1s ease-in-out;
    }
}
```

<html>
    <head>
        <style>
            .mother { text-align: center; }
            .child {
                height: 0px;
                overflow-y: hidden;
                transition: height 0.5s ease-in-out;
                -webkit-transition: height 0.5s ease-in-out;
            }
            .mother:hover .child {
                height: 1.5em;
                transition: height 0.5s ease-in-out;
                -webkit-transition: height 0.5s ease-in-out;
            }
        </style>
    </head>
    <body>
        <div style='border: 1px solid red;'>
        <div class='mother'>여기로 마우스를 가져다 대세요!
            <div class='child'>까꿍</div>
        </div>
        </div>
    </body>
</html>

## 주의점

위 [예제](#example)처럼 `height` 값을 늘렸다 줄이는 애니메이션의 경우, `height` 값을 지정할 때 `%` 단위는 작동하지 않습니다! `px`, `em`, `rem`이 작동하는 것까지 확인했습니다.
