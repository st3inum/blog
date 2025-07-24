---
title: Alphabet - Codeforces - 101201a
date: '2021-04-22T21:55:00+06:00'
author: steinum
authorTwitter: ''
cover: ''
tags:
  - dp
  - codeforces
keywords:
  - acm icpc
  - pacific northwest regional
  - 2016-2017
description: >-
  insert minimum number of character in a given string after which the resulting string contain a subsequence
  `abcdefgh...xyz`
showFullContent: false
---

## Hint:

Maintain a function with current position of the string that can we take and number of last character that we have taken as state.

We have three option for transition:

- take current charecter as the new character of our `abcdef...` string [if it is possible], and go to the next position of our given string.

- ignore the current character , and go to the next position of our given string.

- insert a new character as the new character of our `abcdef...` string, and stay at the same position of our given string.

Saving all state in DP table is enough for this problem.

{{< code language="cpp" title="" id="1" expand="Show" collapse="Hide" isCollapsed="false" codelink="https://raw.githubusercontent.com/st3inum/blog/master/codes/codeforces/101201a.cpp">}}{{< /code >}}


## Reference:

- [Codeforces - 1257G](https://codeforces.com/contest/1257/problem/G)