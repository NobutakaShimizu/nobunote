---
title: NP困難の定義と歴史(コラム)
nav_order: 98
---


# コラム: NP困難の定義と歴史

* TOC
{:toc}

## 概要

Cook帰着 を用いるか, Karp帰着 を用いるかによってNP困難の定義が変わってくる. どちらの定義を採用するかによって重大な違いが生じうるのでまとめておく. また, 「NP困難(NP-hard)」という用語の歴史について説明する. この内容はGarey & Johnson本 (1979) のSection 5.2に基づく.
具体的には

- 判定問題を対象とする理論 (主に計算量理論)
- 探索問題を対象とする理論 (組合せ最適化理論など)

の二つの文脈におけるNP困難性の定義を, これらの分野における以下の標準的な教科書でどう扱っているかを調査した:

- Computational Complexity: A Modern Approach, Arora and Barak, 2007 (計算量理論).
- Computational Complexity: A Conceptual Perspective, Goldreich, 2008 (計算量理論).
- Introduction to the Theory of Computation (3rd ed.), Sipser, 2012 (計算量理論).
- Computational Complexity, Papadimitriou, 2003 (計算量理論).
- Computers and Intractability: A Guide to the Theory of NP-Completeness, Garey and Johnson, 1979 (計算量理論).
- Mathematics and Computation: A Theory Revolutionizing Technology and Science, Wigdreson, 2019 (計算量理論)
- Combinatorial Optimization: Theory and Algorithms (6th ed.), Korte and Vygen, 2018 (組合せ最適化).

---

## 二つの帰着

Cook帰着とKarp帰着のinformalな定義をまとめる.

{: .definition-title }
> **定義1**
>
> 判定問題$L_1,L_2$を考える. ここでは判定問題は指示関数と同一視する.
> - $L_1$ が $L_2$ に **Cook帰着できる** とは, $L_1$ を解く多項式時間オラクルアルゴリズム $A^{L_2}$ が存在することをいう.
> - $L_1$ が $L_2$ に **Karp帰着できる** とは, ある多項式時間アルゴリズム $f\colon \binset^{\ast} \to \binset^{\ast}$ が存在して, 任意の $x \in \binset^{\ast}$ に対して $x \in L_1 \Leftrightarrow f(x) \in L_2$ が成り立つことをいう.

なお, Cook帰着の定義においてオラクルアルゴリズムの計算量を多項式時間に限らないものを考えるときは Turing帰着 と呼ぶこともある. すなわち Cook帰着は多項式時間Turing帰着と同義である.

{: .remark }
> Karp帰着ではインスタンス $x$ の変換前後で答えのYes/Noが保存されているという点がとても重要である. また, 判定問題にのみ定義される.
> 一方でCook帰着では $L_2$ の答えをオラクルに尋ねて, その答えを反転するという操作も許されている.


---

## およそ全ての文脈で共通する定義
クラスNP や NP完全 は決定問題にのみ以下のように定義される.

{: .definition-title }
> **定義2**
>
> NPに属する任意の判定問題 $L'$ が 判定問題 $L$ にKarp帰着でき, さらに $L\in\mathsf{NP}$ であるとき, $L$ は **NP完全**という.

-  この概念が現在の形で初めて厳密に定義したのは Karp (1972)
- Cook (1971) はNPに属する全ての問題が Cook帰着 の意味でSATに帰着できることを示した. Karp (1972) はCookの結果がKarp帰着の下でも成り立つことを示し, 様々な問題のNP完全性を示した.

---

## NP困難の二つの定義 (判定問題)

判定問題 $L$ は, $\mathsf{NP}$ に属する任意の問題に対してそれ以上に難しいとき, NP困難であるといわれる. ここでKarp帰着を使うかCook帰着を使うかによって二つのNP困難性が定義できる. 前者を**Karp型**, 後者を**Cook型**と呼ぶことにする (これらの用語は本稿のローカルな呼称である).

{: .definition-title }
> **定義3**
>
> - NPに属する任意の判定問題 $L'$ が判定問題 $L$ にKarp帰着できるとき, $L$ は **Karp型NP困難**であるという.
> - NPに属する任意の判定問題 $L'$ が判定問題 $L$ にCook帰着できるとき, $L$ は**Cook型NP困難**であるという.

