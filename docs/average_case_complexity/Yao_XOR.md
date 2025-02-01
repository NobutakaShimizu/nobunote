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
    f^{\oplus k}(y) = f(x_1)\oplus \dots \oplus f(x_k) \tag{1} \label{def:xor}
  \end{align*}
$$

で定めます.
ここで$\oplus$はXORを表します.
XOR補題とは, 元の関数$f$がある簡潔な関数族$\calF$に対し$\delta$-困難であるとき, $k$が十分大きければ$f^{\oplus k}$はもう少し簡潔な関数族$\calF'$に対し
$(1/2-\varepsilon)$-困難となることを主張します.
特に$\calF,\calF'$として小さい回路族を考えるものを**YaoのXOR補題**といいます.

なお, [相関]({{site.baseurl}}/docs/average_case_complexity/average_case_hardness#相関に基づく定義)の言葉で述べると, (1)の関数$f^{\oplus k}$は

$$
  \begin{align*}
    (x_1,\dots,x_k)\mapsto f(x_1)\cdot \dots \cdot f(x_k) \tag{2} \label{eq:xor to pmone}
  \end{align*}
$$

に変換されます.

{: .remark-title }
> **XOR補題が成り立つ直感的な理由.**
> 
> XOR補題の直感としては, 関数$f$が$\delta$-困難であるとき, 一様ランダムな$x\sim\binset^n$に対して確率変数$f(x)$は確率$\delta$で表が出るコイントス$\Ber(\delta)$と(計算量的に)識別できないことを意味します.
> これを
>
> $$
  \begin{align*}
    f(x)\approx_c \Ber(\delta)
  \end{align*}
> $$
> 
> と書くことにしましょう.
> さて, 独立に$x_1,\dots,x_k\sim\binset^n$を選んだときの$k$個の確率変数$f(x_1),\dots,f(x_k)$はそれぞれ$\Ber(\delta)$の識別できません.
> 従ってこれらのXORをとると
> 
> $$
  \begin{align*}
    f(x_1)\oplus \dots \oplus f(x_k) \approx_c \Ber(\delta)\oplus \dots \oplus \Ber(\delta) \approx \Ber(1/2)
  \end{align*}
> $$
> 
> となります. 最後の$\approx$は統計距離(total variation distance)の意味で近いことを意味し, 具体的には両者の間の統計距離は$2^{-\Omega(k\delta)}$となります.
> ですので, $k \gg \log(1/\varepsilon)/\delta$のとき, $y\sim\binset^{kn}$に対し$f^{\oplus k}(y)\approx_c \Ber(1/2)$となり, これはすなわち$f^{\oplus k}$は$(1/2-\varepsilon)$-困難であることを意味します.

ここではYaoのXOR補題を述べます.
サイズ$s$以下の回路全体の集合を$\SIZE(s)$と表します. なお, ここで考える回路とはAND, OR, NOTゲートを繋げたものであり, ANDとORゲートの入力素子数(fan-in)は2です.
回路のサイズはその回路に含まれるAND,OR,NOTゲートの個数とします.

{: .theorem-title }
> **定理 (YaoのXOR補題; informal).**
>
> ある定数$C>0$が存在して, パラメータ$n\in\Nat,\delta>0,\varepsilon>0$に対し$k\ge C\log(1/\varepsilon)/\delta$ならば以下が成り立つ:
> 関数$f\colon \binset^n\to\binset$が$\SIZE(s)$に対して$\delta$-困難ならば, 式(1)で定まる関数$f^{\oplus k}$は適当な$s'\lesssim s$に対し, $\SIZE(s')$に対して$(1/2-\varepsilon)$-困難である.

