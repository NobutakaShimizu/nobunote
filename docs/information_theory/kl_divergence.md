---
title: KLダイバージェンス
parent: 情報理論
nav_order: 2
---

# KLダイバージェンス

* TOC
{:toc}

## 概要

KLダイバージェンス(Kullback-Leibler divergence)は, 二つの確率分布間の「距離」を測る指標です. 情報理論, 機械学習, 統計学など様々な分野で重要な役割を果たします. ただし, 厳密には距離の公理を満たさないため, ダイバージェンス(発散)と呼ばれます.

## 定義

{: .definition-title }
> **定義 (KLダイバージェンス)**
>
> 有限集合$\calX$上に値をとる二つの確率変数$X,Y$に対して, 以下で定義される量$\KL{X}{Y}$を$X$から$Y$への**KLダイバージェンス (Kullback-Leibler divergence)**という:
>
> $$
  \begin{align*}
    \KL{X}{Y} = \sum_{x \in \calX} \Pr[X=x] \ln \frac{\Pr[X=x]}{\Pr[Y=x]}.
  \end{align*}
> $$
>
> ここで, $0 \ln 0 = 0$と約束し, $\Pr[Y=x] = 0$かつ$\Pr[X=x] > 0$の場合は$\KL{X}{Y} = \infty$とする.

KLダイバージェンスは, 確率変数$X$の分布が確率変数$Y$の分布からどれだけ「離れている」かを測ります. $\KL{X}{Y} = 0$となるのは$X$と$Y$が同じ分布に従うときです.

## 条件付きKLダイバージェンス

条件付き確率変数に対するKLダイバージェンスも定義できます.

{: .definition-title }
> **定義 (条件付きKLダイバージェンス)**
>
> 確率変数$X,Y,Z$に対して, 以下で定義される量$\KL{X \mid Y}{Z \mid Y}$を**条件付きKLダイバージェンス (conditional KL divergence)**という:
>
> $$
  \begin{align*}
    \KL{X \mid Y}{Z \mid Y} = \sum_{y \in \calY} \Pr[Y=y] \sum_{x \in \calX} \Pr[X=x \mid Y=y] \ln \frac{\Pr[X=x \mid Y=y]}{\Pr[Z=x \mid Y=y]}.
  \end{align*}
> $$

条件付きKLダイバージェンスは, 各条件$y$における条件付き確率変数$(X \mid Y=y)$と$(Z \mid Y=y)$のKLダイバージェンスを, $Y$の分布で重み付き平均したものです.

## 基本的性質

{: .proposition }
> 確率変数$X,Y$に対して
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

## エントロピーとの関係

KLダイバージェンスはエントロピーと密接な関係があります.

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

## Pinskerの不等式

KLダイバージェンスと統計距離の間には重要な関係があります.

{: .proposition-title }
> **命題 (Pinskerの不等式)**
>
> 確率変数$X,Y$に対して
> 
> $$
  \begin{align*}
    \dtv(X,Y) \le \sqrt{\frac{1}{2} \KL{X}{Y}}.
  \end{align*}
> $$
>
> ここで, $\dtv(X,Y)$は$X$と$Y$の[統計距離]({{site.baseurl}}/docs/probability_theory/statistical_distance)である.

Pinskerの不等式は, KLダイバージェンスが統計距離を上から抑えることを示しています. この不等式は, 確率変数の分布の収束性の解析において重要な役割を果たします.

## チェインルール

KLダイバージェンスにもチェインルールが成り立ちます.

{: .proposition-title }
> **命題 (チェインルール)**
>
> 確率変数$(X,Y)$と$(X',Y')$に対して
> 
> $$
  \begin{align*}
    \KL{(X,Y)}{(X',Y')} = \KL{X \mid Y}{X' \mid Y'} + \KL{Y}{Y'}.
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
    \end{align*}
  $$

  より主張を得る. $\square$
</details>

このチェインルールは, 結合確率変数のKLダイバージェンスを条件付きKLダイバージェンスと周辺分布のKLダイバージェンスに分解することを示しています.