これらの概念を考える動機は, NPよりも上位の階層の判定問題のクラス (PSPACEやPHなど) に対して「NPと同じかそれ以上に難しい」**という性質を捉えたいからである**.

この定義に基づくと, 計算量理論では以下のとても重要な差異が発生する:

> coNP完全な問題はCook型NP困難であるが, $\mathsf{NP}\ne\mathsf{coNP}$ (成り立つと広く信じられている予想) の下ではKarp型NP困難ではない.

すなわち, 「回路$C\colon\binset^n\to\binset$ に対して充足可能割り当てが存在**しない**ならYes, そうでないならNo」というcoNP完全な判定問題がNP困難かどうかが変わってしまう.

---

## 探索問題のNP困難性

探索問題とは, 関係 $R\subseteq\binset^{\ast}\times\binset^{\ast}$ によって定まる問題であり, 直感的には「入力 $x\in\binset^{\ast}$ が与えられたとき, $(x,y)\in R$ を満たす $y\in\binset^{\ast}$ を何でも良いから一つ出力せよ」という問題である. これを**探索問題 $R$** と呼ぶことにする. 関数 $A\colon\binset^{\ast}\to\binset^{\ast}$ が $R$ を解くとは, 任意の $x\in\binset^{\ast}$ に対して $(x,A(x))\in R$ を満たすことをいう.

最適化問題や数え上げ問題など, 判定問題を超えて様々な問題を表現できる. 特に, 判定問題も探索問題の特殊ケースとして表現できる. 具体的には, 判定問題 $L\colon\binset^{\ast}\to\binset$ に対して

$$ R_L:=\set{(x,L(x))\colon x\in\binset^{\ast}}$$

とすれば判定問題として表現できる. この $R_L$ を便宜上, **$L$の探索問題版** と呼ぶことにする.

Karp帰着は判定問題にのみ定義できる帰着の概念であるため, 探索問題に対してKarp型NP困難という性質は定義できない. 一方でCook帰着は探索問題に対しても同様に定義できるので, 探索問題 $R$ に対して Cook型NP困難性の概念は自然に定義できる:

{: .definition-title }
> **定義4**
>
> 二つの探索問題 $R_1,R_2\subseteq\binset^{\ast}\times\binset^{\ast}$ に対して, $R_1$が$R_2$に**Cook帰着できる**とは, ある多項式時間オラクルアルゴリズム $A^{\mathcal{O}}$ が存在して, $R_2$ を解く任意のオラクル$\mathcal{O}\colon\binset^{\ast}\to\binset^{\ast}$ に対して $A^{\mathcal{O}}$ は $R_1$ を解く.
>
> 探索問題 $R$ は以下を満たすとき**Cook型NP困難**であるという:
> あるNP完全な判定問題 $L$ が存在して, $L$の探索問題版 $R_L$ が $R$ にCook帰着できる.

---

## 結論

ここまでの話をまとめると, 探索問題のNP困難性は原則としてCook型NP困難性のみを考え, 判定問題のNP困難性はCook型とKarp型の二つのNP困難性が定義できることになる.

さて, NP困難の定義としてどちらを採用すべきかは文脈によって様々であるが, 素人考えではCook型に統一した方が良さそうに思える. 実際, Knuthは *The Art of Computer Programming (vol. 4)* において, 判定問題のNP困難性をKarp型で定義していた. しかし後になってKnuthはKarp型ではなくCook型で定義するべきであると主張している. これはcoNPの箇所で述べたように, coNP完全な判定問題は任意のNPに属する問題以上に難しいためNP困難であるとするのが自然であると彼は捉えたからである (Garey & Johnson, Section 5.2).

ところが驚くべきことに
- 現代の計算量理論の標準的な教科書の**全て**は判定問題のNP困難性をKarp帰着で定義し, 探索問題に対するNP困難性は定義していない (軽く触れる本はあった).
- 組合せ最適化の本と古典的な書籍 (Garey & Johnson, 1979) は探索問題に対するNP困難性をCook帰着で定義していた.

計算量理論はその研究対象は主に判定問題であり, 答えのYes/Noは非常に重要な意味を持つ. 従って, 変換前後で答えのYes/Noを保つKarp帰着は非常に親和性が高く, かつ帰着の構造が単純で扱いやすいのが理由であると考えられる (実際, Goldreichは自身の著作のDefinition 2.17の直後にそう述べている).

