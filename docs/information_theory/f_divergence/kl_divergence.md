---
title: KLダイバージェンス
parent: f-ダイバージェンス
nav_order: 1
---

# KLダイバージェンス

* TOC
{:toc}

## 概要

KLダイバージェンス(Kullback-Leibler divergence)は、二つの確率分布間の「距離」を測る指標である。情報理論、機械学習、統計学など様々な分野で重要な役割を果たす。ただし、厳密には距離の公理を満たさないため、ダイバージェンス（発散）と呼ばれる。

## 定義

{: .definition-title }
> **定義 (KLダイバージェンス)**
>
> 有限集合 $\calX$ 上に値をとる二つの確率変数 $X,Y$ に対して、以下で定義される量 $\KL{X}{Y}$ を $X$ から $Y$ への **KLダイバージェンス (Kullback-Leibler divergence)** という：
>
> $$
  \begin{align*}
    \KL{X}{Y} = \sum_{x \in \calX} \Pr[X=x] \ln \frac{\Pr[X=x]}{\Pr[Y=x]}.
  \end{align*}
> $$
>
> ここで、 $0 \ln 0 = 0$ と約束し、 $\Pr[Y=x] = 0$ かつ $\Pr[X=x] > 0$ の場合は $\KL{X}{Y} = \infty$ とする。

KLダイバージェンスは、確率変数 $X$ の分布が確率変数 $Y$ の分布からどれだけ「離れている」かを測る。 $\KL{X}{Y} = 0$ となるのは $X$ と $Y$ が同じ分布に従うときである。

## 条件付きKLダイバージェンス

条件付き確率変数に対するKLダイバージェンスも定義できる。

{: .definition-title }
> **定義 (条件付きKLダイバージェンス)**
>
> 確率変数 $X,Y,Z$ に対して、以下で定義される量 $\KL{X \mid Y}{Z \mid Y}$ を **条件付きKLダイバージェンス** という：
>
> $$
  \begin{align*}
    \KL{X \mid Y}{Z \mid Y} = \sum_{y \in \calY} \Pr[Y=y] \sum_{x \in \calX} \Pr[X=x \mid Y=y] \ln \frac{\Pr[X=x \mid Y=y]}{\Pr[Z=x \mid Y=y]}.
  \end{align*}
> $$

条件付きKLダイバージェンスは、各条件 $y$ における条件付き確率変数 $(X \mid Y=y)$ と $(Z \mid Y=y)$ のKLダイバージェンスを、 $Y$ の分布で重み付き平均したものである。

## 基本的性質

{: .proposition }
> 確率変数 $X,Y$ に対して
> 
> $$
  \begin{align*}
    \KL{X}{Y} \ge 0.
  \end{align*}
> $$
>
> 等号が成り立つのは$X$と$Y$が同じ分布に従うときである.

この性質は, KLダイバージェンスが非負であることを示しています.

{: .remark }
> KLダイバージェンスは対称ではない. つまり, 一般に
> 
> $$
  \begin{align*}
    \KL{X}{Y} \ne \KL{Y}{X}.
  \end{align*}
> $$

### 凸性

KLダイバージェンスは, 二つの確率単体上のベクトルを受け取り非負実数値を返す関数とみなすことができます.
この関数は凸関数です.
命題を述べる前に確率変数の凸結合を定義します.

{: .definition-title }
> **定義 (確率変数の凸結合)**
>
> 確率変数$X_1,\dots,X_n$ と $[n]$ 上に値を取る確率変数 $I$ に対し, $\E_{I}[X_I]$を,
> まず$I$を選び, その後に$X_I$を出力する確率変数として定義する.

文脈によっては分布の凸結合ではなく, 出力値の凸結合を表すこともありえますが,
その場合は必ずどちらの意味での凸結合なのかを明記します.

{: .proposition-title }
> **命題 (KLダイバージェンスの凸性)**
>
> KLダイバージェンス $\KL{\cdot}{\cdot}$は凸関数である. すなわち, 二つの確率変数 $X_1,X_2$と$Y_1,Y_2$に対して, 任意の$\lambda \in [0,1]$に対し, $I$を$\Ber(\lambda)$に従う確率変数とすると
> 
> $$
  \begin{align*}
    \KL{\E_I[X_I]}{\E_I[Y_I]} \le \lambda \cdot \KL{X_1}{Y_1} + (1-\lambda) \cdot \KL{X_2}{Y_2}.
  \end{align*} $$

これは[$f$-ダイバージェンス]({{site.baseurl}}/docs/information_theory/f_divergence)の凸性の特殊ケースですので, そこを参照してください.


### エントロピーとの関係

シャノンエントロピーはKLダイバージェンスの言葉で表現できます.

{: .proposition }
> 確率変数$X$と一様分布に従う確率変数$U$に対して
> 
> $$
  \begin{align*}
    \KL{X}{U} = \ln \vert\calX\vert - \entropy(X).
  \end{align*}
> $$
>
> ここで, $\entropy(X)$は確率変数$X$の[シャノンエントロピー]({{site.baseurl}}/docs/information_theory/shannon_entropy)である.

この関係式は, KLダイバージェンスが確率変数の分布の一様性からの「ずれ」を測ることを示しています.

### Pinskerの不等式

KLダイバージェンスと統計距離の間には重要な関係があります. 詳細は[Pinskerの不等式]({{site.baseurl}}/docs/information_theory/pinsker)のページを参照してください.

