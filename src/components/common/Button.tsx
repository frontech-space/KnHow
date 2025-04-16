import { COMMON_STYLES, BUTTON_STYLES } from "../../constants/styles";
import type { ButtonProps } from "../../types/common";

const Button: React.FC<ButtonProps> = ({
  size = "medium", // ボタンのサイズ
  backgroundColor = "primary", // ボタンの背景色
  borderColor = "primary", // ボタンのボーダー色
  textColor = "white", // ボタンのテキスト色
  hoverColor = "secondary", // ボタンのホバー色
  isDisabled = false, // ボタンが無効化されているかどうか
  isRound = false, // ボタンが丸くなっているかどうか
  isOutline = false, // ボタンが枠線を持っているかどうか
  onClick, // ボタンがクリックされたときの処理
  children, // ボタンの中身
  className = "", // ボタンのクラス名
}) => {
  return (
    <button
      className={`${isRound ? "rounded-full" : "rounded-md"} ${
        isOutline ? `border ${BUTTON_STYLES.borderColor[borderColor]}` : ""
      } ${BUTTON_STYLES.size[size]} ${
        COMMON_STYLES.backgroundColor[backgroundColor]
      }
      ${BUTTON_STYLES.borderColor[borderColor]}
      ${COMMON_STYLES.textColor[textColor]} ${className}
      ${BUTTON_STYLES.hoverColor[hoverColor]}
      `}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Button;
