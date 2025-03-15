---
layout: default
title: DinurのPCP定理証明
nav_order: 1
parent: PCP定理
---

# Dinur(2007)のPCP定理の証明

* TOC
{:toc}

## 1. モデルと定義

{: .definition-title }
> **定義: 確率的検査可能証明 (PCP)**
> 
> **確率的検査可能証明**（Probabilistically Checkable Proof, PCP）とは, NP問題の証明を「ランダムに少数のビットだけ読んで検証できる形式」に変換できることを示す概念である.
> 
> $\mathrm{PCP}(r, q)$は, 次の条件を満たす言語$L$の集合である:
> - $O(r)$個のランダムビットを使用し
> - 証明から$O(q)$ビットだけ読み取り
> - 次の性質を保証する検証器$V$が存在する
>   * $x \in L$の場合, $\Pr[V^{\pi}(x)$が受理$] = 1$となる証明$\pi$が存在する
>   * $x \not\in L$の場合, 任意の証明$\pi$に対して, $\Pr[V^{\pi}(x)$が受理$] \leq \frac{1}{2}$

{: .definition-title }
> **定義: 制約充足問題 (CSP)**
> 
> 変数の集合$V = \{v_1, \ldots, v_n\}$とアルファベット$\Sigma$に対して, $q$項制約$(C, i_1, \ldots, i_q)$は:
> - インデックスの$q$組 $i_1, \ldots, i_q \in [n]$
> - 「受理可能な」値の部分集合 $C \subseteq \Sigma^q$
> から構成される.
> 
> 割り当て $a: V \rightarrow \Sigma$ が $(a(v_{i_1}), a(v_{i_2}), \ldots, a(v_{i_q})) \in C$ を満たすとき, その制約は満たされる.
> 
> **制約充足問題**（CSP）は, 変数の集合$V$に対する制約の集合$C = \{c_1, \ldots, c_n\}$が与えられたとき, すべての制約を満たす割り当てが存在するかどうかを決定する問題である.

{: .definition-title }
> **定義: 制約グラフ**
> 
> $G = \langle(V, E), \Sigma, C\rangle$は次の条件を満たすとき, 制約グラフと呼ばれる:
> 1. $(V, E)$は無向グラフで, $G$の基礎となるグラフである
> 2. 集合$V$は, アルファベット$\Sigma$上の値を取る変数の集合としても見なされる
> 3. 各辺$e \in E$には制約$c(e) \subseteq \Sigma \times \Sigma$が付随し, $C = \{c(e)\}_{e\in E}$ である
> 
> 割り当て$\sigma: V \rightarrow \Sigma$に対して, $\mathrm{UNSAT}_{\sigma}(G)$は割り当て$\sigma$によって満たされない辺の割合を表す:
> 
> $$\mathrm{UNSAT}_{\sigma}(G) = \Pr_{(u,v)\in E}[(\sigma(u), \sigma(v)) \not\in c(e)]$$
> 
> そして, $\mathrm{UNSAT}(G) = \min_{\sigma} \mathrm{UNSAT}_{\sigma}(G)$は$G$の**不満足値**と呼ばれる.

## 2. 主定理

{: .theorem-title }
> **定理 2.1 (PCP定理) [Arora and Safra 1998; Arora et al. 1998]**
> 
> $$\mathrm{NP} \subseteq \mathrm{PCP}(\log n, 1)$$
> 
> この定理は, どんなNP問題も, 証明からわずか**定数個のビット**だけを読むことで確率的に検証できることを示している.

{: .theorem-title }
> **定理 2.2 (PCP定理の近似困難性バージョン)**
> 
> ある整数$q > 1$とアルファベットサイズ$\abs{\Sigma} > 1$が存在し, $\Sigma$上の$q$項制約の集合$C$が与えられたとき, $\mathrm{UNSAT}(C) = 0$か$\mathrm{UNSAT}(C) \geq \frac{1}{2}$かを決定することはNP困難である.
> 
> ここで, $\mathrm{UNSAT}(C)$は, すべての可能な割り当てにおいて満たされない制約の最小の割合を表す.

{: .lemma-title }
> **補題 2.3**
> 
> 定理2.1と定理2.2は同値である.

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">証明</summary>

定理2.1（$\mathrm{NP} \subseteq \mathrm{PCP}(\log n, 1)$）から定理2.2（CSPの近似困難性）への変換は標準的なPCP-to-CSP変換を用いる。

