import React from "react";

// サイズ指定
export type size = "small" | "medium" | "large";
// 背景色指定
export type backgroundColor = "primary" | "secondary" | "tertiary";
// テキスト色指定
export type textColor = "white" | "black";
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
