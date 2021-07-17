---
layout: single
title: "논문 번역 및 해석 - Sequence to Sequence Learning with Neural Networks"
date: "2021-07-11 15:17:00 +0900"
last_modified_at: "2021-07-11 15:17:00 +0900"
post_mode: "paper-analysis"
---
본 포스트는 논문 Sequence to Sequence Learning with Neural Networks를 한국어로 번역하고
필요한 경우 이해를 돕기 위한 보충 설명을 붙이는 포스트이다.

<div class="notice--warning" markdown="1">
본 포스트는 개인적인 이해를 위해 작성되었습니다.<br/>
잘못된 해석이 있을 수 있습니다.
</div>

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
Likewise, question answering can also be seen as mapping a sequence of words representing the question to a sequence of words representing the answer.<br/>
It is therefore clear that a domain-independent method that learns to map sequences to sequences would be useful.
</div>
<div class="md-paper-translated" markdown="1">
DNN 들의 유연성과 강력함에도 불구하고 DNN 들은 오직 input들과 target들이 고정 차원수의 벡터들로 올바로 encode된 문제에만 적용될 수 있다.<br/>
많은 중요한 문제들이 사전에 알려지지 않는 길이의 sequence 들로 가장 잘 표현되기 때문에 이러한 점은 큰 한계점이다.
예를 들어, speech recognition과 machine trainslation은 sequential 문제들이다.<br/>
이와 같이, 질의응답은 질문을 표현하는 단어들의 sequence를 정답을 표현하는 단어들의 sequence에 mapping 하는 것으로 보여질 수 있다.
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
장기적인 시간 의존성을 가진 data를 성공적으로 학습하는 LSTM의 능력은 input들과 그에 대응하는 output들 사이에 상당한 시간차 때문에
LSTM을 이 `application`을 위한 당연한 선택으로 만든다.
</div>

<div class="md-paper-origin" markdown="1">
There have been a number of related attempts to address the general sequence to sequence learning problem with neural networks.<br/>
Our approach is closely related to Kalchbrenner and Blunsom [18] who were the first to map the entire input sentence to vector, and is related to Cho et al. [5] although the latter was used only for rescoring hypotheses produced by a phrase-based system.<br/>
Graves [10] introduced a novel differentiable attention mechanism that allows neural networks to focus on different parts of their input, and an elegant variant of this idea was successfully applied to machine translation by Bahdanau et al. [2].<br/>
The Connectionist Sequence Classification is another popular technique for mapping sequences to sequences with neural networks, but it assumes a monotonic alignment between the inputs and the outputs [11].
</div>
<div class="md-paper-translated" markdown="1">
그동안 일반적인 sequence to sequence 문제를 neural networks를 이용해서 다루려는 수많은 관련 시도들이 있어왔다.<br/>
우리의 접근 방법은 처음으로 전체 input 문장을 vector로 매핑한 Kalchbrenner and Blunsom [18]의 방법과 매우 관련됐으며
비록 오직 구절 기반 시스템에 의해 생성된 가설을 rescoring(<span class="md-paper-interpreted" markdown="1">re-scoring 이므로
그전에 scoring이 먼저 이루어졌었다는 의미 같은데, 자세한 사항은 Cho et al. [5]를 봐야 알듯하다.</span>) 하는 데에만 사용되었지만
Cho et al. [5]의 방법과도 관련이 있다.<br/>
Graves [10] 논문은 neural networks가 input의 특정 부분에 집중할 수 있게 하는 참신한 differentiable attention mechanism을 소개했고
<span class="md-paper-interpreted" markdown="1">(differentiable이 `미분가능한`인지 `구분가능한`인지 모르겠음</span>)
그 아이디어는 우아하게 변형되어 Bahdanau et al. [2]에서 기계 번역 분야에 성공적으로 적용되었다.<br/>
연결주의 sequence classification은 neural networks를 이용해서 sequence와 sequence를 연결하는 또하나의 유명한 기술이다.
그러나 이 기술은 input과 output 간에 단조로운 정렬을 가정한다 [11].
</div>

![Figure 1. Our model]({{ site.gdrive_url_prefix }}1cuoZQXYLpsKSUzBgzYCuBtbMlEemk12p){:style="max-height: 350px;" class="align-center"}
{:style="margin-bottom: 0;" class="img-popup" data-title="Figure 1: Our model reads an input sentence “ABC” and produces “WXYZ” as the output sentence. The model stops making predictions after outputting the end-of-sentence token. Note that the LSTM reads the input sentence in reverse, because doing so introduces many short term dependencies in the data that make the optimization problem much easier."}
{:id="figure-1"}

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
beam search[^beam-search] 수행하는 decoder를 이용한 5개의 LSTM들의 앙상블(3억8천4백만개의 parameter들과 8000 차원의 state)로부터
번역문을 직역해서 BLEU score 34.81점을 얻었다.<br/>
이 점수는 큰 규모의 neural networks를 이용한 직역에서 달성한 최고의 결과이다.
비교를 들자면, 이 데이터셋의 SMT 기반 모델의 BLEU 점수는 33.30 이다 [29].<br/>
BLEU score 34.81은 8만개 단어의 어휘록을 사용한 LSTM 모델로 달성했다. 따라서 참조 번역
(<span class="md-paper-interpreted">앞뒤 문맥을 고려하는 번역인가..</span>)에 이 8만개 단어 외의 단어가 포함될 때마다 점수는
패널티를 받는다. <span class="md-monologue">점수가 하락한다는 말인가..</span><br/>
이러한 결과는 구(phrase)-기반의 SMT 시스템 보다 성능 향상의 여지가 비교적 더 많은 최적화 되지않은 작은 규모의 어휘에 대한
neural network 구조가 더 뛰어난 성능을 발휘한다는 점을 보여준다.
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
놀랍게도, LSTM은 최근의 다른 연구자들의 LSTM과 관련된 구조에 대한 연구에서 경험한 한계에도 불구하고 아주 긴 문장에도 어려움을 겪지 않았다.
<span class="md-monologue">의역!</span><br/>
training set, test set에서 source 문장에 있는 단어는 역순으로, target 문장에서는 순차로 배치했기 때문에 긴 문장에서도 잘 작동할 수 있었던 것이다.<br/>
그렇게 하는 것으로, 우리는 최적화 문제를 더욱 더 쉽게 만드는 많은 단기 의존성들을 도입시켰다 (섹션 2와 3.3을 참조).
그 결과로, 긴 문장에서도 문제가 없는 LSTM들을 SGD 방법으로 학습시킬 수 있었다.<br/>
source sentence에서 단어를 역순으로 바꾸는 간단한 트릭은 이 논문의 주요한 기술적 기여 중의 하나이다.
</div>

<div class="md-paper-origin" markdown="1">
A useful property of the LSTM is that it learns to map an input sentence of variable length into a fixed-dimensional vector representation.<br/>
Given that translations tend to be paraphrases of the source sentences, the translation objective encourages the LSTM to find sentence representations that capture their meaning, as sentences with similar meanings are close to each other while different sentences meanings will be far.<br/>
A qualitative evaluation supports this claim, showing that our model is aware of word order and is fairly invariant to the active and passive voice.
</div>
<div class="md-paper-translated" markdown="1">
LSTM의 유용한 특징은 다양한 길이를 가진 input sentence를 항상 고정된 차원수의 vector 표현으로 매핑하는 법을 학습한다는 것이다.<br/>
번역은 source sentence들을 의역하는 경향이 있다는 점을 고려하면
(<span class="md-paper-interpreted" markdown="1">=번역은 문장을 그대로 직역하기 보다 원문이 말하고자 하는 바를 번역문에
오해 없이 담으려고 하는 경향이 있다는 점을 고려하면</span>), LSTM 또한 번역을 하면서 다른 의미의 문장들은 서로 멀고
의미가 유사한 문장들은 서로 가까울수 있게끔 문장의 의미를 담아낼 수 있는 어떤 표현
(<span class="md-paper-interpreted" markdown="1">주로 vector를 뜻함</span>)을 찾는다.
<span class="md-monologue" markdown="1">의역이 맞는지 모르겠다.</span><br/>
질적 평가에서는 우리의 model이 단어 어순을 이해하고 있고 능동, 수동태에 대해서도 상당히 불변의 결과를 내놓는다는 것을 보여준다.
</div>

# 2 The model

