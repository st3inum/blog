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


## Problem 1 - Codeforces 1520 D([Same Differences](https://codeforces.com/contest/1520/problem/D)) :

>You are given an array $a$ of $n$ integers. Count the number of pairs of indices $(i,j)$ such that $i<j$ and $a_j−a_i=j−i$.

### Solution:

\begin{align}
a_j - a_i &= j-i\newline
a_j - j &= a_i - i
\end{align}

Now, if we compare this with our second task, then $B_j=a_j-j$ and $A_i = a_i - i$

Hence our solution will be:

{{< code language="cpp" title="Same Differences" id="3" expand="Show" collapse="Hide" isCollapsed="false" codelink="https://raw.githubusercontent.com/st3inum/blog/master/codes/codeforces/1520d.cpp">}}{{< /code >}}

## Problem 2 - Toph ([Adorable String <3](https://toph.co/p/adorable-string-3))

> Let’s call a string adorable if its number of consonant(s) is 1 more then its number of vowel(s).\
>\
>Find the number of adorable substring of a given string

Suppose the given string is a $n$ length string , $s$[1 based indexing].

Let's define some function.
- $s[l,r] = \text{ substring of $s$ from $l$ to $r$ index(both inclusive)}$

- $V(i) = \text{ number of vowel in $s[1,i]$}$

- $C(i) = \text{ number of consonant in $s[1,i]$}$

- $V(l,r) = V(r)-V(l-1) = \text{ number of vowel in $s[l,r]$}$

- $C(l,r) = C(r)-C(l-1) = \text{ number of consonant in $s[l,r]$}$

Hence, we can get these equations for $s[l+1,r]$:

- $V(l+1,r) + C(l+1,r) = r-l$ [total length of s[l+1,r] equal to number of vowel + number of consonant]

- $V(l+1,r) +1 = C(l+1,r)$ [if $s[l+1,r]$ is adorable]

Solving the both equation we can get:
\begin{align}
2V(l+1,r) +1 &=r-l\newline
2(V(r)-V(l))+1 &= r-l\newline
2V(r)-2V(l)+1 &=r-l\newline
2V(r)-r+1&=2V(l)-l 
\end{align}

Now if we convert this problem in our second task, $B_{r} = 2V(r)-r+1$ and $A_{l}=2V(l)-l$ and $A_{0} = 0$

Hence, our code will be :

{{< code language="cpp" title="Adorable String <3" id="4" expand="Show" collapse="Hide" isCollapsed="false" codelink="https://raw.githubusercontent.com/st3inum/blog/master/codes/toph/adorable-string-3.cpp">}}{{< /code >}}


## Reference:

- [Toph - Adorable String <3](https://toph.co/p/adorable-string-3)

- [Codeforces - Same Differences](https://codeforces.com/contest/1520/problem/D)

## Similar Problem:

- [Smiley Faces (C) - 2017 PSUT Coding Marathon](https://codeforces.com/gym/101401/problem/C) [**Hard**]