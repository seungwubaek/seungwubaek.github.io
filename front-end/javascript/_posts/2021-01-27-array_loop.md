---
layout: single
title: "Array Iteration (Loop)"
date: "2021-01-27 10:37:00 +0900"
last_modified_at: "2021-01-27 10:37:00 +0900"
---
Javascript의 Array, HTMLCollection에서 그 원소를 쉽게 순회하는 방법을 알아보자.

# `for`/`of` Statement

## Example

코드 예를 들면서 설명을 진행한다.

만약 아래 코드를 이용해서 `arr` 변수에 HTMLCollection을 받아온 상황이라 가정하자.

```javascript
var arr = document.getElementsByClassName('wholetoc__post-item');
```

arr에 담긴 내용을 보면 아래 그림과 같은 원소들이 들어있다.<br/>
<span class="md-monologue">현시점 내 블로그의 총 포스트 수이다 ㅋ</span>

![Example arr]({{ site.gdrive_url_prefix }}1izzx165Nl_Rmlc5F4Rg3PBQyVk85bsym)

이때 `arr`에 대해 다음 코드로 순회 할 수 있다.

```javascript
for(let elem of arr) {
    console.log(elem);
}
```

위 코드를 실행하면 다음과 같은 결과가 나오는 것을 볼 수 있다.

![Example arr Result]({{ site.gdrive_url_prefix }}1BevzZyu9fSVQOMkSuCPiwX-4nAUP3TnS)

## 주의

위 예제 코드를 보면 `for`/`of` 를 사용했다.
프로그래밍 언어에 익숙하다면 이 경우 자연스레 떠오르는 것은 `for`/`in` 구문일 것이다.

이때 주의할 점은 Javascript에서도 `for`/`in`이 객체를 Iteration 하긴 한다.
하지만 `for`/`of`가 객체의 원소를 순회하는 것과 달리, `for`/`in`은 객체의 모든 속성을 순회한다.

즉, 순회하면서 아래와 같은 원소를 반환받는다.

```
0
1
2
...
47
item
namedItem
@@iterator
length
```

(자세한 사항은 아래 Ref를 참조)

<br/>
<strong>Ref:</strong>
* <https://stackoverflow.com/questions/22754315/for-loop-for-htmlcollection-elements/22754453>
