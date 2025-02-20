---
title: ペア独立性
parent: よく使う道具
nav_order: 8
---
# 確率変数族のペア独立性

* TOC
{:toc}


確率変数族の**ペア独立性 (pairwise independence)**は計算量理論の文脈では
Goldreich-Levinの定理, set lower bound protocol, ハッシュ関数, 擬似ランダム生成器などの文脈でよく使われるテクニックです.
通常の意味での独立性を緩めた概念であり, 少ないランダムネスを用いて多くの確率変数を生成する手法としては典型的なものとなります.

確率変数の列$(X_1,\dots,X_n)$が独立であるというのは「いくつかの$i$に対し$X_i=x_i$である」という事象が他の確率変数の分布に影響を与えないこととされます.
ここでは今後の比較のために, 確率変数族の独立性を以下の形で定義しておきます:

{: .definition-title }
> **定義 (独立性)**
>
> 確率変数の列$(X_1,\dots,X_n$)が**独立である**とは, 任意のインデックスの部分集合$I= \\{i_1,\dots,i_k\\}\subseteq [n]$と$x_{i_1},\dots,x_{i_k}$に対して以下が成り立つことである:
> 
>$$
  \begin{align*}
    \Pr \left[ X_{i_1} = x_{i_1}\text{ and }\dots\text{ and }X_{i_k} = x_{i_k} \right] = \prod_{j\in[k]} \Pr[X_{i_j}=x_{i_j}]. \tag{1}
  \end{align*}
>$$

ペア独立性とは, 式(1)が成り立つ部分集合$I$の範囲を任意の部分集合ではなく要素数$2$の部分集合に制限することによって定まる概念です.

{: .definition-title }
> **定義 (ペア独立性)**
>
> 確率変数の列$(X_1,\dots,X_n$)が**ペア独立である**とは, 任意の要素数$2$のインデックスの部分集合$0\le i < j \le n$と$x_i,x_j$に対して以下が成り立つことである:
> 
>$$
  \begin{align*}
    \Pr \left[ 
      \begin{aligned}
      X_{i} &= x_{i} \\
      X_{j} &= x_{j}
      \end{aligned}
      \right] = \Pr[X_{i}=x_{i}]\cdot \Pr[X_j = x_j]. \tag{2}
  \end{align*}
>$$

## 例1 ペア毎の和

$X_1,\dots,X_n$を独立で$\\{0,1\\}$上一様ランダムな確率変数とし, 各$1\le i < j \le n$に対して

$$
  \begin{align*}
    Y_{ij} = X_i + X_j \bmod 2
  \end{align*}
$$

で定まる確率変数族$(Y_{ij})_{1\le i<j\le n}$はペア独立です.

<details markdown="1" style="background-color: #eee;">

<summary style="display: list-item">証明</summary>
  
  簡単のため$n=3$で考えます (一般の$n$についても同様).
  任意の$y_{12},y_{23}\in \\{0,1\\}$に対して

  $$
    \begin{align*}
      \Pr\left[
        \begin{aligned}
        Y_{12}&=y_{12} \\
        Y_{23}&=y_{23} \end{aligned}
        \right]
        &= \Pr\left[
          \begin{aligned}
            X_1+X_2&=y_{12} \pmod 2 \\
            X_2+X_3&=y_{23} \pmod 2
          \end{aligned}
          \right] \\
        &= \Pr\left[
          \begin{aligned}
            X_1 &= y_{12} + X_2 \pmod 2 \\
            X_3 &= y_{23} + X_2 \pmod 2
          \end{aligned}
          \right] \\
        &= \frac{1}{4} \\
        &= \Pr[Y_{12}=y_{12}]\cdot \Pr[Y_{23}=y_{23}]
    \end{align*}
  $$

  を得ます. 三つ目の等式では$X_1,X_2,X_3$の独立性を用いています.
  

</details>

{: .remark }
> 上記の例で$n$ビットのランダムな文字列$(X_1,\dots,X_n) \sim \\{0,1\\}^n$を$\binom{n}{2}$ビットの文字列$(Y_{ij})$\に変換しています (ただし変換で文字列を延ばす代わりに各ビットの独立性は損なわれるため, 得られる長い文字列を擬似ランダム文字列と呼ぶ).
> このように, **ペア独立性の技法を用いると少ないエントロピーのランダムネスから長い擬似ランダム文字列を生成**できます (このアイデアはより一般に擬似ランダム生成器の概念で一般化されます). 例えばこのように生成された長い擬似ランダム文字列を乱択アルゴリズムのランダムシードとして代用することでより少ないランダムネスを用いた乱択アルゴリズムの模倣が可能になります. この模倣の精度をペア独立性を用いて評価していくことになります.

## 例2. ランダムビットの線形結合

例1と同様に独立に$X_1,\dots,X_n \sim \\{0,1\\}$を選びます.
例1では$X_i + X_j$という形を考えていましたが, より一般に$X_{i_1}+\dots + X_{i_k}$という形を考えてもペア独立性が保たれることが同様にして証明できます.
非空な部分集合$I \subseteq [n]$に対して

