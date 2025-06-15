import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { vi } from "vitest";
import About from "../../pages/about";

//useNavigateのモック
const mockNavigate = vi.fn();

//react-router-domのモック
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <HelmetProvider>
      <BrowserRouter>{component}</BrowserRouter>
    </HelmetProvider>
  );
};

describe("About", () => {
  it("コンポーネントが正しくレンダリングされる", () => {
    renderWithRouter(<About />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("テキストが正しく表示される", () => {
    renderWithRouter(<About />);
    const textContent = screen.getByText(/技術のキャッチアップをした.*ポートフォリオサイトになります/);
    expect(textContent).toBeInTheDocument();
  });

  it("GitHubリンクが正しく表示される", () => {
    renderWithRouter(<About />);
    const githubLink = screen.getByText("ソースコードはこちら");
    expect(githubLink).toBeInTheDocument();
    expect(githubLink.closest("a")).toHaveAttribute(
      "href",
      "https://github.com/frontech-space/KnHow"
    );
  });

  it("画像が正しく表示される", () => {
    renderWithRouter(<About />);
    const image = screen.getByAltText("pc");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/assets/images/about/pc.jpeg");
  });
});