---
title: エクスパンダーグラフ
parent: よく使う道具
nav_order: 4
---

# エクスパンダーグラフ

* TOC
{:toc}


**エクスパンダーグラフ(expander graph)**とは単純ランダムウォークが非常に早く混交するという性質を持ったグラフであり, 理論計算機科学の様々な場面で登場する非常に有用なグラフクラスで,
具体的には
- **誤り訂正符号**: エクスパンダー符号, 量子LDPC符号, Ta-Shma符号
- **計算量理論**: PCP定理のDinur(2006)による証明, 擬似乱数生成器の構成
- **グラフアルゴリズム**: エクスパンダー分解に基づくグラフ最適化問題に対する高速なアルゴリズムの設計
- **暗号分野**: ハッシュ関数の構成

などで活躍します (これらはしばし, 実用的なアルゴリズムの設計というよりも理論的な高速性を追求する方針の研究の論文において登場します).


端的にいえば単純ランダムウォークが非常に早く混交するという性質を**エクスパンダー性**と呼び, この性質を持つグラフをエクスパンダーグラフといいます.

{: .definition}
> グラフ$G=(V,E)$の正規化された隣接行列$P\in[0,1]^{V\times V}$を
> 
> $$
  \begin{align*}
    P(u,v) = \frac{\indicator_{\{u,v\} \in E}}{\deg(u)}
  \end{align*}
> $$
>
> で定める.

グラフ$G$が正則グラフならば$P$は対称行列なので$P$の全ての固有値が実数になることはすぐに分かるのですが, 正則でなくても常に$P$は実固有値を持つことが簡単に示せます.

{: .definition-title }
> **定義(エクスパンダーグラフ).**
>
> グラフ$G=(V,E)$の正規化された隣接行列$P$の固有値を$\lambda_1\ge \lambda_2\ge \dots \ge \lambda_{\abs{V}}$とし, 非自明な固有値を$\lambda(P)=\max \\{\abs{\lambda_2},\abs{\lambda_{\abs{V}}}\\}$で定める.
> パラメータ$\lambda\in[0,1]$に対し, $\lambda(P)\le \lambda$を満たすとき$G$は**$\lambda$-エクスパンダー**であるという.
> また, $\lambda_2\le \lambda$を満たすとき$G$は**片側$\lambda$-エクスパンダー**であるという.

計算量理論での応用を考えるときは, 主に正則な(両側)エクスパンダーグラフを考えます.

## 存在性と構成

エクスパンダー性はランダムウォークがすぐに混ざり合うということを意味し, これを満たすグラフは多くの辺を持つべきである.
例えば完全グラフは非常に強いエクスパンダー性を持つ一方で閉路グラフのエクスパンダー性は乏しい.
では, 疎でありかつエクスパンダー性をもつグラフは存在するだろうか?
また, 陽に構成できるだろうか?

### ランダムな構成
$n$頂点$d$-正則グラフ全体の集合を$\calG_{n,d}$とし、$\calG_{n,d}$から一様ランダムに選ばれたグラフ$G\sim\calG_{n,d}$を考える（$nd$は常に偶数とする）。この確率変数をランダム正則グラフという。ランダム正則グラフは「最適な」エクスパンダーグラフであることがFriedmanによって示されている[^Fre08].

[^Fre08]: J. Friedman. “A Proof of Alon’s Second Eigenvalue Conjecture and Related Problems”. Memoirs of the American Mathematical Society 195 (2008).

{: .theorem-title }
> **定理(Friedmanの定理)**
>
> 任意の$d\ge 3$と任意の$\varepsilon > 0$に対し、
>
> $$
> \lim_{n\to\infty}\Pr\qty[\lambda(P) \ge \frac{2\sqrt{d-1}}{d} + \varepsilon] = 0.
> $$

### Margulisの構成

先の節ではランダムな正則グラフがエクスパンダーになることを見てきたが, 陽に構成できるエクスパンダーグラフも存在する.
定数$\lambda<1$に対し$\lambda$-エクスパンダーの族はMargulis(1973)によって初めて与えられ[^Mar73],
そのスペクトルギャップの陽な値はGabberとGalilにより初めて与えられた[^GG81].

<div id="thm:Margulis_construction" markdown="1">
{: .theorem-title }
> **定理2.2.2(Margulisの構成)**
>
> グラフ族 $(G_m)_{m\in\Nat}$ を以下で定義する:
> 頂点集合 $V_m = \mathbb{Z}_m \times \mathbb{Z}_m$ とし,
>
> $$
  \begin{align*}
      T_1 = \begin{bmatrix}
          1 & 2 \\
          0 & 1
      \end{bmatrix},& &
      T_2 = \begin{bmatrix}
          1 & 0 \\
          2 & 1
      \end{bmatrix},& &
      e_1 = \begin{bmatrix}
          1 \\
          0
      \end{bmatrix}, & &
      e_2 = \begin{bmatrix}
          0 \\
          1
      \end{bmatrix}
  \end{align*}
