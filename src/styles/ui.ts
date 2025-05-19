import {
  backgroundColor,
  borderColor,
  hoverColor,
  size,
  textColor,
} from "../types/common";

// スタイル用の型定義
type StyleRecord<T extends string, V = string> = Record<T, V>;

// UIコンポーネント共通スタイル
export const COMMON_STYLES = {
  backgroundColor: {
    primary: "bg-black",
    secondary: "bg-gray-500",
    tertiary: "bg-white",
  } as StyleRecord<backgroundColor>,

  textColor: {
    white: "text-white",
    black: "text-black",
    gray: "text-gray-500",
    red: "text-red-500",
    "wine-red": "text-wine-red",
  } as StyleRecord<textColor>,
};

// ボタンコンポーネントスタイル
export const BUTTON_STYLES = {
  size: {
    small: "text-sm px-5 py-2",
    medium: "text-base px-7 py-3",
    large: "text-lg px-9 py-4",
  } as StyleRecord<size>,

  borderColor: {
    primary: "border-black",
    secondary: "border-gray-500",
    tertiary: "border-white",
  } as StyleRecord<borderColor>,

  hoverColor: {
    primary: "hover:bg-black",
    secondary: "hover:bg-gray-500",
    tertiary: "hover:bg-white",
    opacity: "hover:bg-opacity-30",
  } as StyleRecord<hoverColor>,
};

// 入力フォームコンポーネントスタイル
export const INPUT_STYLES = {
  size: {
    small: "text-sm px-8 py-2",
    medium: "text-base px-12 py-3",
    large: "text-lg px-16 py-4",
  } as StyleRecord<size>,

  borderColor: {
    primary: "border-black",
    secondary: "border-gray-500",
    tertiary: "border-white",
  } as StyleRecord<borderColor>,

  hoverColor: {
    primary: "hover:border-black",
    secondary: "hover:border-gray-500",
    tertiary: "hover:border-white",
    opacity: "hover:border-opacity-30",
  } as StyleRecord<hoverColor>,
};

//　テキストコンポーネントスタイル
export const TEXT_STYLES = {
  size: {
    small: "text-lg",
    medium: "text-3xl",
    large: "text-5xl",
  } as StyleRecord<size>,

  textColor: {
    white: "text-white",
    black: "text-black",
    gray: "text-gray-500",
    red: "text-red-500",
    "wine-red": "text-wine-red",
  } as StyleRecord<textColor>,
};
