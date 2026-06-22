---
title: Berlekamp-Massey
date: '2021-05-01T11:27:08+06:00'
author: steinum
authorTwitter: ''
cover: ''
tags:
  - berlekamp massey
  - linear recurrence
  - kitamasa
  - dp
  - math
keywords:
  - Berlekamp Massey
  - linear recurrence
  - Kitamasa
description: Shortest linear recurrence with Berlekamp-Massey and nth term with Kitamasa
showFullContent: false
draft: false
---

Berlekamp-Massey finds the shortest linear recurrence from first few terms of a sequence.

In contests, the common pattern is:

$$
\text{small DP values}\longrightarrow\text{recurrence}\longrightarrow\text{large index}
$$

All formulas below are over a field. In code, this usually means modulo a prime.

## History:

Berlekamp introduced the algorithm while working on BCH error-correcting codes.

Massey later described the same idea through the shortest linear feedback shift-register.

The coding theory story is different, but the contest version is simple: guess the smallest recurrence consistent with known values.

## Problem:

Given:

$$
a_0,a_1,\dots,a_{N-1}
$$

Find the minimum $L$ and coefficients $c_i$ such that:

$$
a_n=\sum_{i=1}^{L}{c_i a_{n-i}}
$$

for every valid $n$ in the known prefix.

After that, calculate $a_k$ for large $k$.

## Brute Force:

For a fixed $L$, the unknowns are:

$$
c_1,c_2,\dots,c_L
$$

For each $n\ge L$:

$$
\sum_{i=1}^{L}{c_i a_{n-i}}=a_n
$$

Try $L=1,2,3,\dots$ and solve linear equations.

This is valid, but too slow.

Berlekamp-Massey performs this search implicitly in $O(N^2)$.

## Definition:

A connection polynomial is:

$$
C(x)=\sum_{i=0}^{L}{C_i x^i}
$$

with $C_0=1$.

It represents:

$$
\sum_{i=0}^{L}{C_i a_{n-i}}=0
$$

The recurrence coefficients are:

$$
c_i=-C_i
$$

## Lemma 1:

For a fixed $n$, define the discrepancy:

$$
d_n=\sum_{i=0}^{L}{C_i a_{n-i}}
$$

$C(x)$ is valid at position $n$ iff $d_n=0$.

Proof:

The recurrence condition is exactly:

$$
\sum_{i=0}^{L}{C_i a_{n-i}}=0
$$

So the left side is the error of $C(x)$ at $n$.

## Lemma 2:

Assume a previous polynomial $B(x)$ has discrepancy $b\ne0$ at an old failing position.

Let $m$ be the distance from that old position to the current position $n$.

If current discrepancy is $d\ne0$, define:

$$
C'(x)=C(x)-\frac{d}{b}x^mB(x)
$$

At position $n$:

$$
\sum_i{C'_i a_{n-i}}
=d-\frac{d}{b}b
=0
$$

The shift $x^m$ makes the correction start at the current failure, so previously fixed positions remain fixed.

This is the main update of BM.

## Lemma 3:

Let current recurrence length be $L$ and the current failing index be $n$.

After applying the correction, the new length is:

$$
L'=\max(L,n+1-L)
$$

So the length grows only when:

$$
2L\le n
$$

In that case:

$$
L\gets n+1-L
$$

The old polynomial becomes the new backup $B$.

Side note:

The backup is the last polynomial that was strong enough to increase the lower bound on the answer.

## Theorem:

After processing $a_0,a_1,\dots,a_{N-1}$, Berlekamp-Massey returns the shortest valid connection polynomial for this prefix.

Proof sketch:

- Lemma 1 tells whether the current polynomial fails.
- Lemma 2 fixes a failure using one old failure with known non-zero discrepancy.
- Lemma 3 updates the minimum possible length exactly when the prefix proves the old length impossible.
- The algorithm always keeps a valid polynomial for the processed prefix.
- Every length increase is forced by a failure, so the final length is minimal.

## Algorithm:

Maintain:

- $C$ = current connection polynomial
- $B$ = backup polynomial
- $L$ = current length
- $b$ = discrepancy of $B$
- $m$ = distance from backup failure

For each index $n$:

- calculate $d=\sum_i{C_i a_{n-i}}$
- if $d=0$, increase $m$
- otherwise apply $C(x)-\frac{d}{b}x^mB(x)$
- if $2L\le n$, update $L,B,b,m$

Complexity:

$$
O(N^2)
$$

If the final recurrence length is $L$:

$$
O(NL)
$$

## How many terms?

If the real recurrence has length $L$, then $2L$ correct terms are enough in theory.

For black-box DP:

- generate more than $2L$ terms
- run BM on a prefix
- verify the recurrence on unused terms

Extra terms are for confidence, not for BM itself.

## N-th Term:

After BM:

$$
a_n=\sum_{i=1}^{L}{c_i a_{n-i}}
$$

Characteristic polynomial:

$$
Q(x)=x^L-\sum_{i=1}^{L}{c_i x^{L-i}}
$$

Since $Q(x)=0$:

$$
x^L=\sum_{i=1}^{L}{c_i x^{L-i}}
$$

Calculate:

$$
x^k\bmod Q(x)=\sum_{i=0}^{L-1}{t_i x^i}
$$

So:

$$
a_k=\sum_{i=0}^{L-1}{t_i a_i}
$$

This is Kitamasa.

Naive polynomial multiplication gives:

$$
O(L^2\log k)
$$

Matrix exponentiation would be:

$$
O(L^3\log k)
$$

## Matrix DP:

For a linear transition:

$$
v_{n+1}=Av_n
$$

where $A$ is a $D\times D$ matrix, Cayley-Hamilton says every coordinate of $v_n$ satisfies a linear recurrence of length at most $D$.

Contest use:

- generate several values by normal DP
- run Berlekamp-Massey
- calculate the far term by Kitamasa

Sometimes the real recurrence is much shorter than the matrix size.

## Code:

`linear_rec(s,k)` returns $a_k$ from enough first terms in `s`.

{{< code language="cpp" title="Berlekamp-Massey" id="1" expand="Show" collapse="Hide" isCollapsed="false" codelink="https://raw.githubusercontent.com/st3inum/blog/master/codes/berlekamp-massey.cpp">}}{{< /code >}}

## Reference:

- [Berlekamp-Massey Algorithm - koosaga](https://koosaga.com/231)
