import { TEXT_STYLES } from "../../styles/ui";
import type { TextProps } from "../../types/common";

const Text = ({
  children,
  size = "medium",
  textColor = "black",
  className = "",
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
