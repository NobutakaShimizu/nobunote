---
title: AKSアルゴリズム
nav_order: 2
parent: 埋め込みクリーク問題
---

# AKSアルゴリズム

AKSアルゴリズムとは, $k\ge 10\sqrt{n}$に対して埋め込みクリーク探索問題を解く多公式時間アルゴリズムであり,
その名は提案した論文[Alon, Krivelevich, Sudakov (1998)](https://onlinelibrary.wiley.com/doi/10.1002/(SICI)1098-2418(199810/12)13:3/4%3C457::AID-RSA14%3E3.0.CO;2-W)の著者名の頭文字からとられています.
同じ論文内で任意の小さい定数$c>0$に対してサイズ$k\ge c\sqrt{n}$のクリークを見つける方法も提案されています.
なお, AKSアルゴリズムが扱う$k$の領域$k = \Omega(\sqrt{n})$は, 
[Kučeraのアルゴリズム]({{site.baseurl}}/docs/planted_clique/Kuceraのアルゴリズム)における条件$k\ge \Omega(\sqrt{n\log n})$を$\sqrt{\log n}$倍だけ改善していますが,
AKSアルゴリズムが提案されて以降, 今もなお$k=o(\sqrt{n})$に対して埋め込みクリーク探索問題を解くアルゴリズムは知られておらず, 特に任意の定数$\alpha>0$に対して$k=n^{1/2-\alpha}$において埋め込みクリーク探索問題や判定問題は多項式時間では解けないであろうと予想されています (埋め込みクリーク予想).

## アルゴリズムの記述

AKSアルゴリズム自体はシンプルです.
このアルゴリズムはグラフの隣接行列の固有値や固有ベクトルを見るためしばし**スペクトルメソッド(spectral method)**と呼ばれます.

{: .corollary-title }
> **AKSアルゴリズム $\calA$.**
>
> **入力**: グラフ$G = (V,E)\sim \calG(n,1/2,k)$.
>
> 1. 隣接行列$A\in\binset^{n\times n}$の固有値を$\lambda_1\ge \dots \ge \lambda_n$とし, $\lambda_2$に対応する固有ベクトルを$x_2 \in \Real^V$とする.
> 2. ベクトル$x_2$の成分の絶対値の大きい順に$k$個の頂点を選び, これらからなる集合を$W\subseteq V$とする.
> 3. 頂点集合$W$内に少なくとも$\frac{3}{4}k$個の隣接頂点を持つような頂点からなる集合$\Ctilde\subseteq V$を出力する. すなわち, $N(u)$を頂点$u$の隣接頂点集合とすると,
>
> $$
  \begin{align*}
    \Ctilde :=  \left\{ u \in V \colon \abs{N(u) \cap W} \ge \frac{3}{4}k \right\}.
  \end{align*}
> $$

多項式時間で十分高い精度で固有ベクトルを計算できるので, 上記のアルゴリズムは多項式時間で動きます.

## 直感的な議論:なぜ第二固有ベクトル？

なぜAKSアルゴリズムでは第二固有ベクトルを計算するのでしょうか?
入力として与えられたグラフ$G\sim\calG(n,1/2,k)$の隣接行列$A$はランダム行列となりますが, その固有値固有ベクトルはどのような振る舞いをするのでしょうか?

厳密な議論とは程遠いですが, まず隣接行列$A$の「平均的な」行列$\Atilde$を考えてみましょう:
一様ランダムに$k$頂点部分集合$C\sim \binom{[n]}{k}$を選び,

$$
  \begin{align*}
    \Atilde(u,v) = \begin{cases}
      1	& \text{if }u,v\in C,\\
      \frac{1}{2} & \otherwise.
    \end{cases}
  \end{align*}
$$

行列$\Atilde$の固有値と固有ベクトルはどうなるでしょうか?


{: align="center"}
![平均的な隣接行列]({{site.baseurl}}/docs/planted_clique/images/PC_average_adjmatrix.svg)
{: width=70%}

- 上図のように$\Atilde$は二つのランク$1$行列の凸結合で表せます. 従って$\Atilde$のランクは高々$2$となるので, 第三以降の全ての固有値は$0$です.
- 第一と第二固有値についてみるためにRayleigh商を考えましょう. ベクトル$x\in\Real^n$を
 
  $$
    \begin{align*}
      x(u) = \begin{cases}
        a	& \if u\in C,\\
        b & \otherwise
      \end{cases}
    \end{align*}
  $$

  とします (ただし$a$と$b$の少なくとも一方は非ゼロ). $k\ll n$として$n\to\infty$における漸近的な挙動を考えると, Rayleigh商はおよそ

  $$
    \begin{align*}
      \frac{\inprod{x,\Atilde x}}{\inprod{x,x}} &= \frac{k^2a^2 + 2k(n-k)\cdot (ab/2) + (n-k)^2(b^2/2)}{ka^2+(n-k)b^2} \\
      &\approx \begin{cases}
        \frac{n-k}{2}	& \if b\ne 0,\\
        k & \otherwise
      \end{cases}
    \end{align*}
  $$

  となるので, 第一固有値はおよそ$\frac{n-k}{2}\approx \frac{n}{2}$, 第二固有値はおよそ$k$であろうことが予測できます.
  
  特に第二固有値では$b=0$が必要なので, 対応する固有ベクトルも$b=0$, すなわち$k$クリーク$C$の指示ベクトルの$a$倍になっているであることが推測されます.

すなわち, 第二固有ベクトルの成分を絶対値の大きい順に並べて$k$個の頂点を選ぶとそれはクリークになりそうなことが推察できます.

また, 仮にAKSアルゴリズムのステップ2で得られる$W\subseteq V$が$W=C$を満たす場合, ステップ3でも$\Ctilde=W=C$を満たすので, 確かに「平均的な隣接行列」に基づく議論を考えるとなんとなくAKSアルゴリズムが正しそうな気がしてきます.

## ステップ3はなぜ必要?

上記の直感的な議論に基づくと, ステップ2で得られる部分集合$W$は$C$に一致しそうな気がします.
しかしながら実際にはランダム行列に関する期待値をとると, 高確率で$\abs{W}\approx k$かつ$\abs{W\cap C}\ge \frac{3}{4}k$になることは示せるものの$W=C$になるかは分かりません (ものすごく賢い方法が思いつくとそうなるかもしれませんが).
そこでクリーク$C$を復元するためにステップ3が必要になります.

下図をみてください.
各頂点から$W$に伸びている辺の本数を数えます.
クリーク外の頂点$v\not\in C$についてはその本数の分布は$\Bin(\abs{W},1/2)$となるので高確率でその本数はおよそ$\frac{k}{2}$となります.
一方でクリーク内の頂点$u\in C$は, クリーク内の他全ての頂点に辺が伸びているため, $W\cap C$に伸びる辺の本数は少なくとも$\abs{W\cap C}\ge \frac{3}{4}k$となります.
従ってクリーク内外の頂点の識別が可能となり, exactにクリーク$C$を復元することができます.

{: align="center"}
![埋め込みクリークのexactな復元]({{site.baseurl}}/docs/planted_clique/images/PC_overlap.svg)
{: width=70%}

## アルゴリズムの正当性の証明

{: .theorem }
> AKSアルゴリズム $\calA$は, $k\ge 10\sqrt{n}$に対して埋め込みクリーク探索問題を成功確率$1-n^{-\omega(1)}$で解く. すなわち
> 
> $$
  \begin{align*}
    \Pr_{(G',C)\sim \PC(n,k)} \left[ \calA(G') = C \right] \ge 1-n^{-\omega(1)}.
  \end{align*}
> $$

math



