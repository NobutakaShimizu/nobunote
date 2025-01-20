---
title: XOR補題
nav_order: 5
parent: 平均時計算量理論
---
# XOR補題
平均時計算量において脱乱化などの応用を考える文脈では, **困難性の増幅 (hardness amlpification)**と呼ばれる, 弱い平均時困難性を持つ関数$f$から強い平均時困難性を持つ関数$g$を構成する手法が研究されています.

**XOR補題**はその中でも代表的なものの一つです.
主張を述べるために準備をします.
関数$f\colon \binset^n\to\binset$に対して関数$f^{\oplus k}\colon \binset^{kn} \to \binset$を, $y\in\binset^{kn}$を$n$ビットずつ区切って$y = (x_1,\dots,x_k)$としたとき

$$
  \begin{align*}
    f^{\oplus k}(y) = f(x_1)\oplus \dots \oplus f(x_k) \tag{1}
  \end{align*}
$$

で定めます.
ここで$\oplus$はXORを表します.
XOR補題とは, 元の関数$f$がある簡潔な関数族$\calF$に対し$\delta$-困難であるとき, $k$が十分大きければ$f^{\oplus k}$はもう少し簡潔な関数族$\calF'$に対し
$(1/2-\varepsilon)$-困難となることを主張します.
特に$\calF,\calF'$として小さい回路族を考えるものを**YaoのXOR補題**といいます.

{: .remark-title }
> **XOR補題が成り立つ直感的な理由.**
> 
> XOR補題の直感としては, 関数$f$が$\delta$-困難であるとき, 一様ランダムな$x\sim\binset^n$に対して確率変数$f(x)$は確率$\delta$で表が出るコイントス$\mathrm{Ber}(\delta)$と(計算量的に)識別できないことを意味します.
> これを
>
> $$
  \begin{align*}
    f(x)\approx_c \mathrm{Ber}(\delta)
  \end{align*}
> $$
> 
> と書くことにしましょう.
> さて, 独立に$x_1,\dots,x_k\sim\binset^n$を選んだときの$k$個の確率変数$f(x_1),\dots,f(x_k)$はそれぞれ$\mathrm{Ber}(\delta)$の識別できません.
> 従ってこれらのXORをとると
> 
> $$
  \begin{align*}
    f(x_1)\oplus \dots \oplus f(x_k) \approx_c \mathrm{Ber}(\delta)\oplus \dots \oplus \mathrm{Ber}(\delta) \approx \mathrm{Ber}(1/2)
  \end{align*}
> $$
> 
> となります. 最後の$\approx$は統計距離(total variation distance)の意味で近いことを意味し, 具体的には両者の間の統計距離は$2^{-\Omega(k\delta)}$となります.
> ですので, $k \gg \log(1/\varepsilon)/\delta$のとき, $y\sim\binset^{kn}$に対し$f^{\oplus k}(y)\approx_c \mathrm{Ber}(1/2)$となり, これはすなわち$f^{\oplus k}$は$(1/2-\varepsilon)$-困難であることを意味します.

ここではYaoのXOR補題を述べます.
サイズ$s$以下の回路全体の集合を$\SIZE(s)$と表します. なお, ここで考える回路とはAND, OR, NOTゲートを繋げたものであり, ANDとORゲートの入力素子数(fan-in)は2です.
回路のサイズはその回路に含まれるAND,OR,NOTゲートの個数とします.

