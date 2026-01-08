---
layout: default
title: 正則化補題
nav_order: 12
---

# 正則化補題

複雑な関数 $g\colon\binset^n\to[0,1]$ を、単純な構造を持つ関数の組み合わせで近似する手法を **正則化** と呼ぶ。
ここでいう「単純な構造」とは文脈によって変わりますが
- グラフ理論においては, 頂点の集合をいくつかの部分集合に分割し, それぞれの部分集合間で辺の存在確率がほぼ一定になるような構造
- 計算量理論においては, 低次多項式や小さな回路で表現できるような構造 
などが挙げられます.

ここではそれらを特殊ケースとして表現する **抽象化された正則化補題** について解説します[^TTV09] [^RTTV08].

## 問題設定

有限集合 $\calX$ とそれに付随する確率分布 $\mu$ を考えます.
二つの関数 $f,g\colon\calX \to [-1,1]$ に対して内積 $\inprod{f,g}$ を

$$
  \begin{align*}
    \inprod{f,g} = \E_{x\sim \mu} \left[ f(x)g(x) \right] = \sum_{x\in\calX} \mu(x) f(x) g(x). \tag{1}
  \end{align*}
$$

で定義します.
例えば$f,g$が$\pm 1$上に値をとるならば, 

$$
  \begin{align*}
    \inprod{f,g}=\Pr_{x\sim \mu}[f(x)=g(x)] - \Pr_{x\sim\mu}[f(x)\ne g(x)] = 2\Pr[f(x)=g(x)]-1
  \end{align*}$$

となるため,
この内積は$f,g$の類似度(相関)を表す指標として解釈できます.
また, $\norm{f}=\inprod{f,f}$ とします.

{: .definition }
> 関数の族 $\calF\subseteq\set{f\colon\calX\to[-1,1]}$ を考える. 二つの関数 $h,g\colon\calX\to[-1,1]$ に対して,
> 
> $$  \begin{align*}
    \forall f\in\calF,\quad |\inprod{h-g,f}| \le \varepsilon \tag{2}
  \end{align*} $$
> が成り立つとき, $h$ と $g$ は **$\calF$ に対して $\delta$-識別不能である**といい, $h\approx_\delta g$ と表す.

{: .theorem-title }
> **定理 (抽象化された正則化補題).**
>
> 関数族 $\calF \subseteq \set{ f\colon \calX \to [-1,1]} $ を考える. ただし, $\calF$ は対称的であるとする: 任意の $f\in\calF$ に対して $-f\in\calF$ も成り立つ.
>
> 任意の $\delta > 0$ と任意の関数　$g\colon\calX\to[-1,1]$ に対し, ある $m\le 1/\delta^2$ と関数 $f_1,\dots,f_m\in\calF$ と $c_1,\dots,c_m\in[-1,1]$ が存在して,
> $h = \sum_{i=1}^m c_if_i$ と定めると, $h\approx_\delta g$ が成り立つ.

直感的には, 任意の関数は 「単純な構造を持つ」関数クラス $\calF$ の線形結合で近似できる, ということを意味しています.

{: .remark }
> ここでは $[-1,1]$ 上に値をとる関数を考えていますが, 計算量理論やグラフ理論の文脈では $[0,1]$ 上に値をとる関数を考える場合が多いです (隣接行列やBoolean関数など　).
> この場合でも簡単な議論から同様の正則化補題が適用できます: 関数 $f\colon \calX\to [-1,1]$ に対して, $f'(x)=\frac{f(x)+1}{2}$ のようにアフィン変換をすれば
> $[0,1]$上に値をとる関数を考える場合も同様の議論が成り立ちます.

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">証明</summary>
  
  関数 $h$ は以下のように逐次的に構成します:
  1. 初期値 $h^{(0)} \equiv 0$ とする (恒等的にゼロを出力する関数). $i=0$ とする.
  2. ある $f^{(i)}\in\calF$ に対して $\inprod{g-h^{(i)},f^{(i)}}>\delta$ が成り立つ限り, 以下を繰り返す:
     1.  $h^{(i+1)} = h^{(i)} + \delta\cdot f^{(i)}$ と定める.
     2.  $i\leftarrow i+1$ とする.
  3. そのような $f^{(i)}$ が存在しない場合, $h=h^{(i)}$ として終了する.

  最終的に出力される $h$ は, 確かに $h\approx_\delta g$ を満たします ($\calF$が対称的であることはここで用いている).

  また, この構成は $1/\delta^2$ ステップ以内で終了します.
  実際,

  $$
    \begin{align*}
      \norm{g-h^{(i+1)}}^2 &= \norm{g-h^{(i)}}^2 - 2\delta\cdot \underbrace{\inprod{g-h^{(i)},f^{(i)}}}_{>\delta} + \delta^2 \cdot\norm{f^{(i)}}^2 \\
      &\le \norm{g-h^{(i)}}^2 - 2\delta^2 + \delta^2 \\
      &= \norm{g-h^{(i)}}^2 - \delta^2
    \end{align*}
  $$

  より, 各ステップで $\norm{g-h^{(i)}}^2\ge 0$ は少なくとも $\delta^2$ ずつ減少するため, $i\le 1/\delta^2$ ステップで終了します.

</details>


[^TTV09]: Tulsiani, Trevisan, Vadhan (2009). "Regularity, Boosting, and Efficiently Simulating Every High-Entropy Distribution". CCC, 2009.

[^RTTV08]: Reingold, Trevisan, Tulsiani, Vadhan (2008). "Dense Subsets of Pseudorandom Sets". FOCS, 2008.
