---
title: 行列積
nav_order: 4
parent: 最悪時から平均時への帰着
---

# 行列積

行列積問題は, 2つの正方行列$A,B$が与えられたとき, その積$AB$を計算する問題です.
また, ここでは簡単のため有限体$\F_q$上の行列の演算を考えます.
一般に$\F_q$上の演算は$O(\polylog q)$時間で行えますが, 簡単のためここでは$O(1)$時間で行えると仮定します.
行列積の平均時計算量では, 一様ランダムな行列が入力として与えられる場合を考えます.

{: .definition }
> アルゴリズム$M$が**成功確率$\alpha(n)$**で行列積を解くとは, 全ての十分大きな$n\in\Nat$に対して
> 
> $$
  \begin{align*}
    \Pr_{A,B\sim \F_q^{n\times n}}\left[ M(A,B) = AB \right] \ge \alpha(n)
  \end{align*}
> $$
>
> が成り立つことをいう.

Blum, Luby, Rubinfeld (1993)は行列積を高い成功確率で解くアルゴリズムが存在するならば,
それを使って任意の入力に対して行列積を解くアルゴリズムを設計できることを示しました.[^BLR93]

[^BLR93]: M. Blum, M. Luby, and R. Rubinfeld. "Self-testing/correcting with applications to numerical problems," Journal of Computer and System Sciences, 1993.

<div id="prop:BLR" markdown="1">
{: .proposition-title }
> **命題1 (Blum, Luby, Rubinfeld, 1993).**
>
> ランダム行列上で成功確率$0.9$で行列積を解く$T(n)$時間アルゴリズムが存在するならば, 全ての入力に対して行列積を解く$O(T(n))$時間乱択アルゴリズムが存在する.
</div>

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">証明</summary>
  ランダム行列の行列積を成功確率$0.9$で解くアルゴリズムを$M$とします.
  任意の入力$A,B\in\F_q^{n\times n}$に対して, $M$を使って次のように行列積を計算するアルゴリズム$M'$を考えます:
  1. 一様ランダムな行列$R_1,S_1\sim\F_q^{n\times n}$を選び, $R_2 = A-R_1,S_2=B-S_1$とします.
  2. $\sum_{i,j\in[n]}M(R_i,S_j)$を出力します.

  ステップ1で選んだ行列$R_1,S_1$が一様ランダムなので, 各$R_i,S_j$の周辺分布は一様ランダムとなるので, 確率$0.9$で$M(R_i,S_j)=R_iS_j$となります.
  従って$i,j\in[2]$に関するunion boundより

  $$
    \begin{align*}
      \Pr_{R_1,S_1}\qty[ {}^{\forall}i,j\in[2],\quad M(R_i,S_j) = R_iS_j ] \ge 0.6.
    \end{align*}
  $$

  よって確率$0.6$で$M'(A,B)=\sum_{i,j\in[2]} R_i S_j = (R_1+R_2)(S_1+S_2)=AB$となります.  
</details>

