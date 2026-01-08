---
title: Chernoffバウンド
parent: 確率集中不等式
nav_order: 4
---

# Chernoffバウンド

* TOC
{:toc}

## 概要

ChernoffバウンドはHoeffdingの不等式と同様に、独立な確率変数の和の集中性を与える不等式である。Hoeffdingの不等式では各確率変数 $X_i$ が $[0,1]$ 区間に収まる場合に成り立つ汎用的な不等式であるが、Chernoffバウンドではさらに $X_i$ の期待値の情報を用いた上界を与えているため、状況によってはHoeffdingの不等式よりも強い上界を与えることができる。

## 定理

{: .theorem-title }
> **定理 (Chernoffバウンド)**
>
> $X_1,\dots,X_n$ を独立な確率変数、 $S=\sum_{i\in[n]}X_i$ とし、任意の $i\in[n]$ に対して $0\le X_i\le 1$ とする。
> このとき、任意の $c \ge 0$ に対して
>  
> $$
  \begin{align*}
    \Pr[S \ge \E[S] + c] &\le \exp\left(-\frac{c^2}{2\E[S] + 2c/3}\right), \\
    \Pr[S \le \E[S] - c] &\le \exp\left(-\frac{c^2}{2\E[S]}\right).
  \end{align*}
> $$

## 二項分布に対するChernoffバウンド

二項分布に対する特別な形のChernoffバウンドも重要である。

{: .theorem-title }
> **定理 (二項分布のChernoffバウンド)**
>
> $X \sim \mathrm{Bin}(n,p)$ とし、 $\mu = np$ とする。このとき、任意の $\delta > 0$ に対して
> 
> $$
  \begin{align}
    \Pr[X \ge (1+\delta)\mu] &\le \exp\left(-\frac{\delta^2\mu}{2+\delta}\right), \\
    \Pr[X \le (1-\delta)\mu] &\le \exp\left(-\frac{\delta^2\mu}{2}\right).
  \end{align}
> $$

## Hoeffdingの不等式との比較

[Hoeffdingの不等式]({{site.baseurl}}/docs/concentration_inequalities/hoeffding)と比較すると、期待値 $\E[S]$ が小さい場合にはChernoffバウンドの方が強い上界を与えることがわかる。

具体的には：
- **Hoeffding**: $\Pr[S \ge \E[S] + c] \le \exp(-2c^2/n)$
- **Chernoff**: $\Pr[S \ge \E[S] + c] \le \exp(-c^2/(2\E[S] + 2c/3))$

$\E[S]$ が小さい場合、Chernoffバウンドの分母 $2\E[S] + 2c/3$ は $n$ よりも小さくなるため、より強い上界を与える。

## 証明

古典的なChernoffバウンドの証明は以下のステップに分かれる：

1. **モーメント母関数の計算**: 各確率変数 $X_i$ のモーメント母関数を計算
2. **独立性の利用**: 独立な確率変数の和のモーメント母関数は各確率変数のモーメント母関数の積
3. **Markovの不等式の適用**: モーメント母関数に対してMarkovの不等式を適用
4. **最適化**: パラメータを最適化して最も良い上界を得る

また、Mulzer (2018)[^Mul18] にはChernoffバウンドの5通りの証明(!)が載っているので、興味があれば参照されたい。

このページでは[KLダイバージェンス]({{site.baseurl}}/docs/information_theory/f_divergence/kl_divergence)に基づいた簡潔な証明を紹介する。
具体的には以下の主張を証明する：

{: .theorem-title }
> **定理 (ChernoffバウンドのKLダイバージェンス版)**
>
> $X_1,\dots,X_n$ を独立な確率変数、 $S=\sum_{i\in[n]}X_i$ とし、任意の $i\in[n]$ に対して $0\le X_i\le 1$ とする。
> このとき、任意の $\delta > 0$ に対して
> 
> $$  \begin{align}
    &\Pr[S \ge (1+\delta)\E[S]] \le \exp\left(-\KLbin{(1+\delta)\E[S]}{\E[S]}\right), \\
    &\Pr[S \le (1-\delta)\E[S]] \le \exp\left(-\KLbin{(1-\delta)\E[S]}{\E[S]}\right).
  \end{align} $$
>
> ここで、 $p,q\in[0,1]$ に対し $\KLbin{p}{q}=\KL{\Ber(p)}{\Ber(q)}$ はベルヌーイ試行のKLダイバージェンスを表す。

