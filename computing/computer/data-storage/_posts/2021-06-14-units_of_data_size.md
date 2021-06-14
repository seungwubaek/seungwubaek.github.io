---
layout: single
title: "데이터 용량 단위"
date: "2021-06-14 22:31:00 +0900"
last_modified_at: "2021-06-14 22:31:00 +0900"
---
데이터 양을 표현하는 단위를 보다보면 `Kilobyte`와 `Kibibyte`와 같이 비슷하게 발음되는 표현을 보았을 것이다.
이 두 단위의 차이는 Decimal 단위와 Binary 단위의 차이에서 온 것이다.<br/>
이 포스트에서는 데이터 또는 정보의 양을 표현하는 단위에 대해 알아보고 `Kilobyte`와 `Kibibyte`의 차이에 대한 궁금증을 해소해본다.

## SI 단위

과거부터 우리에게 익숙한 `Kilo`(킬로), `Mega`(메가), `Giga`(기가) 등의 표현은 SI(Système international (d'unités) 국제 표준 단위계)에서
값의 규모가 소수점 아래 자릿수가 너무 많거나 너무 큰 숫자로 표현되지 않도록 하기위해 사용하는 SI 접두어들이다.<br/>
이런 표준화된 단위 계량 접두어는 값 비교를 용이하게 하고 가독성을 높여주는 등 인간 친화적으로 숫자를 이해하는데 도움을 준다.

10(Decimal)을 기초 단위로 해서 `Kilo`는 $$10^3$$(=1000)을 의미하며 `Kilo`를 기준으로
`Mega`는 $$1000^2$$, `Giga`는 $$1000^3$$으로 늘어난다.

예를들어, `1000000 Kg`(Kilo-gram)의 무게는 `1 Gg`(Giga-gram)으로 줄여서 표현 할 수 있다.

또한 데이터 양을 나타내는 `Byte`에 적용하여 `KB`(Kilo-Btye), `GB`(Giga-Byte)로 표현 할 수 있다.<br/>
마찬가지로 `1 KB`는 `1000 Byte`를 의미하고 `1 GB`는 `1000000 KB`를 의미한다. 좀 더 자세한 내용은
[단위 목록](#단위-목록) 섹션에서 살펴보도록 한다.

## IEC 단위

위 섹션 [SI 단위](#si-단위) 외에 IEC(International Electrotechnical Commission 국제 전기기술 위원회) 단위가 있다.<br/>
IEC가 SI와 다른 단위 접두어를 다시 제시한 이유는 SI 단위 접두어가 기초 단위 10(Decimal)을 바탕으로 제안되었으나
컴퓨터는 대부분 10을 기본 단위로 해서 작동하지 않는다는 점 때문이다.

하드웨어적으로나 정보이론적으로나 컴퓨터 연산은 10(Decimal)이 아닌 2(Binary, 이진)를 기초 단위로하여 수행된다.<br/>
즉, 컴퓨터 연산의 가장 작은 단위는 정보 1개(0 or 1)를 의미하는 `Bit` $$2^0$$(=1)이다.

추가로, `Bit`가 8개 모이면 오늘날의 `Byte`가 되고 256가지 정보($$2^8$$)를 표현할 수 있게 되는데
요즘엔 `1 Byte`를 기본 단위처럼 사용한다.

SI 단위 접두어에서는 `1000 Byte`를 `1 KB`(Kilobyte)라고 했는데 IEC 단위 접두어에서는
이에 대응하여 비슷한 규모의 값인 `1024 Byte`를 `1 KiB`(Kibibyte)로 한다.<br/>
1024는 이진법으로 $$2^{10}$$이고 `Bit` 10개를 의미하므로 SI 단위 보다 더 컴퓨터용 단위에 적합하다.

IEC 단위 접두어는 SI 단위 접두어와 쌍을 이루고 있고 `KiloByte`와 `KibiByte` 처럼 SI 단위 접두어에 `bi`를 붙여서 표현한다.<br/>
규모의 확장은 SI 단위 접두어의 패턴과 동일하게 `KibiByte`를 기준으로 `MebiByte`(메비 바이트)는 $$1024^2$$,
`GibiByte`(기비 바이트)는 $$1024^3$$으로 늘어난다.

## 단위 혼용과 오차

그런데 실세계에서는 `Kilobyte`를 `1000 Byte`가 아닌 `1024 Byte`라고 하거나
어떤 저장 장치의 용량을 표현할때 Decimal 단위와 Binary 단위를 혼용해서 사용하는 등
단위의 차이를 명확히 구분하지 않고 사용하곤 한다.

예를 들어 1.44MB 용량을 가지는 플로피 디스크의 경우 그 실제 용량을 `Byte` 단위로 계산해보면<br/>
SI(Decimal) 단위로 했을 때 $$1.44\times1000\times1000=1,440,000$$ Byte 일 것 같지만 그렇지 않으며,<br/>
IEC(Binary) 단위로 했을 때 $$1.44\times1024\times1024\approx 1,509,949$$ Byte 일 것 같지만 그렇지 않으며,<br/>
두가지가 혼용된 $$1.44\times1024\times1000=1,474,560$$ Byte 이다.

또한 SI와 IEC 단위 간 차이는 같은 규모 수준의 값을 표현하려고 할 때 규모가 커지면 커질수록 큰 오차를 발생시킨다.<br/>
예를 들어 테라 바이트 규모의 경우 `1 Terabyte`와 `1 Tebibyte` 사이에는 약 `100 Gigabyte` 또는 약 `93 Gibibyte` 정도로
무시 할 수 없는 수준의 차이가 있다.<br/>
따라서 이로부터 발생하는 오해를 줄이기위해 단위 사용을 명확히 하는 것이 좋다.

## 단위 목록

SI, IEC 단위 접두어의 규모와 그 설명은 아래와 같다.

<table>
<tr style="text-align: center;">
<td colspan="3">Decimal</td><td colspan="3">Binary</td>
</tr>
<tr style="text-align: center;">
<td>값</td><td colspan="2">단위</td><td>값</td><td colspan="2">단위</td>
</tr>
<tr>
<td>$$1000$$</td><td>KB</td><td>KiloByte (킬로바이트)</td><td>$$1024$$</td><td>KiB</td><td>KibiByte (키비바이트)</td>
</tr>
<tr>
<td>$$1000^2$$</td><td>MB</td><td>MegaByte (메가바이트)</td><td>$$1024^2$$</td><td>MiB</td><td>MebiByte (메비바이트)</td>
</tr>
<tr>
<td>$$1000^3$$</td><td>GB</td><td>GigaByte (기가바이트)</td><td>$$1024^3$$</td><td>GiB</td><td>GibiByte (기비바이트)</td>
</tr>
<tr>
<td>$$1000^4$$</td><td>TB</td><td>TeraByte (테라바이트)</td><td>$$1024^4$$</td><td>TiB</td><td>TebiByte (테비바이트)</td>
</tr>
<tr>
<td>$$1000^5$$</td><td>PB</td><td>PetaByte (페타바이트)</td><td>$$1024^5$$</td><td>PiB</td><td>PebiByte (페비바이트)</td>
</tr>
<tr>
<td>$$1000^6$$</td><td>EB</td><td>ExaByte (엑사바이트)</td><td>$$1024^6$$</td><td>EiB</td><td>ExbiByte (엑스비바이트)</td>
</tr>
<tr>
<td>$$1000^7$$</td><td>ZB</td><td>ZetaByte (제타바이트)</td><td>$$1024^7$$</td><td>ZiB</td><td>ZebiByte (제비바이트)</td>
</tr>
<tr>
<td>$$1000^8$$</td><td>YB</td><td>YottaByte (요타바이트)</td><td>$$1024^8$$</td><td>YiB</td><td>YobiByte (요비바이트)</td>
</tr>
</table>

<div class="md-reference" markdown=1>
* <https://en.wikipedia.org/wiki/Kilobyte>
* <https://ko.wikipedia.org/wiki/SI_%EC%A0%91%EB%91%90%EC%96%B4>
* <https://namu.wiki/w/SI%20%EC%A0%91%EB%91%90%EC%96%B4>
* <https://www.bbc.co.uk/bitesize/guides/zgmpn39/revision/4>
* <https://ko.wikipedia.org/wiki/%ED%82%A4%EB%B9%84%EB%B0%94%EC%9D%B4%ED%8A%B8>
* <https://en.wikipedia.org/wiki/Units_of_information>
* <https://ko.wikipedia.org/wiki/%EB%B0%94%EC%9D%B4%ED%8A%B8>
</div>
