---
title: "Boruvka's Algorithm : Xor-MST - Codeforces 888G"
date: '2026-06-20T00:00:00+03:00'
author: steinum
authorTwitter: ''
cover: ''
tags:
  - mst
  - graph
  - boruvka
  - trie
  - codeforces
keywords:
  - Boruvka
  - Minimum Spanning Tree
  - Xor MST
description: Boruvka's algorithm and Codeforces 888G Xor-MST solution
showFullContent: false
---

For Minimum Spanning Tree, we usually learn `Kruskal` and `Prim` first. Another classic algorithm is `Boruvka`.

## Boruvka's Algorithm:

Initially every vertex is a separate component.

While there is more than one component:

- For each component, find the minimum weight edge that goes outside this component.
- Add all those selected edges to the MST.
- Merge the connected components.

{{< spoiler text="<b>Why this is valid?</b>" >}}
Take any component $C$. The minimum edge from $C$ to $V-C$ is the lightest edge crossing this cut.

By cut property of MST, this edge is safe. That means we can add it without losing the possibility of making a minimum spanning tree.

Also, after one phase, every old component chooses some other component. So the number of components decreases by at least half. Hence there will be $O(\log n)$ phases.
{{< /spoiler >}}

Naively, if we scan all edges in every phase, complexity will be $O(E\log V)$.

## Problem - Codeforces 888G ([Xor-MST](https://codeforces.com/contest/888/problem/G)):

You are given $n$ numbers $a_1,a_2,\dots,a_n$.

Think of them as vertices of a complete graph. Edge weight between vertex $i$ and vertex $j$ is:

$$a_i \oplus a_j$$

Need to find the weight of the MST.

{{< spoiler text="<b>Constraints</b>" >}}

- $1\le n\le 2\cdot 10^5$
- $0\le a_i \lt 2^{30}$

{{< /spoiler >}}

Complete graph means there are $O(n^2)$ edges. So normal Kruskal/Prim/Boruvka can not be used directly.

## Boruvka view:

If we try to use Boruvka directly, each component needs:

$$\min_{x\in C,y\notin C}{(x\oplus y)}$$

A binary trie can answer this kind of minimum xor query. For a component, we can temporarily remove all its numbers from the trie, query with its numbers, then insert them again.

That is a valid Boruvka solution, but the implementation is a little heavy. For this problem, there is a cleaner recursive version using the same cut property.

## Observation:

Sort all numbers.

Suppose we are now looking at some set of numbers where all higher bits are already same, and current bit is $b$.

Split the set into two parts:

- $L =$ numbers where bit $b$ is `0`
- $R =$ numbers where bit $b$ is `1`

Now notice:

- Any edge inside $L$ or inside $R$ has weight $\lt 2^b$.
- Any edge between $L$ and $R$ has bit $b$ set, so weight $\ge 2^b$.

Hence MST will be:

$$MST(L) + MST(R) + \text{minimum edge between } L \text{ and } R$$

This is the same cut-property idea used in Boruvka. For the cut $(L,R)$, we only need the lightest crossing edge.

If one side is empty, we just go to the next bit.

## Finding the minimum cross edge:

For every $x\in L$ and $y\in R$, bit $b$ is different. So:

$$x\oplus y = 2^b + \text{xor of lower bits}$$

Therefore we only need to minimize lower bits.

We can insert all numbers of the smaller side in a binary trie, then query every number of the other side for minimum xor.

So for a split at bit $b$:

$$\text{cross} = 2^b + \min_{x\in L,y\in R}{(x\oplus y \text{ using lower bits})}$$

## Example:

For $[1,2,3,4,5]$:

- Highest useful split: $[1,2,3]$ and $[4,5]$
- $MST([1,2,3]) = 3$
- $MST([4,5]) = 1$
- Minimum cross edge is $1\oplus 5=4$

So answer is:

$$3+1+4=8$$

## Complexity:

There are only $30$ bits.

At each recursion level, we process the numbers using a binary trie. So complexity is around:

$$O(n\cdot 30\cdot 30)$$

which is fine for $n=2\cdot 10^5$.

## Code:

{{< code language="cpp" title="Xor-MST - Codeforces 888G" id="1" expand="Show" collapse="Hide" isCollapsed="false" codelink="https://raw.githubusercontent.com/st3inum/blog/master/codes/codeforces/888g.cpp">}}{{< /code >}}

## Reference:

- [Codeforces 888G - Xor-MST](https://codeforces.com/contest/888/problem/G)
