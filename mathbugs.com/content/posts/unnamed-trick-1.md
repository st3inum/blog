+++
title = "Unnamed Trick 1"
date = "2021-05-11T03:01:48+06:00"
author = "steinum"
authorTwitter = "" #do not include @
cover = ""
tags = ["math", "counting", "trick"]
keywords = ["", ""]
description = ""
showFullContent = false
+++

## Prerequisite Task 1:

> You are given two array $A$ and $B$ of length $n$.\
>\
> For each $i$ ($0\le i \le n-1$) print $\sum_{j=0}^{i-1}{[A_{j}=B_{i}]}$

{{< spoiler text="<b>Constraints</b>" >}}
- $1\le n \le 10^{5}$

- $-10^{9} \le A_{i},B_{i} \le 10^{9}$
{{< /spoiler >}}

{{< code language="cpp" title="" id="1" expand="Show" collapse="Hide" isCollapsed="false">}}
map<int, int> cnt;
for (int j = 0; j < n; j++) {
	cout << cnt[B[j]] << '\n';
	cnt[A[j]]++;
}
{{< /code >}}

## Prerequisite Task 2:

> Same problem, just find $\sum_{i=0}^{n-1}{\sum_{j=0}^{i-1}{[A_{j}=B_{i}]}}$

{{< code language="cpp" title="" id="2" expand="Show" collapse="Hide" isCollapsed="false">}}
long long ans = 0;
map<int, int> cnt;
for (int j = 0; j < n; j++) {
	ans += cnt[B[j]];
	cnt[A[j]]++;
}
cout << ans << '\n';
{{< /code >}}


## Problem 1 - Codeforces 1520 D(Same Differences) :

>You are given an array $a$ of $n$ integers. Count the number of pairs of indices $(i,j)$ such that $i<j$ and $a_j−a_i=j−i$.

### Solution:

\begin{align}
a_j - a_i &= j-i\newline
a_j - j &= a_i - i
\end{align}

Now, if we compare this with our first task, then $B_j=a_j-j$ and $A_i = a_i - i$

Hence our solution will be:

{{< code language="cpp" title="Primes or Palindromes?" id="1" expand="Show" collapse="Hide" isCollapsed="false" codelink="https://raw.githubusercontent.com/st3inum/blog/master/codes/codeforces/1520d.cpp">}}{{< /code >}}