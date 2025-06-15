import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { vi } from "vitest";
import Signup from "../../pages/signup";

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

// fetchのモック
const mockFetch = vi.fn();
global.fetch = mockFetch;

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <HelmetProvider>
      <BrowserRouter>{component}</BrowserRouter>
    </HelmetProvider>
  );
};

describe("Signup", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockFetch.mockClear();
  });

  it("コンポーネントが正しくレンダリングされる", () => {
    renderWithProviders(<Signup />);

    // タイトルが正しく表示されていることを確認
    expect(screen.getByText("アカウント作成")).toBeInTheDocument();

    // フォームの要素が正しく表示されていることを確認
    expect(screen.getByLabelText("メールアドレス：")).toBeInTheDocument();
    expect(screen.getByLabelText("パスワード：")).toBeInTheDocument();
    expect(screen.getByLabelText("パスワード確認：")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "送信" })).toBeInTheDocument();
  });

  it("ヘッダーコンポーネントが正しく表示される", () => {
    renderWithProviders(<Signup />);

    // ヘッダーコンポーネントの要素が存在することを確認
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByText("アカウント作成")).toBeInTheDocument();
    expect(screen.getByAltText("KnHow")).toBeInTheDocument();
  });

  it("フォームの入力が正しく機能する", () => {
    renderWithProviders(<Signup />);

    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByTestId("password");
    const confirmPasswordInput = screen.getByTestId("password_confirmation");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
    expect(confirmPasswordInput).toHaveValue("password123");
  });

  it("パスワードが一致しない場合にエラーメッセージが表示される", async () => {
    renderWithProviders(<Signup />);

    // パスワード入力フィールドを取得
    const passwordInput = screen.getByTestId("password");
    const confirmPasswordInput = screen.getByTestId("password_confirmation");

    // パスワードを入力
    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "different123" } });
    });

    // フォームを送信
    const form = screen.getByRole("form");
    await act(async () => {
      fireEvent.submit(form);
    });

    // エラーメッセージが表示されることを確認
    const errorMessage = await screen.findByTestId("error-message");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage.textContent).toBe("パスワードが一致しません");

    // fetchが呼び出されていないことを確認
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("ログインページへのリンクが正しく機能する", async () => {
    // fetchのモックを設定
    mockFetch.mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: "アカウント作成に成功しました" })
      });
    });

    renderWithProviders(<Signup />);

    const loginLink = screen.getByText("ログイン画面へ");
    expect(loginLink).toBeInTheDocument();
    
    await act(async () => {
      fireEvent.click(loginLink);
    });

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
