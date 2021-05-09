+++
title = "Hashing 1 : Inverse Factorial - Kattis inversefactorial"
date = "2021-05-08T20:13:49+06:00"
author = "steinum"
authorTwitter = "" #do not include @
cover = ""
tags = ["hashing" , "kattis"]
keywords = ["Modular Arithmetic", ""]
description = ""
showFullContent = false
+++

>$$f(n)=n!$$

Given a value $x$ , find $f^{-1}{(x)}$ [that is, such $n$ so that $f(n)=x$].

{{< spoiler text="<b>Constraints</b>" >}}
number of digit in $x$ is atmost $10^{6}$
{{< /spoiler >}}

## Solution:

At first this problem seems too hard.

Suppose, we have a function $H(p)$ which return some small integer value. And $H(p)\neq H(q)$ if $p\neq q$.

Hence, we can uniquely represent every $p$ by $H(p)$.

{{< spoiler text="How to make $H(p)$" >}}
$H(p) = p \text{ (mod $m$)}$ [for a choosen $m$]

But, does this function follow [**$H(p)\neq H(q)$ if $p\neq q$**] this condition ?

No. But we can choose some good $m$ [different for different types of problem], to do better performance[to follow the condition].

We can take prime number as the value of $m$. It will be good.
{{< /spoiler >}}


Now, calculate $y = x \text{ (mod m)}$.


Again, calculate $n! \text{ (mod m)}$ , for all $n \in [0,10^{6}]$. And check, if it matches with $y$.

Hence we can find $f^{-1}{(x)}$.

If we choose good $m$ , our probability of collision[that is $H(p)=H(q)$ while $p\neq q$] will be too much low.

If you don't know how to `mod` , read [this](https://st3inum.github.io/posts/intro-to-modular-arithmetic/) article.

{{< code language="cpp" title="Inverse Factorial" id="1" expand="Show" collapse="Hide" isCollapsed="false" codelink="https://raw.githubusercontent.com/st3inum/blog/master/codes/kattis/inversefactorial.cpp">}}{{< /code >}}

## Reference:

- [Kattis - inversefactorial](https://open.kattis.com/problems/inversefactorial)

## Similar Problems:
- [Am I a Fibonacci Number - Codechef](https://www.codechef.com/problems/AMIFIB)