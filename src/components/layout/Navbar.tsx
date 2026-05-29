import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

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
        </nav>

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
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;