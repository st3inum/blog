---
title: Staircases - Timus 1017
date: '2021-04-23T00:28:55+06:00'
author: steinum
authorTwitter: ''
cover: ''
tags:
  - dp
  - timus
keywords:
  - ''
  - ''
description: Basic Dp problem
showFullContent: false
---

Maintain a function with current position(column) of the staircases($i$) , number of remaining block($r$) , number of block we have used for the last column($l$).

for $i^{th}$ position we can use $x\in [1,min(r,l-1)]$ block in this step.

But if we use dp table of $500 \times 500 \times 500$ size it will cause you MLE.

Notice that, we dont need position($i$) here, only things we need here if $i$ is greater than $1$ or not. Hence we can minimise $i$ with $2$. Then size of our dp table will be $2 \times 500 \times 500$ .

{{< code language="cpp" title="code: 1" id="1" expand="Show" collapse="Hide" isCollapsed="false" codelink="https://raw.githubusercontent.com/st3inum/blog/master/codes/timus/1017.cpp">}}{{< /code >}}

But actually we don't need $i$ for this code. But Why?
{{< spoiler text="spoiler" >}}
    try it yourself.
{{< /spoiler >}}

The code will be like this: 
{{< code language="cpp" title="code: 2" id="2" expand="Show" collapse="Hide" isCollapsed="false" codelink="https://raw.githubusercontent.com/st3inum/blog/master/codes/timus/1017(alter).cpp">}}{{< /code >}}


## Reference:

- [Timus - 1017](https://acm.timus.ru/problem.aspx?space=1&num=1017)