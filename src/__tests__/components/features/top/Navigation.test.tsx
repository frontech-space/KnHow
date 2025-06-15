import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navigation from "../../../../components/features/top/Navigation";

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe("Navigation", () => {
  it("コンポーネントが正しくレンダリングされる", () => {
    renderWithRouter(<Navigation />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("各リンクが正しいパスに設定されている", () => {
    renderWithRouter(<Navigation />);
    
    const aboutLink = screen.getByText("このサイトについて").closest("a");
    const releaseLink = screen.getByText("リリースノート").closest("a");
    const contactLink = screen.getByText("お問い合わせ").closest("a");

    expect(aboutLink).toHaveAttribute("href", "/about");
    expect(releaseLink).toHaveAttribute("href", "/release");
    expect(contactLink).toHaveAttribute("href", "/contact");
  });

  it("テキストが正しく表示されている", () => {
    renderWithRouter(<Navigation />);
    
    expect(screen.getByText("このサイトについて")).toBeInTheDocument();
    expect(screen.getByText("リリースノート")).toBeInTheDocument();
    expect(screen.getByText("お問い合わせ")).toBeInTheDocument();
  });

  it("レスポンシブデザインのクラスが正しく適用されている", () => {
    renderWithRouter(<Navigation />);
    
    const container = screen.getByRole("navigation");
    expect(container).toHaveClass("flex-col", "md:flex-row");

    const links = container.querySelectorAll("a");
    links.forEach(link => {
      expect(link).toHaveClass("w-full", "md:w-1/3");
    });
  });
});
