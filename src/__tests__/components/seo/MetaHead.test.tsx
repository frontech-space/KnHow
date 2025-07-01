import { render, screen, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import MetaHead from "../../../components/seo/MetaHead";

const renderWithHelmet = (component: React.ReactElement) => {
  return render(<HelmetProvider>{component}</HelmetProvider>);
};

describe("MetaHead", () => {
  const mockTitle = "テストタイトル";
  const mockDescription = "テスト用の説明文です";
  const defaultDescription =
    "Knowledge How-toサイト - あなたの知識を共有しましょう";

  it("タイトルとメタディスクリプションが正しく設定される", async () => {
    renderWithHelmet(
      <MetaHead title={mockTitle} description={mockDescription} />
    );

    // タイトルとメタディスクリプションが正しく設定されていることを確認
    await waitFor(() => {
      expect(document.title).toBe(`KnHow | ${mockTitle}`);
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      expect(metaDescription).toHaveAttribute("content", mockDescription);
    });
  });

  it("デフォルトの説明文が使用される", async () => {
    renderWithHelmet(
      <MetaHead title={mockTitle} description={defaultDescription} />
    );

    // タイトルとメタディスクリプションが正しく設定されていることを確認
    await waitFor(() => {
      expect(document.title).toBe(`KnHow | ${mockTitle}`);
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      expect(metaDescription).toHaveAttribute("content", defaultDescription);
    });
  });

  it("空のタイトルでも正しく動作する", async () => {
    renderWithHelmet(<MetaHead title="" description={mockDescription} />);

    // タイトルとメタディスクリプションが正しく設定されていることを確認
    await waitFor(() => {
      expect(document.title).toBe("KnHow |");
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      expect(metaDescription).toHaveAttribute("content", mockDescription);
    });
  });
});
