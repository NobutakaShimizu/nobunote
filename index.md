---
title: ホーム
layout: home
nav_order: 1
description: "講義トップ"
---

講義資料用のテンプレートです.
テンプレートの大元は[just-the-docs](https://github.com/just-the-docs/just-the-docs)です.
マークダウンで資料を記述できます. また数式はmathjaxで書けます.

# 全体の大まかな流れ

マークダウンで書かれたページのファイルをローカルの環境でjekyllと呼ばれるソフトでコンパイルのような作業(htmlファイルやcssなどの生成)を行った後にリポジトリのmainブランチにプッシュするとGithub Actionを経由して更新が反映されるようになっています.
具体的には, Settings/PagesのBuild and deploymentの欄をGithub Actionsにした後にプッシュすれば良いです.

{: align="center"}
![Github Actionの設定](assets/images/setting.png){: width="30%"}

ローカルでページプレビューするにはjekyllを使ってページビルドする必要があり, そのためにはrubyの環境構築が必要になります. そのための手順は以下に記しておきます (macを想定).


# ローカルの環境設定方法

## 手元で動かすのに必要なもの
- Ruby
  - rbenvでRubyのバージョン管理をするのが楽 (Pythonでいうところのpyenvみたいなもの).
  - rbenvは, homebrewであれば `brew install rbenv` でインストールできます.
  - rbenvを使ってRubyのバージョンを新しくしたい場合と手順を以下に記します.
    1. `rbenv install -l` でインストールできるバージョンの一覧を取得して
    2. `rbenv install バージョン番号` でインストールして
    3. `rbenv global バージョン番号` でインストールしたバージョンをデフォルトに設定
    4.  ~/.bash_profileに `eval "$(rbenv init -)"` を追記し, ターミナルで `source ~/.bash_profile` を実行.
    5.  `ruby -v` でRubyがちゃんと指定したバージョンになっているかを確認
- RubyGems
  - bundle を `gem install bundler` でインストール
  - bundleのバージョンは `gem install bundler` でアップグレードできます.

Jekyllをインストールし, ターミナルでフォルダに移動し
```console
  bundle install
  bundle exec jekyll serve --livereload
```
これによって, http://127.0.0.1:4000/ をブラウザで開くと書いたものをプレビューすることができます. ファイルを編集し保存するとブラウザ上の表示も自動的に更新されるはずです (自動更新をオフにしたい場合はオプション `--livereload` を消してください).

PCにあれこれインストールしたくない場合はdockerコンテナを使う方法もあります (dockerはインストールする必要あり).


# マークダウンファイルの場所

- この文章は/index.mdに記述されており, トップページはこれを編集してください.
- 講義資料は基本的に /doc/ に記述していきます. /doc/にフォルダを作成し, 各回ごとに整理することもできます.
  - 例えば /doc/第1回/講義1.md という構成になります. また, /doc/第1回/にindex.mdというファイルを作成しておくことによって, 各回ごとのトップページを作成することができます.
- サイトの様々な設定は/_config.ymlを編集してください. 例えば以下の要素を変更できます.
  - ページタイトル
  - 右上の「製作者: 清水 伸高」
  - 最下部の「Copyright © 2024 Nobutaka Shimizu. This site is powered by Github Pages.」
- baseurlの内容はリポジトリ名, urlの内容はhttps://GitHubのアカウント名.github.io にしないとGitHub Pagesに公開できません.
  ```yml
    baseurl: "/lecture_template" # /リポジトリ名
    url: "https://nobutakashimizu.github.io" # https://アカウント名.github.io
  ``` 

# 数式の記述
例えば
```markdown
  グラフ$G=(V,E)$を考える.
```
というインラインに数式を含む文は

グラフ$G=(V,E)$を考える.

のように表示されます. 複数行にまたがる式変形などは
```text

$$
  \begin{align*}
    a &= b \\
      &= c
  \end{align*}
$$

```

と書けば

$$
  \begin{align*}
    a &= b \\
      &= c
  \end{align*}
$$

と表示されます (念の為, 最初と最後の`$$`の前後には一行空けておくと良いです.)

# 定理環境

定義などを述べるためのコールアウトは以下のように記述できます.

{: .definition }
> このボックスには**定義**を記します. 以下のように, 数式ボックスを内部に含めることができます:
>
>  $$
    \begin{align*}
      A_{u,v} = \begin{cases}
        1	& \text{if $\{u,v\} \in E$}, \\
        0 & \text{otherwise}.
      \end{cases}
    \end{align*}
>  $$
  
また, 以下のようにタイトルを自由に付与することができます.

{: .definition-title }
> 定義 (タイトル)
>
> 定義の例.

他にも命題,補題,定理,系のボックスが使えます.

{: .proposition }
> このボックスには**命題**を記します.

<details>
<summary style="display: list-item">証明</summary>

  このように, 折りたためる証明も書けます.
  内部でもインライン(例えば$a=b$)や独立した数式ブロックが書けます.
  $$
    \begin{align*}
      a &= b \\
        &= c.
    \end{align*}
  $$
  しかし, なぜかマークダウンはかけません.
  この中で強調表示したい場合は, 苦肉の策ですが, htmlタグを使って<b>装飾</b>しましょう.

  $\square$
</details>

{: .theorem }
> このボックスには定理(特に重要度の高い命題)を記します.

{: .lemma }
> このボックスには命題や定理を示すために必要な補助的な主張を記します

{: .corollary }
> このボックスには定理や命題などから直ちに成り立つ結果を記します.

{: .remark }
> このボックスには強調したい注釈が入ります.


## 新たなコールアウトの定義方法
他のボックス(例えば観察,未解決問題用のコールアウトなど)を自身で追加したいときは以下の二つのファイルを適切に編集してください.
- /_config.yml (コールアウトの宣言)
- /just-the-docs/_sass/support/_variables.scss (背景や文字の色の定義)

# 注意事項
- 手元の実行環境に依存しますが, 少なくとも私の環境では講義資料を格納するフォルダ名に全角文字を使うとlivereload機能にエラーが生じてしまいましたので, 念の為フォルダ明は半角にした方が良いと思います (ファイル名は全角でも大丈夫だった)
- 画像を挿入する際, jekyllの「コンパイル」作業によって画像ファイル自体が別の場所に移動するため相対パスで指定すると良いです. ただし, 本来よりも一つ上のパスを指定する必要があり, 少し直感に反するので注意してください (第1回の例参照).
- 数式の記述において, 記法の競合を避けるためLaTeXとは少し異なる記法をする可能性があります.
  - 例えば中括弧$\\{\\}$は```\{ \}```ではなく```\\{ \\}```とする必要があります.
  - また, 絶対値の記号$\lvert \rvert$では```||```ではなく```\lvert \rvert```を使わなければ正しくレンダリングされない可能性があります.