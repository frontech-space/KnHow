import { TEXT_STYLES } from "../../styles/ui";
import type { TextProps } from "../../types/common";

const Text: React.FC<TextProps> = ({
  children,
  size = "medium",
  textColor = "black",
  className = "",
}) => {
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