[命題1](#prop:BLR)では平均時アルゴリズムは高い成功確率$0.9$を持つ必要がありますが,
より小さい成功確率を持つ平均時アルゴリズムに対しても同様の帰着が成り立つことがAsadiら(2022)[^AGGS22]やHirahara and Shimizu(2023)[^HS23]によって示されました.

{: .theorem-title }
> **定理2 (Asadi et al., 2022).**
>
> ランダム行列上で成功確率$\alpha=\alpha(n)$で行列積を解く$T(n)$時間アルゴリズムが存在するならば, 全ての入力に対して行列積を解く$2^{\log^5(1/\alpha)}\cdot T(n)$時間乱択アルゴリズムが存在する.

Asadiら(2022)の証明はBogolyubov-Ruzsaの補題と呼ばれる加法的組合せ論の結果に基づいています.
詳細は[こちら](https://drive.google.com/file/d/1voRcUZFLsobrirvYycH_H5UQFp-8kxRF/view)の解説pdfをご覧ください.

{: .theorem-title }
> **定理3 (Hirahara and Shimizu, 2023).**
>
> ランダム行列上で成功確率$\alpha=\alpha(n)$で行列積を解く$T(n)$時間アルゴリズムが存在するならば, 全ての入力に対して行列積を解く$(1/\alpha)\polylog(1/\alpha)\cdot T(n)$時間乱択アルゴリズムが存在する.

Hirahara and Shimizu(2023)の証明は[直積定理]({{site.baseurl}}/docs/average_case_complexity/direct_product_theorem)に基づくものであり, 非常にシンプルな証明になっています.
詳細は[こちら](https://drive.google.com/file/d/1X1zAuf-D8_ordrpBqZiivhvNfxtoio9A/view)の解説pdfをご覧ください.

[^AGGS22]: V. Asadi, A. Golovnev, T. Gur, and I. Shinkar. "Worst-case to average-case reductions via additive combinatorics." Symposium on Theory of Computing (STOC), 2022.
[^HS23]: S. Hirahara and N. Shimizu. "Hardness Self-Amplification: Simplified, Optimized, and Unified." Symposium on Theory of Computing (STOC), 2023.


ここでは, 有限体$\F_q$が大きいに成り立つ以下の命題の簡単な証明を紹介します.
この証明はAsadiら(2022)の論文に載っているものを少し修正したものです.

{: .proposition-title }
> **命題4.**
>
> 任意に定数$\alpha\in(0,1]$を固定し, $q>\frac{100}{\alpha}$とする.
> ランダム行列上で成功確率$\alpha$で行列積を解く$T(n)$時間アルゴリズムが存在するならば, 全ての入力に対して行列積を解く$O(T(n))$時間乱択アルゴリズムが存在する.

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">証明</summary>
  ランダム行列積を解くアルゴリズムを$M$とし,　最悪時の入力$A,B\in\F_q^{n\times n}$に対して以下のようにして$AB$を計算します:
  1. 一様ランダムに$R_1,R_2,S_1,S_2\sim\F_q^{n\times n}$を選ぶ.
  2. 各$t\in\F_q$に対し, $\overline{A}(t) = A + R_1t + R_2t^2$, $\overline{B}(t) = B + S_1t + S_2 t^2$とする. このとき, $\overline{A}(t)\overline{B}(t)$は$t$を変数とみなすと各成分が$\F_q[t]$の4次多項式となる.
  3. 相異なる各$t_1,t_2,t_3,t_4,t_5\in\F_p\setminus\set{0}$と$i\in[5]$に対し, $C_i = M(\overline{A}(t_i),\overline{B}(t_i))$を計算する. もし全ての$i\in[5]$に対して$C_i = \overline{A}(t_i)\overline{B}(t_i)$が成り立つとき, 多項式補間によって$\overline{A}(0)\overline{B}(0)=AB$を計算して出力する.

  上記の帰着ではステップ3で行列積の検算を行っていますがこれは$O(n^2)$時間でできることが知られているので[^Fre79], 全体の計算時間は$O(T(n))$となります.

  任意の$A,B\in\F_q^{n\times n}$に対して, 一様ランダムな$R_1,R_2,S_1,S_2$を選んだとき, 確率変数族$(\overline{A}(t),\overline{B}(t))_{t\ne 0}$はペア独立になります([ペア独立の例4]({{site.baseurl}}/docs/tools/pairwise_independent#例4-ランダムな二次曲線)参照).
  確率変数$X_t\in\{0,1\}$を

  $$
    \begin{align*}
      X_t = \begin{cases}
        1 & \text{if } M(\overline{A}(t),\overline{B}(t)) = \overline{A}(t)\overline{B}(t), \\
        0 & \text{otherwise}
      \end{cases}
    \end{align*}
  $$

  とすると$$(X_t)_{t\ne 0}$$ はペア独立であり, それぞれの
  $(\overline{A}(t),\overline{B}(t))$
  の周辺分布は$t\ne 0$のとき, $\qty(\F_q^{n\times n})^2$上で一様なので,
  $\E[X_t]=\alpha$となります.
  従って, [Chebyshevの不等式]({{site.baseurl}}/docs/tools/pairwise_independent#pairwise_independent_chebyshev)より, $q>\frac{100}{\alpha}$のとき, $\E[\sum_{t\ne 0}X_]\ge 100$となり, $\Pr[\sum_{t\ne 0}X_t]\ge 5$となります. すなわち5個の点$t\ne 0$で$\overline{A}(t)\overline{B}(t)$が計算できるので, ステップ3で$\overline{A}(0)\overline{B}(0)=AB$を計算できます.

</details>

[^Fre79]: R. Freivalds. "Fast probabilistic algorithms." Mathematical Foundations of Computer Science (MFCS), 1979.
