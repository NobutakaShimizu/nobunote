---
title: 確率集中不等式
parent: 確率論
nav_order: 1
---

# 確率集中不等式

* TOC
{:toc}

## 概要

確率集中不等式(concentration inequality)とは, 興味の対象となる確率変数が高確率でその期待値もしくは中央値付近の値をとることを主張する結果です. 例えば, 実数値をとり期待値が存在する確率変数$Y$に対して以下の確率

$$
\begin{align*}
&\Pr[Y\ge \E[Y] + \delta] \\
&\Pr[Y\le \E[Y] - \delta]
\end{align*}
$$

のできるだけ良い上界(もしくは下界)を与えることが目標です. このような確率集中不等式は様々な分野で利用されており, 確率論, 統計学, 情報理論, 機械学習, 理論計算機科学など幅広い分野で利用されています.

## 基本的な不等式

### Markovの不等式

**Markovの不等式**は最も基本的な集中不等式です. Markovの不等式は非負値をとる任意の確率変数に対して成り立つため汎用性が高いのが特徴です. 一方でその汎用性が高いあまり, Markovの不等式単体で用いると弱い上界を与えることが多いのですが, 後述するChebyshevの不等式, Chernoff限界など様々な確率集中不等式の証明に利用されています.

{: .lemma-title }
> **補題 (Markovの不等式)**
> 非負値をとり期待値が存在する任意の確率変数$X$と任意の$a>0$に対して
> 
> $$
  \begin{align*}
    \Pr[X\ge a]\le \frac{\E[X]}{a}.
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

マルコフの不等式は基本的に$X$が大きすぎないことを示すために使われますが, 逆に$X$が小さすぎないことを示すためにも用いることができます.

{: .corollary }
>
> $X$を$[0,1]$に値をとる確率変数とし, $\mu = \E[X] > 0$とすると, 任意の$0\le \varepsilon \le \mu$に対して
> 
> $$
  \begin{align*}
    \Pr[X > \mu-\varepsilon] \ge \frac{\varepsilon}{1-\mu+\varepsilon}\ge \varepsilon.
  \end{align*}
> $$

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">証明</summary>
  確率変数$1-X$に対してMarkovの不等式を適用すると

  $$
    \begin{align*}
      \Pr[X \le \mu-\varepsilon] &= \Pr[1-X\ge 1-\mu+\varepsilon] \\
      &\le \frac{1-\mu}{1-\mu+\varepsilon} \\
      &= 1-\frac{\varepsilon}{1-\mu+\varepsilon}
    \end{align*}
  $$
  
  より主張を得る. $\square$
</details>

また, Markovの不等式を用いるとunion boundと呼ばれる基本的な不等式を簡単に証明できます (意外とこのことを知らない人が多いような気がします).

{: .corollary-title }
> **系 (union bound).**
>
> 事象$\calE_1,\dots,\calE_m$のうち少なくとも一つが発生する確率は高々$\Pr[\calE_1]+\dots+\Pr[\calE_m]$である.

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">証明</summary>
  事象$\calE_i$の指示確率変数を$\indicator_i$とし, $X = \indicator_1+\dots+\indicator_m$とします.
  つまり, $\calE_i$が発生したら$\indicator_i=1$, そうでなければ$\indicator_i=0$で定まる確率変数を考えます.
  少なくとも一つの事象が発生するということは$X\ge 1$と等しいので, $X$に対するMarkovの不等式より

  $$
    \begin{align*}
      \Pr[\calE_1 \cup \cdots \cup \calE_m] = \Pr[X\ge 1] \le \E[X] = \Pr[\calE_1] + \cdots + \Pr[\calE_m]
    \end{align*}
  $$
  
  となり主張を得ます.

</details>

### Chebyshevの不等式

Chebyshevの不等式は分散が小さい確率変数に対する集中性を与える不等式です. Markovの不等式よりも強い上界を与えることができますが, 分散が大きい場合にはMarkovの不等式よりも弱い上界を与えることがあります.

{: .lemma-title }
> **補題 (Chebyshevの不等式)**
> 実数値をとる確率変数$X$と任意の$a>0$に対して
> 
> $$
  \begin{align}
    \Pr[|X-\E[X]|\ge a]\le \frac{\Var[X]}{a^2}.
  \end{align}
> $$

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

  より主張を得る. $\square$
</details>

## 独立な確率変数の和の集中不等式

### Hoeffdingの不等式

Hoeffdingの不等式は独立な確率変数の和の集中性を与える基本的だが非常に有用な不等式です. 

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

### Chernoffバウンド

Chernoffバウンド (Chernoff bound) はHoeffdingの不等式と同様に, 独立な確率変数の和の集中性を与える不等式です. Hoeffdingの不等式では各確率変数$X_i$が$[0,1]$区間に収まる場合に成り立つ汎用的な不等式ですが, Chernoffバウンドではさらに$X_i$の期待値の情報を用いた上界を与えているため, 状況によってはHoeffdingの不等式よりも強い上界を与えることができます.

