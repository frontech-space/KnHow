import React from "react";
import Header from "./Header";
import { LayoutProps } from "../../types/layout";

const Layout= ({ children, title }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title={title} />
      <main className="w-full">{children}</main>
    </div>
  );
};

export default Layout;
