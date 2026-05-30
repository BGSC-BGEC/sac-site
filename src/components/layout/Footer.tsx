import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#050816]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Sports Activities Centre
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            BITS Pilani, Goa Campus
          </p>
        </div>

        <div className="flex flex-wrap gap-6 text-sm">
          <Link
            to="/activities"
            className="text-slate-400 transition hover:text-cyan-400"
          >
            Activities
          </Link>

          <Link
            to="/events"
            className="text-slate-400 transition hover:text-cyan-400"
          >
            Events
          </Link>

          <Link
            to="/gallery"
            className="text-slate-400 transition hover:text-cyan-400"
          >
            Gallery
          </Link>

          <Link
            to="/contact"
            className="text-slate-400 transition hover:text-cyan-400"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;