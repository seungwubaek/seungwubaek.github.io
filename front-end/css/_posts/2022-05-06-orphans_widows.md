---
layout: single
title: "orphans와 widows"
post-order: 2
date: "2022-05-06 20:11:00 +0900"
last_modified_at: "2022-05-06 20:11:00 +0900"
---

웹 페이지를 인쇄(print) 또는 인쇄 미리보기(print preview) 할 때,
어떤 HTML 컨테이닝 블록이 내부에 가진 문단의 줄 수가 너무 많아서 한 페이지 안에 다 표시 되지 못하여
이전 페이지와 다음 페이지로 쪼개져서 출력돼야만 하는 경우,
orphans와 widows 속성은 이전 페이지와 다음 페이지에 출력되는 최소의 줄 수를 정의한다.

<span class="md-monologue">각 단어를 한국말로 번역하면 orphans는 고아, widows는 과부를 의미한다.
왜 이런 단어를 선택했는지 궁금한데, 각 속성의 기능을 이해한다면 인정하고 싶지 않아도 확실히 고개가 끄덕여지긴 한다...</span>

## 가정

아래 그림과 같이 어떤 문단('Paragraph 2')이 'Printing Page 1'과 'Printing Page 2' 두 페이지에 걸쳐
쪼개져서 출력되는 상황을 가정하자.<br/>
이때 각 문단(`<p>Paragraph 1</p>`, `<p>Paragraph 2</p>`, `<p>Paragraph 3</p>`)은 컨테이닝 블록으로 감싸져있다.

![Splitted Paragraph]({{ site.gdrive_url_prefix }}1laqPpVITWbVvR6BqOhlJ6WYQbvEMaTMq)

이제 쪼개진 부분을 자세히 확대해 보자. 'Line1', 'Line2'는 'Printing Page 1'에 출력되고
'Line3', 'Line4'는 'Printing Page 2'에 출력되는 상황이다.

![Zooming Splitted Paragraph]({{ site.gdrive_url_prefix }}1a-qMuYqgNqmFWrQkV8FLEMspWYT3tyNG)

## Orphans

먼저 `orphans` 속성은 페이지 <strong>하단</strong>에 출력돼야만 하는 최소의 줄 수를 정의하는 CSS 속성이다.
즉, 페이지의 내용이 꽉 차 있는 이전 페이지('Printing Page 1')에 적용된다.<br/>
쪼개져 출력되는 문단 중 다음 페이지에 출력되는 내용은 다음 페이지의 <strong>상단</strong>에 출력되므로 `orphans` 속성의 영향을 받지 않는다.

예시를 통해 이해해보자.<br/>
아래의 style은 '하나의 문단이 두 페이지에 걸쳐 쪼개질 때, 이전 페이지의 하단에 최소 3줄은 표시돼야한다'를 의미한다.<br/>
이대로 인쇄(또는 인쇄 미리보기)하면 어떻게 출력될까?

```css
@media print {
  orphans: 3;
}
```

다음과 같이, 이전 페이지에는 아무것도 출력되지 않으며 모든 'Line'이 다음 페이지로 넘어가서 출력된다.<br/>
왜냐하면, [가정](#가정)의 그림을 다시 보면 이전 페이지의 내용이 이미 꽉차서 최하단의 문단은 최대 2줄까지가 출력 가능한 줄 수이기 때문이다.
따라서 `orphans: 3`의 '페이지의 하단에 최소 3줄을 표시하라'는 스타일을 적용하지 못하고 모든 내용을 다음 페이지('Printing Page 2')로 넘겨버리는 것이다.

![Result of Orpahns 3]({{ site.gdrive_url_prefix }}14i8rqKXTG9g366nTw4oZSJ7TmZgCGC8V)

## Widows

`widows`는 `orphans`와 비슷하게 페이지 <strong>상단</strong>에 출력돼야만 하는 최소의 줄 수를 정의하는 CSS 속성이다.<br/>
`widows`는 `orphans`를 이해했다면 쉽게 이해할 수 있다.

이번에도 예시를 통해 이해해보자.<br/>
아래의 style은 '하나의 문단이 두 페이지에 걸쳐 쪼개질 때, 다음 페이지의 상단에 최소 3줄은 표시돼야한다'를 의미한다.<br/>
이대로 인쇄(또는 인쇄 미리보기)하면 어떻게 될지 이젠 예상 가능할 것이다.

```css
@media print {
  widows: 3;
}
```

다음과 같이, 이전 페이지에는 문단의 내용 중 'Line1'만 남고, 'Line2'가 다음 페이지로 넘어가서 출력된다.<br/>
왜냐하면, 다음 페이지의 상단에 최소 3줄은 출력해야만하기 때문에 이전 페이지에서 줄 1개를 끌어온 것이다.

![Result of Widows 3]({{ site.gdrive_url_prefix }}10uOHtgxhCPKlZgosnh3MK0HgPhy3hmjr)

<div class="md-reference" markdown=1>
* <https://www.w3schools.com/jsref/tryjsref_style_orphans.htm>
* <https://www.w3schools.com/cssref/css3_pr_orphans.asp>
* <https://developer.mozilla.org/en-US/docs/Web/CSS/orphans#setting_a_minimum_orphan_size_of_three_lines>
* <https://www.w3schools.com/cssref/css3_pr_widows.asp>
</div>
