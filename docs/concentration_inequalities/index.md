---
title: 確率集中不等式
nav_order: 2
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

### [Markovの不等式]({{site.baseurl}}/docs/concentration_inequalities/markov)

最も基本的な集中不等式です. 非負値をとる任意の確率変数に対して成り立つため汎用性が高いのが特徴です. 他の多くの集中不等式の証明の基礎となります.

### [Chebyshevの不等式]({{site.baseurl}}/docs/concentration_inequalities/chebyshev)

分散が小さい確率変数に対する集中性を与える不等式です. Markovの不等式よりも強い上界を与えることができますが, 分散が大きい場合にはMarkovの不等式よりも弱い上界を与えることがあります.

## 独立な確率変数の和の集中不等式

### [Hoeffdingの不等式]({{site.baseurl}}/docs/concentration_inequalities/hoeffding)

独立な確率変数の和の集中性を与える基本的だが非常に有用な不等式です. 各確率変数が有界区間に値をとる場合に適用でき, 指数関数的に減衰する上界を与えます.

### [Chernoffバウンド]({{site.baseurl}}/docs/concentration_inequalities/chernoff)

Hoeffdingの不等式と同様に, 独立な確率変数の和の集中性を与える不等式です. 各確率変数の期待値の情報を用いた上界を与えているため, 状況によってはHoeffdingの不等式よりも強い上界を与えることができます.

## 従属な確率変数の集中不等式

### [リード-$k$族の和の集中不等式]({{site.baseurl}}/docs/concentration_inequalities/read_k)

必ずしも独立とは限らない確率変数の和の集中性を与える不等式です. ハイパーグラフの最大次数が小さい場合に集中性が成り立ちます.


## 参考文献

- Boucheron, S., Lugosi, G., & Massart, P. (2013). *Concentration inequalities: A nonasymptotic theory of independence*. Oxford University Press.