$\KLbin{p}{q}$ を二値KLダイバージェンスと呼ぶ。
定義より

$$
  \begin{align*}
    \KLbin{p}{q} &= p\ln\frac{p}{q} + (1-p)\ln\frac{1-p}{1-q}.
  \end{align*}
$$

である。

<details markdown="1" style="background-color: #eee;">
<summary style="display: list-item">証明</summary>
  
  片側の不等式（一つ目の不等式）だけ示す。
  確率変数 $X=(X_1,\dots,X_n)$ を考える。ただし各 $X_i\in[0,1]$ は独立とする。
  事象 $S\ge (1+\delta)\E[S]$ を $\calB$ と表し、 $\calB$ で条件つけたときの
  確率変数を $X':=X|\calB$ と表す（イメージとしては、 $\calB$ は発生してほしくないイベントである）。
  条件付き確率なので、各 $x\in\calB$ に対しては $\Pr[X'=x]=\Pr\qty[X=x \mid \calB]=\Pr[X=x]/\Pr[\calB]$ となる。

  このとき, KLダイバージェンスの定義から

  $$  \begin{align*}
      \KL{X'}{X} &= \E_{x\sim X'}\qty[\ln\frac{\Pr[X'=x]}{\Pr[X=x]}] \\
      &= \sum_{x} \Pr[X'=x] \cdot \ln\frac{\Pr[X'=x]}{\Pr[X=x]} \\
      &= \sum_{x\in \calB} \frac{\Pr[X=x]}{\Pr[\calB]} \cdot \ln\frac{\Pr[X=x]/\Pr[\calB]}{\Pr[X=x]} \\
      &= \sum_{x\in \calB} \frac{\Pr[X=x]}{\Pr[\calB]} \cdot \ln\frac{1}{\Pr[\calB]} \\
      &= \ln\frac{1}{\Pr[\calB]}.
    \end{align*}  $$

  が成り立つ。すなわち $\KL{X'}{X}$ の下界を求めればよいことになる。

  証明に戻る前に, 一般的な事実として, $[0,1]$値をとる確率変数$Z$について

  $$
    \begin{align*}
      \KL{Z'}{Z} &\ge \KLbin{\E[Z']}{\E[Z]}. \tag{1}
    \end{align*}
  $$

  が成り立つ。これはデータ処理不等式から従う（ $Z \mapsto \Ber(\E[Z])$ という乱択関数に対して適用）。
  

  ベクトル $y=(y_1,\dots,y_n)$ に対し、 $y_{\le i}$ を $(y_1,\dots,y_i)$ と表すことにする。
  確率変数 $I\sim[n]$ を $[n]$ 上一様ランダムな確率変数とし、 $\E_I[X_I]$ を $X_1,\dots,X_n$ の分布としての凸結合とする。
  $X=(X_1,\dots,X_n)$ と $X'=(X'_1,\dots,X'_n)$ に対してKLダイバージェンスのチェインルールを適用すると

  $$
    \begin{align*}
      \KL{X'}{X} &= \sum_{i=1}^n \KL{X'_{\le i} \mid X'_{\le i-1}}{X_{\le i} \mid X_{\le i-1}} \\
      &\ge \sum_{i=1}^n \KL{X'_i}{X_i} & & \text{条件つきKLの性質}\\
      &\ge n\cdot \KL{\E_{I\sim [n]}[X'_I]}{\E_{I\sim[n]}[X_I]} & & \text{KLの凸性}\\
      &\ge n\cdot \KLbin{\E\qty[\frac{1}{n}\sum_i X'_i]}{\E\qty[\frac{1}{n}\sum_i X_i]} & & \text{(1)} \\
      &\ge n\cdot \KLbin{(1+\delta)\E[S]}{\E[S]}.
    \end{align*}
  $$
  
  以上より証明を得ます.

  最後の不等式では、 $p\ge p' \ge q' \ge q$ に対して $\KLbin{p}{q}\ge\KLbin{p'}{q'}$ を用いた。
  
</details>



---

## 参考文献

[^Mul18]: Mulzer, W. (2018). Five Proofs of Chernoff's Bound with Applications. *Bulletin of EATCS*. [リンク](https://bulletin.eatcs.org/index.php/beatcs/article/view/525)