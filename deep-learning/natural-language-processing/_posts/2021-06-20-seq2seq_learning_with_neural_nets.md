---
layout: single
title: "논문 해석 - Sequence to Sequence Learning with Neural Networks"
date: "2021-06-20 11:34:00 +0900"
last_modified_at: "2021-06-20 11:34:00 +0900"
---
본 포스트는 논문 Sequence to Sequence Learning with Neural Networks를 한국어로 번역하고
필요한 경우 이해를 돕기 위해 보충 설명하는 포스트이다.

<div class="notice--warning" markdown="1">
본 포스트는 개인적인 이해를 위해 작성되었습니다.<br/>
잘못된 해석이 있을 수 있습니다.
</div>

{% include pages/paper_revision_description.html %}

# Authors

<table>
<tr style="text-align: center;">
<td><strong>Ilya Sutskever</strong><br/>Google<br/>ilyasu@google.com</td>
<td><strong>Oriol Vinyals</strong><br/>Google<br/>vinyals@google.com</td>
<td><strong>Quoc V. Le</strong><br/>Google<br/>qvl@google.com</td>
</tr>
</table>

# Abstract

<div class="md-paper-origin" markdown="1">
Deep Neural Networks (DNNs) are powerful models that have achieved excellent performance on difficult learning tasks.<br/>
Although DNNs work well whenever large labeled training sets are available, they cannot be used to map sequences to sequences.<br/>
In this paper, we present a general end-to-end approach to sequence learning that makes minimal assumptions on the sequence structure.<br/>
Our method uses a multilayered Long Short-Term Memory (LSTM) to map the input sequence to a vector of a fixed dimensionality, and then another deep LSTM to decode the target sequence from the vector.<br/>
</div>
<div class="md-paper-translated" markdown="1">
Deep neural Networks (DNNs)는 어려운 학습 문제를 뛰어난 성능으로 달성해내는 powerful model 이다.<br/>
DNNs는 큰 규모의 label이 달린 training set이 사용 가능할 때 잘 작동하는데
sequence 를 sequence 와 연결하기 위해서는 사용될 수 없다.<br/>
이 논문에서, 우리는 sequence 구조에 대한 최소한의 가정으로 sequence learning에 대한 일반적인 end-to-end 접근을 제시한다.<br/>
우리의 방법은 input sequence를 고정된 차원수의 벡터로 매핑하기 위해 다중 LSTM을 사용하고
그다음 target sequence를 벡터로부터 뽑아내기 위해 다른 deep LSTM을 사용한다.
</div>

<div class="md-paper-origin" markdown="1">
Our main result is that on an English to French translation task from the WMT-14 dataset, the translations produced by the LSTM achieve a BLEU score of 34.8 on the entire test set, where the LSTM’s BLEU score was penalized on out-of-vocabulary words.<br/>
Additionally, the LSTM did not have difficulty on long sentences.<br/>
For comparison, a phrase-based SMT system achieves a BLEU score of 33.3 on the same dataset.<br/>
When we used the LSTM to rerank the 1000 hypotheses produced by the aforementioned SMT system, its BLEU score increases to 36.5, which is close to the previous state of the art.
</div>
<div class="md-paper-translated" markdown="1">
우리의 주요 결과는 WMT-14 dataset을 이용한 LSTM 기반 English -> French 번역이 어휘목록 외 단어에서는 페널티가 있는데,
전체 테스트 셋에서 BLEU score 34.8를 달성했다는 것이다.<br/>
추가로, LSTM은 긴 문장도 어렵지 않게 해냈다.<br/>
비교해 보면, 구문 기반 SMT[^SMT] 시스템은 같은 dataset에서 BLEU score 33.3을 기록했다.<br/>
이 SMT 시스템에 의해 생성된 1000개의 가설을 LSTM으로 재순위매김 했을 때, BLEU score는 36.5로 증가하는데
이것은 종래에 다른 곳에서 달성한 최고 점수에 근접하다.
</div>

