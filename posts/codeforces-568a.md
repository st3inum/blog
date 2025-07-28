---
title: Primes or Palindromes? - Codeforces - 568a
date: '2021-04-27T01:46:42+06:00'
author: steinum
authorTwitter: ''
cover: ''
tags:
  - number theory
  - sieve
  - codeforces
keywords:
  - ''
  - ''
description: ''
showFullContent: false
---

- $\pi(n) = \text{ number of prime number smaller than or equal to n}$ .
- $rub(n) = \text{ number of palindromic number smaller than or equal to n}$ .

For a given $p$ and $q$ find maximum such $n$ so that, $\pi(n)\le \frac{p}{q}\times rub(n)$

## Inside Math:
- $\pi(n) \approx \frac{n}{ln(n)}$ [Prime number approximation]
- $rub(n) \approx 2\sqrt{n}$
- maximum value of $\frac{p}{q} = 42$

Hence ,
\begin{align}
\pi(n) &\le \frac{p}{q}\times rub(n) \newline
\Longrightarrow \frac{n}{ln(n)} &\le 42 \times 2\sqrt{n} \newline
\Longrightarrow \frac{\sqrt{n}}{ln(n)} &\le 84 \newline
\Longrightarrow n_{max} &\approx \boxed{1415344} \newline
\end{align}

Now we can just precalculate all prime,and the palindrome in the range $[0,n_{max}]$, then find out maximum such $n$ for which $\pi(n) \le \frac{p}{q}\times rub(n)$.

{{< code language="cpp" title="Primes or Palindromes?" id="1" expand="Show" collapse="Hide" isCollapsed="false" codelink="https://raw.githubusercontent.com/st3inum/blog/master/codes/codeforces/568a.cpp">}}{{< /code >}}

## Reference:

- [Codeforces - 568A](https://codeforces.com/contest/568/problem/A)
- [Prime number approximation](https://mathworld.wolfram.com/PrimeCountingFunction.html)