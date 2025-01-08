---
title: 便利な不等式
parent: よく使う道具
nav_order: 3
---
# 便利な不等式
[よく使う不等式]({{site.baseurl}}/docs/tools/prob_inequalities)ほど頻繁に登場しないものの, 知っていると便利な不等式を紹介していきます.

## リード-$k$族の和の集中不等式

[Gavinsky, Lovett, Saks, Srinivasan (2014)](https://onlinelibrary.wiley.com/doi/10.1002/rsa.20532)による集中不等式を紹介します.
ChernoffバウンドやHoeffdingバウンドは独立な確率変数$Y_1,\dots,Y_n$の和の集中性を保証します.
これを, 必ずしも$Y_1,\dots,Y_n$が独立とは限らない場合に拡張することを考えます.
もちろん, どんな場合でも必ず集中性が保証されるわけではありませんが, $Y_1,\dots,Y_n$たちの従属関係が何かしら良い構造を持つときにその性質を利用しようと思うわけです.

ハイパーグラフによって従属関係が表現された確率変数族を考えます.

{: .definition }
> ハイパーグラフ$\calH=(V,\calE)$を考え,
> 各ハイパー辺$e \in \calE$には関数$f_e \colon [0,1]^{e} \to [0,1]$が付随しているとします.
> 各頂点ごとに独立な$[0,1]$値の確率変数$X_v$を考えたとき, 各ハイパー辺$e\in \calE$に対し,
> 
> $$
  \begin{align*}
    Y_e = f_e(X\restr{e})
  \end{align*}
> $$
>
> によって定まる確率変数の族$(Y_e)_{e\in \calE}$を, **$\calH$-従属な確率変数族**と呼ぶ.

{: .remark }
> $\calH$-従属という用語は一般的な用語ではなく, このノートで局所的に便宜上用いる用語です.

ハイパーグラフ$\calH$の構造的性質を和 $\sum_{e\in \calE}Y_e$ の集中性に反映させることが目標です.
この設定はChernoffバウンドやHoeffdingバウンドを特殊ケースとして含んでいます.
実際, 各ハイパー辺$e_i$がシングルトンで$e_i=\\{v_i\\}$のようになっているとき, $(Y_e)$は独立な確率変数族となります.

[Gavinsky, Lovett, Saks, Srinivasan (2014)](https://onlinelibrary.wiley.com/doi/10.1002/rsa.20532)は, ハイパーグラフ$\calH$の最大次数が小さいときに集中性が成り立つことを証明しました.

{: .definition-title }
> **定義(リード-$k$族).**
>
> 最大次数が高々$k$であるハイパーグラフ$\calH=(V,\calE)$に対し, $\calH$-従属な確率変数族を**リード-$k$族 (read-$k$ family)**という.

{: .theorem-title }
> **定理 ([Gavinsky, Lovett, Saks, Srinivasan (2014)](https://onlinelibrary.wiley.com/doi/10.1002/rsa.20532))**.
>
> 確率変数$Y_1,\dots,Y_m$をリード-$k$族とし,
> 和を$S=\sum_{e\in \calE} Y_e$, 
> 期待値の平均を$\mu = \frac{\E[S]}{m}$とする.
> 任意の$\delta>0$に対して以下が成り立つ:
> 
> $$
  \begin{align*}
    &\Pr \qty[ S \ge \qty(\mu + \delta) ] \le \exp\qty(- \frac{m}{k}\cdot \KL {\mu+\delta} \mu),\\
    &\Pr \qty[ S \le \qty(\mu - \delta) ] \le \exp\qty(- \frac{m}{k}\cdot \KL {\mu-\delta}{\mu}).
  \end{align*}
> $$
>
> ここで, $\KL{p}{q}=p\log\frac{p}{q} + (1-p)\log\frac{1-p}{1-q}$は二値KLダイバージェンス(もしくは二値相対エントロピー)と呼ばれる ($\log$は自然対数).

{: .proposition }
> 二値KLダイバージェンスについては以下の不等式が成り立つ.
> 任意の$p,q\in[0,1]$に対して
> 
> $$
  \begin{align*}
    &\KL p q \ge 2(p-q)^2 & & \text{(Pinskerの不等式)} \\
    &\KL p q \ge \frac{(p-q)^2}{\max(p,q)}.
  \end{align*}
> $$





