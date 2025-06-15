import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../../../components/layouts/Header";

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Header", () => {
  const defaultTitle = "KnHow |";
  const mockTitle = defaultTitle + "テストタイトル";

  it("コンポーネントが正しくレンダリングされる", () => {
    renderWithRouter(<Header title={mockTitle} />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("タイトルが正しく表示される", () => {
    renderWithRouter(<Header title={mockTitle} />);
    expect(screen.getByText(mockTitle)).toBeInTheDocument();
    expect(screen.getByText(mockTitle)).toHaveClass("text-2xl", "md:text-5xl");
  });

  it("ロゴ画像が正しく表示される", () => {
    renderWithRouter(<Header title={mockTitle} />);
    const logo = screen.getByAltText("KnHow");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/assets/images/knhow-panda-icon.png");
    expect(logo).toHaveClass("h-20", "md:h-24");
  });

  it("レスポンシブデザインのクラスが正しく適用されている", () => {
    renderWithRouter(<Header title={mockTitle} />);

    const header = screen.getByRole("banner");
    expect(header).toHaveClass(
      "bg-white",
      "border-b-2",
      "border-gray-200",
      "shadow-md"
    );

    const container = header.querySelector("[class*='container']");
    expect(container).toHaveClass(
      "container",
      "mx-auto",
      "px-4",
      "md:px-7",
      "py-3",
      "md:py-5"
    );

    const mainContent = container?.querySelector("[class*='flex']");
    expect(mainContent).toHaveClass("flex", "items-center", "justify-between");

    // 左側のロゴ部分
    const logoSection = mainContent?.querySelector("[class*='justify-start']");
    expect(logoSection).toHaveClass(
      "w-1/2",
      "md:w-1/3",
      "flex",
      "justify-start"
    );

    // 中央のタイトル部分
    const titleSection = mainContent?.querySelector(
      "[class*='justify-center']"
    );
    expect(titleSection).toHaveClass(
      "w-1/2",
      "md:w-1/3",
      "flex",
      "justify-center"
    );

    // 右側の空セクション
    const rightSection = mainContent?.querySelector("[class*='hidden']");
    expect(rightSection).toHaveClass(
      "hidden",
      "md:flex",
      "md:w-1/3",
      "md:justify-end"
    );
  });

  it("ホームページへのリンクが正しく設定されている", () => {
    renderWithRouter(<Header title={mockTitle} />);
    const homeLink = screen.getByRole("link");
    expect(homeLink).toHaveAttribute("href", "/");
  });
});
