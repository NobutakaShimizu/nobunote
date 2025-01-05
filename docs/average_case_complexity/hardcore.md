---
title: ハードコア補題
nav_order: 3
parent: 平均時計算量
---

# ハードコア補題

ハードコア補題とは [Impagliazzo (1995)](https://ieeexplore.ieee.org/document/492584)の結果で, [XOR補題]({{site.baseurl}}/docs/average_case_complexity/Yao_XOR)など平均時計算量の様々な定理の証明に用いることができる非常に便利な定理です.

サイズ$s$以下の回路全体の集合を$\SIZE(s)$とします.
部分集合$H\subseteq\binset^n$は$|H|\ge \delta 2^n$を満たすとき**$\delta$-密**であると呼ぶことにします.

{: .theorem-title }
> **定理 (ハードコア補題)**
>
> 任意の$\delta,\varepsilon>0$に対して以下が成り立つ:
> 関数$f\colon \binset^n\to\binset$がサイズ$s$に対して$\delta$-困難ならば,
> ある$\delta$-密な集合$H\subseteq\binset^n$と十分小さな定数$c>0$が存在して, 全ての回路$C \in \SIZE(c\delta^2\varepsilon^2 s)$に対して
> 
> $$
  \begin{align*}
    \Pr_{x\sim H}\left[ C(x) = f(x) \right] \le \frac{1}{2} + \varepsilon.
  \end{align*}
> $$

弱い平均時困難性を持つ任意の関数$f$では, 任意の小さい回路はそこそこの割合の入力で誤った値を出力しますが, ハードコア補題はその関数$f$の困難性を凝縮したような入力部分集合$H\subset\binset^n$が存在して, $H$上では$f(x)$の計算が非常に困難になります.
このような$H$を**ハードコア集合**といいます.

{: align="center"}
  ![ハードコア補題のイメージ]({{site.baseurl}}/docs/average_case_complexity/images/hardcore_image.drawio.svg)
{: width=70%}

ハードコア補題は二通りの証明が有名です.

## 証明1. ブースティングに基づく証明

対偶を証明します.
つまり, 任意の$\delta$-密な部分集合$H\subseteq \binset^n$に対してあるサイズ$s_0$の回路$C_H$が存在して

$$
  \begin{align*}
    \Pr_{x\sim H} \left[ C_H(x) = f(x) \right] \ge \frac{1}{2} + \varepsilon \tag{1}
  \end{align*}
$$

を満たすならば, あるサイズ$O(s_0\cdot \delta^{-2}\varepsilon^{-2})$の回路$C'$が存在して

$$
  \begin{align*}
    \Pr_{x\sim\binset^n} \left[ C'(x) = f(x) \right] \ge 1-\delta
  \end{align*}
$$

を満たすことを示します.

実は所望の回路$C'$は幾つかの$\delta$-密な部分集合$H_1,\dots,H_m\subseteq\binset^n$を選び, それぞれに対し(1)を満たす回路$C_{H_1},\dots,C_{H_m}$の出力値の多数決を出力する回路となります (ここで$m=O(\delta^{-2}\delta^{-2})$).
それぞれの回路$C_{H_1},\dots,C_{H_m}$のサイズは高々$s_0$なので最終的な回路$C'$のサイズは$O(s_0\cdot \delta^{-2}\varepsilon^{-2})$で上から抑えられます.
<!-- TODO: insert image of C' -->
以下ではそれらの$H_1,\dots,H_m$を選ぶアルゴリズムを記述します.
強調しておきますが, **このアルゴリズムの計算量は最終的な回路$C'$の複雑性に影響を与えません**.
どのように$H_1,\dots,H_m$を選んでも最終的に得られる回路$C'$のサイズは$O(s_0\cdot m)$です.

{: .remark }
> イメージとしては, 局所的($H$上)にそこそこ$f$の値を推測できる機械があったとき, それらをうまく繋げて大域的($\binset^n$上)に$f$を高精度で計算せよ, という問題を考えています.
> このように弱い学習器をうまく用いて強い学習器を構成する方法を機械学習の分野では**ブースティング(boosting)**と呼びます.

## 準備

証明を述べるためにいくつかの概念を導入します.
部分集合$H\subseteq \binset^n$の指示関数を$\indicator_H\colon\binset^n\to\binset$と表し,
値域を$\binset$から$[0,1]$に緩和した関数$S\colon \binset^n\to[0,1]$を**測度(measure)**と呼びます.
一様ランダムな$x\sim\binset^n$に関する期待値を$\E[S]=2^{-n}\cdot \sum_{x\in\binset^n} S(x)$で表し, 測度$S$が$\E[S]\ge \delta$を満たすとき**$\delta$-密**であるといいます.
特に, $S=\indicator_H$が部分集合$H$の指示関数であるとき, $\indicator_H$と$H$の$\delta$-密性は一致します.
$\E[S]>0$を満たす測度$S$に付随する$\binset^n$上の分布$\calL_S$を

$$
  \begin{align*}
    \Pr_{x\sim \calL_S}[ x = a] = \frac{S(a)}{2^n\E[S]}
  \end{align*}
$$

で定めます.
例えば$S=\indicator_H$と表せるとき, $\calL_S$は$H$上の一様分布と一致します.



