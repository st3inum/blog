---
title: XETF - Codechef
date: '2021-05-02T18:43:17+06:00'
author: steinum
authorTwitter: ''
cover: ''
tags:
  - codechef
  - number theory
  - euler totient
  - sum of powers
  - inclusion exclusion
  - lagrange interpolation
  - pollard rho
  - miller rabin
keywords:
  - Euler totient function
  - sum of powers
description: Sum k-th powers of numbers coprime to n
showFullContent: false
---

## Problem:

For given $N$ and $K$, find

$$
E_K(N)=\sum_{1\le x\le N,\gcd(x,N)=1}{x^K}
$$

under modulo $1000000007$.

For $K=0$, this is exactly Euler's totient function.

{{< spoiler text="<b>Constraints</b>" >}}

- $1\le T\le 128$
- $1\le N\le 10^{12}$
- $0\le K\le 256$

{{< /spoiler >}}

## Inclusion Exclusion:

Let the distinct prime divisors of $N$ be:

$$
p_1,p_2,\dots,p_m
$$

A number $x$ is coprime to $N$ if it is not divisible by any of these primes.

So we can use inclusion-exclusion over the prime divisors of $N$.

Suppose we choose some subset of primes and their product is $d$.

Numbers $\le N$ divisible by $d$ are:

$$
d,2d,3d,\dots,\lfloor \frac{N}{d}\rfloor d
$$

Their $K$-th power sum is:

\begin{align}
d^K + (2d)^K + (3d)^K + \dots + (\lfloor \frac{N}{d}\rfloor d)^K
&= d^K(1^K+2^K+\dots+\lfloor \frac{N}{d}\rfloor^K)
\end{align}

Let's define:

$$
S_K(n)=\sum_{i=1}^{n}{i^K}
$$

Then:

$$
E_K(N)=\sum_{d}{(-1)^{cnt(d)}d^K S_K(\lfloor \frac{N}{d}\rfloor)}
$$

Here $d$ runs over all square-free products of distinct prime divisors of $N$, and $cnt(d)$ is the number of primes used in $d$.

## How to calculate $S_K(n)$:

For fixed $K$, $S_K(n)$ is a polynomial of degree $K+1$.

Since $K\le 256$, we can calculate:

$$
S_K(0),S_K(1),S_K(2),\dots,S_K(K+1)
$$

directly.

Then we use Lagrange interpolation to calculate $S_K(n)$ for any large $n$ in $O(K)$.

{{< spoiler text="<b>Why degree $K+1$?</b>" >}}

This is [Faulhaber's formula](https://en.wikipedia.org/wiki/Faulhaber%27s_formula).

For example:

- $S_0(n)=n$
- $S_1(n)=\frac{n(n+1)}{2}$
- $S_2(n)=\frac{n(n+1)(2n+1)}{6}$

In general, $\sum_{i=1}^{n}{i^K}$ becomes a polynomial in $n$ of degree $K+1$.

{{< /spoiler >}}

## Example:

For $N=10,K=1$, prime divisors are $2$ and $5$.

\begin{align}
E_1(10) &= S_1(10) - 2S_1(5) - 5S_1(2) + 10S_1(1) \newline
&= 55 - 2\times 15 - 5\times 3 + 10\times 1 \newline
&= 20
\end{align}

Which is same as $1+3+7+9=20$.

## Factorization:

We only need distinct prime divisors of $N$.

Here $N\le 10^{12}$, so trial division with primes up to $10^6$ can also work.

In my code I used Miller-Rabin + Pollard Rho/Brent factorization.

After getting distinct prime divisors, number of subsets is small. In fact, $10^{12}$ can not have too many distinct prime factors.

## Complexity:

Let $m$ be the number of distinct prime divisors of $N$.

- Factorization: fast enough with Pollard Rho
- Precompute $S_K(0\dots K+1)$: $O(K\log K)$ because of modular powers
- Inclusion-exclusion: $O(2^m\cdot K)$ because each subset needs one Lagrange evaluation

As $K\le 256$ and $m$ is small, this easily fits.

{{< code language="cpp" title="XETF - Codechef" id="1" expand="Show" collapse="Hide" isCollapsed="false" codelink="https://raw.githubusercontent.com/st3inum/blog/master/codes/codechef/XETF.cpp">}}{{< /code >}}

## Reference:

- [Codechef - XETF](https://www.codechef.com/problems/XETF)
- [Mandarin Chinese statement](https://www.codechef.com/download/translated/LTIME23/mandarin/XETF.pdf)
- [Russian statement](https://www.codechef.com/download/translated/LTIME23/russian/XETF.pdf)
