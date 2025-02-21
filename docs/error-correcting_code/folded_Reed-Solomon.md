---
title: folded Reed-Solomon符号
nav_order: 5
parent: 誤り訂正符号
---

# folded Reed-Solomon符号

* TOC
{:toc}

folded Reed-Solomon符号はReed-Solomon符号の一般化であり, Reed-Solomon符号のリスト復号性能を改善するために提案されました.
レート$r$のReed-Solomon符号は半径$R=1-\sqrt{r}$までのエラーを効率的に訂正できることが知られています.
この$1-\sqrt{r}$という値は「レート$r$で最適な距離を持つ符号は**必ず**組合せ的には半径$1-\sqrt{r}$までのリスト復号が可能である」という[Johnson限界]({{site.baseurl}}/docs/error-correcting_code/code_bounds#Johnson限界)に一致しており, Reed-Solomon符号がこの限界を計算量的な意味でも達成していることを示しています.
しかしReed-Solomon符号がJohnson限界を超えたリスト復号半径を持つかどうかはわかっておらず, 重要な未解決問題として知られています.
folded Reed-Solomon符号とは, この問題に対する一つの解決策として提案された符号です.
この符号はレート$r$のときに, 半径$1-r$までのエラーを効率的に訂正できることが知られています.

## 定義

{: .definition-title }
> **定義 (folded Reed-Solomon符号)**
>
> 有限体$\F_q$上の次数$k$未満の多項式の全体を$\calP_{<k}$とします. また, $\F_q$の原始根を$\gamma$とします.[^1]
> さらに, パラメータ$m\in\Nat$を$n:=q-1$の約数の一つとします.
> このとき, folded Reed-Solomon符号$\calC\subseteq(\F_q^m)^{n/m}$を以下のように定義します：
>
> 多項式$f(X)\in \calP_{<k}$をメッセージとして受け取って対応する符号語を
> 
> $$
  \begin{align*}
    \qty( \begin{bmatrix}
      f(\gamma^0) \\
      f(\gamma^1) \\
      \vdots \\
      f(\gamma^{m-1})
    \end{bmatrix}, \begin{bmatrix}
      f(\gamma^m) \\
      f(\gamma^{m+1}) \\
      \vdots \\
      f(\gamma^{2m-1})
    \end{bmatrix}, \dots, \begin{bmatrix}
      f(\gamma^{(n/m-1)m}) \\
      f(\gamma^{(n/m-1)m+1}) \\
      \vdots \\
      f(\gamma^{n-1}) 
    \end{bmatrix} )
  \end{align*}
> $$
>
> とします.


[^1]: 有限体$\F_q$の元$\gamma$が原始根であるとは, $\F_q\setminus\set{0}=\set{\gamma^0,\gamma^1,\gamma^2,\dots,\gamma^{q-2}}$が成り立つことをいいます.

