---
layout: single
title: "논문 해석 - Sequence to Sequence Learning with Neural Networks"
date: "2021-06-20 11:34:00 +0900"
last_modified_at: "2021-06-20 11:34:00 +0900"
---
본 포스트는 논문 Sequence to Sequence Learning with Neural Networks를 한국어로 번역하고
필요한 경우 이해를 돕기 위해 보충 설명하는 포스트이다.

<div class="notice--warning" markdown=1>
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
비교해 보면, 구문 기반 SMT 시스템은 같은 dataset에서 BLEU score 33.3을 기록했다.<br/>
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
There have been a number of related attempts to address the general sequence to sequence learning problem with neural networks. Our approach is closely related to Kalchbrenner and Blunsom [18] who were the first to map the entire input sentence to vector, and is related to Cho et al. [5] although the latter was used only for rescoring hypotheses produced by a phrase-based system. Graves [10] introduced a novel differentiable attention mechanism that allows neural networks to focus on different parts of their input, and an elegant variant of this idea was successfully applied to machine translation by Bahdanau et al. [2]. The Connectionist Sequence Classification is another popular technique for mapping sequences to sequences with neural networks, but it assumes a monotonic alignment between the inputs and the outputs [11].
</div>
<div class="md-paper-translated" markdown="1">
</div>

![Figure 1. Our model]({{ site.gdrive_url_prefix }}1cuoZQXYLpsKSUzBgzYCuBtbMlEemk12p)

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
