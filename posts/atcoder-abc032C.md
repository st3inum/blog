---
title: AtCoder ABC-032 C
date: '2021-05-10T23:00:02+06:00'
author: steinum
authorTwitter: ''
cover: ''
tags:
  - 2-pointer
keywords:
  - ''
  - ''
description: ''
showFullContent: false
---

> Given an array $S$ of length $n$ and an integer $k$.\
>\
> Find maximum value of $(r-l+1)$ such that $\prod_{i=l}^{r}{S_{i}} \le k$

{{< spoiler text="<b>Constraints</b>" >}}
- $1\le n \le 10^{5}$

- $0\le k \le 10^{9}$

- $0\le S_{i} \le 10^{9}$
{{< /spoiler >}}

## Bruteforce Solution $O(n^2)$:

**If any value of $S$ is $0$ then the answer is $n$**

We call a segment $[l,r]$ `valid` if $\prod_{i=l}^{r}{S_{i}} \le k$

Loop over $l$ in range $[0,n-1]$ and $r$ in range $[l,n-1]$ and if $[l,r]$ is `valid` maximise it's length with our answer. It will pass subtask 1.

{{< code language="cpp" title="Bruteforce solution" id="1" expand="Show" collapse="Hide" isCollapsed="false" codelink="https://raw.githubusercontent.com/st3inum/blog/master/codes/atcoder/abc032_c_bruteforce.cpp">}}{{< /code >}}

**Don't go forward if you don't understand this code**.

## 2-Pointer Solution $O(n)$:

Let's define a function $H()$.

$H(l) = \text{ maximum value of $r$ such that $[l,r]$ is valid}$.

It is obvious that $H(l)\le H(l+1)$ [where $0\le l < n-1$].

So, it is unnecessary to loop over $r$ in range $[l,n-1]$.

It is enough to loop loop over $r$ in range $[H(l-1),n-1]$.

Hence the amortize complexity will be $O(n)$. This method is also known as 2-pointer.

{{< code language="cpp" title="2-pointer solution" id="2" expand="Show" collapse="Hide" isCollapsed="false" codelink="https://raw.githubusercontent.com/st3inum/blog/master/codes/atcoder/abc032_c.cpp">}}{{< /code >}}


**Carefully handle the overflow**.


## Reference:

- [AtCoder ABC-032 C](https://atcoder.jp/contests/abc032/tasks/abc032_c?lang=en)