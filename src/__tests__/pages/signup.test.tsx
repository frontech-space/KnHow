import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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

  // 正常系テスト
  describe("正常系", () => {
    it("コンポーネントが正しくレンダリングされる", () => {
      renderWithProviders(<Signup />);
  
      // タイトルが正しく表示されていることを確認
      expect(screen.getByText("アカウント作成")).toBeInTheDocument();
  
      // フォームの要素が正しく表示されていることを確認
      expect(screen.getByLabelText("メールアドレス：")).toBeInTheDocument();
      expect(screen.getByLabelText("ユーザ名：")).toBeInTheDocument();
      expect(screen.getByLabelText("パスワード：")).toBeInTheDocument();
      expect(screen.getByLabelText("パスワード確認：")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "送信" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "リセット" })).toBeInTheDocument();
      expect(screen.getByText("ログイン画面へ")).toBeInTheDocument();
    });

    it("フォームの入力が正しく機能する", () => {
      renderWithProviders(<Signup />);
  
      const emailInput = screen.getByTestId("email");
      const usernameInput = screen.getByTestId("username");
      const passwordInput = screen.getByTestId("password");
      const confirmPasswordInput = screen.getByTestId("password_confirmation");
  
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(usernameInput, { target: { value: "testuser" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });
  
      expect(emailInput).toHaveValue("test@example.com");
      expect(usernameInput).toHaveValue("testuser");
      expect(passwordInput).toHaveValue("password123");
      expect(confirmPasswordInput).toHaveValue("password123");
    });

    it("リセットボタンが正しく機能する", () => {
      renderWithProviders(<Signup />);
  
      const emailInput = screen.getByTestId("email");
      const usernameInput = screen.getByTestId("username");
      const passwordInput = screen.getByTestId("password");
      const confirmPasswordInput = screen.getByTestId("password_confirmation");
  
      // 値を入力
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(usernameInput, { target: { value: "testuser" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });
  
      // リセットボタンをクリック
      fireEvent.click(screen.getByRole("button", { name: "リセット" }));
  
      // 全ての入力値がクリアされていることを確認
      expect(emailInput).toHaveValue("");
      expect(usernameInput).toHaveValue("");
      expect(passwordInput).toHaveValue("");
      expect(confirmPasswordInput).toHaveValue("");
    });

    it("正常なサインアップが成功する", async () => {
      mockFetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ message: "アカウント作成に成功しました" }),
        })
      );
  
      renderWithProviders(<Signup />);
  
      // フォームに値を入力
      fireEvent.change(screen.getByTestId("email"), { target: { value: "test@example.com" } });
      fireEvent.change(screen.getByTestId("username"), { target: { value: "testuser" } });
      fireEvent.change(screen.getByTestId("password"), { target: { value: "password123" } });
      fireEvent.change(screen.getByTestId("password_confirmation"), { target: { value: "password123" } });
  
      // フォームを送信
      fireEvent.submit(screen.getByRole("form"));
  
      // APIが呼ばれたことを確認
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "test@example.com",
            username: "testuser",
            password: "password123",
          }),
        });
      });
  
      // ログインページにリダイレクトされることを確認
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });

  // 異常系テスト
  describe("異常系", () => {
    it("パスワードが一致しない場合にエラーメッセージが表示される", async () => {
      renderWithProviders(<Signup />);
  
      // パスワードが一致しない値を入力
      fireEvent.change(screen.getByTestId("email"), { target: { value: "test@example.com" } });
      fireEvent.change(screen.getByTestId("username"), { target: { value: "testuser" } });
      fireEvent.change(screen.getByTestId("password"), { target: { value: "password123" } });
      fireEvent.change(screen.getByTestId("password_confirmation"), { target: { value: "different123" } });
  
      // フォームを送信
      fireEvent.submit(screen.getByRole("form"));
  
      // エラーメッセージが表示されることを確認
      await waitFor(() => {
        expect(screen.getByTestId("error-message")).toHaveTextContent("パスワードが一致しません");
      });
  
      // APIが呼ばれていないことを確認
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it("必須項目が未入力の場合にエラーメッセージが表示される", async () => {
      renderWithProviders(<Signup />);
  
      // フォームを送信（何も入力せずに）
      fireEvent.submit(screen.getByRole("form"));
  
      // エラーメッセージが表示されることを確認
      await waitFor(() => {
        expect(screen.getByTestId("error-message")).toHaveTextContent("必須項目を入力してください");
      });
  
      // APIが呼ばれていないことを確認
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it("サーバーエラーが発生した場合にエラーメッセージが表示される", async () => {
      mockFetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: false,
          json: () => Promise.resolve({ message: "サーバーエラーが発生しました" }),
        })
      );
  
      renderWithProviders(<Signup />);
  
      // フォームに値を入力
      fireEvent.change(screen.getByTestId("email"), { target: { value: "test@example.com" } });
      fireEvent.change(screen.getByTestId("username"), { target: { value: "testuser" } });
      fireEvent.change(screen.getByTestId("password"), { target: { value: "password123" } });
      fireEvent.change(screen.getByTestId("password_confirmation"), { target: { value: "password123" } });
  
      // フォームを送信
      fireEvent.submit(screen.getByRole("form"));
  
      // エラーメッセージが表示されることを確認
      await waitFor(() => {
        expect(screen.getByTestId("error-message")).toHaveTextContent("サーバーエラーが発生しました");
      });
    });
  });

  it("ログインページへのリンクが正しく機能する", () => {
    renderWithProviders(<Signup />);

    const loginLink = screen.getByText("ログイン画面へ");
    fireEvent.click(loginLink);

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
