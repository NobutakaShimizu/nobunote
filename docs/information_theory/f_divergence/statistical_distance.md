---
title: 統計距離
parent: f-ダイバージェンス
nav_order: 3
---

# 統計距離

* TOC
{:toc}

## 概要

統計距離（または全変動距離）は確率分布間の距離の一つである。統計距離は[f-ダイバージェンス]({{site.baseurl}}/docs/information_theory/f_divergence)の特殊な場合として表現できる。具体的には、 $f(t) = \frac{1}{2}|t-1|$ とすると統計距離が得られる。

{: .definition }
> 有限集合 $V$ 上に値をとる二つの分布 $\mu,\nu\in[0,1]^V$ の **統計距離** を
>
> $$
  \begin{align*}
    \dtv(\mu,\nu) = \frac{1}{2} \sum_{v \in V} |\mu(v) - \nu(v)|
  \end{align*}
> $$
> 
> で定める.

同様に、二つの確率変数 $X,Y$ の間の統計距離 $\dtv(X,Y)$ を、それらの確率変数の分布の統計距離として定義する。

## 性質

<div id="prop:statistical_distance_ineq" markdown="1">
{: .proposition }
> 台集合 $V$ 上の二つの確率変数 $X,Y$ および $V$ 上の任意の事象 $\calE\subseteq V$ に対して
> 
> $$
  \begin{align*}
    \abs{\Pr[X\in\calE] - \Pr[Y\in\calE]} \le \dtv(X,Y).
  \end{align*}
> $$
>
> より一般に、任意の関数 $f\colon V \to [0,1]$ に対して
> 
> $$
  \begin{align*}
    \abs{\E[f(X)] - \E[f(Y)]} \le \varepsilon.
  \end{align*}
> $$
</div>

$V$ 上の二つの分布 $\mu,\nu$ の **カップリング** $\pi$ とは、 $V^2$ 上の分布であって、それぞれの周辺分布が $\mu,\nu$ であるようなものである。
すなわち, $\pi\in [0,1]^{V^2}$が

$$
  \begin{align*}
    &{}^{\forall} u\in V,\, \sum_{v\in V} \pi(u,v) = \mu(u), \\
    &{}^{\forall} v\in V,\, \sum_{u\in V} \pi(u,v) = \nu(v)
  \end{align*}
$$

を満たすとき, $\pi$は$\mu$と$\nu$のカップリングです.

{: .proposition-title }
> **命題(カップリング不等式).**
>
> 二つの分布$\mu,\nu$の統計距離は
> 
> $$
  \begin{align*}
    \dtv(\mu,\nu) = \inf_{\pi} \Pr_{(X,Y)\sim \pi}[X\ne Y]
  \end{align*}
> $$
>
> で表される. ここで$\pi$は$\mu$と$\nu$のカップリングを動く.

## 関連する不等式

統計距離は他の重要な分布間距離指標と密接な関係があります:

- [Pinskerの不等式]({{site.baseurl}}/docs/information_theory/pinsker): KLダイバージェンスと統計距離の関係
- [KLダイバージェンス]({{site.baseurl}}/docs/information_theory/f_divergence/kl_divergence): 情報理論的な分布間距離
- [χ²ダイバージェンス]({{site.baseurl}}/docs/information_theory/f_divergence/chi2_divergence): 統計学でよく用いられる分布間距離