<div class="md-paper-origin" markdown="1">
The LSTM also learned sensible phrase and sentence representations that are sensitive to word order and are relatively invariant to the active and the passive voice.<br/>
Finally, we found that reversing the order of the words in all source sentences (but not target sentences) improved the LSTM’s performance markedly, because doing so introduced many short term dependencies between the source and the target sentence which made the optimization problem easier.
</div>
<div class="md-paper-translated" markdown="1">
LSTM은 또한 어순에 민감하고 능동 수동에 따라 상대적으로 변하지 않는 합리적인(?) 구문과 문단 표현을 학습했다.<br/>
마지막으로, 우리는 모든 (target sentenses가 아닌)source sentences를 역순으로 뒤집는 것이 LSTM의 성능을
눈에 띄게 향상시킨다는 것을 발견했는데
그 이유는 역순으로 뒤집는 것이 문장 내 많은 단기 의존성을 source와 target sentence 사이에 도입해서
최적화 문제를 쉽게 만들어 줬기 때문이었다.

<div class="md-paper-interpreted" markdown="1">
* 자체 해석
  * source sentences: English 문장들
  * target sentences: French 문장들
  * 최적화 문제를 쉽게: 모델 학습이 잘되게
</div>
</div>

# 1 Introduction

<div class="md-paper-origin" markdown="1">
Deep Neural Networks (DNNs) are extremely powerful machine learning models that achieve excellent performance on difficult problems such as speech recognition [13, 7] and visual object recognition [19, 6, 21, 20].<br/>
DNNs are powerful because they can perform arbitrary parallel computation for a modest number of steps.<br/>
A surprising example of the power of DNNs is their ability to sort N N-bit numbers using only 2 hidden layers of quadratic size [27].<br/>
So, while neural networks are related to conventional statistical models, they learn an intricate computation.<br/>
Furthermore, large DNNs can be trained with supervised backpropagation whenever the labeled training set has enough information to specify the network’s parameters.<br/>
Thus, if there exists a parameter setting of a large DNN that achieves good results (for example, because humans can solve the task very rapidly), supervised backpropagation will find these parameters and solve the problem.
</div>
<div class="md-paper-translated" markdown="1">
Deep Neural Networks (DNNs)는 speech recognition[13, 7]과 visual object recognition [19, 6, 21, 20]과 같은 어려운 문제에서
excellent 퍼포먼스를 달성하는 아주 강력한 Machine Learning Model 이다.<br/>
DNNs는 적당한 수의 단계에 대해 임의의 병렬 계산을 수행 할 수 있으므로 powerful 하다.
<span class="md-paper-interpreted">이게 무슨말일까..? 높은 차원의 벡터로 만든 깊은 다층 구조를 의미한 걸까..?</span><br/>
DNNs의 강력함에 관한 놀라운 사례는 오직 2차원(?)의 hidden layer 2개만 가지고 N개의 N-bit 숫자를 정렬하는 능력이다.[27]<br/>
<div class="md-paper-interpreted" markdown="1">
quadratic size의 hidden layer의 의미를 잘 모르겠는데.. 관련 논문 보면 알겠지만 크게 중요하진 않으므로 그냥 넘어간다.<br/>
대충, 2차원 plane 형태의 vector 2층을 쌓아 만든 DNN(이정도면 그냥.. Shallow NN)은 2-Bit 숫자(0~3) 중 2개,
3-Bit 숫자(0~7) 중 3개, 8-Bit 숫자(0~255)중 8개를 정렬할 수 있는 능력이 있다는 말 같다.
</div>
그래서, 신경망은 기존의 통계 모델들과 관련있으면서도 <span class="md-paper-interpreted">더</span> 복잡한 계산을 학습한다.<br/>
게다가, 거대한 DNN들은 labeled 된 training set이 network가 parameter들을 지정할 수 있을 만큼 충분한 정보를 가졌을 때마다
지도학습 방식의 역전파법으로 학습될 수 있다.<br/>
그러므로, 만약 거대 DNN이 좋은 결과를 낼 수 있는 paremeter 값이 존재한다면 (예를 들어, 인간은 어떤 문제를 매우 빠르게 풀 수 있기 때문에),
지도 학습 방식의 역전파는 이런 paremeter 들을 찾아낼 것이고 문제를 풀 수 있을 것이다.<br/>
<div class="md-paper-interpreted">
문제를 풀 수 있는 parameter가 존재하는 거대 DNN 이라면 인간이 빠르게 풀 수 있는 문제에 대해서 거대 DNN 역시 할 수 있다는 말인가..
</div>
</div>

