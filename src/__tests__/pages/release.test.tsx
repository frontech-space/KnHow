import { render, screen, fireEvent, within } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { vi } from "vitest";
import Release from "../../pages/release";

const mockNavigate = vi.fn();

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

describe("Release", () => {
  it("コンポーネントが正しくレンダリングされる", () => {
    renderWithProviders(<Release />);

    expect(screen.getByText("更新履歴")).toBeInTheDocument();

    const mobileSection = screen.getByTestId("mobile-release-section");
    const cards = within(mobileSection).getAllByText("Ver1.0 -ノウハウ共有機能");
    expect(cards.length).toBe(4);
  });

  it("もっと見るボタンが表示されてクリックできる", () => {
    renderWithProviders(<Release />);

    const moreButton = screen.getByRole("button", { name: "もっと見る" });
    fireEvent.click(moreButton);

    const mobileSection = screen.getByTestId("mobile-release-section");
    const expandedCards = within(mobileSection).getAllByText("Ver1.0 -ノウハウ共有機能");
    expect(expandedCards.length).toBe(6);

    expect(screen.queryByRole("button", { name: "もっと見る" })).not.toBeInTheDocument();
  });

  it("更新履歴のテキストが全件表示されている", () => {
    renderWithProviders(<Release />);

    const history = screen.getByTestId("release-history-sidebar");
    const historyItems = within(history).getAllByText(/^yyyy\/MM\/dd Ver1\.0 -ノウハウ共有機能$/);
    expect(historyItems.length).toBe(6);
  });
});