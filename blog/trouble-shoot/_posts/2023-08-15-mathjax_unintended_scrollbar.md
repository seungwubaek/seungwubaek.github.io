---
layout: single
title: "MathJax에서 의도하지 않은 Y축 스크롤바가 생기는 경우"
post-order: 2
date: "2023-08-15 19:04:00 +0900"
last_modified_at: "2023-08-17 17:56:00 +0900"
---

MathJax 수식을 inline으로(문단 내부에 담아) 사용할 때
inline MathJax가 담긴 문단(`<p>`)에 의도하지 않은 Y축 스크롤바가 생기는 경우가 있다.

## 원인

명확한 원인은 찾지 못했지만 다음과 같은 상황에 발생하는 것을 확인했다.

MathJax를 사용하는 경우 수식을 포함하는 `<p>` 태그에 자동으로 `overflow-x: auto;` 속성이 붙는다.<br/>
그리고 이때 아마도 수식이 가진 height가 수식을 포함하고 있는 부모 태그(`<p>`)의 height를 넘어서는 경우
발생하는 것으로 추정된다.

아래 이미지에서 우측에 빨강으로 동그라미 쳐놓은 곳을 보면 뜬금없이 스크롤바가 붙어있는 것이 보인다.

![Unintended Y Scrollbar]({{ site.gdrive_url_prefix }}1nDda0kV_XigXhZXbV-04DhgETPU1lfbB){:class="align-center img-shadow"}
{:class="img-popup" data-title="Unintended Y Scrollbar}

## 해결

이를 해결하기 위해서는 MathJax inline expression을 `<span>`으로 감싸주면 된다.

### 기존 코드

```html
산술 평균은 각 수를 1개로 하여 균등하게 나누는 비율
$$\frac{1}{n}(=\frac{1}{\sum_{k=1}^n 1})$$을 얻어냈다. (=1이 n개 있고 그 중 1개)<br/>
반면 가중 평균은 각 수를 1개로 취급하지 않고 각 수를 $$w_1, w_2, w_3, ..., w_n$$과 같이 1 보다 크거나 같은 개수로 보고 비율을 얻어낸다.
이것이 가중의 의미이다.<br/>
총 개수($$\sum_{k=1}^n w_k$$)에서 각 수($$a_k$$)가 차지하는 비율은
$$\frac{w_k}{\sum_{k=1}^n w_k}$$ 이다. (=총 $$w_1+w_2+w_3+...+w_n$$개 있고 그 중 $$w_k$$개)
```

### 해결을 위한 수정 코드

```html
산술 평균은 각 수를 1개로 하여 균등하게 나누는 비율
<span>$$\frac{1}{n}(=\frac{1}{\sum_{k=1}^n 1})$$</span>을 얻어냈다. (=1이 n개 있고 그 중 1개)<br/>
반면 가중 평균은 각 수를 1개로 취급하지 않고 각 수를 $$w_1, w_2, w_3, ..., w_n$$과 같이 1 보다 크거나 같은 개수로 보고 비율을 얻어낸다.
이것이 가중의 의미이다.<br/>
총 개수(<span>$$\sum_{k=1}^n w_k$$</span>)에서 각 수(<span>$$a_k$$</span>)가 차지하는 비율은
<span>$$\frac{w_k}{\sum_{k=1}^n w_k}$$</span> 이다. (=총 $$w_1+w_2+w_3+...+w_n$$개 있고 그 중 <span>$$w_k$$</span>개)
```

### 기타 방법들

* `overflow-x: auto;` 속성 제거
  * JS를 사용해서 MathJax가 로드된 이후 다시한번 JS를 작동시켜 해당 속성을 제거하고 렌더링 시켜야하므로 패스
* `<p>` 태그에 `padding-bottom: 0.2em;` 정도 넣어주기
  * 아주 작은 height overflow이므로 MathJax를 포함하고 있는 부모 태그(`<p>`)에 padding을 줘서 높이를 조금만 늘리면 되지만,
    내 블로그 내 모든 포스트의 `<p>` 스타일에 영향을 주므로 보류.

<div class="md-reference" markdown=1>
* <https://stackoverflow.com/a/11093303/18542564>
</div>
