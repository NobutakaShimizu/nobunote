---
title: 連接符号
nav_order: 6
parent: 誤り訂正符号
---

# 連接符号

* TOC
{:toc}

符号の連接(code concatenation)は, 二つの符号を組み合わせて新たな符号を構成する手法であり, 
主にアルファベットサイズが比較的小さい一方で誤り訂正能力が高い符号を構成するために用いられます. 

{: .definition-title }
> **定義 (連接符号)**
>
> 二つの符号$\Cout\subseteq\F_Q^N$, $\Cin\subseteq\F_q^n$であって, $\abs{\Cin}=Q$となるものを考えます. 
> このとき, 連接符号$\Cout\circ \Cin\subseteq\F_q^{Nn}$を以下の手続きで符号化される符号として定義します：
> 1. メッセージを符号$\Cout$で符号化して得られる符号語を$y\in\F_Q^N$とし, 各成分を$y=(y_1,\dots,y_N)$で表します. 
> 2. 各$y_i$を符号$\Cin$で符号化して得られる符号語を$x_i\in\F_q^n$とします. 
> 3. これらの$x_i$を繋げて得られるベクトル$x=(x_1,\dots,x_N)\in\F_q^{Nn}$を符号語として出力します. 