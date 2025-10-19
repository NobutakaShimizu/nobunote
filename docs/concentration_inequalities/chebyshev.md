---
title: Chebyshevの不等式
parent: 確率集中不等式
nav_order: 2
---

# Chebyshevの不等式

* TOC
{:toc}

## 概要

Chebyshevの不等式は分散が小さい確率変数に対する集中性を与える不等式です. Markovの不等式よりも強い上界を与えることができますが, 分散が大きい場合にはMarkovの不等式よりも弱い上界を与えることがあります.

## 定理

{: .proposition-title }
> **命題 (Chebyshevの不等式)**
>
> 実数値をとる確率変数$X$と任意の$a>0$に対して
> 
> $$
  \begin{align}
    \Pr[|X-\E[X]|\ge a]\le \frac{\Var[X]}{a^2}.
  \end{align}
> $$

## 証明

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">証明</summary>
  非負の確率変数$(X-\E[X])^2$に対してMarkovの不等式を適用すると

  $$
    \begin{align*}
      \Pr[|X-\E[X]|\ge a] &= \Pr[(X-\E[X])^2\ge a^2] \\
      &\le \frac{\E[(X-\E[X])^2]}{a^2} \\
      &= \frac{\Var[X]}{a^2}
    \end{align*}  $$

  より主張を得る. $\square$
</details>

## 一方向のChebyshevの不等式

Chebyshevの不等式の一方向バージョンも有用です.

{: .proposition-title }
> **命題 (一方向Chebyshevの不等式)**
>
> 実数値をとる確率変数$X$と任意の$a>0$に対して
> 
> $$
  \begin{align}
    \Pr[X-\E[X]\ge a] &\le \frac{\Var[X]}{\Var[X] + a^2}, \\
    \Pr[X-\E[X]\le -a] &\le \frac{\Var[X]}{\Var[X] + a^2}.
  \end{align}
> $$

## 応用

### 平均の集中性

Chebyshevの不等式は独立な確率変数の平均の集中性を示すのに特に有用です.

{: .corollary }
> $X_1,\ldots,X_n$を独立で同じ分布に従う確率変数とし, $\mu = \E[X_1]$, $\sigma^2 = \Var[X_1]$とする. このとき, 任意の$\varepsilon > 0$に対して
> 
> $$
  \begin{align}
    \Pr\left[\left|\frac{1}{n}\sum_{i=1}^n X_i - \mu\right| \ge \varepsilon\right] \le \frac{\sigma^2}{n\varepsilon^2}.
  \end{align}
> $$


