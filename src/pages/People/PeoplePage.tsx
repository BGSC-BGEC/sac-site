import { Link } from "react-router-dom";

const PeoplePage = () => {
  return (
    <section className="min-h-screen bg-[#050816] py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white">
            People
          </h1>

          <p className="mt-4 max-w-2xl text-slate-400">
            Meet the faculty and student representatives who
            manage and support the Sports Activities Centre.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Link
            to="/people/incharges"
            className="group rounded-2xl border border-white/10 bg-[#09111f] p-8 transition hover:border-cyan-400/40"
          >
            <h2 className="text-2xl font-semibold text-white">
              SAC In-Charges
            </h2>

            <p className="mt-3 text-slate-400">
              Faculty members overseeing SAC operations,
              facilities, and activities.
            </p>

            <p className="mt-6 text-cyan-400">
              View In-Charges →
            </p>
          </Link>

          <Link
            to="/people/committee"
            className="group rounded-2xl border border-white/10 bg-[#09111f] p-8 transition hover:border-cyan-400/40"
          >
            <h2 className="text-2xl font-semibold text-white">
              SAC Committee
            </h2>

            <p className="mt-3 text-slate-400">
              Student committee members responsible for events,
              sports management, and community engagement.
            </p>

            <p className="mt-6 text-cyan-400">
              View Committee →
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PeoplePage;