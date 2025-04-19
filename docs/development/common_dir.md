# 共通コンポーネント使用ガイド

このドキュメントでは、`src/components/common`ディレクトリに配置されている再利用可能な共通コンポーネントの使い方を説明します。

## 目次

1. [Button](#button) - ボタンコンポーネント
2. [Input](#input) - 入力フォームコンポーネント
3. [Text](#text) - テキストコンポーネント
4. [Image](#image) - 画像コンポーネント

---

## Button

ボタンコンポーネントは、アプリケーション全体で一貫したデザインのボタンを提供します。

### インポート方法

```tsx
import Button from "../components/common/Button";
```

### プロパティ

| プロパティ名       | 型                   | デフォルト値  | 説明                                  |
|---------------|----------------------|----------|-------------------------------------|
| children      | React.ReactNode      | (必須)     | ボタン内のコンテンツ                       |
| size          | "small" \| "medium" \| "large" | "medium" | ボタンのサイズ                          |
| backgroundColor | "primary" \| "secondary" \| "tertiary" | "primary" | ボタンの背景色                          |
| borderColor   | "primary" \| "secondary" \| "tertiary" | "primary" | ボタンのボーダー色                        |
| textColor     | "white" \| "black" \| "gray" \| "red" \| "wine-red" | "white"   | ボタンのテキスト色                        |
| hoverColor    | "primary" \| "secondary" \| "tertiary" \| "opacity" | "secondary" | ホバー時の色                           |
| isDisabled    | boolean              | false    | ボタンを無効にするかどうか                     |
| isRound       | boolean              | false    | 角丸にするかどうか                         |
| isOutline     | boolean              | false    | アウトラインスタイルにするかどうか                 |
| onClick       | () => void           | (必須)     | クリック時のコールバック関数                    |
| className     | string               | ""       | 追加のCSSクラス                         |

### 使用例

```tsx
// 基本的な使い方
<Button onClick={() => console.log('クリックされました')}>
  クリック
</Button>

// カスタマイズ例
<Button 
  size="large"
  backgroundColor="tertiary"
  textColor="black"
  isRound={true}
  isOutline={true}
  onClick={() => console.log('カスタムボタンがクリックされました')}
>
  カスタムボタン
</Button>
```

---

## Input

入力フォームコンポーネントは、アプリケーション全体で一貫したデザインの入力フィールドを提供します。

### インポート方法

```tsx
import Input from "../components/common/Input";
```

### プロパティ

| プロパティ名       | 型                   | デフォルト値  | 説明                                  |
|---------------|----------------------|----------|-------------------------------------|
| size          | "small" \| "medium" \| "large" | "medium" | 入力フォームのサイズ                      |
| backgroundColor | "primary" \| "secondary" \| "tertiary" | "primary" | 入力フォームの背景色                      |
| borderColor   | "primary" \| "secondary" \| "tertiary" | "primary" | 入力フォームのボーダー色                    |
| textColor     | "white" \| "black" \| "gray" \| "red" \| "wine-red" | "white"   | 入力フォームのテキスト色                    |
| hoverColor    | "primary" \| "secondary" \| "tertiary" \| "opacity" | "secondary" | ホバー時の色                           |
| isDisabled    | boolean              | false    | 入力フォームを無効にするかどうか                 |
| isRound       | boolean              | false    | 角丸にするかどうか                         |
| isOutline     | boolean              | false    | アウトラインスタイルにするかどうか                 |
| placeholder   | string               | ""       | プレースホルダーテキスト                     |
| type          | string               | "text"   | 入力タイプ（"text", "password"など）        |
| name          | string               | ""       | 入力フォームの名前                        |
| id            | string               | ""       | 入力フォームのID                        |
| className     | string               | ""       | 追加のCSSクラス                         |

### 使用例

```tsx
// 基本的な使い方
<Input placeholder="ここに入力してください" />

// カスタマイズ例
<Input 
  size="medium"
  backgroundColor="tertiary"
  textColor="black"
  isRound={true}
  isOutline={true}
  placeholder="検索..."
  type="search"
  name="search"
  id="search-field"
/>
```

**注意**: 現在のInputコンポーネントは制御されていないコンポーネントです。値を管理するには、`value`と`onChange`ハンドラを追加する必要があります。

---

## Text

テキストコンポーネントは、アプリケーション全体で一貫したテキストスタイルを提供します。

### インポート方法

```tsx
import Text from "../components/common/Text";
```

### プロパティ

| プロパティ名       | 型                   | デフォルト値  | 説明                                  |
|---------------|----------------------|----------|-------------------------------------|
| children      | React.ReactNode      | (必須)     | テキストコンテンツ                        |
| size          | "small" \| "medium" \| "large" | "medium" | テキストのサイズ                        |
| textColor     | "white" \| "black" \| "gray" \| "red" \| "wine-red" | "black"   | テキストの色                           |
| className     | string               | ""       | 追加のCSSクラス                         |

### 使用例

```tsx
// 基本的な使い方
<Text>これは通常のテキストです</Text>

// カスタマイズ例
<Text 
  size="large"
  textColor="wine-red"
  className="font-bold"
>
  強調されたワインレッドの大きなテキスト
</Text>
```

---

## Image

画像コンポーネントは、最適化された画像表示を提供します。

### インポート方法

```tsx
import Image from "../components/common/Image";
```

### プロパティ

| プロパティ名       | 型                   | デフォルト値  | 説明                                  |
|---------------|----------------------|----------|-------------------------------------|
| src           | string               | (必須)     | 画像のURL                            |
| alt           | string               | (必須)     | 代替テキスト（アクセシビリティのために必須）           |
| width         | number \| string     | undefined | 画像の幅                              |
| height        | number \| string     | undefined | 画像の高さ                             |
| className     | string               | ""       | 追加のCSSクラス                         |
| lazy          | boolean              | true     | 遅延読み込みを有効にするかどうか                 |

### 使用例

```tsx
// 基本的な使い方
<Image 
  src="/assets/images/logo.png"
  alt="ロゴ"
/>

// カスタマイズ例
<Image 
  src="/assets/images/hero.jpg"
  alt="ヒーロー画像"
  width={1200}
  height={600}
  className="rounded-lg shadow-md"
  lazy={false} // 優先して読み込み
/>
```

---

## スタイルカスタマイズ

すべてのコンポーネントは、`tailwind.config.js`、`src/styles/ui.ts`、および`src/types/common.ts`で定義されたスタイル設定に依存しています。コンポーネントの見た目を一括で変更したい場合は、これらのファイルを編集してください。

## 拡張方法

新しいバリエーションやプロパティを追加する場合は、以下のステップを実行してください：

1. `src/types/common.ts`で関連する型定義を更新
2. `src/styles/ui.ts`でスタイル定義を追加
3. 各コンポーネントファイルでロジックとレンダリングの部分を更新 