<div class="md-paper-origin" markdown="1">
Despite their flexibility and power, DNNs can only be applied to problems whose inputs and targets can be sensibly encoded with vectors of fixed dimensionality.<br/>
It is a significant limitation, since many important problems are best expressed with sequences whose lengths are not known a-priori.<br/>
For example, speech recognition and machine translation are sequential problems.<br/>
Likewise, question answering can also be seen as mapping a sequence of words representing the question to a 1 sequence of words representing the answer.<br/>
It is therefore clear that a domain-independent method that learns to map sequences to sequences would be useful.
</div>
<div class="md-paper-translated" markdown="1">
DNN 들의 유연성과 강력함에도 불구하고 DNN 들은 오직 input들과 target들이 고정 차원수의 벡터들로 올바로 encode된 문제에만 적용될 수 있다.<br/>
많은 중요한 문제들이 사전에 알려지지 않는 길이의 sequence 들로 가장 잘 표현되기 때문에 이러한 점은 큰 한계점이다.
예를 들어, speech recognition과 machine trainslation은 sequential 문제들이다.<br/>
이와 같이, 질의응답은 질문을 표현하는 단어들의 sequence 1개를 정답을 표현하는 단어들의 squence 1개에 mapping 하는 것으로 보여질 수 있다.
그러므로 sequence들을 sequence들로 map 하는 것을 학습하는 영역-독립적인 method가 유용할 것임은 분명하다.
<div class="md-paper-interpreted" markdown="1">
본문의 영역-독립적인 method란 정해진 boundary에서 작동하는 method란 말 같다.<br/>
즉, 학습에 사용된 sequence들로 구성된 dataset만을 가지고 작동하는 QA Model 정도를 의미 한다고 보면 될듯하다.
따라서 완성된 영역-독립적 Model은 dataset에 없는 sequence는 생성할 수 없다.<br/>
어쩌면 학습에 사용된 적은 없으나 학습된 sequece들과 뭔가 비슷한 형태나 패턴이라면 생성할 수 있음을 포함하는 말일 수도 있다.
</div>
</div>

<div class="md-paper-origin" markdown="1">
Sequences pose a challenge for DNNs because they require that the dimensionality of the inputs and outputs is known and fixed.<br/>
In this paper, we show that a straightforward application of the Long Short-Term Memory (LSTM) architecture [16] can solve general sequence to sequence problems.<br/>
The idea is to use one LSTM to read the input sequence, one timestep at a time, to obtain large fixeddimensional vector representation, and then to use another LSTM to extract the output sequence from that vector (fig. 1).<br/>
The second LSTM is essentially a recurrent neural network language model [28, 23, 30] except that it is conditioned on the input sequence.<br/>
The LSTM’s ability to successfully learn on data with long range temporal dependencies makes it a natural choice for this application due to the considerable time lag between the inputs and their corresponding outputs (fig. 1).
</div>
<div class="md-paper-translated" markdown="1">
DNN의 input들과 output들은 사전에 알려진 고정된 차원수여야만 하기 때문에 DNN으로 Sequence를 처리하는 것은 도전적인 문제이다.
<span class="md-monologue">굉장한 의역..! ㅋㅎ;</span><br/>
이 논문에서, 우리는 장단기메모리(LSTM) 구조의 복잡하지 않은 `application`이 일반적인 sequence to seuence 연결 문제를 풀 수 있음을 보인다.<br/>
논문의 아이디어는 1개의 LSTM을 사용해서 한번에 한 timestep 씩 input sequence를 읽어서 거대한 고정 차원수의 vector representation을 얻고
그다음 또다른 LSTM을 사용해서 얻은 vector representation으로부터 output sequence를 추출하는 것이다. (fig. 1)<br/>
두번째 LSTM은 input sequence에 따라 달라진다는 것만 제외하고 기본적으로 recurrent neural network language model [28, 23, 30] 이다.<br/>
장기적인 시간 의존성을 가진 data를 성공적으로 학습하는 LSTM의 능력은 input들과 그에 대응하는 output들 사이에 상당한 시간차 때문에 LSTM을 이 `application`을 위한 당연한 선택으로 만든다.
</div>

