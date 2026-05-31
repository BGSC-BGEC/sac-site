import { Activity, CalendarDays, Flame, Link2, Lock, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

import { useAuthStore } from "@/store/authStore";

const heatmapDays = [
  0, 1, 0, 2, 3, 1, 0, 2, 2, 4, 1, 0, 3, 4, 2, 1, 0, 1, 3, 5, 4, 2, 0, 1,
  2, 3, 0, 4, 5, 2, 1, 0, 3, 2, 4,
];

const levelClass = [
  "bg-white/[0.04]",
  "bg-cyan-400/20",
  "bg-cyan-400/35",
  "bg-emerald-400/45",
  "bg-emerald-400/70",
  "bg-orange-400/80",
];

const DashboardPage = () => {
  const { role, loginAsStudent, switchToAdmin, logout } = useAuthStore();

  if (role === "guest") {
    return (
      <section className="min-h-screen bg-[#050816] px-4 py-16 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              Mock role view
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
              Guest dashboard preview
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">
              You are browsing SAC as a guest. Log in with the local mock role to
              reveal the personal dashboard, activity heatmap, and Strava connect
              panel. No backend calls are made.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={loginAsStudent}
                className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                Login as Student
              </button>
              <button
                onClick={switchToAdmin}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-purple-400/50"
              >
                Switch to Admin
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#09111f] p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04]">
              <Lock className="h-6 w-6 text-slate-400" />
            </div>
            <h2 className="mt-6 text-2xl font-bold">Locked student panels</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Attendance streaks, weekly training load, and external activity
              sync controls are hidden until the mock student flag is active.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (role === "admin") {
    return (
      <section className="min-h-screen bg-[#050816] px-4 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-5 rounded-3xl border border-purple-400/20 bg-purple-500/10 p-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-300">
                Admin role view
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight">
                SAC operations console
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-purple-100/70">
                Admin mode unlocks inline controls across public pages, including
                the Edit Timings button on each activity detail page.
              </p>
            </div>
            <button
              onClick={logout}
              className="rounded-xl border border-white/10 bg-[#050816] px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30"
            >
              Return to Guest
            </button>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {["Facility hours", "Event approvals", "Gallery queues"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-[#09111f] p-5">
                <ShieldCheck className="h-6 w-6 text-purple-300" />
                <h2 className="mt-4 text-lg font-bold">{item}</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Mock admin surface for review and quick edits.
                </p>
              </div>
            ))}
          </div>

          <Link
            to="/activities"
            className="mt-8 inline-flex rounded-xl bg-purple-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-purple-300"
          >
            Open Activities
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#050816] px-4 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              Student role view
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">
              Personal dashboard
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
              Your mock student session is active. This view is powered only by
              Zustand state and local sample data.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={switchToAdmin}
              className="rounded-xl border border-purple-400/40 bg-purple-500/10 px-5 py-3 text-sm font-semibold text-purple-200 transition hover:bg-purple-500/20"
            >
              Switch to Admin
            </button>
            <button
              onClick={logout}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/30"
            >
              Log out
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-[#09111f] p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Activity heatmap</h2>
                <p className="mt-1 text-sm text-slate-400">Last five weeks of SAC check-ins.</p>
              </div>
              <Flame className="h-7 w-7 text-orange-300" />
            </div>

            <div className="grid grid-cols-7 gap-2">
              {heatmapDays.map((level, index) => (
                <div
                  key={`${level}-${index}`}
                  className={`aspect-square rounded-md border border-white/5 ${levelClass[level]}`}
                  title={`${level} sessions`}
                />
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/[0.03] p-4">
                <Activity className="h-5 w-5 text-cyan-300" />
                <p className="mt-3 text-2xl font-black">18</p>
                <p className="text-xs text-slate-400">Sessions this month</p>
              </div>
              <div className="rounded-2xl bg-white/[0.03] p-4">
                <CalendarDays className="h-5 w-5 text-emerald-300" />
                <p className="mt-3 text-2xl font-black">6 day</p>
                <p className="text-xs text-slate-400">Current streak</p>
              </div>
              <div className="rounded-2xl bg-white/[0.03] p-4">
                <Flame className="h-5 w-5 text-orange-300" />
                <p className="mt-3 text-2xl font-black">42h</p>
                <p className="text-xs text-slate-400">Training time</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-orange-400/20 bg-orange-500/10 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-400/15">
              <Link2 className="h-6 w-6 text-orange-200" />
            </div>
            <h2 className="mt-6 text-2xl font-bold">Connect Strava</h2>
            <p className="mt-3 text-sm leading-6 text-orange-100/75">
              Pull your runs, rides, and gym sessions into SAC streaks. This is a
              mock connect UI only, ready for a real OAuth flow later.
            </p>
            <button className="mt-6 w-full rounded-xl bg-orange-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-orange-300">
              Connect Strava
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
