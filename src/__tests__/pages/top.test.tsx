import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { vi } from "vitest";
import Top from "../../pages/top";

// useNavigateのモック
const mockNavigate = vi.fn();

// react-router-domのモック
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <HelmetProvider>
      <BrowserRouter>{component}</BrowserRouter>
    </HelmetProvider>
  );
};

describe("Top", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("コンポーネントが正しくレンダリングされる", () => {
    renderWithProviders(<Top />);

    // タイトルが正しく表示されていることを確認
    expect(screen.getByText("カンホー")).toBeInTheDocument();
    expect(screen.getByText("- ノウハウ共有ツール -")).toBeInTheDocument();

    // ボタンが正しく表示されていることを確認
    const button = screen.getByRole("button", { name: "はじめる" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("w-fit", "mx-auto", "px-24", "py-7", "mt-4");
  });

  it("Navigationコンポーネントが正しく表示される", () => {
    renderWithProviders(<Top />);

    // Navigationコンポーネントの要素が存在することを確認
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByText("このサイトについて")).toBeInTheDocument();
    expect(screen.getByText("リリースノート")).toBeInTheDocument();
  });

  it("背景画像が正しく表示される", () => {
    renderWithProviders(<Top />);

    // メインコンテンツ内の画像を取得
    const mainContent = screen
      .getByText("カンホー")
      .closest("div")?.parentElement;
    const images = mainContent?.querySelectorAll("img[alt='KnHow']");
    expect(images).toHaveLength(2);

    // モバイル用画像のクラスを確認
    expect(images?.[0]).toHaveClass("w-full", "h-full", "object-cover");

    // デスクトップ用画像のクラスを確認
    expect(images?.[1]).toHaveClass("w-full", "h-full", "object-cover");
  });

  it("「はじめる」ボタンをクリックすると/signupに遷移する", () => {
    renderWithProviders(<Top />);

    // ボタンをクリック
    const button = screen.getByRole("button", { name: "はじめる" });
    button.click();

    // useNavigateが正しく呼ばれたことを確認
    expect(mockNavigate).toHaveBeenCalledWith("/signup");
  });

  it("レスポンシブデザインのクラスが正しく適用されている", () => {
    renderWithProviders(<Top />);

    // メインコンテンツのグリッドレイアウトを確認
    const mainContent = screen
      .getByText("カンホー")
      .closest("div")?.parentElement;
    expect(mainContent).toHaveClass(
      "flex-grow",
      "grid",
      "grid-rows-1",
      "grid-cols-1",
      "md:grid-cols-12"
    );

    // テキストエリアのレスポンシブクラスを確認
    const textArea = screen.getByText("カンホー").closest("div");
    expect(textArea).toHaveClass(
      "order-2",
      "md:order-1",
      "md:col-span-5",
      "bg-white",
      "p-6",
      "md:p-10"
    );

    // 画像エリアのレスポンシブクラスを確認
    const imageArea = mainContent?.querySelector("div:has(img[alt='KnHow'])");
    expect(imageArea).toHaveClass(
      "order-1",
      "md:order-2",
      "md:col-span-7",
      "min-h-[300px]",
      "md:min-h-0"
    );
  });
});
