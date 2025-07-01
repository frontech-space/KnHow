import { describe, it, expect } from "vitest";
import { render, screen } from "../../../test/utils/test-utils";
import Input from "../../../components/common/Input";
import { INPUT_STYLES, COMMON_STYLES } from "../../../styles/ui";

describe("Input Component", () => {
  describe("レンダリング", () => {
    it("inputタグとしてレンダリングされる", () => {
      render(<Input />);
      const input = screen.getByRole("textbox");
      expect(input.tagName).toBe("INPUT");
    });

    it("type属性が正しく設定される", () => {
      render(<Input type="email" />);
      expect(screen.getByRole("textbox")).toHaveAttribute("type", "email");
    });
  });

  describe("デフォルト値", () => {
    it("デフォルトのサイズがmediumである", () => {
      render(<Input />);
      expect(screen.getByRole("textbox")).toHaveClass(INPUT_STYLES.size.medium);
    });

    it("デフォルトの背景色がprimaryである", () => {
      render(<Input />);
      expect(screen.getByRole("textbox")).toHaveClass(
        COMMON_STYLES.backgroundColor.primary
      );
    });

    it("デフォルトのテキスト色がwhiteである", () => {
      render(<Input />);
      expect(screen.getByRole("textbox")).toHaveClass(
        COMMON_STYLES.textColor.white
      );
    });

    it("デフォルトでrounded-mdクラスが適用される", () => {
      render(<Input />);
      expect(screen.getByRole("textbox")).toHaveClass("rounded-md");
    });

    it("デフォルトでtype=textが設定される", () => {
      render(<Input />);
      expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
    });
  });

  describe("サイズバリエーション", () => {
    it.each(["small", "medium", "large"] as const)(
      'size="%s"が正しく適用される',
      (size) => {
        render(<Input size={size} />);
        expect(screen.getByRole("textbox")).toHaveClass(
          INPUT_STYLES.size[size]
        );
      }
    );
  });

  describe("色バリエーション", () => {
    it.each(["primary", "secondary", "tertiary"] as const)(
      'backgroundColor="%s"が正しく適用される',
      (color) => {
        render(<Input backgroundColor={color} />);
        expect(screen.getByRole("textbox")).toHaveClass(
          COMMON_STYLES.backgroundColor[color]
        );
      }
    );

    it.each(["white", "black", "gray"] as const)(
      'textColor="%s"が正しく適用される',
      (color) => {
        render(<Input textColor={color} />);
        expect(screen.getByRole("textbox")).toHaveClass(
          COMMON_STYLES.textColor[color]
        );
      }
    );
  });

  describe("ボーダースタイル", () => {
    it.each(["primary", "secondary", "tertiary"] as const)(
      'borderColor="%s"が正しく適用される',
      (color) => {
        render(<Input borderColor={color} isOutline />);
        expect(screen.getByRole("textbox")).toHaveClass(
          INPUT_STYLES.borderColor[color]
        );
      }
    );

    it("isOutline=trueでボーダーが表示される", () => {
      render(<Input isOutline />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("border");
      expect(input).toHaveClass(INPUT_STYLES.borderColor.primary);
    });
  });

  describe("形状バリエーション", () => {
    it("isRound=trueで丸型になる", () => {
      render(<Input isRound />);
      expect(screen.getByRole("textbox")).toHaveClass("rounded-full");
    });

    it("isRound=falseで通常の角丸になる", () => {
      render(<Input isRound={false} />);
      expect(screen.getByRole("textbox")).toHaveClass("rounded-md");
    });
  });

  describe("ホバー効果", () => {
    it.each(["primary", "secondary", "tertiary", "opacity"] as const)(
      'hoverColor="%s"が正しく適用される',
      (color) => {
        render(<Input hoverColor={color} />);
        expect(screen.getByRole("textbox")).toHaveClass(
          INPUT_STYLES.hoverColor[color]
        );
      }
    );
  });

  describe("無効化状態", () => {
    it("isDisabled=trueで入力が無効化される", () => {
      render(<Input isDisabled />);
      expect(screen.getByRole("textbox")).toBeDisabled();
    });

    it("isDisabled=falseで入力が有効化される", () => {
      render(<Input isDisabled={false} />);
      expect(screen.getByRole("textbox")).not.toBeDisabled();
    });
  });

  describe("フォーム属性", () => {
    it("プレースホルダーが正しく設定される", () => {
      render(<Input placeholder="Enter text here" />);
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "placeholder",
        "Enter text here"
      );
    });

    it("name属性が正しく設定される", () => {
      render(<Input name="username" />);
      expect(screen.getByRole("textbox")).toHaveAttribute("name", "username");
    });

    it("id属性が正しく設定される", () => {
      render(<Input id="user-input" />);
      expect(screen.getByRole("textbox")).toHaveAttribute("id", "user-input");
    });

    it.each([
      "text",
      "email",
      "password",
      "number",
      "tel",
      "url",
      "search",
    ] as const)('type="%s"が正しく設定される', (type) => {
      render(<Input type={type} />);
      let input;
      switch (type) {
        case "password":
          input = document.querySelector('input[type="password"]');
          if (!input)
            throw new Error(
              "Password属性のInputコンポーネントが見つかりません。"
            );
          break;
        case "number":
          input = screen.getByRole("spinbutton");
          break;
        case "search":
          input = screen.getByRole("searchbox");
          break;
        default:
          input = screen.getByRole("textbox");
      }
      expect(input).toHaveAttribute("type", type);
    });
  });

  describe("スタイルのカスタマイズ", () => {
    it("デフォルトで空のクラス名が適用される", () => {
      render(<Input />);
      // クラス名は他のデフォルトクラスと組み合わさっているため、空文字列との完全一致はしない
      expect(screen.getByRole("textbox").className).not.toContain("undefined");
      expect(screen.getByRole("textbox").className).not.toContain("null");
    });

    it("カスタムクラス名が正しく適用される", () => {
      render(<Input className="custom-input" />);
      expect(screen.getByRole("textbox")).toHaveClass("custom-input");
    });

    it("複数のプロパティが同時に適用される", () => {
      render(
        <Input
          size="large"
          backgroundColor="secondary"
          textColor="black"
          isRound
          isOutline
          className="custom-input"
        />
      );
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass(INPUT_STYLES.size.large);
      expect(input).toHaveClass(COMMON_STYLES.backgroundColor.secondary);
      expect(input).toHaveClass(COMMON_STYLES.textColor.black);
      expect(input).toHaveClass("rounded-full");
      expect(input).toHaveClass("border");
      expect(input).toHaveClass("custom-input");
    });
  });
});
