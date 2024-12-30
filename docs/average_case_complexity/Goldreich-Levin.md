---
title: Goldreich-Levinの定理
nav_order: 1
parent: 平均時計算量
---

# Goldreich-Levinの定理

Goldreich-Levinの定理とは, [Goldreich, Levin (1989)](https://dl.acm.org/doi/10.1145/73007.73010)による定理です.
様々な文脈で解釈できる有名な定理で, 主に
- 任意の一方向性置換(one-way permutation)からハードコア述語を構成する定理
- アダマール符号の局所リスト復号を与える定理
- Boolean関数の大きいフーリエ級数の列挙アルゴリズムを与える定理

と理解されています.
ただしここではそれぞれの文脈の前知識を必要としない解説をします.

## ウォームアップ1. 線形関数の復元

まずは導入として, 以下の問題を考えてみましょう.

{: .definition-title }
> **問題(線形関数の復元).**
>
> あるベクトル$c=(c_1,\dots,c_n) \in \\{0,1\\}^n$に対して
>
> $$
  \begin{align*}
    f(x_1,\dots,x_n) = \sum_{i\in[n]} c_i x_i \bmod 2
  \end{align*}
> $$
>
> と表せる関数 $f \colon \\{0,1\\}^n \to \\{0,1\\}$ がオラクルアクセスとして与えられたとき, ベクトル$c \in \\{0,1\\}^n$を$\mathrm{poly}(n)$時間で求めよ.

{: align="center"}
![オラクルアクセスの図]({{site.baseurl}}/docs/average_case_complexity/images/oracleaccess.drawio.svg)



計算時間が指数時間かかって良いのであれば, 全ての$x \in \\{0,1\\}^n$に対して$f(x)$にオラクルアクセスして$f$の真理値表を取得して, そして全ての$c\in \\{0,1\\}^n$を列挙して線形関数を列挙して, 真理値表と合致する線形関数を求めればよいです.

ところがそもそも$f$が線形関数であることから

$$
  \begin{align*}
    f(1,\underbrace{0,\dots,0}_{n-1\text{個}}) = c_1
  \end{align*}
$$

から$c_1$を直接求められます. より一般に各単位ベクトル上での$f$の値にオラクルアクセスすればよく, 以下のアルゴリズムによって求められます.

{: .corollary-title }
> アルゴリズム1.
>
> 1. 各$i=1,\dots,n$ に対して以下を行う:
>    1. $e_i$を$i$番目の成分が$1$, それ以外の成分が$0$であるような単位ベクトルとする.
>    2. $c_i \leftarrow f(e_i)$とする.
> 2. $c=(c_1,\dots,c_n)$を出力する.

## ウォームアップ2. 線形関数の復元 (ノイズ付き)

では, [ウォームアップ1](#ウォームアップ1-線形関数の復元)を少し難しくした次の問題を考えてみましょう.
以後, 二つのベクトル $x,y\in \\{0,1\\}^n$ の $\mathbb{F}_2$ 上での内積を

$$
  \begin{align*}
    \langle x,y \rangle = \sum_{i\in[n]} x_i y_i \pmod 2
  \end{align*}
$$

と表すことにします.

{: .definition-title }
> **問題(線形関数の弱いノイズからの復元).**
>
> あるベクトル$c=(c_1,\dots,c_n) \in \\{0,1\\}^n$に対して
>
> $$
  \begin{align}
    \Pr_{x \sim \{0,1\}^n} \left[ f(x) = \langle c,x \rangle \right] \ge 0.99 \tag{1}
  \end{align}
> $$
>
> を満たす関数 $f \colon \\{0,1\\}^n \to \\{0,1\\}$ がオラクルアクセスとして与えられたとき, ベクトル$c \in \\{0,1\\}^n$を$\mathrm{poly}(n)$時間で求めよ. ここで, 上式の確率は一様ランダムに選ばれた$x\sim \\{0,1\\}^n$に関する確率を考える.

{: align="center"}
![オラクルアクセスの図]({{site.baseurl}}/docs/average_case_complexity/images/oracleaccess2.drawio.svg)

上図では$c=(101)$に対して$x\mapsto \langle c,x\rangle$という関数の真理値表のうち二つのビットだけ反転(赤字)したものがオラクルアクセスとして与えられた状態で係数ベクトル$c$を復元する問題を表現しています.
このような「ノイズがのった線形関数」の局所的な情報から元の線形関数の情報を取得せよという問題を考えています.

例えば[ウォームアップ1](#ウォームアップ1-線形関数の復元)で考えたアルゴリズム1を考えてみましょう.
今回の問題設定では, 各単位ベクトル上でオラクルアクセスの値$f(e_i)$が必ずしも$c_i=\langle c,e_i \rangle$と等しいとは限りません.
例えば

$$
  \begin{align*}
    f(x) = \begin{cases}
      1 - c_i	& \text{if $x=e_i$ is a unit vector},\\
      \langle c,x\rangle & \text{otherwise}
    \end{cases}
  \end{align*}
$$

で定まる関数$f$は, $n$が十分大きければ式(1)を満たしますが, アルゴリズム1の出力は正解$c$とは異なるベクトルになってしまいます.
このように, この問題設定で考える$f$はアルゴリズムに応じて「いじわるに」(敵対的に)オラクルアクセスとして与えられます.

{: .remark }
そもそも, 任意の決定的多項式時間アルゴリズムは$f$の真理値表のうち$\mathrm{poly}(n)$個の成分しか見ません. しかし$f$を敵対的に選ぶときは$0.01\cdot 2^n$個の$x$に対して$f(x)$の値を自由に選ぶことができますので, $\mathrm{poly}(n) < 0.01\cdot 2^n$を満たす十分大きな$n$に対してはこの多項式時間アルゴリズムのオラクルアクセスの返答を自由に選べてしまうので係数ベクトル$c$の情報を得ることはできません.
つまり情報理論的にこの問題は決定的多項式時間アルゴリズムでは解けないことになります (もっというと計算時間は少なくとも$0.01\cdot 2^n$は必要です).

一見すると非常に難しそうに見えますが, 実はランダムネスの力を借りると解くことができます.

{: .proposition }
> 上記の問題を確率$0.99$で解く$O(n\log n)$時間乱択アルゴリズムが存在する.

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">証明</summary>
  
任意の単位ベクトルを$e_i$とと$x\in \{0,1\}^n$に対して

$$
  \begin{align*}
    \langle c, e_i \rangle = \langle c, x+e_i \rangle - \langle c,x \rangle
  \end{align*}
$$

が成り立つので, 何らかの$x$に対して$\langle c,x+e_i \rangle$と$\langle c,x \rangle$の値が求められれば$f(e_i)$を計算することができます (ここでベクトルの加算は$\mathbb{F}_2$上で考えます).
そこで$x\in \{0,1\}^n$を一様ランダムに選んだとき, $x+e_i \in \{0,1\}^n$もまた一様ランダムなベクトルとなるので, 任意の固定した$i\in[n]$に対して

$$
  \begin{align*}
    &\Pr_{x\sim\{0,1\}^n} \left[ f(x) = \langle c,x \rangle \text{ and } f(x+e_i) = \langle c,x+e_i \rangle \right] \\
    &\ge 1 - \Pr_x \left[ f(x) \ne \langle c,x \rangle \right]  - \Pr_x \left[f(x + e_i) \ne \langle c,x+e_i \rangle \right] \\
    &\ge 0.98 \tag{2}
  \end{align*}
$$

となります. このことから, 一様ランダムな$x\sim \{0,1\}^n$に対して確率$0.98$で$c_i = \langle c,e_i \rangle = f(x+e_i) - f(x)$を満たします.
この操作を$O(\log n)$回繰り返して多数決をとれば確率$\ge 1-\frac{1}{100n}$で$c_i$が得られるので, 全ての$i \in [n]$に対して同様の操作を行えば, $i$に関するunion boundから確率$0.99$で$c=(c_1,\dots,c_n)$を得られます.

$\square$

</details>

まとめると命題のアルゴリズムは以下となります:

{: .corollary-title }
> **アルゴリズム2.**
>
> 1. 各$i=1,\dots,n$に対して以下を行う:
>    1. 各$t=1,\dots,100\log_2 n$に対して以下を行う:
>       1. 一様ランダムなベクトル$x \sim \{0,1\}^n$を選ぶ.
>       2. オラクルアクセスを用いて$b_t = f(x+e_i) - f(x)$とする.
>    2. $(b_t)$の中で多数決をとり, それを$c_i$とする.
> 2. $c=(c_1,\dots,c_n)$を出力する.



## Goldreich-Levinの定理: 強いノイズが乗った線形関数の復元

[ウォームアップ2](#ウォームアップ2-線形関数の復元-ノイズ付き)の問題設定では線形関数の真理値表のうち1%の成分が反転した場合でも乱択を用いれば$O(n\log n)$時間で復元できることを証明しました.
ではこのノイズ率$0.01$はどこまで大きくできるでしょうか?
以後の議論を明確に述べるために, 二つの関数間の距離の概念を導入します:

{: .definition }
> 二つの関数$f,g\colon \\{0,1\\}^n \to \\{0,1\\}$の距離$\mathrm{dist}(f,g)$を
>
> $$
  \begin{align*}
    \mathrm{dist}(f,g):=\Pr_{x\sim \{0,1\}} \left[f(x)\ne g(x)\right]
  \end{align*}
> $$
>
> とする.

すなわち, $f$と$g$の真理値表を長さ$2^n$のベクトルとみなしたときの(正規化された)ハミング距離を考えていることになります.
この距離を用いて[ウォームアップ2](#ウォームアップ2-線形関数の復元-ノイズ付き)の問題設定を一般的な形で述べ直します.

{: .definition-title }
> 問題.
>
> あるベクトル$c\in \\{0,1\\}^n$を係数ベクトルとして持つ線形関数$g\colon x\mapsto \langle c,x\rangle$に対し, $\mathrm{dist}(f,g)\le \delta$を満たす関数$f$へのオラクルアクセスが与えられたとき, $c$を求めよ.

{: align="center"}
![オラクルアクセスの図]({{site.baseurl}}/docs/average_case_complexity/images/GLproblem.drawio.svg)

すなわち, 知りたい関数$g$から半径$\delta$以内にある関数$f$の真理値表の局所的な情報のみを用いて$g$の係数ベクトルを求めよという問題になっています.

[ウォームアップ2](#ウォームアップ2-線形関数の復元-ノイズ付き)では$\delta\le 0.01$に対してこの問題が効率的に解けることを証明しました. では$\delta$はどこまで大きくできるでしょうか?
アルゴリズム2では最後に多数決で成功確率を増幅させているわけですが, そのためには一回の試行の成功(すなわち $f(x)=\langle c,x\rangle$かつ $f(x+e_i)=\langle c,x+e_i \rangle $という事象)の確率が$0.5$を超えていなければなりません.
この確率は式(2)で抑えていたわけですが, この最後の値が$0.5$を超えるには

$$
  \begin{align*}
    \delta = \Pr_x \left[f(x) \ne \langle c,x \rangle\right] < 0.25
  \end{align*}
$$

でなければなりません. つまり, アルゴリズム2は$\delta < 0.25$でなければ成功する保証がないということになります.


実は$\delta \ge 0.25$の場合は復元すべき線形関数が一意に定まるとは限りません.

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">一意復元できない例</summary>
  
例えば$\delta=0.25$とし, $c_1=(0,\dots,0),c_2=(1,0,\dots,0)$として二つの線形関数

$$
  \begin{align*}
    g_1 \colon x &\mapsto \langle c_1, x \rangle = 0, \\
    g_2 \colon x &\mapsto \langle c_2, x \rangle = x_1
  \end{align*}
$$

を考えてみましょう. 最初の線形関数$g_1$は恒等的に$0$を出力する定数関数ですので, 

$$
  \begin{align*}
    g' \colon x \mapsto x_1\cdot x_2
  \end{align*}
$$

という関数を考えると$\mathrm{dist}(g_1,g')\le 0.25$を満たします.
この関数$g'$は$g'(x)=1 \iff x_1=x_2=1$ですので
- $x_1 = 0$のとき, $g_2(x)=g'(x)=0$
- $x_1 = 1$のとき, $g_2(x)=1$, $g'(x)=x_2$

より

$$
  \begin{align*}
    \mathrm{dist}(g_2,g')=\Pr_x [g_2(x) \ne g'(x)] = \Pr_x[x_1=1\text{ and }x_2=0] = 0.25
  \end{align*}
$$

です.
つまり$g'$は$g_1,g_2$どちらからも距離$0.25$だけ離れている関数となっているため,
アルゴリズムが$g'$をオラクルアクセスとして与えられたとき, $g_1$と$g_2$はどちらも正解の条件に当てはまってしまうのです.

{: align="center"}
![半径0.25のボールが重なる図]({{site.baseurl}}/docs/average_case_complexity/images/nonunique.drawio.svg)

</details>

ところが, 実は任意の関数$f\colon \\{0,1\\}^n\to \\{0,1\\}$に対して, $\mathrm{dist}(f,g)\le 0.5-\varepsilon$を満たす線形関数$g$は高々$O(\varepsilon^{-2})$個しかないことが知られています.
Goldreich-Levinの定理とはそのような全ての線形関数$g$を多項式時間で列挙できることを主張する定理です.

{: .theorem-title }
> **定理 (Goldreich-Levinの定理).**
>
> 任意の関数$f\colon \\{0,1\\}^n\to \\{0,1\\}$に対し, $f$へのオラクルアクセスとパラメータ$\delta,\varepsilon>0$が与えられたときに$\mathrm{dist}(f,g)\le 0.5 - \varepsilon$を満たす全ての線形関数$g$の係数ベクトルを確率$1-\delta$で出力する$\mathrm{poly}(n,1/\varepsilon,1/\delta)$時間乱択アルゴリズムが存在する.

### 証明のアイデア

証明では




