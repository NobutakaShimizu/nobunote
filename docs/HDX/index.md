---
layout: default
title: 高次元エクスパンダー
nav_order: 12
---

# 高次元エクスパンダー

**高次元エクスパンダー** (high-dimensional expander, HDX) は通常のグラフエクスパンダーの概念を高次元に拡張したものである. この拡張には複数の定義があるが, 本稿では特に「局所的な」および「大域的な」エクスパンダー性を取り上げる.

高次元エクスパンダーは, 近年, 計算量理論 (PCPや直積テスト), 課題最適化, トポロジカルデータ解析, 量子情報理論, 量子計算などの分野で応用されている.

高次元エクスパンダーとはグラフのエクスパンダー性を単体複体に拡張した概念である. 単体複体上では, 大域的なランダムウォークと局所的なランダムウォークの二つのタイプのランダムウォークを自然に考えることができ, これらに基づいてそれぞれ大域的なエクスパンダー性と局所的なエクスパンダー性の概念が定義できる.

端的に述べると高次元エクスパンダーの理論はこれら二つの概念がほぼ等価であることを明らかにしており, これは単体複体における局所大域原理を体現しているといえる.

## 単体複体の定義

{: .definition-title }
> **定義 (単体複体)**
>
> 有限集合 $V$ と $V$ の部分集合族 $\mathcal{F} \subseteq 2^V$ であって部分集合で閉じているもの (すなわち, $\sigma \subseteq \tau \in \mathcal{F} \Rightarrow \sigma \in \mathcal{F}$) の組 $X = (V, \mathcal{F})$ を単体複体 (simplicial complex) という.

- 集合族 $\mathcal{F}$ の元を面 (face) と呼び, 面 $\sigma \in \mathcal{F}$ の次元 (dimension) を $\dim \sigma = \abs{\sigma} - 1$ とする. 特に, 空集合 $\emptyset \in \mathcal{F}$ の次元は $-1$ である.
- 単体複体 $X$ の次元を $\dim X = \max\{\dim \sigma : \sigma \in \mathcal{F}\}$ とする.
- 次元 $d$ の単体複体 $X$ は (包含関係に関して) 極大な面の次元が全て $d$ に等しいとき, 純粋 (pure) であるという.
- 整数 $-1 \leq k \leq \dim X$ に対し $X(k) = \{\sigma \in \mathcal{F}: \dim \sigma = k\}$ とする.
- 純粋な $d$ 次元単体複体 $X$ に, $d$ 次元の面全体 $X(d)$ 上の何らかの分布 $\pi \in [0,1]^{X(d)}$ が付随している場合, $X$ を重み付き単体複体 (weighted simplicial complex) と呼ぶ.

以後, 単体複体といった場合, 暗に重み付き単体複体を考え, 最大次の面の重みを $\pi$ で表す.

### 単体複体の例

{: .example-title }
> **例1**
>
> グラフ $G = (V, E)$ に対し, 空集合, $V$, $E$ からなる部分集合族 $\mathcal{F} = \{\emptyset\} \cup \{\{v\}: v \in V\} \cup E$ を考えると, $(V, \mathcal{F})$ は単体複体である.

{: .example-title }
> **例2**
>
> 有限集合 $V$ に対し,
> $$\mathcal{F} = \binom{V}{\leq k} \coloneqq \{\sigma \subseteq V : \abs{\sigma} \leq k\}$$
> としたとき, $(V, \mathcal{F})$ は純粋な $(k-1)$ 次元の単体複体である.

{: .example-title }
> **例3**
>
> グラフ $G = (V, E)$ に対し, 森である部分グラフの辺集合からなる集合族
> $$\mathcal{F} = \{F \subseteq E : \text{部分グラフ } (V, F) \text{ は森}\}$$
> に対して $(E, \mathcal{F})$ は単体複体である. $G$ を連結グラフとすると, $(E, \mathcal{F})$ の極大面は $G$ の全域木に対応し, その次元は $n-2$ に等しい.

{: .example-title }
> **例4**
>
> ベクトル $\vec{a_1}, \dots, \vec{a_n} \in \mathbb{R}^m$ を考える. 集合 $V = \{1, \dots, n\}$ の部分集合族であって, 線形独立な行ベクトル集合のインデックスとなるものの全体を
> $$\mathcal{F} = \{I \subseteq V : (\vec{a_i})_{i \in I} \text{ は線形独立}\}$$
> とすると, $(V, \mathcal{F})$ は純粋な単体複体である.

