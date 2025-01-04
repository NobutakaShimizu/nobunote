---
title: XOR補題
nav_order: 2
parent: 平均時計算量
---
# XOR補題
平均時計算量において脱乱化などの応用を考える文脈では, **困難性の増幅 (hardness amlpification)**と呼ばれる, 弱い平均時困難性を持つ関数$f$から強い平均時困難性を持つ関数$g$を構成する手法が研究されています.

**XOR補題**はその中でも代表的なものの一つです.
主張を述べるために準備をします.
関数$f\colon \binset^n\to\binset$に対して関数$f^{\oplus k}\colon \binset^{kn} \to \binset$を

$$
  \begin{align*}
    f^{\oplus k}(x_1,\dots,x_k) = f(x_1)\oplus \dots \oplus f(x_k) \tag{1}
  \end{align*}
$$

で定めます.
ここでは$f^{\oplus k}$の入力$kn$ビットを長さ$n$ずつに区切ったものをそれぞれ$x_1,\dots,x_k \in \binset^n$と表記しています.

XOR補題とは, 元の関数$f$がある簡潔な関数族$\calF$に対し$\delta$-困難であるとき, $k$が十分大きければ$f^{\oplus k}$はもう少し簡潔な関数族$\calF'$に対し
$(1/2-\varepsilon)$-困難となることを主張します.

特に$\calF,\calF'$として小さい回路族を考えるものを**YaoのXOR補題**と呼ばれます.
以後, サイズ$s$以下の回路全体の集合を$\SIZE(s)$と表します. なお, ここで考える回路とはAND, OR, NOTゲートを繋げたものであり, ANDとORゲートの入力素子数(fan-in)は2です.
回路のサイズはその回路に含まれるAND,OR,NOTゲートの個数とします.

簡単のため, ここでは入力長$n$は固定して関数の平均時困難性を議論します.

{: .theorem-title }
> **定理 (YaoのXOR補題).**
>
> ある定数$C>0$が存在して, パラメータ$n\in\Nat,\delta>0,\varepsilon>0$に対し$k\ge C\log(1/\varepsilon)/\delta^2$ならば以下が成り立つ:
> 関数$f\colon \binset^n\to\binset$が$\SIZE(s)$に対して$\delta$-困難ならば, 式(1)で定まる関数$f^{\oplus k}$は$\SIZE(s')$に対して$(1/2-\varepsilon)$-困難である. ただし$s' = ...$.

YaoのXOR補題には様々な証明方法が知られています.

## サンプラーを使った簡潔な証明

パラメータはよく知られるバージョンより悪いものの, 非常に簡潔で教育的な証明を紹介します.

{: .proposition-title }
> **命題 (弱いパラメータに対するYaoのXOR補題).**
>
> ある定数$C>0$が存在して, パラメータ$n\in\Nat,\delta>0,\varepsilon>0$に対し$k\ge C\log(1/\varepsilon)/\delta^2$ならば以下が成り立つ:
> 関数$f\colon \binset^n\to\binset$が$\SIZE(s)$に対して$\delta$-困難ならば, 式(1)で定まる関数$f^{\oplus k}$は$\SIZE(s')$に対して$(1/2-\varepsilon)$-困難である. ただし$s' = ...$.

証明では**サンプラー(sampler)**と呼ばれる道具を使います.

{: .definition-title }
> **定義(サンプラー).**
> 
> 確率変数の組$(X,Y)$は以下を満たすとき**$(\delta,\varepsilon)$-サンプラー**という:
> 任意の関数$S \colon \supp(Y)\to [0,1]$に対して
> 
> $$
  \begin{align*}
    \Pr_{x\sim X} \left[ \abs*{ \E[S(Y)| X=x] - \E[S(Y)]} \ge \varepsilon \right] \le \delta.
  \end{align*}
> $$
>
> 同様に, $(X,Y)$は以下を満たすとき**乗法的$(\delta,\varepsilon)$-サンプラー**という: $\E[S(Y)]\ge \varepsilon$を満たす任意の関数$S\colon \supp(Y)\to[0,1]$に対して
> 
>$$
  \begin{align*}
    \Pr_{x\sim X}\left[\mathbb{E}[S(Y)|X=x] \le \frac{\mathbb{E}[S(Y)]}{2}\right] \le \delta.
  \end{align*}
>$$

例えば$X$と$Y$が独立であれば明らかに$\E\left[S(Y) \vert X=x\right]=\E[S(Y)]$となるので$(0,0)$-サンプラーになります.

