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

「任意の符号$\calC\subseteq\F_q^n$であって距離$\delta$であるようなものを考えたとき, 任意の半径$R$のボールとの共通部分が$L$個以下である」という形のバウンドをリスト復号半径に対するJohnson限界という.
より詳細な設定を述べる.
パラメータ$n\in\Nat$, $\delta>0$, $R\in[0,1]$に対し, 半径$R$の球に含まれる点集合$S\subseteq\F_q^n$であって, 相異なる各二点の距離が$\delta$以上であるようなもののうち, 要素数最大のときの$\abs{S}$を$A'_q(n,\delta,R)$とする.
すなわち

$$
  \begin{align*}
    A'_q(n,\delta,R) = \max\set{\abs{S}\colon \exists x\in\F_q^n,\,S\subseteq\ball(x,R), \forall a,b\in S, a\neq b\Rightarrow \dist(a,b)\ge R}.
  \end{align*}
$$

距離$\delta$の符号$\calC\subseteq\F_q^n$は, (情報理論的には)半径$R$のボール内に高々$A'_q(n,\delta,R)$個の符号語を持つ.
従って$A'_q(n,\delta,R)$を上から抑えると, 符号の構成によらずリスト復号可能性に関するポジティブな結果が得られる.

{: .theorem-title }
> **定理（Johnson限界）.**
>
> 有限体$\F_q$を考える. 自然数$L\in\Nat$に対し, 
> 
> $$
  \begin{align*}
    J(\delta,L) := \qty(1-\frac{1}{q})\qty( 1-\sqrt{1-\frac{q}{q-1}\frac{L-1}{L}\delta} )
  \end{align*}
> $$
>
> とする. このとき, 任意の$R\le J(\delta,L)$に対して, $A'_q(n,\delta,R)\le L$が成り立つ.

つまり, リストサイズを$L$で抑えたいときには半径を$R_J$にすれば良いということになる.
また, $L$や$q$が十分大きく$\delta\approx 1$のとき, $R_J\approx 1$となるため, 
符号の距離が大きければリスト復号半径を大きくできることがわかる.

リストサイズ$L$を$L\to \infty$とした時の極限

$$
  \begin{align*}
    J(\delta) := \lim_{L\to\infty} R_J(n,\delta,L) = \qty(1-\frac{1}{q})\qty( 1-\sqrt{1-\frac{q}{q-1}\delta} )
  \end{align*}
$$

をJohnson限界ということもある. また, $q$が非常に大きいときは$q\to\infty$における$J(\delta)$をJohnson限界ということもある. 例えば[Reed-Solomon符号]({{site.baseurl}}/docs/error-correcting_code/Reed-Solomon)の場合, Johnson限界は$1-\sqrt{1-\delta} = 1-\sqrt{r}$となる ($r$はレート).
このように「Johnson限界」という言葉は文脈によって異なる意味で使われることがあるので注意が必要である.


符号によってはこのバウンドがタイトになることもあるし, リスト復号半径がもっと大きくなりうることもある.

## Gilbert-Varshamov限界 (GV限界)