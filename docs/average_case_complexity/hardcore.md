---
title: ハードコア補題
nav_order: 3
parent: 平均時計算量
---

# ハードコア補題

サイズ$s$以下の回路全体の集合を$\SIZE(s)$とします.
部分集合$H\subseteq\binset^n$は$|H|\ge \delta 2^n$を満たすとき**$\delta$-密**であると呼ぶことにします.

{: .theorem-title }
> **定理 (ハードコア補題)**
>
> 任意の$\delta,\varepsilon>0$に対して以下が成り立つ:
> 関数$f\colon \binset^n\to\binset$がサイズ$s$に対して$\delta$-困難ならば,
> ある$\delta$-密な集合$H\subseteq\binset^n$が存在して, 任意のサイズ$O(\delta^2\varepsilon^2s)$の回路$C$に対して
> 
> $$
  \begin{align*}
    \Pr_{x\sim H}\left[ C(x) = f(x) \right] \le \frac{1}{2} + \varepsilon.
  \end{align*}
> $$

証明はブースティングと呼ばれる機械学習の手法に基づくものと線形最適化の文脈で登場するvon-Neumannのminimax定理に基づくものが有名です.

ここではまずブースティングに基づく証明を解説します.

## 証明1. ブースティング

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


