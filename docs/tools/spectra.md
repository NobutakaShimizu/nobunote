---
title: 行列のスペクトル
parent: よく使う道具
nav_order: 7
---

# 行列のスペクトル

* TOC
{:toc}


行列の固有値や固有ベクトルに関するよく知られる事実を(証明なしで)紹介します.

## Courant-Fischerの定理 (ミニマックス定理)

{: .theorem }
> 対称行列$A \in \Real^{n\times n}$の固有値を$\lambda_1 \ge \dots \ge \lambda_n$とすると
> 
> $$
  \begin{align*}
    \lambda_i = \max_{S\colon \dim S=i} \min_{x\in S\setminus\{0\}} \frac{\inprod{x,A x}}{\inprod{x,x}}.
  \end{align*}
> $$
>
> ここで$S$は次元$i$の部分空間で動く.

例えば最大固有値は$\lambda_1=\max_{x\ne 0}\frac{\inprod{x,Ax}}{\inprod{x,x}}$, 最小固有値は$\lambda_n = \min_{x\ne 0}\frac{\inprod{x,Ax}}{\inprod{x,x}}$となります.
また, 関数$x\mapsto \frac{\inprod{x,Ax}}{\inprod{x,x}}$を$A$に関する**Rayleigh商**といいます.

{: .corollary }
> 対称行列$A\in\Real^{n\times n}$の最大固有値$\lambda_1$に対応する固有ベクトルを$x_1$とする.
> このとき, 第二固有値$\lambda_2$は
> 
> $$
  \begin{align*}
    \lambda_2 = \max_{x \colon x\bot x_1} \frac{\inprod{x,Ax}}{\inprod{x,x}}.
  \end{align*}
> $$
>
> ここで$x$は固有ベクトル$x_1$に直交するベクトル全てを動く.

{: .remark-title }
> **注釈 (一般の内積に対するCourant-Fischerの定理)**
>
> Courant-Fischerの定理の定理は通常の$\Real^n$の内積
>
> $$
  \begin{align*}
    \inprod{x,y} = \sum_{i\in[n]} x(i)y(i)
  \end{align*}
> $$
>
> を考えていましたが, もう少し一般に, 全ての成分が正であるベクトル$\pi\in \Real_{>0}^n$に対し
>
> $$
  \begin{align*}
    \inprod{x,y}_\pi = \sum_{i\in[n]} \pi(i)x(i)y(i)
  \end{align*}
> $$
>
> を考えてもCourant-Fischerの定理やその系が成り立ちます.
> この一般化は可逆性を持つマルコフ連鎖の固有値の議論を行う際に必要になります
> (本当は正定値行列$B$に対して$\inprod{x,y}_B = \inprod{x,By}$という内積でも成り立つのですが, ここまでの一般化はあまり使うことがないので割愛しています).