> $$
>
> とする.
> 各頂点$v=(x,y)\in V_m$を
> 
> $$
> T_1v,\quad T_2v,\quad T_1v+e_1,\quad T_2v+e_2
> $$
> 
> およびこれらの逆変換で与えられる八つの頂点と接続させて得られるグラフを$G_m$とする (多重辺や自己ループも含みうる).
> このとき, 任意の$m\in\Nat$に対して$\lambda(G_m) \le \frac{5\sqrt{2}}{8} < 0.9$.
</div>


### Cayleyグラフ
エクスパンダーグラフを陽に構成する最も重要なアプローチの一つとしてCayleyグラフ[^Cay78]と呼ばれる概念が知られている。

<div id="def:Cayley_graph" markdown="1">
{: .definition-title }
> **定義2.2.3 (Cayleyグラフ)**
>
> $G$を有限群, $A\subseteq G$を$G$の生成系であって単位元を含まず, 逆元で閉じているとする.
> 頂点集合$V=G$, 辺集合$E=\set{\set{g,ag}\colon g\in G,a\in A}$に対し$(V,E)$で与えられるグラフを**Cayleyグラフ (Cayley graph)** といい, $\Cay(A,G)$で表す。
> 頂点$g\in G$に対し, $E_g=\set{\set{g,ag}\colon a\in A}$を$g$を含む辺の集合とする。
</div>

Cayleyグラフは群の幾何学的な性質を調べる幾何学的群論における重要な研究対象の一つである。$A$は単位元を含まないため自己ループは存在しない。また, $A^{-1}=A$より$\set{ag,a^{-1}(ag)}\in E$となるため$\Cay(A,G)$は無向グラフとなっている。同様にCayleyグラフ$\Cay(G,A)$も考えることができるが, 写像$x\mapsto x^{-1}$を考えると$\Cay(A,G)$と$\Cay(G,A)$が同型になっているので本質的には同じである。Cayleyグラフ$\Cay(A,G)$は$\abs{A}$-正則グラフである。

### ラマヌジャングラフ

「最適な」第二固有値を漸近的に達成するグラフをラマヌジャングラフという.

{: .definition-title }
> **定義 (ラマヌジャングラフ)**
>
> $d$-正則グラフ$G=(V,E)$は, 単純ランダムウォークの遷移確率行列$P$の第二固有値$\lambda_2$が$\lambda_2 \le \frac{2\sqrt{d-1}}{d}$を満たすとき, **ラマヌジャングラフ (Ramanujan graph)**という.

$\frac{2\sqrt{d-1}}{d}$という値は任意の$d$に対して最も小さい第二固有値を持つ正則グラフの値であることが知られている. より具体的には, エクスパンダー性の限界を示す以下の定理が知られている:

<div id="thm:Alon Boppana" markdown="1">
{: .theorem-title }
> **定理 (Alon--Boppanaの定理)**
>
> ある定数 $c>0$ が存在し, 任意の $n$ 頂点 $d$ 正則グラフ $G$ 上の単純ランダムウォークの遷移確率行列 $P$ の第二固有値 $\lambda_2$ は
>
> $$
> \lambda_2 \ge \frac{2\sqrt{d-1}}{d}\qty( 1 - \frac{c}{\diam(G)^2})
> $$
>
> を満たす. ここで$\diam(G)$はグラフ$G$の直径を表す.
</div>

任意の$n$頂点$d$正則グラフ$G$の直径は($d\ge 3$を固定して$n\to\infty$の漸近において)$\diam(G)=\Omega(\log n)$となることが知られている.

次数$d$を固定したときに頂点数が増大していくグラフ列$(G_n)_{n\in\Nat}$であって各$G_n$が$d$-正則ラマヌジャングラフとなるものは存在するだろうか? この漸近的に最適な正則エクスパンダーグラフの構成はLubotzkyら[^LPS88]とMargulis[^Mar88]によって独立同時期に初めてその構成が与えられた. 彼らは$d-1$が$4$で割った余りが$1$となる素数であるときに$d$-正則ラマヌジャングラフの列を構成した. なお, 「ラマヌジャングラフ」という名称はLubotzkyらの証明がラマヌジャン予想と呼ばれる予想に依拠しているからである（「予想」と書いたが当時は既に解決している）. その後, Morgenstern[^Mor94]によって次数が素数べき$+1$の形であってもラマヌジャングラフが構成できることが示された.

{: .theorem-title }
> **定理 (ラマヌジャングラフの陽な構成)**
>
> 任意の素数$q$と任意の$k\in\Nat$に対して, 頂点数が発散するある$(q^k+1)$-正則ラマヌジャングラフの列が存在し, 陽に構成できる.

## エクスパンダー混交補題

エクスパンダーグラフには辺が均一に分散しているという性質がある.
具体的には, 任意の二つの頂点部分集合$S,T\subseteq V$に対して$S$と$T$をまたぐ辺の本数を$\abs{S}\abs{T}$で正規化した値は, そのグラフの辺密度$\frac{d}{n}$に近い値を取るということが知られている.
以下の結果はAlonとChungによるものである[^AC88].

[^AC88]: N. Alon and F. R. K. Chung. “Explicit construction of linear sized tolerant networks”. In: Discrete Math. 72.1 (1988), pp. 15–19