$$
  \begin{align*}
    Y_I = \sum_{i\in I} X_i \bmod 2
  \end{align*}
$$

とすることによって定まる確率変数族$(Y_I)_{I\ne \emptyset}$はペア独立性を持つ. 

<details markdown="1" style="background-color: #eee;">

<summary style="display: list-item">証明</summary>
  
  任意の非空な$I \subseteq[n]$に対して, $X_1,\dots,X_n\sim \\{0,1\\}$が独立一様ランダムなので, $Y_I$の周辺分布も$\\{0,1\\}$上で一様となります.
  また, 相異なる二つの非空な部分集合$I,J\subseteq[n]$および$a,b \in \\{0,1\\}$に対して

  $$
    \begin{align*}
      \Pr \left[ \begin{aligned}
        Y_I &= a \\
        Y_J &= b
                  \end{aligned}
       \right]
       &=
       \Pr \left[ \begin{aligned}
        Y_{I\setminus J} + Y_{I\cap J} &= a \\
        Y_{J\setminus I} + Y_{I\cap J} &= b
                  \end{aligned}
       \right] \\
      &=
      \Pr \left[ \begin{aligned}
        Y_{I\setminus J} &= a - Y_{I\cap J} \\
        Y_{J\setminus I} &= b - Y_{I\cap J}
                  \end{aligned}
       \right] \\
       &= \frac{1}{4}
    \end{align*}
  $$

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">証明</summary>
  
</details>


  より, 確かにペア独立性を満たします.
  ここで最後の等式では, $X_i$たちの独立性より, $Y_{I\setminus J}$と$Y_{J\setminus I}$が独立であることを用いています ($I\ne J$より$I\setminus J$と$J\setminus I$はどちらも非空であることに注意). $\square$

</details>

この方法を用いると$n$ビットのエントロピーから長さ$2^n-1$の擬似ランダム文字列を得られるので, 指数的に長さを延ばすことが可能となります.

### ランダム線形関数としての視点

  例2の構成で得られる$(Y_I)_{I\ne \emptyset}$は, 一様ランダムなベクトル$c \sim \mathbb{F}_2^n$に対して線形関数$z \mapsto \inprod{c,z}$を考えて
  その($0$以外での)真理値表としてみなすことができます. 
  この解釈は [Goldreich-Levinの定理]({{site.baseurl}}/docs/average_case_complexity/Goldreich-Levin)
  の証明において本質的に効いてきます.

## 例3. ランダムな直線

要素数$q$の有限体$\mathbb{F}_q$に対して一様ランダムに$a,b\sim \mathbb{F}_q$を選び, 各$i\in \mathbb{F}_q$に対して

$$
  \begin{align*}
    X_i = a i + b
  \end{align*}
$$

として確率変数族$(X_i)_{i\in \mathbb{F}_q}$を定めると$(X_i)$はペア独立です.

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">証明</summary>

  任意の相異なる$\mathbb{F}_q$の元$i,j$および$c,d \in \mathbb{F}_q$に対して
  
  $$
    \begin{align*}
      \Pr \left[
          \begin{aligned}
            X_i &= c \\
            X_j &= d
          \end{aligned}
        \right] &=
      \Pr_{a,b\sim \mathbb{F}_q} \left[
          \begin{aligned}
            ai+b &= c \\
            aj+b &= d
          \end{aligned}
        \right] \\
      &=
      \Pr_{a,b\sim \mathbb{F}_q} \left[
          \begin{bmatrix}
            i & 1 \\
            j & 1
          \end{bmatrix}
          \begin{bmatrix}
            a \\
            b
          \end{bmatrix}
          =
          \begin{bmatrix}
            c \\
            d
          \end{bmatrix}
      \right]      
    \end{align*}
  $$

  ここで, $i\ne j$より行列

$$
  \begin{align*}
     \begin{bmatrix}
            i & 1 \\
            j & 1
          \end{bmatrix}
  \end{align*}
$$

  は逆行列を持つ (Vandermonde行列の特殊ケース) ので, 最後の等式の確率の中身は$a=\ast,b=\ast$の形で書けます. $a,b$は一様ランダムなので, この確率は$1/q^2$です.
  一方で, ランダムな$a,b\sim \mathbb{F}_q$と固定した$i\in \mathbb{F}_q$に対し$X_i=ai+b$の周辺分布は$\mathbb{F}_q$上一様なので, 確かに$(X_i)$はペア独立です.  

</details>

ランダムな直線に基づく生成はランダムな$a,b\sim \mathbb{F}_q$を受け取って$q$個の$\mathbb{F}_q$の元を出力しています.


## 例4. ランダムな二次曲線

