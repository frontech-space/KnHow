import React from "react";

// サイズ指定
export type size = "small" | "medium" | "large";
// 背景色指定
export type backgroundColor = "primary" | "secondary" | "tertiary";
// テキスト色指定
export type textColor = "white" | "black" | "gray" | "red" | "wine-red";
// ボーダー色指定
export type borderColor = "primary" | "secondary" | "tertiary";
// ホバー色指定
export type hoverColor = "primary" | "secondary" | "tertiary" | "opacity";

// ボタンの型
export interface ButtonProps {
  children: React.ReactNode;
  size?: size;
  backgroundColor?: backgroundColor;
  borderColor?: borderColor;
  textColor?: textColor;
  hoverColor?: hoverColor;
  isDisabled?: boolean;
  isRound?: boolean;
  isOutline?: boolean;
  onClick: () => void;
  className?: string;
}

// 入力フォームの型
export interface InputProps {
  size?: size;
  backgroundColor?: backgroundColor;
  borderColor?: borderColor;
  textColor?: textColor;
  hoverColor?: hoverColor;
  isDisabled?: boolean;
  isRound?: boolean;
  isOutline?: boolean;
  className?: string;
  placeholder?: string;
  type?: string;
  name?: string;
  id?: string;
}

//　テキストの型
export interface TextProps {
  children: React.ReactNode;
  size?: size;
  textColor?: textColor;
  className?: string;
}

// 画像の型
export interface ImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  lazy?: boolean;
}