<div id="lem:expander_mixing_lemma" markdown="1">
{: .lemma-title }
> **補題2.4.2 (エクスパンダー混交補題)**
>
> グラフ$G=(V,E)$を$d$-正則$\lambda$-エクスパンダーグラフとする.
> 任意の頂点部分集合$S,T\subseteq V$に対して,
> $e(S,T) = \sum_{s\in S,t\in T} \indicator{\{s,t\} \in E}$を$S,T$間の辺の本数($S\cap T$内の辺は2回数える)とすると,
> 
> $$
> \abs{e(S,T) - \frac{d}{n}|S||T|} \le d\lambda\sqrt{|S||T|\qty(1-\frac{|S|}{n})\qty(1-\frac{|T|}{n})}.
> $$
> 
> 同様に, $G$が片側$\lambda$-エクスパンダーならば,
> 
> $$
> e(S,T) - \frac{d}{n}|S||T| \le d\lambda\sqrt{|S||T|\qty(1-\frac{\abs{S}}{n})\qty(1-\frac{\abs{T}}{n})}.
> $$
</div>

## エクスパンダーChernoffバウンド

[Chernoffバウンド]({{site.baseurl}}/docs/tools/prob_inequalities#chernoffbound)は, 独立な確率変数$Z_0,\dots,Z_k$の和$\sum_{i\in[k]}Z_i$の集中性を評価するための不等式です.　エクスパンダーChernoffバウンドとは, $Z_0,\dots,Z_k$としてエクスパンダーグラフ上の単純ランダムウォークによって得られるときの和の集中性を評価します.

正則なエクスパンダー$G=(V,E)$を考え, $(X_0,\dots,X_k) \in V^k$を$G$上の単純ランダムウォークとします.
すなわち, 初期頂点$X_0\sim V$を一様ランダムに選び, 各$X_i$は$X_{i-1}$の隣接頂点の中から一様ランダムに選んで$(X_0,\dots,X_k)$を構成します.
また, 各頂点$u\in V$に$[0,1]$の元を割り当てる関数$f\colon V\to[0,1]$を考えたときの和$S = \sum_{i\in[k]}f(X_i)$の集中性を議論します.

{: .lemma-title }
> **補題(エクスパンダーChernoffバウンド; Theorem 1.1 of Lezaud(1998)[^Lez98]).**
>
> グラフ$G=(V,E)$を正則$\lambda$-エクスパンダーとし, $(X_0,\dots,X_k) \in V^k$を$G$上の単純ランダムウォークとし, $f\colon V\to[0,1]$を関数とする.
> 和$S = \sum_{i\in[k]}f(X_i)$を考え, $\mu =\frac{1}{|V|}\sum_{u\in V}f(u)$とする.
> このとき, 任意の$\delta\in(0,1)$に対して
> 
> $$
  \begin{align*}
    &\Pr\qty[ S \ge k(\mu + \delta) ] \le 3\exp\qty(-\frac{(1-\lambda)\delta^2 k}{12}), \\
    &\Pr\qty[ S \le k(\mu - \delta) ] \le 3\exp\qty(-\frac{(1-\lambda)\delta^2 k}{12}).
  \end{align*}
> $$

{: .remark }
> エクスパンダーChernoffバウンドと呼ばれているが, 実質的にはエクスパンダーHoeffdingバウンドである.

比較的最近の文献ではChung, Lam, Liu, Mitzenmacher (2012)がわかりやすい.[^CLLM12]

---

## 参考文献


[^LPS88]: A. Lubotzky, R. Phillips, and P. Sarnak. “Ramanujan graphs”. Combinatorica 8.3 (1988), pp. 261–277.
[^Mar88]: G. A. Margulis. “Explicit group-theoretic constructions of combinatorial schemes and their applications in the construction of expanders and concentrators”. Problems Inform. Transmission (1988).
[^Mor94]: M. Morgenstern. “Existence and Explicit Constructions of q + 1 Regular Ramanujan Graphs for Every Prime Power q”. In: Journal of Combinatorial Theory Series B 62.1 (1994), pp. 44–62.
[^Cay78]: Cayley. “Desiderata and Suggestions: No. 2. The Theory of Groups: Graphical Representation”. In: Amer. J. Math. 1.2 (1878), pp. 174–176.
[^Mar73]: G. A. Margulis. “Explicit group-theoretic constructions of combinatorial schemes and their applications in the construction of expanders and concentrators”. In: Problems Inform. Transmission (1988)
[^GG81]: O. Gabber and Z. Galil. “Explicit constructions of linear-sized superconcentrators”. In: J. Comput. System Sci. 22.3 (June 1981), pp. 407–420.
[^Gil98]: D. Gillman, A Chernoff Bound for Random Walks on Expander Graphs, SICOMP(1998).
[^Lez98]: P. Lezaud, Chernoff-type bound for finite Markov chains, Ann. Appl. Probab(1998).
[^CLLM12]: K. Chung, H. Lam, Z. Liu, and M. Mitzenmacher, "Chernoff-Hoeffding Bounds for Markov Chains: Generalized and Simplified," STACS2012.