{: .example-title }
> **例5**
>
> 二部グラフ $G = (V, E)$ のマッチング全体からなる辺部分集合族 $\mathcal{F} \subseteq 2^E$ に対し, $(E, \mathcal{F})$ は単体複体である. 一般に極大マッチングのサイズは異なる場合があるのでこの単体複体は純粋ではない.

{: .example-title }
> **例6**
>
> グラフ $G = (V, E)$ の全てのクリークからなる頂点集合族を $\mathcal{F}$ とすると, $(V, \mathcal{F})$ は単体複体である. これをグラフのクリーク複体 (clique complex) と呼ぶ.

## リンクとスケルトン

{: .definition-title }
> **定義 (リンクとスケルトン)**
>
> 単体複体 $X = (V, \mathcal{F})$ を考える.
> - 面 $\sigma \in \mathcal{F}$ の**リンク (link)** とは単体複体 $$(V \setminus \sigma, \mathcal{F}_{\sigma})$$ であって集合族 $\mathcal{F}_{\sigma}$ が
>
> $$\mathcal{F}_{\sigma} = \{\tau \setminus \sigma : \sigma \subseteq \tau \in \mathcal{F}\}$$
>
> で与えられるものである. 特に, 頂点 $v \in X(0)$ のリンクは $X_{\{v\}}$ の代わりに $X_{v}$ で表す.
>
> - 次元 $k$ 以下の面の集合
> $$\mathcal{F}_{k} = \{\sigma \in \mathcal{F} : \dim \sigma \leq k\}$$
> に対し $(V, \mathcal{F}_{k})$ を **$k$-スケルトン ($k$-skelton)** という.

面 $\sigma$ のリンクとは, $\sigma$ を「縮約」して得られる単体複体であり, 面 $\sigma$ の周りの局所的な構造を表している.

## 単体複体上のランダムウォーク

単体複体上のランダムウォークは異なる次元の面の間で遷移するものを考える. 具体的には, ある次元 $i$ の面から次元 $i+1$ の面に遷移する上昇ウォークと, 逆に次元 $i+1$ の面から次元 $i$ の面に遷移する下降ウォークである.

### 下降ウォークと定常分布

{: .definition-title }
> **定義 (下降ウォークと面上の定常分布)**
>
> $\pi$ で重み付けられた純粋な $d$ 次単体複体 $X = (V, \mathcal{F})$ を考える. 各 $i = 0, \dots, d$ に対し確率行列 $P^{\downarrow}_i \in [0,1]^{X(i) \times X(i-1)}$ を
>
> $$P^{\downarrow}_i(\tau, \sigma) = \begin{cases}
> \frac{1}{i+1} & \text{if } \sigma \subseteq \tau,\\
> 0 & \text{otherwise}
> \end{cases}$$
>
> とし, $X(i)$ 上の分布 $\pi_i \in [0,1]^{X(i)}$ を
> - $i = d$ のとき, $\pi_d = \pi$ とする.
> - $i < d$ に対しては帰納的に $\pi_i = \pi_{i+1}P^{\downarrow}_{i+1}$ とする.
>
> 各 $i$ に対し分布 $\pi_i$ を $X(i)$ 上の ($i$ 次の) **定常分布** と呼ぶ.

面 $\tau \in X(i+1)$ に対して $P^{\downarrow}_{i+1}(\tau, \cdot)$ で定まる $X(i)$ 上の分布は, 面 $\tau$ に含まれる頂点 $u$ を一様ランダムに選んだときの $\sigma = \tau \setminus \{u\}$ の分布と等しい.

### 上昇ウォーク

{: .definition-title }
> **定義 (上昇ウォーク)**
>
> 純粋な $d$ 次単体複体 $X = (V, \mathcal{F})$ を考える. 各 $i = -1, \dots, d-1$ に対し確率行列 $P^{\uparrow}_i \in [0,1]^{X(i) \times X(i+1)}$ を
>
> $$P^{\uparrow}_i(\sigma, \tau) = \frac{\pi_{i+1}(\tau)}{\pi_i(\sigma)}P^{\downarrow}_{i+1}(\tau, \sigma) = \begin{cases}
> \frac{\pi_{i+1}(\tau)}{(i+2)\pi_i(\sigma)} & \text{if } \sigma \subseteq \tau,\\
> 0 & \text{otherwise}
> \end{cases}$$
>
> で定める.

二つの面集合 $X(i)$ と $X(i+1)$ を部集合とする二部グラフを考えればわかりやすい. それぞれの部集合には $\pi_i, \pi_{i+1}$ が定常分布として付随しており, 上昇ウォーク $$P^{\uparrow}_i$$ と下降ウォーク $$P^{\downarrow}_{i+1}$$ は詳細釣り合い条件

