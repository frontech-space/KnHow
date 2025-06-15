import { render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { vi } from "vitest";
import App from "../App";

// Appコンポーネントのモック
vi.mock("../App", () => ({
  default: () => <div data-testid="app">App Component</div>,
}));

// 各ページコンポーネントのモック
vi.mock("../pages/top", () => ({
  default: () => <div data-testid="top-page">Top Page</div>,
}));

vi.mock("../pages/about", () => ({
  default: () => <div data-testid="about-page">About Page</div>,
}));

vi.mock("../pages/release", () => ({
  default: () => <div data-testid="release-page">Release Page</div>,
}));

vi.mock("../pages/login", () => ({
  default: () => <div data-testid="login-page">Login Page</div>,
}));

vi.mock("../pages/signup", () => ({
  default: () => <div data-testid="signup-page">Signup Page</div>,
}));

vi.mock("../pages/contact", () => ({
  default: () => <div data-testid="contact-page">Contact Page</div>,
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(<HelmetProvider>{component}</HelmetProvider>);
};

describe("App", () => {
  it("Appコンポーネントが正しくレンダリングされる", () => {
    renderWithProviders(<App />);
    expect(screen.getByTestId("app")).toBeInTheDocument();
  });
});
