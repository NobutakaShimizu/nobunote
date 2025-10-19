---
title: Pinskerの不等式
parent: 情報理論
nav_order: 4
---

# Pinskerの不等式

* TOC
{:toc}

## 概要

Pinskerの不等式(Pinsker's inequality)は, [KLダイバージェンス]({{site.baseurl}}/docs/information_theory/f_divergence/kl_divergence) $\KL{X}{Y}$ と[統計距離]({{site.baseurl}}/docs/probability_theory/statistical_distance) $\dtv(X,Y)$ の間の重要な関係を表す不等式です. この不等式は, 確率変数の分布の収束性の解析において重要な役割を果たします。

## 定理

{: .theorem-title }
> **定理 (Pinskerの不等式)**
>
> 確率変数$X,Y$に対して
> 
> $$
  \begin{align*}
    2\dtv(X,Y)^2 \le \KL{X}{Y}.
  \end{align*}
> $$

## 証明

Pinskerの不等式の証明は, 以下の主要なステップから構成されます:

1. **データ処理不等式の適用**: 関数$f(x) = \indicator_{x \in S}$を用いて, データ処理不等式を適用
2. **二値KLダイバージェンスの評価**: $\binset$値確率変数のKLダイバージェンスを解析的に評価する




