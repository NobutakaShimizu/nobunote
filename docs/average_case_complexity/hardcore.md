---
title: ハードコア補題
nav_order: 3
parent: 平均時計算量理論
---

# ハードコア補題

ハードコア補題とは [Impagliazzo (1995)](https://ieeexplore.ieee.org/document/492584)の結果で, [XOR補題]({{site.baseurl}}/docs/average_case_complexity/Yao_XOR)など平均時計算量の様々な定理の証明に用いることができる非常に便利な定理です.

サイズ$s$以下の回路全体の集合を$\SIZE(s)$とします.
部分集合$H\subseteq\binset^n$は$|H|\ge \delta 2^n$を満たすとき**$\delta$-密**であると呼ぶことにします.

<div id="hardcore-set" markdown="1">
{: .theorem-title }
> **定理 (ハードコア補題; Impagliazzo(1995))**
>
> 任意の$\delta,\varepsilon>0$および$s\le 2^{o(n)}$に対して以下が成り立つ:
> 関数$f\colon \binset^n\to\binset$がサイズ$s$に対して$\delta$-困難ならば,
> ある$(1-o(1))\delta$-密な集合$H\subseteq\binset^n$と十分小さな定数$c>0$が存在して, 全ての回路$C \in \SIZE(c\delta^2\varepsilon^2 s)$に対して
> 
> $$
  \begin{align*}
    \Pr_{x\sim H}\left[ C(x) = f(x) \right] \le \frac{1}{2} + \varepsilon + o(1).
  \end{align*}
> $$
>
> ここで$o(1)$の項は$n^{-\omega(1)}$にとれる.
</div>

弱い平均時困難性を持つ任意の関数$f$では, 任意の小さい回路はそこそこの割合の入力で誤った値を出力しますが, ハードコア補題はその関数$f$の困難性を凝縮したような入力部分集合$H\subset\binset^n$が存在して, $H$上では$f(x)$の計算が非常に困難になります.
このような$H$を**ハードコア集合**といいます.

{: align="center"}
  ![ハードコア補題のイメージ]({{site.baseurl}}/docs/average_case_complexity/images/hardcore_image.svg)
{: width=70%}

## 擬似ランダムネスからの理解

$\delta$-困難な関数$f\colon\binset^n\to\binset$を考えます.
この困難性は, 一様ランダムな$x\sim\binset^n$に対して確率変数$f(x)$は確率$\delta$で表が出るコイントス$\mathrm{Ber}(\delta)$と(計算量的に)識別できないことを意味し, 特に$\delta\approx 1/2$のときはフェアなコイントスと識別できません.
さて, $\delta$-困難な関数$f$に対してハードコア補題により保証されるハードコア集合を$H\subseteq\binset^n$とします.
$H$上では関数$f$は$(1/2-\varepsilon)$-困難ですので, ($\varepsilon\approx 0$のとき)一様ランダムな$x\sim H$に対して$f(x)$は$\mathrm{Ber}(1/2)$と識別できません.

これを鑑みて, ランダム関数$f_H$を

$$
  \begin{align*}
    f_H(x) = \begin{cases}
      \mathrm{Ber}(1/2) & \text{if } x\in H, \\
      f(x) & \text{otherwise}
    \end{cases}
  \end{align*}
$$

と定義します (各$x\in H$ごとに独立ランダムに$f(x)$の値を定める).
すると$f$と$f_H$は識別不可能性が成り立つことが期待されます.
この直感は実際に成り立ち, 一様ランダムな$x\sim\binset^n$に対して二つの確率変数

$$
  \begin{align*}
    (x,f(x)),\quad (x,f_H(x))
  \end{align*}
$$

の識別困難性がハードコア補題から証明することができます (cf. [[Healy, Vadhan, Viola, SICOMP(2006)]](https://epubs.siam.org/doi/10.1137/S0097539705447281), Lemma 3.2).



## パラメータの改善

[ハードコア補題](#hardcore-set)では, ハードコア集合$H$上で困難性を議論する回路のサイズは$O(\delta^2\varepsilon^2 s)$になっていましたが, このバウンドを改善し, より大きなサイズ$s\cdot O(\varepsilon^2/\log(1/\delta))$回路に対する困難性を主張することができます [[Krivans, Servedio, Machine Learning(2003)]](https://link.springer.com/article/10.1023/A:1022949332276), [[Barak, Hardt, Kale, SODA(2009)]](https://epubs.siam.org/doi/10.1137/1.9781611973068.129).

<div id="hardcore-set" markdown="1">
{: .theorem-title }
> **定理 (Informal; Barak, Hardt, Kale(1995))**
>
> 任意の$\delta,\varepsilon>0$および$s$に対して以下が成り立つ:
> 関数$f\colon \binset^n\to\binset$がサイズ$s$に対して$\delta$-困難ならば,
> ある$\delta$-密な集合$H\subseteq\binset^n$と十分小さな定数$c>0$が存在して, 全ての回路$C \in \SIZE( s\cdot c\varepsilon^2/\log(1/\delta) )$に対して
> 
> $$
  \begin{align*}
    \Pr_{x\sim H}\left[ C(x) = f(x) \right] \le \frac{1}{2} + \varepsilon.
  \end{align*}
> $$
</div>

---

# ハードコア補題の証明

ハードコア補題はブースティングに基づく証明とvon-Neumannのminimax定理に基づく証明の二通りの証明が有名ですが, ここでは前者の証明を解説します.

## 概要
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

実は所望の回路$C'$は幾つかの$\delta$-密な部分集合$H_1,\dots,H_\ell\subseteq\binset^n$を選び, それぞれに対し(1)を満たす回路$C_{H_1},\dots,C_{H_\ell}$の出力値の多数決を出力する回路となります (ここで$\ell=O(\delta^{-2}\delta^{-2})$).
それぞれの回路$C_{H_1},\dots,C_{H_\ell}$のサイズは高々$s_0$なので最終的な回路$C'$のサイズは$O(s_0\cdot \delta^{-2}\varepsilon^{-2})$で上から抑えられます.

以下ではそれらの$H_1,\dots,H_\ell$を選ぶアルゴリズムを記述します.
強調しておきますが, **このアルゴリズムの計算量は最終的な回路$C'$の複雑性に影響を与えません**.
どのように$H_1,\dots,H_\ell$を選んでも最終的に得られる回路$C'$のサイズは$O(s_0\cdot \ell)$です.

{: .remark }
> イメージとしては, 局所的($H$上)にそこそこ$f$の値を推測できる機械があったとき, それらをうまく繋げて大域的($\binset^n$上)に$f$を高精度で計算せよ, という問題を考えています.
> このように弱い学習器をうまく用いて強い学習器を構成する方法を機械学習の分野では**ブースティング(boosting)**と呼びます.

## 準備

証明を述べるためにいくつかの概念を導入します.
部分集合$H\subseteq \binset^n$の指示関数を$\indicator_H\colon\binset^n\to\binset$と表し,
値域を$\binset$から$[0,1]$に緩和した関数

$$
  \begin{align*}
    M\colon \binset^n\to[0,1]
  \end{align*}
$$

を**測度(measure)**と呼びます.
集合のサイズ$\abs{H}=\sum_{x\in\binset^n}\indicator_H(x)$の類推で測度のサイズを$\abs{M}=\sum_{x\in\binset^n}M(x)$で定義し, 密度を$\frac{\abs{M}}{2^n}$で定義します.
密度が$\delta$以上であるような測度$M$は**$\delta$-密**であるといいます.
特に, $M=\indicator_H$が部分集合$H$の指示関数であるとき, $\indicator_H$と$H$の$\delta$-密性は一致します.

正の密度を持つ測度$M$に付随する$\binset^n$上の分布$\calL_M$を

$$
  \begin{align*}
    \Pr_{x\sim \calL_M}[ x = a] = \frac{M(a)}{\abs{M}}
  \end{align*}
$$

で定めます.
例えば$M=\indicator_H$と表せるとき, $\calL_M$は$H$上の一様分布と一致します.

## ステップ1. ブースティング

ハードコア補題では任意の$\delta$-密な集合$H$上である程度$f$を計算する回路$C_H$の存在性を仮定していましたが, まず最初にハードコア補題の主張において集合を測度に緩めた次の主張を証明します.

<div id="hardcore-measure" markdown="1">
{: .lemma-title }
> **補題(ハードコア測度).**
>
> 任意の$\delta,\varepsilon>0$に対して以下が成り立つ:
> 関数$f\colon \binset^n\to\binset$がサイズ$s$に対して$\delta$-困難ならば,
> ある$\delta$-密な測度$M\colon \binset^n\to[0,1]$と十分小さな定数$c>0$が存在して, 全ての回路$C \in \SIZE(c\delta^2\varepsilon^2 s)$に対して
> 
> $$
  \begin{align*}
    \Pr_{x\sim \calL_M}\left[ C(x) = f(x) \right] \le \frac{1}{2} + \varepsilon.
  \end{align*}
> $$
</div>

対偶を証明します.
任意の$\delta$-密な測度$M$に対してあるサイズ$s$の回路$C_M$が存在して

$$
  \begin{align*}
    \Pr_{x\sim \calL_M} \left[ C_M(x) = f(x) \right] \ge \frac{1}{2} + \varepsilon \tag{2}
  \end{align*}
$$

が成り立つとします.
以下の手続きに従って回路の列$C_1,C_2,\dots$を定義していきます:

{: .corollary-title }
> **ブースティングアルゴリズム**
>
> 1. 測度$M_1$を$M_1\equiv 1$ (定数関数) とし, $i=1$とする.
> 2. 測度$M_i$が$\delta$-密でないならば終了する. そうでなければ, 各$x\in\binset^n$と$j\le i$に対して$b_j(x)\in\binset$を以下で定める:
>
>    $$
       \begin{align*}
         b_j(x) = \begin{cases} \tag{3}
           1	& \if C_{j}(x)= f(x),\\
           -1 & \if C_{j}(x) \ne f(x).
         \end{cases}
       \end{align*}
>    $$
>
>    ここで$C_j=C_{M_j}$は測度$M=M_j$に対して(2)を満たす回路である.
>    また, $R_i(x) = \sum_{j\le i}b_j(x)$をインスタンス$x$におけるこれまでの得失点とする.
> 3. パラメータ$\gamma:=\delta\varepsilon$に対して次の測度$M_{i+1}$を以下で定める:
>
>    $$
     \begin{align*}
      M_{i+1}(x) = \begin{cases} \tag{4}
        1	& \if R_i(x)\le 0,\\
        1-\gamma R_i(x) & \if 0<R_i(x)<1/\gamma,\\
        0 & \if R_i(x)\ge 1/\gamma.
       \end{cases}
     \end{align*}
>    $$
>
>    その後, $i\leftarrow i+1$に更新し, ステップ2に戻る.

{: align="center"}
![測度の更新]({{site.baseurl}}/docs/average_case_complexity/images/hardcore_boosting.svg)
{: width=70%}

イメージとしては, $i$に関する各反復において, これまで選んできた回路$C_1,\dots,C_i$にとって「苦手な」インスタンスが選ばれ易くなるように次の測度$M_{i+1}$を選んでいます.
実際, 得失点$R_i(x)$が小さい(すなわち$C_1,\dots,C_i$にとって$x$が「苦手な」インスタンスである)場合, $M_{i+1}(x)$は大きい値をとりやすいです.

上の手続きによって得られる回路を$C_1,\dots,C_\ell$とし,

$$
  \begin{align*}
    C' = \maj(C_1,\dots,C_\ell) \tag{5}
  \end{align*}
$$

とします.
まず, 各$C_i$のサイズが高々$s_0$なので回路$C'$のサイズは高々$O(\ell s_0)$となります (多数決$\maj$は入力の個数に関する線形サイズの回路で実装できる).

まず回路$C'$の性能を評価します.

<div id="boosting-performance" markdown="1">
{: .lemma }
> ブースティングアルゴリズムによって得られた回路$C_1,\dots,C_\ell$に対して(5)で得られる回路$C'$は
> 
>$$
  \begin{align*}
    \Pr_{x\sim\binset^n} \left[ C'(x) = f(x)\right] \ge 1-\delta
  \end{align*}
>$$
>
>を満たす.
</div>

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">証明</summary>
  インスタンス$x\in\binset^n$に対して$C'(x)\ne f(x)$とすると, $C_1,\dots,C_\ell$のうち少なくとも$\ell/2$個の回路は入力$x$に対して間違えた値を出力するはずです.
  従って$R_\ell(x)\le 0$となるので, $M_{\ell+1}(x)=1$となります.
  一方で, ブースティングアルゴリズムはステップ2において$i=\ell+1$のとき終了するはずなので, $M_{\ell+1}$は$\delta$-密でない, すなわち$\E[M_{\ell+1}]< \delta$となります.
  一方で

  $$
    \begin{align*}
      \delta &> \E[M_{\ell+1}] \\
        &= 2^{-n}\sum_{x\in\binset^n} M_{\ell+1}(x) \\
        &\ge 2^{-n} \abs*{ \left\{x\in\binset^n\colon C'(x)\ne f(x)\right\} } \\
        &=\Pr_{x\sim\binset^n} \left[C'(x)\ne f(x)\right]
    \end{align*}
  $$

  より主張を得ます.
  
</details>


最後に$\ell$の上界を評価します. ここが証明のうち最も技巧的な部分です.

<div id="boosting-size" markdown="1">
{: .lemma }
> ブースティングアルゴリズムで得られる回路の個数は高々$O(\delta^{-2}\varepsilon^{-2})$である.

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">証明</summary>
不変量

  $$
    \begin{align*}
      \Phi = \sum_{i\in[\ell]}\sum_{x\in\binset^n} M_i(x) b_i(x)
    \end{align*}
  $$
  
  の上下界をそれぞれ求めます. ここで$b_j(x)$は式(3)で定義される関数です.

  まず, 各$i\in[\ell]$に対して$C_i$に関する仮定(2)より

  $$
    \begin{align*}
      \E_{x\sim\calL_{M_i}} \left[ b_i(x) \right] &= \Pr_{x\sim\calL_{M_i}} \left[C_i(x) = f(x)\right] - \Pr \left[ C_i(x) \ne f(x)\right] \\
      &= 2\Pr \left[C_i(x) = f(x)\right] - 1 \\
      &\ge 2\varepsilon
    \end{align*}
  $$
  
  より, 両辺の$i\sim[\ell]$について総和をとると

  $$
    \begin{align*}
      \Psi &= \sum_{i\in[\ell]} \abs{M_i}\cdot\E_{x\sim\calL_{M_i}} [b_i(x)] \\
      &\ge \sum_{i\in[\ell]} \delta 2^n\cdot 2\varepsilon & & \because\text{各$M_i$は$\delta$-密} \\
      &= 2\ell\delta\varepsilon\cdot 2^n. \tag{6}
    \end{align*}
  $$
  

  次にインスタンス$x\in\binset^n$を固定して$\sum_{i\in[\ell]}M_i(x)b_i(x)$を上から抑えます.
  関数$m\colon \Int\to[0,1]$を

  $$
    \begin{align*}
      m(z) = \begin{cases}
        1 & \if z\le 0,\\
        1-\gamma z & \if 0<z<1/\gamma,\\
        0 & \if z\ge1/\gamma
      \end{cases}
    \end{align*}
  $$
  
  とします. つまり, 測度$M_i$の更新式(4)を$M_{i+1}(x) = m(R_i(x))$と表します.

  ここで, 次の補助的な有向路を考えます:
  - 頂点集合は$\\{ R_i(x)\colon i=0,1,\dots,\ell\\} \subseteq\Int$ (ただし$R_0(x)=0$と定める).
  - 各$i\in[\ell]$に対してこの有向路は有向辺$(R_{i-1}(x),R_{i}(x))$をこの順番で辿る. さらに, $i$番目の辺を辿ったときに重み$M_{i}(x)b_i(x)$を課す.

  要するに, 新たに選んだ回路$C_i$がインスタンス$x$上で$f(x)$を計算できたら右側, そうでなければ左側に移動する路を考えています.
  この有向路が課される重みの総和

  $$
    \begin{align*}
      \sum_{i\in[\ell]} M_{i}(x) b_{i}(x) \tag{7}
    \end{align*}
  $$

  を上から評価すれば$\Phi$の上界に繋がります.

  {: align="center"}
  ![path]({{site.baseurl}}/docs/average_case_complexity/images/hardcore_proof_path.svg)
  {: width=70%}

  - まず, 頂点$a=R_{i-1}(x)\ge 1/\gamma$から出発する辺についてはその重みの絶対値は$M_i(x)=m(R_{i-1}(x))=0$となるため, 総和に寄与しません.

  - 次に, 有向パスが辺$(a,a+1)$と$(a+1,a)$を辿ったとします.
    辺$(a,a+1)$に課される重みとその逆順$(a+1,a)$に課される重みは符号が異なっており, これら二つの和の絶対値は適当な$a\in\Int$を用いて$\abs{m(a)-m(a+1)}$と表せます.
    関数$m$は$0<a<1/\gamma$の範囲では傾き$\gamma$, それ以外では傾き$0$の直線なので, この絶対値は高々$\gamma$となります.
    このような往復のペアは有向路全体の中でも高々$\ell/2$個しかないので, 往復に課される重みの総和(7)に対する寄与は高々$\gamma\ell/2$となります.

  - 有向路から全ての往復を除去すると, 閉路がなくなるため単なるパスとなります. 左に行き続ける有向路$0\to -1 \to -2\to \dots$については辺重みが$0$以下なので, 総和(7)に寄与しません.
    一方で下図のように右に行き続ける有向路$0\to 1\to 2\to \dots$は, 座標$\ge1/\gamma$から出発する辺の重みは$0$になるので, 総和(7)に寄与する部分の路長は高々$1/\gamma$です.
    重みは常に$1$以下であることを踏まえると, このパス全体の寄与は高々$1/\gamma$となります.

  {: align="center"}
  ![path]({{site.baseurl}}/docs/average_case_complexity/images/hardcore_proof_path2.svg)
  {: width=70%}

以上の議論より, 総和(7)は高々$\frac{\gamma\ell}{2} + \frac{1}{\gamma}$となり,
これは任意のインスタンス$x$について成り立つことから

$$
  \begin{align*}
    \Phi \le 2^n\cdot \left(\frac{\gamma\ell}{2} + \frac{1}{\gamma}\right) \tag{8}
  \end{align*}
$$

を得ます.

最後に, (6)(8)を$\ell$について解くと$\ell=O(\delta^{-2}\varepsilon^{-2})$を得ます. $\square$

</details>
</div>

以上よりハードコア測度の補題を証明できます.

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item"> <a href="#hardcore-measure">ハードコア測度補題</a>
の証明</summary>
  関数$f$が$\SIZE(s)$に対して$\delta$-困難であるとし,
  任意の$\delta$-密な測度$M$に対して(2)を満たす回路$C_M$が存在し, そのサイズは$c\delta^2\varepsilon^2 s$となることを(背理法として)仮定します
  (ここで$c>0$は十分小さな定数).

  ブースティングアルゴリズムによって得られる回路$C_1,\dots,C_\ell$は, 各$C_i$のサイズが高々$c\delta^2\varepsilon^2 s$なので, (5)で定義される$C'$のサイズは, 二つ目の補題より高々$O(s\ell)=O(s\delta^{-2}\varepsilon^{-2}) \le s$となります (最後の不等号では$c$が十分小さい定数であることを用いた).
  一方, 最初の補題より, $C'$は$\Pr_{x\sim\binset^n}[C'(x)=f(x)]  \ge 1-\delta$となり, 関数$f$が$\SIZE(s)$に対して$\delta$-困難であることに矛盾します. $\square$

</details>


## ステップ2: ハードコア測度からハードコア集合へ

[ハードコア測度補題](#hardcore-measure)
ではハードコア測度の存在性を示しましたが, これを確率論的手法に基づいて離散化してハードコア集合の存在性を簡単に証明できます.
[ハードコア補題](#hardcore-set)におけるパラメータ$\delta,\varepsilon$のロス分$o(1)$や$s\le 2^{o(n)}$という条件はこのステップに由来します.

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">
<a href="#hardcore-set">ハードコア補題</a>の証明
</summary>
  
ハードコア測度補題により存在性が保証されるハードコア測度を$M$とします.
この測度$M\colon\binset^n\to[0,1]$は$\delta$-密であり,
(十分小さな定数$c>0$に対して)任意のサイズ$c\delta^2\varepsilon^2 s$の回路$C$に対して

$$
  \begin{align*}
    \Pr_{x\sim\calL_M} \left[C(x) = f(x)\right] \le \frac{1}{2} + \varepsilon
  \end{align*}
$$

を満たします.

集合$H\subseteq\binset^n$を, 各$x\in\binset^n$に対して独立に確率$M(x)\in[0,1]$で$H$に含めて得られるランダムな集合とします.
このランダムな集合$H$が正の確率で所望の性質を満たすことを示すことによって, 所望の集合の存在性を証明します.

**密性の証明**

ランダム集合$H$の要素数の期待値は
$$\E[\abs{H}]=\sum_{x\in\binset^n} M(x) = \abs{M}\ge \delta$$
であり,
$\abs{H}=\sum_{x\in\binset^n} \indicator_{x\in H}$は独立な確率変数の和なので,
[Hoeffdingの不等式]({{site.baseurl}}/docs/tools/prob_inequalities#hoeffding-inequality)より確率$0.99$で$\abs{H}\ge (1-o(1))\delta 2^n$を満たします.
従って$H$は$(1-o(1))\delta$-密です.

なお, ここでも以降でも$o(1)$の項はHoeffdingの不等式に由来するものであり, $n^{-\omega(1)}$ととることができます.

**ハードコア性の証明**

ランダム集合$H$が正の確率でハードコア性を持つことを示します. 具体的には

$$
  \begin{align*}
    \Pr_{H} \qty[ \tinyforall C \in \SIZE(c\delta^2\varepsilon^2 s),\,\Pr_{x\sim H} \qty[ C(x) = f(x) ] \le \frac{1}{2} + \varepsilon ] \ge 1-o(1) \tag{9}
  \end{align*}
$$

を示します. まず, 内部の確率

$$
  \begin{align*}
    \Pr_{x\sim H} \qty[ C(x) = f(x) ] &= \frac{\sum_{x\in H} \indicator_{C(x)=f(x)}}{|H|}
  \end{align*}
$$

の分子と分母を評価します.
密性の証明の議論から, 集合$H$は確率$0.99$で$\abs{H}\ge(1-o(1))\abs{M}$となります.

一方で, 任意に固定した回路$C \in \SIZE(c\delta^2\varepsilon^2 s)$に対して, 分子を評価します.
集合$A_C=\qty{ x\in\binset^n\colon C(x) = f(x)}$を$C$が正解するインスタンスの集合とすると

$$
  \begin{align*}
    \sum_{x\in H} \indicator_{C(x)=f(x)} = \sum_{x\in A_C} \indicator_{x\in H}
  \end{align*}
$$

は($H$の選び方のランダムネスに関して)独立な$\abs{A_C}$個の確率変数の和となり, しかもその期待値は

$$
  \begin{align*}
    \sum_{x\in A_C} \Pr\qty[ x\in H ] &= \sum_{x\in A_C} M(x) \\
    &= \abs{M} \sum_{x\in \binset^n} \frac{M(x)}{\abs{M}}\cdot \indicator_{C(x)=f(x)} \\
    &= \abs{M} \Pr_{x\sim \calL_M} \qty[ C(x)=f(x) ] \\
    &\le \abs{M} \qty( \frac{1}{2} + \varepsilon )
  \end{align*}
$$

を満たします (最後の不等号で測度$M$のハードコア性を用いた).
従って [Hoeffdingの不等式]({{site.baseurl}}/docs/tools/prob_inequalities#hoeffding-inequality)より,
確率$1-2^{-\Omega(2^n)}$で$\abs{A_C\cap H} \le (1+o(1))\abs{M}\qty(\frac{1}{2}+\varepsilon)$を満たします.

考える回路$C$のサイズが高々$s\le 2^{o(n)}$なので, $C$としてありうる回路の個数は高々$2^{\poly(s)}=2^{2^{o(n)}}$個ですので, $C$に関するunion boundより

$$
  \begin{align*}
    \Pr_H \qty[ \tinyforall C\in\SIZE(c\delta^2\varepsilon^2 s), \sum_{x\in H} \indicator_{C(x)=f(x)} \le (1+o(1))\abs{M}\qty(\frac{1}{2}+\varepsilon) ] \ge 0.99
  \end{align*}
$$

となるので, $H$が確率$0.99$で$\delta$-密であることも踏まえると, 確率$0.98$で


$$
  \begin{align*}
    \tinyforall C\in \SIZE(c\delta^2\varepsilon^2s), \Pr_{x\sim H} \qty[C(x)=f(x)] \le \frac{1}{2} + \varepsilon - o(1)
  \end{align*}
$$

となり, (9)を得ます. $\square$
</details>
