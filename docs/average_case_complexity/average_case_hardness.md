---
title: 問題の平均時困難性
nav_order: 1
parent: 平均時計算量理論
---
# 問題の平均時困難性

計算問題が平均時困難であるという性質は, 多くの入力上でその問題を解くことが困難であることを意味します.
NP困難性などの最悪時困難性では困難な入力の存在性を議論するのに対し, 平均時困難性ではその困難な入力が入力全体に対しどの程度の割合を占めるかを議論します.
ここでは判定問題の平均時困難性を導入します; 一般の問題についても同様に平均時困難性の概念を定義できます.

まず, 導入として関数$f\colon \binset^n\to\binset$の平均時困難性を定義します.

{: .definition-title }
> **定義 (関数の平均時困難性)**
>
> 自然数$n\in\Nat$を固定し, $\calA = \\{ A\colon \binset^n \to \binset \\}$を関数の族とする.
> パラメータ$\gamma\in[0,1]$に対して関数$f\colon\binset^n\to \binset$が**$\calA$に対して$\gamma$-困難**であるとは,
> 
> $$
  \begin{align*}
    {}^\forall A \in \calA,\Pr_{x\sim\binset^n}\left[ A(x) = f(x) \right] \le 1-\gamma
  \end{align*}
> $$
>
> を意味する.

なお, 基本的に$\calA$としては定数関数$A_b\colon x\mapsto b$を含み, $A_0$と$A_1$の少なくとも一方は$1/2$以上の割合の$x\sim\binset^n$に対して$A(x)=f(x)$となるので, 考える$\gamma$の範囲は$\gamma \le 1/2$となります.

判定問題を考える際は入力長$n$は固定されず, 関数$f \colon \binset^*\to \binset$を考えるので以下のように定義します.

{: .definition-title }
> **定義 (判定問題の平均時困難性)**
>
> 関数族$\calA = \\{ A\colon \binset^*\to\binset \\}$を考え, $\gamma\colon \Nat\to[0,1]$を関数とする.
> 判定問題 $f \colon \binset^\* \to \binset$が**$\calA$に対して$\gamma(n)$-困難**であるとは, 十分大きな全ての$n$に対して
> 
> $$
  \begin{align*}
    {}^\forall A\in \calA,\Pr_{x\sim\binset^n} \left[ A(x)=f(x) \right] \le 1-\gamma(n)
  \end{align*}
> $$
>
> を意味する. 引数$n$は常に入力長なので, しばし省略して**$\gamma$-困難**と表す.