$$\forall \sigma \in X(i), \tau \in X(i+1), \pi_i(\sigma)P^{\uparrow}_i(\sigma, \tau) = \pi_{i+1}(\tau)P^{\downarrow}_{i+1}(\tau, \sigma)$$

を満たしている.

### 上昇下降ウォークと下降上昇ウォーク

{: .definition-title }
> **定義 (上昇下降と下降上昇ウォーク)**
>
> 上昇ウォークと下降ウォークを組み合わせることによって面 $X(i)$ 上の二種類のランダムウォークを定義する:
>
> $$P^{\triangle}_i \coloneqq P^{\uparrow}_i P^{\downarrow}_{i+1}$$
> $$P^{\bigtriangledown}_i \coloneqq P^{\downarrow}_i P^{\uparrow}_{i-1}$$
>
> を遷移確率行列として持つ $X(i)$ 上のランダムウォークをそれぞれ **上昇下降ウォーク (up-down walk)**, **下降上昇ウォーク (down-up walk)** と呼ぶ.

{: .lemma-title }
> **補題 (定常分布)**
>
> 面 $X(i)$ 上の上昇下降ウォークと下降上昇ウォークはどちらも $\pi_i$ を定常分布としてもつ.

## 大域エクスパンダー性

{: .definition-title }
> **定義 (大域エクスパンダー性)**
>
> 純粋な $d$ 次元単体複体 $X = (V, \mathcal{F})$ は, 任意の $0 \leq i \leq d$ に対して $X(i)$ 上の下降上昇ウォーク $P^{\bigtriangledown}_i$ が $\lambda_2(P^{\bigtriangledown}_i) \leq \lambda_i$ を満たすとき, **大域 $(\lambda_0, \dots, \lambda_d)$-エクスパンダー (global $(\lambda_0, \dots, \lambda_d)$-expander)** であるという.

## 局所エクスパンダー性

### 局所的なランダムウォーク

{: .definition-title }
> **定義 (局所ランダムウォーク)**
>
> 純粋な $d$ 次元単体複体 $X = (V, \mathcal{F})$ を考える. 次元 $i \leq d-2$ の面 $\sigma \in \mathcal{F}$ に対し, リンク $X_\sigma$ の $1$-スケルトンを $G_\sigma = (V_\sigma, E_\sigma)$ とする. このグラフの辺重み $w_\sigma: E_\sigma \to [0,1]$ を
>
> $$w_\sigma(e) = \pi_{i+2}(\sigma \cup e)$$
>
> で定め, これによって定まる $V_\sigma$ 上の重み付きランダムウォークを面 $\sigma$ に関する **局所ランダムウォーク (local random walk)** と呼び, 遷移確率行列を $P_\sigma \in [0,1]^{V_\sigma \times V_\sigma}$ とする.

### 局所エクスパンダー

{: .definition-title }
> **定義 (局所エクスパンダー性)**
>
> 純粋な $d$ 次元単体複体 $X = (V, \mathcal{F})$ を考える. 任意の $i = -1, 0, \dots, d-2$ と任意の面 $\sigma \in X(i)$ に対し $\lambda_2(P_\sigma) \leq \gamma_i$ を満たすとき, **局所 $(\gamma_{-1}, \dots, \gamma_{d-2})$-エクスパンダー (local spectral $(\gamma_{-1}, \dots, \gamma_{d-2})$-expander)** であるという. 特に, $\gamma_{-1} = \dots = \gamma_{d-2} = \gamma$ であるとき, 局所 $\gamma$-エクスパンダーであるという.

## 単体複体の局所大域原理

単体複体における局所大域原理, すなわち, 局所エクスパンダー性は大域エクスパンダー性を導くという結果は比較的最近, Kaufman--Oppenheim によって証明された.

{: .theorem-title }
> **定理 (Kaufman--Oppenheimの定理)**
>
> 純粋な $d$-次元単体複体 $X = (V, \mathcal{F})$ が局所 $\gamma$-エクスパンダーならば,
>
> $$\lambda_i = 1 - \frac{1}{i+1} + \frac{\gamma i}{2}$$
>
> で定義された $\lambda_i$ ($i = 0, \dots, d$) に対して $X$ は大域 $(\lambda_0, \dots, \lambda_d)$-エクスパンダーである.

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">証明</summary>

