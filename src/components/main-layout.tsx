import React from "react";
import { Footer } from "./footer";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <section className="pt-[72px] flex flex-row">
        <Sidebar />
        <div className="p-5">{children}</div>
      </section>
      <Footer />
    </>
  );
};
