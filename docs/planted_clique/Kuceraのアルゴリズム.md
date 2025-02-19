---
title: Kučeraのアルゴリズム
nav_order: 1
parent: 埋め込みクリーク問題
---
# Kučeraのアルゴリズム

* TOC
{:toc}


Kučeraのアルゴリズムとは$k\ge \sqrt{n\log n}$に対して[埋め込みクリーク探索問題]({{site.baseurl}}/docs/planted_clique/index#埋め込みクリーク探索問題)を解くアルゴリズムです.
アルゴリズム自体は非常にシンプルで, 
次数の大きい順に$k$個の頂点を出力するだけです.

{: .corollary-title }
> **Kučeraのアルゴリズム** 
>
> **入力**: グラフ$G=([n],E)\sim \calG(n,1/2,k)$.
> 1. 次数の大きい順に頂点を並び替え, $v_1,\dots,v_n$とする.
> 2. $C=\\{v_1,\dots,v_k\\}$を出力する.

なぜこれで解けるのでしょうか?
直感的には, ランダムグラフ$G(n,1/2)$に大きなクリーク$C\subseteq [n]$を追加すると, $C$に属する頂点の次数は$k/2$増えます.
$C$の外側の頂点の次数は期待値が$n/2$ですがそこから標準偏差$\pm O(\sqrt{n})$だけずれます.
実際には$n$個の頂点があるので, 最大次数は期待値から$O(\sqrt{n\log n})$だけ離れます.
従って, $C$内の頂点の次数の増分$k/2$が$O(\sqrt{n\log n})$より大きければ, $C$内の頂点の次数は$C$外の頂点の次数より大きくなるので,
次数の大きい順に$k$個の頂点を出力すればそれが$k$-クリークになっているはずです.

{: align="center"}
![次数によってクリークの位置がわかる]({{site.baseurl}}/docs/planted_clique/images/PCdegree_dist.svg)
{: width=70%}

<div id="theorem" markdown="1">
{: .theorem }
> 任意の$c>0$に対して, $k\ge 4c\sqrt{n\log n}$ならば, Kučeraのアルゴリズムは$\PC(n,k)$に対する埋め込みクリーク探索問題を成功確率$1-2n^{-1-2c^2}$で解く.
</div>

定理の証明のために, ランダムグラフの次数に関する以下の補題を証明します.

<div id="theorem" markdown="1">
{: .lemma }
> 任意の$c>0$に対してErdős--Rényiグラフ$G(n,1/2)$の最大次数は確率$1-n^{1-2c^2}$以上で高々$\frac{n}{2} + c\sqrt{n\log n}$以下である.

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">証明</summary>
  任意に固定した頂点$u\in [n]$の次数 $\deg(u)$ の周辺分布は二項分布 $\Bin(n-1,1/2)$ となるため,
  <a href="{{site.baseurl}}/docs/tools/prob_inequalities#hoeffding-inequality)">Hoeffdingの不等式</a>より, 任意の$x>0$に対して
  
  $$
    \begin{align*}
      \Pr \left[ \deg(u) \ge \frac{n}{2} + c\sqrt{n\log n}\right] \le \exp \left( - 2c^2 \log n \right) \le n^{-2c^2}.
    \end{align*}
  $$
  
  頂点$u\in [n]$に関するunion boundより, 最大次数が$\frac{n}{2} + c\sqrt{n\log n}$以上となる確率は高々$n^{1-2c^2}$である. $\square$

</details> 

なお, 同じ議論によって同じ確率で最小次数は$\frac{n}{2}-c\sqrt{n\log n}$以上であることも証明できます.
補題を用いると以下のようにしてKučeraのアルゴリズムの正当性を証明できます.

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item"><a href="#theorem">定理</a>の証明</summary>

  入力を$G'\sim \calG(n,1/2,k)$とします.
  補題より, クリーク$C$を追加する前のランダムグラフの最大次数は確率$1-n^{1-2c^2}$で高々$\frac{n}{2} + c\sqrt{n\log n}$です.

  リーク$C$の追加によってクリーク外$v \not\in C$の次数は変化しないため, グラフ$G'$においても頂点$v\not\in C$の次数は高々
   
  $$
    \begin{align*}
      \frac{n}{2} + c\sqrt{n\log n}      \tag{1}
    \end{align*}
  $$
  
  です.
  一方でクリーク内の頂点$u \in C$の次数の周辺分布は$\Bin(n-k)+(k-1)$であり(下図参照),
  Hoeffdingの不等式より$\Pr \left[ \Bin(n-k,1/2) \le \frac{n-k}{2} - c\sqrt{n\log n}\right] \le n^{-2c^2}$を得ます.

  {: align="center"}
  ![degree distribution]({{site.baseurl}}/docs/planted_clique/images/PCdegree.svg)
  {: width=70%}

  頂点 $u \in C$に関するunion boundにより

  $$
    \begin{align*}
      \Pr \left[ {}^\exists u\in C, \deg(u) \le \frac{n+k}{2} -1 - c\sqrt{n\log n} \right] \le n^{1-2c^2}
    \end{align*}
  $$

  なので, 確率$1-n^{1-2c^2}$で全ての$u\in C$の次数は少なくとも

  $$
    \begin{align*}
      \frac{n+k}{2} - c\sqrt{n\log n}  \tag{2}
    \end{align*}
  $$
  
  です. 
  式(1)と(2)を比較すると, $\frac{n+k}{2} - c\sqrt{n\log n} > \frac{n}{2}+c\sqrt{n\log n}$, すなわち$k \ge 4c\sqrt{n\log n}$ならば, $C$内の全ての頂点の次数が$C$外の全ての頂点の次数を上回るので, Kučeraのアルゴリズムの出力は確率$1-2n^{1-2c^2}$で埋め込まれたクリーク$C$に一致します.

</details>