証明は帰納法で行う. 各 $i = 0, \dots, d$ に対して, $X(i)$ 上の下降上昇ウォーク $P^{\bigtriangledown}_i$ の第二固有値が $\lambda_i$ 以下であることを示す.

**基本ケース**: $i = 0$ のとき, $X(0)$ 上の下降上昇ウォーク $$P^{\bigtriangledown}_0 = P^{\downarrow}_0 P^{\uparrow}_{-1}$$ を考える. $$P^{\downarrow}_0$$ は $X(0)$ から $X(-1) = \{\emptyset\}$ への写像であり, $P^{\uparrow}_{-1}$ は $X(-1)$ から $X(0)$ への写像である. $X(-1)$ は一点集合なので, $P^{\bigtriangledown}_0$ は $X(0)$ 上の一様分布への射影に対応する. したがって, $P^{\bigtriangledown}_0$ の第二固有値は $\lambda_2(P^{\bigtriangledown}_0) = 0 \leq \lambda_0 = 1 - 1 + 0 = 0$ となる.

**帰納ステップ**: $0 < i \leq d$ とし, $i-1$ までの場合が成り立つと仮定する. $X(i)$ 上の下降上昇ウォーク $P^{\bigtriangledown}_i = P^{\downarrow}_i P^{\uparrow}_{i-1}$ の第二固有値を評価する.

まず, $P^{\bigtriangledown}_i$ の第二固有値は, $P^{\uparrow}_{i-1} P^{\downarrow}_i$ の第二固有値に等しいことに注意する. これは, 行列 $AB$ と $BA$ の非零固有値が一致するという線形代数の基本的な性質による.

次に, $P^{\uparrow}_{i-1} P^{\downarrow}_i$ の第二固有値を評価するために, 次の分解を考える:

$$P^{\uparrow}_{i-1} P^{\downarrow}_i = \frac{1}{i+1} \sum_{v \in V} P^{\uparrow}_{i-1} P^{\downarrow}_{i,v}$$

ここで, $P^{\downarrow}_{i,v}$ は面 $\tau \in X(i)$ から $\tau \setminus \{v\} \in X(i-1)$ への確率 $1$ の遷移を表す (ただし $v \in \tau$ の場合のみ).

この分解を用いると, $P^{\uparrow}_{i-1} P^{\downarrow}_i$ の第二固有値は次のように上から抑えられる:

$$\lambda_2(P^{\uparrow}_{i-1} P^{\downarrow}_i) \leq 1 - \frac{1}{i+1} + \frac{1}{i+1} \max_{v \in V} \lambda_2(P^{\uparrow}_{i-1} P^{\downarrow}_{i,v})$$

ここで, 各 $v \in V$ に対して, $P^{\uparrow}_{i-1} P^{\downarrow}_{i,v}$ は頂点 $v$ のリンク $X_{v}$ 上の下降上昇ウォークに関連している. 局所 $\gamma$-エクスパンダーの仮定と帰納仮定を用いると,

$$\lambda_2(P^{\uparrow}_{i-1} P^{\downarrow}_{i,v}) \leq 1 - \frac{1}{i} + \frac{\gamma (i-1)}{2} = 1 - \frac{1}{i} + \frac{\gamma i - \gamma}{2}$$

したがって,

$$\lambda_2(P^{\bigtriangledown}_i) = \lambda_2(P^{\uparrow}_{i-1} P^{\downarrow}_i) \leq 1 - \frac{1}{i+1} + \frac{1}{i+1} \left(1 - \frac{1}{i} + \frac{\gamma i - \gamma}{2}\right)$$

これを整理すると,

$$\lambda_2(P^{\bigtriangledown}_i) \leq 1 - \frac{1}{i+1} + \frac{\gamma i}{2} = \lambda_i$$

となり, 証明が完了する.
</details>

### Oppenheimのトリクルダウン定理

局所エクスパンダー性を確認するための非常に強力な定理としてOppenheimのトリクルダウン定理がある.

{: .theorem-title }
> **定理 (Oppenheimのトリクルダウン定理)**
>
> 純粋な重み付き $d$-次元単体複体 $X = (V, \mathcal{F})$ が以下の二つを満たすとする:
> - 全ての $i \leq d-2$ と全ての $\sigma \in X(i)$ に対してグラフ $G_{\sigma}$ は連結.
> - 全ての $(d-2)$-次元の面 $\tau \in X(d-2)$ に対して $\lambda_2(P_{\tau}) \leq \gamma$.
>
> このとき, $\gamma_i \coloneqq \frac{\gamma}{1-(d-2-i)\gamma}$ ($i = -1, \dots, d-2$) に対して $X$ は局所 $(\gamma_{-1}, \dots, \gamma_{d-2})$-エクスパンダーである.

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">証明</summary>

