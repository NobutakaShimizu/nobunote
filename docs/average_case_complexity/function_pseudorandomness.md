---
title: 関数の擬似ランダム性
nav_order: 2
parent: 平均時計算量理論
---

# 関数の擬似ランダム性

* TOC
{:toc}


擬似ランダム性とは端的にいうと「ランダムに見える」という性質を意味します.
この「ランダムに見える」という性質を定義するには, 二つの分布の識別不可能性の概念を導入します.

{: .definition-title }
> **定義 (分布の識別不可能性)**
>
> 同じ台$V$上に値をとる二つの確率変数$X,Y$および関数族$\calF = \set{f\colon V \to \binset}$を考える.
> パラメータ$\gamma\in[0,1]$に対して, $X$と$Y$が$\calF$に対して**$\gamma$-識別不可能**であるとは,
> 
> $$
  \begin{align*}
    {}^\forall f\in\calF, \left| \Pr[f(X)=1] - \Pr[f(Y)=1] \right| \le \gamma
  \end{align*}
> $$
>
> を意味する.

{: .remark }
> - 擬似ランダム性は確率変数$X,Y$の分布にのみに依存する性質なので, $(X,Y)$が独立かどうかは問いません.
> - 特に, 関数族$\calF$が全ての$\binset$値関数からなる集合の場合, $\gamma$-識別不可能であることと$X$と$Y$の分布間の統計距離が$\gamma$以下であることは等価です (cf. [統計距離]({{site.baseurl}}/docs/tools/statistical_distance)).

ある確率変数(または分布)$X$が擬似ランダムであるとは, 特定の関数族に対して一様分布と識別不可能であることを意味します.
関数$f\colon\binset^n\to\binset$が擬似ランダムであるとは, 二つの分布

$$
  \begin{align*}
    (X,f(X)), \quad (X,U)
  \end{align*}
$$

が識別不可能であると定義します. ここで$X\sim\binset^n$および$U\sim\binset$ ($X$と$U$は独立).

{: .definition-title }
> **定義 (関数の擬似ランダム性)**
>
> 自然数$n\in\Nat$を固定し, 関数$f\colon \binset^n\to\binset$および関数族$\calC=\set{C\colon\binset^{n+1}\to\binset}$を考える.
> パラメータ$\gamma\in[0,1]$に対して
>
> $$
  \begin{align*}
    {}^\forall C\in\calC, \left| \Pr_{x\sim\binset^n}[C(x,f(x))=1] - \Pr_{x\sim\binset^n,u\sim\binset}[C(x,u)=1] \right| \le \gamma
  \end{align*}
> $$
>
> を満たすとき, 関数$f$は**$\calC$に対して$\gamma$-擬似ランダム**であるという.
> なお, $f$がランダムな関数である場合は確率の中に$f$に関する確率も含める.

主に関数クラス$\calC$としては多項式時間アルゴリズムや多項式サイズの回路を考えます.
このように, 制限された計算能力で計算できる関数族$\calC$に対する擬似ランダム性を**計算量的擬似ランダム性**といいます.

## 関数の平均時困難性と擬似ランダム性

平均時困難性と擬似ランダムネス性は密接に関連しています.
そもそも, 平均時の意味で困難な関数$f\colon \binset^n\to\binset$はどのような関数なのでしょうか?
「計算が難しい」とは, 入力$x$を見た時に$f(x)$を推測するのが難しいということを意味します.
従って, $f(x)\in\binset$が$x$に依存せずランダムであれば推測することは不可能なので, 難しそうな気がします.
これを決定的な関数$f$で模倣するためには$f(x)$がランダムっぽく見える必要があります.
このように, $x\mapsto f(x)$の計算困難性と$f(x)$の擬似ランダム性には密接な関係があります.

具体的には,
関数$f$が強い平均時困難性を持つとき, 一様ランダムな$x\sim \binset^n$に対して$f(x)$もまた擬似ランダムなビットになります.
これはYaoのnext-bit predictorという結果で形式的に証明されており, 平均時計算量理論(特にハードコア補題の応用)を直感的に理解する上で非常に大切な視点になります.

ここでは$\calC=\SIZE(s)$として, サイズ$s$の回路で表現される関数族を考えます.

