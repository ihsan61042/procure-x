import Sidebar from "@/app/components/procurex-components/sidebarpcx";
import React from "react";
import Header from "@/app/components/procurex-components/headerpcx";
import Footer from "@/app/components/procurex-components/footerpcx";
const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Sidebar />
      <Header />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
};

export default layout;
