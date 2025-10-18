---
title: シャノンエントロピー
parent: エントロピー
nav_order: 1
---

# シャノンエントロピー

* TOC
{:toc}

## 概要

シャノンエントロピー(Shannon entropy)は情報理論における最も基本的なエントロピーの概念で, 確率変数の不確実性や情報量を測る指標です. 理論計算機科学においても, ランダムネス抽出器, プライバシー保護, 通信理論など様々な場面で重要な役割を果たします.

## 定義

{: .definition-title }
> **定義 (シャノンエントロピー)**
>
> 有限集合$\calX$上に値をとる確率変数$X$に対して, 以下で定義される量$\entropy(X)$を$X$の**シャノンエントロピー (Shannon entropy)**という:
>
> $$
  \begin{align*}
    \entropy(X) = \E_{x\sim X}\qty[ \ln\frac{1}{\Pr[X=x]} ] = \sum_{x\in\calX} \Pr[X=x] \ln\frac{1}{\Pr[X=x]}.
  \end{align*}
> $$
>
> ここで, $\ln$は自然対数であり, $0\ln 0 = 0$と約束する.

{: .remark }
> 情報科学の分野においては慣例として底を$2$とすることが多いが, 数学的にはPinskerの不等式などを見ると自然対数の方が都合が良いことが多いので, ここでは自然対数を用いている.

シャノンエントロピーは確率変数$X$の不確実性を測る指標です. $\entropy(X)$が大きいほど, $X$の値が予測しにくいことを意味します.

## 基本的性質

{: .proposition }
> 有限集合$\calX$上に値をとる確率変数$X$に対して
> 
> $$
  \begin{align*}
    0 \le \entropy(X) \le \ln \vert\calX\vert.
  \end{align*}
> $$
>
> 特に, $\entropy(X) = 0$となるのは$X$が一点分布のとき, $\entropy(X) = \ln \vert\calX\vert$となるのは$X$が一様分布のときである.

## 条件付きエントロピー

二つの確率変数の関係を表す条件付きエントロピーを定義します.

{: .definition-title }
> **定義 (条件付きエントロピー)**
>
> 有限集合$\calX,\calY$上に値をとる確率変数$X,Y$に対して, 以下で定義される量$\entropy(X\mid Y)$を$X$の$Y$に関する**条件付きエントロピー (conditional entropy)**という:
>
> $$
  \begin{align*}
    \entropy(X\mid Y) = \E_{y\sim Y}\qty[ \entropy(X\mid Y=y) ] = \sum_{y\in\calY} \Pr[Y=y] \entropy(X\mid Y=y).
  \end{align*}
> $$
>
> ここで, $\entropy(X\mid Y=y) = \sum_{x\in\calX} \Pr[X=x\mid Y=y] \ln\frac{1}{\Pr[X=x\mid Y=y]}$である.

条件付きエントロピーは, $Y$の値が既知である場合の$X$の不確実性を表します.

{: .proposition }
> 確率変数$X,Y$に対して
> 
> $$
  \begin{align*}
    \entropy(X\mid Y) \le \entropy(X).
  \end{align*}
> $$
>
> つまり, 追加の情報$Y$を得ることで$X$の不確実性は減少する.

## 相互情報量

二つの確率変数の間の依存関係を測る相互情報量を定義します.

{: .definition-title }
> **定義 (相互情報量)**
>
> 有限集合$\calX,\calY$上に値をとる確率変数$X,Y$に対して, 以下で定義される量$I(X;Y)$を$X$と$Y$の**相互情報量 (mutual information)**という:
>
> $$
  \begin{align*}
    I(X;Y) = \entropy(X) - \entropy(X\mid Y) = \entropy(Y) - \entropy(Y\mid X) = \entropy(X) + \entropy(Y) - \entropy(X,Y).
  \end{align*}
> $$

相互情報量は$X$と$Y$の間の依存関係の強さを測ります. $I(X;Y) = 0$となるのは$X$と$Y$が独立なときです.

## チェインルール

エントロピーに関する基本的な関係式であるチェインルールを紹介します.

{: .proposition-title }
> **命題 (チェインルール)**
>
> 確率変数$X_1,\dots,X_n$に対して
> 
> $$
  \begin{align*}
    \entropy(X_1,\dots,X_n) = \sum_{i=1}^n \entropy(X_i\mid X_1,\dots,X_{i-1}).
  \end{align*}
> $$
>
> 特に, 二つの確率変数$X,Y$に対しては
>
> $$
  \begin{align*}
    \entropy(X,Y) = \entropy(X) + \entropy(Y\mid X).
  \end{align*}
> $$

## データ処理不等式

情報処理における基本的な不等式であるデータ処理不等式を紹介します.

{: .proposition-title }
> **命題 (データ処理不等式)**
>
> 確率変数$X,Y,Z$が$X \to Y \to Z$のマルコフ連鎖をなすとき (すなわち, $Z$は$Y$を通してのみ$X$に依存するとき)
> 
> $$
  \begin{align*}
    \entropy(X\mid Z) \ge \entropy(X\mid Y).
  \end{align*}
> $$

この不等式は, 情報を処理する過程で条件付きエントロピーが減少しないことを示しています. つまり, 情報処理によって$X$の不確実性は増加する可能性はあるが, 減少することはないことを意味します.

## 劣モジュラ性と劣加法性

エントロピーは劣モジュラ性と劣加法性という重要な性質を持ちます. 本質的には[KLダイバージェンス]({{site.baseurl}}/docs/tools/kl_divergence)の優モジュラ性なのですが, これらの性質は様々な証明で重要な役割を果たします.

{: .proposition-title }
> **命題 (劣モジュラ性)**
>
> 確率変数$X,Y,Z$に対して
> 
> $$
  \begin{align*}
    \entropy(X\mid Y,Z) \le \entropy(X\mid Y).
  \end{align*}
> $$

つまり, 追加の情報$Z$を得ることで$X$の条件付きエントロピーは減少することを意味します.
**劣モジュラ性(限界効用逓減性)**とは, ある集合に要素を追加することによる効用の増加分が, 既に多くの要素が含まれている場合には小さくなるという性質です.
例えば物凄くお腹が空いているときに一口の食事を取ることは大きな効用をもたらしますが, 既に満腹状態である場合には同じ一口の食事はあまり効用をもたらしません.
上記の命題では, 「$Y$という情報を既に知っている状態で$X$の情報を知ったときの驚き度合い」が, 「$Y$と$Z$という情報を既に知っている状態で$X$の情報を知ったときの驚き度合い」以上であることを示しており, これはまさに劣モジュラ性の概念を反映しています.

{: .proposition-title }
> **命題 (劣加法性)**
>
> 確率変数$X,Y$に対して
> 
> $$
  \begin{align*}
    \entropy(X,Y) \le \entropy(X) + \entropy(Y).
  \end{align*}
> $$
>
> 等号が成り立つのは$X$と$Y$が独立なときである.

劣モジュラ性は, より多くの情報を得ることで不確実性が減少するという直感的な性質を数学的に表現したものです. 劣加法性は, 結合エントロピーが個別のエントロピーの和を超えないことを示しています.
