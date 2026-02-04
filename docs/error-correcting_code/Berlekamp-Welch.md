---
title: Berlekamp-Welchアルゴリズム
nav_order: 9
parent: 誤り訂正符号
---

# Berlekamp-Welchアルゴリズム

## 概要

Berlekamp-Welchアルゴリズムは、[Reed-Solomon符号]({{site.baseurl}}/docs/error-correcting_code/Reed-Solomon)に対する一意復号アルゴリズムであり、BerlekampとWelchによって提案された。[^BW86]

[^BW86]: E. R. Berlekamp and L. R. Welch. "Error correction of algebraic block codes." US Patent 4,633,470, 1986.

Reed-Solomon符号では、有限体 $\F_q$ 上の長さ $k$ のベクトル $(c_0,c_1,\dots,c_{k-1})\in\F_q^k$ をメッセージとして、
$(k-1)$ 次多項式 $f(x) = c_0 + c_1 x + c_2 x^2 + \cdots + c_{k-1} x^{k-1}$ を構成し、これを有限体の異なる要素 $\alpha_0, \alpha_1, \ldots, \alpha_{n-1}$ で評価した値列 $(f(\alpha_0), f(\alpha_1), \ldots, f(\alpha_{n-1}))$ を符号語として送信する。

受信側はベクトル $r = (r_0, r_1, \ldots, r_{n-1})$ を受け取り、これが元の符号語から最大 $e$ 個の誤りを含んでいると仮定する。すなわち、 $r_i \ne f(\alpha_i)$ を満たす $i$ は高々 $e$ 個である。
Berlekamp-Welchアルゴリズムは、 $e<\frac{n-k+1}{2}$ の場合に、
この受信ベクトルから元のメッセージ多項式 $f(x)$ を復元する方法を提供する。

{: .theorem-title }
> **定理1 (Berlekamp-Welchアルゴリズム).**
>
> $n,k,e\in\Nat$ を、 $k\le n, e< \frac{n-k+1}{2}$ を満たすパラメータとする。有限体 $\F_q$ であって、 $p=\abs{\F_q} \ge n$ を満たすものを考える。このとき、 $\poly(n)$ 時間アルゴリズムであって以下を満たすものが存在する：
> 入力として $n$ 個の点 $(\alpha_i,r_i)$（ $i=0,\dots,n-1$ ）を受け取り（ $\alpha_i$ は有限体 $\F_q$ の異なる要素）、出力は $(k-1)$ 次多項式 $p(x)$ であって
>
>$$
  \begin{align*}
    |\{ i \colon p(\alpha_i) \ne r_i \}| \le e
  \end{align*}
>$$
>
> を満たす。もし条件を満たす多項式 $p$ が存在しない場合、アルゴリズムは $\bot$ を出力する。

符号のレート $k/n$ が十分小さいとき、 $e$ はほぼ $n/2$ に近い値を取ることができ、これは符号長の約半分までの誤りを訂正可能であることを意味する。

---

## アルゴリズムのアイデア

天下り的であるが、多項式

$$
  \begin{align*}
    E(x) = \prod_{i\in [n]\colon p(\alpha_i) \ne r_i} (x - \alpha_i)
  \end{align*}
$$

を考える。もちろん、この段階では $p$ はまだ分かっていないので $E(x)$ もわからない。
また, $p(\alpha_i)\ne r_i$ を満たす $i$ の個数は高々 $e$ なので, $\deg(E) \le e$ です.

さらに, 以下の事実が成り立ちます:


$$
  \begin{align*}
    E(\alpha_i) \cdot r_i = E(\alpha_i) \cdot p(\alpha_i) \quad \text{for } i = 0, 1, \ldots, n-1
  \end{align*}
$$

実際, もし $p(\alpha_i) = r_i$ ならば自明に成り立ち, $p(\alpha_i)\ne r_i$ ならば両辺は$0$になります.

(1)の右辺を表す多項式を $N(x)=E(x)p(x)$ としましょう. このとき, 上の関係式は

$$
  \begin{align*}
    N(\alpha_i) = E(\alpha_i) \cdot r_i \quad \text{for } i = 0, 1, \ldots, n-1 \tag{1}
  \end{align*}
$$

と表せます.
また, 多項式 $N$ の次数は高々 $\deg(E)+\deg(p) \le e + k$ です.
ここで, $E$と$N$の係数を未知数として(1)を連立方程式として解くことを考えます.

- 未知数の個数は高々 $(\deg(E)+1) + (\deg(N)+1) \le 2e + k + 2 \le n$
- 制約の個数は高々 $n$

よって, この連立方程式を解くことによって, 多項式 $E$ と $N$ を見つけることができます (定理の主張を満たす多項式$p$が存在しない場合は, 連立方程式は解を持たないので, $\bot$を出力すればよい).

ガウスの消去法を用いれば, 連立方程式は $O(n^3)$ 時間で解くことができます.

---

## アルゴリズムの詳細

上のアイデアに基づくと以下のアルゴリズムを得ます.

{: .algorithm-title}
> **アルゴリズム1 (Berlekamp-Welchアルゴリズム).**
>
> 1. 多項式 $E(x) = e_0 + e_1 x + \cdots + e_e x^e$ と $N(x) = n_0 + n_1 x + \cdots + n_{e+k} x^{e+k}$ の係数 $e_0, e_1, \ldots, e_e, n_0, n_1, \ldots, n_{e+k}$ を未知数とする.
> 2. $i=0,1,\ldots,n-1$ に対して, 以下の制約を立てる:
>
> $$
  \begin{align*}
    N(\alpha_i) = E(\alpha_i) \cdot r_i
  \end{align*}
> $$
> 
> 3. 連立方程式を解き, もし解が存在しなければ $\bot$ を出力して終了する.
> 4. 多項式 $E(x)$ と $N(x)$ を構成し, $p(x) = \frac{N(x)}{E(x)}$ を計算する.
> 5. $p(x)$ が$(k-1)$次多項式でない場合 (すなわち, $E(x)$ が $N(x)$ を割り切らないまたは$p$の次数が$k-1$以下でない場合) は $\bot$ を出力して終了する.
> 6. $p(x)$を出力して終了する.