また, [相関]({{site.baseurl}}/docs/average_case_complexity/average_case_hardness#相関に基づく定義)の言葉で述べると以下のようになります.

{: .theorem-title }
> **定理 (YaoのXOR補題; 相関を用いたステートメント)**
>
> 関数$f\colon \binset^n\to\pmone$に対し, $f^k\colon\binset^{kn}\to\pmone$を(\ref{eq:xor to pmone})で定める.
> もし$f$の$\SIZE(s)$に対する相関が高々$1-\delta$ならば, $f^{k}$の$\SIZE(s')$に対する相関は高々$\approx (1-\delta)^k$である. ここで$s'\lesssim s$.

YaoのXOR補題には様々な証明方法が知られています.
ここではそれぞれの証明の概要だけ紹介します.
詳しくは[GNW11](#GNW11)を参照.

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

## Levinによる証明

$k$に関する帰納法で証明します.

{: .lemma-title }
> **補題 (informal)**
>
> 関数$f,g$がそれぞれ$f\colon\binset^{m}\to\pmone,g\colon\binset^n\to\pmone$であり, それぞれサイズ$s,t$の任意の回路との[相関]({{site.baseurl}}/docs/average_case_complexity/average_case_hardness#相関に基づく定義) が高々$\alpha,\beta$であるとき, 関数$f\cdot g\colon \binset^{m+n}\to\pmone$を
> 
> $$
  \begin{align*}
    (f\cdot g) (x,y)=f(x)\cdot g(y)
  \end{align*}
> $$
>
> で定義すると, $f\oplus g$はサイズ$\approx \min(s,t)$の任意の回路に対して相関が高々$\approx \alpha\beta$である.

{: .remark }
> 関数の値域を$\binset$にすると, $f\cdot g$は$f\oplus g$となります.
> さらにこのとき, [平均時困難性]({{site.baseurl}}/docs/average_case_complexity/average_case_hardness)の言葉を使うと, $f,g$がそれぞれ$\delta_1,\delta_2$-困難であるならば$f\oplus g$はおよそ$(\delta_1(1-\delta_2)+\delta_2(1-\delta_1))$-困難であることを意味します.
> この値の意味は次のように解釈できます: $f$と$g$は, [困難性と擬似ランダムネス性の関係]({{site.baseurl}}/docs/average_case_complexity/function_pseudorandomness#関数の平均時困難性と擬似ランダム性) により, ランダムな$(x,y)\sim\binset^{m+n}$に対して$f(x),g(y)$はそれぞれ計算量的に$\Ber(\delta_1),\Ber(\delta_2)$と区別できません. そこで$f(x)\oplus g(y)$は$\Ber(\delta_1)\oplus \Ber(\delta_2)$と区別できないことになりますが, ここで,
> 
> $$
  \begin{align*}
    \Ber(\delta_1)\oplus \Ber(\delta_2) = \Ber(\delta_1(1-\delta_2)+\delta_2(1-\delta_1))
  \end{align*}
> $$
>
> とみなせるため, $f(x)\oplus g(y)$は$(\delta_1(1-\delta_2) + \delta_2(1-\delta_1))$-困難であることが期待されます.

XOR補題の証明は上の補題を繰り返し適用することによって得られます.
すなわち, $f^k = f\cdot f^{k-1}$とみなし, 機能的に$f^{k-1}$の困難性を導出し, 補題を使ってマージすることによって$f^k$の平均時困難性を導出できます.

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">補題の証明の概要</summary>
  
  対偶を示します. $f\oplus g$があるサイズ$s$の回路$C$に対して相関が$\gamma$より大きいと仮定します.
  このとき,

  $$
    \begin{align*}
      \alpha\beta &\lesssim \E_{x,y}[C(x,y)\cdot f(x) \cdot g(y)] \\
      &= \E_{x}[f(x)\underbrace{\E_y[C(x,y)\cdot g(y)]}_{:=T(x)}]. \tag{3} \label{eq:fT cor}
    \end{align*}
  $$
  
  ここで$T(x)=\E_y[C(x,y)\cdot g(y)]$とします. このとき, 任意の$x\in\binset^m$に対して$\abs{T(x)}\le\beta$が成り立ちます.
  実際, ある$x\in\binset^m$に対して$T(x)>\beta$と仮定すると, このような$x$を固定したとき, 回路$y\mapsto C(x,y)$は$g$との相関が$T(x)>\beta$となります ($C$のサイズが$\min\set{s,t}\le t$であることに注意). また, $T(x)<-\beta$ならば出力をフリップすれば同様の回路が得られます. これは$g$の相関に関する仮定に違反します.
  したがって, $\abs{T(x)}\le\beta$が成り立ちます.

  このとき, 関数$h\colon x\mapsto \frac{T(x)}{\beta} \in [-1,1]$は式(\ref{eq:fT cor})より

  $$
    \begin{align*}
      \E_x[h(x)f(x)] \gtrsim \alpha\beta/\beta = \alpha
    \end{align*}
  $$
  
  となります. 従って, $h$は$f$との相関がある程度大きいため, $h$を使って$f$を近似する回路を構成することを考えていきます.
  関数$h$を計算するためには$T(x) = \E_y[C(x,y)g(y)]$を計算する必要があります.
  この関数は$y$の独立なコピー$y_1,\dots,y_\ell$を生成し, $g(y_1),\dots,g(y_\ell)$をアドバイスとして受け取り, $\frac{1}{\ell}\sum_i C(x,y_i)g(y_i)$を出力することによって高確率で近似できます.
  これにより, 関数$h$の($f$との相関をほぼ保存する精度の)近似値を計算することができます.
  なお, $h$の値域は$[-1,1]$となっていますが, 仮に出力値が$r\in[-1,1]$だった時は
  確率$\frac{1+r}{2}$で$+1$, 確率$\frac{1-r}{2}$で$-1$を出力する乱択回路を考えれば, 相関を損なわずに
  出力地を$\pmone$に変換することができます.
</details>

## ハードコア補題を用いた証明

ハードコア補題に基づくXOR補題の証明は, Nisan-Wigderson Generatorに基づく脱乱択化されたXOR補題など様々な問題設定に拡張できるという利点があります [[HVV06]](#HVV06).
この証明は[関数の擬似ランダムネス]({{site.baseurl}}/docs/average_case_complexity/function_pseudorandomness)の視点から咀嚼すると非常に理解しやすいです.
議論の分かり易さのため, 二つの確率変数$X,Y$に対し, それらの[統計距離]({{site.baseurl}}/docs/tools/statistical_distance)が小さいとき,

$$
  \begin{align*}
    X \approx_{\mathrm{tv}} Y
  \end{align*}
$$

と書き, さらに$X$と$Y$が小さい回路にとって識別できないとき,

$$
  \begin{align*}
    X \approx_c Y
  \end{align*}
$$

と記すことにします.

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">証明の概要</summary>
  
[ハードコア補題]({{site.baseurl}}/docs/average_case_complexity/hardcore)は, 関数$f\colon\binset^n\to\binset$が$\SIZE(s)$に対して$\delta$-困難であるとき, **ハードコア集合**と呼ばれるある集合 $H \subseteq \binset^n$が存在して, $\abs{H}\gtrsim \delta 2^n$かつ$f$の$H$への制限$f\restr{H}\colon H\to\binset$が, 適当な$s'\lesssim s$を用いて$\SIZE(s')$に対し$(1/2-\varepsilon)$-困難であることを主張する定理です.
[擬似ランダムネスからの理解]({{site.baseurl}}/docs/average_case_complexity/hardcore#ハードコア補題)で述べたように, ハードコア集合$H$に対し, ランダム関数

$$
  \begin{align*}
    f_H(x) = \begin{cases}
      \Ber(1/2) & \text{if } x\in H, \\
      f(x) & \text{otherwise}
    \end{cases}
  \end{align*}
$$

と定義すると, $x\sim \binset^n$に対し, $(x,f(x))\approx_c (x,f_H(x))$が成り立ちます.
では, 式(\ref{def:xor})で定まる関数$f^{\oplus k}$および$f_H^{\oplus k}$を考えてみましょう.
後者の関数に対し$k$-wise XORを適用して定まる関数

$$
  \begin{align*}
    f_H^{\oplus k} (x_1,\dots,x_k) = f_H(x_1)\oplus \dots \oplus f_H(x_k)
  \end{align*}
$$

は, どれか一つの$x_i$が$x_i\in H$ならば, 出力値はランダムビット$\Ber(1/2)$となります.
入力$(x_1,\dots,x_k)$をランダムに選んだとき, この事象は確率$1-(1-\delta)^k$で起こります (ここでは簡単のため, $\abs{H}=\delta 2^n$とした).
すなわち, $f_H^{\oplus k}$は

$$
  \begin{align*}
    f_H^{\oplus k}(x_1,\dots,x_k) = \begin{cases}
      \Ber(1/2) & \text{with probability } 1-(1-\delta)^k, \\
      f^{\oplus k}(x_1,\dots,x_k) & \text{otherwise}
    \end{cases}
  \end{align*}
$$

となり, 特にランダムビット$\Ber(1/2)$との統計距離は$2^{-\Omega(k\delta)} $となるため, $k\gg\log(1/\varepsilon)/\delta$ならば

$$
  \begin{align*}
    (x_1,\dots,x_k,f_H^{\oplus k}(x_1,\dots,x_k)) \approx_{\mathrm{tv}} (x_1,\dots,x_k,\Ber(1/2)) \tag{4} \label{eq:f_H xor tv}
  \end{align*}
$$

が成り立ちます.

さて, XOR補題の対偶を示すために, $f^{\oplus x}$が$(1/2-\varepsilon)$-困難でないと仮定しましょう.
このとき, [平均時困難性と擬似ランダム性の等価性]({{site.baseurl}}/docs/average_case_complexity/function_pseudorandomness#関数の平均時困難性と擬似ランダム性)および式(\ref{eq:f_H xor tv})により,

$$
  \begin{align*}
    (x_1,\dots,x_k,f^{\oplus k}(x_1,\dots,x_k)) \not\approx_c (x_1,\dots,x_k,\Ber(1/2)) \approx_{\mathrm{tv}} (x_1,\dots,x_k,f_H^{\oplus k}(x_1,\dots,x_k))
  \end{align*}
$$

を満たし, 特にこれは


$$
  \begin{align*}
    (x_1,\dots,x_k,f^{\oplus k}(x_1,\dots,x_k))\quad\text{and}\quad (x_1,\dots,x_k,f_H^{\oplus k}(x_1,\dots,x_k)) \tag{5} \label{eq:f f_H xor distinguish}
  \end{align*}
$$

が成り立つことを意味します.
ここで, 各$i=0,1,\dots,k$に対して$\binset^{kn+1}$上の分布$H_i$を

$$
  \begin{align*}
    H_i = (x_1,\dots,x_k,f(x_1)\oplus \dots \oplus f(x_{i})\oplus f_H(x_{i+1}) \oplus \dots \oplus f_H(x_k))
  \end{align*}
$$

と定義しましょう. 特に(\ref{eq:f f_H xor distinguish})より, $H_0$と$H_k$は区別可能であることがわかります.
すなわち, ある小さい回路$C\colon\binset^{kn+1}\to\binset$が存在して

$$
  \begin{align*}
    \Omega(\varepsilon) &\le \Pr_{z\sim H_0}[C(z)=1] - \Pr_{z\sim H_k}[C(z)=1] \\
    &\le \sum_{i=0}^{k} \Pr_{z\sim H_i}[C(z)=1] - \Pr_{z\sim H_{i+1}}[C(z)=1]
  \end{align*}
$$

となるため, ある$i\in\set{0,1,\dots,k-1}$が存在して

$$
  \begin{align*}
    \Pr_{z\sim H_i,f_H}[C(z)=1] - \Pr_{z\sim H_{i+1},f_H}[C(z)=1] \ge \Omega(\varepsilon/k)
  \end{align*}
$$

が成り立ちます. なお, 上記の確率には入力$z$の他に, $f_H$のランダムネスも考えます.
ここで, 分布$H_i$と$H_{i+1}$の中身は一つの成分だけ異なっています:

$$
  \begin{align*}
    &(x_1,\dots,x_k,f(x_1)\oplus \dots \oplus f(x_{i})\oplus \textcolor{red}{f_H(x_{i+1})} \oplus \dots \oplus f_H(x_k)) \\
    &(x_1,\dots,x_k,f(x_1)\oplus \dots \oplus f(x_{i})\oplus \textcolor{red}{f(x_{i+1})} \oplus \dots \oplus f_H(x_k)).
  \end{align*}
$$

そこで, $x_{i+1}$以外の全ての$x_j$と$f(x_j)$ ($j\ne i+1$), および$f_H$のランダムネスを適当に固定して回路$C$に与えてを走らせると
$(x_{i+1},f(x_{i+1})) \not\approx_c (x_{i+1},f_H(x_{i+1}))$となります. $x_{i+1}$を$x$に書き換えると, ある小さい回路$C'$が存在して

$$
  \begin{align*}
    \Pr_{x\sim \binset^n}[C'(x,f(x))=1] - \Pr_{x\sim \binset^n}[C'(x,f_H(x))=1] \ge \Omega(\varepsilon/k)
  \end{align*}
$$

が成り立ちます.
この式の左辺を考えます.
全ての$x\not\in H$に対して$f(x)=f_H(x)$なので左辺に寄与せず, $x\in H$のときは$f_H(x)=\Ber(1/2)$なので,

$$
  \begin{align*}
    \Pr_{x\sim H}[C'(x,f(x))=1] - \Pr_{x\sim H}[C'(x,\Ber(1/2))=1] \ge \Omega(\varepsilon/k)
  \end{align*}
$$

となります. ここで[Yaoのnext-bit predictor]({{site.baseurl}}/docs/average_case_complexity/function_pseudorandomness#prop:yao-next-bit-predictor)より, $H$上で$f$をある程度のアドバンテージで計算する小さい回路$C''$, すなわち

$$
  \begin{align*}
    \Pr_{x\sim H}[C''(x)=f(x)] \ge \frac{1}{2}+\Omega(\varepsilon/k)
  \end{align*}
$$

が存在します. これはハードコア補題に反するため, $f^{\oplus k}$が$(1/2-\varepsilon)$-困難であることが示されました.

</details>

## 直積定理とGoldreich-Levinの定理に基づく証明

## 参考文献

<div id="GNW11" markdown="1">
[[GNW11]](http://127.0.0.1:4000/nobunote/docs/average_case_complexity/Yao_XOR/) O. Goldreich, N. Nisan, A. Wigderson. On Yao's XOR-Lemma, Studies in Complexity and Cryptography. Miscellanea on the Interplay between Randomness and Computation, Springer (2011)
</div>
<div id="HVV06" markdown="1">
[[HVV06]](https://epubs.siam.org/doi/10.1137/S0097539705447281) A. Healy, S. Vadhan, E. Viola, Using Nondeterminism to Amplify Hardness, SICOMP (2006).
</div>