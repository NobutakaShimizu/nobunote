---
title: f-ダイバージェンス
parent: 情報理論
nav_order: 2
---

# f-ダイバージェンス

* TOC
{:toc}

## 概要

$f$-ダイバージェンスは、[KLダイバージェンス]({{site.baseurl}}/docs/information_theory/f_divergence/kl_divergence)や[$\chi^2$ダイバージェンス]( {{site.baseurl}}/docs/information_theory/f_divergence/chi2_divergence)を特殊ケースとして含む広いクラスの確率分布間の距離尺度である。これらのダイバージェンスが満たす重要な性質（ **非負性** や **凸性** など）はより一般に $f$-ダイバージェンスに対して成り立つ。
Bregmanダイバージェンスとは異なる概念であり、KLダイバージェンスは両者の唯一の交差点である。

## 定義

{: .definition-title }
> **定義 ($f$-ダイバージェンス)**
>
> 有限集合 $\calX$ 上に値をとる二つの確率変数 $X,Y$ と、凸関数 $f: (0,\infty) \to \mathbb{R}$ に対して、以下で定義される量 $\fdiv{f}{X}{Y}$ を $X$ から $Y$ への **$f$-ダイバージェンス** という：
>
> $$
  \begin{align*}
    \fdiv{f}{X}{Y} &= \E_{y\sim Y}\qty[ f\left(\frac{\Pr[X=y]}{\Pr[Y=y]}\right)] \\
    &= \sum_{y \in \calX} \Pr[Y=y] \cdot f\left(\frac{\Pr[X=y]}{\Pr[Y=y]}\right).
  \end{align*}
> $$
>
> ここで、 $f$ は $f(1)=0$ を満たすとする。また、 $f(0) = \lim_{t \to 0^+} f(t)$ と約束し、 $\Pr[Y=x] = 0$ かつ $\Pr[X=x] > 0$ の場合は $D_f(X \| Y) = \infty$ とする。

例えば以下の値は $f$-ダイバージェンスの特殊ケースとして表現できます:
- [KLダイバージェンス]({{site.baseurl}}/docs/information_theory/f_divergence/kl_divergence): $f(t) = t \ln t$
- [$\chi^2$ダイバージェンス]({{site.baseurl}}/docs/information_theory/f_divergence/chi2_divergence): $f(t) = (t-1)^2$
- [統計距離 (Total Variation 距離)]({{site.baseurl}}/docs/information_theory/f_divergence/statistical_distance): $f(t) = \frac{1}{2}\abs{t-1}$

## 基本的性質

{: .proposition }
> 任意の確率変数 $X,Y$ に対して $\fdiv{f}{X}{Y}\ge 0$。

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">証明</summary>
  $f$ は凸なので、Jensenの不等式から

  $$
    \begin{align*}
      \fdiv{f}{X}{Y} \ge f\left( \mathbb{E}_{y\sim Y}\qty[ \frac{\Pr[X=y]}{\Pr[Y=y]} ] \right) = f(1)=0.
    \end{align*}  $$
  
</details>

### 凸性

$f$-ダイバージェンスは、二つの確率単体上のベクトルを受け取り非負実数値を返す関数とみなすことができる。
この関数は凸関数である。
命題を述べる前に確率変数の凸結合を定義する（KLダイバージェンスのページでも定義しているが再掲）。

{: .definition-title }
> **定義 (確率変数の凸結合)**
>
> 確率変数 $X_1,\dots,X_n$ と $[n]$ 上に値を取る確率変数 $I$ に対し、 $\E_{I}[X_I]$ を、
> まず $I$ を選び、その後に $X_I$ を出力する確率変数として定義する。

{: .proposition-title }
> **命題 ($f$-ダイバージェンスの凸性)**
>
> $\fdiv{f}{\cdot}{\cdot}$ は凸関数である。すなわち、
> 確率変数 $X_1,X_2$ と $Y_1,Y_2$ に対して、任意の $\lambda \in [0,1]$ に対し
> 
> $$
  \begin{align*}
    \fdiv{f}{\E_I[X_I]}{\E_I[Y_I]} \le \lambda \cdot \fdiv{f}{X_1}{Y_1} + (1-\lambda) \cdot \fdiv{f}{X_2}{Y_2}.
  \end{align*} $$

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">証明 (簡単のため $f$ は2回微分可能とする)</summary>

関数 $g\colon (x,y)\mapsto yf(x/y)$ を考える（ $x\geq 0, y>0$ ）。この関数 $g$ のヘシアンは
    
$$\begin{align*}
          H = \frac{f''(x/y)}{y}
    \begin{bmatrix}
    1 & -\frac{x}{y} \\
    -\frac{x}{y} & \frac{x^2}{y^2}
    \end{bmatrix} \succeq 0.
    \end{align*}  $$
    
従って $g$ は凸関数であるので、

$$
  \begin{align*}
    \fdiv{f}{X}{Y} &= \E_{y\sim Y}\qty[ f\left(\frac{\Pr[X=y]}{\Pr[Y=y]}\right)] \\
    &= \sum_{y\in \supp(Y)}g(\Pr[X=y], \Pr[Y=y]).
  \end{align*}
$$

もまた凸である。
  
</details>

### データ処理不等式

$f$-ダイバージェンスは、確率変数に対する任意の関数(データ処理)に対して単調性を満たす。

{: .theorem-title }
> **定理 (f-ダイバージェンスのデータ処理不等式)**
>
> 確率変数$X,Y$と任意の関数$f: \calX \to \calZ$, 凸関数$f$に対して
> 
> $$
  \begin{align*}
    \fdiv{f}{f(X)}{f(Y)} \le \fdiv{f}{X}{Y}.
  \end{align*}
> $$

