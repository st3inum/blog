---
title: Team Work - Codeforces 932E
date: '2021-04-23T15:01:22+06:00'
author: steinum
authorTwitter: ''
cover: ''
tags:
  - codeforces
  - combinatorics
  - stirling numbers
  - dp
  - lagrange interpolation
keywords:
  - stirling numbers
  - binomial theorem
description: Sum binomial-weighted powers using Stirling numbers or DP
showFullContent: false
---

## Problem:

For given $n$ and $k$, calculate:

$$
\sum_{r=1}^{n}{\binom{n}{r}r^k}
$$

under modulo $1000000007$.

Here $n\le 10^9,\ k\le 5000$.

## Solution 1: Stirling Numbers

We know:

$$
r^k=\sum_{j=0}^{k}{\left\{ {k \atop j} \right\}r^{\underline j}}
$$

where $\left\{ {k \atop j} \right\}$ is Stirling number of second kind and

$$
r^{\underline j}=r(r-1)\dots(r-j+1)
$$

Then:

\begin{align}
\sum_{r=0}^{n}{\binom{n}{r}r^k}
&=\sum_{r=0}^{n}{\binom{n}{r}\sum_{j=0}^{k}{\left\{ {k \atop j} \right\}r^{\underline j}}} \newline
&=\sum_{j=0}^{k}{\left\{ {k \atop j} \right\}\sum_{r=0}^{n}{\binom{n}{r}r^{\underline j}}} \newline
&=\sum_{j=0}^{k}{\left\{ {k \atop j} \right\}n^{\underline j}2^{n-j}}
\end{align}

So just calculate Stirling numbers with:

$$
\left\{ {i \atop j} \right\}=j\left\{ {i-1 \atop j} \right\}+\left\{ {i-1 \atop j-1} \right\}
$$

{{< code language="cpp" title="Solution 1: Stirling Numbers" id="1" expand="Show" collapse="Hide" isCollapsed="false" codelink="https://raw.githubusercontent.com/st3inum/blog/master/codes/codeforces/932e-stirling.cpp">}}{{< /code >}}

## Solution 2: Differentiation DP

Let:

$$
f(x)=(1+x)^n=\sum_{r=0}^{n}{\binom{n}{r}x^r}
$$

Then the answer is:

$$
\left(x\frac{d}{dx}\right)^k f(x)\Big|_{x=1}
$$

Now:

$$
x\frac{d}{dx}\left(x^b(1+x)^c\right)
=bx^b(1+x)^c+cx^{b+1}(1+x)^{c-1}
$$

Maintain coefficient of $x^j(1+x)^{n-j}$ after $i$ operations:

$$
dp_i[j]=jdp_{i-1}[j]+(n-j+1)dp_{i-1}[j-1]
$$

Final answer:

$$
\sum_{j=1}^{k}{dp_k[j]2^{n-j}}
$$

{{< code language="cpp" title="Solution 2: Differentiation DP" id="2" expand="Show" collapse="Hide" isCollapsed="false" codelink="https://raw.githubusercontent.com/st3inum/blog/master/codes/codeforces/932e-dp.cpp">}}{{< /code >}}

## Solution 3: Lagrange

From solution 1:

$$
ans(n,k)=2^nP_k(n)
$$

where $P_k(n)$ is a polynomial of degree $k$.

So we can calculate $P_k(0),P_k(1),\dots,P_k(k)$ by any $O(k^2)$ way and interpolate $P_k(n)$.

## Reference:

- [Codeforces 932E - Team Work](https://codeforces.com/problemset/problem/932/E)
- [Codeforces blog comments](https://codeforces.com/blog/entry/57796)
