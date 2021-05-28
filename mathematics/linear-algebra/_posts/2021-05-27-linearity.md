---
layout: single
title: "선형성(Linearity)과 대수학(Algebra)"
date: "2021-05-27 17:19:00 +0900"
last_modified_at: "2021-05-28 14:54:00 +0900"
---
선형대수학(Linear Algebra)은 선형성(Linearity)과 대수학(Algebra)의 결합 학문이다.
이 포스트에서는 각각에 대한 간단한 정의를 살펴보고 선형대수학에 대한 직관을 얻는다.

<div class="notice--warning" markdown="1">
#### 주의
{:.no_toc}
개인적인 견해가 담긴 글이며 부정확 할 수 있음.
</div>

## 선형성(Linearity)

선형성은 수학 분야에 따라 유사하지만 조금씩 다른 것으로 설명된다.<br/>
시각적으로 직선인 함수를 선형성이 있는 함수라 하기도 하고 1차 함수를 선형 함수라 부르기도 한다.
이 때문에 선형에 대한 진정한 의미가 모호할 때가 있다.

이때, 선형대수학에서는 아래 가정을 만족하는 함수 $$f$$를 선형성을 갖는 함수라고 정의한다.
* 가산성(Additivity)<br/>
  $$f(x+y)=f(x)+f(y)$$
* 동질성(Homogeneity)<br/>
  $$f(\alpha x)=\alpha f(x)$$ for scalar $$\alpha$$

즉, 어떤 함수가 선형성을 가지면 연산의 분해, 결합, 확장이 가능하므로 복잡한 변환(transformation)이나 중첩을
더 작거나 단순한 형태의 함수들로 쉽게 풀어낼 수 있다는 이야기이다.<br/>
이런 특성을 다른 말로 중첩의 원리(superposition principle)라고 한다.<br/>
또한 2차 이상의 고차 함수라도 위 정의를 만족한다면 해당 함수는 선형적이라고 한다.

엄밀한 의미의 선형성은 선형대수학에서의 정의를 따르는 것이 올바르다.

이처럼 '선형성이란 무엇이다.'라고 말하긴 어렵지만 선형 함수 정의를 통해 선형성을 간접적으로 느낄 수 있다.

추가로, 해석기하학 및 관련 분야에서는 차수가 0 또는 1인 다항 함수를 선형적이라고 하는데
선형대수학에서는 그와같은 다항의 1차 함수는 선형성 정의를 만족하지 못하므로 선형적이지 않다고 한다.<br/>

예를들어 $$a>0, b>0$$일 때, 1차 함수 $$f(x)=ax+b$$는 직선이기도 하고 해석기하학에 따라 선형의(linear) 함수이다.

![Non Linear Function in Linear Algebra]({{ site.gdrive_url_prefix}}1FSxi-00fgGUUutJMNxbQX44_GHLpsjes)

그러나 이를 선형대수학의 선형성 정의에 대입해보면<br/>

* 가산성(Additivity)<br/>
  $$f(x_1+x_2)=a(x_1+x_2)+b=ax_1+ax_2+b$$ 이고<br/>
  $$f(x_1)+f(x_2)=ax_1+b+ax_2+b=ax_1+ax_2+2b$$ 이다.<br/>
  따라서 $$f(x_1+x_2)\neq f(x_1)+f(x_2)$$ 이므로 가산성을 만족하지 않는다.
* 동질성(Homogeneity)<br/>
  scalar $$\alpha$$에 대해<br/>
  $$f(\alpha x)=a(\alpha x) + b=a\alpha x + b$$ 이고<br/>
  $$\alpha f(x)=\alpha(ax+b)=a\alpha x+\alpha b$$ 이다.<br/>
  따라서 $$f(\alpha x)\neq \alpha f(x)$$ 이므로 동질성을 만족하지 않는다.

따라서 선형대수적으로 절편($$b$$)이 있는 1차 함수는 선형적이지 않다.(어떤 함수는 미적분하여 선형성을 갖기도 한다.)<br/>
이때 $$b=0$$ 조건을 추가하면 이 함수는 선형 함수가 된다. 즉, 원점을 지나는 1차 함수 $$f(x)=ax$$는 선형 함수라고 할 수 있다.

![Linear Function passing through the origin in Linear Algebra]({{ site.gdrive_url_prefix }}1cW0G4PWUREMX-T5fzh4CqL_3YCHDduM3)

## 대수학(Algebra)

대수학(代數學)이란 숫자 대신 문자, 그림 등으로 어떤 명제, 수학적 구조들의 성질에 대해 연구하는 학문이다.

## 선형대수학(Linear Algebra)

주로 벡터 공간에서 벡터, 행렬, 연립방정식으로 표현되는 수학적 구조를 선형성을 바탕으로 연구하는 학문이다.<br/>
따라서 [선형성](#선형성linearity) 섹션의 선형대수학 선형성 정의를 벡터 공간의 벡터 $$\mathbf{x}$$, $$\mathbf{y}$$에 대해 적용한다.

선형대수학의 정리들을 이용하면 복잡한 행렬 연산, 변환 등을 단순한 형태로 변환해서 연산 효율을 높일 수 있다.
그리고 선형대수학의 이러한 이점은 Massive한 연산이 요구되는 딥러닝 분야에서 빛을 발한다.

<div class="md-reference" markdown=1>
* <https://en.wikipedia.org/wiki/Linearity#:~:text=Linearity%20is%20the%20property%20of,is%20closely%20related%20to%20proportionality.>
* <https://en.wikipedia.org/wiki/Linear_function#:~:text=In%20calculus%20and%20related%20areas,affine%20function%20is%20often%20used.>
* <https://en.wikipedia.org/wiki/Superposition_principle>
* <https://ko.wikipedia.org/wiki/%EC%84%A0%ED%98%95%EC%84%B1>
* <https://ko.wikipedia.org/wiki/%EB%8C%80%EC%88%98%ED%95%99>
* <https://ko.wikipedia.org/wiki/%EC%84%A0%ED%98%95%EB%8C%80%EC%88%98%ED%95%99>
* <https://darkpgmr.tistory.com/103>
* <https://m.blog.naver.com/PostView.naver?blogId=gosunwoo97&logNo=221074463296&proxyReferer=https:%2F%2Fwww.google.com%2F>
* <https://sdolnote.tistory.com/entry/Linearity>
</div>