{: .lemma-title }
> **補題 (Chernoffバウンド)**
> $X_1,\dots,X_n$を独立な確率変数, $S=\sum_{i\in[n]}X_i$とし, 任意の$i\in[n]$に対して$0\le X_i\le 1$とする.
> このとき, 任意の$c \ge 0$に対して
>  
> $$
  \begin{align*}
    \Pr[S \ge \E[S] + c] &\le \exp\left(-\frac{c^2}{2\E[S] + 2c/3}\right), \\
    \Pr[S \le \E[S] - c] &\le \exp\left(-\frac{c^2}{2\E[S]}\right).
  \end{align*}
> $$

[Hoeffdingの不等式](#hoeffdingの不等式)と比較すると, 期待値$\E[S]$が小さい場合にはChernoffバウンドの方が強い上界を与えることがわかります.

## 従属な確率変数の集中不等式

### リード-$k$族の和の集中不等式

[Gavinsky, Lovett, Saks, Srinivasan (2014)](https://onlinelibrary.wiley.com/doi/10.1002/rsa.20532)による集中不等式を紹介します.
ChernoffバウンドやHoeffdingバウンドは独立な確率変数$Y_1,\dots,Y_n$の和の集中性を保証します.
これを, 必ずしも$Y_1,\dots,Y_n$が独立とは限らない場合に拡張することを考えます.
もちろん, どんな場合でも必ず集中性が保証されるわけではありませんが, $Y_1,\dots,Y_n$たちの従属関係が何かしら良い構造を持つときにその性質を利用しようと思うわけです.

ハイパーグラフによって従属関係が表現された確率変数族を考えます.

{: .definition }
> ハイパーグラフ$\calH=(V,\calE)$を考え,
> 各ハイパー辺$e \in \calE$には関数$f_e \colon [0,1]^{e} \to [0,1]$が付随しているとします.
> 各頂点ごとに独立な$[0,1]$値の確率変数$X_v$を考えたとき, 各ハイパー辺$e\in \calE$に対し,
> 
> $$
  \begin{align*}
    Y_e = f_e(X\restr{e})
  \end{align*}
> $$
>
> によって定まる確率変数の族$(Y_e)_{e\in \calE}$を, **$\calH$-従属な確率変数族**と呼ぶ.

{: .remark }
> $\calH$-従属という用語は一般的な用語ではなく, このノートで局所的に便宜上用いる用語です.

ハイパーグラフ$\calH$の構造的性質を和 $\sum_{e\in \calE}Y_e$ の集中性に反映させることが目標です.
この設定はChernoffバウンドやHoeffdingバウンドを特殊ケースとして含んでいます.
実際, 各ハイパー辺$e_i$がシングルトンで$e_i=\{v_i\}$のようになっているとき, $(Y_e)$は独立な確率変数族となります.

[Gavinsky, Lovett, Saks, Srinivasan (2014)](https://onlinelibrary.wiley.com/doi/10.1002/rsa.20532)は, ハイパーグラフ$\calH$の最大次数が小さいときに集中性が成り立つことを証明しました.

{: .definition-title }
> **定義(リード-$k$族).**
>
> 最大次数が高々$k$であるハイパーグラフ$\calH=(V,\calE)$に対し, $\calH$-従属な確率変数族を**リード-$k$族 (read-$k$ family)**という.

{: .theorem-title }
> **定理 ([Gavinsky, Lovett, Saks, Srinivasan (2014)](https://onlinelibrary.wiley.com/doi/10.1002/rsa.20532))**.
>
> 確率変数$Y_1,\dots,Y_m$をリード-$k$族とし,
> 和を$S=\sum_{e\in \calE} Y_e$, 
> 期待値の平均を$\mu = \frac{\E[S]}{m}$とする.
> 任意の$\delta>0$に対して以下が成り立つ:
> 
> $$
  \begin{align*}
    &\Pr \qty[ S \ge \qty(\mu + \delta) ] \le \exp\qty(- \frac{m}{k}\cdot \KL {\mu+\delta} \mu),\\
    &\Pr \qty[ S \le \qty(\mu - \delta) ] \le \exp\qty(- \frac{m}{k}\cdot \KL {\mu-\delta}{\mu}).
  \end{align*}
> $$
>
> ここで, $\KL{p}{q}=p\log\frac{p}{q} + (1-p)\log\frac{1-p}{1-q}$は二値KLダイバージェンス(もしくは二値相対エントロピー)と呼ばれる ($\log$は自然対数).

{: .proposition }
> 二値KLダイバージェンスについては以下の不等式が成り立つ.
> 任意の$p,q\in[0,1]$に対して
> 
> $$
  \begin{align*}
    &\KL p q \ge 2(p-q)^2 & & \text{(Pinskerの不等式)} \\
    &\KL p q \ge \frac{(p-q)^2}{\max(p,q)}.
  \end{align*}
> $$
