---
title:  IJKW10
parent: メモ
nav_order: 2
---

# UNIFORM DIRECT PRODUCT THEOREMS: SIMPLIFIED, OPTIMIZED, AND DERANDOMIZED

* TOC
{:toc}


## Info
- authors: Russel Impagliazzo, Ragesh Jaiswal, Valentine Kabanets, Avi Wigderson
- publication: [SICOMP(2010)](https://epubs.siam.org/doi/10.1137/080734030)

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">全体の要約</summary>

- uniform direct product theorem: 次の性質を満たすアルゴリズム$A$が存在する: $f^k$を確率$\varepsilon$で計算する回路$C$を入力として受け取ったとき, 確率$\Omega(\varepsilon)$である回路$C'$を出力し, この回路$C'$は$f$を確率$1-\delta$で計算する. ここで$\delta = O(\log(1/\varepsilon)/k)$.
- これをGoldreich-Levinの定理と組み合わせることでuniform XOR lemmaを証明.
- 同じ手法を使って, アフィン部分空間全体によって得られるderandomized direct productも証明.

</details>

## 一様な直積定理

関数$f\colon\binset^n\to\binset$と$k\in\Nat$に対して, $f^k\colon\binset^{nk}\to\binset^k$を

$$
  \begin{align*}
    f^k(x_1,\ldots,x_k) = (f(x_1),\dots,f(x_k))
  \end{align*}
$$

で定める.
直積定理とは, $f^k$を$\varepsilon$の割合の入力上で正しく計算する回路$C$が存在するとき, $f$を$1-\delta$の確率で計算する回路$C'$が存在することを主張する定理である. ここで$\delta = O(\log(1/\varepsilon)/k)$であり, $C'$のサイズは$C$のサイズとほぼ同じ.
よく知られる直積定理の証明は, 回路$C'$は(入力とは独立に)適切に選ばれた複数の$x'\in\binset^n$に対して$f(x')$の値に依存する. このように, 入力には依存しないが, $f$の値など, 入力長$n$にのみ依存する文字列(アドバイス)に依存する回路を構成するような直積定理を非一様(nonuniform)という.
言い換えれば, 非一様な直積定理とはあくまでも所望の回路$C'$の存在性のみを保証するのであって, $C$を受け取って$C'$を構成するアルゴリズムを与えるものではない.

一方, 構成的な直積定理, すなわち$f^k$をある程度計算する回路$C$を入力として受け取ってほとんどの入力で$f$を計算する回路$C$を出力するアルゴリズムを与えるものを一様(uniform)な直積定理という.
この論文の主結果は一様な直積定理である.

{: .theorem-title }
> **定理 (一様な直積定理; informal)**
>
> 任意の関数$f\colon\binset^n\to\binset$と$k\in\Nat$に対して, $f^k$を$\varepsilon$の割合の入力上で正しく計算する回路$C$が存在するならば, $f$を$1-\delta$の確率で計算する回路$C'$であって, $C$とほぼ同程度のサイズであるようなものが存在する. ただし$\delta = O(\log(1/\varepsilon)/k)$.
>
> さらに, 回路$C$を受け取って$C'$を確率$\Omega(\varepsilon)$で出力する乱択アルゴリズム$A$が存在する.

### 誤り訂正符号の観点

一様な直積定理は誤り訂正符号の言葉を使うと, 近似局所復号アルゴリズムを与える定理として解釈できる.
文字列$f\in\binset^N$と$k\in\Nat$に対して, $\mathrm{Code}(f)=f^k$によって符号化する符号$\mathrm{Code}$を**直積符号(direct product code)**と呼ぶ. ここで文字列$f$を関数$f\colon[N]\to\binset$と同一視する.
一様な直積定理により, $\mathrm{Code}(f)\colon[N]^k\to\binset^k$を$\varepsilon$の割合の入力上で正しく計算する回路$C$が存在するならば$f\colon[N]\to\binset$を$1-\delta$の確率で計算する回路$C'$が存在することが保証される.
特に, 元の回路$C$は

$$
  \begin{align*}
    \Pr_{y\sim[N]^k}[C(y)=f^k(y)]\geq \varepsilon
  \end{align*}
$$

より, 真理値表の文字列と同一視すると$C'\in(\binset^k)^{N^k}$と$f^k\in(\binset^k)^{N^k}$の(正規化された)ハミング距離は高々$1-\varepsilon$である.
一方で直積定理によって得られる回路$C'$は(真理値表で比較すると)$f$からのハミング距離が高々$\delta$となる.
すなわち, 一様な直積定理により, $\mathrm{Code}(f)$からのハミング距離が$1-\varepsilon$であるような文字列$C$へのオラクルアクセスが与えられたとき, 文字列$f$からのハミング距離が高々$\delta$であるような文字列$C'$へのオラクルアクセスを提供するアルゴリズム$A$が存在することが保証される.
このように, ノイズが付与された符号語へのオラクルアクセスを, 元のメッセージに非常に近い文字列へのオラクルアクセスに変換するタスクを**近似局所復号 (approximate local list-decoding)**と呼ぶ.

## アルゴリズムの記述

一様な直積定理のアルゴリズム$A$は以下のように記述される.
まず, $\binset^n$内の$k/2$個の元からなる集合$S\subseteq\binset^n$と
$v\in\binset^{k/2}$を固定して次の回路$C_{S,v}$を考える:

{: .corollary-title }
> **回路$C_{S,v}$**
>
> 入力: $x\in\binset^n$
> 1. 入力$x\in\binset^n$に対して以下を$100\cdot\log(1/\delta)/\varepsilon$回繰り返す:
>    1. 集合$S\cup\set{x}$を含む集合$T=\set{x_1,\dots,x_k}\subseteq\binset^n$ をランダムに選ぶ.
>    2. 回路$C$を使って$w=C(x_1,\dots,x_k)\in\binset^k$を計算し, $w\restr{S} = v$ならば$w\restr{x}$を出力して終了する.
> 2. ステップ1で一度も成功しなかった場合, $\bot$を出力する.

直積定理のアルゴリズム$A$は, 以下のように記述される.

{: .corollary-title }
> **アルゴリズム$A$**
>
> 入力: $C\colon\binset^{nk}\to\binset^k$
> 1. 一様ランダムに$k$個の入力$T=\set{x_1,\dots,x_k}\subseteq\binset^n$を選ぶ. さらに$S\subseteq T$を$T$の一様ランダムな部分集合であって$\abs{S}=k/2$となるよう選ぶ.
> 2. $w=C(x_1,\dots,x_k)$に対して$v=w\restr{S}$として, $C_{S,v}$を出力する.

