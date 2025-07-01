import { render, screen, fireEvent } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import Contact from "../../pages/contact";

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

describe("Contact", () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("送信ボタンが正しく動作する", () => {
    renderWithProviders(<Contact onSubmit={mockOnSubmit} />);

    // フォームに入力
    fireEvent.change(screen.getByPlaceholderText("件名を入力してください"), {
      target: { value: "テスト件名" },
    });
    fireEvent.change(screen.getByPlaceholderText("内容を入力してください"), {
      target: { value: "テストメッセージ" },
    });

    // ボタンをクリック
    fireEvent.click(screen.getByRole("button", { name: "送信" }));

    // onSubmitが呼ばれることを確認
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith("テスト件名", "テストメッセージ");
  });

  it("リセットボタンが正しく動作する", () => {
    renderWithProviders(<Contact />);

    // フォームに入力
    const subject = screen.getByPlaceholderText("件名を入力してください");
    const message = screen.getByPlaceholderText("内容を入力してください");
    fireEvent.change(subject, { target: { value: "削除" } });
    fireEvent.change(message, { target: { value: "します" } });

    // ボタンをクリック
    fireEvent.click(screen.getByRole("button", { name: "リセット" }));

    // 入力欄がクリアされることを確認
    expect(subject).toHaveValue("");
    expect(message).toHaveValue("");
  });

  it("件名・内容が空でも送信できる", () => {
    renderWithProviders(<Contact onSubmit={mockOnSubmit} />);

    // ボタンをクリック
    fireEvent.click(screen.getByRole("button", { name: "送信" }));

    // onSubmitが呼ばれることを確認
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith("", "");
  });

  it("UI要素が正しく表示される", () => {
    renderWithProviders(<Contact />);

    // テキスト・入力欄・ボタンが表示されることを確認
    expect(screen.getByText("お問い合わせ内容をご入力ください")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("件名を入力してください")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("内容を入力してください")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "送信" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "リセット" })).toBeInTheDocument();
  });

  it("画像が正しく表示される", () => {
    renderWithProviders(<Contact />);

    // 画像要素を取得
    const images = screen.getAllByAltText("KnHow");
    const backgroundImage = images.find((img) =>
      img.className.includes("object-cover")
    );

    // 背景画像であることを確認
    expect(backgroundImage).toBeDefined();
    expect(backgroundImage).toHaveAttribute("src", expect.stringContaining("/contact/"));
  });

  it("レイアウトクラスが正しく適用されている", () => {
    renderWithProviders(<Contact />);

    // asideのクラスを確認
    const aside = screen.getByText("お問い合わせ内容をご入力ください").closest("aside");
    expect(aside).toHaveClass("w-full", "md:w-[40%]", "min-h-[calc(100vh-180px)]");

    // 背景画像のクラスを確認
    const images = screen.getAllByAltText("KnHow");
    const backgroundImage = images.find((img) =>
      img.className.includes("object-cover")
    );
    expect(backgroundImage).toHaveClass("w-full", "h-[calc(80vh)]", "object-cover");
  });
});