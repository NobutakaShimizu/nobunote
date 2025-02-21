---
title: 連接符号
nav_order: 6
parent: 誤り訂正符号
---

# 連接符号

* TOC
{:toc}

誤り訂正符号にはさまざまな指標があり, ある一つの指標については非常に良いパラメータを達成するものの
別の指標については悪いパラメータを持つ符号が構成される, というのは非常によくある話です.
例えば[Reed-Solomon符号]({{site.baseurl}}/docs/error-correcting_code/Reed-Solomon)は次数のパラメータを適切にとると距離やレートは非常に良い値を達成する一方,
必然的にアルファベットサイズが大きくなってしまうという欠点があります.
このように, ある意味で「尖った」符号に対して何かしらの操作を施して, 他の指標についても良い値を達成するようにすることができれば, その符号は非常に有用であると言えるでしょう.

符号の連接(code concatenation)とは, アルファベットサイズの大きな符号$\Cout$とアルファベットサイズの小さな符号$\Cin$を組み合わせることによって, $\Cout$の誤り訂正能力をある程度保ちつつ
アルファベットサイズを下げることができるという手法です.

{: .definition-title }
> **定義 (連接符号)**
>
> 二つの符号$\Cout\subseteq\F_Q^N$, $\Cin\subseteq\F_q^n$であって, $\abs{\Cin}=Q$となるものを考えます. 
> このとき, 連接符号$\Cout\circ \Cin\subseteq\F_q^{Nn}$を以下の手続きで符号化される符号として定義します：
> 1. メッセージを符号$\Cout$で符号化して得られる符号語を$y\in\F_Q^N$とし, 各成分を$y=(y_1,\dots,y_N)$で表します. 
> 2. 各$y_i$を符号$\Cin$で符号化して得られる符号語を$x_i\in\F_q^n$とします. ただしここでは$\Cin$の符号化関数は$\Cin$から$\F_q^n$への単射であるとします.
> 3. これらの$x_i$を繋げて得られるベクトル$x=(x_1,\dots,x_N)\in\F_q^{Nn}$を符号語として出力します. 

{: align="center"}
![text]({{site.baseurl}}/docs/error-correcting_code/images/concatenate.svg){: width=70%}

説明の簡単のため, 外側の符号$\Cout$の符号語$y\in\F_Q^N$の各成分$y_i\in\F_Q$をブロックと呼び,
内側の符号$\Cin$の符号語$x_i\in\F_q^n$の各成分をブロックの要素(または成分)と呼びます.

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">証明</summary>
  まずはレートについて考えます.
  直感的には外側の符号$\Cout$は長さを$r_\tout$倍し, それぞれのブロック長は内側の符号$\Cin$によって長さが$r_\tin$倍されるため, 全体では文字列長は$r_\tout r_\tin$倍されるためレートが$r_\tout r_\tin$となります. 以下ではこの議論をフォーマルに示しています.
  外側の符号$\Cout$のレートが$r_\tout$なので, 元のメッセージ長は$r_\tout N$となるため, 
  ありうるメッセージの全体を$\Omega$とすると, $\abs{\Omega}=Q^{r_\tout N}$です.
  また, 内側の符号$\Cout$の符号化関数は$\Cout$から$\F_q^n$への単射であるため, そのレートは$r_{\tin} = \frac{\log_q Q}{n}$で表せます.
  従って連接符号の符号化関数$\Omega\to\F_q^{nN}$のレートは

  $$
    \begin{align*}
      \frac{\log_q \abs{\Omega}}{nN} &= \frac{\log_q Q^{r_\tout N}}{nN} = \frac{r_\tout N \log_q Q}{nN} = r_\tout r_{\tin}
    \end{align*}
  $$
  
  となります.

  次に連接符号$\Cout\circ\Cin$の距離を考えるために, 非ゼロの符号語$x\in\Cout\circ\Cin\setminus\set{0}$の非ゼロ成分の個数を考えます.
  外側の符号$\Cout$の符号語は少なくとも$\delta_\tout N$個の非ゼロのブロックを持ちます.
  これらの非ゼロブロックのそれぞれを内側の符号$\Cout$で符号化すると, それぞれのブロックの非ゼロ成分の個数は少なくとも$\delta_\tin n$個となります.
  従って, 連接符号$\Cout\circ\Cin$の非ゼロ成分の個数は少なくとも$\delta_\tout N \delta_\tin n$個となるため,
  連接符号$\Cout\circ\Cin$の距離は$\delta_\tout \delta_\tin$となります.

</details>

## 基本的な性質

{: .proposition }
> 二つの符号$\Cout\subseteq\F_Q^N$, $\Cin\subseteq\F_q^n$に対して, それぞれのレートと距離が$r_\tout, r_\tin$と$\delta_\tout, \delta_\tin$であるとき, 連接符号$\Cout\circ\Cin$のレートと距離はそれぞれ$r_\tout r_\tin$と$\delta_\tout \delta_\tin$で与えられる.

## 連接符号の復号

簡単な観察として, 符号$\Cout,\Cin$それぞれが半径$R_{\tout},R_{\tin}$で復号できるならば, 連接符号$\Cout\circ\Cin$は半径$R_{\tout}R_{\tin}$で復号できます.


## 連接符号の応用

- Guruswami and Sudan(2000)は$\Cout$として[Reed-Solomon符号]({{site.baseurl}}/docs/error-correcting_code/Reed-Solomon), $\Cin$として[Hadamard符号]({{site.baseurl}}/docs/error-correcting_code/Hadamrd)を連接して得られる符号がリスト復号可能であることを証明した.[^GS00]


[^GS00]: V. Guruswami and M. Sudan, "List decoding algorithms for certain concatenated codes," STOC, 2000.


