import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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

// fetchのモック
const mockFetch = vi.fn();
global.fetch = mockFetch;

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
        mockFetch.mockClear();
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

    // 新しく追加するテストケース
    describe("フォーム送信処理", () => {
        it("正常なログインが成功する", async () => {
            mockFetch.mockImplementationOnce(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({ message: "ログインに成功しました" }),
                })
            );

            renderWithRouter(<Login />);

            // フォームに値を入力
            fireEvent.change(screen.getByTestId("username"), { target: { value: "testuser" } });
            fireEvent.change(screen.getByTestId("password"), { target: { value: "password123" } });

            // フォームを送信
            fireEvent.submit(screen.getByRole("form"));

            // APIが呼ばれたことを確認
            await waitFor(() => {
                expect(mockFetch).toHaveBeenCalledWith("/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: "testuser",
                        password: "password123",
                    }),
                });
            });

            // ホームページにリダイレクトされることを確認
            expect(mockNavigate).toHaveBeenCalledWith("/");
        });

        it("必須項目が未入力の場合にエラーメッセージが表示される", async () => {
            renderWithRouter(<Login />);

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
                    json: () => Promise.resolve({ message: "認証に失敗しました" }),
                })
            );

            renderWithRouter(<Login />);

            // フォームに値を入力
            fireEvent.change(screen.getByTestId("username"), { target: { value: "testuser" } });
            fireEvent.change(screen.getByTestId("password"), { target: { value: "password123" } });

            // フォームを送信
            fireEvent.submit(screen.getByRole("form"));

            // エラーメッセージが表示されることを確認
            await waitFor(() => {
                expect(screen.getByTestId("error-message")).toHaveTextContent("認証に失敗しました");
            });
        });

        it("ネットワークエラーが発生した場合にエラーメッセージが表示される", async () => {
            mockFetch.mockImplementationOnce(() =>
                Promise.reject(new Error("ネットワークエラー"))
            );

            renderWithRouter(<Login />);

            // フォームに値を入力
            fireEvent.change(screen.getByTestId("username"), { target: { value: "testuser" } });
            fireEvent.change(screen.getByTestId("password"), { target: { value: "password123" } });

            // フォームを送信
            fireEvent.submit(screen.getByRole("form"));

            // エラーメッセージが表示されることを確認
            await waitFor(() => {
                expect(screen.getByTestId("error-message")).toHaveTextContent("ネットワークエラー");
            });
        });

        it("サーバーエラーでdata.messageが存在しない場合にデフォルトエラーメッセージが表示される", async () => {
            mockFetch.mockImplementationOnce(() =>
                Promise.resolve({
                    ok: false,
                    json: () => Promise.resolve({}), // data.messageが存在しない
                })
            );

            renderWithRouter(<Login />);

            // フォームに値を入力
            fireEvent.change(screen.getByTestId("username"), { target: { value: "testuser" } });
            fireEvent.change(screen.getByTestId("password"), { target: { value: "password123" } });

            // フォームを送信
            fireEvent.submit(screen.getByRole("form"));

            // デフォルトのエラーメッセージが表示されることを確認
            await waitFor(() => {
                expect(screen.getByTestId("error-message")).toHaveTextContent("ログインに失敗しました");
            });
        });

        it("Errorインスタンスでないエラーが発生した場合にデフォルトエラーメッセージが表示される", async () => {
            mockFetch.mockImplementationOnce(() =>
                Promise.reject("文字列エラー") // Errorインスタンスでない
            );

            renderWithRouter(<Login />);

            // フォームに値を入力
            fireEvent.change(screen.getByTestId("username"), { target: { value: "testuser" } });
            fireEvent.change(screen.getByTestId("password"), { target: { value: "password123" } });

            // フォームを送信
            fireEvent.submit(screen.getByRole("form"));

            // デフォルトのエラーメッセージが表示されることを確認
            await waitFor(() => {
                expect(screen.getByTestId("error-message")).toHaveTextContent("ログインに失敗しました");
            });
        });
    });

    describe("リセットボタン", () => {
        it("リセットボタンが正しく機能する", () => {
            renderWithRouter(<Login />);

            const usernameInput = screen.getByTestId("username");
            const passwordInput = screen.getByTestId("password");

            // 値を入力
            fireEvent.change(usernameInput, { target: { value: "testuser" } });
            fireEvent.change(passwordInput, { target: { value: "password123" } });

            // リセットボタンをクリック
            fireEvent.click(screen.getByRole("button", { name: "リセット" }));

            // 全ての入力値がクリアされていることを確認
            expect(usernameInput).toHaveValue("");
            expect(passwordInput).toHaveValue("");
        });
    });
});