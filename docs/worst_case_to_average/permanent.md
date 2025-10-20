---
title: パーマネント
nav_order: 2
parent: 最悪時から平均時への帰着
---

# パーマネント


* TOC
{:toc}

## 概要

$n\times n$ 行列 $A$ の**パーマネント (permanent)** とは, 次のように定義される量です:

$$
  \begin{align*}
    \mathrm{perm}(A) = \sum_{\sigma\in S_n} \prod_{i=1}^n A_{i,\sigma(i)}.
  \end{align*}
$$

ここで, $S_n$ は $[n] = \qty{1,2,\ldots,n}$ 上の全ての順列の集合です. パーマネントは行列式に似ていますが, 順列の符号を考慮しない点が異なります.
しかし, 驚くべきことに, 符号を考慮するかどうかによって計算量に非常に大きな違いが生まれます.

行列式は掃き出し法などを使えば多項式時間で計算可能です.
一方でパーマネントを計算する問題は非常に難しいと広く信じられています. Valiant (1979) は, $\\{0,1\\}$成分を持つ行列のパーマネントを($\mathbb{Z}$上で)計算する問題が $\\#\mathsf{P}$-完全であることを示しました.[^Val79] ここで $\\#\mathsf{P}$ は数え上げ問題のクラスであり, NP証明の個数の数え上げになっている問題のクラスです.

ここでは$A$は有限体$\F_p$上の行列であると仮定し, 平均時の問題として次の問題を考えます:

{: .problem}
> 
> 入力として有限体$\F_p$上の一様ランダムな行列 $A\sim\F_p^{n\times n}$ を受け取り, $\mathrm{perm}(A)$ を出力せよ.

最悪時の場合, $p>n!$であれば, Valiantの結果よりパーマネントを多項式時間で計算することは $\\#\mathsf{P}$-困難ですが, 中国剰余定理を使うと, ある$p=n^{O(1)}$に対しても同様に困難であることが示されます.
このとき, Lipton (1991) は, $p\ge 3(n+1)$に対し, パーマネントを高い成功確率で解くアルゴリズムが存在するならば, それを使って任意の入力に対してパーマネントを解くアルゴリズムを設計できることを示しました.[^Lip91]

## Lipton (1991) の帰着

<div id="thm:Lipton" markdown="1">
{: .theorem-title }
> **定理1 (Lipton, 1991).**
>
> 有限体$\F_p$上で, ランダム行列上で成功確率$1-\frac{1}{3(n+1)}$でパーマネントを解く$T(n)$時間アルゴリズムが存在するならば, 全ての入力に対してパーマネントを確率$2/3$で計算する$O(n\cdot T(n)) + \poly(n)$時間乱択アルゴリズムが存在する.
</div>

ここで $\poly(n)$ は$\F_p$上の$n$次多項式の補間にかかる時間を表します.

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">証明</summary>
  ランダム行列のパーマネントを成功確率$1-\frac{1}{3(n+1)}$で解くアルゴリズムを$M$とします. すなわちこのアルゴリズムは以下を満たします:

  $$
    \begin{align*}
      \Pr_{R\sim \F_p^{n\times n}}\left[ M(R) = \mathrm{perm}(R) \right] \ge 1 - \frac{1}{3(n+1)}. \tag{1}
    \end{align*}  $$
  
  任意の入力$A\in\F_p^{n\times n}$に対して, $M$を使ってパーマネントを計算するアルゴリズム$M'$を計算することが目標です.
  ランダムな行列 $R\sim\F_p^{\times n}$を選び, 多項式

  $$
    \begin{align*}
      P(x) = \mathrm{perm}(A + xR)
    \end{align*}  $$
  
  を考えます. この$x$に関する多項式は, $A,R$が固定されているので, 次数は高々$n$です.
  また, $P(0)=\mathrm{perm}(A)$ を計算したいわけですが, $x\ne 0$ に対して $A+xR$ は一様ランダムな行列となるので, (1)より確率 $1-\frac{1}{10n}$ で $M(A+xR) = \mathrm{perm}(A+xR)$ となります.
  そこで$n+1$個の異なる点$x_1,\dots,x_{n+1}\in\F_p$において $P(x_i)$ を $M(A+x_i R)$ を使って計算し, ラグランジュ補間により $P(0)$ を求めることで $\mathrm{perm}(A)$ を計算するアルゴリズムを考えます.  具体的には, 次のようにアルゴリズム$M'$を定義します:

  1. 一様ランダムな行列$R\sim\F_p^{n\times n}$を選ぶ. また, 相異なる$n+1$個の点$x_1,x_2,\ldots,x_{n+1}\in\F_p$を選ぶ.
  2. 各$i=1,\dots,n+1$ について$y_i = M(A + x_i R)$を計算する.
  3. 得られた点$(x_i,y_i)$全てを通る$n$次多項式$P\colon\F_p\to\F_p$を多項式補間を用いて求め, $P(0)$を出力する.

  (1)および$i$に関するunion boundより,

  $$
    \begin{align*}
      \Pr_{R}\qty[ {}^{\forall}i\in[n+1],\quad M(A + x_i R) = \mathrm{perm}(A + x_i R) ] \ge 1 - \frac{n+1}{3(n+1)} = \frac{2}{3}.
    \end{align*}  $$

  また, 多項式$P(x)$の次数は高々$n$なので, $x_1,x_2,\ldots,x_n$が互いに異なる限り, ラグランジュ補間により正しく求まる.
  よって確率$2/3$で$M'(A) = P(0) = \mathrm{perm}(A)$となる.