<div class="md-paper-origin" markdown="1">
There have been a number of related attempts to address the general sequence to sequence learning problem with neural networks.<br/>
Our approach is closely related to Kalchbrenner and Blunsom [18] who were the first to map the entire input sentence to vector, and is related to Cho et al. [5] although the latter was used only for rescoring hypotheses produced by a phrase-based system.<br/>
Graves [10] introduced a novel differentiable attention mechanism that allows neural networks to focus on different parts of their input, and an elegant variant of this idea was successfully applied to machine translation by Bahdanau et al. [2].<br/>
The Connectionist Sequence Classification is another popular technique for mapping sequences to sequences with neural networks, but it assumes a monotonic alignment between the inputs and the outputs [11].
</div>
<div class="md-paper-translated" markdown="1">
그동안 일반적인 sequence to sequence 문제를 neural networks를 이용해서 다루려는 수많은 관련 시도들이 있어왔다.<br/>
우리의 접근 방법은 처음으로 전체 input 문장을 vector로 매핑한 Kalchbrenner and Blunsom [18]의 방법과 매우 관련됐으며 비록 오직 구절 기반 시스템에 의해 생성된 가설을 rescoring(<span class="md-paper-interpreted" markdown="1">re-scoring 이므로 그전에 scoring이 먼저 이루어졌었다는 의미 같은데, 자세한 사항은 Cho et al. [5]를 봐야 알듯하다.</span>) 하는 데에만 사용되었지만 Cho et al. [5]의 방법과도 관련이 있다.<br/>
Graves [10] 논문은 neural networks가 input의 특정 부분에 집중할 수 있게 하는 참신한 differentiable attention mechanism을 소개했고<span class="md-paper-interpreted" markdown="1">(differentiable이 `미분가능한`인지 `구분가능한`인지 모르겠음</span>) 그 아이디어는 우아하게 변형되어 Bahdanau et al. [2]에서 기계 번역 분야에 성공적으로 적용되었다.<br/>
연결주의 sequence classification은 neural networks를 이용해서 sequence와 sequence를 연결하는 또하나의 유명한 기술이다. 그러나 이 기술은 input과 output 간에 단조로운 정렬을 가정한다 [11].
</div>

![Figure 1. Our model]({{ site.gdrive_url_prefix }}1cuoZQXYLpsKSUzBgzYCuBtbMlEemk12p)
{:style="margin-bottom: 0;" class="img-popup" data-title="Figure 1: Our model reads an input sentence “ABC” and produces “WXYZ” as the output sentence. The model stops making predictions after outputting the end-of-sentence token. Note that the LSTM reads the input sentence in reverse, because doing so introduces many short term dependencies in the data that make the optimization problem much easier."}
<div style="font-size: .75em;" markdown="1">
<div class="md-paper-origin" markdown="1">
Figure 1: Our model reads an input sentence “ABC” and produces “WXYZ” as the output sentence. The model stops making predictions after outputting the end-of-sentence token. Note that the LSTM reads the input sentence in reverse, because doing so introduces many short term dependencies in the data that make the optimization problem much easier.
</div>
<div class="md-paper-translated" markdown="1">
우리의 model은 input sequence "ABC"를 읽고 output으로 "WXYZ"를 생성한다. model이 end-of-sentence 토큰을 출력하면 예측을 종료한다.<br/>
LSTM은 input sentence를 거꾸로 읽는다. 그렇게 함으로써 데이터에 많은 단기 의존성을 도입하여 최적화 문제를 훨씬 더 쉽게 만들어준다.
</div>
</div>

