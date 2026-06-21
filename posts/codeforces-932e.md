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
  - ntt
keywords:
  - stirling numbers
  - binomial theorem
description: Sum binomial-weighted powers using Stirling numbers, DP, or Lagrange interpolation
showFullContent: false
---

## Problem:

For given $n$ and $k$, calculate:

$$
\sum_{r=1}^{n}{\binom{n}{r}r^k}
$$

under modulo $1000000007$.

Here $n\le 10^9,\ 1\le k\le 5000$.

## Solution 1: Stirling Numbers

We know:

$$
r^k=\sum_{j=0}^{k}{S(k,j)F(r,j)}
$$

where $S(k,j)$ is Stirling number of second kind and

$$
F(r,j)=r(r-1)\dots(r-j+1)
$$

Then:

$$
\sum_{r=0}^{n}{\binom{n}{r}r^k}
=\sum_{r=0}^{n}{\binom{n}{r}\sum_{j=0}^{k}{S(k,j)F(r,j)}}
$$

$$
=\sum_{j=0}^{k}{S(k,j)\sum_{r=0}^{n}{\binom{n}{r}F(r,j)}}
$$

$$
=\sum_{j=0}^{k}{S(k,j)F(n,j)2^{n-j}}
$$

So just calculate Stirling numbers with:

$$
S(i,j)=jS(i-1,j)+S(i-1,j-1)
$$

This can also be extended with NTT. Since:

$$
S(k,j)=\frac{1}{j!}\sum_{i=0}^{j}{(-1)^{j-i}\binom{j}{i}i^k}
$$

the Stirling row can be calculated as convolution. So if polynomial size is $n$, this part becomes $O(n\log n)$; for this problem it means $O(k\log k)$.

{{< code language="cpp" title="Solution 1: Stirling Numbers" id="1" expand="Show" collapse="Hide" isCollapsed="false" codelink="https://raw.githubusercontent.com/st3inum/blog/master/codes/codeforces/932e-stirling.cpp">}}{{< /code >}}

## Solution 2: Differentiation DP

Let:

$$
f(x)=(1+x)^n=\sum_{r=0}^{n}{\binom{n}{r}x^r}
$$

Then the answer is:

$$
(x\frac{d}{dx})^k f(x)\Big|_{x=1}
$$

Now:

$$
x\frac{d}{dx}(x^b(1+x)^c)
=bx^b(1+x)^c+cx^{b+1}(1+x)^{c-1}
$$

Maintain coefficient of $x^j(1+x)^{n-j}$ after $i$ operations:

$$
dp(i,j)=jdp(i-1,j)+(n-j+1)dp(i-1,j-1)
$$

Final answer:

$$
\sum_{j=1}^{k}{dp(k,j)2^{n-j}}
$$

{{< code language="cpp" title="Solution 2: Differentiation DP" id="2" expand="Show" collapse="Hide" isCollapsed="false" codelink="https://raw.githubusercontent.com/st3inum/blog/master/codes/codeforces/932e-dp.cpp">}}{{< /code >}}

## Solution 3: Lagrange

From solution 1:

$$
ans(n,k)=2^nP_k(n)
$$

where $P_k(n)$ is a polynomial of degree $k$.

So we can calculate $P_k(0),P_k(1),\dots,P_k(k)$ by any $O(k^2)$ way and interpolate $P_k(n)$.

{{< code language="cpp" title="Solution 3: Lagrange" id="3" expand="Show" collapse="Hide" isCollapsed="false" codelink="https://raw.githubusercontent.com/st3inum/blog/master/codes/codeforces/932e-lagrange.cpp">}}{{< /code >}}

## Reference:

- [Codeforces 932E - Team Work](https://codeforces.com/problemset/problem/932/E)
