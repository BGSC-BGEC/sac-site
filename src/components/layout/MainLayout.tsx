import type { ReactNode } from "react";

import Footer from "./Footer";
import Navbar from "./Navbar";
import { useHashScroll } from "./useHashScroll";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  useHashScroll();
  return (
    <div className="flex min-h-screen flex-col bg-void text-fg">
      {/* Skip link — first focusable node in the DOM */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50
                   focus:rounded-md focus:bg-volt focus:px-4 focus:py-2 focus:text-ink
                   focus:text-meta focus:uppercase focus:tracking-[0.12em]"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main" tabIndex={-1} className="flex-1 pt-16 lg:pt-20 outline-none">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