### チェインルール

KLダイバージェンスにもチェインルールが成り立ちます.

{: .proposition-title }
> **命題 (チェインルール)**
>
> 確率変数$(X,Y)$と$(X',Y')$に対して
> 
> $$
  \begin{align*}
    \KL{X,Y}{X',Y'} = \KL{X \mid Y}{X' \mid Y'} + \KL{Y}{Y'}.
  \end{align*}
> $$
>
> ここで, $\KL{X \mid Y}{X' \mid Y'}$は条件付きKLダイバージェンスである.

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">証明</summary>
結合確率変数のKLダイバージェンスの定義より

  $$
    \begin{align*}
      \text{左辺} &= \sum_{x,y} \Pr[X=x,Y=y] \ln \frac{\Pr[X=x,Y=y]}{\Pr[X'=x,Y'=y]} \\
      &= \sum_{x,y} \Pr[X=x,Y=y] \ln \frac{\Pr[Y=y] \Pr[X=x \mid Y=y]}{\Pr[Y'=y] \Pr[X'=x \mid Y'=y]} \\
      &= \sum_{x,y} \Pr[X=x,Y=y] \ln \frac{\Pr[Y=y]}{\Pr[Y'=y]} \\
      &\qquad + \sum_{x,y} \Pr[X=x,Y=y] \ln \frac{\Pr[X=x \mid Y=y]}{\Pr[X'=x \mid Y'=y]} \\
      &= \sum_{y} \Pr[Y=y] \ln \frac{\Pr[Y=y]}{\Pr[Y'=y]} \\
      &\qquad + \sum_{y} \Pr[Y=y] \sum_{x} \Pr[X=x \mid Y=y] \ln \frac{\Pr[X=x \mid Y=y]}{\Pr[X'=x \mid Y'=y]} \\
      &= \KL{Y}{Y'} + \KL{X \mid Y}{X' \mid Y'} \\
      &= \text{右辺}
    \end{align*} $$

  より主張を得る. $\square$
</details>

このチェインルールは, 結合確率変数のKLダイバージェンスを条件付きKLダイバージェンスと周辺分布のKLダイバージェンスに分解することを示しています.

### データ処理不等式

KLダイバージェンスは、確率変数に対する任意の関数(データ処理)に対して単調性を満たす。この性質は**データ処理不等式**と呼ばれる。

{: .theorem-title }
> **定理 (データ処理不等式)**
>
> 確率変数$X,Y$と任意の関数$f: \calX \to \calZ$に対して
> 
> $$
  \begin{align*}
    \KL{f(X)}{f(Y)} \le \KL{X}{Y}.
  \end{align*}
> $$

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">証明</summary>
確率変数 $(X,f(X))$ と $(Y,f(Y))$ を考えると

$$
  \begin{align*}
  \mathrm{KL}(X,f(X)||Y,f(Y))&= \mathrm{KL}(X||Y)+\mathrm{KL}(f(X)|X||f(Y)|Y) & & \text{chain rule} \\
  &= \mathrm{KL}(X||Y) + \mathbb{E}_{x\sim X}[\mathrm{KL}(f(X)|_{X=x}|f(Y)|_{Y=x}] \\
  &= \mathrm{KL}(X||Y) +
  \mathbb{E}_{x\sim X}[\mathrm{KL}(f(x)||f(x))] \\
  &= \mathrm{KL}(X||Y).
  \end{align*}
$$

が成り立ちます. 従って

$$
  \begin{align*}
  &\mathrm{KL}(X||Y)-\mathrm{KL}(f(X)||f(Y)) \\
  &= \mathrm{KL}(X,f(X)||Y,f(Y)) - \mathrm{KL}(f(X)||f(Y)) \\
  &= \mathrm{KL}(X|f(X)||Y|f(Y)) \\
  &\geq 0.
  \end{align*}
$$

を得ます (最後の不等式ではKLダイバージェンスの非負性を用いた). $\square$
</details>

### 条件付きKLダイバージェンスの性質

{: .proposition }
> 二つの確率変数の組$(X,Y),(X',Y')$を考える. $X'$と$Y'$が独立ならば
> 
>$$  \begin{align*}
    \KL{X \mid Y}{X' \mid Y'} \ge \KL{X}{X'}.
  \end{align*}$$

特に, 両辺に $\KL{Y}{Y'}$を足すと, 左辺はチェインルールより$\KL{(X,Y)}{(X',Y')}$となるので,

$$
  \begin{align*}
    \KL{X,Y}{X',Y'} \ge \KL{X}{X'} + \KL{Y}{Y'}
  \end{align*}
$$

が得られる.

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">証明</summary>

ランダムに選ばれた$y\sim Y$に対して$X\mid_{Y=y}$ を出力する確率変数は $X$ と同じ分布となる.
KLダイバージェンスの凸性から

$$
  \begin{align*}
    \KL{X \mid Y}{X' \mid Y'} &= \E_{y\sim Y} \qty[ \KL{X \mid_{Y=y}}{X'\mid_{Y'=y} }] \\
    &\ge \KL{ \E_{y\sim Y} [X \mid_{Y=y}] }{ \E_{y\sim Y} [X' \mid_{Y'=y}] } & & \text{Jensenの不等式}\\
    &= \KL{X}{X'}.
  \end{align*}
$$


</details>