<div class="md-paper-origin" markdown="1">
The Recurrent Neural Network (RNN) [31, 28] is a natural generalization of feedforward neural networks to sequences.<br/>
Given a sequence of inputs ($$x_1, ..., x_T$$), a standard RNN computes a sequence of outputs ($$y_1, ..., y_T$$) by iterating the following equation:<br/>
</div>
<div class="md-paper-translated" markdown="1">
Recurrent Neural Network (RNN) [31, 28] 은 sequence들에 대한 feedforward neural networks의 자연스런 일반화이다.<br/>
inputs sequence ($$x_1, ..., x_T$$)가 주어질때, 표준 RNN은 다음의 방정식을 반복하면서 output sequence ($$y_1, ..., y_T$$)을 계산해낸다:
</div>

$$h_t = sigm(\mathit{W}^{hx}x_t+\mathit{W}^{hh}h_{t-1})$$<br/>
$$y_t = \mathit{W}^{yh}h_t$$

<div class="md-paper-interpreted" markdown="1">
$$t$$ 시점의 Hidden State (은닉 상태) $$h_t$$는 $$t$$ 시점의 input $$x_t$$와 이전 hidden state $$h_{t-1}$$ 결합으로 생성한다는 뜻.<br/>
$$sigm$$은 activation function 중 하나인 $$sigmoid$$를 말하는 것 같음.<br/>
또한 $$t$$ 시점의 output $$y_t$$는 $$h_t$$로부터 생성된다는 뜻.<br/>
그리고 이에 대응하는 가중치 벡터 $$\mathit{W}^{hx}$$, $$\mathit{W}^{hh}$$, $$\mathit{W}^{yh}$$ 3개가 있음.<br/>
이런 과정은 과거의 결과를 다시 현재의 input에 추가시킨다는 의미로, 우리가 많이 봐온 일반적인 Recurrent Neural Network 형태를 생각하면 된다.<br/>
그리고 squence의 시간 의존성을 처리하기 위한 방법이 담겨있다. 논문의 도입 부분에서부터 RNN은 short-term dependencies를 이해할 수 있으며
LSTM은 장기(Long-term), 단기(short-term) dependecies 모두를 이해 할 수 있다고 했다.
</div>

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
While it could work in principle since the RNN is provided with all the relevant information, it would be difficult to train the RNNs due to the resulting long term dependencies ([figure 1](#figure-1)) [14, 4, 16, 15].<br/>
However, the Long Short-Term Memory (LSTM) [16] is known to learn problems with long range temporal dependencies, so an LSTM may succeed in this setting.
</div>
<div class="md-paper-translated" markdown="1">
일반적인 sequence 학습을 위한 가장 단순한 전략은 1개 RNN을 사용하여 input sequence를 고정 사이즈의 vector로 매핑한 다음,
그 vector를 또다른 RNN을 이용해서 target sequence로 매핑하는 것이다(이런 접근법은 Cho et al. [5]에서도 사용됨).<br/>
이런 전략은 모든 관련 정보가 RNN에 제공되기 때문에 이론적으로는 올바로 작동하지만, 장기 의존성 때문에
([figure 1](#figure-1)) [14, 4, 16, 15] RNN을 학습하는 것이 어려울 수 있다.<br/>
그러나 the Long Short-Term Memory (LSTM 장단기메모리) [16]는 장기적 의존성 문제 또한 학습할 수 있다고 알려져있다.
따라서 LSTM은 이러한 전략을 성공적으로 수행할 수 있을 것이다.
</div>

<div class="md-paper-origin" markdown="1">
The goal of the LSTM is to estimate the conditional probability $$p(y_1, ..., y_{T^{\prime}}|x_1, ..., x_T)$$ where $$(x_1, ..., x_T)$$ is an input sequence and $$y_1, ..., y_{T^{\prime}}$$ is its corresponding output sequence whose length $$T^{\prime}$$ may differ from $$T$$.<br/>
The LSTM computes this conditional probability by first obtaining the fixed-dimensional representation $$v$$ of the input sequence $$(x_1, ..., x_T)$$ given by the last hidden state of the LSTM, and then computing the probability of $$y_1, ..., y_{T^{\prime}}$$ with a standard LSTM-LM formulation whose initial hidden state is set to the representation $$v$$ of $$x_1, ..., x_T$$:
</div>
<div class="md-paper-translated" markdown="1">
LSTM의 최종 목표는 input sequence $$(x_1, ..., x_T)$$와 그에 대응하는 길이가 $$T^{\prime}$$인 output sequence
$$y_1, ..., y_{T^{\prime}}$$에 대해 조건부 확률 $$p(y_1, ..., y_{T^{\prime}}|x_1, ..., x_T)$$를 측정하는 것이다.<br/>
LSTM은 먼저 LSTM의 마지막 hidden state로부터 주어진 input sequece $$(x_1, ..., x_T)$$의 고정 차원수의 표현 $$v$$
(<span class="md-paper-interpreted" markdown="1">원문에선 representation $$v$$인데 어떻게 번역하는게 가장 적절할지 모르겠다.
대략 의미적으로 dense vector라고 생각하면 될듯.</span>)를 얻고나서 초기 hidden state가 input sequence
$$x_1, ..., x_T$$의 표현 $$v$$로 주어진 표준 LSTM-LM 공식으로 $$y_1, ..., y_{T^{\prime}}$$의 확률을 계산하여 이 조건부 확률을 계산한다:
</div>

$$p(y_1, ..., y_{T^{\prime}}\vert x_1, ..., x_T)=\prod_{t=1}^{T^{\prime}} p(y_t\vert v, y_1, ..., y_{t-1})$$
<span style="display: inline-block; max-width: 40px; width: 100%;"></span>(1)
{:id="equation-1"}

<div class="md-paper-origin" markdown="1">
In this equation, each $$p(y_t\vert v, y_1, ..., y_{t−1})$$ distribution is represented with a softmax over all the words in the vocabulary. We use the LSTM formulation from Graves [10].<br/>
Note that we require that each sentence ends with a special end-of-sentence symbol “&lt;EOS>”, which enables the model to define a distribution over sequences of all possible lengths.<br/>
The overall scheme is outlined in [figure 1](#figure-1), where the shown LSTM computes the representation of “A”, “B”, “C”, “&lt;EOS>” and then uses this representation to compute the probability of “W”, “X”, “Y”, “Z”, “&lt;EOS>”.
</div>
<div class="md-paper-translated" markdown="1">
이 방정식에서, 각각의 확률분포 $$p(y_t\vert v, y_1, ..., y_{t−1})$$는 어휘록에 있는 모든 단어들에 대한 softmax로 표현된다.
우리는 Graves [10]의 LSTM 공식을 사용한다.<br/>
각 문장의 끝은 모델이 다양한 길이의 sequence들에 대한 분포를 정의하는 것을 가능하게 해주는 하는 특별한 문장 끝 부호 "&lt;EOS>"로
끝나야 한다. <span class="md-paper-interpreted">모델에게 문장의 끝을 알려주지 않으면 모델이 문장을 어디서부터 어디까지
끊어서 하나의 문장으로 인식하고 계산할지 모른다는 것은 당연한 말이기도 하다.</span><br/>
이 모든 계획은 [figure 1](#figure-1)에 요약돼 있다. [figure 1](#figure-1)은 LSTM이 "A", "B", "C", "&lt;EOS>"의 표현을 계산하고
그 표현을 "W", "X", "Y", "Z", "&lt;EOS>"의 확률을 계산하기 위해 사용하는 과정을 보여준다.
</div>
<div class="md-paper-interpreted" markdown="1">
방정식[(1)](#equation-1)을 상세히 살펴보자. 방정식(1)은 다이어그램 [figure 1](#figure-1)을 수식으로 표현한 것이다.<br/>
timestep $$T$$개의 영어 단어 $$x_1, ..., x_T$$가 순서대로 나열돼 있는 문장이 timestep $$T^{\prime}$$개의 프랑스어 단어
$$y_1, ..., y_{T^{\prime}}$$이 순서대로 나열돼 있는 문장으로 번역될 확률은 아래와 같다.<br/>
먼저 원본 문장(source sentence) 입력 단계에서 $$x_1, ..., x_T$$ 단어가 모두 LSTM으로 들어간다.
그리고 LSTM은 마지막으로 특수 토큰 "&lt;EOS>"를 입력받고 해당 문장의 representation vector인 $$v$$를 출력한다.<br/>
다음으로 번역 문장(target sentence)을 만드는 번역 단계에서 LSTM은 timestep $$t=1$$부터 $$2, 3, 4, ..., T^{\prime}$$까지
순서대로 스텝을 밟으며 계산 및 출력을 수행한다.<br/>
가장 처음의 출력 timestep $$t=1$$일 때, LSTM은 $$y_1$$을 $$p(y_1\vert v)$$의 확률로 출력한다.
이것은 $$y_1$$이 번역 결과로 등장하려면 input 문장에 대한 representation vector $$v$$가 선행돼야 한다는 것을 의미한다.<br/>
그 다음 timestep $$t=2$$일 때, timestep $$t=1$$에 이어서 번역 출력으로 $$y_1, y_2$$가 순서대로 주어질 확률은
$$p(y_1\vert v)\times p(y_2\vert v, y_1)$$이 된다.<br/>
이것은 timestep $$t=2$$ 단계의 출력 단어인 $$y_2$$가 출력되려면 입력 문장의 representation vector $$v$$와
이전의 출력 결과 $$y_1$$이 선행돼야 한다는 것을 의미한다.<br/>
그리고 $$\prod$$가 있는데 이 때문에 timestep $$t=2$$의 확률이 timestep $$t=1$$의 확률과 곱하기로 표현된다.<br/>
이 확률의 곱셈은 어떤 사건의 경우의 수 여러개가 함께 발생할 확률을 의미한다.
'함께' 발생한다는 말은 시간적인 '동시' 발생이라기 보다 '연속해서' 발생이라고 보면 된다.
예를들어 주사위를 던질때 어떤 눈금이 나오는 확률이 모두 $$1/6$$로 동일하다고 할때
처음 던졌을때 1의 눈금이 나오고 두번째 던졌을때 5의 눈금이 나올 확률은 두 확률의 곱셈인 $$1/6\times 1/6$$로 표현된다.<br/>
마찬가지로 timestep $$t=3$$일 때, LSTM은 출력 번역 문장 $$y_1, y_2, y_3$$를
$$p(y_1\vert v)\times p(y_2\vert v, y_1)\times p(y_3\vert v, y_1, y_2)$$의 확률로 출력한다.<br/>
이 식에서도 $$y_3$$가 출력될 확률은 $$p(y_3\vert v, y_1, y_2)$$이고 입력 문장의 representation vector $$v$$,
timestep $$t=1$$의 출력 단어 $$y_1$$, timestep $$t=2$$의 출력 단어 $$y_2$$가 선행돼야 한다는 것을 의미한다.
</div>

<div class="md-paper-origin" markdown="1">
Our actual models differ from the above description in three important ways.<br/>
First, we used two different LSTMs: one for the input sequence and another for the output sequence, because doing so increases the number model parameters at negligible computational cost and makes it natural to train the LSTM on multiple language pairs simultaneously [18].<br/>
Second, we found that deep LSTMs significantly outperformed shallow LSTMs, so we chose an LSTM with four layers.<br/>
Third, we found it extremely valuable to reverse the order of the words of the input sentence.<br/>
So for example, instead of mapping the sentence a, b, c to the sentence $$\alpha$$, $$\beta$$, $$\gamma$$, the LSTM is asked to map c, b, a to $$\alpha$$, $$\beta$$, $$\gamma$$, where $$\alpha$$, $$\beta$$, $$\gamma$$ is the translation of a, b, c.<br/>
This way, a is in close proximity to $$\alpha$$, b is fairly close to $$\beta$$, and so on, a fact that makes it easy for SGD to “establish communication” between the input and the output.<br/>
We found this simple data transformation to greatly boost the performance of the LSTM.
</div>
<div class="md-paper-translated" markdown="1">
우리의 실제 model은 위의 설명과는 3개의 중요한 점에서 다르다.<br/>
첫번째, 우리는 2개의 서로 다른 LSTM을 사용했다: 하나는 input sequence를 위한 것이며 다른 하나는 output sequence를 위한 것이다.
그렇게 하는 것이 학습해야할 model parameter의 수는 거의 증가시키지 않으면서도 LSTM이 다양한 언어쌍을 동시에 학습하는 것이 가능해지기 때문이다 [18].
<div class="md-paper-interpreted" markdown="1">
예를 들자면, English 언어 타입의 Input Sequence를 Representation Vector로 바꾸는 Encoder(LSTM 모델)에<br/>
해당 Representation Vector를 특정 언어 타입(French, Korean)의 Output Sequence로 바꾸는 Decoder들을 쌍으로 묶을 수 있다는 말인가.
English->French, English->Korean 이런식으로?<br/>
정말 그런건지 보려면 [18] 논문을 봐야할듯하다.
</div>
두번째, 우리는 deep LSTM이 얕은 LSTM을 압도하는 성능을 낸다는 것을 알아냈다. 그래서 우리는 4개 layer로된 LSTM을 선택했다.<br/>
세번째, 우리는 input sentence의 단어 어순을 거꾸로 뒤집는 것이 굉장히 가치있음을 발견했다.<br/>
예를 들어, 문장 a, b, c의 번역이 문장 $$\alpha$$, $$\beta$$, $$\gamma$$ 일 때, LSTM은 a, b, c를
$$\alpha$$, $$\beta$$, $$\gamma$$로 매핑하는 대신 c, b, a를 $$\alpha$$, $$\beta$$, $$\gamma$$에 매핑한다.<br/>
이렇게 a는 $$\alpha$$에 아주 가깝고, b는 $$\beta$$에 아주 가까워지므로
(<span class="md-paper-interpreted" markdown="1">Encoder에서는 역순 input sequence를 넣기 때문에 a가 마지막으로 들어가게 되며
Decoder에서는 $$\alpha$$가 가장 먼저 나오니까 a와 $$\alpha$$를 가장 가까이 위치하도록 만든셈.</span>),
SGD가 input과 output 사이의 연관 관계를 연결하여 계산하는 것을 쉽게 만들어준다.
(<span class="md-paper-interpreted" markdown="1">Gradient의 Backpropagation에 있어 $$\alpha$$의 Gradient를 받아서
가능한 빨리 a에게 전달시킬 수 있다는 의미인 듯</span>)<br/>
우리는 이러한 단순 데이터 변환으로 LSTM의 성능을 극대화 시킬 수 있음을 알았다.
</div>

# 3 Experiments

<div class="md-paper-origin" markdown="1">
We applied our method to the WMT’14 English to French MT task in two ways.<br/>
We used it to directly translate the input sentence without using a reference SMT system and we it to rescore the n-best lists of an SMT baseline.<br/>
We report the accuracy of these translation methods, present sample translations, and visualize the resulting sentence representation.
</div>
<div class="md-paper-translated" markdown="1">
우리는 우리의 방법을 WMT2014 English to French 기계 번역 작업에 2가지 형태로 적용시켰다.<br/>
참조 SMT 시스템을 사용하지 않고 input sentence를 직역하는 형태와 SMT 시스템을 적용하여 나온 결과의 Top n을 재채점하는 형태가 그것이다.<br/>
우리는 실험에서 그런 형태의 번역의 정확성과, 번역 결과 샘플, sentence represntation 결과를 시각화해 보이도록 한다.
</div>

## 3.1 Dataset details

<div class="md-paper-origin" markdown="1">
We used the WMT’14 English to French dataset. We trained our models on a subset of 12M sentences consisting of 348M French words and 304M English words, which is a clean “selected” subset from [29].<br/>
We chose this translation task and this specific training set subset because of the public availability of a tokenized training and test set together with 1000-best lists from the baseline SMT [29].<br/>
As typical neural language models rely on a vector representation for each word, we used a fixed vocabulary for both languages.<br/>
We used 160,000 of the most frequent words for the source language and 80,000 of the most frequent words for the target language. Every out-of-vocabulary word was replaced with a special “UNK” token.
</div>
<div class="md-paper-translated" markdown="1">
우리는 WMT 2014 English to French 데이터셋을 사용했다.
우리의 모델은 3억 4천 8백만 프랑스 단어와 3억 4백만 영단어로 구성한 1200만개의 문장 집합들을 학습했으며 학습에 사용한 문장들은
[29] 로부터 깔끔하게 선택한 문장들이다.<br/>
우리가 이 번역 작업과 특정한 학습 데이터셋을 선택한 이유는 데이터셋이 SMT 기준 best 1000 항목에 올라와 있는 토큰화 되어있는
train, test 공용 데이터셋이기 때문이다 [29].<br/>
전형적인 뉴럴 언어처리 모델은 각 단어에 대한 representation vector에 의존하므로 우리는 양측 언어에 대해 고정적인 단어수의 어휘록을 사용했다.<br/>
또한 source 언어에서 가장 자주 쓰이는 16만개의 단어, target 언어에서 가장 자주 쓰이는 8만개의 단어를 사용했다.<br/>
어휘록 외의 모든 단어는 특수 토큰인 "UNK"(<span class="md-paper-interpreted" markdown="1">Unknown</span>)로 치환했다.
</div>

## 3.2 Decoding and Rescoring

<div class="md-paper-origin" markdown="1">
The core of our experiments involved training a large deep LSTM on many sentence pairs.<br/>
We trained it by maximizing the log probability of a correct translation $$\mathit{T}$$ given the source sentence $$\mathit{S}$$, so the training objective is (where $$\mathcal{S}$$ is the training set)
</div>
<div class="md-paper-translated" markdown="1">
우리 실험의 핵심 중 하나는 거대하고 깊은 LSTM으로 수많은 문장들을 학습하는 것이다.<br/>
우리는 source sentence가 $$\mathit{S}$$일때, 올바른 번역 $$\mathit{T}$$가 일어날 확률의 로그 값을 최대화하는 방법
(<span class="md-paper-interpreted" markdown="1">Maximum Likelihood Estimation 최대가능도추정법</span>)으로 모델을 학습시킨다.
</div>

$$1/\vert\mathcal{S}\vert\sum_{(\mathit{T},\mathit{S})\in\mathcal{S}}\log{p(\mathit{T}\vert\mathit{S})}$$

<div class="md-paper-origin" markdown="1">
Once training is complete, we produce translations by finding the most likely translation according to the LSTM:
</div>
<div class="md-paper-translated" markdown="1">
학습이 완료되고 나면, LSTM으로 가장 가능성 높은 번역을 찾아 번역한다:
</div>

$$\hat{T}=\underset{T}{\operatorname{arg max}}p(T\vert S)$$
<span style="display: inline-block; max-width: 40px; width: 100%;"></span>(2)

<div class="md-paper-origin" markdown="1">
We search for the most likely translation using a simple left-to-right beam search decoder which maintains a small number B of partial hypotheses, where a partial hypothesis is a prefix of some translation.<br/>
At each timestep we extend each partial hypothesis in the beam with every possible word in the vocabulary. This greatly increases the number of the hypotheses so we discard all but the B most likely hypotheses according to the model’s log probability.<br/>
As soon as the “&lt;EOS>” symbol is appended to a hypothesis, it is removed from the beam and is added to the set of complete hypotheses.<br/>
While this decoder is approximate, it is simple to implement. Interestingly, our system performs well even with a beam size of 1, and a beam of size 2 provides most of the benefits of beam search (Table 1).
</div>
<div class="md-paper-translated" markdown="1">
우리는 일부 번역의 부분적인 추측이 접두사일때 적은 수 B개의 부분 추측을 유지하는 단순한 left-to-right beam search decoder 이용해서 가장 적절한 번역을 찾는다. <span class="md-paper-interpreted">B개의 Beam을 가지고 탐색하는 Beam Search를 의미하는 듯하다.</span> <span class="md-monologue">자료구조에 대한 무지에서 오는 부작용 같음. 가장 실패한 번역이네..ㅋ</span><br/>
timestep 마다 우리는 beam 안의 부분 추측을 어휘록에 있는 가능한 모든 단어들로 확장한다. 이것은 추측의 수를 크게 증가시키며 우리는 모델의 log 확률값에 따라 가장 적합한 추측 B개를 제외하고 나머지를 버린다.<br/>
추측 결과에 "&lt;EOS>" 심볼이 나타나면 beam으로부터 제거되고 완성된 추측 집합에 추가된다.<br/>
이 decoder는 거의 정확한 값을 계산해내는데 구현도 간단하다. 흥미롭게도, 우리의 시스템은 beam size가 1일때에도 잘 작동하고 beam size가 2일때 beam search의 대부분의 장점을 잘 발휘해낸다 (Table 1).
</div>

<div class="md-paper-origin" markdown="1">
We also used the LSTM to rescore the 1000-best lists produced by the baseline system [29].<br/>
To rescore an n-best list, we computed the log probability of every hypothesis with our LSTM and took an even average with their score and the LSTM’s score.
</div>
<div class="md-paper-translated" markdown="1">
또한 우리는 기준 시스템에 의해 생성된 1000개 베스트 항목[29]을 재채점 하기위해 LSTM을 사용했다.<br/>
우리는 n개 베스트 항목을 재채점하기 위해서 LSTM으로 모든 추측 결과의 log 확률을 계산하고 원래 점수와 LSTM 점수의 평균값을 사용했다.
</div>

## 3.3 Reversing the Source Sentences

<div class="md-paper-origin" markdown="1">
While the LSTM is capable of solving problems with long term dependencies, we discovered that the LSTM learns much better when the source sentences are reversed (the target sentences are not reversed).<br/>
By doing so, the LSTM’s test perplexity dropped from 5.8 to 4.7, and the test BLEU scores of its decoded translations increased from 25.9 to 30.6.
</div>
<div class="md-paper-translated" markdown="1">
우리는 장기 의존성 문제를 해결할 수 있는 능력이 있는 LSTM이 source sentences를 거꾸로 뒤집었을 때 더 잘 학습 할 수 있다는 점을 발견했다 (target sentences는 뒤집지 않음).<br/>
그렇게 함으로써 LSTM의 테스트 perplexity(혼란도)[^perplexity]를 5.8에서 4.7로 감소시킬 수 있었고 번역문의 test BLEU 점수를 25.9에서 30.6으로 향상시킬 수 있었다.
</div>

<div class="md-paper-origin" markdown="1">
While we do not have a complete explanation to this phenomenon, we believe that it is caused by the introduction of many short term dependencies to the dataset.<br/>
Normally, when we concatenate a source sentence with a target sentence, each word in the source sentence is far from its corresponding word in the target sentence. As a result, the problem has a large “minimal time lag” [17].<br/>
By reversing the words in the source sentence, the average distance between corresponding words in the source and target language is unchanged. However, the first few words in the source language are now very close to the first few words in the target language, so the problem’s minimal time lag is greatly reduced.<br/>
Thus, backpropagation has an easier time “establishing communication” between the source sentence and the target sentence, which in turn results in substantially improved overall performance.
</div>
<div class="md-paper-translated" markdown="1">
이러한 현상을 명확하게 설명할 순 없지만 우린 그 현상이 dataset에 많은 단기 의존성을 도입한 것에 의해 일어났다고 믿는다.<br/>
보통, source sentence를 target sentence와 결합할 때, source sentence를 구성하는 각 단어는
그와 대응하는 target sentence의 단어로부터 멀리 떨어져있다. 그 결과로, 큰 "minimal time lag" 문제[17]를 낳는다.
<span class="md-paper-interpreted">LSTM으로 입력된 source sentence의 초반의 단어들은 timestep이 증가하면서 점차 그 영향이 흐려진다는 것.
따라서 source sentence를 역순으로 입력하면 source sentence의 초반의 단어의 영향이 희미해지지 않으며 최종 Hidden State에 미치는 영향이 증가할 것이다.
그리고 그만큼 역전파 시, 초반 단어들에 대한 학습 효과를 향상시킨다.</span><br/>
source sentence에 있는 단어들의 순서를 뒤집어도 source와 target 언어 간 대응하는 단어 사이의 평균적인 거리는 변하지 않는다.
그러나 source sentence의 처음의 몇개 단어들은 target 언어에 있는 처음의 몇개 단어들과 아주 가깝게 위치하게 되고
"minimal time lag" 문제를 상당히 감소시킨다.<br/>
그러므로 역전파 동안 source sentence와 target sentence 간 연결 고리를 더 쉽게 만들고 결과적으로 전체 성능을 크게 향상 시킨다.
</div>

<div class="md-paper-origin" markdown="1">
Initially, we believed that reversing the input sentences would only lead to more confident predictions in the early parts of the target sentence and to less confident predictions in the later parts.<br/>
However, LSTMs trained on reversed source sentences did much better on long sentences than LSTMs 4 trained on the raw source sentences (see sec. 3.7), which suggests that reversing the input sentences results in LSTMs with better memory utilization.
</div>
<div class="md-paper-translated" markdown="1">
초기에는 input sentences의 단어 순서를 역순으로 뒤집는 것이 target sentence의 앞부분에 대해서만 예측의 신뢰성을
좀 더 향상시키고 뒷부분에 대해서는 오히려 하락시킬 것이라 생각했다.<br/>
그러나 역순의 source sentences를 학습한 LSTM들은 원형의 source sentences를 학습한 LSTM들 보다 긴 문장에 대해서
더 좋은 성능을 발휘했다. ([섹션 3.7](#37-performance-on-long-sentences)을 보자 )<br/>
이것은 input sentences의 단어를 역순으로 뒤집는 것이 LSTM이 메모리를 더 효과적으로 이용하도록 만든다는 것을 의미한다.
</div>

## 3.4 Training details

<div class="md-paper-origin" markdown="1">
We found that the LSTM models are fairly easy to train. We used deep LSTMs with 4 layers, with 1000 cells at each layer and 1000 dimensional word embeddings, with an input vocabulary of 160,000 and an output vocabulary of 80,000.<br/>
We found deep LSTMs to significantly outperform shallow LSTMs, where each additional layer reduced perplexity by nearly 10%, possibly due to their much larger hidden state.<br/>
We used a naive softmax over 80,000 words at each output.<br/>
The resulting LSTM has 380M parameters of which 64M are pure recurrent connections (32M for the “encoder” LSTM and 32M for the “decoder” LSTM).<br/>
The complete training details are given below:
</div>
<div class="md-paper-translated" markdown="1">
LSTM을 학습시키는 것은 꽤 쉬웠다. 우리는 각 layer가 1000개 cell로 이루어진 layer 4개를 쌓은 deep LSTM을 사용했고 16만개의 input 어휘와 8만개의 output 어휘를 1000차원의 word embedding으로 변환하여 사용했다.<br/>
또한 deep LSTM이 shallow LSTM의 성능을 압도하는 것을 발견했는데 LSTM layer가 추가될때 마다 perplexity가 거의 10% 씩 감소하였다. 이것은 deep LSTM의 hidden state가 더 크기 때문인 것으로 예상된다.<br/>
그리고 각 output에서 8만개 단어를 대상으로 하는 softmax를 적용했다.<br/>
최종 LSTM은 3억 8000만개의 parameter들을 가지며 그 중 6400만개는 순수 recurrent connection을 위한 인자들이다. (또한 그 중 3200만개는 encoder, 나머지 3200만개는 decoder에 있다).<br/>
전체 train 과정에 대한 상세는 아래와 같다:
</div>

<div class="md-paper-origin" markdown="1">
* We initialized all of the LSTM’s parameters with the uniform distribution between -0.08 and 0.08
* We used stochastic gradient descent without momentum, with a fixed learning rate of 0.7. After 5 epochs, we begun halving the learning rate every half epoch. We trained our models for a total of 7.5 epochs.
* We used batches of 128 sequences for the gradient and divided it the size of the batch (namely, 128).
* Although LSTMs tend to not suffer from the vanishing gradient problem, they can have exploding gradients. Thus we enforced a hard constraint on the norm of the gradient [10, 25] by scaling it when its norm exceeded a threshold.<br/>
For each training batch, we compute $$s=\lVert g\rVert_2$$, where $$g$$ is the gradient divided by 128.
If $$s > 5$$, we set $$g=\frac{5g}{s}$$.
* Different sentences have different lengths. Most sentences are short (e.g., length 20-30) but some sentences are long (e.g., length > 100), so a minibatch of 128 randomly chosen
training sentences will have many short sentences and few long sentences, and as a result, much of the computation in the minibatch is wasted.<br/>
To address this problem, we made sure that all sentences within a minibatch were roughly of the same length, which a 2x speedup.
</div>
<div class="md-paper-translated" markdown="1">
* 우리는 LSTM parameter들을 -0.08~0.08 사이 값을 갖는 균일분포를 따르는 임의의 값으로 초기화 했다.
* 학습 초반엔 Momentum 없는 Stochastic Gradient Descent (<span class="md-paper-interpreted">모멘텀 없는 랜덤 경사하강법.
  성능이 좋지 않은 Naive SGD를 사용했다는 의미 같다.</span>)에 learning rate 값을 0.7로 고정해놓고 학습을 진행했다.<br/>
  5 epoch을 학습한 후 부터는 0.5 epoch 마다 learning rate를 절반으로 줄여가면서 모델이 처음의 5 epoch을 포함하여
  총 7.5 epoch을 학습할때까지 학습을 진행했다.
* gradient를 얻기 위해 128 sequence의 배치들을 사용했고 gradient를 batch size로 나누었다 (즉, 128로 나눔).
  <span class="md-monologue">128 sequence의 배치들이 뭐지... 그냥 batch size가 128이라는 건가?</span>
* LSTM에서는 vanishing gradient 문제가 잘 발생하지 않지만 exploding gradient 문제가 발생한다.
  그래서 우리는 gradient의 norm(<span class="md-paper-interpreted">vector의 크기로 해석</span>)이 threshold를 초과할때
  그것을 scaling 하는 식으로 norm에 강한 제약을 걸었다[10, 25].<br/>
  각 training batch에서 $$g$$를 gradient를 128로 나눈 값이라고 할 때, $$s=\lVert g\rVert_2$$를 계산한다.
  그리고 $$s > 5$$ 이면, $$g=\frac{5g}{s}$$로 설정하여 gradient를 scaling 했다.
* 서로 다른 문장은 서로 다른 길이를 가진다. 대부분의 문장은 짧지만 (예를들면, 20-30 정도의 길이) 어떤 문장은 길기 때문에
  (예들들어, 100를 초과하는 길이), 랜덤하게 선택된 128의 traing sentence들의 minibatch는 많은 짧은 문장과
  적은 수의 긴 문장을 갖게 된다. 그리고 그 결과로, minibatch의 연산 대부분이 낭비된다.<br/>
  이 문제를 해결하기 위해 우리는 minibatch 내의 모든 sentences들이 거의 비슷한 길이를 갖도록 했고 연산 속도가 2배로 향상됐다.
</div>

## 3.5 Parallelization

<div class="md-paper-origin" markdown="1">
A C++ implementation of deep LSTM with the configuration from the previous section on a single GPU processes a speed of approximately 1,700 words per second. <br/>
This was too slow for our purposes, so we parallelized our model using an 8-GPU machine.<br/>
Each layer of the LSTM was executed on a different GPU and communicated its activations to the next GPU (or layer) as soon as they were computed.<br/>
Our models have 4 layers of LSTMs, each of which resides on a separate GPU.<br/>
The remaining 4 GPUs were used to parallelize the softmax, so each GPU was responsible for multiplying by a 1000 × 20000 matrix.<br/>
The resulting implementation achieved a speed of 6,300 (both English and French) words per second with a minibatch size of 128.<br/>
Training took about a ten days with this implementation.<br/>
</div>
<div class="md-paper-translated" markdown="1">
이전 섹션에서 설명한 설정들에 따라 C+로 구현한 deep LSTM은 single GPU에서 초당 약 1700개의 단어를 처리한다.<br/>
이것은 우리의 목적을 위해서는 느린 속도였고 모델 연산을 위해 8개 GPU machine으로 병렬처리를 수행했다.<br/>
LSTM의 각 layer는 서로 다른 GPU에서 실행되고 계산이 완료된 즉시 activation 값을 다음의 GPU(또는 layer)로 전달하여 통신한다.<br/>
우리의 모델은 4개의 LSTM layer로 구성돼 있는데 각 layer는 서로 분리된 GPU에 할당된다.<br/>
남은 4개의 GPU들은 softmax 연산을 병렬화 하는데 사용되었다. softmax를 위해 각 GPU는 1000 x 20000 사이즈의 matrix의 곱셈 연산을 맡는다.<br/>
최종 구현체는 데이터 셋을 학습 반복(training iteration) 단위 사이즈인 mini batch size 128로 분할 학습(SGD without momentum)하여
초당 6300개의 영단어와 프랑스 단어를 처리하는 속도를 냈다. 학습이 완료되기까지는 10일 정도가 소요됐다.
</div>

## 3.6 Experimental Results

<div class="md-paper-origin" markdown="1">
We used the cased BLEU score [24] to evaluate the quality of our translations.<br/>
We computed our BLEU scores using multi-bleu.pl1 on the tokenized predictions and ground truth. This way of evaluating the BELU score is consistent with [5] and [2], and reproduces the 33.3 score of [29].M<br/>
However, if we evaluate the state of the art system of [9] (whose predictions can be downloaded from <statmt.org\matrix>) in this manner, we get 37.0, which is greater than the 35.8 reported by <statmt.org\matrix>.
</div>
<div class="md-paper-translated" markdown="1">
우리는 우리 번역의 퀄리티를 평가하기위해 대문자화 시킨<span class="md-monologue">대문자화가 맞나?</span> BLEU score [24]를 사용했다.<br/>
우리는 토큰화된 예측값과 ground truth에 multi-bleu.pl1[^multi-bleu-pl1] 방법을 적용해 BLEU score를 계산했다.
이 점수 평가 방법은 [5]와 [2]와 같으며 [29]의 33.3 score를 재생산한다.
<span class="md-monologue">사전 지식이 부족해서 번역에 어려움이 있으며 BLEU에 대해 보면 알겠지만 나중에 기회가 되면 보자...</span><br/>
그러나 이 방법으로 [9]의 최신 시스템(예측값은 <statmt.org/matrix>에서 다운로드 가능)을 평가했을때 우린 37.0 점을 얻었으며,
이것은 <statmt.org/matrix>에 보고된 35.8 점 보다 높다.
</div>

<div class="md-paper-origin" markdown="1">
The results are presented in tables [1](#table-1) and [2](#table-2). Our best results are obtained with an ensemble of LSTMs that differ in their random initializations and in the random order of minibatches.<br/>
While the decoded translations of the LSTM ensemble do not beat the state of the art, it is the first time that a pure neural translation system outperforms a phrase-based SMT baseline on a large scale MT task by a sizeable margin, despite its inability to handle out-of-vocabulary words.<br/>
The LSTM is within 0.5 BLEU points of the previous state of the art by rescoring the 1000-best list of the baseline system.
</div>
<div class="md-paper-translated" markdown="1">
table 1과 2에 그 결과를 작성하였다. 각 LSTM layer 마다 서로 다른 초기화 과정을 거치고 minibatch를 랜덤하게 섞어 학습한 LSTM 앙상블로부터 best result를 얻었다.<br/>
LSTM 앙상블의 번역 결과가 세계 최고 신기록을 달성하진 못했지만 등록된 어휘 단어 외의 단어를 처리할 수 없음에도 불구하고 순수 neural 번역 시스템으로써 대규모 기계 번역 작업에서 구(phrase) 기반의 SMT 시스템의 성능을 상당한 차이로 최초로 넘었다.<br/>
LSTM은 기준 시스템의 최고 1000개 항목을 재채점 함으로써 이전의 최고 점수에 0.5 BLEU 점 뒤쳐져있다.
</div>

<table id="table-1">
<thead>
<tr style="text-align: center;"><th>Method</th><th>test BLEU score (ntst14)</th></tr>
</thead>
<tbody style="text-align: center;">
<tr><td>Bahdanau et al. [2]</td><td>28.45</td></tr>
<tr><td>Baseline System [29]</td><td>33.30</td></tr>
<tr><td>Single forward LSTM, beam size 12</td><td>26.17</td></tr>
<tr><td>Single reversed LSTM, beam size 12</td><td>30.59</td></tr>
<tr><td>Ensemble of 5 reversed LSTMs, beam size 1</td><td>33.00</td></tr>
<tr><td>Ensemble of 2 reversed LSTMs, beam size 12</td><td>33.27</td></tr>
<tr><td>Ensemble of 5 reversed LSTMs, beam size 2</td><td>34.50</td></tr>
<tr><td>Ensemble of 5 reversed LSTMs, beam size 12</td><td><strong>34.81</strong></td></tr>
</tbody>
</table>
<div style="font-size: .75em;" markdown="1">
<div class="md-paper-origin" markdown="1">
Table 1: The performance of the LSTM on WMT'14 English to French test set (ntst14). Note that an ensemble of 5 LSTMs with a beam of size 2 is cheaper than of a single LSTM with a beam of size 12.
</div>
<div class="md-paper-translated" markdown="1">
Table 1: WMT'14 English to French 테스트셋 (ntst14)에서 LSTM의 성능. beam size 2의 5개 LSTM 앙상블은 beam size 12의 1개 LSTM보다 가볍다.
</div>
</div>

<table id="table-2">
<thead>
<tr style="text-align: center;"><th>Method</th><th>test BLEU score (ntst14)</th></tr>
</thead>
<tbody style="text-align: center;">
<tr><td>Baseline System [19]</td><td>33.30</td></tr>
<tr><td>Cho et al. [5]</td><td>34.54</td></tr>
<tr><td>Best WMT'14 result [9]</td><td></td></tr>
<tr><td>Rescoring the baseline 1000-best with a single forward LSTM</td><td>35.61</td></tr>
<tr><td>Rescoring the baseline 1000-best with a single reversed LSTM</td><td>35.85</td></tr>
<tr><td>Rescoring the baseline 1000-best with an ensemble of 5 reversed LSTMs</td><td><strong>36.5</strong></td></tr>
<tr><td>Oracle Rescoring of the Baseline 1000-best lists</td><td>~45</td></tr>
</tbody>
</table>
<div style="font-size: .75em;" markdown="1">
<div class="md-paper-origin" markdown="1">
Table 2: Method that use neural networks together with an SMT system on the WMT'14 English to French test set (ntst14).
</div>
<div class="md-paper-translated" markdown="1">
Table 2: WMT'14 English to French 테스트셋(ntst14)에 SMT 시스템과 neural network을 함께 사용한 방법들.
</div>
</div>

## 3.7 Performance on long sentences

<div class="md-paper-origin" markdown="1">
We were surprised to discover that the LSTM did well on long sentences, which is shown quantitatively in [figure 3](#figure-3). [Table 3](#table-3) presents several examples of long sentences and their translations.
</div>
<div class="md-paper-translated" markdown="1">
우리는 LSTM이 [figure 3](#figure-3)에서 정량적으로 보이는 것과 같이 긴 문장에서도 잘 작동한다는 사실에 놀랐다.
[Table 3](#table-3)는 몇개의 긴 문장과 그 LSTM 번역 결과 예시를 보여준다.
</div>

![Figure 2]({{ site.gdrive_url_prefix }}1CeKcqCH90a7-AeGg3z9h81wI4hSs3YlD){:style="max-height: 350px;" class="align-center"}
{:style="margin-bottom: 0;" class="img-popup" data-title="Figure 2: The figure shows a 2-dimensional PCA projection of the LSTM hidden states that are obtained after processing the phrases in the figures. The phrases are clustered by meaning, which in these examples is primarily a function of word order, which would be difficult to capture with a bag-of-words model. Notice that both clusters have similar internal structure."}
{:id="figure-2"}
<div style="font-size: .75em;" markdown="1">
<div class="md-paper-origin" markdown="1">
Figure 2: The figure shows a 2-dimensional PCA projection of the LSTM hidden states that are obtained after processing the phrases in the figures. The phrases are clustered by meaning, which in these examples is primarily a function of word order, which would be difficult to capture with a bag-of-words model. Notice that both clusters have similar internal structure.
</div>
<div class="md-paper-translated" markdown="1">
Figure 2: 그림은 그림에 보이는 구(phrase)들을 처리한 후 얻어지는 LSTM hidden state들의 2차원 PCA projection을 보여준다.
구들은 의미에 따라 뭉쳐져 있으며 이 예시에서 이것은 단어 순서의 기능이며 bag-of-word 모델로는 해내기 어렵다<span class="md-monologue">뭔 소리여...</span>. 두 클러스터는 모두 비슷한 내부 구조를 가진다.
</div>
</div>

<div class="md-paper-origin" markdown="1">
One of the attractive features of our model is its ability to turn a sequence of words into a vector of fixed dimensionality. [Figure 2](#figure-2) visualizes some of the learned representations.<br/>
The figure clearly shows that the representations are sensitive to the order of words, while being fairly insensitive to the replacement of an active voice with a passive voice. The two-dimensional projections are obtained using PCA.
</div>
<div class="md-paper-translated" markdown="1">
우리 model의 매력적인 기능 중 하나는 단어의 sequence를 고정 차원수의 vector로 변환하는 능력이다. [Figure 2](#figure-2)는 학습된 몇개의 representation들을 시각화하여 보여준다.<br/>
그림은 representation들이 수동태, 능동태의 차이에는 매우 둔감한 반면 단어의 순서에는 민감하다는 것을 명확하게 보여준다. 이 그림의 2차원 영사는 PCA를 통해 생성됐다.
</div>

<table id="table-3">
<thead>
<tr><th>Type</th><th>Sentence</th></tr>
</thead>
<tbody>
<tr><td>Our model</td><td>Ulrich UNK , membre du conseil d’ administration du constructeur automobile Audi , affirme qu’ il s’ agit d’ une pratique courante depuis des ann´ees pour que les t´el´ephones portables puissent ˆetre collect´es avant les r´eunions du conseil d’ administration afin qu’ ils ne soient pas utilis´es comme appareils d’ ´ecoute `a distance .
</td></tr>
<tr><td>Truth</td><td>Ulrich Hackenberg , membre du conseil d’ administration du constructeur automobile Audi , d´eclare que la collecte des t´el´ephones portables avant les r´eunions du conseil , afin qu’ ils ne puissent pas ˆetre utilis´es comme appareils d’ ´ecoute `a distance , est une pratique courante depuis des ann´ees .</td></tr>
<tr><td>Our model</td><td>“ Les t´el´ephones cellulaires , qui sont vraiment une question , non seulement parce qu’ ils pourraient potentiellement causer des interf´erences avec les appareils de navigation , mais nous savons , selon la FCC , qu’ ils pourraient interf´erer avec les tours de t´el´ephone cellulaire lorsqu’ ils sont dans l’ air ” , dit UNK .</td></tr>
<tr><td>Truth</td><td>“ Les t´el´ephones portables sont v´eritablement un probl`eme , non seulement parce qu’ ils pourraient ´eventuellement cr´eer des interf´erences avec les instruments de navigation , mais parce que nous savons , d’ apr`es la FCC , qu’ ils pourraient perturber les antennes-relais de t´el´ephonie mobile s’ ils sont utilis´es `a bord ” , a d´eclar´e Rosenker .</td></tr>
<tr><td>Our model</td><td>Avec la cr´emation , il y a un “ sentiment de violence contre le corps d’ un ˆetre cher ” , qui sera “ r´eduit `a une pile de cendres ” en tr`es peu de temps au lieu d’ un processus de d´ecomposition “ qui accompagnera les ´etapes du deuil ” .</td></tr>
<tr><td>Truth</td><td>Il y a , avec la cr´emation , “ une violence faite au corps aim´e ” , qui va ˆetre “ r´eduit `a un tas de cendres ” en tr`es peu de temps , et non apr`es un processus de d´ecomposition , qui “ accompagnerait les phases du deuil ” .</td></tr>
</tbody>
</table>
<div style="font-size: .75em;" markdown="1">
<div class="md-paper-origin" markdown="1">
Table 3: A few examples of long translations produced by the LSTM alongside the ground truth translations. The reader can verify that the translations are sensible using Google translate.
</div>
<div class="md-paper-translated" markdown="1">
Table 3: ground truth(=정답)과 나란히 배치한 LSTM으로 생성된 장문 번역의 몇개 예시.
Google translate를 사용한 번역이 말이 된다는 것을 독자가 평가할 수 있다.
</div>
</div>

![Figure 3]({{ site.gdrive_url_prefix }}1uH3a09aLKoY4XqnOEI1jkuStKwHvEMIL){:style="max-height: 350px;" class="align-center"}
{:style="margin-bottom: 0;" class="img-popup" data-title="Figure 3: The left plot shows the performance of our system as a function of sentence length, where the x-axis corresponds to the test sentences sorted by their length and is marked by the actual sequence lengths. There is no degradation on sentences with less than 35 words, there is only a minor degradation on the longest sentences. The right plot shows the LSTM’s performance on sentences with progressively more rare words, where the x-axis corresponds to the test sentences sorted by their "average word frequency rank"."}
{:id="figure-3"}
<div style="font-size: .75em;" markdown="1">
<div class="md-paper-origin" markdown="1">
Figure 3: The left plot shows the performance of our system as a function of sentence length, where the x-axis corresponds to the test sentences sorted by their length and is marked by the actual sequence lengths. There is no degradation on sentences with less than 35 words, there is only a minor degradation on the longest sentences. The right plot shows the LSTM’s performance on sentences with progressively more rare words, where the x-axis corresponds to the test sentences sorted by their "average word frequency rank".
</div>
<div class="md-paper-translated" markdown="1">
Figure 3: 왼쪽의 plot은 문장 길이의 기능으로써 우리 시스템의 성능을 보여준다.
이때 x축은 길이 순으로 정렬된 테스트 문장들에 해당하며 실제 sequence 길이로 표시된다.
단어수가 35개 미만의 문장은 성능 저하가 없고 그보다 많은 단어수의 문장에서 약간의 저하가 있다.
오른쪽 plot은 좀더 희귀한 단어를 가진 문장들에서 LSTM의 성능을 보여준다.
이때 x축은 평균 단어 빈도 순위에 따라 정렬된 테스트 문장들에 해당한다.
</div>
</div>

# 4 Related work

<div class="md-paper-origin" markdown="1">
There is a large body of work on applications of neural networks to machine translation. So far, the simplest and most effective way of applying an RNN-Language Model (RNNLM) [23] or a Feedforward Neural Network Language Model (NNLM) [3] to an MT task is by rescoring the n-best lists of a strong MT baseline [22], which reliably improves translation quality.
</div>
<div class="md-paper-translated" markdown="1">
Neural Network를 기계 번역에 적용하는 많은 작업들이 있다. 지금까지, RNN-언어모델(RNNLM) [23] 또는 순방향 신경망 언어모델 (NNLM) [3]을 기계 번역 작업에 적용하는 가장 단순하고 효과적인 방법은 strong<span class="md-monologue">(?)</span> 기계번역 기준 [22]의 n개 베스트 항목을 재채점하는 방법이이었고 그런 방법은 확실하게 번역의 질을 향상시켰다.
</div>

<div class="md-paper-origin" markdown="1">
More recently, researchers have begun to look into ways of including information about the source language into the NNLM.<br/>
Examples of this work include Auli et al. [1], who combine an NNLM with a topic model of the input sentence, which improves rescoring performance.<br/>
Devlin et al. [8] followed a similar approach, but they incorporated their NNLM into the decoder of an MT system and used the decoder’s alignment information to provide the NNLM with the most useful words in the input sentence. Their approach was highly successful and it achieved large improvements over their baseline.
</div>
<div class="md-paper-translated" markdown="1">
좀 더 최근엔, 학자들은 source language의 정보를 NNLM(신경망 모델)로 포함시키는 방법을 찾기 시작했다.<br/>
그 예로 Auli et al. [1] 이 있는데 여기서는 NNLM을 input sentence의 topic model과 결합시켰고, 재채점 성능을 향상시킬 수 있었다.<span class="md-paper-interpreted">input sentence의 주제에 대한 representation을 뽑는 모델(topic model)을 NNLM과 결합시켰다는 것
같은데 정말 그런지는 paper [1]을 봐야 알 것 같다.</span><br/>
Devlin et al. [8]은 비슷하게 접근하면서 NNLM을 기계 번역 시스템의 decoder에 통합했고 input sentence에서 가장 유용한 단어를
NNLM에 제공하기 위해 decoder의 정렬 정보를 사용했다. 이 방법은 매우 성공적이었고 그들의 비교 기준으로 부터 아주 큰 향상을 이루었다.
</div>

<div class="md-paper-origin" markdown="1">
Our work is closely related to Kalchbrenner and Blunsom [18], who were the first to map the input sentence into a vector and then back to a sentence, although they map sentences to vectors using convolutional neural networks, which lose the ordering of the words.<br/>
Similarly to this work, Cho et al. [5] used an LSTM-like RNN architecture to map sentences into vectors and back, although their primary focus was on integrating their neural network into an SMT system.<br/>
Bahdanau et al. [2] also attempted direct translations with a neural network that used an attention mechanism to overcome the poor performance on long sentences experienced by Cho et al. [5] and achieved encouraging results.<br/>
Likewise, Pouget-Abadie et al. [26] attempted to address the memory problem of Cho et al. [5] by translating pieces of the source sentence in way that produces smooth translations, which is similar to a phrase-based approach.<br/>
We suspect that they could achieve similar improvements by simply training their networks on reversed source sentences.
</div>
<div class="md-paper-translated" markdown="1">
우리의 방법은 Kalchbrenner and Blunsom [18]과 밀접한 관련이있다. 그들의 방법은 처음으로 input sentence를 vector로 매핑하고
다시 sentence에 매핑했다. 하지만 그들 방법에서는 convolution neural networks를 사용해서 문장을 vector로 매핑 했고 단어 간의
순서 정보를 상실했다.<br/>
이것과 유사하게, Cho et al [5]은 비록 주요 관심은 그들의 neural network를 SMT 시스템에 통합시키는 것이었지만,
sentences를 vectors로 매핑하고 다시 거꾸로 매핑하는데에 LSTM-like RNN 구조를 사용했었다.<br/>
Bahdanau et al. [2]는 또한 Cho et al. [5]에서 경험한 긴 문장들에대한 저성능을 극복하기 위해 attention mechanism을 사용한
neural network로 직접 번역을 시도했고 고무할 만한 결과를 달성했다.<br/>
비슷하게, Pouget-Abadie et al. [26]은, 구(phrase) 기반 접근법과 유사하게, 부드러운 번역을 생성하는 방식으로 source sentence의
조각들을 번역해서 Cho et al. [5]의 메모리 문제의 해결하려고 시도했다.<br/>
그러나 우리는 그들의 이러한 방법 대신 단순히 network에 역순의 source sentences를 학습시키는 것으로 비슷한 수준의 향상을
달성할 수 있을 것이라 생각한다.
</div>

<div class="md-paper-origin" markdown="1">
End-to-end training is also the focus of Hermann et al. [12], whose model represents the inputs and outputs by feedforward networks, and map them to similar points in space. However, their approach cannot generate translations directly: to get a translation, they need to do a look up for closest vector in the pre-computed database of sentences, or to rescore a sentence.
</div>
<div class="md-paper-translated" markdown="1">
종단 간 훈련은 또한 Hermann et al. [12]의 관심사였는데 그들의 모델은 feedforward nerworks에 의해 input과 output을 표현하고
그것들을 공간 안의 비슷한 점에 매핑한다. 그러나, 그들의 접근법은 번역을 직접 생성 할 수 없다: 번역 결과를 얻거나 벡터를 문장으로
복원하기 위해서는, 미리 계산된 문장 벡터 database에서 가장 가까운 벡터를 검색하는 작업이 필요하다.
</div>

# 5 Conclusion

<div class="md-paper-origin" markdown="1">
In this work, we showed that a large deep LSTM, that has a limited vocabulary and that makes almost no assumption about problem structure can outperform a standard SMT-based system whose vocabulary is unlimited on a large-scale MT task.<br/>
The success of our simple LSTM-based approach on MT suggests that it should do well on many other sequence learning problems, provided they have enough training data.
</div>
<div class="md-paper-translated" markdown="1">
이번 작업에서 우리는 제한된 어휘록을 가지며 문제 구조에 대해 거의 가정하지 않는 대규모 deep LSTM이 대규모 기계 번역 작업에 있어
무제한의 어휘록을 가진 standard SMT(Statistical Machine Translation) 기반 시스템 보다 더 높은 성능을 발휘할 수 있음을 보였다.<br/>
기계 번역에 대한 단순 LSTM 기반의 접근법에 있어 우리의 성공은 충분한 양의 데이터가 제공되는 많은 다른 sequence 학습 문제에서도
좋은 결과를 낼 것이란 점을 보여준다.
</div>

<div class="md-paper-origin" markdown="1">
We were surprised by the extent of the improvement obtained by reversing the words in the source sentences. We conclude that it is important to find a problem encoding that has the greatest number of short term dependencies, as they make the learning problem much simpler.<br/>
In particular, while we were unable to train a standard RNN on the non-reversed translation problem (shown in fig. 1), we believe that a standard RNN should be easily trainable when the source sentences are reversed (although we did not verify it experimentally).
</div>
<div class="md-paper-translated" markdown="1">
우리는 source sentences의 단어를 역순으로 배치하는 것으로 얻은 향상의 정도에 놀랐다. 우리는 단기 종속성이 학습 문제를 더 쉽게
만들어주기 때문에 가장 많은 단기 종속성을 갖는 encoding 문제를 찾는 것이 중요하다고 결론을 내린다.<br/>
특히, 역순이 아닌 번역 문제에서 standard RNN을 학습할 수 없었지만([fig. 1](#figure-1)에서 보임), standard RNN도
source sentence가 역순으로 된 경우 쉽게 학습 할 수 있을 것이라 믿는다. (실험적으로 증명해보진 못했다)
</div>

<div class="md-paper-origin" markdown="1">
We were also surprised by the ability of the LSTM to correctly translate very long sentences. We were initially convinced that the LSTM would fail on long sentences due to its limited memory, and other researchers reported poor performance on long sentences with a model similar to ours [5, 2, 26]. And yet, LSTMs trained on the reversed dataset had little difficulty translating long sentences.
</div>
<div class="md-paper-translated" markdown="1">
우린 또한 LSTM이 매우 긴 문장도 올바르게 번역하는 능력에 놀랐다.<br/>
우리는 초기에는 LSTM의 제한된 메모리와 우리의 것[5, 2, 26]과 유사한 긴 문장에 대한 다른 연구자들의 모델의 저성능 결과들 때문에
LSTM이 긴 문장 번역에 실패할 것이라 확신했었다.<br/>
그리고 아직, 역순의 dataset을 학습하는 LSTM은 긴 문장을 번역하는 것에 약간의 어려움을 가지고 있다.
</div>

<div class="md-paper-origin" markdown="1">
Most importantly, we demonstrated that a simple, straightforward and a relatively unoptimized approach can outperform an SMT system, so further work will likely lead to even greater translation accuracies. These results suggest that our approach will likely do well on other challenging sequence to sequence problems.
</div>
<div class="md-paper-translated" markdown="1">
가장 중요한 점으로, 우리는 단순하고 간단하고 상대적으로 덜 최적화된 접근법이 SMT 시스템의 성능을 뛰어넘는 다는 것을 증명했다.
그리고 앞으로는 번역 정확도가 더 높아질 것이다. 이 결과들은 우리의 접근법이 다른 도전적인 sequence to sequence 문제에서도
좋은 결과를 낼 것임을 시사한다.
</div>

# 6 Acknowledgements

<div class="md-paper-origin" markdown="1">
We thank Samy Bengio, Jeff Dean, Matthieu Devin, Geoffrey Hinton, Nal Kalchbrenner, Thang Luong, Wolfgang Macherey, Rajat Monga, Vincent Vanhoucke, Peng Xu, Wojciech Zaremba, and the Google Brain team for useful comments and discussions.
</div>
<div class="md-paper-translated" markdown="1">
유용한 코멘트와 토의를 해준 Samy Bengio, Jeff Dean, Matthieu Devin, Geoffrey Hinton, Nal Kalchbrenner, Thang Luong,
Wolfgang Machery, Rajat Monga, Vincent Vanhoucke, Peng Xu, Wojciech Zaremba, and the Google Brain team에 감사를 표한다.
<span class="md-monologue">이야.. 멋진 이름들이다..</span>
</div>

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
[^beam-search]: beam search: 트리를 탐색하는 기법 중 하나. Ref. <https://velog.io/@nawnoes/%EC%9E%90%EC%97%B0%EC%96%B4%EC%B2%98%EB%A6%AC-Beam-Search>
[^non-monotonic]: 추론의 특성을 나타내는 말. 일반적으로 삼단논법(A이면 B이다. B이면 C이다. 따라서 A이면 C이다.) 처럼 사실이 주어지면 그에 따라 새로운 정리가 도출되고 또 이 도출된 정리로 인해 다른 정리 또는 사실이 나타내는 것을 '단조(Monotonic)하다'라고 한다. 이처럼 단조적인 경우 어 '참'인 공리가 줄어들지 않는데 반해, 비단조(Non-Monotonic)는 연역적이지 않음을 의미하며 이미 밝혀진 사실이나 새로운 정리가 더이상 효력이 없을 수 있음을 뜻한다. '새는 날 수 있다'라는 정리에서 죽은 새는 날 수 없으므로 '만약(What if) 죽은 새가 아니라면 새는 날 수 있다' 와 같은 추론이 비단조적 추론이 된다. Ref. <http://www.aistudy.co.kr/expert/inference_lee.htm#_bookmark_1d3dab8>, <http://www.aistudy.co.kr/reasoning/nonmonotonic_reasoning.htm>
[^perplexity]: perplexity: 언어 모델 성능 측정 지표 중 하나로 모델이 내놓은 답의 혼란한 정도를 표현. 언어 모델이 테스트 문장에 대한 답에 확신(probability)을 가질수록 혼란도(perplexity)는 낮아진다. 자주 사용되는 혼란도 계산식은 다음과 같다. $$N$$개의 단어 $$w_1, w_2, ..., w_N$$로 이루어진 문장 $$W$$에 대한 모델의 perplexity(혼란도)($$PPL$$)는 $$PPL(W)=\sqrt[N]{\frac{1}{P(w_1, w_2, ..., w_N)}}$$ 이다. Ref. <https://towardsdatascience.com/perplexity-in-language-models-87a196019a94>
[^multi-bleu-pl1]: multi-bleu.pl1: 몇개의 변이형 BLEU 점수가 있고 각 변이형은 perl script로 정의된다.
