---
title: サンプラー
parent: よく使う道具
nav_order: 6
---

# サンプラー

サンプラー(sampler)は平均時計算量理論の文脈において証明で提案した帰着の正当性の証明などでよく使われます.
二つの独立とは限らない確率変数の組$(X,Y)$を考え, これらの台$\supp(X),\supp(Y)$が有限集合とします.
このとき, $(X,Y)$のサンプリングは, ある辺重みつき二部グラフの辺を(重みに比例した確率で)ランダムに選び, その端点を出力するというプロセスとして捉えることができます.
この(辺重みつき)二部グラフを$(X,Y)$に付随する二部グラフと呼ぶことにします.

{: align="center"}
  ![確率変数のペアのサンプリングは二部グラフのランダムな辺のサンプリングとみなせる]({{site.baseurl}}/docs/tools/images/sampler_bipartite_graph.svg)
{: width=70%}

確率変数のペア$(X,Y)$がサンプラーであるとはこの二部グラフがある種のエクスパンダー性を持つことを意味します.

{: .definition-title }
> **定義(サンプラー).**
> 
> 確率変数の組$(X,Y)$は以下を満たすとき**$(\delta,\varepsilon)$-サンプラー**という:
> 任意の関数$S \colon \supp(Y)\to [0,1]$に対して
> 
> $$
  \begin{align*}
    \Pr_{x\sim X} \left[ \abs*{ \E[S(Y)| X=x] - \E[S(Y)]} \ge \varepsilon \right] \le \delta. \tag{1}
  \end{align*}
> $$
>
> 同様に, $(X,Y)$は以下を満たすとき**乗法的$(\delta,\varepsilon)$-サンプラー**という: $\E[S(Y)]\ge \varepsilon$を満たす任意の関数$S\colon \supp(Y)\to[0,1]$に対して
> 
>$$
  \begin{align*}
    \Pr_{x\sim X}\left[\mathbb{E}[S(Y)|X=x] \le \frac{\mathbb{E}[S(Y)]}{2}\right] \le \delta. \tag{2}
  \end{align*}
>$$

確率変数のペア$(X,Y)$に付随する二部グラフ$G=(\supp(X),\supp(Y),E)$を考えます.
簡単のため辺は重みなしだが多重辺は許すとします (ですので$E$は多重集合となります).
つまり, $(X,Y)$をサンプリングするには, 一様ランダムな辺$(x,y)\sim E$を選び, その両端点$(x,y)$を出力すればよいです.

関数$S\colon \supp(Y)\to \binset$を任意に一つ固定します(本来, サンプラーの定義では$[0,1]$値関数を考えますがここでは簡単のため$\binset$値関数としています).
このとき$S$は部分集合$S\subseteq \supp(Y)$と同一視でき, $\E[S(Y)]=\Pr[Y\in S]$は部分集合$S$の(**大域的**な)密度となります.
各$x\in U$に対して$N(x)$を$x$の隣接頂点の多重集合とすると

$$
  \begin{align*}
    \E \left[S(Y) \vert X=x\right] = \Pr_{y \sim N(x)} \left[y \in S\right] = \frac{|N(x)\cap S|}{|N(x)|}
  \end{align*}
$$

は$N(x)$のうち$S$に属するものの割合, すなわち$x$の周辺における$S$の**局所的**な密度を表します.

{: align="center"}
  ![ランダムな隣接点のうちSに属するものの割合]({{site.baseurl}}/docs/tools/images/sampler_bipartite_graph_degree.svg)
{: width=70%}

$(X,Y)$がサンプラーであるとは, ほとんどの$x$に対して$S$の局所的な密度$\frac{\abs{N(x)\cap S}}{\abs{N(x)}}$が$S$の大域的な密度$\E[S(Y)]$に近いということを意味します.
また, $x\sim X$をランダムに選んだときの確率変数$\E[S(Y) \vert X=x]$がその期待値$\E_{x\sim X} \left[ \E[S(Y) \vert X=x]\right] = \E[S(Y)]$に集中するという性質とも言えます.

## 交換補題

実はサンプラー性は対称であり, $(Y,X)$がサンプラーならば$(X,Y)$もまたサンプラーとなります.