<div class="md-paper-origin" markdown="1">
The main result of this work is the following. On the WMT’14 English to French translation task, we obtained a BLEU score of 34.81 by directly extracting translations from an ensemble of 5 deep LSTMs (with 384M parameters and 8,000 dimensional state each) using a simple left-to-right beamsearch decoder.<br/>
This is by far the best result achieved by direct translation with large neural networks. For comparison, the BLEU score of an SMT baseline on this dataset is 33.30 [29].<br/>
The 34.81 BLEU score was achieved by an LSTM with a vocabulary of 80k words, so the score was penalized whenever the reference translation contained a word not covered by these 80k.<br/>
This result shows that a relatively unoptimized small-vocabulary neural network architecture which has much room for improvement outperforms a phrase-based SMT system.
</div>
<div class="md-paper-translated" markdown="1">
이 문서의 work의 주요 결과는 아래와 같다. 2014 WMT의 English to French 번역 작업에서 우리는 왼쪽에서 오른쪽으로
빔탐색을 수행하는 decoder를 이용한 5개의 LSTM들의 앙상블(3억8천4백만개의 parameter들과 8000 차원의 state)로부터
번역문을 직역해서 BLEU score 34.81점을 얻었다.<br/>
이 점수는 큰 규모의 neural networks를 이용한 직역에서 달성한 최고의 결과이다.
비교를 들자면, 이 데이터셋의 SMT 기반 모델의 BLEU 점수는 33.30 이다 [29].<br/>
BLEU score 34.81은 8만개 단어의 어휘록을 사용한 LSTM 모델로 달성했다. 따라서 참조 번역(<span class="md-paper-interpreted">앞뒤 문맥을 고려하는 번역인가..</span>)에 이 8만개 단어 외의 단어가 포함될 때마다 점수는 패널티를 받는다. <span class="md-monologue">점수가 하락한다는 말인가..</span><br/>
이러한 결과는 구(phrase)-기반의 SMT 시스템 보다 성능 향상의 여지가 비교적 더 많은 최적화 되지않은 작은 규모의 어휘에 대한 neural network 구조가 더 뛰어난 성능을 발휘한다는 점을 보여준다.
</div>

<div class="md-paper-origin" markdown="1">
Finally, we used the LSTM to rescore the publicly available 1000-best lists of the SMT baseline on the same task [29].<br/>
By doing so, we obtained a BLEU score of 36.5, which improves the baseline by 3.2 BLEU points and is close to the previous best published result on this task (which is 37.0 [9]).
</div>
<div class="md-paper-translated" markdown="1">
마지막으로, 우리는 같은 2014 WMT English to French 번역 작업에 대해 오픈 돼있는
SMT 기반의 1000개 best 모델을 재채점 하기 위해 LSTM을 사용했다.<br/>
그렇게 함으로써 우리는 BLEU 점수 36.5점을 얻었는데 이것은 BLEU 점수를 3.2점까지 향상 시킨 것이고 이 번역 작업의 이전에 발표된 최상의 결과에 가까운 것이다 (최고점 37.0 [9]).
</div>

<div class="md-paper-origin" markdown="1">
Surprisingly, the LSTM did not suffer on very long sentences, despite the recent experience of other researchers with related architectures [26].<br/>
We were able to do well on long sentences because we reversed the order of words in the source sentence but not the target sentences in the training and test set.<br/>
By doing so, we introduced many short term dependencies that made the optimization problem much simpler (see sec. 2 and 3.3). As a result, SGD could learn LSTMs that had no trouble with long sentences.<br/>
The simple trick of reversing the words in the source sentence is one of the key technical contributions of this work.
</div>
<div class="md-paper-translated" markdown="1">
놀랍게도, LSTM은 최근의 다른 연구자들의 LSTM과 관련된 구조에 대한 연구에서 경험한 한계에도 불구하고 아주 긴 문장에도 어려움을 겪지 않았다.<span class="md-monologue">의역!</span><br/>
training set, test set에서 source 문장에 있는 단어는 역순으로, target 문장에서는 순차로 배치했기 때문에 긴 문장에서도 잘 작동할 수 있었던 것이다.<br/>
그렇게 하는 것으로, 우리는 최적화 문제를 더욱 더 쉽게 만드는 많은 단기 의존성들을 도입시켰다 (섹션 2와 3.3을 참조). 그 결과로, 긴 문장에서도 문제가 없는 LSTM들을 SGD 방법으로 학습시킬 수 있었다.<br/>
source sentence에서 단어를 역순으로 바꾸는 간단한 트릭은 이 논문의 주요한 기술적 기여 중의 하나이다.
</div>

