+++
title = "Long Sandwich - Codechef SANDWICH"
date = "2021-04-30T22:03:31+06:00"
author = "steinum"
authorTwitter = "" #do not include @
cover = ""
tags = ["combinatorics", "crt" , "lucas theorem" , "number theory" ,"wilson's theorem" ,"codechef"]
keywords = ["", ""]
description = ""
showFullContent = false
+++

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

In this case we can calculate the value of ncr with lucas theorem.

{{< code language="cpp" title="Long Sandwich: subtask 3" id="3" expand="Show" collapse="Hide" isCollapsed="false" codelink="https://raw.githubusercontent.com/st3inum/blog/master/codes/codechef/SANDWICH_3.cpp">}}{{< /code >}}

## Subtask 4:

- $1\le n,k \le 10^{18}$
- $2 \le m \le 10^{6}$

For this subtask we have to prime factorize $m$. Then calculate answer for each prime power. And finally merge them up with `CRT`.

## Bonus:

Try to solve the subtask 4 with Wilson's theorem.



## Reference:

- [Codechef - SANDWICH](https://www.codechef.com/problems/SANDWICH)
- [Stars and Bars Theorem](https://forthright48.com/stars-and-bars-theorem)
- [CRT - Chinese Remainder Theorem](https://forthright48.com/chinese-remainder-theorem-part-1-coprime-moduli/)
- [Lucas' Theorem](https://brilliant.org/wiki/lucas-theorem/)
- [Wilson's theorem](https://en.wikipedia.org/wiki/Wilson%27s_theorem)