{: .theorem-title }
> **定理 (平均時困難性と擬似ランダム性の等価性)**
>
> 入力長$n\in\Nat$を固定する. 十分大きな($n$に依存しない)定数$c>0$が存在して以下が成り立つ:
> 関数$f\colon\binset^n\to\binset$が$\SIZE(s)$に対して$(1/2 - \varepsilon)$-困難であるとき, $f$は$\SIZE(s-c)$に対して$(1/2 - \varepsilon)$-擬似ランダムである.
> 逆に, $f$が$\SIZE(s)$に対して$(1/2 - \varepsilon)$-擬似ランダムであるとき, $f$は$\SIZE(s-c)$に対して$(1/2 - \varepsilon)$-困難である.

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">擬似ランダム性$\Rightarrow$平均時困難性</summary>
関数$f$が$(1/2-\varepsilon)$-困難でない, すなわちある回路$C\in\SIZE(s)$が存在して

$$
  \begin{align*}
    \Pr_{x\sim\binset^n}[C(x)=f(x)] \ge 1/2 + \varepsilon
  \end{align*}
$$

を満たすとき, 回路$C'\colon\binset^{n+1}\to\binset$を

$$
  \begin{align*}
    C'(x,b) = b \oplus C(x) \oplus 1
  \end{align*}
$$

で定めます. このとき, $C'$のサイズは$s+O(1)$であり, $(x,b)\sim\binset^{n+1}$のときは確率$1/2$で$1$を出力します.
一方, $x\sim\binset^n$に対し$b=f(x)$であるならば,

$$
  \begin{align*}
    \Pr_{x\sim\binset^n}[C'(x,f(x))=1] = \Pr_{x\sim\binset^n}[C(x)=f(x)] \ge 1/2 + \varepsilon
  \end{align*}
$$

ですので, 分布$(x,f(x))$はサイズ$s+O(1)$に対して$\varepsilon$-擬似ランダムではありません.

</details>

逆方向の主張(の対偶)はYaoのnext-bit predictorという結果を用いて証明されます.

<div id="prop:yao-next-bit-predictor" markdown="1">
{: .proposition-title }
> **命題 (Yaoのnext-bit predictor)**
>
> 関数$f\colon\binset^n\to\binset$および確率変数$X\sim\binset^n$を考える. 分布$(X,f(X))$が$\SIZE(s)$に対して$(1/2-\varepsilon)$-擬似ランダムでないならば, ある($n$に依存しない)定数$c>0$と回路$C'\in\SIZE(s-c)$が存在して
> 
> $$
  \begin{align*}
    \Pr_{x\sim\binset^n}[C'(x)=f(x)] \ge 1/2 + \varepsilon.
  \end{align*}
> $$
</div>

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">証明</summary>
  擬似ランダムでないという仮定から, ある回路$C\in\SIZE(s)$が存在して

  $$
    \begin{align*}
      \Pr_{x\sim\binset^n}[C(x,f(x))=1] - \Pr_{x\sim\binset^n,b\sim\binset}[C(x,b)=1] > \varepsilon
    \end{align*}
  $$

  が成り立ちます (必要に応じて出力をフリップすることにより絶対値を外します).
  $b\sim\binset$は$x$とは独立なので, この不等式を書き換えると

  $$
    \begin{align*}
      \E_{x\sim\binset^n}[C(x,f(x))] - \E_{x\sim\binset^n}\qty[C\qty(x,\overline{f(x)})] > 2\varepsilon \tag{1}
    \end{align*}
  $$
  
  が成り立ちます. つまり, $C(x,b)$は$b=f(x)$のときにより$1$を出力しやすい回路となっているわけですので,
  $C(x,1)$と$C(x,0)$を実行してみて$C$が$1$を出力した方のビットを出力すれば, $f(x)$を推測できそうな直感があります.
  そこで, 回路$C_b\colon\binset^n\to\binset$を

  $$
    \begin{align*}
      C_b(x) = 1\oplus b \oplus C(x,b)
    \end{align*}
  $$

  と定義します. $C_0$と$C_1$の少なくとも一方が$C'$として所望のものになっていることを主張します.
  実際, ランダムな$x\sim\binset^n$と$b\sim\binset$に対して

  $$
    \begin{align*}
      \Pr_{(x,b)\sim\binset^{n+1}}\qty[ C_b(x)=f(x) ] &= \E_{x,b}\qty[ C_b(x)\oplus f(x) \oplus 1 ] \\
      &= \E_{x,b}\qty[ C(x,b) \oplus f(x) \oplus b] \\
      &= \frac{1}{2}\underbrace{\E_x[C(x,f(x))]}_{b=f(x)} + \frac{1}{2}\underbrace{\qty(1-\E_x[C(x,\overline{f(x)})])}_{b\ne f(x)} \\
      &> \frac{1}{2} + \varepsilon & & \because (1)
    \end{align*}
  $$
  
  より, $C_0$と$C_1$の少なくとも一方は$f$を$(1/2+\varepsilon)$の割合の入力で計算しますので, 確かに所望の回路$C'$の存在性は示せました.
</details>