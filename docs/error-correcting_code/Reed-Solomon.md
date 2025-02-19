---
title: Reed-Solomon符号
nav_order: 4
parent: 誤り訂正符号
---
# Reed-Solomon符号

* TOC
{:toc}

Reed-Solomon符号はアルファベットサイズが大きいものの, 高い誤り訂正能力を持つ符号であり, 地上波デジタル放送, QRコードなど, 実用においても非常に重要なものです. 

## 定義と基本的な性質

有限体$\F_q$上の関数$f\colon \F_q\to\F_q$は, ある自然数$k\in\Nat$と$c_0,\dots,c_{k-1}\in \F_q$に対して

$$
  \begin{align*}
    f(x) = c_0 + c_1 x + \cdots + c_{k-1} x^{k-1}
  \end{align*}
$$

と表せるとき, $f$は次数$k$**未満**の多項式であるといいます ($c_{k-1}=0$も許容しています). 

{: .definition-title }
> **定義（Reed-Solomon符号).**
>
> 有限体$\F_q$上の次数$k$未満の多項式の全体を$\calP_{<k}$とします. このとき, $m$個の異なる元$\alpha_1,\ldots,\alpha_m\in \F_q$に対して, 
>
> $$
  \begin{align*}
    \calC = \set{ (f(\alpha_1),\ldots,f(\alpha_m)) \colon f\in \calP_{< k} } \subseteq \F_q^m
  \end{align*}
> $$
>
> を**Reed-Solomon符号**といいます. 特に断りがない場合は, $\F_q=\set{\alpha_1,\dots,\alpha_m}$とします (特に$q=m$). 

ここで, 点$\alpha_1,\dots,\alpha_m \in \F_q$を**評価点**といいます. Reed-Solomon符号の符号化は次数$k$未満の多項式に対し, その係数を並べた長さ$k$のベクトルを, 評価点における評価値を並べた長さ$m$のベクトルに移す写像であるため, アルファベットサイズ$q$, 符号長$m$, レート$r=k/m$です. 

任意の多項式$f\in \calP_{<k}$は根($f(x)=0$を満たす$x$)の個数が高々$k$個であるため, 二つの相異なる多項式$f,g\in \calP_{\le d}$に対して, $f(x)=g(x)$を満たす$x$の個数もまた高々$k$個です. 従って, 一様ランダムな点$x\sim\F_q$に対して確率$1-k/m$で$f(x)\ne g(x)$を満たすため, Reed-Solomon符号の距離は$1-k/m$です. 

一般にReed-Solomon符号では符号長$m$を大きくしていくにつれて考えるアルファベットサイズ$q\ge m$も大きくなるため, 符号長を大きくしていくときの漸近的なオーダーを議論する際はそのアルファベットサイズも$m$の増加に伴って大きくなっていくことに注意すべきです. また, 次数のパラメータ$k$をアルファベットサイズ$q$に比例するようにとることによってレート$r=k/m$を一定に保つことができます. 従って$k$もまた$m$の増加に伴って大きくなっていくことを考えることが多いです. 

理論的な応用ではアルファベットサイズを定数にしたい場合が多々あり, そのような状況ではReed-Solomon符号を直接使うことはできません. よくある手法としては, Reed-Solomon符号と他の符号との連節(concatenation)を考えることによってアルファベットサイズを減少させる方法があります. その際, 連節によって誤り訂正能力やレートといったパラメータも変化するので注意が必要です. 

## 一意復号 (Berlekamp-Welchアルゴリズム)

Reed-Solomon符号の一意復号では, 与えられたベクトル$y\in \F_q^m$に対して, $\delta(y,z) < 1/2$を満たす$z\in \calC$を求める問題を考えます. より詳細には, レートを$r=k/m$としたとき, [Singleton限界]({{site.baseurl}}/docs/error-correcting_code/code_bounds#Singleton限界)より, $\delta(y,z)\le \frac{1-r}{2}$を満たす$z\in \calC$を求めたいです. 

## リスト復号

半径$R$のリスト復号では, 与えられたベクトル$y\in \F_q^m$に対して, $\dist(y,z)\le R$を満たす$z\in \calC$を列挙する問題を考えます. すなわち, $y$を中心とした半径$R$のボール内に存在する符号語を列挙する問題を考えます. 通常, $R$は, 一意復号の限界$\frac{1-r}{2}$よりも大きく, 符号の距離$1-k/m = 1-r$より小さい値を考えます. 多くの場合, 列挙すべき符号語の個数は$\varepsilon$のみに依存する定数, もしくは符号長$m$に関して多項式であることが保証されます. 

任意の定数$\varepsilon>0$に対してReed-Solomon符号は半径$1-r-\varepsilon$のリスト復号が可能かどうかは非常に重要な未解決問題であり, そもそも列挙の対象$\ball(y,R)\cap \calC$の個数の上界を求めることすら非常に難しい問題として知られています. 近年の研究によって, アルファベットサイズ$q$を十分大きくとり, 評価点$\alpha_1,\dots,\alpha_m\sim\F_q$をランダムに選ぶと高確率で半径$1-r-\varepsilon$のボールに含まれる符号語の個数が$O(1/\varepsilon)$であることが示されています[^AGL23]. しかし, そのような場合においてもリストを効率的に列挙するアルゴリズムは知られていません. 

[^AGL23]: O. Alrabiah, V. Guruswami, and R. Li, "Randomly Punctured Reed–Solomon Codes Achieve List-Decoding Capacity over Linear-Sized Fields," in Symposium on Theory of Computing, 2024.

[Johnson限界]({{site.baseurl}}/docs/error-correcting_code/code_bounds#Johnson限界)により, Reed-Solomon符号のリスト復号は$R<1-\sqrt{r}$の時は組合せ論的には可能であることがわかっており, 実際にこの範囲の$R$に対し多項式時間でReed-Solomon符号をリスト復号できることが知られています. Sudan(1997)は$R<1-\sqrt{2r}$のときに多項式時間でリスト復号するアルゴリズムを与え[^Sud97], GuruswamiとSudan(1999)は$R<1-\sqrt{r}$のときに多項式時間でリスト復号するアルゴリズムを与えています[^GS99]. なお, Alekhnovich(2005)により, この領域の$R$のリスト復号はほぼ線形時間で可能であることが示されています[^Ale05]. 

[^Sud97]: M. Sudan, "Decoding of Reed-Solomon Codes Beyond the Error-Correction Bound," Journal of Complexity, 1997.
[^GS99]: V. Guruswami and M. Sudan, "Improved Decoding of Reed-Solomon and Algebraic-Geometry Codes," IEEE Trans. Inform. Theory, 1999.
[^Ale05]: D. Alekhnovich, "Linear Diophantine Equations Over Polynomials and Soft Decoding of Reed–Solomon Codes," in IEEE Trans. Inf. Theory, 2005.

なお, Reed-Solomon符号を少し変形した**folded Reed-Solomon符号**は半径$R<1-r$のリスト復号が多項式時間で可能であることが知られています[^GR08]. すなわちfolded Reed-Solomon符号はJohnson限界より良いリスト復号性能を持つ符号です. 

[^GR08]: V. Guruswami and M. Rudra, "Explicit codes achieving list decoding capacity: Error-correction with optimal redundancy". IEEE Trans. Inform. Theory, 2008.
