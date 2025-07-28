---
title: Complex Tashreef - Toph
date: '2021-04-26T01:06:15+06:00'
author: steinum
authorTwitter: ''
cover: ''
tags:
  - digit dp
  - number theory
  - lucas theorem
  - divide and conquer
  - toph
keywords:
  - ''
  - ''
description: ''
showFullContent: false
---

## Statement:
In this problem you are asked to calculate : $\sum_{i=L}^{R}{\sum_{j=0}^{i}{[\binom{i}{j} \text{ (mod 2)} \equiv 0]}}$ , for given $L$ and $R$.

## Inside Math:
From the lucas' theorem we can state that, $\sum_{j=0}^{i}{[\binom{i}{j} \text{ (mod 2)}\equiv 1]} = 2^{f(i)}$ . [$f(i) = \text{ number of one in binary representation of } i$]


Suppose , $S(x) = \sum_{i=0}^{x}{\sum_{j=0}^{i}{[\binom{i}{j} \text{ (mod 2)} \equiv 0]}}$ . Hence , our answer will be $S(R)-S(L-1)$

Now,
\begin{align}
S(x) & = \sum_{i=0}^{x}{\sum_{j=0}^{i}{[\binom{i}{j} \text{ (mod 2)} \equiv 0]}} \newline
     & = \sum_{i=0}^{x}{(i+1) - 2^{f(i)}} \newline
     & = \sum_{i=0}^{x}{(i+1)} - \sum_{i=0}^{x}{2^{f(i)}} \newline
     & = \frac{(i+1)\times (i+2)}{2} - \sum_{i=0}^{x}{2^{f(i)}} \newline
\end{align}

Now the challenge is to calculate $\sum_{i=0}^{x}{2^{f(i)}}$

**How to do this ?**
{{< spoiler text="<b>Hint</b>" >}}
- digit dp
- divide and conquer
- ...
{{< /spoiler >}}

## Divide and Conquer solution:

{{< spoiler text="<b>Hint for divide and conquer</b>" >}}
print the values of $f(0),f(1),f(2),...f(10)...$
{{< /spoiler >}}

With some observation/math/googling we can find out that for any number $2^{k} - 1$ , $S(2^{k}-1) = 3^{k}$

Again , for any number $x$ , if $i$ is maximum number such that $2^{i}-1 < x$ , then we can write $S(x) = S(2^{i}-1) + 2 \times S(x - 2^i)$

{{< code language="cpp" title="Complex Tashreef : (Divide and Conquer)" id="1" expand="Show" collapse="Hide" isCollapsed="false" codelink="https://raw.githubusercontent.com/st3inum/blog/master/codes/toph/complex-tashreef.cpp">}}{{< /code >}}

To avoid **TLE** precalculate all values of $S(2^{i} - 1)$ and return them in function $S(n)$ directly.

## Reference:

- [Lucas' Theorem](https://brilliant.org/wiki/lucas-theorem/)
- [OEIS A001316](http://oeis.org/A001316)
- [Complex Tashreef - Intra AUST Programming Contest, Spring 2020](https://toph.co/p/complex-tashreef)