まず、任意のNP問題を3-SATに多項式時間で変換できる。次に、3-SATのインスタンス$\phi$が与えられた時、PCP検証器Vを構築する。Vはランダムビット$O(\log n)$を使用し、証明から$O(1)$ビットを読み取る。

このVから制約充足問題Cを構築できる。変数はVが使用するランダムビットとクエリの全ての可能な組み合わせに対応し、制約はVの受理条件に対応する。

- $\phi$が充足可能ならば、Cも充足可能
- $\phi$が充足不能ならば、任意の割り当てに対して$\Omega(1)$割合の制約が満たされない

これにより、定理2.1から定理2.2が導かれる。

逆に、定理2.2からPCP検証器を構築できる。CSPインスタンスが与えられた時、検証器は:
1. ランダムに制約を選択
2. その制約に関わる変数のみをクエリ
3. 制約が満たされればacceptし、そうでなければreject

この変換により、定理2.2から定理2.1が導かれる。
</details>

## 3. Dinurのアプローチ: ギャップ増幅

Dinurの証明の核心は, **ギャップ増幅**という新しい手法である. これは制約グラフの「不満足値」（UNSAT値）を段階的に増幅していくアプローチである.

{: .theorem-title }
> **定理 3.1 (メイン: ギャップ増幅ステップ)**
> 
> ある$\alpha_0$が存在し, 任意の有限アルファベット$\Sigma$に対して, 定数$C > 0$と$0 < \alpha < 1$が存在して, 制約グラフ$G = \langle(V, E), \Sigma, C\rangle$が与えられたとき, 多項式時間で制約グラフ$G' = \langle(V', E'), \Sigma_0, C'\rangle$を構築でき, 次の性質を満たす:
> 
> - $\mathrm{size}(G') \leq C \cdot \mathrm{size}(G)$
> - （完全性）$\mathrm{UNSAT}(G) = 0$ならば$\mathrm{UNSAT}(G') = 0$
> - （健全性）$\mathrm{UNSAT}(G') \geq \min(2 \cdot \mathrm{UNSAT}(G), \alpha)$

このステップを対数回繰り返すことで, 最終的に定数のギャップを持つ制約グラフが得られ, PCP定理が証明される.

## 4. ギャップ増幅の3つの操作

Dinurのギャップ増幅は, 制約グラフに対する3つの操作から構成されている:

### 4.1 前処理（Preprocessing）

任意の制約グラフを「良い構造」を持つものに変換するステップである.
前処理は以下の3つの主要なステップから構成される:

{: .lemma-title }
> **補題: 前処理変換**
> 
> 制約グラフ$G = \langle(V, E), \Sigma, C\rangle$に対する前処理変換$\mathrm{prep}(G)$は, 以下の3つのステップを順に適用することで得られる:
> 
> 1. **次数の正則化**: $G$を$d$-正則グラフに変換する
> 2. **自己ループの追加**: 各頂点に自己ループを追加する
> 3. **エクスパンダー置換**: グラフの辺をエクスパンダーグラフの辺で置き換える
> 
> これらの変換を順に適用した結果が$\mathrm{prep}(G)$である.

ステップ1: 次数の正則化

{: .lemma-title }
> **補題: 次数正則化変換**
> 
> 制約グラフ$G = \langle(V, E), \Sigma, C\rangle$に対する次数正則化変換$\mathrm{reg}_d(G)$は以下のように定義される:
> 
> 1. 目標次数$d$を選択する（通常は$G$の最大次数$\Delta$以上の値）
> 2. 次数が低い頂点の処理: 各頂点$v \in V$に対して, $\mathrm{deg}(v) < d$ならば, $d - \mathrm{deg}(v)$個の自己ループを$v$に追加する
> 3. 次数が高い頂点の処理: 各頂点$v \in V$に対して, $\mathrm{deg}(v) > d$ならば, 以下の操作を行う:
>    - 頂点$v$を$\lceil\mathrm{deg}(v)/d\rceil$個の頂点$v_1, v_2, \ldots, v_{\lceil\mathrm{deg}(v)/d\rceil}$に分割する
>    - $v$に接続されていた辺を, これらの新しい頂点に均等に分配する
>    - 各$v_i$の次数が$d$未満の場合は, 必要な数の自己ループを追加する
>    - これらの頂点間に「一貫性制約」を追加する: $(v_i, v_j)$に対する制約$c((v_i, v_j)) = \{(a,a) \mid a \in \Sigma\}$
> 4. 各自己ループ$(v,v)$に対する制約は$c((v,v)) = \{(a,a) \mid a \in \Sigma\}$と定義する（つまり, 同じ値を割り当てる場合のみ満たされる）
> 
> 結果として得られるグラフは$d$-正則であり, 元のグラフの不満足値との関係は以下のようになる:
> 
> $$\beta \cdot \mathrm{UNSAT}(G) \leq \mathrm{UNSAT}(\mathrm{reg}_d(G)) \leq \mathrm{UNSAT}(G)$$
> 
> ここで$\beta > 0$は定数である. 特に, 次数を下げる操作を行わない場合（すべての頂点の次数が$d$以下の場合）は:
> 
> $$\mathrm{UNSAT}(\mathrm{reg}_d(G)) = \frac{\abs{E}}{\abs{E} + \sum_{v \in V}(d - \mathrm{deg}(v))} \cdot \mathrm{UNSAT}(G)$$
> 
> が成り立つ.


<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">正則化の性質の証明</summary>

**次数が低い頂点の場合**:
$G$の任意の割り当て$\sigma$は, $\mathrm{reg}_d(G)$の割り当てとしても使用できる. 追加された自己ループは全て満たされるため, 次数が低い頂点のみを考慮した場合の$\mathrm{reg}_d(G)$における$\sigma$の不満足値は:

$$\mathrm{UNSAT}_{\sigma}(\mathrm{reg}_d(G)) = \frac{\abs{E_{\mathrm{bad}}(\sigma)}}{\abs{E} + \sum_{v \in V}(d - \mathrm{deg}(v))} = \frac{\abs{E}}{\abs{E} + \sum_{v \in V}(d - \mathrm{deg}(v))} \cdot \mathrm{UNSAT}_{\sigma}(G)$$

**次数が高い頂点の場合**:
頂点$v$が複数の頂点$v_1, v_2, \ldots, v_k$に分割される場合, $G$の割り当て$\sigma$から$\mathrm{reg}_d(G)$の割り当て$\sigma'$を構築するには, すべての$i$に対して$\sigma'(v_i) = \sigma(v)$とする. 一貫性制約により, 最適な割り当てでは常にすべての$v_i$に同じ値が割り当てられる.

元のグラフ$G$で満たされない辺は, $\mathrm{reg}_d(G)$でも少なくとも1つの辺として表現され, 満たされない. したがって, $\mathrm{UNSAT}(\mathrm{reg}_d(G)) \leq \mathrm{UNSAT}(G)$が成り立つ.

逆に, $G$で満たされない辺の割合が$\epsilon$の場合, $\mathrm{reg}_d(G)$でも少なくとも$\beta \cdot \epsilon$の割合の辺が満たされない. ここで$\beta$は頂点分割と辺の再分配の方法に依存する定数である. したがって, $\mathrm{UNSAT}(\mathrm{reg}_d(G)) \geq \beta \cdot \mathrm{UNSAT}(G)$が成り立つ.
</details>

{: .lemma-title }
> **補題: 正則化の計算複雑性**
> 
> 任意の制約グラフ$G$に対する次数正則化変換$\mathrm{reg}_d(G)$は, $O(\abs{V} + \abs{E})$時間で計算可能である.

ステップ2: 自己ループの追加

{: .lemma-title }
> **補題: 自己ループ追加変換**
> 
> $d$-正則制約グラフ$G = \langle(V, E), \Sigma, C\rangle$に対する自己ループ追加変換$\mathrm{loop}(G)$は以下のように定義される:
> 
> 1. 各頂点$v \in V$に対して, $d$個の自己ループを追加する
> 2. 各自己ループ$(v,v)$に対する制約は$c((v,v)) = \{(a,a) \mid a \in \Sigma\}$と定義する
> 
> 結果として得られるグラフは$2d$-正則であり, 不満足値は以下のように変化する:
> 
> $$\mathrm{UNSAT}(\mathrm{loop}(G)) = \frac{1}{2} \cdot \mathrm{UNSAT}(G)$$
> 
> これは$\mathrm{UNSAT}(\mathrm{loop}(G)) \leq \mathrm{UNSAT}(G)$を意味する.


<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">自己ループ追加の性質の証明</summary>

$G$の任意の割り当て$\sigma$は, $\mathrm{loop}(G)$の割り当てとしても使用できる. 追加された自己ループは全て満たされるため, $\mathrm{loop}(G)$における$\sigma$の不満足値は:

$$\mathrm{UNSAT}_{\sigma}(\mathrm{loop}(G)) = \frac{\abs{E_{\mathrm{bad}}(\sigma)}}{\abs{E} + d\abs{V}} = \frac{\abs{E}}{\abs{E} + d\abs{V}} \cdot \mathrm{UNSAT}_{\sigma}(G)$$

$d$-正則グラフでは $\abs{E} = \frac{d\abs{V}}{2}$ なので, $$\mathrm{UNSAT}_{\sigma}(\mathrm{loop}(G)) = \frac{1}{2} \cdot \mathrm{UNSAT}_{\sigma}(G)$$ となる.

</details>

ステップ3: エクスパンダー置換

{: .lemma-title }
> **補題: エクスパンダー置換変換**
> 
> $d$-正則制約グラフ$G = \langle(V, E), \Sigma, C\rangle$と$d$-正則エクスパンダーグラフ$H = (V, E_H)$（$\lambda(H) \leq \lambda < d$）に対するエクスパンダー置換変換$\mathrm{expand}_H(G)$は以下のように定義される:
> 
> 1. $G$の各辺$(u,v) \in E$を, $H$における$u$と$v$を結ぶ辺（存在する場合）で置き換える
> 2. 置き換えられた辺は元の制約を保持する
> 3. $H$に存在するが$G$には存在しない辺$(u,v) \in E_H \setminus E$に対しては, 恒等的に満たされる制約$c((u,v)) = \Sigma \times \Sigma$を割り当てる
> 
> 結果として得られるグラフ$\mathrm{expand}_H(G)$は$d$-正則であり, $\lambda(\mathrm{expand}_H(G)) \leq \lambda$を満たす. さらに, 不満足値に関して以下が成り立つ:
> 
> $$\beta \cdot \mathrm{UNSAT}(G) \leq \mathrm{UNSAT}(\mathrm{expand}_H(G)) \leq \mathrm{UNSAT}(G)$$
> 
> ここで$\beta > 0$は$H$のエクスパンダー性に依存する定数である.


<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">エクスパンダー置換の性質の証明</summary>

$G$の任意の割り当て$\sigma$は, $\mathrm{expand}_H(G)$の割り当てとしても使用できる. $E_H \setminus E$の辺は全て満たされるため, $\mathrm{expand}_H(G)$における$\sigma$の不満足値は:

$$\mathrm{UNSAT}_{\sigma}(\mathrm{expand}_H(G)) = \frac{\abs{E_{\mathrm{bad}}(\sigma) \cap E_H}}{\abs{E_H}} \leq \frac{\abs{E_{\mathrm{bad}}(\sigma)}}{\abs{E}} = \mathrm{UNSAT}_{\sigma}(G)$$

下界については, エクスパンダー混交補題を用いて, $E_{\mathrm{bad}}(\sigma)$の辺が$E_H$にも存在する確率が十分に高いことを示すことができる. 具体的には, $\beta > 0$が存在して:

$$\abs{E_{\mathrm{bad}}(\sigma) \cap E_H} \geq \beta \cdot \abs{E_{\mathrm{bad}}(\sigma)}$$

が成り立つ. これにより, 

$$\mathrm{UNSAT}_{\sigma}(\mathrm{expand}_H(G)) \geq \beta \cdot \mathrm{UNSAT}_{\sigma}(G)$$

が導かれる.

</details>

{: .lemma-title }
> **補題: エクスパンダー置換の構成可能性**
> 
> 任意の$n$頂点$d$正則グラフに対して, $\lambda(H) \leq \lambda < d$を満たす明示的な$d$正則エクスパンダーグラフ$H$を多項式時間で構成することができる. 具体的には, ランプ関数に基づく構成や, ジグザグ積に基づく構成が知られている.

3つのステップを組み合わせることで, 前処理変換$\mathrm{prep}(G) = \mathrm{expand}_H(\mathrm{loop}(\mathrm{reg}_d(G)))$は以下の性質を持つ:

{: .theorem-title }
> **定理: 前処理の効果**
> 
> 任意の制約グラフ$G$に対して, $\mathrm{prep}(G)$は以下の性質を満たす:
> 
> 1. $\mathrm{prep}(G)$は$2d$-正則グラフであり, 各頂点は$d$個の自己ループを持つ
> 2. $\lambda(\mathrm{prep}(G)) \leq \lambda < 2d$
> 3. $\mathrm{size}(\mathrm{prep}(G)) = O(\mathrm{size}(G))$
> 4. $\beta_1 \cdot \mathrm{UNSAT}(G) \leq \mathrm{UNSAT}(\mathrm{prep}(G)) \leq \mathrm{UNSAT}(G)$（$\beta_1 = \beta/2 > 0$）
> 
> これらの性質により, $\mathrm{prep}(G)$はグラフべき乗操作に適した「良い構造」を持つグラフとなる.

### 4.2 グラフべき乗（Graph Powering）

グラフべき乗は, 制約グラフの不満足値を増幅する新しい操作である.

{: .definition-title }
> **定義: グラフべき乗**
> 
> $d$正則制約グラフ$G = \langle(V, E), \Sigma, C\rangle$と$t \in \mathbb{N}$に対して, $t$次グラフべき乗$G^t = \langle(V, E^t), \Sigma^{d^t}, C^t\rangle$を次のように定義する:
> 
> 1. **頂点集合**: $V(G^t) = V(G)$
> 
> 2. **辺集合**: $E^t$は次のように定義される多重辺集合である:
>    - 頂点$u, v \in V$に対して, $u$から$v$への$G$における長さ$t$の経路が$k$本あるとき, $G^t$において$u$と$v$の間に$k$本の辺が存在する
>    - 形式的には, $E^t = \{(u, v, i) \mid u, v \in V, i \in [1, k_{u,v}]\}$ここで$k_{u,v}$は$u$から$v$への長さ$t$の経路の数
> 
> 3. **アルファベット**: $\Sigma(G^t) = \Sigma^{d^t}$
>    - $G^t$の各頂点$v$への割り当ては, $v$から距離$t$以内の全頂点への「意見」を表す
>    - 形式的には, 割り当て$A: V \rightarrow \Sigma^{d^t}$において, $A(v)$は$v$から距離$t$以内の各頂点$w$に対する値$A(v)[w] \in \Sigma$を指定する
> 
> 4. **制約**: 辺$e = (u, v, i) \in E^t$に対する制約$c^t(e)$は次のように定義される:
>    - $e$に対応する$G$における長さ$t$の経路を$p = (w_0=u, w_1, \ldots, w_t=v)$とする
>    - $A(u)$と$A(v)$が$p$上の全ての辺の制約を満たすとき, かつそのときに限り$c^t(e)$は満たされる
>    - 形式的には, $c^t(e) = \{(a_u, a_v) \in \Sigma^{d^t} \times \Sigma^{d^t} \mid \forall j \in [0, t-1]: (a_u[w_j], a_v[w_{j+1}]) \in c((w_j, w_{j+1}))\}$
> 
> この構成により, $G^t$の次数は$d^t$となり, $G$が$\lambda$の第二固有値を持つ場合, $G^t$の第二固有値は$\lambda^t$以下となる.

グラフべき乗の利点は, UNSAT値を$\sqrt{t}$倍に増幅しながら, グラフのサイズを線形にしか増加させないことである.

{: .lemma-title }
> **補題: グラフべき乗の固有値性質**
> 
> $G^t$の次数は$d^t$であり, $G$が$d$正則で$\lambda(G) \leq \lambda$ならば, $\lambda(G^t) \leq \lambda^t$である.

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">グラフべき乗の固有値性質の証明</summary>

$G$の隣接行列を$A$とすると, $G^t$の隣接行列は$A^t$である. $A$の固有値が$d = \lambda_1 \geq \lambda_2 \geq \cdots \geq \lambda_n$であるとき, $A^t$の固有値は$d^t = \lambda_1^t \geq \lambda_2^t \geq \cdots \geq \lambda_n^t$となる. したがって, $\lambda(G) = \max\{\abs{\lambda_2}, \abs{\lambda_n}\} \leq \lambda$ならば, $\lambda(G^t) = \max\{\abs{\lambda_2^t}, \abs{\lambda_n^t}\} \leq \lambda^t$である.
</details>

{: .remark-title }
> **定理: エクスパンダー混交補題の精密版**
> 
> $G = (V, E)$を$d$正則グラフとし, $\lambda(G) \leq \lambda$とする. 任意の頂点集合$S, T \subseteq V$に対して,
> 
> $$\abs{\left( \frac{e(S, T)}{\abs{E}} - \frac{\abs{S}\abs{T}}{\abs{V}^2} \right)} \leq \frac{\lambda}{d} \sqrt{\frac{\abs{S}\abs{T}}{\abs{V}^2}}$$
> 
> が成り立つ. ここで, $e(S, T)$は$S$と$T$の間の辺の数である.
> 
> この定理は, ランダムウォークがグラフ上で急速に混交することを保証し, 増幅補題の証明において不満足辺を含む経路の数を下から評価するために使用される.

### 4.3 アルファベット削減（Alphabet Reduction by Composition）

グラフべき乗によって増加したアルファベットサイズを削減するための操作である. この操作は, PCPの構築において重要な役割を果たし, 多くの研究がなされてきた.

{: .lemma-title }
> **補題 4.3 (合成補題)**
> 
> 定数の拒否確率$\varepsilon > 0$とアルファベット$\Sigma_0$（$\abs{\Sigma_0} = O(1)$）を持つ割り当てテスター$P$が存在すると仮定する. $P$にのみ依存する定数$\beta_3 > 0$が存在し, 任意の制約グラフ$G = \langle(V, E), \Sigma, C\rangle$に対して, 線形時間で制約グラフ$G' = G \circ P$を計算でき, $\mathrm{size}(G') = c(P, \abs{\Sigma}) \cdot \mathrm{size}(G)$かつ
> 
> $$\beta_3 \cdot \mathrm{UNSAT}(G) \leq \mathrm{UNSAT}(G') \leq \mathrm{UNSAT}(G)$$
> 
> を満たす.

## 5. 組み合わせ増幅ステップ

これら3つの操作を組み合わせることで, ギャップ増幅ステップが完成する:

1. 制約グラフ$G_i$を前処理する
2. 結果を$t$乗する
3. 結果を割り当てテスター$P$と合成する

つまり, $G_{i+1} = (\mathrm{prep}(G_i))^t \circ P$ となる.

{: .proposition }
> **命題: ギャップ増幅の全体像**
>
> 1. 初期の制約グラフ$G_0$を用意する
> 2. $i = 0, 1, 2, \ldots, \log \abs{G_0}$に対して:
>    - $G_{i+1} = (\mathrm{prep}(G_i))^t \circ P$を計算する
> 3. 最終的に得られる$G_{\log \abs{G_0}}$は定数のギャップを持つ

このステップを$\log \abs{G}$回繰り返すことで, PCP定理が証明される.

{: .theorem-title }
> **定理: ギャップ増幅の収束**
> 
> 適切なパラメータ$t$と割り当てテスター$P$を選ぶことで, ギャップ増幅ステップを$O(\log \abs{G})$回適用すると, 最終的に得られるグラフ$G'$は以下の性質を満たす:
> 
> - $\mathrm{size}(G') = \mathrm{poly}(\abs{G})$
> - $G$が充足可能ならば$G'$も充足可能
> - $G$が充足不能ならば$\mathrm{UNSAT}(G') \geq \alpha$（$\alpha > 0$は定数）
> 
> これにより, PCP定理が証明される.

## 6. 結論と応用

Dinurの証明は, PCP定理に対する新しい組合せ論的アプローチを提供した. この手法は:

1. **短いPCPと局所的にテスト可能な符号**（Locally Testable Codes, LTCs）の構築
2. **割り当てテスター**（Assignment Testers）への拡張

など, 多くの応用を持っている.

{: .theorem-title }
> **研究成果の要約**
> 
> Dinurの証明により, 長さが$n \cdot \mathrm{poly} \log n$で, 定数個のクエリで確率的に検証できるPCPとLTCの構築が可能になった. 具体的には:
> 
> $$\mathrm{SAT} \in \mathrm{PCP}_{1/2,1}(\log^2(n \cdot \mathrm{poly} \log n), O(1))$$
> 
> この結果は, その組合せ論的な性質と直感的な理解のしやすさから, PCP理論の教育と研究に大きな影響を与えた.

## 参考文献

1. I. Dinur, "The PCP theorem by gap amplification," Journal of the ACM, vol. 54, no. 3, article 12, 2007.

2. S. Arora and S. Safra, "Probabilistic Checking of Proofs: A New Characterization of NP," Journal of the ACM, vol. 45, no. 1, pp. 70-122, 1998.

3. S. Arora, C. Lund, R. Motwani, M. Sudan, and M. Szegedy, "Proof verification and the hardness of approximation problems," Journal of the ACM, vol. 45, no. 3, pp. 501-555, 1998.

4. V. Guruswami, J. Håstad, M. Sudan, and D. Zuckerman, "Alphabet Reduction for Low-Error PCPs with Constant Soundness," SIAM Journal on Computing, vol. 49, no. 5, pp. 1021-1061, 2020.

5. I. Dinur and P. Harsha, "Composition of Low-Error 2-Query PCPs using Decodable PCPs," SIAM Journal on Computing, vol. 42, no. 6, pp. 2452-2486, 2013.
