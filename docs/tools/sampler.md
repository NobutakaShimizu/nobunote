---
title: サンプラー
parent: よく使う道具
nav_order: 6
---

# サンプラー

サンプラー(sampler)は平均時計算量理論や誤り訂正符号の文脈において証明で提案した帰着の正当性の証明などでよく使われます.

{: .definition-title }
> **定義(サンプラー).**
> 
> 確率変数の組$(X,Y)$は以下を満たすとき**$(\delta,\varepsilon)$-サンプラー**という:
> 任意の関数$S \colon \supp(Y)\to [0,1]$に対して
> 
> $$
  \begin{align*}
    \Pr_{x\sim X} \left[ \abs*{ \E[S(Y)| X=x] - \E[S(Y)]} \ge \varepsilon \right] \le \delta.
  \end{align*}
> $$
>
> 同様に, $(X,Y)$は以下を満たすとき**乗法的$(\delta,\varepsilon)$-サンプラー**という: $\E[S(Y)]\ge \varepsilon$を満たす任意の関数$S\colon \supp(Y)\to[0,1]$に対して
> 
>$$
  \begin{align*}
    \Pr_{x\sim X}\left[\mathbb{E}[S(Y)|X=x] \le \frac{\mathbb{E}[S(Y)]}{2}\right] \le \delta.
  \end{align*}
>$$

例えば$X$と$Y$が独立であれば明らかに$\E\left[S(Y) \vert X=x\right]=\E[S(Y)]$となるので$(0,0)$-サンプラーになります.

