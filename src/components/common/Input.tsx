import type { InputProps } from "../../types/common";
import { INPUT_STYLES, COMMON_STYLES } from "../../styles/ui";

const Input = ({
  size = "medium", // 入力フォームのサイズ
  backgroundColor = "primary", // 入力フォームの背景色
  borderColor = "primary", // 入力フォームのボーダー色
  textColor = "white", // 入力フォームのテキスト色
  hoverColor = "secondary", // 入力フォームのホバー色
  isDisabled = false, // 入力フォームが無効化されているかどうか
  isRound = false, // 入力フォームが丸くなっているかどうか
  isOutline = false, // 入力フォームが枠線を持っているかどうか
  placeholder = "", // 入力フォームのプレースホルダー
  type = "text", // 入力フォームの型
  name = "", // 入力フォームの名前
  id = "", // 入力フォームのID
  className = "", // 入力フォームのクラス名
}: InputProps) => {
  return (
    <input
      className={`${isRound ? "rounded-full" : "rounded-md"} ${
        isOutline ? `border ${INPUT_STYLES.borderColor[borderColor]}` : ""
      } ${COMMON_STYLES.backgroundColor[backgroundColor]} ${
        COMMON_STYLES.textColor[textColor]
      } ${INPUT_STYLES.size[size]} ${
        INPUT_STYLES.hoverColor[hoverColor]
      } ${className}`}
      disabled={isDisabled}
      placeholder={placeholder}
      type={type}
      name={name}
      id={id}
    />
  );
};

export default Input;
