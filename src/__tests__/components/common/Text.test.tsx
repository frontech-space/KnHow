import { describe, it, expect } from "vitest";
import { render, screen } from "../../../test/utils/test-utils";
import Text from "../../../components/common/Text";
import { TEXT_STYLES } from "../../../styles/ui";

describe("Text Component", () => {
  describe("レンダリング", () => {
    it("子要素のテキストが正しく表示される", () => {
      render(<Text>Hello Test</Text>);
      expect(screen.getByText("Hello Test")).toBeInTheDocument();
    });

    it("pタグとしてレンダリングされる", () => {
      render(<Text>Test</Text>);
      expect(screen.getByText("Test").tagName).toBe("P");
    });
  });

  describe("デフォルト値", () => {
    it("デフォルトのサイズがmediumである", () => {
      render(<Text>Default Size</Text>);
      expect(screen.getByText("Default Size")).toHaveClass(
        TEXT_STYLES.size.medium
      );
    });

    it("デフォルトの色がblackである", () => {
      render(<Text>Default Color</Text>);
      expect(screen.getByText("Default Color")).toHaveClass(
        TEXT_STYLES.textColor.black
      );
    });

    it("デフォルトで空のクラス名が適用される", () => {
      const { container } = render(<Text>Default Class</Text>);
      const textElement = container.firstChild as HTMLElement;
      expect(textElement.className).not.toContain("undefined");
      expect(textElement.className).not.toContain("null");
    });
  });

  describe("サイズバリエーション", () => {
    it.each(["small", "medium", "large"] as const)(
      'size="%s"が正しく適用される',
      (size) => {
        render(<Text size={size}>Size Test</Text>);
        expect(screen.getByText("Size Test")).toHaveClass(
          TEXT_STYLES.size[size]
        );
      }
    );
  });

  describe("カラーバリエーション", () => {
    it.each(["white", "black", "gray", "red", "wine-red"] as const)(
      'textColor="%s"が正しく適用される',
      (color) => {
        render(<Text textColor={color}>Color Test</Text>);
        expect(screen.getByText("Color Test")).toHaveClass(
          TEXT_STYLES.textColor[color]
        );
      }
    );
  });

  describe("カスタマイズ", () => {
    it("追加のクラス名が正しく適用される", () => {
      render(<Text className="custom-class">Custom Class</Text>);
      expect(screen.getByText("Custom Class")).toHaveClass("custom-class");
    });

    it("複数のプロパティが同時に適用される", () => {
      render(
        <Text size="large" textColor="red" className="custom-class">
          Multiple Props
        </Text>
      );
      const element = screen.getByText("Multiple Props");
      expect(element).toHaveClass(TEXT_STYLES.size.large);
      expect(element).toHaveClass(TEXT_STYLES.textColor.red);
      expect(element).toHaveClass("custom-class");
    });
  });
});
