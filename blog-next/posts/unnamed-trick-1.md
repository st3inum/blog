---
title: Unnamed Trick 1
date: '2021-05-11T03:01:48+06:00'
author: steinum
authorTwitter: ''
cover: ''
tags:
  - math
  - counting
  - trick
keywords:
  - ''
  - ''
description: ''
showFullContent: false
---

## Prerequisite Task 1:

> You are given two array $A$ and $B$ of length $n$.\
>\
> For each $j$ ($0\le j \le n-1$) print $\sum_{i=0}^{j-1}{[A_{i}=B_{j}]}$\
>\
> In other words, for each $j$($0\le j \le n-1$) print number of index $i$(i<j) where $B_j=A_i$

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

> Same as `task 1`, just find $\sum_{j=0}^{n-1}{\sum_{i=0}^{j-1}{[A_{i}=B_{j}]}}$\
>\
> In other words, number of pair $(i,j)$ where $i<j$ and $B_j=A_i$

{{< code language="cpp" title="" id="2" expand="Show" collapse="Hide" isCollapsed="false">}}
long long ans = 0;
map<int, int> cnt;
for (int j = 0; j < n; j++) {
	ans += cnt[B[j]];
	cnt[A[j]]++;
}
cout << ans << '\n';
{{< /code >}}

## Prerequisite Task 3:

> Same as `task 2`, just find $\sum_{j=l_B}^{r_B}{\sum_{i=l_A}^{r_A}{[A_{i}=B_{j}][i<j]}}$\
>\
> In other words, number of pair $(i,j)$ where $i<j$ , $i\in [l_A,r_A]$ and $j\in [l_B,r_B]$ and $B_j=A_i$

{{< code language="cpp" title="" id="3" expand="Show" collapse="Hide" isCollapsed="false">}}
long long ans = 0;
map<int, int> cnt;
for (int j = min(la, lb); j <= rb; j++) {
    if (lb <= j && j <= rb)ans += cnt[B[j]];
    if (la <= j && j <= ra)cnt[A[j]]++;
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

Now, if we compare this with our `task 2`, then $B_j=a_j-j$ and $A_i = a_i - i$

Hence our solution will be:

{{< code language="cpp" title="Same Differences" id="4" expand="Show" collapse="Hide" isCollapsed="false" codelink="https://raw.githubusercontent.com/st3inum/blog/master/codes/codeforces/1520d.cpp">}}{{< /code >}}

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

Now if we convert this problem in our `task 3`, $B_{r} = 2V(r)-r+1$ and $A_{l}=2V(l)-l$ and $A_{0} = 0$ here $l \in [0,n-1]$ and $r \in [1,n]$

Hence, our code will be :

{{< code language="cpp" title="Adorable String <3" id="5" expand="Show" collapse="Hide" isCollapsed="false" codelink="https://raw.githubusercontent.com/st3inum/blog/master/codes/toph/adorable-string-3.cpp">}}{{< /code >}}


## Reference:

- [Toph - Adorable String <3](https://toph.co/p/adorable-string-3)

- [Codeforces - Same Differences](https://codeforces.com/contest/1520/problem/D)

## Similar Problem:

- [Codeforces - Good Subarrays - 1398C](https://codeforces.com/contest/1398/problem/C)

- [Codeforces - Rock and Lever - 1420 B](https://codeforces.com/contest/1420/problem/B)

- [Codeforces - Sasha and a Bit of Relax - 1109 A](https://codeforces.com/contest/1109/problem/A)

- [Codeforces - Count Pairs - 1188B](https://codeforces.com/contest/1188/problem/B)

- [Codeforces - Three Parts of the Array - 1006C](https://codeforces.com/contest/1006/problem/C)

- [Toph - Not Bad Array - BSMRSTU Home Quarantine Contest - 3](https://toph.co/p/not-bad-array)

- [Toph - Divisible by 3 - BSMRSTU Home Quarantine Contest - 6](https://toph.co/p/divisible-by-3)


- [AtCoder - DNA Sequence](https://atcoder.jp/contests/arc104/tasks/arc104_b?lang=en)

- [BDOSN - Zero Ways](http://oj.bdosn.org/contest/11/problem/A)

- [Divisible by 3 - SEERC 2020](https://codeforces.com/gym/103102/problem/E)

- [Smiley Faces (C) - 2017 PSUT Coding Marathon](https://codeforces.com/gym/101401/problem/C) [**Hard**]


<!-- https://vjudge.net/contest/380967#problem/F -->
<!-- http://oj.bdosn.org/contest/11/problem/A -->
<!-- https://codeforces.com/contest/1541/problem/B -->
<!-- maximum sum subarray -->
<!-- https://leetcode.com/problems/subarray-sum-equals-k/ -->