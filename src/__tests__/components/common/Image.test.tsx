import { describe, it, expect, vi } from "vitest";
import { render, screen } from "../../../test/utils/test-utils";
import Image from "../../../components/common/Image";
import { getAssetPath } from "../../../utils/path";

// getAssetPathをモック化
vi.mock("../../../utils/path", () => ({
  getAssetPath: vi.fn((path) => `/mocked-assets${path}`),
}));

describe("Image Component", () => {
  const defaultProps = {
    src: "/test-image.jpg",
    alt: "Test Image",
    width: 100,
    height: 100,
  };

  describe("レンダリング", () => {
    it("imgタグとしてレンダリングされる", () => {
      render(<Image {...defaultProps} />);
      const image = screen.getByRole("img");
      expect(image.tagName).toBe("IMG");
    });

    it("必須プロパティが正しく適用される", () => {
      render(<Image {...defaultProps} />);
      const image = screen.getByRole("img");
      expect(image).toHaveAttribute("src", "/mocked-assets/test-image.jpg");
      expect(image).toHaveAttribute("alt", "Test Image");
      expect(image).toHaveAttribute("width", "100");
      expect(image).toHaveAttribute("height", "100");
    });
  });

  describe("パス変換", () => {
    it("getAssetPathを使用してsrcを変換する", () => {
      render(<Image {...defaultProps} />);
      expect(getAssetPath).toHaveBeenCalledWith("/test-image.jpg");
      expect(screen.getByRole("img")).toHaveAttribute(
        "src",
        "/mocked-assets/test-image.jpg"
      );
    });

    it("異なるパスでも正しく変換される", () => {
      render(<Image {...defaultProps} src="/another/path/image.png" />);
      expect(getAssetPath).toHaveBeenCalledWith("/another/path/image.png");
      expect(screen.getByRole("img")).toHaveAttribute(
        "src",
        "/mocked-assets/another/path/image.png"
      );
    });
  });

  describe("遅延読み込み", () => {
    it("デフォルトで遅延読み込みが有効", () => {
      render(<Image {...defaultProps} />);
      expect(screen.getByRole("img")).toHaveAttribute("loading", "lazy");
    });

    it("lazy=falseで即時読み込みになる", () => {
      render(<Image {...defaultProps} lazy={false} />);
      expect(screen.getByRole("img")).toHaveAttribute("loading", "eager");
    });

    it("明示的にlazy=trueを設定できる", () => {
      render(<Image {...defaultProps} lazy={true} />);
      expect(screen.getByRole("img")).toHaveAttribute("loading", "lazy");
    });
  });

  describe("スタイルのカスタマイズ", () => {
    it("デフォルトで空のクラス名が適用される", () => {
      render(<Image {...defaultProps} />);
      const image = screen.getByRole("img");
      expect(image.className).toBe("");
    });

    it("カスタムクラス名が正しく適用される", () => {
      render(<Image {...defaultProps} className="custom-image" />);
      expect(screen.getByRole("img")).toHaveClass("custom-image");
    });

    it("複数のクラス名が正しく適用される", () => {
      render(
        <Image
          {...defaultProps}
          className="custom-image rounded-lg shadow-md"
        />
      );
      const image = screen.getByRole("img");
      expect(image).toHaveClass("custom-image");
      expect(image).toHaveClass("rounded-lg");
      expect(image).toHaveClass("shadow-md");
    });
  });

  describe("サイズ指定", () => {
    it("数値でサイズを指定できる", () => {
      render(<Image {...defaultProps} width={200} height={150} />);
      const image = screen.getByRole("img");
      expect(image).toHaveAttribute("width", "200");
      expect(image).toHaveAttribute("height", "150");
    });

    it("文字列でサイズを指定できる", () => {
      render(<Image {...defaultProps} width="100%" height="auto" />);
      const image = screen.getByRole("img");
      expect(image).toHaveAttribute("width", "100%");
      expect(image).toHaveAttribute("height", "auto");
    });
  });

  describe("アクセシビリティ", () => {
    it("代替テキストが正しく設定される", () => {
      render(<Image {...defaultProps} alt="Descriptive alt text" />);
      expect(screen.getByRole("img")).toHaveAttribute(
        "alt",
        "Descriptive alt text"
      );
    });

    it("装飾的な画像の場合は空のalt属性を設定できる", () => {
      render(<Image {...defaultProps} alt="" />);
      const image = screen.getByRole("presentation");
      expect(image).toHaveAttribute("alt", "");
    });
  });
});
