import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import AppRoutes from "@/routes";

function App() {
  const { pathname } = useLocation();
  // Scroll reset on route change — navigating from a scrolled /gallery to
  // /gallery/basketball otherwise lands mid-page.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "instant" });
  }, [pathname]);

  return (
    <MainLayout>
      <AppRoutes />
    </MainLayout>
  );
}

export default App;
