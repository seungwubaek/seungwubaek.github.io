---
layout: single
title: "Hadoop의 구성 요소와 특징"
date: "2021-09-21 22:55:00 +0900"
last_modified_at: "2021-09-24 18:42:00 +0900"
---
이 포스트에서는 Hadoop에 대해 직관적으로 이해하기 위해 Hadoop 고유의 특징에 대해 간략히 알아보고
RDB와 같은 기존의 데이터 보관 및 처리 솔루션과 어떤 차이를 가지는지 생각해 본다.

이하 설명은 Hadoop v2 를 기준으로 한다.

## Hadoop

Hadoop이란 다양한 형태의 대규모 데이터를 저장하고 가공하는 작업을 단일 장치가 아닌 여러대의 장치를 이용한
분산 컴퓨팅 기술로 처리하는 기능을 제공하는 빅데이터 솔루션이며 오픈소스 프레임워크이다.<br/>
특히, 단일 장치에 데이터를 저장하는 것 보다 높은 안정성이 보장되고 단일 장치에서 데이터를 가공하는 것 보다
빠른 성능을 발휘할 수도 있기 때문에 세상 사람들에게 널리 사랑받는다.

## Hadoop Ecosystem

아래 그림은 Hadoop Ecosystem을 표현한 그림이다.<br/>
Hadoop이 실제로 활용될때는 Hadoop의 코어 구성 요소인 HDFS, MapReduce & YARN 뿐만 아니라 다른 요소들이 함께 유기적으로 연동되어 활용된다.

Hadoop Ecosystem은 Hadoop과 Hadoop을 기반으로 연동되는 다양한 Framework, Tool들을 모두 포함하여 지칭하는 용어이다.<br/>
일반적으로 Hadoop이라 하면 Hadoop Ecosystem 전부 또는 Hadoop의 Core 구성 요소와 Hadoop Ecosystem의 일부 요소를 함께 의미한다고 보는게 좋다.

![Hadoop Architecture]({{site.gdrive_url_prefix}}1h579FKfIFAbUCUMrYcPPRsg6GvMrFP1g){:style="max-height: 500px;"}
{:style="margin-bottom: 0;" class="img-popup" data-title="Ref. <a href='https://www.edureka.co/blog/hadoop-ecosystem'>https://www.edureka.co/blog/hadoop-ecosystem</a>"}
<div style="font-size: .75em;" markdown=1>
Ref. <https://www.edureka.co/blog/hadoop-ecosystem>
</div>

## 특징

### Distributed Architecture

Hadoop 시스템은 여러개의 물리적 노드들이 하나의 Cluster로 묶인 구조를 취하고 있으며,
하나의 작업을 처리하기 위해 Cluster를 구성하는 노드들이 작업의 부하를 분산하여 담당한다.<br/>
Hadoop에서의 작업은 주로 데이터 I/O 작업과 Map-Reduce 방식의 컴퓨팅 작업을 의미한다.

Hadoop 분산 구조를 이용하면 비교적 적은 비용이 드는 여러대의 Low Performance Machine들로
단일 High Performance Machine 이상의 성능을 발휘 할 수 있다.<br/>
이 세상에는 단일 High Performance Machine으로 감당할 수 없는 빅데이터가 수없이 많으므로 이러한 분산 구조가 더욱 빛을 발한다.

극단적인 예를 들어 바닷가의 모래알 개수 세기를 한다고 하면, 수학 박사 한명 보다 일반인 100명이 나은 이치이다.<br/>
<span class="md-monologue">ㅋㅋ...헤비한 File I/O나 단순 반복 처리가 여러번 발생하고
Data Aggregation으로 이어지는 작업을 표현해보고 싶었다ㅋㅋ</span>

그리고 Hadoop 시스템을 구성하는 노드들은 노드 별로 또는 노드의 프로세스 별로 각자 다른 혹은 같은 역할을 수행한다.<br/>
그 역할이란 NameNode, DataNode, Resource Manager, Node Manager, Zoo Keeper Cluster 등의 프로세스들을 의미한다.
Hadoop과 Hadoop Ecosystem을 구성하는 모든 노드들은 이러한 프로세스들을 1개 이상 포함하고 있다.

### Scalability

Hadoop Cluster는 Scale Out 하여 Cluster의 규모를 확장하고 분산 성능을 향상 시킬 수 있다.
Hadoop Version 2 기준으로 하나의 Cluster에서 물리적인 노드를 최대 수천~1만대까지 확장할 수 있다.

### Unstructured Data

일반적으로 데이터 저장과 처리라고 하면 RDB(Relational Database)와 SQL이 떠오른다.
RDB의 엔진은 SQL 기반의 테이블 스키마에 따라 데이터를 체계적이고 효율적으로 장치에 저장하며,
SQL Query를 이용해서 데이터를 조회하고 가공 할 수 있다.

