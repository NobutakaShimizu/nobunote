---
title: 探索から判定への帰着
nav_order: 4
parent: 埋め込みクリーク問題
---

# 探索から判定への帰着

**探索から判定への帰着(search-to-decision reduction)**とは, 判定問題を解くアルゴリズムを使って探索問題を解く方法全般を指す用語です.
埋め込みクリーク問題にもそのような帰着が存在し, 与えられたグラフが埋め込みクリークかErdős--Rényiグラフかを判定するアルゴリズムを使って,
埋め込みクリークを見つけるアルゴリズムを設計することができます.[^AAKMRX07]

しかし, 少し問題設定が複雑なので, まずはinformalな主張と証明のアイデアを与えます.

{: .theorem-title }
> **定理(informal; Alon et al. (2007))**
>
> パラメータ$k\in\Nat$を考える. クリークサイズ$k/2$に対して埋め込みクリーク判定問題をアドバンテージ$1-1/n^2$で解く多項式時間アルゴリズムが存在するならば, クリークサイズ$k$に対して埋め込みクリーク探索問題を成功確率$1-1/n$で解く多項式時間アルゴリズムが存在する.

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">帰着のアイデア</summary>
  仮定より, 判定問題を解くアルゴリズム$\calA$は非常に高いアドバンテージを持つため,
  $G=\PC(n,k/2)$ならば確率$1-1/n^2$で$\calA(G)=1$,
  $G=G(n,1/2)$ならば確率$1-1/n^2$で$\calA(G)=0$となります.

  さて, 探索問題の入力を$G=\PC(n,k)$とし, その頂点集合$V=[n]$に対し, 埋め込まれたクリークを$C\subseteq V$とします.
  各頂点$u\in V$に対し, $G$上の$u$とその隣接頂点からなる集合を$N(u)$とします.
  グラフ$G$から頂点集合$N(u)$を除去して得られるグラフ$G_u$を考えましょう.

  {: align="center"}
  ![text]({{site.baseurl}}/docs/planted_clique/images/search_to_decision.svg)
  {: width=70%}

  - もし$u\in C$ならば, 隣接頂点はクリークを含むので, $N(u)\supseteq C$となります. グラフ$G_u$は$G$に埋め込まれたクリークをもたないため, その周辺分布はおおまかにいうと$G(n/2,1/2)$となります.
  - もし$u \not\in C$ならば, クリーク$C$と$u$の間には平均的に$k/2$本の辺が存在するため, $\abs{N(u)\cap C}\approx C$となり, 残った$G_u$にはサイズおよそ$k/2$のクリークを持つことになるため, 周辺分布は大体$\PC(n/2,k/2)$となります.

  判定問題を解くアルゴリズムを使うとこれらのケースを確率$1-1/n^2$で区別できるため, $u\in C$かどうかを判定できます.
  これを全ての頂点$u\in V$に対して行うと, $u\in V$に関するunion boundにより, 確率$1-1/n$で$C$を見つけることができます.

</details>

[^AAKMRX07]: Alon, Noga, et al. "Testing k-wise and almost k-wise independence." Symposium on Theory of Computing (STOC), 2007.


なお, この定理では判定問題のアドバンテージが非常に高いことを仮定しており, 上記の議論ではこの仮定を弱めることはできません.
より弱い仮定, すなわち小さいアドバンテージで判定問題を解くアルゴリズムを使って高確率で探索問題を解く帰着はHirahara and Shimizu(2024)によって与えられました.[^HS24]

{: .theorem-title }
> **定理(informal; Hirahara and Shimizu (2024))**
>
> ある定数$\gamma>0$とあるクリークサイズ$k\in\Nat$が存在して埋め込みクリーク判定問題をアドバンテージ$\frac{k^2}{n}\cdot n^\gamma$で解くアルゴリズムが存在するならば,
> ある定数$c,\alpha>0$が存在してクリークサイズ$n^{1/2-\alpha}$に対して埋め込みクリーク探索問題を成功確率$1-\exp(-n^{c})$で解くアルゴリズムが存在する.

{: .remark }
> 厳密には上記の定理の仮定は少し違っていて, クリークサイズ$k$が二項分布$\Bin(n,k/n)$に従うときの埋め込みクリーク判定問題を考えています.

なお, 任意の$k = o(\sqrt{n})$に対して埋め込みクリーク判定問題はアドバンテージ$\Omega\qty(\frac{k^2}{n})$で解くことができます.
実際, 
辺の本数が$\frac{1}{2}\binom{n}{2}$より大きければ$1$, そうでなければ$0$を出力するアルゴリズムを考えれば,
$G(n,1/2)$上では確率$1/2$で$0$または$1$を出力する一方, $\PC(n,k)$上で$0$を出力する確率は, 辺の本数がその期待値から$k^2/4$程度ずれる確率となるので, 標準偏差$\Theta(n)$を鑑みると
アドバンテージは$\Omega\qty(\frac{k^2}{n})$となることが簡単に示せます.


[^HS24]: Hirahara, Shuichi, and Takayuki Shimizu. "Planted Clique Conjectures are Equivalent." Symposium on Theory of Computing (STOC), 2024.