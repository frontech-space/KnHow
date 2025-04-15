import { TEXT_STYLES } from "~/constants/styles";
import type { TextProps } from "~/types/common";

const Text = ({
  children,
  size = "medium",
  textColor = "black",
  className = " ",
}: TextProps) => {
  const classes = `
  ${TEXT_STYLES.size[size]}
  ${TEXT_STYLES.textColor[textColor]}
  ${className}
  `;

  return <p className={className}>{children}</p>;
};
export default Text;
