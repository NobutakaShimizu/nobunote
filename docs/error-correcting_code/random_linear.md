---
title: ランダム線形符号
nav_order: 5
parent: 誤り訂正符号
---

# ランダム線形符号

誤り訂正符号の文脈ではランダムに構成した符号がしばし非常に良いパラメータを持つことが知られている.

{: .definition-title }
> **定義 (ランダム線形符号).**
>
> 有限体$\F_q$上の符号長$n$, 次元$k$の部分空間のうち一様ランダムに選ばれたものを**ランダム線形符号**という.

## リスト復号

アルファベットサイズ$q$とレート$r=\frac{k}{n}$を固定して$n\to\infty$におけるランダム線形符号の(組合せ的)リスト復号性能を評価する.
ここで, 符号$\calC\subseteq\F_q^n$が$(R,L)$-リスト復号可能であるとは, 任意の$x\in\F_q^n$に対して$\abs{ \calC \cap \ball(x,R) } \le L$が成り立つことをいう.
有限体$\F_q$を考え, $r\in[0,1]$に対し, $q$進エントロピー関数を

$$
  \begin{align*}
    H_q(R)=R\log_q \frac{1}{R}+(1-R)\log_q\frac{1}{1-R}
  \end{align*}
$$

で定義する. Stirling近似により, $\F_q^n$上の半径$R$の球の体積がおよそ$q^{nH_q(R)}$で与えられる.

{: .proposition-title }
> **命題(list-decoding capacity).**
>
> 有限体$\F_q$を考え, $R\in (0,1-1/q)$と$\varepsilon>0$を任意の定数とする.
>
> 1. レート$1-H_q(R)-\varepsilon$かつ$(R,\lceil 1/\varepsilon\rceil)$-リスト復号可能な符号$\mathcal{C}\subseteq\mathbb{F}^n$が存在する.
>
> 2. レート$1-H_q(R)+\varepsilon$の符号$\mathcal{C}\subseteq\mathbb{F}^n$が$(R,L)$-リスト復号可能であるためには、$L \ge q^{\Omega(\varepsilon n)}$を満たさなければならない.

ポジティブな結果1はランダム線形符号を考えることによって得られる. 2の結果は単純な数え上げによって得られる.
以下にランダム線形符号のリスト復号性能に関する関連研究を述べる.

- Zyablov and Pinsker(1982)は, $q=2$のとき, レート$r=1-H_2(R)-\varepsilon$のランダム線形符号は高確率で$(R,2^{O(1/\varepsilon)})$-リスト復号可能であることを示した.[^ZP82] この結果は一般のアルファベットサイズ$q$に一般化でき, そのときのリストサイズは$q^{O(1/\varepsilon)}$となる.
- Guruswami, Hastad, Sudan, Zuckerman (2002)はランダム線形符号に基づく確率論的手法によって, $q=2$の符号であって, レートが$r=H(R)-\varepsilon$かつ$(r,O(1/\varepsilon))$-リスト復号可能である符号が存在することを示した.[^GHSZ02] 彼らの証明はポテンシャル関数に基づく議論であり, ランダム線形符号そのものが所望の性質を満たすことは示していない (単に存在性のみを示した). また, $q=2$という性質に依拠している.
- Guruswami, Håstad, Kopparty(2011)は, $\F_q$上のレート$1-H_q(R)-\varepsilon$のランダム線形符号は$(R,O_{q,R}(1/\varepsilon))$-リスト復号可能であることを示した.[^GHK11]
- Rudra (2011)は, ランダム線形符号のリストサイズ$\lceil 1/\varepsilon\rceil$が定数枚を除いてタイトであることを示した. すなわち, ある定数$0<c<1$が存在して, レート$1-H_q(R)+\varepsilon$のランダム線形符号は高確率で$(R,c/\varepsilon)$-リスト復号可能**でない**ことを示した.[^Rud11]

---
## 参考文献

[^ZP82]: V. V. Zyablov and M. S. Pinsker, “List cascade decoding,” (in Russian), Probl. Inf. Transm., vol. 17, no. 4, pp. 29–34 (1982).
[^GHSZ02]: V. Guruswami, J. Håstad, M. Sudan, and D. Zuckerman, “Combinatorial bounds for list decoding,” IEEE Transactions on Information Theory, 2002.
[^GHK11]: V. Guruswami, J. Håstad, and S. Kopparty, “On the list-decodability of random linear codes,” IEEE Transactions on Information Theory, 2011.
[^Rud11]: M. Rudra, “Limits to List Decoding of Random Codes,” IEEE Transactions on Information Theory, 2011.

