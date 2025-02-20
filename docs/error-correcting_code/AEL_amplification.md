---
title: AEL距離増幅
nav_order: 8
parent: 誤り訂正符号
---

# Alon-Edmonds-Luby距離増幅 (AEL距離増幅)

* TOC
{: .no_toc}

誤り訂正符号の文脈ではしばしば, 符号の性質を向上させるために符号を**増幅 (amplification)**するという操作が行われます.
その中でも有名なものの一つが**Alon-Edmonds-Luby距離増幅 (AEL距離増幅)**です.

以下にMary Woottersによる非常に分かりやすい解説動画があるので載せておきます.
<iframe width="560" height="315" src="https://www.youtube.com/embed/uU5Rt0Tg0ik?si=i6_MsLSCgorhVz2r&amp;start=685" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## AEL距離増幅の概要

AEL距離増幅は, レートが高いが誤り訂正能力(=距離)の低い符号に対して作用させて, 高い距離(=誤り訂正能力)を持つ符号を得るための手法です.[^AEL02]
例えばKoppartyら(2017)はこの増幅手法を用いて局所復号可能な符号を初めて構成しました.[^KMRS17]
増幅に必要な道具は以下の二つです:
- レートの高い符号$\calC\subseteq \F_q^n$
- 平衡二部正則[エクスパンダーグラフ]({{site.baseurl}}/docs/tools/expander) $G=(L\cup R,E)$
  - 頂点数は$\abs{L}=\abs{R}=n$, 左右全ての頂点の次数は$d$であり, かつ$G$の正規化された隣接行列の非自明な固有値は絶対値$\lambda$以下であるとします.

[^AEL02]: N. Alon, J. Edmonds, M. Luby. "Linear time erasure codes with nearly optimal recovery." Proceedings of IEEE 36th Annual Foundations of Computer Science, 2002.
[^KMRS17]: Swastik Kopparty, Or Meir, Noga Ron-Zewi, Shubhangi Saraf. "High-rate locally correctable and locally testable codes with sub-polynomial query complexity." Journal of the ACM, 2017.