그러나 Hadoop을 이용하면 RDB 처럼 데이터가 정형화(스키마를 가진 2D 테이블 형태의 데이터 등) 되어 있을 필요가 없다.
아래에서 설명할 HDFS를 써본 사람은 알겠지만 임의로 작성한 txt 파일이든, excel 파일이든 zip 파일이든 HDFS에 넣으면 다 들어간다.<br/>
그리고 Hadoop Ecosystem을 이용하여 비정형 데이터를 가공할 수 있고 RDB 처럼 정형 데이터 역시 저장하고 가공 할 수 있다.

## HDFS

### Distributed File System

Hadoop의 코어 기능 중 하나인 HDFS(Hadoop Distributed FileSystem)는 하나의 데이터를 여러개의 블록(Block)으로 쪼개서
여러대의 노드에 분산 저장하는 기능이다.<br/>
블록은 기본적으로 128MB 크기를 가진다. 물론 변경 가능하다.

HDFS는 자바 언어를 기반으로 개발되었다. 따라서 자바 언어를 지원하는 머신이라면
(Java 프로그램이 Java Virtual Machine 위에서 돌아가기 때문에) HDFS를 활용할 수 있다.

아래 그림에서 노란색 사각형은 물리적인 노드를 의미한다. 그리고 그 안에는 블록(초록색 사각형)들이 들어있다.<br/>

![HDFS Architecture]({{ site.gdrive_url_prefix }}1_9-vZsCFjknEUGBR8bBN8K03eXWre2x7){:style="max-height: 450px;"}
{:style="margin-bottom: 0;" class="img-popup" data-title="Ref. <a href='https://hadoop.apache.org/docs/r2.7.2/hadoop-project-dist/hadoop-hdfs/HdfsDesign.html'>https://hadoop.apache.org/docs/r2.7.2/hadoop-project-dist/hadoop-hdfs/HdfsDesign.html</a>"}
<div style="font-size: .75em;" markdown=1>
"HDFS Architecture" Ref. <https://hadoop.apache.org/docs/r2.7.2/hadoop-project-dist/hadoop-hdfs/HdfsDesign.html>
</div>

HDFS를 사용하려는 Client(주황색 타원)들은 NameNode(초록색 둥근 모서리 사각형)에 자신이 원하는 파일의 위치를 요청하고
NameNode가 Client에게 해당 파일이 어떤 DataNode에 있는지 알려준다.
그러면 Client는 다시 해당 DataNode에게 그 파일을 요청한다.

### Replication

HDFS는 데이터 손상 및 유실을 방지하기 위해 Block 단위로 복사본을 만들어서 1대 이상의 다른 노드에 추가로 저장해 둘 수 있다.<br/>
따라서 특정 파일의 Block을 가진 노드가 Disk 손상, 침수 등으로 데이터를 유실한 경우
다른 노드에 있는 복사본으로 유실된 Block들을 대체 할 수 있기 때문에 데이터 저장 측면에서 단일 머신보다 안정적이다.

### High Availability

HDFS에서 모든 데이터의 위치를 알고있는 NameNode가 어떤 이유로 인해 중단되었을 경우 HDFS는 그 기능이 완전 정지된다.<br/>
HDFS는 이러한 서비스 중단 사태를 막기위해 대기하고 있던 예비 NameNode로 중단된 NameNode를 대체하여 운영한다.<br/>
이렇듯 예상치 못한 사태로 NameNode가 정지해도 무중단 운영되므로 HDFS의 User는 운영의 연속성을 어느정도 보장받을 수 있다.

## MapReduce & YARN

### MapReduce

Hadoop은 데이터 I/O 뿐만 아니라 분산 노드들의 H/W 자원을 활용하여 Computing 작업도 수행할 수 있다.
이를 위한 Hadoop의 코어 기능이 MapReduce이다.<br/>
Hadoop의 MapReduce 기능은 노드들의 자원을 고려하여 가용한 노드들을 선별하고
하나의 처리 단위를 선별된 여러대의 노드에서 각각 수행한 후(Map), 각 결과를 모아 집계(Reduce)하는
기능을 의미한다.

