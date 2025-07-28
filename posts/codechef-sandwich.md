---
title: Long Sandwich - Codechef SANDWICH
date: '2021-04-30T22:03:31+06:00'
author: steinum
authorTwitter: ''
cover: ''
tags:
  - combinatorics
  - crt
  - lucas theorem
  - number theory
  - legendre's formula
  - counting
  - codechef
keywords:
  - ''
  - ''
description: ''
showFullContent: false
---

It has two parts to this problem. You are given $n$ and $k$. You have to tell the minimum number of pieces, $a$, you can cut a sandwich of length $n$ such that the length of no piece is greater than $k$.

The answer is quite simple, isn't it ?

{{< spoiler text="Answer of the first part" >}}
$a = \lceil \frac{n}{k} \rceil$
{{< /spoiler >}}

The second part is, how many ways we can cut the sandwich into $a$ pieces such that the length of no piece is greater than $k$. You have print the answer under modulo $m$, for a given $m$.

{{< spoiler text="Hint for the second part" >}}
`Stars and Bars Theorem`
{{< /spoiler >}}

## Inside Math:
Suppose, we have exactly $ak$ length of sandwich. How many ways are there to cut the sandwich ? Answer : 1.

Now, we have some $extra = ak-n$ length of sandwich , which we have to subtract.

Now, the problem turns into: **how many ways we can cut a sandwich of length, $extra$, into $a$ pieces.** [Because if in one way we can cut $p$ length of sandwich for the $i$'th piece, we can actually subtract $p$ from the $i$'th piece in the previous solution].

Hence, our solution is $\binom{extra + a - 1}{a - 1}$ [Directly from stars and bars theorem].

## Subtask 1:

- $1\le n,k \le 50$
- $2 \le m \le 10^{6}$

We can directly calculate our solution with dp.

{{< code language="cpp" title="Long Sandwich: subtask 1" id="1" expand="Show" collapse="Hide" isCollapsed="false" codelink="https://raw.githubusercontent.com/st3inum/blog/master/codes/codechef/SANDWICH_1.cpp">}}{{< /code >}}

## Subtask 3:

- $1\le n,k \le 10^{18}$
- $2 \le m \le 10^{6}$ and $m$ is a prime number.

In this case we can calculate the value of $\binom{n}{r}$ with lucas theorem.

{{< code language="cpp" title="Long Sandwich: subtask 3" id="3" expand="Show" collapse="Hide" isCollapsed="false" codelink="https://raw.githubusercontent.com/st3inum/blog/master/codes/codechef/SANDWICH_3.cpp">}}{{< /code >}}

## Subtask 4:

- $1\le n,k \le 10^{18}$
- $2 \le m \le 10^{6}$

In this case, at first, we will calculate $\binom{n}{r}$ modulo prime power. Then merge them up with `CRT` and get the value of $\binom{n}{r}$ modulo an arbitrary number.

To calculate $\binom{n}{r}$ (mod $p^{k}$) [$p$ is a prime number and $k>0$], we will calculate $n!$ (mod $p^{k}$) , but ignoring all occurrences of $p$.

Now let's define some function/variables.

- $F_{n} = \prod_{i = 1 , p\nmid i}^{n}{i}$ (mod $p^{k}$)
- $L(n) = $ max $k$ such that $p^k \mid n!$ [with Legendre's Formula]
- $f(n)$ = $\frac{n!}{p^{L(n)}}$ (mod $p^{k}$)

### Calculate $L(n)$:
$L(n) = \sum_{i=1}^{\infty}{\lfloor \frac{n}{p^{i}} \rfloor}$ [known as Legendre's Formula]

### Calculate $f(n)$:
$ f(n) = \begin{cases} 1 \text{ , if $n=0$} \newline F_{p^{e}}^{\lfloor \frac{n}{p^e} \rfloor} \times F_{n \text{ (mod $p^e$)}} \times f(\lfloor \frac{n}{p} \rfloor) \text{ , if $n \neq 0$} \end{cases}$

### Calculate $\binom{n}{r}$:
$\binom{n}{r} = \frac{f(n)}{f(r)\times f(n-r)} \times p^{L(n)-L(r)-L(n-r)}$

Now, the remaining part is to merge all answer from $p^k$ [$p^k\mid m$ and $p^{k+1}\nmid m$] with `CRT` .

{{< code language="cpp" title="Long Sandwich: subtask 4" id="4" expand="Show" collapse="Hide" isCollapsed="false" codelink="https://raw.githubusercontent.com/st3inum/blog/master/codes/codechef/SANDWICH_4.cpp">}}{{< /code >}}

<!-- next implementation for big prime modulo, koosaga blog -->

## Reference:

- [Codechef - SANDWICH](https://www.codechef.com/problems/SANDWICH)
- [Stars and Bars Theorem](https://forthright48.com/stars-and-bars-theorem)
- [CRT - Chinese Remainder Theorem](https://forthright48.com/chinese-remainder-theorem-part-1-coprime-moduli/)
- [Lucas' Theorem](https://brilliant.org/wiki/lucas-theorem/)
- [Legendre's Formula](https://en.wikipedia.org/wiki/Legendre%27s_formula)
- [Emaxx : Binomial Coefficients](https://cp-algorithms.com/combinatorics/binomial-coefficients.html)