<div class="md-paper-origin" markdown="1">
A useful property of the LSTM is that it learns to map an input sentence of variable length into a fixed-dimensional vector representation.<br/>
Given that translations tend to be paraphrases of the source sentences, the translation objective encourages the LSTM to find sentence representations that capture their meaning, as sentences with similar meanings are close to each other while different 2 sentences meanings will be far.<br/>
A qualitative evaluation supports this claim, showing that our model is aware of word order and is fairly invariant to the active and passive voice.
</div>
<div class="md-paper-translated" markdown="1">
LSTM의 유용한 특징은 다양한 길이를 가진 input sentence를 항상 고정된 차원수의 vector 표현으로 매핑하는 법을 학습한다는 것이다.<br/>
번역은 source sentence들을 의역하는 경향이 있다는 점을 고려하면(<span class="md-paper-interpreted" markdown="1">=번역은 문장을 그대로 직역하기 보다 원문이 말하고자 하는 바를 번역문에 오해 없이 담으려고 하는 경향이 있다는 점을 고려하면</span>), LSTM 또한 번역을 하면서 다른 의미의 두 문장은 서로 멀고 의미가 유사한 문장들은 서로 가까울수 있게끔 문장의 의미를 담아낼 수 있는 어떤 표현(<span class="md-paper-interpreted" markdown="1">주로 vector를 뜻함</span>)을 찾는다.<span class="md-monologue" markdown="1">의역이 맞는지 모르겠다.</span><br/>
질적 평가에서는 우리의 model이 단어 어순을 이해하고 있고 능동, 수동태에 대해서도 상당히 불변의 결과를 내놓는다는 것을 보여준다.
</div>

# 2 The model

<div class="md-paper-origin" markdown="1">
The Recurrent Neural Network (RNN) [31, 28] is a natural generalization of feedforward neural networks to sequences.<br/>
Given a sequence of inputs ($$x_1$$, ..., $$x_T$$), a standard RNN computes a sequence of outputs ($$y_1$$, ..., $$y_T$$) by iterating the following equation:<br/>
</div>
<div class="md-paper-translated" markdown="1">
Recurrent Neural Network (RNN) [31, 28] 은 sequence들에 대한 feedforward neural networks의 자연스런 일반화이다.<br/>
inputs sequence ($$x_1$$, ..., $$x_T$$)가 주어질때, 표준 RNN은 다음의 방정식을 반복하면서 output sequence ($$y_1$$, ..., $$y_T$$)을 계산해낸다:

$$h_t = sigm(\mathit{W}^{hx}x_t+\mathit{W}^{hh}h_{t-1})$$<br/>
$$y_t = \mathit{W}^{yh}h_t$$

<div class="md-paper-origin" markdown="1">
The RNN can easily map sequences to sequences whenever the alignment between the inputs the outputs is known ahead of time.<br/>
However, it is not clear how to apply an RNN to problems whose input and the output sequences have different lengths with complicated and non-monotonic relationships.
</div>
<div class="md-paper-translated" markdown="1">
RNN은 input과 output 사이 정렬이 미리 알려질 때마다 sequence들을 sequence들로 쉽게 매핑 할 수 있다.<br/>
그러나, RNN을 input과 output sequence들이 복잡하고 비단조적[^non-monotonic]인 관계 하에 서로 다른 길이를 가진 경우의 문제들에 어떻게 적용하지는 불분명하다.
</div>

