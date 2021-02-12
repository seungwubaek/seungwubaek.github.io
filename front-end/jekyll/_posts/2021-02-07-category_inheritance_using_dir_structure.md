---
layout: single
title: "포스트를 종류별로 묶어 관리하기"
date: "2021-02-07 18:28:00 +0900"
last_modified_at: "2021-02-07 18:28:00 +0900"
---
Jekyll에서 포스트는 `_posts` 디렉토리에 생성되어야만 한다.
이때, `_posts` 보다 선행하는 디렉토리를 생성해서 포스트의 카테고리를 자동 정의하는 방법으로
포스트들을 종류별로 묶어서 관리할 수 있다.

## 포스트 카테고리

Jekyll의 포스트는 `category`와 `categories`라는 변수를 갖는다. 이 변수는 곧 포스트의 종류를 의미하기도 한다.

포스트에는 해당 포스트를 대표하는 1개 이상의 카테고리를 설정 할 수 있고
머리말에 아래처럼 작성하면 포스트에 카테고리를 정의해 줄 수 있다.

```yml
---
category: "카테고리1"
---
```

또는 1개 이상의 카테고리를 정의하려면 아래처럼 Array 형식으로 `categories` 변수에 카테고리를 정의해 줄 수도 있다.

```yml
---
categories: ["카테고리1"]
---
```

```yml
---
categories: ["카테고리1", "카테고리2", "카테고리3"]
---
```

## 카테고리를 디렉토리로 대체

위 섹션에서 포스트의 머리말에 해당 포스트의 카테고리를 정의해 줄 수 있었는데,
카테고리를 머리말에 정의하는 대신 디렉토리의 (다중) 구조를 생성해서 포스트의 카테고리 정의 방법을 대체하면
포스트를 종류별로 분리해서 관리할 수 있다.

포스트를 생성할 때 `_posts` 디렉토리 보다 선행하는 디렉토리를 두면 해당 디렉토리 이름으로 포스트의 카테고리가 자동으로 정의된다.

또 디렉토리 구조로 포스트를 분리 할 수 있으므로 포스트를 관리하기 용이해진다.

### 디렉토리 구조로 관리

예를 들어, `Front-End`에 속하는 포스트 `post1.md` 파일과 `Back-End`에 속하는 포스트 `post2.md` 파일이 있고
두 파일을 각각 `Front-End`와 `Back-End`로 분리해서 관리하고 싶다면 아래처럼 하면 된다.

포스트들을 `_posts` 디렉토리에 전부 넣는 것이 아니라
아래와 같이 `_posts` 디렉토리 보다 선행하는 디렉토리를 둔다.


* `_posts/post1.md` -> `front-end/_posts/post1.md`
* `_posts/post2.md` -> `back-end/_posts/post2.md`

그러면 포스트 `post1.md`에는 자동으로 `front-end` 카테고리가 생성되며 이는 아래와 같은 머리말이 있는 것과 같다.

```yml
---
categories: ["front-end"]
---
```

또 포스트 `post2.md`에는 `back-end` 카테고리가 생성되며 이는 아래와 같은 머리말이 있는 것과 같다.

```yml
---
categories: ["back-end"]
---
```

### 다중 디렉토리 구조로 관리

아래의 예처럼, 디텍토리 구조를 깊게 함으로써 포스트의 종류를 더욱 세분화 할 수 있다.

* `_posts/post1.md` -> `web/front-end/_posts/post1.md`
* `_posts/post2.md` -> `web/back-end/_posts/post2.md`

그러면 포스트 `post1.md`에는 자동으로 `web`, `front-end` 2가지 카테고리가 생성되며 이는 아래와 같은 머리말이 있는 것과 같다.

```yml
categories: ["web", "front-end"]
```

또 포스트 `post2.md`에는 `web`, `back-end` 카테고리가 생성되며 이는 아래와 같은 머리말이 있는 것과 같다.

```yml
categories: ["web", "back-end"]
```

## 팁

다중 디렉토리에서 상하위 상속 순서와 `categories` Array 변수에 오는 값의 순서는 항상 동일하다.

즉, `dir1/dir2/dir3/_posts/` 디렉토리에 있는 포스트는 항상 같은 순서의 원소로된 `categories: ["dir1", "dir2", "dir3"]` 변수를 갖는다.

우리는 이처럼 디렉토리 순서와 카테고리 순서의 동기화가 보장된다는 특성을 이용해서 목차를 만드는 등 다른 작업을 할 수도 있다.

목차를 만드는 과정은 [목차 만들기]({{ site.baseurl }}/blog/whole_toc/#page-title) 포스트를 참조하자.