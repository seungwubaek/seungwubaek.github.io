---
layout: single
title: "Javascript로 애니메이션 제어하기 (Force Reflow)"
date: "2021-03-14 22:09:00 +0900"
last_modified_at: "2021-03-14 22:09:00 +0900"
---
한 번의 Event에서 HTML Element가 여러번의 Style 변화를 가질 때 어떤 때는 애니메이션이 적용되었다가 어떤 때는 해제되도록 하기위해
Javascript로 애니메이션 적용/해제 코드를 작성할 때가 있다.<br/>
그러나 막상 애니메이션이 적용돼야 할 때와 적용되지 말아야 할 때를 정의하고 조건에 따라 코딩하면 애니메이션이 조건에 상관없이
일괄 적용되거나 일괄 해제돼서 애니메이션이 필요 없음에도 동작하거나 필요함에도 동작하지 않게된다.
그 이유는 여러 줄의 Javascript로 CSS Style 변경을 여러 번 일으킬 때 코드 한줄 마다 한 번씩 Reflow가 일어나는 것이 아니라
여러번의 Style 변경이 통합되서 한 번에 Reflow 되기 때문이다.<br/>
따라서 이번 포스트에서는 Javascript로 Style 변경 코드 중간에 Reflow를 강제 발생시켜 애니메이션이 의도대로 동작하도록
제어하는 법을 알아본다.

## What is Reflow

Reflow란 HTML Element의 길이, 위치 등을 픽셀 값으로 연산하는 과정이다.

