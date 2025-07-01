import Header from "./Header";
import { LayoutProps } from "../../types/layout";
import MetaHead from "../seo/MetaHead";

const Layout = ({ children, title }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen h-screen">
      <MetaHead
        title={title}
        description="Knowledge How-toサイト - あなたの知識を共有しましょう"
      />
      <Header title={title} />
      <main role="main" className="flex-grow w-full flex flex-col">{children}</main>
    </div>
  );
};

export default Layout;