証明は $i$ に関する降順の帰納法で行う. すなわち, $i = d-2$ から始めて $i = -1$ まで降りていく.

**基底ケース**: $i = d-2$ のとき, 仮定より全ての $\tau \in X(d-2)$ に対して $\lambda_2(P_{\tau}) \leq \gamma = \gamma_{d-2}$ が成り立つ.

**帰納ステップ**: $-1 \leq i < d-2$ とし, $i+1, \dots, d-2$ の場合が成り立つと仮定する. 任意の面 $\sigma \in X(i)$ に対して, $\lambda_2(P_{\sigma}) \leq \gamma_i$ を示す.

$\sigma \in X(i)$ を固定する. リンク $X_{\sigma}$ の $1$-スケルトン $G_{\sigma} = (V_{\sigma}, E_{\sigma})$ 上のランダムウォーク $P_{\sigma}$ の第二固有値を評価する. 仮定より $G_{\sigma}$ は連結である.

$G_{\sigma}$ の頂点集合 $V_{\sigma}$ の任意の頂点 $v \in V_{\sigma}$ に対して, $\sigma \cup \{v\} \in X(i+1)$ である. $\sigma \cup \{v\}$ のリンク $X_{\sigma \cup \{v\}}$ の $1$-スケルトンを $G_{\sigma \cup \{v\}}$ とする. 帰納仮定より, $\lambda_2(P_{\sigma \cup \{v\}}) \leq \gamma_{i+1}$ である.

ここで, $G_{\sigma}$ 上のランダムウォーク $P_{\sigma}$ と $G_{\sigma \cup \{v\}}$ 上のランダムウォーク $P_{\sigma \cup \{v\}}$ の関係を考える. $G_{\sigma \cup \{v\}}$ の頂点集合は $V_{\sigma} \setminus \{v\}$ であり, $G_{\sigma \cup \{v\}}$ の辺集合は $\{(u, w) \in E_{\sigma} : u, w \neq v\}$ である.

$G_{\sigma}$ 上のランダムウォーク $P_{\sigma}$ を, 頂点 $v$ を経由するパスと経由しないパスに分解する:

$$P_{\sigma} = (1-\alpha) Q + \alpha R$$

ここで, $Q$ は $v$ を経由しないパスのみを考慮したランダムウォーク, $R$ は $v$ を経由するパスのみを考慘したランダムウォーク, $\alpha$ は $v$ を経由する確率である.

$Q$ は $G_{\sigma \cup \{v\}}$ 上のランダムウォーク $P_{\sigma \cup \{v\}}$ と密接に関連しており, $\lambda_2(Q) \leq \lambda_2(P_{\sigma \cup \{v\}}) \leq \gamma_{i+1}$ が成り立つ.

$R$ は $v$ を経由するランダムウォークであり, その第二固有値は $0$ である (なぜなら, $v$ を経由するパスは全て $v$ で一度「リセット」されるため).

行列の摂動理論を用いると, $P_{\sigma}$ の第二固有値は次のように上から抑えられる:

$$\lambda_2(P_{\sigma}) \leq (1-\alpha) \lambda_2(Q) + \alpha \lambda_2(R) \leq (1-\alpha) \gamma_{i+1}$$

ここで, $\alpha$ の値は $G_{\sigma}$ の構造に依存するが, 一般に $\alpha \geq \frac{1}{d-i}$ が成り立つことが示せる. したがって,

$$\lambda_2(P_{\sigma}) \leq \left(1-\frac{1}{d-i}\right) \gamma_{i+1} = \left(1-\frac{1}{d-i}\right) \frac{\gamma}{1-(d-2-(i+1))\gamma} = \frac{\gamma}{1-(d-2-i)\gamma} = \gamma_i$$

となり, 証明が完了する.
</details>

端的に言えば, 次数 $d-2$ の面 $\sigma \in X(d-2)$ に対して $\lambda(P_{\sigma})$ を抑えれば全ての次元の面に対しても第二固有値が上から抑えられるという結果である.

## マトロイド

マトロイド (matroid) は「行列 (matrix) のようなもの (-oid)」という名を冠するが, ベクトルの線型独立性を拡張した独立性の概念として Whitney によって定義された.

### マトロイドの定義