なお, 計算量理論では判定問題以外の問題 (例えば算術回路 $\mathsf{VNP}$ など) を扱うこともあり, その中ではその文脈独自の帰着を定義することによって $\mathsf{VNP}$困難といった概念を定義する. 要するに

> 計算量理論(特に計算量下界)ガチ勢は場面ごとに帰着を定義してそれに基づいて困難性を明確に定めており, 判定問題ならKarp型NP困難性を考える.
> 一方で計算量下界よりも上界(効率的なアルゴリズム設計)をメインとする文脈では判定問題に拘らず, 従ってKarp帰着を考える特段の理由がないのでほぼ, 全ての状況下でNP困難性をCook型で定義している.

ということになる. おそらく幅広い分野で最も主流な定義はCook型NP困難性であるため, **計算量理論の専門的な論文執筆もしくは講義をしない限りはCook型NP困難性をNP困難と呼ぶのが無難**であろう.

---

## 余談: 用語の標準化の歴史

この説の内容はGarey & Johnson (1979) のSection 5.2に基づく. この節で計算量理論のNP-completeとNP-hardの命名について非常に面白い逸話が書いてあったので紹介する.

数学の数多の概念がそうであったように, NP-completeとNP-hardの概念もまた, 様々な論文でそれぞれ別々の呼称が存在した. 最も最初に明確に定義されたのがKarp(1972)であり, その中では明確にNP-completeという用語が記されている. 一方でSahni(1974)ではCook型NP困難な**探索**問題を **P-hard** と呼んでいた (Definition 4).

現在主流の用語が広まったのはKnuthによるところが大きい. 彼が*The Art of Computer Programming (vol. 4)* を執筆する際に計算量の当時の専門家を集めて「どの命名が良いか」について投票を行い議論したようである. まず彼はP-hardの候補を棄却し, 三つの命名に対しどれが良いか投票したようであるが, どうやらその全ては一旦棄却され, 専門家の間で議論が始まったようである.

中には冗談混じりに**PET problem**が良いだろうという意見が出たらしい. PETは **"probably exponential time"** の略である. 一方で仮に $\mathsf{P}=\mathsf{NP}$ であった場合は **"previously exponential time"** の略とすれば良いからである.

上記の命名は全て判定問題のNP困難性についての議論であり, 著者が知る限り, 初めて探索問題に対して今の形のCook型のNP困難性を明確に定義したのは実はGarey & Johnson (1979) と思われる.

ただ, NPの性質を持つ探索問題に対してある種のNP困難性はもっと前のLevin(1973)で行われていた. 探索問題 $R\subseteq\binset^{\ast}\times\binset^{\ast}$ がNPの性質を持つとは, 与えられた $(x,y)$ に対して $(x,y)\in R$ かどうかの判定が多項式時間でできることを意味する (現代の計算量理論ではこの探索問題のクラスは $\mathsf{FNP}$と呼ばれる).

よく知られた事実であるが, 実はCook(1971)とは独立にLevin(1973)もまた独自にクラス$\mathsf{FNP}$ を **sequential search type** と呼び, これに対して「NP困難 (**universal sequential search problem**)」な問題を特定している. 当時は冷戦下であったため彼らの間に交流はなかったのだが, 実はソ連でも **本質的に全探索を必要とする問題 (perebor)** についての研究が行われていたようである (Arora & Barak). 原著論文はロシア語であるが2024年に[Fortnowによる英訳](https://blog.computationalcomplexity.org/2024/08/the-levin-translation.html)を見ると, Definition 1でまさにNP証拠の探索問題に該当する問題をsequential search problemと呼び, Definition 2で非常に制限的な帰着を考えていることがわかる. この帰着では帰着先の問題を解くオラクルを呼び出せる回数は一回に制限されているため, Cook帰着よりはKarp帰着に近いものと思われる.

従って, 探索問題そのもののNP困難性はLevin(1973)で(非常に制限された帰着の下で)取り組まれていたが, より一般のTuring帰着に基づく現代でもよく使われるNP困難性の定義はGarey & Johnson (1979) で与えられたと思われる.