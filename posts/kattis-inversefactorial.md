---
title: 'Hashing 1 : Inverse Factorial - Kattis inversefactorial'
date: '2021-05-08T20:13:49+06:00'
author: steinum
authorTwitter: ''
cover: ''
tags:
  - hashing
  - kattis
keywords:
  - Modular Arithmetic
  - ''
description: ''
showFullContent: false
---

>$$f(n)=n!$$

Given a value $x$ , find $f^{-1}{(x)}$ [that is, such $n$ so that $f(n)=x$].

{{< spoiler text="<b>Constraints</b>" >}}
number of digit in $x$ is atmost $10^{6}$
{{< /spoiler >}}

## Solution:

At first, this problem seems too hard.

Suppose, we have a [bijective function](https://en.wikipedia.org/wiki/Bijection) $H(p)$ which return some small integer value for corresponding $p$.

Hence, we can uniquely represent every $p$ by $H(p)$.

{{< spoiler text="<b>How to make $H(p)$</b>" >}}
>$H(p) = p \text{ (mod $m$)}$ [for a choosen $m$] \
>\
>But, this function is not bijective. That means it will give same output for different input. For example: $H(m+x) = H(2m+x) = ... = H(mk+x)$ , but $m+x,2m+x...,mk+x$ are different.\
>\
>Although it is not bijective, we can choose some good $m$ [different for different types of problem], to do better performance[The function becomes bijective for random domain].\
>\
>We can take a prime number as the value of $m$. It will be good.
{{< /spoiler >}}


Now, calculate $y = H(x) = x \text{ (mod m)}$.


Again, calculate $H(n!) = n! \text{ (mod m)}$ , for all $n \in [0,10^{6}]$. And check, if it matches with $y$.

Hence we can find $f^{-1}{(x)}$.

If we choose good $m$ , our probability of collision[that is $H(p)=H(q)$ while $p\neq q$] will be too much low.

If you don't know how to `mod`, read [this](https://st3inum.github.io/posts/intro-to-modular-arithmetic/) article.

{{< code language="cpp" title="Inverse Factorial" id="1" expand="Show" collapse="Hide" isCollapsed="false" codelink="https://raw.githubusercontent.com/st3inum/blog/master/codes/kattis/inversefactorial.cpp">}}{{< /code >}}

## Reference:

- [Kattis - inversefactorial](https://open.kattis.com/problems/inversefactorial)

## Similar Problems:
- [Am I a Fibonacci Number - Codechef](https://www.codechef.com/problems/AMIFIB)