<div class="md-paper-origin" markdown="1">
The simplest strategy for general sequence learning is to map the input sequence to a fixed-sized vector using one RNN, and then to map the vector to the target sequence with another RNN (this approach has also been taken by Cho et al. [5]).<br/>
While it could work in principle since the RNN is provided with all the relevant information, it would be difficult to train the RNNs due to the resulting long term dependencies (figure 1) [14, 4, 16, 15].<br/>
However, the Long Short-Term Memory (LSTM) [16] is known to learn problems with long range temporal dependencies, so an LSTM may succeed in this setting.
</div>
<div class="md-paper-translated" markdown="1">
일반적인 sequence 학습을 위한 가장 단순한 전략은 1개 RNN을 사용하여 input sequence를 고정 사이즈의 vector로 매핑한 다음, 그 vector를 또다른 RNN을 이용해서 target sequence로 매핑하는 것이다(이런 접근법은 Cho et al. [5]에서도 사용됨).<br/>
이런 전략은 모든 관련 정보가 RNN에 제공되기 때문에 이론적으로는 올바로 작동하지만, 장기 의존성 때문에 (figure 1) [14, 4, 16, 15] RNN을 학습하는 것이 어려울 수 있다.<br/>
그러나 the Long Short-Term Memory (LSTM 장단기메모리) [16]는 장기적 의존성 문제 또한 학습할 수 있다고 알려져있다. 따라서 LSTM은 이러한 전략을 성공적으로 수행할 수 있을 것이다.
</div>

<!--
<div class="md-paper-origin" markdown="1">
</div>
<div class="md-paper-translated" markdown="1">
</div>
-->

