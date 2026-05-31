import { Menu, ShieldCheck, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuthStore } from "@/store/authStore";

const navLinks = [
  { label: "Activities", href: "/activities" },
  { label: "Stats", href: "/stats" },
  { label: "Gallery", href: "/gallery" },
  { label: "Events", href: "/events" },
  { label: "People", href: "/people" },
  { label: "Achievements", href: "/achievements" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const { role, loginAsStudent, switchToAdmin, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold tracking-tight text-cyan-400"
        >
          SAC Goa
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm font-medium text-slate-300 transition hover:text-cyan-400"
            >
              {link.label}
            </Link>
          ))}
          {role !== "guest" && (
            <Link
              to="/dashboard"
              className="text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
            >
              Dashboard
            </Link>
          )}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {role === "guest" ? (
            <button
              onClick={loginAsStudent}
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
            >
              <UserRound className="h-4 w-4" />
              Login as Student
            </button>
          ) : (
            <>
              <span className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-300">
                {role}
              </span>
              <button
                onClick={role === "admin" ? loginAsStudent : switchToAdmin}
                className="inline-flex items-center gap-2 rounded-xl border border-purple-400/30 bg-purple-500/10 px-4 py-2 text-sm font-semibold text-purple-200 transition hover:bg-purple-500/20"
              >
                <ShieldCheck className="h-4 w-4" />
                {role === "admin" ? "Switch to Student" : "Switch to Admin"}
              </button>
              <button
                onClick={logout}
                className="rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-300 transition hover:border-white/30 hover:text-white"
              >
                Guest
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="rounded-md p-2 text-white transition hover:bg-white/5">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-72 border-white/10 bg-[#050816]"
            >
              <div className="mt-8 flex flex-col gap-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-base font-medium text-slate-300 transition hover:text-cyan-400"
                  >
                    {link.label}
                  </Link>
                ))}
                {role !== "guest" && (
                  <Link
                    to="/dashboard"
                    className="text-base font-medium text-cyan-300 transition hover:text-cyan-200"
                  >
                    Dashboard
                  </Link>
                )}
                <div className="border-t border-white/10 pt-5">
                  {role === "guest" ? (
                    <button
                      onClick={loginAsStudent}
                      className="w-full rounded-xl bg-cyan-400 px-4 py-3 text-sm font-bold text-slate-950"
                    >
                      Login as Student
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Current role: {role}
                      </p>
                      <button
                        onClick={role === "admin" ? loginAsStudent : switchToAdmin}
                        className="w-full rounded-xl border border-purple-400/30 bg-purple-500/10 px-4 py-3 text-sm font-semibold text-purple-200"
                      >
                        {role === "admin" ? "Switch to Student" : "Switch to Admin"}
                      </button>
                      <button
                        onClick={logout}
                        className="w-full rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-300"
                      >
                        Return to Guest
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
