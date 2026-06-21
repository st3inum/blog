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
description: Find the shortest linear recurrence and calculate nth term
showFullContent: false
draft: false
---

Berlekamp-Massey finds the shortest linear recurrence from first terms of a sequence.

All calculations are over a field, usually modulo a prime.

## Definition 1: Linear Recurrence

A sequence $a_0,a_1,a_2,\dots$ has a recurrence of length $L$ if:

$$
a_n=\sum_{i=1}^{L}{c_i a_{n-i}}
$$

for every $n\ge L$.

The goal is to find minimum possible $L$.

## Definition 2: Connection Polynomial

For a recurrence:

$$
a_n=\sum_{i=1}^{L}{c_i a_{n-i}}
$$

define:

$$
C(x)=1+\sum_{i=1}^{L}{C_i x^i}
$$

where:

$$
C_0=1,\quad C_i=-c_i
$$

The recurrence condition becomes:

$$
\sum_{i=0}^{L}{C_i a_{n-i}}=0
$$

Side note:

$C(x)$ is also called the connection polynomial.

BM actually finds $C(x)$ first, then returns $c_i=-C_i$.

## Definition 3: Discrepancy

For a candidate polynomial $C$ at index $n$:

$$
d_n(C)=\sum_{i=0}^{L}{C_i a_{n-i}}
$$

If $d_n(C)=0$, the candidate recurrence is valid at $a_n$.

If $d_n(C)\ne0$, it fails at $a_n$.

## Lemma 1: Correction Step

Current polynomial: $C$.

Current discrepancy:

$$
d=d_n(C)
$$

Old polynomial: $B$.

Old non-zero discrepancy: $b$.

Distance between those two discrepancy positions: $m$.

Define:

$$
C'(x)=C(x)-\frac{d}{b}x^mB(x)
$$

Claim:

$$
d_n(C')=0
$$

**Proof:**

The shifted polynomial $x^mB(x)$ contributes exactly $b$ at index $n$.

Therefore:

$$
d_n(C')=d-\frac{d}{b}b=0
$$

## Lemma 2: Length Update

After a non-zero discrepancy at index $n$, the new length is:

$$
L'=\max(L,n+1-L)
$$

Therefore:

$$
L'=
\begin{cases}
L, & 2L>n \\
n+1-L, & 2L\le n
\end{cases}
$$

**Proof:**

From Lemma 1:

$$
C'(x)=C(x)-\frac{d}{b}x^mB(x)
$$

So:

$$
\deg C'\le \max(\deg C,m+\deg B)
$$

BM keeps the invariant:

$$
m+\deg B=n+1-L
$$

Hence:

$$
\deg C'\le \max(L,n+1-L)
$$

A non-zero discrepancy means the current length $L$ is not enough for the prefix ending at $n$ when $2L\le n$.

Thus the new minimal possible length is $n+1-L$.

## Theorem 1: Berlekamp-Massey

BM returns the shortest recurrence for the given prefix.

**Proof:**

BM scans terms from left to right.

At every index $n$:

- if $d_n(C)=0$, current recurrence already matches the prefix
- if $d_n(C)\ne0$, Lemma 1 fixes the current term
- Lemma 2 updates the length only when a longer recurrence is forced

Therefore after processing all terms, $C$ is valid for the whole prefix and has minimum length.

Complexity:

$$
O(NL)
$$

Usually it is written as $O(N^2)$.

Here $N$ is number of known terms and $L$ is final recurrence length.

## Theorem 2: N-th Term

After BM, recurrence is:

$$
a_n=\sum_{i=1}^{L}{c_i a_{n-i}}
$$

Define:

$$
Q(x)=x^L-\sum_{i=1}^{L}{c_i x^{L-i}}
$$

In modulo $Q(x)$:

$$
x^L=\sum_{i=1}^{L}{c_i x^{L-i}}
$$

Calculate:

$$
x^n\bmod Q(x)=\sum_{i=0}^{L-1}{t_i x^i}
$$

Result:

$$
a_n=\sum_{i=0}^{L-1}{t_i a_i}
$$

**Proof:**

The polynomial identity for $x^L$ has the same coefficients as the recurrence.

Reducing $x^n$ modulo $Q(x)$ applies the same transition as the sequence.

The remaining basis terms are:

$$
1,x,x^2,\dots,x^{L-1}
$$

Their sequence values are:

$$
a_0,a_1,a_2,\dots,a_{L-1}
$$

Hence:

$$
a_n=\sum_{i=0}^{L-1}{t_i a_i}
$$

This is Kitamasa.

Complexity:

$$
O(L^2\log n)
$$

## Corollary: Number of Terms

If the true recurrence length is $L$, then $2L$ correct terms are enough for BM.

For black-box DP:

- generate many prefix terms
- run BM on first part
- verify the recurrence on unused terms

Side note:

The extra terms are only for verification.

They are not required by BM after the recurrence is already determined.

## Theorem 3: Matrix DP

Transition:

$$
v_{n+1}=Av_n
$$

where $A$ is a $D\times D$ matrix.

Every coordinate of $v_n$ satisfies a linear recurrence of length at most $D$.

**Proof:**

By Cayley-Hamilton:

$$
P_A(A)=0
$$

where $P_A$ is the characteristic polynomial of $A$ and $\deg P_A=D$.

Multiplying by $v_n$:

$$
P_A(A)v_n=0
$$

So each coordinate of $v_n$ follows the recurrence given by $P_A$.

This means:

- generate first values by normal DP
- run BM
- use Kitamasa for the far term

Useful when the transition matrix is large, but the final recurrence is small.

## Code:

`linear_rec(s,n)` returns $a_n$ from enough first terms in `s`.

{{< code language="cpp" title="Berlekamp-Massey" id="1" expand="Show" collapse="Hide" isCollapsed="false" codelink="https://raw.githubusercontent.com/st3inum/blog/master/codes/berlekamp-massey.cpp">}}{{< /code >}}

## Reference:

- [Berlekamp-Massey Algorithm - koosaga](https://koosaga.com/231)
