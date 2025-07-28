---
title: Modulo - Toph
date: '2021-05-08T14:57:26+06:00'
author: steinum
authorTwitter: ''
cover: ''
tags:
  - number theory
  - toph
keywords:
  - ''
  - ''
description: ''
showFullContent: false
---

You will be given an array, $A$ of length $n$ and $q$ queries. In each query you will be given a value $x$. You have to perform $A_{i} = A_{i} \text{ (mod $x$)} , 1 \le i \le n$ for each query , and after all the query print the array.

<details>
	<summary>Constraints</summary>

- $A_{i} \le 2^{60}$
- $n\le 10^{5}$
- $q\le 10^{5}$
- $x \le 2^{60}$


</details>

## Solution:
When $A_{i} = A_{i} \text{ (mod $x$)}$ operation change $A_{i}$ ?

<details><summary>Answer</summary>
When $A_{i}\ge x$
</details>

Lets call a $A_{i}$ valid, for a given $x$, if $A_{i}\ge x$.

Hence, our solution is, for each query, we will iterate over only valid numbers, and do `%=` operation on them [`a%=x`].

## Inside Math:

But why this solution will work?

Suppose, $a$ is valid for $x$, and we have done $a'=a \text{ (mod $x$)}$.

Now, $a'\le \frac{a}{2}$ [But why ?]

- Case 1: $x\le \frac{a}{2}$

	- Hence, if we divide $a$ with $x$, the remainder will be smaller than $x$.

	- $\therefore$ $a'\le x$ or $a'\le \frac{a}{2}$

- Case 2: $x>\frac{a}{2}$

	- Hence the remainder will be $a-x$.

	- $\therefore a'=a-x$ or $a'\le\frac{a}{2}$

Hence, one value, $A_{i}$,  will become a valid value atmost $log_{2}{(2^{60})} = 60$ times.

Hence if we iterate over only the valid value , number of overall iteration will be amortize $60\times n$.

But as we are using `priority_queue` to maintain our array our total complexity will be $O(nlog(n)log(A_{max}))$

{{< code language="cpp" title="Modulo" id="1" expand="Show" collapse="Hide" isCollapsed="false" codelink="https://raw.githubusercontent.com/st3inum/blog/master/codes/toph/modulo.cpp">}}{{< /code >}}

## Reference:
- [Modulo - Toph](https://toph.co/p/modulo)