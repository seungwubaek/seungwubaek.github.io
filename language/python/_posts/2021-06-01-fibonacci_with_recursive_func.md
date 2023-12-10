---
layout: single
title: "Python 재귀함수(Recursive Function)로 피보나치(Fibonacci) 수열의 n번째 값을 반환하는 함수 구현"
date: "2021-06-01 17:03:00 +0900"
last_modified_at: "2021-06-08 22:56:00 +0900"
post-order: 3
redirect_from:
  - /computing/programming/python/fibonacci_with_recursive_func/
---
이 포스트는 Python 재귀 함수를 활용하여 피보나치 수열의 n번째 값을 반환하는 함수를 구현해본다.

```python
def fibo(n):
    if n <= 0: return 0
    elif n <= 2: return 1
    else: return fibo(n-1) + fibo(n-2)
```