[例3](#例3-ランダムな直線)と同様に, ランダムな二次曲線上の点集合もまたペア独立性を持ちます.
要素数$q$の有限体$\mathbb{F}_q$を考え, $a\in \F_q$を任意に固定し, 一様ランダムに$b,c\sim \mathbb{F}_q$を選び, 各$i\in \mathbb{F}_q$に対して

$$
  \begin{align*}
    X_i = a + bi + ci^2
  \end{align*}
$$

として確率変数族$(X_i)_{i\in \mathbb{F}_q\setminus\{0\}}$を定めると$(X_i)$はペア独立です.

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">証明</summary>

  任意の相異なる$\mathbb{F}_q$の元$i,j\ne 0$および$c,d \in \mathbb{F}_q$に対して
  
  $$
    \begin{align*}
      \Pr \left[
          \begin{aligned}
            X_i &= r \\
            X_j &= s
          \end{aligned}
        \right] &=
      \Pr_{b,c\sim \mathbb{F}_q} \left[
          \begin{aligned}
            bi+ci^2 &= r-a \\
            bj+cj^2 &= s-a
          \end{aligned}
        \right] \\
      &=
      \Pr_{b,c\sim \mathbb{F}_q} \left[
          \begin{bmatrix}
            i & i^2 \\
            j & j^2
          \end{bmatrix}
          \begin{bmatrix}
            b \\
            c
          \end{bmatrix}
          =
          \begin{bmatrix}
            r-a \\
            s-a
          \end{bmatrix}
      \right]      
    \end{align*}
  $$

  ここで, $i\ne j$より行列

$$
  \begin{align*}
     \begin{bmatrix}
            i & 1 \\
            j & 1
          \end{bmatrix}
  \end{align*}
$$

  は逆行列を持つ (Vandermonde行列の特殊ケース) ので, 最後の等式の確率の中身は$b=\ast,c=\ast$の形で書けます. $b,c$は一様ランダムなので, この確率は$1/q^2$です.

</details>

ランダムな直線に基づく生成はランダムな$a,b\sim \mathbb{F}_q$を受け取って$q$個の$\mathbb{F}_q$の元を出力しています.

## 性質

独立な確率変数の和の分散はそれぞれの確率変数の分散の和に等しいことが知られていますが,
この性質はペア独立な確率変数の和についても成り立ちます.

{: .lemma }
> $X_1,\dots,X_n$をペア独立な確率変数とし, $S=\sum_{i\in[n]} X_i$とすると, $\Var[S] = \sum_{i\in[n]} \Var[X_i]$が成り立つ.

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">証明</summary>

確率変数はシフト(定数$a$に対して$X$を$X+a$に変換する操作)に対して分散は変わらないので, $X_i$の期待値を$0$にシフトしても一般性を失いません.
  このとき, $S$の期待値は$0$なので, その分散は$\E[S^2]$に等しくなります.
  また, $X_i$たちはペア独立なので, $i\ne j$に対して$\E[X_iX_j]=\E[X_i]\E[X_j]=0$が成り立ちます.
  実際, $i\ne j$に対して$\Pr[X_i=x_i \text{ and }X_j=x_j]=\Pr[X_i=x_i]\Pr[X_j=x_j]$だから

  $$
    \begin{align*}
      \E[X_iX_j] &= \sum_{x_i,x_j} x_i x_j \Pr[X_i=x_i \text{ and }X_j=x_j] \\
      &= \sum_{x_i,x_j} x_i x_j \Pr[X_i=x_i]\Pr[X_j=x_j] \\
      &= \left( \sum_{x_i} x_i \Pr[X_i=x_i] \right) \left( \sum_{x_j} x_j \Pr[X_j=x_j] \right) \\
      &= \E[X_i]\E[X_j] \\
      &= 0
    \end{align*}
  $$
  
  となります.
  従って, 期待値の線形性より

  $$
    \begin{align*}
      \E[S^2] &= \E\left[ \left( \sum_{i\in[n]} X_i \right)^2 \right] \\
      &= \E\left[ \sum_{i\in[n]} X_i^2 + \sum_{i\ne j} X_iX_j \right] \\
      &= \sum_{i\in[n]} \E[X_i^2] + \sum_{i\ne j} \E[X_iX_j] \\
      &= \sum_{i\in[n]} \E[X_i^2] \\
      &= \sum_{i\in[n]} \Var[X_i] & & \because\text{ $X_i$の期待値は$0$}
    \end{align*}
  $$
  
  となり主張を得ます. $\square$
</details>

このことから和$S$の分散が簡単に計算できるため, <a href="{{site.baseurl}}/docs/tools/prob_inequalities#chebyshev-inequality">チェビシェフの不等式</a>より以下を得ます:

<div id="pairwise_independent_chebyshev" markdown="1">
{: .corollary }
> $X_1,\dots,X_n$をペア独立な確率変数とし, $S=\sum_{i\in[n]} X_i$とすると, 任意の$a>0$に対して
> 
> $$
  \begin{align*}
    \Pr\qty[\abs{S-\E[S]}\ge a] \le \frac{\sum_{i\in[n]} \Var[X_i]}{a^2}.
  \end{align*}
> $$
</div>