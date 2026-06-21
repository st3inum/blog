---
title: Modulo Sum - Codeforces 577B
date: '2021-04-23T14:19:46+06:00'
author: steinum
authorTwitter: ''
cover: ''
tags:
  - codeforces
  - dp
  - bitmask
  - bitset
  - subset sum
  - pigeonhole principle
  - modular arithmetic
keywords:
  - pigeonhole principle
  - subset sum
description: Check if a non-empty subsequence sum is divisible by m
showFullContent: false
---

## Problem:

Given $n$ numbers and an integer $m$, check if we can choose a non-empty subsequence such that its sum is divisible by $m$.

## Solution 1: Pigeonhole + DP

First, handle the large case using pigeonhole principle.

Look at prefix sums:

$$
s_i = (a_1+a_2+\dots+a_i)\bmod m
$$

There are $n+1$ prefix sums if we include $s_0=0$.

There are only $m$ possible residues: $0,1,\dots,m-1$.

So if $n\ge m$, then by pigeonhole principle, two prefix sums must have the same residue modulo $m$.

Suppose:

$$
s_i=s_j,\quad i<j
$$

Then:

$$
(a_{i+1}+a_{i+2}+\dots+a_j)\bmod m = 0
$$

So we already have a non-empty segment, and a segment is also a subsequence. Answer is `YES`.

So for:

$$
n\ge m
$$

we can immediately print `YES`.

Now we only need DP for:

$$
n<m
$$

Maintain:

$$
dp[r]=true
$$

if some non-empty subsequence has sum $\equiv r\pmod m$.

Initially all values are false.

For every number:

$$
x=a_i\bmod m
$$

we do two things:

- take only $x$: set $dp[x]=true$
- add $x$ to all previous sums: $dp[(r+x)\bmod m]=true$

If at any point $dp[0]=true$, answer is `YES`.

Complexity is $O(nm)$, and because $n<m$, it is at most about $10^6$.

So the full idea is:

- if $n\ge m$, print `YES` by pigeonhole principle
- otherwise run normal subset-sum DP on residues
- if residue $0$ becomes possible, print `YES`
- otherwise print `NO`

## Solution 2: Bitmask DP

The same DP can be written more compactly using a bitmask/bitset.

Here bit $r$ means:

$$
dp[r]=true
$$

If bit $r$ is on, then after adding $x$, bit $(r+x)\bmod m$ should be on.

This is just a circular shift:

$$
dp = dp \cup shift(dp,x) \cup \{x\}
$$

As $m\le 1000$, this is compact and fast.

The logic stays exactly the same:

- if $n\ge m$, print `YES`
- otherwise run bitmask DP
- if residue $0$ becomes possible, print `YES`
- otherwise print `NO`

{{< code language="cpp" title="Modulo Sum - Codeforces 577B" id="1" expand="Show" collapse="Hide" isCollapsed="false" codelink="https://raw.githubusercontent.com/st3inum/blog/master/codes/codeforces/577b.cpp">}}{{< /code >}}

## Reference:

- [Codeforces 577B - Modulo Sum](https://codeforces.com/problemset/problem/577/B)
