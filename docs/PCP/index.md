---
layout: default
title: PCP定理
nav_order: 9
---

# PCP定理 (Probabilistically Checkable Proof)

* TOC
{:toc}

## 概要

PCP定理は計算複雑性理論における重要な結果であり, NP完全問題の近似困難性を示す基礎となる定理である. 1992年に Arora, Safra, Lund らによって証明された本定理は, 計算複雑性理論と近似アルゴリズム理論の両分野に革命的な影響を与えた.

## 定理の内容

PCP定理は以下のように述べられる:

{: .theorem-title }
> **定理 (PCP定理).**
>
> $\mathrm{NP} = \mathrm{PCP}(\log n, 1)$

これは, 任意のNP問題の証明が, 対数的なランダムビットと定数個のクエリで検証可能な形式に変換できることを意味する. より具体的には, 任意のNP言語 L に対して, 以下の性質を持つ確率的検証器 V が存在する:

1. 完全性 (Completeness): $x \in L$ ならば, ある証明 $\pi$ が存在し, V は $\pi$ を読んで必ず受理する
2. 健全性 (Soundness): $x \not\in L$ ならば, どのような証明 $\pi$ に対しても, V は $\pi$ を読んで高確率で拒否する
3. 効率性: V は $O(\log n)$ 個のランダムビットを使用し, 証明 $\pi$ の定数個の位置のみを読む

{: .definition }
> **定義 (PCP クラス).**
>
> $\mathrm{PCP}(r(n), q(n))$ は, $r(n)$ 個のランダムビットと $q(n)$ 個のクエリを使用する確率的検証器によって検証可能な言語のクラスである. ここで:
> - $r(n)$: 検証器が使用するランダムビットの数
> - $q(n)$: 検証器が証明から読み取る位置の数

## 応用と重要性

PCP定理の最も重要な応用は, 多くのNP完全問題に対する近似アルゴリズムの限界を示すことである. 特に, MAX-3SAT, 頂点被覆, 独立集合, クリークなどの問題に対して, ある定数以上の精度で近似することがNP困難であることが証明された.

{: .theorem-title }
> **定理 (近似困難性).**
>
> PCP定理の帰結として, 以下の結果が得られる:
> 1. MAX-3SAT問題は, $7/8 + \varepsilon$ の近似率でNP困難である (任意の定数 $\varepsilon > 0$ に対して).
> 2. 頂点被覆問題は, $1.3606...$ より良い近似率でNP困難である.
> 3. 独立集合問題とクリーク問題は, $n^{1-\varepsilon}$ の近似率でNP困難である (任意の定数 $\varepsilon > 0$ に対して).

この結果は, $\mathrm{P} \neq \mathrm{NP}$ という仮定の下で, 効率的に解けない最適化問題の近似限界を明確に示すものであり, 理論計算機科学における最も深遠な成果の一つとして認識されている.

## 参考文献

1. Arora, S., & Safra, S. (1998). Probabilistic checking of proofs: A new characterization of NP. *Journal of the ACM*, 45(1), 70-122.
2. Arora, S., Lund, C., Motwani, R., Sudan, M., & Szegedy, M. (1998). Proof verification and the hardness of approximation problems. *Journal of the ACM*, 45(3), 501-555.
3. Dinur, I. (2007). The PCP theorem by gap amplification. *Journal of the ACM*, 54(3), 12.