{: .lemma-title }
> **補題(交換補題).**
>
> 確率変数のペア$(Y,X)$が$\left(\frac{\varepsilon}{2},\frac{\delta\varepsilon}{8}\right)$-サンプラーならば$(X,Y)$は$(\delta,\varepsilon)$-サンプラーである.
>
> 同様に, $(Y,X)$が乗法的$\left(\frac{\varepsilon}{4},\delta\right)$-サンプラーならば, $(X,Y)$は乗法的$(\delta,\varepsilon)$-サンプラーである.

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">一つ目の主張の証明</summary>
  $(Y,X)$を$\left(\frac{\varepsilon}{2},\frac{\delta\varepsilon}{8}\right)$-サンプラーとします.
  記号の簡単のため, $\delta'=\frac{\varepsilon}{2},\varepsilon'=\frac{\delta\varepsilon}{8}$とし, $(Y,X)$が$(\delta',\varepsilon')$-サンプラーであるとします.

  まず, $(X,Y)$の片側サンプラー性, 具体的には任意の関数$S\colon \supp(Y)\to[0,1]$に対して

  $$
    \begin{align*}
      \Pr_{x\sim X} \left[ \E[S(Y) \vert X=x] - \E[S(Y)] \le -\varepsilon \right] \le \frac{\delta}{2} \tag{3}
    \end{align*}
  $$
  
  が成り立つことを示します.
  関数$S\colon \supp(Y)\to[0,1]$に対して関数$H\colon\supp(X)\to\binset$を

  $$
    \begin{align*}
      H(x)=1 \iff \E[S(Y)\vert X=x] - \E[S(Y)] \le -\varepsilon
    \end{align*}
  $$
  
  で定めます. $H$の定義より
  
  $$
    \begin{align*}
      \E[H(X)S(Y)] &= \E[S(Y) \vert H(X)=1]\cdot \E[H(X)] \\
      &\le \left(\E[S(Y)] - \varepsilon\right)\cdot \E[H(X)] \tag{4}
    \end{align*}
  $$

  を得ます.
  一方で, $(Y,X)$は$(\delta',\varepsilon')$-サンプラーなので, $1-\delta'$の割合の$y\sim Y$に対して
  $\E[H(X)\vert Y=y] > \E[H(X)] - \varepsilon'$が成り立ちます.
  このような$y$の集合を$T \subseteq \supp(Y)$とします.
  このとき,

  $$
    \begin{align*}
      \E[H(X)S(Y)] &\ge \sum_{y\in T} \E[H(X)\vert Y=y]\cdot S(y) \cdot \Pr[Y=y] \\
      &\ge \left(\E[H(X)] - \varepsilon'\right) \left( \E[S(Y)] - \Pr[Y\in T] \right) \\
      &\ge \left(\E[H(X)] - \varepsilon'\right) \left( \E[S(Y)] - \delta'\right) \tag{5}
    \end{align*}
  $$
  
  より, 式(4)(5)を組み合わせると

  $$
    \begin{align*}
      \E[H(X)]\left(\E[S(Y)]-\varepsilon\right) > \left(\E[H(X)]- \varepsilon'\right)\left(\E[S(Y)] - \delta'\right)
    \end{align*}
  $$

  となります.
  主張(3)を示すには$\E[H(X)]\le \frac{\delta}{2}$を示せばよいですが, これを背理法で示すため, $\E[H(X)]\ge \frac{\delta}{2}$を仮定します.
  ここで, $\E[S(Y)]\ge\varepsilon$が成り立つことに注意してください ($\E[S(Y)]<\varepsilon$ならば主張(3)は自明に成り立つ).

  - もし$\E[S(Y)] = \varepsilon$ならば, (5)に代入すると　

  $$
    \begin{align*}
      \left(\E[H(X)] - \frac{\delta\varepsilon}{8}\right)\left(\E[S(Y)] - \frac{\varepsilon}{2}\right) < 0
    \end{align*}
  $$
  
  となり, これは$\E[H(X)]\ge \frac{\delta}{2}$に矛盾します.

  - もし$\E[S(Y)]>\varepsilon$ならば

  $$
    \begin{align*}
      \frac{ \left(\E[H(X)] - \varepsilon'\right) \left(\E[S(Y)] - \delta'\right) }{\E[H(X)]\left(\E[S(Y)]-\varepsilon\right)}
      &= \left(1-\frac{\delta\varepsilon}{8\E[H(X)]}\right)\left(1+\frac{\varepsilon/2}{\E[S(Y)]-\varepsilon}\right) \\
      &\ge \left(1-\frac{\varepsilon}{4}\right)\left(1+\frac{\varepsilon}{2}\right) \\
      &\ge 1
    \end{align*}
  $$

  となり, これは(5)に矛盾します.

  以上より主張(3)が示されました.
  
  最後に主張(3)を使って$(X,Y)$が$(\delta,\varepsilon)$-サンプラーであることを示します.
  任意に関数$S\colon \supp(Y)\to[0,1]$を固定し, $S$と$1-S$それぞれに対して(3)を適用すると

  $$
    \begin{align*}
      &\Pr_{x\sim X} \left[ \E[S(Y) \vert X=x] - \E[S(Y)] \le -\varepsilon \right] \le \frac{\delta}{2},\\
      &\Pr_{x\sim X} \left[ -\E[S(Y) \vert X=x] + \E[S(Y)] \le -\varepsilon \right] \le \frac{\delta}{2}
    \end{align*}
  $$
  
  となるため, union boundより主張を得ます.  
  
</details>

## 直積サンプラー

平均時計算量の文脈では以下に定義する直積サンプラーと呼ばれるペア$(X,Y)$をよく考えます.

{: .definition-title }
> **定義(直積サンプラー).**
>
> パラメータ$k\in\Nat$と確率変数$X$に対し, 以下で与えられる確率変数$Y$を考える:
> 確率変数$X$の独立なコピーを$k$個作成し, $X_1,\dots,X_k$とする.
> 一様ランダムに$i\sim[k]$を選び, $Y=(X_1,\dots,X_{i-1},X,X_{i+1},\dots,X_k)$とする.
>
> このようにして得られる$(X,Y)$を**$k$-直積サンプラー**と呼ぶ.

直積サンプラーに付随する二部グラフでは,
左側の頂点集合$\supp(X)$に対して$\supp(Y)=\supp(X)^k$となり, 頂点$x\in\supp(X)$と$(x_1,\dots,x_k)\in\supp(Y)$の間には, $(x_1,\dots,x_k)$の中に登場する$x$の回数だけ多重辺を引いて得られます (下図参照)

{: align="center"}
![直積サンプラーに付随するグラフ]({{site.baseurl}}/docs/tools/images/direct_product_sampler.svg)
{: width=70%}