{: .definition-title }
> **定義 (マトロイド)**
>
> 次の性質を持つ単体複体 $(V, \mathcal{F})$ をマトロイド (matroid) という: 任意の $\sigma, \tau \in \mathcal{F}$ に対し, $\abs{\sigma} < \abs{\tau}$ ならば, ある $u \in \tau \setminus \sigma$ が存在して $\sigma \cup \{u\} \in \mathcal{F}$.
>
> マトロイド $(V, \mathcal{F})$ の面 $\sigma \in \mathcal{F}$ を特に独立集合 (independent set) という.

{: .definition-title }
> **定義 (基)**
>
> マトロイドの (包含関係に関して) 極大な独立集合を基 (basis) といい, 基全体の集合を $\mathcal{B}$ で表す. 特に断りのない限り, 基上の定常分布は一様分布とする.

マトロイドは純粋な単体複体である. 実際, もし $\abs{B} < \abs{B'}$ なる二つの基 $B, B' \in \mathcal{B}$ が存在するならば, マトロイドの定義より, ある $u \in B' \setminus B$ が存在して $B \cup \{u\} \in \mathcal{F}$ とできるが, これは $B$ の極大性に矛盾する.

### マトロイドの例

{: .example-title }
> **例1. 一様マトロイド**
>
> 有限集合 $V$ に対し,
> $$\mathcal{F} = \binom{V}{\leq k} \coloneqq \{\sigma \subseteq V : \abs{\sigma} \leq k\}$$
> で定まる単体複体 $(V, \mathcal{F})$ は一様マトロイド (uniform matroid) と呼ばれるマトロイドである.

{: .example-title }
> **例2. グラフ的マトロイド**
>
> グラフ $G = (V, E)$ に対し, 森である部分グラフの辺集合からなる集合族
> $$\mathcal{F} = \{F \subseteq E : \text{部分グラフ } (V, F) \text{ は森}\}$$
> で定まる単体複体 $(E, \mathcal{F})$ はマトロイドである. これはグラフ的マトロイド (graphic matroid) と呼ばれる.

{: .example-title }
> **例3. 線形マトロイド**
>
> ベクトル $\vec{a_1}, \dots, \vec{a_n} \in \mathbb{R}^m$ を考える. 集合 $V = \{1, \dots, n\}$ の部分集合族であって, 線形独立な行ベクトル集合のインデックスとなるものの全体を
> $$\mathcal{F} = \{I \subseteq V : (\vec{a_i})_{i \in I} \text{ は線形独立}\}$$
> とすると, $(V, \mathcal{F})$ は線形マトロイド (linear matroid) と呼ばれるマトロイドである.

{: .example-title }
> **例4. 分割マトロイド**
>
> 有限集合 $V$ の分割 $V = W_1 \sqcup \dots \sqcup W_k$ と非負整数 $d_1, \dots, d_k \geq 0$ を固定する. 部分集合族 $\mathcal{F}$ を
> $$F \in \mathcal{F} \iff \forall i \in \{1, \dots, k\}, \abs{W \cap W_i} \leq d_i$$
> で定義したとき, $(V, \mathcal{F})$ は分割マトロイド (partition matroid) と呼ばれるマトロイドである.

### 基交換ウォーク

{: .definition-title }
> **定義 (基交換ウォーク)**
>
> マトロイド $(V, \mathcal{F})$ の基上の下降上昇ウォークを基交換ウォーク (basis-exchange walk) という.

$X(d-1)$ から $X(d)$ への上昇ウォークを考えると, 基 $B$ から出発する基交換ウォークは, 一様ランダムに元 $u \sim B$ を選び, $B \setminus u$ を含む基の中から一様ランダムな基 $B' \in \mathcal{B}$ に遷移するランダムウォークであり, その定常分布は一様分布である.

基交換ウォークの混交時間のバウンドは長年の未解決問題であった.

{: .conjecture-title }
> **予想 (Mihail--Vazirani予想)**
>
> 任意のマトロイド $M = (V, \mathcal{F})$ 上の基交換ウォークの混交時間は $\abs{V}$ に関する多項式で上から抑えられる. すなわち, $M$ に依存しないある定数 $c > 0$ が存在して
> $$t_{\mathrm{mix}}(1/2) \leq \abs{V}^c.$$

### マトロイドの局所エクスパンダー性

{: .lemma-title }
> **補題**
>
> 任意のマトロイド $(V, \mathcal{F})$ は局所 $0$-エクスパンダーである.

この補題を証明するために, マトロイドの独立集合 $\sigma \in X(d-2)$ を任意に固定し, リンク $X_{\sigma}$ の $1$-スケルトン $G_{\sigma}$ を考える. 基 $\mathcal{B}$ 上の定常分布は一様分布なので, $\sigma$ に関する局所ランダムウォークは $G_{\sigma}$ 上の単純ランダムウォークとなる.

$G_{\sigma}$ の頂点集合 $V_{\sigma}$ は
$$V_{\sigma} = \{v \in V \setminus \sigma : \sigma \cup \{v\} \in \mathcal{F}\}$$
であり, 辺集合 $E_{\sigma} \subseteq \binom{V_{\sigma}}{2}$ は,
$$E_{\sigma} = \{\{u, v\} : \sigma \cup \{u, v\} \in \mathcal{F}\}$$
となる.

マトロイドの性質から, 以下の命題が成り立つ:
$$\{u, v\}, \{v, w\} \not\in E_{\sigma} \Rightarrow \{u, w\} \not\in E_{\sigma}$$

これは $G_{\sigma}$ の補グラフの全ての連結成分はクリークであることを意味する. この性質を用いて, $\lambda_2(P_{\sigma}) \leq 0$ が示される.

### Anari, Liu, Gharan, Vinzantの定理

{: .theorem-title }
> **定理 (Anari-Liu-Gharan-Vinzantの定理)**
>
> 任意のマトロイドは,
> $$\lambda_i = 1 - \frac{1}{i+1}$$
> に対して大域 $(\lambda_0, \dots, \lambda_d)$-エクスパンダーである.

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">証明</summary>

前述の補題より, 任意のマトロイド $(V, \mathcal{F})$ は局所 $0$-エクスパンダーである. すなわち, 任意の $i = -1, 0, \dots, d-2$ と任意の面 $\sigma \in X(i)$ に対して $\lambda_2(P_{\sigma}) \leq 0$ が成り立つ.

Kaufman-Oppenheimの定理を適用すると, マトロイドは
$$\lambda_i = 1 - \frac{1}{i+1} + \frac{0 \cdot i}{2} = 1 - \frac{1}{i+1}$$
に対して大域 $(\lambda_0, \dots, \lambda_d)$-エクスパンダーである.

より詳細な証明では, マトロイドの特殊な構造を利用して, 直接的に下降上昇ウォーク $P^{\bigtriangledown}_i$ の第二固有値を評価することもできる. 特に, マトロイドの基交換公理を用いると, 下降上昇ウォークの遷移確率行列の構造が明らかになり, その固有値を直接計算することができる.

具体的には, マトロイド $(V, \mathcal{F})$ の基全体 $\mathcal{B}$ 上の下降上昇ウォーク $P^{\bigtriangledown}_d$ を考える. 基 $B \in \mathcal{B}$ から出発し, 一様ランダムに元 $e \in B$ を選び, $B \setminus \{e\}$ を含む基の中から一様ランダムに次の基 $B'$ を選ぶ.

マトロイドの基交換公理により, 任意の二つの基 $B, B' \in \mathcal{B}$ に対して, $B \setminus B'$ の各元 $e$ に対して, ある $f \in B' \setminus B$ が存在して $B \setminus \{e\} \cup \{f\} \in \mathcal{B}$ となる. この性質を用いると, 下降上昇ウォークの連結性と混合時間を解析することができる.

最終的に, 下降上昇ウォーク $P^{\bigtriangledown}_i$ の第二固有値が $\lambda_i = 1 - \frac{1}{i+1}$ 以下であることが示される.
</details>

{: .corollary-title }
> **系 (マトロイド上のランダムウォークの混交時間)**
>
> 次元 $d$ の任意のマトロイド $(V, \mathcal{F})$ 上の基交換ウォークの混交時間は
> $$t_{\mathrm{mix}}(\varepsilon) = (d+1)\abs{V}\log\left(\frac{1}{\varepsilon}\right).$$
> 特に, Mihail--Vazirani予想は真である. 

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">証明</summary>

Anari-Liu-Gharan-Vinzantの定理より, マトロイド $(V, \mathcal{F})$ 上の基交換ウォーク $P^{\bigtriangledown}_d$ の第二固有値は $\lambda_d = 1 - \frac{1}{d+1}$ 以下である.

ランダムウォークの混交時間は, 第二固有値を用いて次のように上から抑えられることが知られている:

$$t_{\mathrm{mix}}(\varepsilon) \leq \frac{1}{1-\lambda_2} \log\left(\frac{1}{\varepsilon \pi_{\min}}\right)$$

ここで, $\pi_{\min}$ は定常分布の最小値である. マトロイドの基交換ウォークの定常分布は一様分布であり, $\pi_{\min} = \frac{1}{\abs{\mathcal{B}}} \geq \frac{1}{2^{\abs{V}}}$ である.

したがって,

$$t_{\mathrm{mix}}(\varepsilon) \leq \frac{1}{1-(1-\frac{1}{d+1})} \log\left(\frac{1}{\varepsilon} \cdot 2^{\abs{V}}\right) = (d+1) \log\left(\frac{2^{\abs{V}}}{\varepsilon}\right) = (d+1)(\abs{V}\log 2 + \log\frac{1}{\varepsilon})$$

$\log 2 < 1$ より, 最終的に

$$t_{\mathrm{mix}}(\varepsilon) \leq (d+1)\abs{V}\log\left(\frac{1}{\varepsilon}\right)$$

を得る. これは $\abs{V}$ に関する多項式であり, Mihail--Vazirani予想が成り立つことを示している.
</details>

## 参考文献

1. Tali Kaufman and David Mass. High dimensional random walks and colorful expansion. In 8th Innovations in Theoretical Computer Science Conference (ITCS 2017), volume 67 of Leibniz International Proceedings in Informatics (LIPIcs), pages 4:1–4:27, Dagstuhl, Germany, 2017. Schloss Dagstuhl–Leibniz-Zentrum fuer Informatik.

2. Tali Kaufman and Izhar Oppenheim. High order random walks: Beyond spectral gap. Combinatorica, 40:245–281, 2020.

3. Izhar Oppenheim. Local spectral expansion approach to high dimensional expanders part I: Descent of spectral gaps. Discrete & Computational Geometry, 59(2):293–330, 2018.

4. Nima Anari, Kuikui Liu, Shayan Oveis Gharan, and Cynthia Vinzant. Log-concave polynomials II: high-dimensional walks and an FPRAS for counting bases of a matroid. In Proceedings of the 51st Annual ACM SIGACT Symposium on Theory of Computing, pages 1–12, 2019.

5. Nima Anari, Kuikui Liu, Shayan Oveis Gharan, and Cynthia Vinzant. Log-concave polynomials iv: exchange properties, tight mixing times, and faster sampling of spanning trees. Preprint, arXiv:2004.07220, 2020.

6. Abel Jansma. A lower bound on the spectral gap of the down-up walk on a Junta/DNF function complex, 2021. arXiv:2109.15228.

7. Marcel Ribó Mor. The twisted matroid: A combinatorial approach to multiple-set awareness, 2022. arXiv:2201.11337.

8. Yuval Peled and Einat Peled. Deducing the Johnson graph: A duality between balls and links in complexes. Israel Journal of Mathematics, 249(2):601–635, 2022.

9. Gábor Damásdi, Tamas Héger, and Tamas Szőnyi. The Kneser graph of blocking sets of projective planes is connected. Journal of Combinatorial Designs, 30(2):81–86, 2022.

10. Marc Harkonen, Lionel Levine, and Jiang Zeng. Explicit sign-reversing involutions for Dodgson's condensation identity. Preprint, arXiv:2205.04339, 2022.

11. Clara Shikhelman. Coset weight enumerators and the MacWilliams identity. In 2022 IEEE International Symposium on Information Theory (ISIT), pages 448–453. IEEE, 2022.

12. Jun Chen, Fernando Granha Jeronimo, Dylan Quintana, Ming-Ching Shih, and Madhur Tulsiani. Improved direct sum testing and q-direct sum testing. In Proceedings of the 37th Computational Complexity Conference, pages 7:1–7:22, 2022.

13. Zongchen Chen, Themis Gouleakis, John Peebles, and Eric Price. Nearly optimal distinct elements and heavy hitters on sliding windows. Preprint, arXiv:2101.07156, 2021.

14. Fernando Granha Jeronimo, Tushant Mittal, Dylan Quintana, Jonathan Skowronek, and Madhur Tulsiani. Testing agreement with non-signaling adversaries. In 14th Innovations in Theoretical Computer Science Conference, volume 249 of Leibniz International Proceedings in Informatics (LIPIcs), pages 66:1–66:23, 2023.

15. Jonathan Mosheiff, Nicolas Resch, Noga Ron-Zewi, Shashwat Silas, and Mary Wootters. LDPC codes achieve list decoding capacity. SIAM Journal on Computing, (0):FOCS18-159, 2022.

16. Ori Parzanchevski, Ron Rosenthal, and Ron J Tessler. Isoperimetric inequalities in simplicial complexes. Combinatorica, 36(2):195–227, 2016.
