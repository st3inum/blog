---
title: The Multiplayer Action Game - Toph
date: '2021-05-20T15:18:06+06:00'
author: steinum
authorTwitter: ''
cover: ''
tags:
  - geometry
  - toph
keywords:
  - ''
  - ''
description: ''
showFullContent: false
---

> You are given two [n-sphere](https://en.wikipedia.org/wiki/N-sphere), centered at C1, C2 and having a radius of R1, R2 respectively  \
>\
> The velocity vector of the two n-sphere is V1, V2 respectively.\
>\
> Find the minimum time, when the smaller n-sphere will be fully inside of the bigger one.\
>\
> **If it is impossible/minimum time is greater than 100000, then print `-1`**.

{{< spoiler text="<b>Constraints</b>" >}}
*****
- There will be atmost $10^{5}$ testcases.

- $2\le n \le 10$.

- All other integers will be in range $[1,10^{4}]$.
*****
{{< /spoiler >}}

## Inside Math:

If `n=2`, when the smaller n-sphere will be fully inside of the bigger one?
{{< spoiler text="<b>Answer</b>" >}}
*****
if $\text{distance}(C1,C2)\le |R1-R2|$

In other words, $|C1-C2| \le |R1-R2|$ Considering $C1$ and $C2$ as vectors.
*****
{{< /spoiler >}}

In the case of n-dimension, the answer won't be different.

After $x$ second the new position of $C1$ will be $(C1+x\times V1)$ and the new position of $C2$ will be $(C2+x\times V2)$.

If in $x$ second the smaller circle will be inside of the bigger ones, then the following condition must be true.

\begin{align}
|(C1+x\times V1)-(C2+x\times V2)| &\le |R1-R2| \newline
|(C1 - C2) + (x\times V1 - x\times V2)| &\le |R1-R2| \newline
|(C1 - C2) + x\times( V1 -  V2)| &\le |R1-R2| \newline
|(C1 - C2) + x\times( V1 -  V2)|^{2} &\le |R1-R2|^{2} \newline
\end{align}
Let's assume,
\begin{align}
C &= C1 - C2\newline
V &= V1 - V2\newline
R &= |R1-R2|\newline
\end{align}
Hence, we can rewrite the equation as,
\begin{align}
|(C1 - C2) + x\times( V1 -  V2)|^{2} &\le |R1-R2|^{2} \newline
|C + xV|^{2} &\le R^{2} \newline
|C|^{2} + |xV|^{2} +2\times |C|.|xV| &\le R^{2} \newline
|C|^{2} + x^{2}|V|^{2} +2x\times |C|.|V| &\le R^{2} \newline
x^{2}|V|^{2} +2x\times |C|.|V| + (|C|^{2} - R^{2}) &\le 0 \newline
\end{align}
Let's assume,
\begin{align}
a &=  |V|^{2} = |V|.|V|\newline
b &=  2\times |C|.|V|\newline
\text{and, } c &= |C|^{2} - R^{2} = |C|.|C| - R^{2}\newline
\end{align}

Again, we can rewrite the equation as $ax^2+bx+c\le 0$ and we need to find the smallest such $x$.

We can use `ternary search`. Alternatively, we can just solve the equation(as [quadratic equation](https://en.wikipedia.org/wiki/Quadratic_equation)) and find the minimum such $x$.

**We must handle some cases, like $R1=R2$ or $a=0$**

{{< code language="cpp" title="The Multiplayer Action Game" id="1" expand="Show" collapse="Hide" isCollapsed="false" codelink="https://raw.githubusercontent.com/st3inum/blog/master/codes/toph/the-multiplayer-action-game.cpp">}}{{< /code >}}

## Reference:

- [Toph - The Multiplayer Action Game](https://toph.co/p/the-multiplayer-action-game)

## Similar Problems

- [Lightoj - Closest Distance(1146)](https://lightoj.com/problem/closest-distance)