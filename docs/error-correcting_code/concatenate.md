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
> 2. 各$y_i$を符号$\Cin$で符号化して得られる符号語を$x_i\in\F_q^n$とします. 
> 3. これらの$x_i$を繋げて得られるベクトル$x=(x_1,\dots,x_N)\in\F_q^{Nn}$を符号語として出力します. 

{: align="center"}
![text]({{site.baseurl}}/docs/error-correcting_code/images/concatenate.svg){: width=70%}
