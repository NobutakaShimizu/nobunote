---
title: エクスパンダーグラフ
parent: よく使う道具
nav_order: 4
---

# エクスパンダーグラフ

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

## エクスパンダー混交補題

## エクスパンダーChernoffバウンド

[Chernoffバウンド]({{site.baseurl}}/docs/tools/prob_inequalities#chernoffbound)は, 独立な確率変数$Z_0,\dots,Z_k$の和$\sum_{i\in[k]}Z_i$の集中性を評価するための不等式です.　エクスパンダーChernoffバウンドとは, $Z_0,\dots,Z_k$としてエクスパンダーグラフ上の単純ランダムウォークによって得られるときの和の集中性を評価します.

正則なエクスパンダー$G=(V,E)$を考え, $(X_0,\dots,X_k) \in V^k$を$G$上の単純ランダムウォークとします.
すなわち, 初期頂点$X_0\sim V$を一様ランダムに選び, 各$X_i$は$X_{i-1}$の隣接頂点の中から一様ランダムに選んで$(X_0,\dots,X_k)$を構成します.
また, 各頂点$u\in V$に$[0,1]$の元を割り当てる関数$f\colon V\to[0,1]$を考えたときの和$S = \sum_{i\in[k]}f(X_i)$の集中性を議論します.

{: .lemma-title }
> **補題(エクスパンダーChernoffバウンド) [[Theorem 1.1, Lez98]](#文献note).**
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

### 文献Note
- [[Gil98]](https://epubs.siam.org/doi/10.1137/S0097539794268765) D. Gillman, A Chernoff Bound for Random Walks on Expander Graphs, SICOMP(1998).
  > エクスパンダーChernoffバウンドの初出としてよく引用される(会議版は1993年). 一般の辺重みつきグラフ(正則とは限らない)に対しても成り立つバウンドを与えている. 考えている関数は$\binset$値関数 (Theorem2.1).
- [[Lez98]](https://projecteuclid.org/journals/annals-of-applied-probability/volume-8/issue-3/Chernoff-type-bound-for-finite-Markov-chains/10.1214/aoap/1028903453.full) P. Lezaud, Chernoff-type bound for finite Markov chains, Ann. Appl. Probab(1998).
  > [Gil98]と同様に可逆なマルコフ連鎖によって生成された和に対するBernstein-typeバウンドを与えている (Theorem1.1). すなわち, 関数$f$の分散$\Var_{\pi}[f]$が小さいときはよりsharpになる. 特に[Gil98]を特殊ケースとして含む.
- [[RR17]](https://arxiv.org/abs/1703.10205)
- [[CLLM12]](https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.STACS.2012.124)
  > スペクトルギャップの代わりにmixing timeを使ったエクスパンダーChernoffバウンドを与えている. [full version(arXiv)](https://arxiv.org/abs/1201.0559)では問題設定の定義が丁寧に説明されているので読みやすい.


## エクスパンダー分解