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

Let's calculate prefix sums modulo $m$:

$$
s_i = (a_1+a_2+\dots+a_i)\bmod m
$$

There are $n+1$ prefix sums including $s_0=0$, and only $m$ possible residues.

So if $n\ge m$, then by pigeonhole principle, there must be two prefix sums with same residue.

$$
s_i=s_j,\quad i<j
$$

Then:

$$
(a_{i+1}+a_{i+2}+\dots+a_j)\bmod m = 0
$$

So answer is `YES`.

For $n<m$, we can use normal subset-sum DP on modulo values in $O(nm)$.

{{< code language="cpp" title="Solution 1: Pigeonhole + DP" id="1" expand="Show" collapse="Hide" isCollapsed="false" codelink="https://raw.githubusercontent.com/st3inum/blog/master/codes/codeforces/577b-dp.cpp">}}{{< /code >}}

## Solution 2: Bitmask DP

Same DP, but store residues in a bitmask/bitset.

If bit $r$ is on, then residue $r$ is possible.

$$
dp = dp \cup shift(dp,x) \cup \{x\}
$$

Here `shift(dp,x)` means circular shift modulo $m$.

{{< code language="cpp" title="Solution 2: Bitmask DP" id="2" expand="Show" collapse="Hide" isCollapsed="false" codelink="https://raw.githubusercontent.com/st3inum/blog/master/codes/codeforces/577b.cpp">}}{{< /code >}}

## Reference:

- [Codeforces 577B - Modulo Sum](https://codeforces.com/problemset/problem/577/B)
