---
title: 最悪時から平均時への帰着
nav_order: 8
---

# 最悪時から平均時への帰着

ある問題を平均時の意味で解くアルゴリズムを使って, 別の問題を最悪時の意味で解くアルゴリズムを設計する手法を総称して**最悪時から平均時への帰着(worst-case to average-case reduction)**と呼びます.
平均時計算量の究極的なゴールの一つは$\mathsf{P}\ne\mathsf{NP}$という最悪時困難性の仮定から, クラス$\mathsf{NP}$に属する平均時困難な関数を設計することです.
また, 最悪時から平均時への帰着が成り立つ問題は, ランダムな入力上ですら解くのが難しい問題ですので, 実用的な困難性の論拠にもなりえます.

このページでは, 具体的ないくつかの問題に対する最悪時から平均時への帰着を解説します.