</details>

## Lipton(1991)の改善

Liptonの帰着では, ランダム行列上で成功確率が $1 - \frac{1}{3(n+1)}$ であるアルゴリズムを仮定しました.
では, **より小さい成功確率 $\alpha$ を持つアルゴリズムを仮定した場合に同様の帰着を得ることはできるでしょうか?**

もしこれが可能であれば, パーマネントの最悪時困難性を仮定すると, $1-\alpha$の割合の行列に対して正しくパーマネントを計算するアルゴリズムが存在しないことが示せます.
仮に$\alpha\approx 0$で示せたとすると, ほとんどの行列は非常にパーマネントを計算するのが難しいことになります.
このように, 計算困難なインスタンスが非常に多いという性質は暗号学的応用や脱乱択の理論において極めて重要です.

この方向に関してはいくつかの研究があります:
- GemmellとSudan (1992) は, $\alpha=\frac{1}{2} + \frac{1}{\poly(n)}$ に対して最悪時から平均時への帰着を与えました[^GS92].
- FeigeとLund (1992) は, sum-checkプロトコルのアイデアを使って, $\alpha=\frac{1}{2} - \frac{1}{n}$ に対して最悪時から平均時への帰着を与えました [^FL92].
- Cai, Pavan, Sivakumar (1999) は, $\alpha=\frac{1}{\poly(n)}$ に対して最悪時から平均時への帰着を与えました [^CPS99].

また, Liptonの帰着を含む上記全ての既存の手法は全て多項式補間に基づいた手法であるため, 本質的に考える体$\F_p$の要素数は大きくなければいけません.
一般に$p=2$の場合は行列積と同値なので簡単に計算できますが, $3\le p\ll n$の範囲ではパーマネントの最悪時から平均時への帰着は知られていません.


## GemmellとSudan (1992) の帰着

Lipton(1991)の帰着では, 高確率で成功するアルゴリズムを仮定することによって, $n+1$個**全ての点で**正しい評価を得て, これらを用いた多項式補間によって任意の入力に対してパーマネントを計算しました.
仮定するアルゴリズムの成功確率を下げると, いくつかの点で誤った評価を得る可能性が出てきます.
GemmellとSudan (1992) は, 多項式補間の過程で誤った評価が含まれていても, **半分以上の点で**正しい評価が得られているならば, Berlekamp-Welchアルゴリズムを用いて
正しい多項式を復元できることを利用してLipton(1991)の帰着を改善し, 以下の結果を証明しました.

<div id="thm:GS92" markdown="1">
{: .theorem-title }
> **定理2 (Gemmell and Sudan, 1992).**
>
> 有限体$\F_p$上で, ランダム行列上で成功確率$\frac{1}{2}+n^{-c}$でパーマネントを解く$T(n)$時間アルゴリズムが存在するならば, 全ての入力に対してパーマネントを確率$2/3$で計算する$O(n^{2c+1}\cdot T(n) + n^{6c+3})$時間乱択アルゴリズムが存在する. ただし, $p>n^{2c+1}$.
</div>

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">証明</summary>
  
