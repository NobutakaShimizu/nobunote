---
title: よく使う不等式
parent: よく使う道具
nav_order: 1
---

# よく使う不等式

確率に関するよく使う不等式を紹介していきます.
基本的には様々な**確率集中不等式 (concentration inequality)**を紹介していきます.
確率集中不等式とは, 興味の対象となる確率変数が高確率でその期待値もしくは中央値付近の値をとることを主張する結果です. 例えば, 実数値をとり期待値が存在する確率変数$Y$に対して以下の確率

$$
\begin{align*}
&\Pr[Y\ge \mathbb{E}[Y] + \delta] \\
&\Pr[Y\le \mathbb{E}[Y] - \delta]
\end{align*}
$$

のできるだけ良い上界(もしくは下界)を与えることが目標です. このような確率集中不等式は様々な分野で利用されており, 確率論, 統計学, 情報理論, 機械学習, 理論計算機科学など幅広い分野で利用されています.

## Markovの不等式
**Markovの不等式**は最も基本的な集中不等式です. Markovの不等式は非負値をとる任意の確率変数に対して成り立つため汎用性が高いのが特徴です. 一方でその汎用性が高いあまり, Markovの不等式単体で用いると弱い上界を与えることが多いのですが, 後述するChebyshevの不等式, Chernoff限界など様々な確率集中不等式の証明に利用されています.


{: .lemma-title }
> **補題 (Markovの不等式)**
> 非負値をとり期待値が存在する任意の確率変数$X$と任意の$a>0$に対して
> 
> $$
  \begin{align*}
    \Pr[X\ge a]\le \frac{\mathbb{E}[X]}{a}.
  \end{align*}
> $$

Markovの不等式とは期待値よりはるかに大きい値をとる確率を上から抑える不等式ですので, 集中不等式の一種といえるでしょう.

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">証明 ($X$が離散値をとる場合)</summary>
  期待値の定義より, 任意の$a>0$に対して

  $$
    \begin{align*}
      \E[X]&=\sum_{x\in \supp(X)}x\cdot \Pr[X=x] \\
      &\ge \sum_{x\in\supp(X),x\ge a}x\cdot \Pr[X=x] \\
      &\ge a\cdot \sum_{x\in\supp(X),x\ge a} \Pr[X=x] \\
      &= a\cdot \Pr[X\ge a]
\end{align*}
  $$

  より主張を得る. $\square$

</details>
$X$が連続値をとる場合についても, $\sum$を$\int$に置き換えて同様に示すことができます.

## Chebyshevの不等式
Chebyshevの不等式は分散が小さい確率変数に対する集中性を与える不等式です. Markovの不等式よりも強い上界を与えることができますが, 分散が大きい場合にはMarkovの不等式よりも弱い上界を与えることがあります.

<div id="chebyshev-inequality" markdown="1">
{: .lemma-title }
> **補題 (Chebyshevの不等式)**
> 実数値をとる確率変数$X$と任意の$a>0$に対して
> 
> $$
  \begin{align*}
    \Pr[|X-\mathbb{E}[X]|\ge a]\le \frac{\Var[X]}{a^2}.  
  \end{align*}
> $$
</div>

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">証明</summary>
  非負の確率変数$(X-\E[X])^2$に対してMarkovの不等式を適用すると

  $$
    \begin{align*}
      \Pr[|X-\E[X]|\ge a] &= \Pr[(X-\E[X])^2\ge a^2] \\
      &\le \frac{\E[(X-\E[X])^2]}{a^2} \\
      &= \frac{\Var[X]}{a^2}
    \end{align*}
  $$

  より主張をえる. $\square$
</details>

## Hoeffdingの不等式
Hoeffdingの不等式は独立な確率変数の和の集中性を与える基本的だが非常に有用な不等式です. 

<div id="hoeffding-inequality" markdown="1">
{: .lemma-title }
> **補題 (Hoeffdingの不等式)**
> $X_1,\dots,X_n$を独立な確率変数, $S=\sum_{i\in[n]}X_i$とし, 任意の$i\in[n]$に対して$0\le X_i\le 1$とする.
> このとき, 任意の$c \ge 0$に対して
>  
> $$
  \begin{align*}
    \Pr[S \ge \E[S] + c] &\le \exp\left(-\frac{2c^2}{n}\right), \\
    \Pr[S \le \E[S] - c] &\le \exp\left(-\frac{2c^2}{n}\right).
  \end{align*}
> $$
</div>

## Chernoff限界
Chernoff限界 (Chernoff bound) はHoeffdingの不等式と同様に, 独立な確率変数の和の集中性を与える不等式です. Hoeffdingの不等式では各確率変数$X_i$が$[0,1]$区間に収まる場合に成り立ちます汎用的な不等式ですが, Chernoff限界ではさらに$X_i$の期待値の情報を用いた上界を与えているため, 状況によってはHoeffdingの不等式よりも強い上界を与えることができます.

{: .lemma-title }
> **補題 (Chernoff限界)**
> $X_1,\dots,X_n$を独立な確率変数, $S=\sum_{i\in[n]}X_i$とし, 任意の$i\in[n]$に対して$0\le X_i\le 1$とする.
> このとき, 任意の$c \ge 0$に対して
>  
> $$
  \begin{align*}
    \Pr[S \ge \E[S] + c] &\le \exp\left(-\frac{c^2}{2\E[S] + 2c/3}\right), \\
    \Pr[S \le \E[S] - c] &\le \exp\left(-\frac{c^2}{2\E[S]}\right).
  \end{align*}
> $$


<a href="#hoeffding-inequality">Hoeffdingの不等式</a>と比較すると, 期待値$\E[S]$が小さい場合にはChernoff限界の方が強い上界を与えることがわかります.