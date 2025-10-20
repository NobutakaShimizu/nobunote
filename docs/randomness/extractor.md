---
layout: default
title: ランダムネス抽出器
parent: ランダムネス
nav_order: 1
---

# ランダムネス抽出機

* TOC
{:toc}

## 概要

ランダムネス抽出器(randomness extractor)とは, エントロピーの低い乱数源と短いランダムシードから, 高エントロピーなランダムビット列を生成する関数(アルゴリズム)です.

## 定義

ランダムネス抽出器を定義するために, この文脈で用いられる[最小エントロピー]({{site.baseurl}}/docs/information_theory/min_entropy)の概念が必要です.

ランダムネス抽出器は, 二つの乱数元$X,Y$を入力として受け取り, 一様分布に[統計距離]({{site.baseurl}}/docs/information_theory/f_divergence/statistical_distance)の意味で近い新たな乱数を生成する関数として定義されます.

{: .definition-title }
> **定義 (ランダムネス抽出器)**
>
> 関数$\Ext\colon\binset^m\times\binset^d\to\binset^n$は以下の性質を満たすとき, **$(k,\varepsilon)$-ランダムネス抽出器**であるという:
> 最小エントロピーが少なくとも$k$であるような$\binset^m$上に値をとる任意の確率変数$X$と$\binset^d$上の一様分布に従う確率変数$U$に対し, 確率変数$\Ext(X,U)$の分布が$\binset^n$上の一様分布に対して統計距離が高々$\varepsilon$である.


