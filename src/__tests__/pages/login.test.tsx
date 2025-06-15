import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { vi } from "vitest";
import Login from "../../pages/login";

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

describe("Login", () => {
    beforeEach(() => {
        mockNavigate.mockClear();
    });

    it("コンポーネントが正しくレンダリングされる", () => {
        renderWithRouter(<Login />);

        // タイトルが正しく表示されていることを確認
        expect(screen.getByText("ログイン")).toBeInTheDocument();

        // フォームの要素が正しく表示されていることを確認
        expect(screen.getByText("ユーザ名：")).toBeInTheDocument();
        expect(screen.getByText("パスワード：")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "送信" })).toBeInTheDocument();
    });

    it("Navigationコンポーネントが正しく表示される", () => {
        renderWithRouter(<Login />);

        // Navigationコンポーネントの要素が存在することを確認
        expect(screen.getByRole("navigation")).toBeInTheDocument();
        expect(screen.getByText("このサイトについて")).toBeInTheDocument();
        expect(screen.getByText("リリースノート")).toBeInTheDocument();
    });

    it("フォームの入力が正しく機能する", () => {
        renderWithRouter(<Login />);

        const usernameInput = screen.getByLabelText("ユーザ名：");
        const passwordInput = screen.getByLabelText("パスワード：");
        const submitButton = screen.getByRole("button", { name: "送信" });

        // 入力フィールドに値を入力
        fireEvent.change(usernameInput, { target: { value: "testuser" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });

        // 入力値が正しく設定されていることを確認
        expect(usernameInput).toHaveValue("testuser");
        expect(passwordInput).toHaveValue("password123");
    });

    it("「アカウント作成」ボタンをクリックすると/signupに遷移する", () => {
        renderWithRouter(<Login />);

        const signupButton = screen.getByRole("button", { name: "アカウント作成" });
        fireEvent.click(signupButton);

        expect(mockNavigate).toHaveBeenCalledWith("/signup");
    });
});