# References
[1] M. Auli, M. Galley, C. Quirk, and G. Zweig. Joint language and translation modeling with recurrent neural networks. In EMNLP, 2013.<br/>
[2] D. Bahdanau, K. Cho, and Y. Bengio. Neural machine translation by jointly learning to align and translate. arXiv preprint arXiv:1409.0473, 2014.<br/>
[3] Y. Bengio, R. Ducharme, P. Vincent, and C. Jauvin. A neural probabilistic language model. In Journal of Machine Learning Research, pages 1137–1155, 2003.<br/>
[4] Y. Bengio, P. Simard, and P. Frasconi. Learning long-term dependencies with gradient descent is difficult. IEEE Transactions on Neural Networks, 5(2):157–166, 1994.<br/>
[5] K. Cho, B. Merrienboer, C. Gulcehre, F. Bougares, H. Schwenk, and Y. Bengio. Learning phrase representations using RNN encoder-decoder for statistical machine translation. In Arxiv preprint arXiv:1406.1078, 2014.<br/>
[6] D. Ciresan, U. Meier, and J. Schmidhuber. Multi-column deep neural networks for image classification. In CVPR, 2012.<br/>
[7] G. E. Dahl, D. Yu, L. Deng, and A. Acero. Context-dependent pre-trained deep neural networks for large vocabulary speech recognition. IEEE Transactions on Audio, Speech, and Language Processing - Special Issue on Deep Learning for Speech and Language Processing, 2012.<br/>
[8] J. Devlin, R. Zbib, Z. Huang, T. Lamar, R. Schwartz, and J. Makhoul. Fast and robust neural network joint models for statistical machine translation. In ACL, 2014.<br/>
[9] Nadir Durrani, Barry Haddow, Philipp Koehn, and Kenneth Heafield. Edinburgh’s phrase-based machine translation systems for wmt-14. In WMT, 2014.<br/>
[10] A. Graves. Generating sequences with recurrent neural networks. In Arxiv preprint arXiv:1308.0850, 2013.<br/>
[11] A. Graves, S. Fernandez, F. Gomez, and J. Schmidhuber. Connectionist temporal class ´ ification: labelling unsegmented sequence data with recurrent neural networks. In ICML, 2006.<br/>
[12] K. M. Hermann and P. Blunsom. Multilingual distributed representations without word alignment. In ICLR, 2014.<br/>
[13] G. Hinton, L. Deng, D. Yu, G. Dahl, A. Mohamed, N. Jaitly, A. Senior, V. Vanhoucke, P. Nguyen, T. Sainath, and B. Kingsbury. Deep neural networks for acoustic modeling in speech recognition. IEEE Signal Processing Magazine, 2012.<br/>
[14] S. Hochreiter. Untersuchungen zu dynamischen neuronalen netzen. Master’s thesis, Institut fur Informatik, Technische Universitat, Munchen, 1991.<br/>
[15] S. Hochreiter, Y. Bengio, P. Frasconi, and J. Schmidhuber. Gradient flow in recurrent nets: the difficulty of learning long-term dependencies, 2001.<br/>
[16] S. Hochreiter and J. Schmidhuber. Long short-term memory. Neural Computation, 1997.<br/>
[17] S. Hochreiter and J. Schmidhuber. LSTM can solve hard long time lag problems. 1997.<br/>
[18] N. Kalchbrenner and P. Blunsom. Recurrent continuous translation models. In EMNLP, 2013.<br/>
[19] A. Krizhevsky, I. Sutskever, and G. E. Hinton. ImageNet classification with deep convolutional neural networks. In NIPS, 2012.<br/>
[20] Q.V. Le, M.A. Ranzato, R. Monga, M. Devin, K. Chen, G.S. Corrado, J. Dean, and A.Y. Ng. Building high-level features using large scale unsupervised learning. In ICML, 2012.<br/>
[21] Y. LeCun, L. Bottou, Y. Bengio, and P. Haffner. Gradient-based learning applied to document recognition. Proceedings of the IEEE, 1998.<br/>
[22] T. Mikolov. Statistical Language Models based on Neural Networks. PhD thesis, Brno University of Technology, 2012.<br/>
[23] T. Mikolov, M. Karafiat, L. Burget, J. Cernock ´ y, and S. Khudanpur. Recurrent neural network based `language model. In INTERSPEECH, pages 1045–1048, 2010.<br/>
[24] K. Papineni, S. Roukos, T. Ward, and W. J. Zhu. BLEU: a method for automatic evaluation of machine translation. In ACL, 2002.<br/>
[25] R. Pascanu, T. Mikolov, and Y. Bengio. On the difficulty of training recurrent neural networks. arXiv preprint arXiv:1211.5063, 2012.<br/>
[26] J. Pouget-Abadie, D. Bahdanau, B. van Merrienboer, K. Cho, and Y. Bengio. Overcoming the curse of sentence length for neural machine translation using automatic segmentation. arXiv preprint arXiv:1409.1257, 2014.<br/>
[27] A. Razborov. On small depth threshold circuits. In Proc. 3rd Scandinavian Workshop on Algorithm Theory, 1992.<br/>
[28] D. Rumelhart, G. E. Hinton, and R. J. Williams. Learning representations by back-propagating errors. Nature, 323(6088):533–536, 1986.<br/>
[29] H. Schwenk. University le mans. http://www-lium.univ-lemans.fr/˜schwenk/cslm_joint_paper/, 2014. [Online; accessed 03-September-2014].<br/>
[30] M. Sundermeyer, R. Schluter, and H. Ney. LSTM neural networks for language modeling. In INTERSPEECH, 2010.<br/>
[31] P. Werbos. Backpropagation through time: what it does and how to do it. Proceedings of IEEE, 1990.


<div class="md-reference" markdown="1">
* <https://arxiv.org/abs/1409.3215>
</div>

[^SMT]: SMT: Statistical Machine Translation
[^non-monotonic]: 추론의 특성을 나타내는 말. 일반적으로 삼단논법(A이면 B이다. B이면 C이다. 따라서 A이면 C이다.) 처럼 사실이 주어지면 그에 따라 새로운 정리가 도출되고 또 이 도출된 정리로 인해 다른 정리 또는 사실이 나타내는 것을 '단조(Monotonic)하다'라고 한다. 이처럼 단조적인 경우 어 '참'인 공리가 줄어들지 않는데 반해, 비단조(Non-Monotonic)는 연역적이지 않음을 의미하며 이미 밝혀진 사실이나 새로운 정리가 더이상 효력이 없을 수 있음을 뜻한다. '새는 날 수 있다'라는 정리에서 죽은 새는 날 수 없으므로 '만약(What if) 죽은 새가 아니라면 새는 날 수 있다' 와 같은 추론이 비단조적 추론이 된다. Ref. <http://www.aistudy.co.kr/expert/inference_lee.htm#_bookmark_1d3dab8>, <http://www.aistudy.co.kr/reasoning/nonmonotonic_reasoning.htm>
