import { TEXT_STYLES } from "../../styles/ui";
import type { TextProps } from "../../types/common";

const Text = ({
  children, // テキストの内容
  size = "medium", // テキストのサイズ
  textColor = "black", // テキストの色
  className = "", // テキストのクラス名
}: TextProps) => {
  return (
    <p
      className={`
        ${TEXT_STYLES.size[size]}
        ${TEXT_STYLES.textColor[textColor]}
        ${className}
      `}
    >
      {children}
    </p>
  );
};

export default Text;