[Distributed Architecture](#distributed-architecture)에서 예로 들었던 바닷가 모래알 개수 세기가 여기에 해당하는 작업이다.<br/>
100명이 각자 바닷가의 구역을 나눠 모래알 개수를 센다(Map). 셈이 끝나면 100명이 센 개수를 모두 더한다(Reduce).<br/>
그러면 우리는 바닷가 모래알의 총 개수를 알 수 있다.

만약 사람들 모두 모래알을 세는 속도가 동일하고 전체 구역을 100명이 균등하게 나눠 가졌다고 가정하면, 모래알을 모두 세는데 걸리는 시간은<br/>
`(1명의 사람이 자신이 맡은 구역을 세는데 걸리는 시간) + (100명의 기록을 모두 더하는 시간)`<br/>
만큼 소모된다.<br/>
아래와 같이 좀 더 세밀하게 가정하면

```yaml
전체 모래알 개수: 1000개
모래알 1개 세는데 걸리는 시간: 1초
100명의 기록을 모두 더하는 시간: 1초
```

1명이 전체 모래알을 세는데 걸리는 시간은 `1000초` 이지만,
100명이 전체 모래알을 세는데 걸리는 시간은 1명 당 10개만 세고(`10초`) 모두 더하면(`1초`) 되므로 `11초`가 소요된다.

따라서 이런 경우에는 1명이 모래알을 모두 세는 것보다 100명이 세는 것(Distributed Computing)이 훨씬 빠르다.<br/>
또한 인원수를 늘리면(Scale Out) 그만큼 선형적으로 더 빨라진다.<br/>
이것이 바로 분산 환경의 위력이다.

### YARN

그런데 Hadoop Version 1에서는 노드들의 자원 관리와 MapReduce 작업 할당을 하나의 노드가 모두 맡아 처리하였고
MapReduce 작업 또한 효율적이지 못해서 병목 지점이 존재했다(<https://wikidocs.net/26170>)<br/>
그래서 그 해결을 위해 YARN(Yet Another Resource Negotiator)이 개발 되었다.

Hadoop의 코어 기능인 YARN은 고도화된 MapReduce 기능이다.<br/>
노드들의 자원 관리는 Resource Manager, Node Manager에게 담당하도록 하고
MapReduce 작업 수행은 Application Master가 담당하도록 해서
하나의 작업(Job)에서 발생하는 부하를 더 효율적이고 유연하게 노드들에게 분산시켰다.

#### YARN Architecture
{:.no_toc}

![YARN Architecture]({{ site.gdrive_url_prefix }}1_zKjAjWptSx_CviaG9Rfd1lrIKcwdNUZ){:style="max-height: 450px;"}
{:style="margin-bottom: 0;" class="img-popup" data-title="Ref. <a href='https://hadoop.apache.org/docs/r2.7.2/hadoop-yarn/hadoop-yarn-site/YARN.html'>https://hadoop.apache.org/docs/r2.7.2/hadoop-yarn/hadoop-yarn-site/YARN.html</a>"}
<div style="font-size: .75em;" markdown=1>
"YARN Architecture" Ref. <https://hadoop.apache.org/docs/r2.7.2/hadoop-yarn/hadoop-yarn-site/YARN.html>
</div>

YARN의 작동 과정은 아래와 같다. 아래 과정을 읽으면서 위 그림을 함께 참고하자.

1. Client는 YARN Resource Manager(이하 RM)에 특정 Job 수행을 요청(Submission)한다.<br/>
   그림에서는 2개의 Job(빨간색, 보라색)이 요청되고 처리되는 과정이 표현되고 있다.
2. Resource Manager는 노드(Worker)들 중 한 곳에 Application Master(이하 AM)를 실행시킨다. AM은 Client의 Job에 대응된다.
3. AM은 Job을 수행하기 위해서 RM에게 Job을 수행할 자원을 요청한다.
4. RM은 AM의 자원 요청을 받으면 Node Manager들을 통해 노드들의 자원 상태를 확인한 후 AM에게 Container를 할당해준다.<br/>
   이때 Container는 AM이 실행되고 있는 노드와 별개로 여러개의 노드들에서 1개 이상 생성될 수 있다.
5. Container는 명령에 따라 MapReduce Task(하나의 Job을 쪼갠 작은 작업 단위)를 수행한다.

<div class="md-reference" markdown=1>
* <https://hadoop.apache.org/>
* <https://hadoop.apache.org/docs/r2.7.2/hadoop-project-dist/hadoop-hdfs/HdfsDesign.html>
* <https://yeomko.tistory.com/38#:~:text=HDFS%EB%8A%94%20%ED%8C%8C%EC%9D%BC%EC%9D%84%20%EB%B6%84%EC%82%B0,%EC%97%90%20%EC%A0%80%EC%9E%A5%EB%90%9C%20%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%A5%BC%20%EB%A7%90%ED%95%A9%EB%8B%88%EB%8B%A4.>
* <https://m.blog.naver.com/jevida/221727337500>
* <https://hadoop.apache.org/docs/r2.7.2/hadoop-yarn/hadoop-yarn-site/YARN.html>
* <https://wikidocs.net/22654>
* <https://wikidocs.net/26170>
* <https://sites.google.com/site/medialoghadoop/01-hadub-gicho/01-hadub-salpyeobogi>
* <https://ggoals.tistory.com/76>
</div>
