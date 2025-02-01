---
title: 直積定理
nav_order: 6
parent: 平均時計算量理論
---

# 直積定理

関数$f\colon\binset^n\to\binset$と$k\in\Nat$に対して, $f^k\colon\binset^{nk}\to\binset^k$を

$$
  \begin{align*}
    f^k(x_1,\ldots,x_k) = (f(x_1),\dots,f(x_k))
  \end{align*}
$$

で定める.
直積定理とは, 元の関数$f$がそこそこの困難性を持つ場合, $f^k$は強い困難性を持つことを主張する.
具体的には, $f^k$を$\varepsilon$の割合の入力上で正しく計算する回路$C$が存在するとき, $f$を$1-\delta$の確率で計算するほぼ同じサイズの回路$C'$が存在することを主張する定理である. ここで$\delta = O(\log(1/\varepsilon)/k)$.

[Impagliazzoら(2010)]({{site.baseurl}}/docs/memo/IJKW10) はによる一様な計算モデルに対する直積定理の証明を与えているが, ここでは非一様な計算モデルである回路に対する直積定理の証明を紹介する.