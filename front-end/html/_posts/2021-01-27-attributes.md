---
layout: single
title: "HTML Attributes"
date: "2021-01-27 11:41:00 +0900"
last_modified_at: "2021-01-27 11:41:00 +0900"
---
HTML Attribute들에 대해 알아본다. 비 Front-End 개발자 입장에서 공부한 것이고 그정도 수준에서 쉽게 풀어 설명하도록 한다.
그래서 전문성이 부족한 글일 수 있다. 내가 직접 경험해본 attribute 위주로 하나씩 업데이트해 나가겠다.

# 요약 테이블

|Attribute|적용 가능 HTML 요소|설명|
|---|---|---|
|data-*|모든 요소|태그 안에 값을 담을 수 있다. 요소 이름에서 보듯 데이터 용도로 활용한다.|
|hidden|모든 요소|이 attr을 가진 태그를 뷰에서 보이지 않게 한다.|
|multiple|select|select가 내부에 2개 이상의 선택지를 가졌을 때 이 attr이 있으면 그것이 뷰에서 1줄로 보이지 않고 선택지 개수 만큼으로 확장된다.|

## 상세

### data-*

`data-`로 시작하는 모든 attr 이름이 여기에 해당한다.
요소 이름에서 보듯 HTML 요소 안에 데이터를 담는 용도로 활용한다.

태그를 아래와 같이 만들어 넣을 수 있다.

```html
<li id="AB001"
    data-name="John"
    data-age="31"
    data-city="Seoul">
  <span>Welcome to join us.</span>
</li>
```

* Plain Javascript<br/>
Javascript에서 아래와 같이 `data-*` attr의 값을 꺼내 사용 할 수 있다.
`data-` 다음에 오는 `*`을 `dataset.*` 형태로 참조하면 된다.

```javascript
document.getElementById('AB001').dataset.name
document.getElementById('AB001').dataset.age
document.getElementById('AB001').dataset.city
```

* JQuery<br/>
JQuery라면 아래 처럼 한다.

```javascript
$('#AB001').data('name');
$('#AB001').data('age');
$('#AB001').data('city');
```

* 주의<br/>
    요소를 선택할 때 `id`가 아닌 `class`를 사용해서 여러개의 요소를 한번에 선택한 다음,
    같은 이름을 가진 `data-*` attr의 값을 array 형식으로 가져오는 방식은 작동하지 않는다.

    그렇게 할 경우 가장 첫번째 선택자의 `data-*` 값만 가져오게 된다.

### hidden

이 attribute를 가진 HTML 요소를 화면에서 보이지 않게 한다. 사용법은 아래와 같다.

```html
<div hidden
     data-type="toc"></div>
```

### multiple

`<select>` 태그에서 내부 선택지 항목을 화면에 모두 보이게 한다.

* `multiple` attr가 없을 때

```html
<select>
  <option value="0">0</option>
  <option value="1">1</option>
  <option value="2">2</option>
</select>
<span>선택</span>
```

__구현 예__<br/>
<select>
  <option value="0">0</option>
  <option value="1">1</option>
  <option value="2">2</option>
</select>
<span>선택</span>

* `multiple` attr가 있을 때

```html
<select multiple>
  <option value="0">0</option>
  <option value="1">1</option>
  <option value="2">2</option>
</select>
<span>선택</span>
```

__구현 예__<br/>
<select multiple>
  <option value="0">0</option>
  <option value="1">1</option>
  <option value="2">2</option>
</select>
<span>선택</span>

<br/>
<strong>Ref:</strong>
* <https://developer.mozilla.org/ko/docs/Web/HTML/Attributes>
