---
title: Prime Factor Love - Toph
date: '2021-04-22T02:31:20+06:00'
author: ''
authorTwitter: ''
cover: ''
tags:
  - sieve
  - harmonic lemma
  - number theory
  - toph
keywords:
  - ''
  - ''
description: Find sum of sum-of-divisor from 1 to n
showFullContent: false
---

## Problem Description:
- $mod = 1000009$

- $ [p] = \begin{cases} 1 \text{ if $p$ is true} \newline 0 \text{ if $p$ is not true} \end{cases}$

- $f(n) = \sum_{i=2}^{n-1}{[i|n]i}$

- $S(n) = \sum_{i=1}^{n}{f(i)}$ for a given n

- You need to find , sum of all prime factor of S(n)%mod

## Inside Math:

- We know , $\sigma_1(n) = \sum_{i=1}^{n}{[i|n]i}$

- $sum(n) = \sum_{i=1}^{n}{i}$

- $sum(l,r) = \sum_{i=l}^{r}{i}$

- Let assume , $ssod(n) = \sum_{i=1}^{n}{\sigma_1(i)}$ , ssod = sum of sum-of-divisor 

- We can represent $S(n) = ssod(n) - sum(n) - n + [n>=1]$

Now , if we can find $ssod(n)$ faster, we can solve the problem.

$\Longrightarrow ssod(n) = \sum_{i=1}^{n}{\sigma_1(i)}$

$\Longrightarrow ssod(n) = \sum_{i=1}^{n}{\sum_{j=1}^{i}{[j|i]j}}$

$\Longrightarrow ssod(n) = \sum_{i=1}^{n}{\sum_{j=1}^{n}{[j|i]j}}$

$\Longrightarrow ssod(n) = \sum_{i=j}^{n}{j \times \sum_{i=1}^{n}{[j|i]}}$

$\Longrightarrow ssod(n) = \sum_{i=j}^{n}{j \times \lfloor \frac{n}{j} \rfloor}$

Now there, might be $O(\sqrt{n})$ different values for $\lfloor \frac{n}{j} \rfloor$ [This is also known as [Harmonic lemma](https://st3inum.github.io/posts/uva-11526/)]. We will iterate over all such values of $\lfloor \frac{n}{j} \rfloor$ , and sum up there contribution. Thus we can calculate values for $ssod(n)$ in $O(\sqrt{n})$ and then for $S(n)$.

For the second part , we will maintain a sieve for values $[0,mod)$ and precalculate sum of prime factor of all the number in the range.


{{< code language="cpp" title="" id="1" expand="Show" collapse="Hide" isCollapsed="false" codelink="https://raw.githubusercontent.com/st3inum/blog/master/codes/toph/prime-factor-love.cpp">}}{{< /code >}}


## SPOJ - AFS2

Pretty much same problem.
{{< code language="cpp" title="AFS2" id="2" expand="Show" collapse="Hide" isCollapsed="true" codelink="https://raw.githubusercontent.com/st3inum/blog/master/codes/spoj/AFS2.cpp">}}{{< /code >}}

## Reference:

- [Toph - Prime Factor Love](https://toph.co/p/prime-factor-love)
- [SPOJ - AFS2 - Amazing Factor Sequence (medium)](https://www.spoj.com/problems/AFS2/en/)
- [Harmonic Lemma](https://codeforces.com/blog/entry/53925)

## Similar Problems:

- [LightOJ - A New Function](https://lightoj.com/problem/a-new-function)