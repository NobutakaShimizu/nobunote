---
title: 符号の限界
nav_order: 2
parent: 誤り訂正符号
---

# 符号の限界

誤り訂正符号には, 符号の性質に関する限界がいくつか存在する. ここでは, その中でも特に重要な限界について述べる.

## Singleton限界

Singleton限界とは, 誤り訂正符号のレートと距離の間の大雑把なトレードオフを表す不等式である (ちなみにSingletonは人名である).

{: .proposition-title }
> **命題（Singleton限界）.**
>
> 符号長$n$, レート$r$,　距離$\delta$の任意の符号は$r+\delta\le 1+1/n$を満たす.

符号長$n\to\infty$における漸近的なオーダーを議論する文脈ではSingleton限界は$r+\delta\le 1$と表記されることが多い.
一般に符号の一意復号の限界は半径$\frac{\delta}{2}$であるため, Singleton限界と組み合わせると, この限界は高々$\frac{1-r}{2}$である.

なお, Singleton限界を等号で満たす符号, すなわち$r+\delta = 1+1/n$を満たす符号を**MDS符号**という.
MDS符号の例として代表的なものは[Reed-Solomon符号]({{site.baseurl}}/docs/error-correcting_code/Reed-Solomon)である.

## Johnson限界

## Gilbert-Varshamov限界 (GV限界)