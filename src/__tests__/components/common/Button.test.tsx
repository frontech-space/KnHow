import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "../../../test/utils/test-utils";
import Button from "../../../components/common/Button";
import { COMMON_STYLES, BUTTON_STYLES } from "../../../styles/ui";

describe("Button Component", () => {
  const noop = vi.fn();

  describe("レンダリング", () => {
    it("子要素のテキストが正しく表示される", () => {
      render(<Button onClick={noop}>Click me</Button>);
      expect(screen.getByText("Click me")).toBeInTheDocument();
    });

    it("buttonタグとしてレンダリングされる", () => {
      render(<Button onClick={noop}>Test</Button>);
      expect(screen.getByText("Test").tagName).toBe("BUTTON");
    });
  });

  describe("デフォルト値", () => {
    it("デフォルトのサイズがmediumである", () => {
      render(<Button onClick={noop}>Default Size</Button>);
      expect(screen.getByText("Default Size")).toHaveClass(
        BUTTON_STYLES.size.medium
      );
    });

    it("デフォルトの背景色がprimaryである", () => {
      render(<Button onClick={noop}>Default Background</Button>);
      expect(screen.getByText("Default Background")).toHaveClass(
        COMMON_STYLES.backgroundColor.primary
      );
    });

    it("デフォルトのテキスト色がwhiteである", () => {
      render(<Button onClick={noop}>Default Text Color</Button>);
      expect(screen.getByText("Default Text Color")).toHaveClass(
        COMMON_STYLES.textColor.white
      );
    });

    it("デフォルトでrounded-mdクラスが適用される", () => {
      render(<Button onClick={noop}>Default Round</Button>);
      expect(screen.getByText("Default Round")).toHaveClass("rounded-md");
    });
  });

  describe("サイズバリエーション", () => {
    it.each(["small", "medium", "large"] as const)(
      'size="%s"が正しく適用される',
      (size) => {
        render(
          <Button onClick={noop} size={size}>
            Size Test
          </Button>
        );
        expect(screen.getByText("Size Test")).toHaveClass(
          BUTTON_STYLES.size[size]
        );
      }
    );
  });

  describe("色バリエーション", () => {
    it.each(["primary", "secondary", "tertiary"] as const)(
      'backgroundColor="%s"が正しく適用される',
      (color) => {
        render(
          <Button onClick={noop} backgroundColor={color}>
            Background Test
          </Button>
        );
        expect(screen.getByText("Background Test")).toHaveClass(
          COMMON_STYLES.backgroundColor[color]
        );
      }
    );

    it.each(["white", "black", "gray"] as const)(
      'textColor="%s"が正しく適用される',
      (color) => {
        render(
          <Button onClick={noop} textColor={color}>
            Text Color Test
          </Button>
        );
        expect(screen.getByText("Text Color Test")).toHaveClass(
          COMMON_STYLES.textColor[color]
        );
      }
    );
  });

  describe("ボーダースタイル", () => {
    it.each(["primary", "secondary", "tertiary"] as const)(
      'borderColor="%s"が正しく適用される',
      (color) => {
        render(
          <Button onClick={noop} borderColor={color}>
            Border Test
          </Button>
        );
        expect(screen.getByText("Border Test")).toHaveClass(
          BUTTON_STYLES.borderColor[color]
        );
      }
    );

    it("isOutline=trueでボーダーが表示される", () => {
      render(
        <Button onClick={noop} isOutline>
          Outline Test
        </Button>
      );
      const button = screen.getByText("Outline Test");
      expect(button).toHaveClass("border");
      expect(button).toHaveClass(BUTTON_STYLES.borderColor.primary);
    });
  });

  describe("形状バリエーション", () => {
    it("isRound=trueで丸型になる", () => {
      render(
        <Button onClick={noop} isRound>
          Round Test
        </Button>
      );
      expect(screen.getByText("Round Test")).toHaveClass("rounded-full");
    });

    it("isRound=falseで通常の角丸になる", () => {
      render(
        <Button onClick={noop} isRound={false}>
          Not Round Test
        </Button>
      );
      expect(screen.getByText("Not Round Test")).toHaveClass("rounded-md");
    });
  });

  describe("ホバー効果", () => {
    it.each(["primary", "secondary", "tertiary", "opacity"] as const)(
      'hoverColor="%s"が正しく適用される',
      (color) => {
        render(
          <Button onClick={noop} hoverColor={color}>
            Hover Test
          </Button>
        );
        expect(screen.getByText("Hover Test")).toHaveClass(
          BUTTON_STYLES.hoverColor[color]
        );
      }
    );
  });

  describe("無効化状態", () => {
    it("isDisabled=trueでボタンが無効化される", () => {
      render(
        <Button onClick={noop} isDisabled>
          Disabled Test
        </Button>
      );
      expect(screen.getByText("Disabled Test")).toBeDisabled();
    });

    it("無効化状態でクリックイベントが発火しない", () => {
      const handleClick = vi.fn();
      render(
        <Button isDisabled onClick={handleClick}>
          Disabled Click Test
        </Button>
      );
      fireEvent.click(screen.getByText("Disabled Click Test"));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("クリックイベント", () => {
    it("クリック時にonClickが呼ばれる", () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click Test</Button>);
      fireEvent.click(screen.getByText("Click Test"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("カスタマイズ", () => {
    it("追加のクラス名が正しく適用される", () => {
      render(
        <Button onClick={noop} className="custom-class">
          Custom Class
        </Button>
      );
      expect(screen.getByText("Custom Class")).toHaveClass("custom-class");
    });

    it("複数のプロパティが同時に適用される", () => {
      render(
        <Button
          onClick={noop}
          size="large"
          backgroundColor="secondary"
          textColor="black"
          isRound
          isOutline
          className="custom-class"
        >
          Multiple Props
        </Button>
      );
      const button = screen.getByText("Multiple Props");
      expect(button).toHaveClass(BUTTON_STYLES.size.large);
      expect(button).toHaveClass(COMMON_STYLES.backgroundColor.secondary);
      expect(button).toHaveClass(COMMON_STYLES.textColor.black);
      expect(button).toHaveClass("rounded-full");
      expect(button).toHaveClass("border");
      expect(button).toHaveClass("custom-class");
    });
  });
});
