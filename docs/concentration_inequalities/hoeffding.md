---
title: Hoeffdingの不等式
parent: 確率集中不等式
nav_order: 3
---

# Hoeffdingの不等式

* TOC
{:toc}

## 概要

Hoeffdingの不等式は独立な確率変数の和の集中性を与える基本的だが非常に有用な不等式です. 各確率変数が有界区間に値をとる場合に適用でき, 指数関数的に減衰する上界を与えます.

## 定理

{: .theorem-title }
> **定理 (Hoeffdingの不等式)**
>
> $X_1,\dots,X_n$を独立な確率変数, $S=\sum_{i\in[n]}X_i$とし, 任意の$i\in[n]$に対して$0\le X_i\le 1$とする.
> このとき, 任意の$c \ge 0$に対して
>  
> $$
  \begin{align*}
    \Pr[S \ge \E[S] + c] &\le \exp\left(-\frac{2c^2}{n}\right), \\
    \Pr[S \le \E[S] - c] &\le \exp\left(-\frac{2c^2}{n}\right).
  \end{align*}
> $$

より一般的な形では, 各確率変数が異なる区間に値をとる場合にも適用できます.

{: .theorem-title }
> **定理 (一般化された区間に対するHoeffdingの不等式)**
>
> $X_1,\ldots,X_n$を独立な確率変数とし, 各$i$に対して$a_i \le X_i \le b_i$とする. $S = \sum_{i=1}^n X_i$とすると, 任意の$t > 0$に対して
> 
> $$
  \begin{align}
    \Pr[S - \E[S] \ge t] \le \exp\left(-\frac{2t^2}{\sum_{i=1}^n (b_i - a_i)^2}\right).
  \end{align}
> $$

### 平均の集中性

Hoeffdingの不等式は独立な確率変数の平均の集中性を示すのに特に有用です.

{: .corollary }
> $X_1,\ldots,X_n$を独立で$[0,1]$に値をとる確率変数とし, $\mu = \E[X_1]$とする. このとき, 任意の$\varepsilon > 0$に対して
> 
> $$
  \begin{align}
    \Pr\left[\left|\frac{1}{n}\sum_{i=1}^n X_i - \mu\right| \ge \varepsilon\right] \le 2\exp(-2n\varepsilon^2).
  \end{align}
> $$

