---
title: Markovの不等式
parent: 確率集中不等式
nav_order: 1
---

# Markovの不等式

* TOC
{:toc}

## 概要

**Markovの不等式**は最も基本的な集中不等式である。Markovの不等式は非負値をとる任意の確率変数に対して成り立つため汎用性が高いのが特徴である。一方でその汎用性が高いあまり、Markovの不等式単体で用いると弱い上界を与えることが多いが、後述するChebyshevの不等式、Chernoff限界など様々な確率集中不等式の証明に利用されている。

## 主張

{: .proposition-title }
> **補題 (Markovの不等式)**
>
> 非負値をとり期待値が存在する任意の確率変数 $X$ と任意の $a>0$ に対して
> 
> $$
  \begin{align*}
    \Pr[X\ge a]\le \frac{\E[X]}{a}.
  \end{align*}
> $$

Markovの不等式とは期待値よりはるかに大きい値をとる確率を上から抑える不等式であるので、集中不等式の一種といえる。

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">証明 ($X$ が離散値をとる場合)</summary>
  期待値の定義より、任意の $a>0$ に対して

  $$
    \begin{align*}
      \E[X]&=\sum_{x\in \supp(X)}x\cdot \Pr[X=x] \\
      &\ge \sum_{x\in\supp(X),x\ge a}x\cdot \Pr[X=x] \\
      &\ge a\cdot \sum_{x\in\supp(X),x\ge a} \Pr[X=x] \\
      &= a\cdot \Pr[X\ge a]
    \end{align*} $$

  より主張を得る。 $\square$

</details>
$X$ が連続値をとる場合についても、 $\sum$ を $\int$ に置き換えて同様に示すことができる。

## 応用

### 下界の導出

マルコフの不等式は基本的に $X$ が大きすぎないことを示すために使われるが、逆に $X$ が小さすぎないことを示すためにも用いることができる。

{: .corollary }
>
> $X$ を $[0,1]$ に値をとる確率変数とし、 $\mu = \E[X] > 0$ とすると、任意の $0\le \varepsilon \le \mu$ に対して
> 
> $$
  \begin{align*}
    \Pr[X > \mu-\varepsilon] \ge \frac{\varepsilon}{1-\mu+\varepsilon}\ge \varepsilon.
  \end{align*}
> $$

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">証明</summary>
  確率変数 $1-X$ に対してMarkovの不等式を適用すると

  $$
    \begin{align*}
      \Pr[X \le \mu-\varepsilon] &= \Pr[1-X\ge 1-\mu+\varepsilon] \\
      &\le \frac{1-\mu}{1-\mu+\varepsilon} \\
      &= 1-\frac{\varepsilon}{1-\mu+\varepsilon}
    \end{align*}  $$
  
  より主張を得る. $\square$
</details>

### Union Boundの証明

また、Markovの不等式を用いるとunion boundと呼ばれる基本的な不等式を簡単に証明できる。

{: .corollary-title }
> **系 (union bound).**
>
> 事象 $\calE_1,\dots,\calE_m$ のうち少なくとも一つが発生する確率は高々 $\Pr[\calE_1]+\dots+\Pr[\calE_m]$ である。

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">証明</summary>
  事象 $\calE_i$ の指示確率変数を $\indicator_i$ とし、 $X = \indicator_1+\dots+\indicator_m$ とする。
  つまり、 $\calE_i$ が発生したら $\indicator_i=1$、そうでなければ $\indicator_i=0$ で定まる確率変数を考える。
  少なくとも一つの事象が発生するということは $X\ge 1$ と等しいので、 $X$ に対するMarkovの不等式より

  $$
    \begin{align*}
      \Pr[\calE_1 \cup \cdots \cup \calE_m] = \Pr[X\ge 1] \le \E[X] = \Pr[\calE_1] + \cdots + \Pr[\calE_m]
    \end{align*}  $$
  
  となり主張を得る。

</details>
