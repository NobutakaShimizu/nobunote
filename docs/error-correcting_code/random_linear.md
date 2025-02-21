---
title: ランダム線形符号
nav_order: 9
parent: 誤り訂正符号
---

# ランダム線形符号

* TOC
{:toc}

誤り訂正符号の文脈ではランダムに構成した符号がしばし非常に良いパラメータを持つことが知られています. 

{: .definition-title }
> **定義 (ランダム線形符号)**
>
> 有限体$\F_q$上の符号長$n$, 次元$k$の部分空間のうち一様ランダムに選ばれたものを**ランダム線形符号**といいます. 

## リスト復号

アルファベットサイズ$q$とレート$r=\frac{k}{n}$を固定して$n\to\infty$におけるランダム線形符号の(組合せ的)リスト復号性能を評価します. 
ここで, 符号$\calC\subseteq\F_q^n$が$(R,L)$-リスト復号可能であるとは, 任意の$x\in\F_q^n$に対して$\abs{ \calC \cap \ball(x,R) } \le L$が成り立つことをいいます. 
有限体$\F_q$を考え, $r\in[0,1]$に対し, $q$進エントロピー関数を

$$
  \begin{align*}
    H_q(R)=R\log_q \frac{1}{R}+(1-R)\log_q\frac{1}{1-R}
  \end{align*}
$$

で定義します. Stirling近似により, $\F_q^n$上の半径$R$の球の体積がおよそ$q^{nH_q(R)}$で与えられます. 

以下にランダム線形符号のリスト復号性能に関する関連研究を述べます. 

- Zyablov and Pinsker(1982)は, $q=2$のとき, レート$r=1-H_2(R)-\varepsilon$のランダム線形符号は高確率で$(R,2^{O(1/\varepsilon)})$-リスト復号可能であることを示しました[^ZP82]. この結果は一般のアルファベットサイズ$q$に一般化でき, そのときのリストサイズは$q^{O(1/\varepsilon)}$となります. 
- Guruswami, Hastad, Sudan, Zuckerman (2002)はランダム線形符号に基づく確率論的手法によって, $q=2$の符号であって, レートが$r=H(R)-\varepsilon$かつ$(r,O(1/\varepsilon))$-リスト復号可能である符号が存在することを示しました[^GHSZ02]. 彼らの証明はポテンシャル関数に基づく議論であり, ランダム線形符号そのものが所望の性質を満たすことは示していません（単に存在性のみを示しました）. また, $q=2$という性質に依拠しています. 
- Guruswami, Håstad, Kopparty(2011)は, $\F_q$上のレート$1-H_q(R)-\varepsilon$のランダム線形符号は$(R,O_{q,R}(1/\varepsilon))$-リスト復号可能であることを示しました[^GHK11]. 
- Rudra (2011)は, ランダム線形符号のリストサイズ$\lceil 1/\varepsilon\rceil$が定数枚を除いてタイトであることを示しました. すなわち, ある定数$0<c<1$が存在して, レート$1-H_q(R)+\varepsilon$のランダム線形符号は高確率で$(R,c/\varepsilon)$-リスト復号可能**でない**ことを示しました[^Rud11]. 

---
## 参考文献

[^ZP82]: V. V. Zyablov and M. S. Pinsker, “List cascade decoding,” (in Russian), Probl. Inf. Transm., vol. 17, no. 4, pp. 29–34 (1982).
[^GHSZ02]: V. Guruswami, J. Håstad, M. Sudan, and D. Zuckerman, “Combinatorial bounds for list decoding,” IEEE Transactions on Information Theory, 2002.
[^GHK11]: V. Guruswami, J. Håstad, and S. Kopparty, “On the list-decodability of random linear codes,” IEEE Transactions on Information Theory, 2011.
[^Rud11]: M. Rudra, “Limits to List Decoding of Random Codes,” IEEE Transactions on Information Theory, 2011.

