---
title: Hashing 2 - Double Hash
date: '2021-05-10T18:17:14+06:00'
author: steinum
authorTwitter: ''
cover: ''
tags:
  - hashing
keywords:
  - ''
  - ''
description: ''
showFullContent: false
---

If you don't read [this](https://st3inum.github.io/posts/kattis-inversefactorial/) blog or solved [Kattis - inversefactorial](https://open.kattis.com/problems/inversefactorial) on your own, complete these two tasks at first.

In our [previous part](https://st3inum.github.io/posts/kattis-inversefactorial/), we take `m=1000000009` in our solution. But if we take  `m=1000000011` or `m=1000000125` what would happen?

If you are using these/some random values and getting WA, you are on the right track.

In our previous solution, we mapped every big value $p$ with some small value $H(p)$. But what if happening $H()$ function is giving the same result for different $p$. This is known as `hash collision`.

How to avoid it? By taking good $m$. But it is easy to generate `anti hash test case`[anti hash test means such case where hash function cause collision]. So, in most of the time we can do the following things:

## Solution:

- $H_1{(p)} = p \text{ (mod m1)}$

- $H_2{(p)} = p \text{ (mod m2)}$

- $H(p) = (H_1{(p)},H_2{(p)})$ [pair of those 2 function]

Or actually we can use some good combination of $H_1{(p)}$ and $H_2{(p)}$ as $H{(p)}$. Such as $H{(p)}=H_1{(p)}\times m2 + H_2{(p)} \times m1$.

Now it has much less probability for hash collision. This is known as double hash. We can extend it with higher dimension, which is unnecessary.


{{< code language="cpp" title="Inverse Factorial : Double Hash" id="1" expand="Show" collapse="Hide" isCollapsed="false" codelink="https://raw.githubusercontent.com/st3inum/blog/master/codes/kattis/inversefactorial-2.cpp">}}{{< /code >}}

## Reference:

- [Kattis - inversefactorial](https://open.kattis.com/problems/inversefactorial)