Reflow에 대한 자세한 설명은 [Reflow란]({{ site.baseurl }}/front-end/html/reflow/#page-title) 포스트를 참조하자.

# Javascript 애니메이션 방식과 제어 방법

어떤 Element에 `transition`을 설정하고 Style을 변경한 후 `transition`을 해제하고 다시 Style을 변경하는 Javascript 코드를 짜면
전자의 Style 변경은 애니메이션과 함께 변화하고 후자의 Style 변경은 애니메이션 없이 즉시 변경 될 것이라 예상되지만
실제로는 2가지 Style 변경이 모두 `transition`이 해제된 상태로 수행된다.

이것은 Javascript로 Style을 수정하는 코드를 여러줄 작성하면 코드 한 줄 마다 한 번씩 Reflow & Repaint 되는 것이 아니라
여러 줄의 Style 수정을 모아서 중복되는 속성에 대한 Style 수정을 통합하기 때문이다.
이렇게 여러 번의 Style 변경을 축소시키는 이유는 아마 Reflow 연산 부하를 줄이기 위해서인 것으로 보인다.

마찬가지로 `transition`을 적용했다가 해제하면 결과적으로 `transition` 속성의 최후 상태인 '해제' 상태로 Reflow & Repaint 되는 것이다.

이때 애니메이션을 제대로 작동시키려면 애니메이션을 켜고 끄는 사이에서 Reflow를 강제로 발생시켜야 한다.
Reflow는 Javascript를 이용해서 특정 Attribute를 읽는 작업만으로도 강제 발생시킬 수 있다.

```javascript
$('.test-box').prop('offsetHeight');
```

# Force Reflow 데모

아래 [데모 코드](#데모-코드)의 HTML, CSS를 가진 빨간 박스(`test-obj`)가 검은색 테두리를 가진 부모 박스 안에 있다고 하자.

빨간 박스를 클릭하면 애니메이션 없이 즉시 빨간 박스가 부모 박스 오른쪽 끝에 붙도록 `left` 속성 값을 수정하고
다시 애니메이션을 적용해서 부모 박스의 왼쪽으로 부터 `50px` 떨어진 위치로 `left` 속성 값을 수정하는 Javascript를 붙일 것이다.

즉, 빨간 박스를 클릭하면 빨간 박스가 즉시 부모 박스의 오른쪽에 붙었다가 서서히 부모 박스의 왼쪽으로 부터
`50px` 떨어진 지점으로 이동할 것이다.

이때 박스는 CSS로 애니메이션이 있는 상태로 설정해 두고
CSS Class `notransition`을 만들어서 이 Class를 추가하면 애니메이션이 해제되도록 한다.

## 데모 HTML, CSS

* HTML

```html
<html>
<body>
<button>Refresh</button>
<div class="test-body">
  <div class="test-obj"></div>
</div>
</body>
</html>
```

* CSS

```css
.test-obj {  // 빨간 박스
  background-color: red;
  width: 50px;
  height: 50px;
  position: absolute;
  left: 0;
  -webkit-transition: left 500ms linear;
  transition: left 500ms linear;
}
.notransition {  // 애니메이션을 해제시키는 Class
  -webkit-transition: none !important;
  -moz-transition: none !important;
  -o-transition: none !important;
  transition: none !important;
}
.test-parent {  // 부모 박스
  width: 200px;
  height: 50px;
  position: relative;
  border: 1px solid black;
}
body {
  padding: 10px;
  margin: 0;
}
```

## 데모 애니메이션 요약

1. 애니메이션 해제(`notransition` class 추가)
2. 빨간 박스가 부모 박스 오른쪽 끝에 붙도록 `left` 수정
3. 애니메이션 설정(`notransition` class 제거)
4. `left`를 `50px`로 수정

## 데모 Javascript - 애니메이션이 제대로 작동하지 않는 경우

<iframe style="width: 230px; height: 100px;"
        src="/assets/iframes/js_animation_ctrl/ani_cant_be_ctrled.html">Animation can not be controlled</iframe>

이 데모는 아래의 javascript 코드를 사용해서 작성했다.

```javascript
$('.test-obj').on('click', function() {
  $selector = $(this);

  selectorWidth = $selector.prop('clientWidth');
  parentWidth = $('.test-parent').prop('clientWidth');
  selectorRightLimit = parentWidth - selectorWidth;

  $selector.addClass('notransition');         // 1. 애니메이션 해제(`notransition` class 추가)
  $selector.css('left', selectorRightLimit);  // 2. 빨간 박스가 부모 박스 오른쪽 끝에 붙도록 `left` 수정
  $selector.removeClass('notransition');      // 3. 애니메이션 설정(`notransition` class 제거)
  $selector.css('left', 50);                  // 4. `left`를 `50px`로 수정
});
$('button').on('click', function() {
  $selector = $('.test-obj');
  $selector.addClass('notransition');
  $selector.css('left', '');
});
```

정상적으로 작동한다면 코드에 넣은 주석과 같이 4단계가 순서대로 진행하면서 Reflow가 일어나야 하지만
실제로는 Reflow를 줄이기 위해 아래의 순서로 같은 Style 속성에 대한 수정이 통합되어 Reflow & Repaint 된다.

1. Reflow
2. Style 수정 중복 통합
  * <s>애니메이션 해제(`notransition` class 추가)</s>
  * <s>빨간 박스가 부모 박스 오른쪽 끝에 붙도록 `left` 수정</s>
3. 애니메이션 설정(`notransition` class 제거)
4. `left`를 `50px`로 수정
5. Repaint

## 데모 Javascript - 애니메이션이 제대로 작동하는 경우

애니메이션을 제대로 작동시키기 위해 Style 수정 코드 중간에 강제 Reflow를 발생시키는 코드를 삽입한다.

<iframe style="width: 230px; height: 100px;"
        src="/assets/iframes/js_animation_ctrl/ani_ctrled.html">Animation can be controlled</iframe>

이 데모는 아래의 javascript 코드를 사용해서 작성했다. [위](#데모-javascript---애니메이션이-제대로-작동하지-않는-경우)와
같은 코드에서 10번째 줄에 강제 Reflow 코드가 한 줄 삽입되었다.

```javascript
$('.test-obj').on('click', function() {
  $selector = $(this);

  selectorWidth = $selector.prop('clientWidth');
  parentWidth = $('.test-parent').prop('clientWidth');
  selectorRightLimit = parentWidth - selectorWidth;

  $selector.addClass('notransition');         // 1. 애니메이션 해제(`notransition` class 추가)
  $selector.css('left', selectorRightLimit);  // 2. 빨간 박스가 부모 박스 오른쪽 끝에 붙도록 `left` 수정
  $selector.prop('offsetHeight');             // 이 코드를 넣으면 이 시점에서 강제 Reflow 발생
  $selector.removeClass('notransition');      // 3. 애니메이션 설정(`notransition` class 제거)
  $selector.css('left', 50);                  // 4. `left`를 `50px`로 수정
});
$('button').on('click', function() {
  $selector = $('.test-obj');
  $selector.addClass('notransition');
  $selector.css('left', '');
});
```

위의 코드는 데모의 작동 흐름을 아래 순서로 발생시킨다.
이처럼 강제 Reflow는 동일 CSS 속성이 통합되는 것을 막고 한 번 강제로 화면을 그리도록 하는 효과가 있기 때문에
의도한대로 애니메이션이 적용/해제 된다.

1. Reflow
2. 애니메이션 해제(`notransition` class 추가)
3. 빨간 박스가 부모 박스 오른쪽 끝에 붙도록 `left` 수정
4. Repaint
5. Reflow
6. 애니메이션 설정(`notransition` class 제거)
7. `left`를 `50px`로 수정
8. Repaint

# 구현 예

내 블로그의 오른쪽 하단에는 항상 Navigation Panel이 떠있다. 이 Navigation Panel은
Javascript로 강제 Reflow를 발생시켜서 애니메이션을 구현하고 있다.

![Navigation Panel 'Navremocon' on bottom right of my blog]({{ site.gdrive_url_prefix }}1OMW1kqQMstL_yOJzcfJ7rUuFsl3FyRGy)

Navigation Panel의 위&#183;아래 버튼을 클릭하는 것으로 접기&#183;펼치기, 숨기기&#183;보이기 상태 설정이 가능하다.

그리고 페이지가 새로고침 될 경우,
Javascript를 이용해서 Panel의 접힘, 펼침, 보임, 숨김 상태를 저장하고 있다가 새로고침이 완료되면(HTML Layout이 완성되면)
<strong>애니메이션 없이</strong> 즉시 Panel을 새로고침을 하기 전 상태로 변경하는 초기화를 수행한다.

또 초기화가 된 이후에 Panel의 위&#183;아래 버튼을 클릭하면 이번엔 <strong>애니메이션과 함께</strong> Panel의 높이를 변경한다.

Navigation Panel의 force reflow를 위한 Javascript code는 내 블로그 깃허브 저장소의 [파일](https://github.com/seungwubaek/seungwubaek.github.io/blob/master/assets/js/customs/nav-remocon.js)에서 볼 수 있다.

<div class="md-reference" markdown="1">
* <https://stackoverflow.com/questions/11131875/what-is-the-cleanest-way-to-disable-css-transition-effects-temporarily/16575811#16575811>
* <https://wonism.github.io/reflow-repaint/>
</div>
