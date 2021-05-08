+++
title = "Modulo - Toph"
date = "2021-05-08T14:57:26+06:00"
author = "steinum"
authorTwitter = "" #do not include @
cover = ""
tags = ["number theory", "toph"]
keywords = ["", ""]
description = ""
showFullContent = false
+++

You will be given an array, $A$ of length $n\le 10^{5}$ and $q\le 10^{5}$ queries. In each query you will be given a value $x \le 2^{60}$. You have to perform $A_{i} = A_{i} \text{ (mod $x$)} , 1 \le i \le n$ for each query , and after all the query print the array.

## Solution:
When $A_{i} = A_{i} \text{ (mod $x$)}$ operation change $A_{i}$ ?

{{< spoiler text="<b>Answer</b>" >}}
When $A_{i}\ge x$
{{< /spoiler >}}

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

{{< code language="cpp" title="Modulo" id="1" expand="Show" collapse="Hide" isCollapsed="false" codelink="https://raw.githubusercontent.com/st3inum/blog/master/codes/toph/modulo.cpp">}}{{< /code >}}

## Reference:
- [Modulo - Toph](https://toph.co/p/modulo)