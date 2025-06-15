import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "../../../components/layouts/Layout";

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <HelmetProvider>
      <BrowserRouter>{component}</BrowserRouter>
    </HelmetProvider>
  );
};

describe("Layout", () => {
  const mockTitle = "テストタイトル";
  const mockChildren = <div data-testid="test-children">テストコンテンツ</div>;

  it("コンポーネントが正しくレンダリングされる", () => {
    renderWithProviders(<Layout title={mockTitle}>{mockChildren}</Layout>);
    const layout = screen.getByRole("main").parentElement;
    expect(layout).toBeInTheDocument();
    expect(layout).toHaveClass("flex", "flex-col", "min-h-screen", "h-screen");
  });

  it("子要素が正しく表示される", () => {
    renderWithProviders(<Layout title={mockTitle}>{mockChildren}</Layout>);
    expect(screen.getByTestId("test-children")).toBeInTheDocument();
    expect(screen.getByText("テストコンテンツ")).toBeInTheDocument();
  });

  it("MetaHeadコンポーネントが正しく表示される", async () => {
    renderWithProviders(<Layout title={mockTitle}>{mockChildren}</Layout>);

    // タイトルとメタディスクリプションを確認
    await waitFor(() => {
      expect(document.title).toBe(`KnHow | ${mockTitle}`);
    });

    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      "content",
      "Knowledge How-toサイト - あなたの知識を共有しましょう"
    );
  });

  it("Headerコンポーネントが正しく表示される", () => {
    renderWithProviders(<Layout title={mockTitle}>{mockChildren}</Layout>);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByText(mockTitle)).toBeInTheDocument();
  });

  it("main要素が正しくスタイリングされている", () => {
    renderWithProviders(<Layout title={mockTitle}>{mockChildren}</Layout>);
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass("flex-grow", "w-full", "flex", "flex-col");
  });

  it("異なるタイトルで正しく表示される", async () => {
    const differentTitle = "別のタイトル";
    renderWithProviders(<Layout title={differentTitle}>{mockChildren}</Layout>);

    // タイトルが正しく設定されていることを確認
    await waitFor(() => {
      expect(document.title).toBe(`KnHow | ${differentTitle}`);
    });

    // ヘッダーのタイトルが正しく表示されていることを確認
    expect(screen.getByText(differentTitle)).toBeInTheDocument();
  });
});