与えられた任意の入力行列$A$に対して$\mathrm{perm}(A)$を次のようにして計算します:
1. 一様ランダムな行列$R,S\sim\F_p^{n\times n}$を選ぶ.
2. 一変数多項式 $P(x) = \mathrm{perm}(A+xR+x^2S)$ を考える (この多項式は次数$\le 2n$).
3. 相異なる点 $x_1,\dots,x_M$ に対して $P(x_i)$ を $T(n)$ 時間アルゴリズムを使って計算する (ただし $M=n^{2c+1}$)
4. [Berlekamp-Welchアルゴリズム]({{site.baseurl}}/docs/error-correcting_code/Berlekamp-Welch)を使って, 多項式 $P$ の全ての係数を求めて, $P(0)=\mathrm{perm}(A)$ を出力する.

ステップ2で考えた多項式 $P$ について考えましょう.
固定した各 $x_i$ に対して, 行列

$$
  \begin{align*}
    P(x_i) = \mathrm{perm}(A + x_i R + x_i^2 S)
  \end{align*}$$

は一様ランダムな行列となります (ランダムネスは$R,S$) ので, アルゴリズムは確率 $\frac{1}{2} + n^{-c}$ で正しく計算します.
この評価は固定した各$x_i$それぞれに対して成り立ちます.
次に, 確率変数 $X_i\in\binset$ を, "アルゴリズムが $P(x_x)$ の値を正しく計算したら$1$, そうでなければ$0$" と定義し,
$S=\sum_{i=1}^M X_i$ とします. すると

$$
  \begin{align*}
    \Var[X_i] = \E[X_i] (1-\E[X_i]) \le \frac{1}{4}
  \end{align*}
$$

および, 期待値の線形性より

$$
  \begin{align*}
    \E\qty[S] = \sum_{i=1}^M \Pr\left[ \text{アルゴリズムが $P(x_i)$ を正しく計算} \right] \ge M\left(\frac{1}{2} + n^{-c}\right)
  \end{align*}
$$

となります. また,
[ペアワイズ独立な確率変数に対するChebyshevの不等式]({{site.baseurl}}/docs/randomness/pairwise_independent/#pairwise_independent_chebyshev)から

$$
  \begin{align*}
    \Pr\left[ S \le \frac{1+n^{-c}}{2}\cdot M \right] &\le \Pr\qty[ \abs{S - \E[S]} \ge M n^{-c}/2 ] \\
    &\le \frac{M/4}{(M n^{-c}/2)^2} \\
    &\le \frac{n^{2c}}{M} \\
    &= \frac{1}{n}. & & \because M=n^{2c+1}
  \end{align*}$$

すなわち, 確率$1/n$で, アルゴリズムは $P(x_i)$ の値を誤って評価した $x_i$ の個数は高々

$$
  \begin{align*}
    \frac{1-n^{-c}}{2}\cdot M = \frac{M}{2} - \frac{n^{1+c}}{2}
  \end{align*}$$

となります.
Berlekamp-Welchアルゴリズムは, $M$個の点のうち評価を誤った点の個数が$e<\frac{M-2n+1}{2}$個である場合に正しく動作し, 上記の評価はこの条件を満たすので
確かにBerlekamp-Welchアルゴリズムを用いて多項式 $P$ を求めることができ, アルゴリズムは $P(0)=\mathrm{perm}(A)$ を出力します.
Berlekamp-Welchアルゴリズムの計算量は, ガウス消去法を用いた実装だと評価点の個数の3乗に比例するので, $O((n^{2c+1})^3)=O(n^{6c+3})$ です.

</details>



# 参考文献

[^Lip91]: R. J. Lipton. "New directions in testing," Distributed Computing and Cryptography, 1991.
[^Val79]: L. G. Valiant. "The complexity of computing the permanent," Theoretical Computer Science, 1979.
[^GS92]: P. Gemmell and M. Sudan. "Highly resilient correctors for polynomials," Information Processing Letters, 1992.
[^FL92]: U. Feige and C. Lund. "On the hardness of computing the permanent of random matrices," Computational Complexity, 1996.
[^CPS99]: J.-Y. Cai, A. Pavan, and D. Sivakumar. "On the Hardness of Permanent," STACS, 1999.