{: .theorem-title }
> **定理 (YaoのXOR補題).**
>
> ある定数$C>0$が存在して, パラメータ$n\in\Nat,\delta>0,\varepsilon>0$に対し$k\ge C\log(1/\varepsilon)/\delta^2$ならば以下が成り立つ:
> 関数$f\colon \binset^n\to\binset$が$\SIZE(s)$に対して$\delta$-困難ならば, 式(1)で定まる関数$f^{\oplus k}$は$\SIZE(s')$に対して$(1/2-\varepsilon)$-困難である. ただし$s' = ...$.

YaoのXOR補題には様々な証明方法が知られています.

## ハードコア補題を用いた証明

## 直積定理とGoldreich-Levinの定理に基づく証明

## サンプラーを使った簡潔な証明

パラメータはよく知られるバージョンより悪いものの, 非常に簡潔で教育的な証明を紹介します.

{: .proposition-title }
> **命題 (弱いパラメータに対するYaoのXOR補題).**
>
> ある定数$C>0$が存在して, パラメータ$n\in\Nat,\delta>0,\varepsilon>0$に対し$k\ge \frac{C\log(1/\varepsilon)}{\varepsilon^2\delta^2}$ならば以下が成り立つ:
> 関数$f\colon \binset^n\to\binset$が$\SIZE(s)$に対して$\delta$-困難ならば, 式(1)で定まる関数$f^{\oplus k}$は$\SIZE(s')$に対して$(1/2-\varepsilon)$-困難である. ただし$s' = s\cdot \frac{\varepsilon^2}{C\log(1/\delta)}$.

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">証明</summary>
  対偶を証明します. すなわち, $f^{\oplus k}$が$\SIZE(s')$に対して$(1/2-\varepsilon)$-困難でないと仮定して, $f$が$\SIZE(s)$に対して$\delta$-困難でないことを示します.
  そのために, 次の性質を満たすオラクル回路$C^\calO$を構成します: オラクル$\calO$が

  $$
    \begin{align*}
      \Pr_{y\sim\binset^{kn}}[C(y) = f^{\oplus k}(y)] \ge \frac{1}{2} + \varepsilon
    \end{align*}
  $$

  を満たすときに$C^{\calO}$は

  $$
    \begin{align*}
      \Pr_{\substack{x\sim\binset^n\\ C^{\calO}}}[C(x) = f(x)] \ge 1-\delta
    \end{align*}
  $$
  
  を満たし, さらに$C^\calO$のサイズは(オラクルゲートのサイズを定数として)$O(kn\cdot \log(1/\delta)/\varepsilon^2)$となり, オラクルコールの回数は高々$O(\log(1/\delta)/\varepsilon^2)$となる.
  なお, ここではランダムな入力$x\sim\binset^n$と$C^\calO$の内部のランダムネスに関する確率を考えています.

  {: .corollary-title }
  > **オラクル回路$C^{\calO}$**
  > 
  > 入力: $f$のインスタンス$x\in\binset^n$, ランダムシード$r$, アドバイス$\alpha = \alpha(n,r)$
  >
  > 1. 各$t=1,\dots,T$ (ここで$T=O(\log(1/\delta)/\varepsilon^2)$)に対して以下を行う:
  >    1. ランダムシード$r$に基づいて一様ランダムに$(x_1,\dots,x_k)\sim\binset^{kn}$および$i\sim[k]$をサンプリングする.
  >    2. $y = (x_1,\dots,x_{i-1},x,x_{i+1},\dots,x_k)$とし, オラクルとアドバイスを用いて$b_t := \calO(y) + \sum_{j\ne i} f(x_j) \bmod 2 $を計算する. ここで, 各$f(x_j)$ ($j\ne i$) はランダムシード$r$と$n$に依存するため, アドバイス$\alpha$に含めておくことができます.
  > 2. $b_1,\dots,b_T$の中での多数決を出力する (多数決が存在しない場合は任意のビットを出力する).

  オラクル$\calO$としてサイズ$s'$の回路を用いたとき, 上記のオラクル回路はサイズ$s=O((kn+s')\log(1/\delta)/\varepsilon^2) = O(s'\log(1/\delta)/\varepsilon^2)$となります (ここでは$C$のサイズは入力長以上なので$s'\ge kn$).

  次に回路$C^\calO$が$f$を多くの入力上で計算することを示します.
  オラクル$\calO$がステップ1(b)で入力$y=(x_1,\dots,x_{i-1},x,x_{i+1},\dots,x_k)$に対して$f^{\oplus k}(y)$を正しく計算すると仮定します.
  するとステップ1(b)で計算される$b_t$は
  
  $$
    \begin{align*}
      b_t = f^{\oplus k}(y) + \sum_{j\ne i} f(x_j) \pmod 2 = f(x)
    \end{align*}
  $$
  
  となります.
  したがって, オラクル回路$C^\calO$は, ステップ1において半数以上の反復においてオラクル$\calO$インスタンス$y$で成功する場合に$f(x)$を出力します.

  一様ランダムな$x\sim\binset^n$とステップ1(b)で構成される$y$に対して, 確率変数の組$(x,y)$は [直積サンプラー]({{site.baseurl}}/docs/tools/sampler#direct-product-sampler-definition) です.
  従って, [直積サンプラーのサンプラー性]({{site.baseurl}}/docs/tools/sampler#direct-product-sampler)によってこの組は$(\delta/2,\varepsilon/2)$-サンプラーとなります.
  ここで, オラクル$\calO$に対し, 関数$S\colon\binset^{kn}\to\binset$を

  $$
    \begin{align*}
      S(y) = \begin{cases}
        1 & \text{if } \calO(y) = f^{\oplus k}(y), \\
        0 & \text{otherwise}
      \end{cases}
    \end{align*}
  $$
  
  とします. オラクル$\calO$の仮定より$\E_y[S(y)]\ge \frac{1}{2} + \varepsilon$です.
  一方で$(x,y)$のサンプラー性より

  $$
    \begin{align*}
      \Pr_{x\sim \binset^n} \qty[ \E[S(y)|x] \ge \frac{1+\varepsilon}{2} ] &\le 
      \Pr_{x\sim \binset^n} \qty[ \left|\E[S(y)|x] - \E[S(y)]\right| \ge \frac{\varepsilon}{2} ] \\
      &\le \frac{\delta}{2}
    \end{align*}
  $$
  
  を得ます. すなわち, $(1-\delta/2)$の割合の$x$に対して, $y$をランダムに生成したとき$S(y)=$となる確率が少なくとも$1/2+\varepsilon/2$だけあります. このような$x$を**good**であると呼びます.
  goodなインスタンス$x$に対して$C^\calO(x)$の挙動を考えましょう.
  ステップ$1(b)$で生成したランダムな$y$は, $x$がgoodであることから, $\Pr_y[S(y)=1|x]\ge \frac{1+\varepsilon}{2}$を満たします. 従って, $T=O(\log(1/\delta)/\varepsilon^2)$回の各反復$t$において, 確率$\frac{1+\varepsilon}{2}$で$b_t=f(x)$となります. したがって, $T$の仮定から, 多数決によって確率$1-\delta/2$で$C^\calO(x)$は$f(x)$を出力します.
  以上より, この回路$C^\calO$は

  $$
    \begin{align*}
      \Pr_{x\sim\binset^n,C^\calO}[C^\calO(x) = f(x)] &=\Pr_x[x\text{ is good}]\Pr_{C^{\calO}}[C^{\calO}(x) = f(x) | x \text{ is good}] \\
      &\ge (1-\delta/2)(1-\delta/2) = 1-\delta
    \end{align*}
  $$  

  となるため, $f$が$\SIZE(s)$に対して$\delta$-困難でないことが示されました.
</details>

