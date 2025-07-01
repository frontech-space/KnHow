import { render, screen } from "@testing-library/react";
import ReleaseCards from "../../../../components/features/release/ReleaseCards";

describe("ReleaseCards", () => {
  const mockProps = {
    version: "v3.0.0",
    feature: "ダークモードを追加しました"
  };

  it("versionとfeatureの文字列を含むテキストが表示される（正規表現マッチ）", () => {
    render(<ReleaseCards {...mockProps} />);
    
    // versionとfeatureが含まれるか部分一致で確認
    expect(screen.getByText(/v3\.0\.0/)).toBeInTheDocument();
    expect(screen.getByText(/ダークモード/)).toBeInTheDocument();
  });

  it("親divに正しいクラスが付与されている", () => {
    const { container } = render(<ReleaseCards {...mockProps} />);
    const outerDiv = container.firstChild as HTMLElement;

    expect(outerDiv).toHaveClass(
      "bg-gray-300",
      "w-[330px]",
      "h-auto",
      "my-[2%]",
      "mx-[2%]",
      "py-[10%]",
      "px-[5%]",
      "text-center",
      "rounded-lg"
    );
  });

  it("Textコンポーネントにクラスと文字列が含まれている", () => {
    const { container } = render(<ReleaseCards {...mockProps} />);
    const textElement = container.querySelector(".whitespace-pre-wrap");

    expect(textElement).toBeTruthy();
    expect(textElement?.textContent).toContain("v3.0.0");
    expect(textElement?.textContent).toContain("ダークモードを追加しました");
  });
});